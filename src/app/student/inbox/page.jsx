"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiInbox,
  HiMail,
  HiMailOpen,
  HiClock,
  HiCalendar,
  HiLocationMarker,
  HiAcademicCap,
  HiExclamationCircle,
  HiInformationCircle,
  HiCheck,
  HiSearch,
  HiChevronRight,
  HiPencil,
  HiUsers,
  HiFilter,
} from "react-icons/hi"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - replace with your actual API calls
const mockNotifications = [
  {
    _id: "68510b55efee6cdde8a69b59",
    message: "68510b55efee6cdde8a69b4b",
    type: "poll",
    isRead: false,
    createdAt: new Date("2025-01-17T10:30:00Z"),
    updatedAt: new Date("2025-01-17T10:30:00Z"),
    hasResponded: false,
    pollData: {
      _id: "68510239efee6cdde8a69b37",
      options: [
        {
          date: new Date("2025-01-20T00:00:00Z"),
          day: "Monday",
          start: new Date("2000-01-01T10:00:00Z"),
          end: new Date("2000-01-01T11:00:00Z"),
          room: "Room A",
          _id: "68510239efee6cdde8a69b38",
          voteCount: 12,
        },
        {
          date: new Date("2025-01-22T00:00:00Z"),
          day: "Wednesday",
          start: new Date("2000-01-01T11:00:00Z"),
          end: new Date("2000-01-01T12:00:00Z"),
          room: "Room B",
          _id: "68510239efee6cdde8a69b39",
          voteCount: 8,
        },
      ],
      course: "Advanced Web Development",
      courseCode: "CS 401",
      prof: "Dr. Sarah Johnson",
      reason: "Rescheduling due to public holiday",
      context:
        "The upcoming Republic Day holiday falls on our regular class day. We need to reschedule to ensure all students can attend without missing important coursework.",
      isApproved: false,
      totalVotes: 20,
    },
  },
  {
    _id: "68510b55efee6cdde8a69b60",
    message: "68510b55efee6cdde8a69b4c",
    type: "message",
    isRead: false,
    createdAt: new Date("2025-01-16T14:20:00Z"),
    updatedAt: new Date("2025-01-16T14:20:00Z"),
    messageData: {
      title: "Assignment Deadline Extended",
      content:
        "The deadline for Database Management Systems assignment has been extended to January 25th due to technical issues with the submission portal. Please ensure you submit your work before the new deadline. If you face any issues, contact the TA immediately.",
      sender: "Prof. Michael Chen",
      course: "Database Management Systems",
      courseCode: "CS 350",
    },
  },
  {
    _id: "68510b55efee6cdde8a69b61",
    message: "68510b55efee6cdde8a69b4d",
    type: "poll",
    isRead: false,
    createdAt: new Date("2025-01-15T09:15:00Z"),
    updatedAt: new Date("2025-01-15T09:15:00Z"),
    hasResponded: false,
    // selectedOption: "68510239efee6cdde8a69b40",
    pollData: {
      _id: "68510239efee6cdde8a69b38",
      options: [
        {
          date: new Date("2025-01-25T00:00:00Z"),
          day: "Friday",
          start: new Date("2000-01-01T14:00:00Z"),
          end: new Date("2000-01-01T16:00:00Z"),
          room: "Lab 301",
          _id: "68510239efee6cdde8a69b40",
          voteCount: 15,
        },
        {
          date: new Date("2025-01-27T00:00:00Z"),
          day: "Sunday",
          start: new Date("2000-01-01T10:00:00Z"),
          end: new Date("2000-01-01T12:00:00Z"),
          room: "Lab 302",
          _id: "68510239efee6cdde8a69b41",
          voteCount: 5,
        },
      ],
      course: "Machine Learning",
      courseCode: "CS 480",
      prof: "Dr. Alex Kumar",
      reason: "Extra lab session for project work",
      context:
        "Many students have requested additional hands-on practice for the final project implementation. This extra session will provide dedicated time for project work with instructor guidance.",
      isApproved: false,
      totalVotes: 20,
    },
  },
]

export default function InboxPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [selectedPollOptions, setSelectedPollOptions] = useState({})
  const [editingPoll, setEditingPoll] = useState(null)

  useEffect(() => {
    filterNotifications()
  }, [searchTerm, filterType, filterRead, notifications])

  const filterNotifications = () => {
    let filtered = notifications

    if (searchTerm) {
      filtered = filtered.filter((notification) => {
        const searchLower = searchTerm.toLowerCase()
        if (notification.type === "poll") {
          return (
            notification.pollData.course.toLowerCase().includes(searchLower) ||
            notification.pollData.courseCode.toLowerCase().includes(searchLower) ||
            notification.pollData.reason.toLowerCase().includes(searchLower)
          )
        } else {
          return (
            notification.messageData.title.toLowerCase().includes(searchLower) ||
            notification.messageData.course.toLowerCase().includes(searchLower) ||
            notification.messageData.sender.toLowerCase().includes(searchLower)
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
  }

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
    )

    // Optional: Auto-collapse the item after marking as read
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev)
      newExpanded.delete(id)
      return newExpanded
    })
  }

  const handlePollOptionSelect = (notificationId, optionId) => {
    // Only allow selection if not responded or currently editing
    const notification = notifications.find((n) => n._id === notificationId)
    if (!notification.hasResponded || editingPoll === notificationId) {
      setSelectedPollOptions((prev) => ({
        ...prev,
        [notificationId]: optionId,
      }))
    }
  }

  const submitPollResponse = (notificationId) => {
    const selectedOption = selectedPollOptions[notificationId]
    if (selectedOption) {
      // console.log(`Submitting poll response: ${selectedOption} for notification: ${notificationId}`)

      // Update the notification to mark as responded
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                hasResponded: true,
                selectedOption: selectedOption,
                isRead: true,
              }
            : notification,
        ),
      )

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

  const updatePollResponse = (notificationId) => {
    const selectedOption = selectedPollOptions[notificationId]
    if (selectedOption) {
      // console.log(Updating poll response: ${selectedOption} for notification: ${notificationId})

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
        ease: "easeOut",
      },
    },
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

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
                  <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative sm:flex-grow">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                  <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
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
            {filteredNotifications.map((notification) => {
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
                    className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0 pb-2 ${
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
                              <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            ) : (
                              <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            )}
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight">
                                {isPoll ? `Poll: ${data.course}` : data.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                              {isPoll && notification.hasResponded && (
                                <Badge className="bg-green-100 text-green-700 text-xs py-1 flex-shrink-0">
                                  <HiCheck className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Responded</span>
                                  {/* <span className="sm:hidden">✓</span> */}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
                                {isPoll ? data.courseCode : data.courseCode}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {getRelativeTime(notification.createdAt)}
                              </span>
                              {isPoll && data.prof && <span className="">by {data.prof}</span>}
                              {!isPoll && <span className="">by {data.sender}</span>}
                              {isPoll && (
                                <span className="flex items-center gap-1">
                                  <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {data.totalVotes}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
                              {isPoll
                                ? data.reason
                                : data.content.substring(0, 80) + (data.content.length > 80 ? "..." : "")}
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
                              <HiChevronRight className="w-4 h-4" />
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
                                {/* Poll Context */}
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100 ">
                                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                    <HiInformationCircle className="w-4 h-4 text-purple-600" />
                                    Context
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                                    {data.context}
                                  </p>
                                  
                                </div>

                                {/* Poll Options */}
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                                      <HiCalendar className="w-4 h-4 text-blue-600" />
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
                                        <HiPencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        <span className="hidden sm:inline">Edit Response</span>
                                        <span className="sm:hidden">Edit</span>
                                      </Button>
                                    )}
                                  </div>

                                  <div className="space-y-2 sm:space-y-3">
                                    {data.options.map((option, index) => {
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
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                                                    {option.day}
                                                  </span>
                                                  <span className="text-xs sm:text-sm text-gray-600">
                                                    {formatDate(option.date)}
                                                  </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                                  <span className="flex items-center gap-1">
                                                    <HiClock className="w-3 h-3" />
                                                    {formatTime(option.start)} - {formatTime(option.end)}
                                                  </span>
                                                  <span className="flex items-center gap-1">
                                                    <HiLocationMarker className="w-3 h-3" />
                                                    {option.room}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>

                                            {/* Vote count and percentage */}
                                            {notification.hasResponded && !isEditing && (
                                              <div className="text-right flex-shrink-0 ml-2">
                                                <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
                                                  <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
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
                                    <>
                                      <Button
                                        onClick={() => submitPollResponse(notification._id)}
                                        disabled={!selectedPollOptions[notification._id]}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                      >
                                        <HiCheck className="w-4 h-4 mr-2" />
                                        Submit Response
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => markAsRead(notification._id)}
                                        className="border-gray-300 hover:bg-gray-100 text-sm"
                                      >
                                        Mark as Read
                                      </Button>
                                    </>
                                  ) : isEditing ? (
                                    <>
                                      <Button
                                        onClick={() => updatePollResponse(notification._id)}
                                        disabled={!selectedPollOptions[notification._id]}
                                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                      >
                                        <HiCheck className="w-4 h-4 mr-2" />
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
                                      <HiInformationCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
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
                                {/* Full Message Content */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{data.content}</p>
                                </div>

                                {/* Message Actions */}
                                <div className="flex gap-3">
                                  {!notification.isRead ? (
                                    <Button
                                      onClick={() => markAsRead(notification._id)}
                                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm"
                                    >
                                      <HiMailOpen className="w-4 h-4 mr-2" />
                                      Mark as Read
                                    </Button>
                                  ) : (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-green-700 font-medium">Message marked as read</span>
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
        {filteredNotifications.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
            <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
            <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}