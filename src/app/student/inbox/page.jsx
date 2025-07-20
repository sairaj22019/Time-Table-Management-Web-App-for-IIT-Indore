"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Inbox,
  Mail,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  AlertCircle,
  Info,
  Check,
  Search,
  ChevronRight,
  Pencil,
  Users,
  Filter,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"

export default function InboxPage() {
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [selectedPollOptions, setSelectedPollOptions] = useState({})
  const [editingPoll, setEditingPoll] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readMessages, setReadMessages] = useState([]) // Track read messages
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  // Check for search parameter from dashboard navigation
  useEffect(() => {
    const searchFromDashboard = searchParams.get("search")
    if (searchFromDashboard) {
      setSearchTerm(decodeURIComponent(searchFromDashboard))
    }
  }, [searchParams])

  const fetchNotifications = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.email) {
      setLoading(false) // Stop loading if not authenticated or email is missing
      if (status === "unauthenticated") {
        setError("Please log in to view notifications.")
      }
      return
    }

    try {
      console.log("Getting notifications!!")
      setLoading(true)
      const response = await fetch("/api/student/getNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail: session.user.email }),
      })
      const data = await response.json()
      console.log(response)
      if (data.success) {
        // Filter out notifications with buffer and transform the data
        const transformedNotifications = data.student
          .filter((item) => !item.buffer && item.notification)
          .map((item) => {
            const notification = item.notification
            const isPoll = notification.type === "poll"
            const senderUser = notification.prof // This is the User object from backend

            if (isPoll) {
              // For polls that are already read, process the votes from the API response
              const processedVotes = {}
              let totalVotes = 0
              if (item.isRead === true && notification.message && notification.message.votes) {
                const pollVotes = notification.message.votes || []
                totalVotes = pollVotes.length
                // Calculate vote counts for each option
                pollVotes.forEach((vote) => {
                  if (processedVotes[vote.option]) {
                    processedVotes[vote.option]++
                  } else {
                    processedVotes[vote.option] = 1
                  }
                })
              }
              // Transform poll data to match expected structure
              return {
                _id: item._id,
                message: notification._id,
                type: "poll",
                isRead: item.isRead === true, // Explicitly convert to boolean, false means unread
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt,
                hasResponded: item.isRead === true, // If read, assume user has responded
                pollData: {
                  _id: notification.message?._id, // Optional chaining
                  options:
                    notification.message?.options?.map((option) => ({
                      // Optional chaining
                      ...option,
                      voteCount: item.isRead === true ? processedVotes[option._id] || 0 : 0,
                    })) || [], // Default to empty array if options is null
                  course: notification.course?.title, // Optional chaining
                  courseCode: notification.course?.courseCode, // Optional chaining
                  prof: senderUser ? { username: senderUser.username, role: senderUser.role } : null, // Pass username and role
                  reason: notification.message?.reason, // Optional chaining
                  context: notification.message?.context, // Optional chaining
                  isApproved: notification.message?.isApproved, // Optional chaining
                  totalVotes: item.isRead === true ? totalVotes : 0,
                },
              }
            } else {
              // Transform message data to match expected structure
              return {
                _id: item._id,
                message: notification._id,
                type: "message",
                isRead: item.isRead === true, // Explicitly convert to boolean, false means unread
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt,
                messageData: {
                  title: notification.messageTitle,
                  content: notification.message,
                  sender: senderUser ? { username: senderUser.username, role: senderUser.role } : null, // Pass username and role
                  course: notification.course?.title, // Optional chaining
                  courseCode: notification.course?.courseCode, // Optional chaining
                },
              }
            }
          })
        setNotifications(transformedNotifications)
        setFilteredNotifications(transformedNotifications)
      } else {
        setError("Failed to fetch notifications: " + data.message)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
      setError("Error fetching notifications: " + error.message)
    } finally {
      setLoading(false)
    }
  }, [session?.user?.email, status])

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchNotifications()
    } else if (status === "unauthenticated") {
      setLoading(false)
      setError("Please log in to view notifications.")
    }
  }, [status, session?.user?.email, fetchNotifications])

  // API call to mark message as read
  const markMessageAsRead = async (notificationId) => {
    try {
      console.log("Marking message as read:", notificationId)
      const response = await fetch("/api/student/markAsRead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail: session.user.email,
          notificationList: notificationId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        console.log("Message marked as read successfully")
        // Add to read messages array
        setReadMessages((prev) => [...prev, notificationId])
      } else {
        console.error("Failed to mark message as read:", data.message)
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const filterNotifications = useCallback(() => {
    let filtered = notifications
    if (searchTerm) {
      filtered = filtered.filter((notification) => {
        const searchLower = searchTerm.toLowerCase()
        if (notification.type === "poll") {
          return (
            notification.pollData.course
              ?.toLowerCase()
              ?.includes(searchLower) || // Optional chaining
            notification.pollData.courseCode?.toLowerCase()?.includes(searchLower) || // Optional chaining
            notification.pollData.reason?.toLowerCase()?.includes(searchLower) || // Optional chaining
            notification.pollData.prof?.username?.toLowerCase()?.includes(searchLower) // Optional chaining
          )
        } else {
          return (
            notification.messageData.title
              ?.toLowerCase()
              ?.includes(searchLower) || // Optional chaining
            notification.messageData.course?.toLowerCase()?.includes(searchLower) || // Optional chaining
            notification.messageData.sender?.username?.toLowerCase()?.includes(searchLower) || // Optional chaining
            notification.messageData.content?.toLowerCase()?.includes(searchLower) // Optional chaining
          )
        }
      })
    }
    if (filterType !== "all") {
      filtered = filtered.filter((notification) => notification.type === filterType)
    }
    if (filterRead !== "all") {
      const isReadFilter = filterRead === "read"
      filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
    }
    setFilteredNotifications(filtered)
  }, [searchTerm, filterType, filterRead, notifications])

  useEffect(() => {
    if (!loading) {
      filterNotifications()
    }
  }, [searchTerm, filterType, filterRead, notifications, loading, filterNotifications])

  const toggleExpanded = async (id) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
      // Find the notification
      const notification = notifications.find((n) => n._id === id)
      // If message was unread, mark as read and make API call
      if (notification && !notification.isRead) {
        // Update local state immediately
        setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)))
        // Make API call to mark as read
        await markMessageAsRead(id)
      }
    }
    setExpandedItems(newExpanded)
  }

  const submitPollResponse = async (notificationId) => {
    const selectedOption = selectedPollOptions[notificationId]
    if (selectedOption) {
      console.log(`Submitting poll response: ${selectedOption} for notification: ${notificationId}`)
      try {
        const body = {
          option: selectedOption,
          notificationId: notificationId,
          userEmail: session.user.email,
        }
        const response = await fetch("/api/student/voteForPolls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await response.json()
        if (data.success) {
          console.log("Vote added successfully")
          // Process the votes array from the poll data in the response
          const pollVotes = data.poll.votes || []
          // Calculate vote counts for each option
          const voteCountsByOption = {}
          pollVotes.forEach((vote) => {
            if (voteCountsByOption[vote.option]) {
              voteCountsByOption[vote.option]++
            } else {
              voteCountsByOption[vote.option] = 1
            }
          })
          const totalVotes = pollVotes.length
          // Update the notification with real vote data
          setNotifications((prev) =>
            prev.map((notification) =>
              notification._id === notificationId
                ? {
                    ...notification,
                    hasResponded: true,
                    selectedOption: selectedOption,
                    isRead: true,
                    pollData: {
                      ...notification.pollData,
                      options:
                        notification.pollData.options?.map((option) => ({
                          // Optional chaining
                          ...option,
                          voteCount: voteCountsByOption[option._id] || 0,
                        })) || [], // Default to empty array
                      totalVotes: totalVotes,
                    },
                  }
                : notification,
            ),
          )
        } else {
          console.error("Failed to add vote :", data.message)
        }
      } catch (error) {
        console.error("Error adding vote :", error)
      }
      // Clear the selected option from state
      setSelectedPollOptions((prev) => {
        const newState = { ...prev }
        delete newState[notificationId]
        return newState
      })
    }
  }

  const startEditingPoll = (notificationId) => {
    const notification = notifications.find((n) => n._id === notificationId)
    if (notification && notification.hasResponded) {
      setEditingPoll(notificationId)
      setSelectedPollOptions({
        [notificationId]: notification.selectedOption,
      })
    }
  }

  const cancelEditingPoll = (notificationId) => {
    setEditingPoll(null)
    setSelectedPollOptions((prev) => {
      const newState = { ...prev }
      delete newState[notificationId]
      return newState
    })
  }

  const updatePollResponse = async (notificationId) => {
    const selectedOption = selectedPollOptions[notificationId]
    if (selectedOption) {
      console.log(`Updating poll response: ${selectedOption} for notification: ${notificationId}`)
      await submitPollResponse(notificationId)
      // Update the notification with new selection
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                selectedOption: selectedOption,
              }
            : notification,
        ),
      )
      setEditingPoll(null)
      setSelectedPollOptions((prev) => {
        const newState = { ...prev }
        delete newState[notificationId]
        return newState
      })
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getRelativeTime = (date) => {
    const now = new Date()
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return formatDate(date)
  }

  const getVotePercentage = (voteCount, totalVotes) => {
    if (totalVotes === 0) return 0
    return Math.round((voteCount / totalVotes) * 100)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Fixed ease value
      },
    },
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handlePollOptionSelect = (notificationId, optionId) => {
    setSelectedPollOptions((prev) => ({
      ...prev,
      [notificationId]: optionId,
    }))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Inbox</h1>
                  <p className="text-sm sm:text-base text-gray-600">Stay updated with your notifications</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                  {filteredNotifications.length} Total
                </Badge>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
                )}
                {readMessages.length > 0 && (
                  <Badge className="bg-green-500 text-white text-xs sm:text-sm">
                    {readMessages.length} Recently Read
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative sm:flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="flex-1 max-w-48 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="poll">Polls</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="flex-1 max-w-48 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
        {/* Notifications List */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
          <AnimatePresence>
            {filteredNotifications.slice().reverse().map((notification) => {
              const isExpanded = expandedItems.has(notification._id)
              const isPoll = notification.type === "poll"
              const data = isPoll ? notification.pollData : notification.messageData
              const isEditing = editingPoll === notification._id
              return (
                <motion.div
                  key={notification._id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
                      !notification.isRead ? "border-blue-200 bg-blue-50/30" : "border-gray-100"
                    }`}
                  >
                    <CardHeader className="pt-4 sm:pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <motion.div
                            className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
                              isPoll
                                ? "bg-gradient-to-br from-purple-500 to-purple-600"
                                : "bg-gradient-to-br from-green-500 to-green-600"
                            }`}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isPoll ? (
                              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            ) : (
                              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            )}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
                                {isPoll ? `Poll: ${data.course ?? "N/A"}` : (data.title ?? "N/A")}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                              {isPoll && notification.hasResponded && (
                                <Badge className="bg-green-100 text-green-700 text-xs py-1 flex-shrink-0">
                                  <Check className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Responded</span>
                                </Badge>
                              )}
                            </div>
                            {/* Light text - hidden on small screens, visible on large screens */}
                            <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                                {isPoll ? (data.courseCode ?? "N/A") : (data.courseCode ?? "N/A")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {getRelativeTime(notification.createdAt)}
                              </span>
                              {/* Display sender name and role */}
                              {isPoll && data.prof?.username && (
                                <span className="">
                                  by {data.prof.username} ({data.prof.role})
                                </span>
                              )}
                              {!isPoll && data.sender?.username && (
                                <span className="">
                                  by {data.sender.username} ({data.sender.role})
                                </span>
                              )}
                              {isPoll && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {data.totalVotes}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
                              {isPoll
                                ? (data.reason ?? "No reason provided")
                                : (data.content ?? "No content").substring(0, 80) +
                                  ((data.content?.length ?? 0) > 80 ? "..." : "")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 flex-shrink-0">
                          <Badge
                            variant={isPoll ? "secondary" : "outline"}
                            className={`${isPoll ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"} text-xs`}
                          >
                            {isPoll ? "Poll" : "Message"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(notification._id)}
                            className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
                          >
                            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
                            {isPoll ? (
                              <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4 sm:space-y-6"
                              >
                                {/* Light text - visible on small screens only when expanded */}
                                <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <GraduationCap className="w-3 h-3" />
                                      {data.courseCode ?? "N/A"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {getRelativeTime(notification.createdAt)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                                    {data.prof?.username && (
                                      <span className="">
                                        by {data.prof.username} ({data.prof.role})
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {data.totalVotes}
                                    </span>
                                  </div>
                                </div>
                                {/* Poll Context */}
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100 ">
                                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                    <Info className="w-4 h-4 text-purple-600" />
                                    Context
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                                    {data.context ?? "No context provided"}
                                  </p>
                                </div>
                                {/* Poll Options */}
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                                      <Calendar className="w-4 h-4 text-blue-600" />
                                      {notification.hasResponded && !isEditing
                                        ? "Poll Results:"
                                        : "Select your preferred option:"}
                                    </h4>
                                    {notification.hasResponded && !isEditing && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => startEditingPoll(notification._id)}
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm"
                                      >
                                        <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        <span className="hidden sm:inline">Edit Response</span>
                                        <span className="sm:hidden">Edit</span>
                                      </Button>
                                    )}
                                  </div>
                                  <div className="space-y-2 sm:space-y-3">
                                    {(data.options || []).map((option, index) => {
                                      // Ensure data.options is an array
                                      const isSelected =
                                        notification.hasResponded && notification.selectedOption === option._id
                                      const isCurrentlySelected = selectedPollOptions[notification._id] === option._id
                                      const votePercentage = getVotePercentage(option.voteCount, data.totalVotes)
                                      const showAsSelected = isEditing
                                        ? isCurrentlySelected
                                        : notification.hasResponded
                                          ? isSelected
                                          : isCurrentlySelected
                                      return (
                                        <motion.div
                                          key={option._id}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
                                            showAsSelected
                                              ? "border-blue-500 bg-blue-50"
                                              : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                                          } ${!notification.hasResponded || isEditing ? "cursor-pointer" : ""}`}
                                          onClick={() => {
                                            if (!notification.hasResponded || isEditing) {
                                              handlePollOptionSelect(notification._id, option._id)
                                            }
                                          }}
                                          whileHover={!notification.hasResponded || isEditing ? { scale: 1.02 } : {}}
                                          whileTap={!notification.hasResponded || isEditing ? { scale: 0.98 } : {}}
                                        >
                                          {/* Vote percentage bar */}
                                          {notification.hasResponded && !isEditing && (
                                            <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
                                              <motion.div
                                                className="h-full bg-gradient-to-r from-blue-100 to-blue-200 opacity-30"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${votePercentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                              />
                                            </div>
                                          )}
                                          <div className="relative flex items-center justify-between">
                                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                              <div
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                  showAsSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                                }`}
                                              >
                                                {showAsSelected && (
                                                  <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-2 h-2 bg-white rounded-full"
                                                  />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                {/* Day and Date side by side for all screen sizes */}
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                                                    {option.day}
                                                  </span>
                                                  <span className="text-xs sm:text-sm text-gray-600">
                                                    {formatDate(option.date)}
                                                  </span>
                                                </div>
                                                {/* Time and Location side by side for all screen sizes */}
                                                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
                                                  <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatTime(option.start)} - {formatTime(option.end)}
                                                  </span>
                                                  <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {option.room}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            {/* Vote count and percentage */}
                                            {notification.hasResponded && !isEditing && (
                                              <div className="text-right flex-shrink-0 ml-2">
                                                <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
                                                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                                  {option.voteCount}
                                                </div>
                                                <div className="text-xs text-gray-500">{votePercentage}%</div>
                                              </div>
                                            )}
                                          </div>
                                        </motion.div>
                                      )
                                    })}
                                  </div>
                                </div>
                                {/* Poll Actions */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                  {!notification.hasResponded ? (
                                    <Button
                                      onClick={() => submitPollResponse(notification._id)}
                                      disabled={!selectedPollOptions[notification._id]}
                                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      Submit Response
                                    </Button>
                                  ) : isEditing ? (
                                    <>
                                      <Button
                                        onClick={() => updatePollResponse(notification._id)}
                                        disabled={!selectedPollOptions[notification._id]}
                                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                      >
                                        <Check className="w-4 h-4 mr-2" />
                                        Update Response
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => cancelEditingPoll(notification._id)}
                                        className="border-gray-300 hover:bg-gray-100 text-sm"
                                      >
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                      <span>
                                        You have already responded to this poll. Click "Edit Response" to change your
                                        selection.
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4"
                              >
                                {/* Light text for messages - visible on small screens only when expanded */}
                                <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <GraduationCap className="w-3 h-3" />
                                      {data.courseCode ?? "N/A"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {getRelativeTime(notification.createdAt)}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {data.sender?.username && (
                                      <span className="">
                                        by {data.sender.username} ({data.sender.role})
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {/* Full Message Content */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    {data.content ?? "No content provided"}
                                  </p>
                                </div>
                                {/* Message Actions */}
                                <div className="flex gap-3">
                                  {readMessages.includes(notification._id) ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-green-700 font-medium">
                                        Message opened and marked as read
                                      </span>
                                    </div>
                                  ) : notification.isRead ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-green-700 font-medium">Message marked as read</span>
                                    </div>
                                  ) : (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                      <span className="text-blue-700 font-medium">
                                        Notification opened - marked as read
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        {/* Empty State */}
        {filteredNotifications.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
            <Inbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
            <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
