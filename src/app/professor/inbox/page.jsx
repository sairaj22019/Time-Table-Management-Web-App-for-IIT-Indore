// // // // "use client"
// // // // import { useSession } from "next-auth/react"
// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import {
// // // //   HiInbox,
// // // //   HiMail,
// // // //   HiClock,
// // // //   HiLocationMarker,
// // // //   HiAcademicCap,
// // // //   HiExclamationCircle,
// // // //   HiInformationCircle,
// // // //   HiCheck,
// // // //   HiSearch,
// // // //   HiChevronRight,
// // // //   HiUsers,
// // // //   HiFilter,
// // // //   HiChartBar,
// // // //   HiEye,
// // // //   HiPaperAirplane,
// // // // } from "react-icons/hi"
// // // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // // // export default function ProfessorInboxPage() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterRead, setFilterRead] = useState("all")
// // // //   const [filterDirection, setFilterDirection] = useState("all")
// // // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [readMessages, setReadMessages] = useState([])
// // // //   const { data: session, status } = useSession()
// // // //   useEffect(() => {
// // // //     if(!session) return 
// // // //     fetchNotifications()
// // // //   }, [session])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       console.log("Getting professor notifications!!")
// // // //       setLoading(true)
// // // //       const response = await fetch("/api/professor/getNotifications", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ profEmail: session.user.email }),
// // // //       })
// // // //       const data = await response.json()
// // // //       console.log(response)

// // // //       if (data.success) {
// // // //         // Transform the professor notifications data
// // // //         const transformedNotifications = data.professor
// // // //           .filter((item) => item.notification)
// // // //           .map((item) => {
// // // //             const notification = item.notification
// // // //             const isPoll = notification.type === "poll"

// // // //             // Determine direction: sent if isSent is true, received if prof is null or different prof
// // // //             const isSent = notification.isSent === true
// // // //             const direction = isSent ? "sent" : "received"
// // // //             if (isPoll) {
// // // //               // For polls, process the votes from the message object
// // // //               const processedVotes = {}
// // // //               let totalVotes = 0

// // // //               if (notification.message && notification.message.votes) {
// // // //                 const pollVotes = notification.message.votes || []
// // // //                 totalVotes = pollVotes.length

// // // //                 // Calculate vote counts for each option
// // // //                 pollVotes.forEach((vote) => {
// // // //                   if (processedVotes[vote.option]) {
// // // //                     processedVotes[vote.option]++
// // // //                   } else {
// // // //                     processedVotes[vote.option] = 1
// // // //                   }
// // // //                 })
// // // //               }

// // // //               // Transform poll data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "poll",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 pollData: {
// // // //                   _id: notification.message._id,
// // // //                   options: notification.message.options.map((option) => ({
// // // //                     ...option,
// // // //                     voteCount: processedVotes[option._id] || 0,
// // // //                   })),
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                   prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // // //                   reason: notification.message.reason,
// // // //                   context: notification.message.context,
// // // //                   isApproved: notification.message.isApproved,
// // // //                   totalVotes: totalVotes,
// // // //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // // //                 },
// // // //               }
// // // //             } 
// // // //             else {
// // // //               // Transform message data to match expected structure
// // // //               console.log("Prof",notification.prof)
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "message",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 messageData: {
// // // //                   title: notification.messageTitle || "No Title",
// // // //                   content: typeof notification.message === "string" ? notification.message : "No content",
// // // //                   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                 },
// // // //               }
// // // //             }
// // // //           })

// // // //         setNotifications(transformedNotifications)
// // // //         setFilteredNotifications(transformedNotifications)
// // // //       } else {
// // // //         setError("Failed to fetch notifications: " + data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching notifications:", error)
// // // //       setError("Error fetching notifications: " + error.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // API call to mark message as read
// // // //   const markMessageAsRead = async (notificationId) => {
// // // //     try {
// // // //       console.log("Marking message as read:", notificationId)
// // // //       const response = await fetch("/api/professor/markAsRead", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           profEmail: session.user.email,
// // // //           notificationList: notificationId,
// // // //         }),
// // // //       })
// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         console.log("Message marked as read successfully")
// // // //         // Add to read messages array
// // // //         setReadMessages((prev) => [...prev, notificationId])
// // // //       } else {
// // // //         console.error("Failed to mark message as read:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error marking message as read:", error)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (!loading) {
// // // //       filterNotifications()
// // // //     }
// // // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // // //   const filterNotifications = () => {
// // // //     let filtered = notifications

// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter((notification) => {
// // // //         const searchLower = searchTerm.toLowerCase()
// // // //         if (notification.type === "poll") {
// // // //           return (
// // // //             notification.pollData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.courseCode.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.reason.toLowerCase().includes(searchLower)
// // // //           )
// // // //         } else {
// // // //           return (
// // // //             notification.messageData.title.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.sender.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.content.toLowerCase().includes(searchLower)
// // // //           )
// // // //         }
// // // //       })
// // // //     }

// // // //     if (filterType !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // // //     }

// // // //     if (filterRead !== "all") {
// // // //       const isReadFilter = filterRead === "read"
// // // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // // //     }

// // // //     if (filterDirection !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // // //     }

// // // //     setFilteredNotifications(filtered)
// // // //   }

// // // //   const toggleExpanded = async (id) => {
// // // //     const newExpanded = new Set(expandedItems)
// // // //     if (newExpanded.has(id)) {
// // // //       newExpanded.delete(id)
// // // //     } else {
// // // //       newExpanded.add(id)

// // // //       // Find the notification
// // // //       const notification = notifications.find((n) => n._id === id)

// // // //       // If message was unread, mark as read and make API call
// // // //       if (notification && !notification.isRead) {
// // // //         // Update local state immediately
// // // //         setNotifications((prev) =>
// // // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // // //         )

// // // //         // Make API call to mark as read
// // // //         await markMessageAsRead(id)
// // // //       }
// // // //     }
// // // //     setExpandedItems(newExpanded)
// // // //   }

// // // //   const formatTime = (date) => {
// // // //     return new Date(date).toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     })
// // // //   }

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleDateString("en-US", {
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     })
// // // //   }

// // // //   const getRelativeTime = (date) => {
// // // //     const now = new Date()
// // // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // // //     if (diffInHours < 1) return "Just now"
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     const diffInDays = Math.floor(diffInHours / 24)
// // // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // // //     return formatDate(date)
// // // //   }

// // // //   const getVotePercentage = (voteCount, totalVotes) => {
// // // //     if (totalVotes === 0) return 0
// // // //     return Math.round((voteCount / totalVotes) * 100)
// // // //   }

// // // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // // //     if (totalStudents === 0) return 0
// // // //     return Math.round((totalVotes / totalStudents) * 100)
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       transition: {
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.5,
// // // //         ease: [0.25, 0.46, 0.45, 0.94],
// // // //       },
// // // //     },
// // // //   }

// // // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
// // // //               <p className="text-gray-600">Loading notifications...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // // //               <p className="text-gray-600 mb-4">{error}</p>
// // // //               <Button onClick={fetchNotifications} className="bg-emerald-600 hover:bg-emerald-700 text-white">
// // // //                 Try Again
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //       <div className="max-w-5xl mx-auto">
// // // //         {/* Header Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //           className="mb-6 sm:mb-8"
// // // //         >
// // // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md">
// // // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 flex-wrap">
// // // //                 <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm">
// // // //                   {filteredNotifications.length} Total
// // // //                 </Badge>
// // // //                 <Badge className="bg-blue-500 text-white text-xs sm:text-sm">
// // // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                   {sentCount} Sent
// // // //                 </Badge>
// // // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // // //                   <HiMail className="w-3 h-3 mr-1" />
// // // //                   {receivedCount} Received
// // // //                 </Badge>
// // // //                 {unreadCount > 0 && (
// // // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // // //                 )}
// // // //                 {readMessages.length > 0 && (
// // // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                     {readMessages.length} Recently Read
// // // //                   </Badge>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Search and Filter Section */}
// // // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // // //             <div className="relative sm:flex-grow">
// // // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <Input
// // // //                 placeholder="Search notifications..."
// // // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Direction" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="sent">Sent</SelectItem>
// // // //                   <SelectItem value="received">Received</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterType} onValueChange={setFilterType}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // // //                   <SelectValue placeholder="Type" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All Types</SelectItem>
// // // //                   <SelectItem value="poll">Polls</SelectItem>
// // // //                   <SelectItem value="message">Messages</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Status" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="unread">Unread</SelectItem>
// // // //                   <SelectItem value="read">Read</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>

// // // //         {/* Notifications List */}
// // // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // // //           <AnimatePresence>
// // // //             {filteredNotifications.map((notification) => {
// // // //               const isExpanded = expandedItems.has(notification._id)
// // // //               const isPoll = notification.type === "poll"
// // // //               const data = isPoll ? notification.pollData : notification.messageData
// // // //               const isSent = notification.direction === "sent"

// // // //               return (
// // // //                 <motion.div
// // // //                   key={notification._id}
// // // //                   variants={itemVariants}
// // // //                   layout
// // // //                   whileHover={{ scale: 1.01, y: -2 }}
// // // //                   transition={{ duration: 0.2 }}
// // // //                 >
// // // //                   <Card
// // // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // // //                       !notification.isRead ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"
// // // //                     }`}
// // // //                   >
// // // //                     <CardHeader className="pt-4 sm:pt-5">
// // // //                       <div className="flex items-start justify-between gap-3">
// // // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                           <motion.div
// // // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-gradient-to-br from-blue-500 to-blue-600"
// // // //                                   : "bg-gradient-to-br from-purple-500 to-purple-600"
// // // //                                 : isSent
// // // //                                   ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
// // // //                                   : "bg-gradient-to-br from-orange-500 to-orange-600"
// // // //                             }`}
// // // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // // //                             transition={{ duration: 0.2 }}
// // // //                           >
// // // //                             {isPoll ? (
// // // //                               isSent ? (
// // // //                                 <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               ) : (
// // // //                                 <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               )
// // // //                             ) : isSent ? (
// // // //                               <HiPaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             ) : (
// // // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             )}
// // // //                           </motion.div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <div className="flex items-start gap-2 mb-1">
// // // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // // //                                 {isPoll ? `Poll: ${data.course}` : data.title}
// // // //                               </h3>
// // // //                               {!notification.isRead && (
// // // //                                 <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2"></div>
// // // //                               )}
// // // //                               <Badge
// // // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // // //                                   isSent ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
// // // //                                 }`}
// // // //                               >
// // // //                                 {isSent ? (
// // // //                                   <>
// // // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Sent</span>
// // // //                                   </>
// // // //                                 ) : (
// // // //                                   <>
// // // //                                     <HiMail className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Received</span>
// // // //                                   </>
// // // //                                 )}
// // // //                               </Badge>
// // // //                             </div>
// // // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {isPoll ? data.courseCode : data.courseCode}
// // // //                               </span>
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {getRelativeTime(notification.createdAt)}
// // // //                               </span>
// // // //                               {data.prof && <span className="">by {data.prof}</span>}
// // // //                               {!isPoll && data.sender && <span className="">by {data.sender}</span>}
// // // //                               {isPoll && (
// // // //                                 <span className="flex items-center gap-1">
// // // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                   {isSent
// // // //                                     ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                     : `${data.totalVotes} votes`}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // // //                               {isPoll
// // // //                                 ? data.reason
// // // //                                 : data.content.substring(0, 80) + (data.content.length > 80 ? "..." : "")}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // // //                           <Badge
// // // //                             variant={isPoll ? "secondary" : "outline"}
// // // //                             className={`${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-blue-100 text-blue-700"
// // // //                                   : "bg-purple-100 text-purple-700"
// // // //                                 : isSent
// // // //                                   ? "bg-emerald-100 text-emerald-700"
// // // //                                   : "bg-orange-100 text-orange-700"
// // // //                             } text-xs`}
// // // //                           >
// // // //                             {isPoll ? "Poll" : "Message"}
// // // //                           </Badge>
// // // //                           <Button
// // // //                             variant="ghost"
// // // //                             size="sm"
// // // //                             onClick={() => toggleExpanded(notification._id)}
// // // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // // //                           >
// // // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // // //                               <HiChevronRight className="w-4 h-4" />
// // // //                             </motion.div>
// // // //                           </Button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardHeader>

// // // //                     {/* Expandable Content */}
// // // //                     <AnimatePresence>
// // // //                       {isExpanded && (
// // // //                         <motion.div
// // // //                           initial={{ height: 0, opacity: 0 }}
// // // //                           animate={{ height: "auto", opacity: 1 }}
// // // //                           exit={{ height: 0, opacity: 0 }}
// // // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // // //                           className="overflow-hidden"
// // // //                         >
// // // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // // //                             {isPoll ? (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4 sm:space-y-6"
// // // //                               >
// // // //                                 {/* Light text - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // // //                                     {data.prof && <span className="">by {data.prof}</span>}
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiUsers className="w-3 h-3" />
// // // //                                       {isSent
// // // //                                         ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                         : `${data.totalVotes} votes`}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Context */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
// // // //                                       : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // // //                                     <HiInformationCircle
// // // //                                       className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                     />
// // // //                                     Context
// // // //                                   </h4>
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // // //                                     {data.context}
// // // //                                   </p>
// // // //                                   {isSent && (
// // // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiUsers className="w-3 h-3" />
// // // //                                         {data.totalStudents} students
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiChartBar className="w-3 h-3" />
// // // //                                         {data.totalVotes} responses
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiCheck className="w-3 h-3" />
// // // //                                         {getParticipationRate(data.totalVotes, data.totalStudents)}% response rate
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>

// // // //                                 {/* Poll Options */}
// // // //                                 <div className="space-y-3">
// // // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // // //                                       <HiChartBar
// // // //                                         className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                       />
// // // //                                       Poll Statistics:
// // // //                                     </h4>
// // // //                                   </div>
// // // //                                   <div className="space-y-2 sm:space-y-3">
// // // //                                     {data.options.map((option, index) => {
// // // //                                       const votePercentage = getVotePercentage(option.voteCount, data.totalVotes)

// // // //                                       return (
// // // //                                         <motion.div
// // // //                                           key={option._id}
// // // //                                           initial={{ opacity: 0, x: -20 }}
// // // //                                           animate={{ opacity: 1, x: 0 }}
// // // //                                           transition={{ delay: index * 0.1 }}
// // // //                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 border-gray-200 bg-white hover:border-gray-300`}
// // // //                                         >
// // // //                                           {/* Vote percentage bar */}
// // // //                                           <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // // //                                             <motion.div
// // // //                                               className={`h-full opacity-30 ${
// // // //                                                 isSent
// // // //                                                   ? "bg-gradient-to-r from-blue-100 to-blue-200"
// // // //                                                   : "bg-gradient-to-r from-purple-100 to-purple-200"
// // // //                                               }`}
// // // //                                               initial={{ width: 0 }}
// // // //                                               animate={{ width: `${votePercentage}%` }}
// // // //                                               transition={{ duration: 1, delay: 0.5 }}
// // // //                                             />
// // // //                                           </div>
// // // //                                           <div className="relative flex items-center justify-between">
// // // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                                               <div className="flex-1 min-w-0">
// // // //                                                 <div className="flex items-center gap-2 mb-1">
// // // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // // //                                                     {option.day}
// // // //                                                   </span>
// // // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // // //                                                     {formatDate(option.date)}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiClock className="w-3 h-3" />
// // // //                                                     {formatTime(option.start)} - {formatTime(option.end)}
// // // //                                                   </span>
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiLocationMarker className="w-3 h-3" />
// // // //                                                     {option.room}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                               </div>
// // // //                                             </div>
// // // //                                             {/* Vote count and percentage */}
// // // //                                             <div className="text-right flex-shrink-0 ml-2">
// // // //                                               <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // // //                                                 <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                                 {option.voteCount}
// // // //                                               </div>
// // // //                                               <div className="text-xs text-gray-500">{votePercentage}%</div>
// // // //                                             </div>
// // // //                                           </div>
// // // //                                         </motion.div>
// // // //                                       )
// // // //                                     })}
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Statistics Info */}
// // // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // // //                                   {isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
// // // //                                       <span className="text-blue-700">
// // // //                                         This poll was sent to your students. View the current response statistics above.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // // //                                       <span className="text-purple-700">
// // // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             ) : (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4"
// // // //                               >
// // // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="text-xs text-gray-600">by {data.sender}</div>
// // // //                                 </div>

// // // //                                 {/* Full Message Content */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100"
// // // //                                       : "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{data.content}</p>
// // // //                                 </div>

// // // //                                 {/* Message Actions */}
// // // //                                 <div className="flex gap-3">
// // // //                                   {readMessages.includes(notification._id) ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">
// // // //                                         Message opened and marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiPaperAirplane className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">Message sent to students</span>
// // // //                                     </div>
// // // //                                   ) : !notification.isRead ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// // // //                                       <HiInformationCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
// // // //                                       <span className="text-orange-700 font-medium">
// // // //                                         Notification opened - marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             )}
// // // //                           </CardContent>
// // // //                         </motion.div>
// // // //                       )}
// // // //                     </AnimatePresence>
// // // //                   </Card>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </AnimatePresence>
// // // //         </motion.div>

// // // //         {/* Empty State */}
// // // //         {filteredNotifications.length === 0 && !loading && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   )
// // // // }


// // // // "use client"
// // // // import React from "react"
// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import {
// // // //   HiInbox,
// // // //   HiMail,
// // // //   HiClock,
// // // //   HiLocationMarker,
// // // //   HiAcademicCap,
// // // //   HiExclamationCircle,
// // // //   HiInformationCircle,
// // // //   HiCheck,
// // // //   HiSearch,
// // // //   HiChevronRight,
// // // //   HiUsers,
// // // //   HiFilter,
// // // //   HiChartBar,
// // // //   HiEye,
// // // //   HiPaperAirplane,
// // // // } from "react-icons/hi"
// // // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // // // export default function ProfessorInboxPage() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterRead, setFilterRead] = useState("all")
// // // //   const [filterDirection, setFilterDirection] = useState("all")
// // // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [readMessages, setReadMessages] = useState([])

// // // //   useEffect(() => {
// // // //     fetchNotifications()
// // // //   }, [])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       console.log("Getting professor notifications!!")
// // // //       setLoading(true)
// // // //       const response = await fetch("/api/professor/getNotifications", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ profEmail: "abhinav123@iiti.ac.in" }),
// // // //       })
// // // //       const data = await response.json()
// // // //       console.log(response)

// // // //       if (data.success) {
// // // //         // Transform the professor notifications data
// // // //         const transformedNotifications = data.professor
// // // //           .filter((item) => item.notification)
// // // //           .map((item) => {
// // // //             const notification = item.notification
// // // //             const isPoll = notification.type === "poll"

// // // //             // Determine direction: sent if the notification was created by the current professor
// // // //             const isSent = notification.prof && notification.prof.email === "abhinav123@iiti.ac.in"
// // // //             const direction = isSent ? "sent" : "received"

// // // //             if (isPoll) {
// // // //               // For polls, process the votes from the message object
// // // //               const processedVotes = {}
// // // //               let totalVotes = 0

// // // //               if (notification.message && notification.message.votes) {
// // // //                 const pollVotes = notification.message.votes || []
// // // //                 totalVotes = pollVotes.length

// // // //                 // Calculate vote counts for each option
// // // //                 pollVotes.forEach((vote) => {
// // // //                   if (processedVotes[vote.option]) {
// // // //                     processedVotes[vote.option]++
// // // //                   } else {
// // // //                     processedVotes[vote.option] = 1
// // // //                   }
// // // //                 })
// // // //               }

// // // //               // Transform poll data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "poll",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 pollData: {
// // // //                   _id: notification.message._id,
// // // //                   options: notification.message.options.map((option) => ({
// // // //                     ...option,
// // // //                     voteCount: processedVotes[option._id] || 0,
// // // //                   })),
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                   prof: notification.prof ? notification.prof.profName?.[0] || "Unknown" : "Admin",
// // // //                   reason: notification.message.reason,
// // // //                   context: notification.message.context,
// // // //                   isApproved: notification.message.isApproved,
// // // //                   totalVotes: totalVotes,
// // // //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // // //                 },
// // // //               }
// // // //             } else {
// // // //               // Transform message data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "message",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 messageData: {
// // // //                   title: notification.messageTitle || "No Title",
// // // //                   content: typeof notification.message === "string" ? notification.message : "No content",
// // // //                   sender: notification.prof ? notification.prof.profName?.[0] || "Unknown" : "Admin",
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                 },
// // // //               }
// // // //             }
// // // //           })

// // // //         setNotifications(transformedNotifications)
// // // //         setFilteredNotifications(transformedNotifications)
// // // //       } else {
// // // //         setError("Failed to fetch notifications: " + data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching notifications:", error)
// // // //       setError("Error fetching notifications: " + error.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // API call to mark message as read
// // // //   const markMessageAsRead = async (notificationId) => {
// // // //     try {
// // // //       console.log("Marking message as read:", notificationId)
// // // //       const response = await fetch("/api/professor/markAsRead", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           profEmail: "abhinav123@iiti.ac.in",
// // // //           notificationList: notificationId,
// // // //         }),
// // // //       })
// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         console.log("Message marked as read successfully")
// // // //         // Add to read messages array
// // // //         setReadMessages((prev) => [...prev, notificationId])
// // // //       } else {
// // // //         console.error("Failed to mark message as read:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error marking message as read:", error)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (!loading) {
// // // //       filterNotifications()
// // // //     }
// // // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // // //   const filterNotifications = () => {
// // // //     let filtered = notifications

// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter((notification) => {
// // // //         const searchLower = searchTerm.toLowerCase()
// // // //         if (notification.type === "poll") {
// // // //           return (
// // // //             notification.pollData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.courseCode.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.reason.toLowerCase().includes(searchLower)
// // // //           )
// // // //         } else {
// // // //           return (
// // // //             notification.messageData.title.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.sender.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.content.toLowerCase().includes(searchLower)
// // // //           )
// // // //         }
// // // //       })
// // // //     }

// // // //     if (filterType !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // // //     }

// // // //     if (filterRead !== "all") {
// // // //       const isReadFilter = filterRead === "read"
// // // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // // //     }

// // // //     if (filterDirection !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // // //     }

// // // //     setFilteredNotifications(filtered)
// // // //   }

// // // //   const toggleExpanded = async (id) => {
// // // //     const newExpanded = new Set(expandedItems)
// // // //     if (newExpanded.has(id)) {
// // // //       newExpanded.delete(id)
// // // //     } else {
// // // //       newExpanded.add(id)

// // // //       // Find the notification
// // // //       const notification = notifications.find((n) => n._id === id)

// // // //       // If message was unread, mark as read and make API call
// // // //       if (notification && !notification.isRead) {
// // // //         // Update local state immediately
// // // //         setNotifications((prev) =>
// // // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // // //         )

// // // //         // Make API call to mark as read
// // // //         await markMessageAsRead(id)
// // // //       }
// // // //     }
// // // //     setExpandedItems(newExpanded)
// // // //   }

// // // //   const formatTime = (date) => {
// // // //     return new Date(date).toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     })
// // // //   }

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleDateString("en-US", {
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     })
// // // //   }

// // // //   const getRelativeTime = (date) => {
// // // //     const now = new Date()
// // // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // // //     if (diffInHours < 1) return "Just now"
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     const diffInDays = Math.floor(diffInHours / 24)
// // // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // // //     return formatDate(date)
// // // //   }

// // // //   const getVotePercentage = (voteCount, totalVotes) => {
// // // //     if (totalVotes === 0) return 0
// // // //     return Math.round((voteCount / totalVotes) * 100)
// // // //   }

// // // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // // //     if (totalStudents === 0) return 0
// // // //     return Math.round((totalVotes / totalStudents) * 100)
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       transition: {
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.5,
// // // //         ease: [0.25, 0.46, 0.45, 0.94],
// // // //       },
// // // //     },
// // // //   }

// // // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
// // // //               <p className="text-gray-600">Loading notifications...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // // //               <p className="text-gray-600 mb-4">{error}</p>
// // // //               <Button onClick={fetchNotifications} className="bg-emerald-600 hover:bg-emerald-700 text-white">
// // // //                 Try Again
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //       <div className="max-w-5xl mx-auto">
// // // //         {/* Header Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //           className="mb-6 sm:mb-8"
// // // //         >
// // // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md">
// // // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 flex-wrap">
// // // //                 <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm">
// // // //                   {filteredNotifications.length} Total
// // // //                 </Badge>
// // // //                 <Badge className="bg-blue-500 text-white text-xs sm:text-sm">
// // // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                   {sentCount} Sent
// // // //                 </Badge>
// // // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // // //                   <HiMail className="w-3 h-3 mr-1" />
// // // //                   {receivedCount} Received
// // // //                 </Badge>
// // // //                 {unreadCount > 0 && (
// // // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // // //                 )}
// // // //                 {readMessages.length > 0 && (
// // // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                     {readMessages.length} Recently Read
// // // //                   </Badge>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Search and Filter Section */}
// // // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // // //             <div className="relative sm:flex-grow">
// // // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <Input
// // // //                 placeholder="Search notifications..."
// // // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Direction" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="sent">Sent</SelectItem>
// // // //                   <SelectItem value="received">Received</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterType} onValueChange={setFilterType}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // // //                   <SelectValue placeholder="Type" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All Types</SelectItem>
// // // //                   <SelectItem value="poll">Polls</SelectItem>
// // // //                   <SelectItem value="message">Messages</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Status" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="unread">Unread</SelectItem>
// // // //                   <SelectItem value="read">Read</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>

// // // //         {/* Notifications List */}
// // // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // // //           <AnimatePresence>
// // // //             {filteredNotifications.map((notification) => {
// // // //               const isExpanded = expandedItems.has(notification._id)
// // // //               const isPoll = notification.type === "poll"
// // // //               const data = isPoll ? notification.pollData : notification.messageData
// // // //               const isSent = notification.direction === "sent"

// // // //               return (
// // // //                 <motion.div
// // // //                   key={notification._id}
// // // //                   variants={itemVariants}
// // // //                   layout
// // // //                   whileHover={{ scale: 1.01, y: -2 }}
// // // //                   transition={{ duration: 0.2 }}
// // // //                 >
// // // //                   <Card
// // // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // // //                       !notification.isRead ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"
// // // //                     }`}
// // // //                   >
// // // //                     <CardHeader className="pt-4 sm:pt-5">
// // // //                       <div className="flex items-start justify-between gap-3">
// // // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                           <motion.div
// // // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-gradient-to-br from-blue-500 to-blue-600"
// // // //                                   : "bg-gradient-to-br from-purple-500 to-purple-600"
// // // //                                 : isSent
// // // //                                   ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
// // // //                                   : "bg-gradient-to-br from-orange-500 to-orange-600"
// // // //                             }`}
// // // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // // //                             transition={{ duration: 0.2 }}
// // // //                           >
// // // //                             {isPoll ? (
// // // //                               isSent ? (
// // // //                                 <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               ) : (
// // // //                                 <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               )
// // // //                             ) : isSent ? (
// // // //                               <HiPaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             ) : (
// // // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             )}
// // // //                           </motion.div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <div className="flex items-start gap-2 mb-1">
// // // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // // //                                 {isPoll ? `Poll: ${data.course}` : data.title}
// // // //                               </h3>
// // // //                               {!notification.isRead && (
// // // //                                 <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2"></div>
// // // //                               )}
// // // //                               <Badge
// // // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // // //                                   isSent ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
// // // //                                 }`}
// // // //                               >
// // // //                                 {isSent ? (
// // // //                                   <>
// // // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Sent</span>
// // // //                                   </>
// // // //                                 ) : (
// // // //                                   <>
// // // //                                     <HiMail className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Received</span>
// // // //                                   </>
// // // //                                 )}
// // // //                               </Badge>
// // // //                             </div>
// // // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {isPoll ? data.courseCode : data.courseCode}
// // // //                               </span>
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {getRelativeTime(notification.createdAt)}
// // // //                               </span>
// // // //                               {data.prof && <span className="">by {data.prof}</span>}
// // // //                               {!isPoll && data.sender && <span className="">by {data.sender}</span>}
// // // //                               {isPoll && (
// // // //                                 <span className="flex items-center gap-1">
// // // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                   {isSent
// // // //                                     ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                     : `${data.totalVotes} votes`}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // // //                               {isPoll
// // // //                                 ? data.reason
// // // //                                 : data.content.substring(0, 80) + (data.content.length > 80 ? "..." : "")}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // // //                           <Badge
// // // //                             variant={isPoll ? "secondary" : "outline"}
// // // //                             className={`${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-blue-100 text-blue-700"
// // // //                                   : "bg-purple-100 text-purple-700"
// // // //                                 : isSent
// // // //                                   ? "bg-emerald-100 text-emerald-700"
// // // //                                   : "bg-orange-100 text-orange-700"
// // // //                             } text-xs`}
// // // //                           >
// // // //                             {isPoll ? "Poll" : "Message"}
// // // //                           </Badge>
// // // //                           <Button
// // // //                             variant="ghost"
// // // //                             size="sm"
// // // //                             onClick={() => toggleExpanded(notification._id)}
// // // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // // //                           >
// // // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // // //                               <HiChevronRight className="w-4 h-4" />
// // // //                             </motion.div>
// // // //                           </Button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardHeader>

// // // //                     {/* Expandable Content */}
// // // //                     <AnimatePresence>
// // // //                       {isExpanded && (
// // // //                         <motion.div
// // // //                           initial={{ height: 0, opacity: 0 }}
// // // //                           animate={{ height: "auto", opacity: 1 }}
// // // //                           exit={{ height: 0, opacity: 0 }}
// // // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // // //                           className="overflow-hidden"
// // // //                         >
// // // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // // //                             {isPoll ? (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4 sm:space-y-6"
// // // //                               >
// // // //                                 {/* Light text - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // // //                                     {data.prof && <span className="">by {data.prof}</span>}
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiUsers className="w-3 h-3" />
// // // //                                       {isSent
// // // //                                         ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                         : `${data.totalVotes} votes`}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Context */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
// // // //                                       : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // // //                                     <HiInformationCircle
// // // //                                       className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                     />
// // // //                                     Context
// // // //                                   </h4>
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // // //                                     {data.context}
// // // //                                   </p>
// // // //                                   {isSent && (
// // // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiUsers className="w-3 h-3" />
// // // //                                         {data.totalStudents} students
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiChartBar className="w-3 h-3" />
// // // //                                         {data.totalVotes} responses
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiCheck className="w-3 h-3" />
// // // //                                         {getParticipationRate(data.totalVotes, data.totalStudents)}% response rate
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>

// // // //                                 {/* Poll Options */}
// // // //                                 <div className="space-y-3">
// // // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // // //                                       <HiChartBar
// // // //                                         className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                       />
// // // //                                       Poll Statistics:
// // // //                                     </h4>
// // // //                                   </div>
// // // //                                   <div className="space-y-2 sm:space-y-3">
// // // //                                     {data.options.map((option, index) => {
// // // //                                       const votePercentage = getVotePercentage(option.voteCount, data.totalVotes)

// // // //                                       return (
// // // //                                         <motion.div
// // // //                                           key={option._id}
// // // //                                           initial={{ opacity: 0, x: -20 }}
// // // //                                           animate={{ opacity: 1, x: 0 }}
// // // //                                           transition={{ delay: index * 0.1 }}
// // // //                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 border-gray-200 bg-white hover:border-gray-300`}
// // // //                                         >
// // // //                                           {/* Vote percentage bar */}
// // // //                                           <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // // //                                             <motion.div
// // // //                                               className={`h-full opacity-30 ${
// // // //                                                 isSent
// // // //                                                   ? "bg-gradient-to-r from-blue-100 to-blue-200"
// // // //                                                   : "bg-gradient-to-r from-purple-100 to-purple-200"
// // // //                                               }`}
// // // //                                               initial={{ width: 0 }}
// // // //                                               animate={{ width: `${votePercentage}%` }}
// // // //                                               transition={{ duration: 1, delay: 0.5 }}
// // // //                                             />
// // // //                                           </div>
// // // //                                           <div className="relative flex items-center justify-between">
// // // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                                               <div className="flex-1 min-w-0">
// // // //                                                 <div className="flex items-center gap-2 mb-1">
// // // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // // //                                                     {option.day}
// // // //                                                   </span>
// // // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // // //                                                     {formatDate(option.date)}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiClock className="w-3 h-3" />
// // // //                                                     {formatTime(option.start)} - {formatTime(option.end)}
// // // //                                                   </span>
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiLocationMarker className="w-3 h-3" />
// // // //                                                     {option.room}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                               </div>
// // // //                                             </div>
// // // //                                             {/* Vote count and percentage */}
// // // //                                             <div className="text-right flex-shrink-0 ml-2">
// // // //                                               <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // // //                                                 <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                                 {option.voteCount}
// // // //                                               </div>
// // // //                                               <div className="text-xs text-gray-500">{votePercentage}%</div>
// // // //                                             </div>
// // // //                                           </div>
// // // //                                         </motion.div>
// // // //                                       )
// // // //                                     })}
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Statistics Info */}
// // // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // // //                                   {isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
// // // //                                       <span className="text-blue-700">
// // // //                                         This poll was sent to your students. View the current response statistics above.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // // //                                       <span className="text-purple-700">
// // // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             ) : (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4"
// // // //                               >
// // // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="text-xs text-gray-600">by {data.sender}</div>
// // // //                                 </div>

// // // //                                 {/* Full Message Content */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100"
// // // //                                       : "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{data.content}</p>
// // // //                                 </div>

// // // //                                 {/* Message Actions */}
// // // //                                 <div className="flex gap-3">
// // // //                                   {readMessages.includes(notification._id) ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">
// // // //                                         Message opened and marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiPaperAirplane className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">Message sent to students</span>
// // // //                                     </div>
// // // //                                   ) : !notification.isRead ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// // // //                                       <HiInformationCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
// // // //                                       <span className="text-orange-700 font-medium">
// // // //                                         Notification opened - marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             )}
// // // //                           </CardContent>
// // // //                         </motion.div>
// // // //                       )}
// // // //                     </AnimatePresence>
// // // //                   </Card>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </AnimatePresence>
// // // //         </motion.div>

// // // //         {/* Empty State */}
// // // //         {filteredNotifications.length === 0 && !loading && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   )
// // // // }


// // // // "use client"
// // // // import React from "react"
// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import {
// // // //   HiInbox,
// // // //   HiMail,
// // // //   HiClock,
// // // //   HiLocationMarker,
// // // //   HiAcademicCap,
// // // //   HiExclamationCircle,
// // // //   HiInformationCircle,
// // // //   HiCheck,
// // // //   HiSearch,
// // // //   HiChevronRight,
// // // //   HiUsers,
// // // //   HiFilter,
// // // //   HiChartBar,
// // // //   HiEye,
// // // //   HiPaperAirplane,
// // // // } from "react-icons/hi"
// // // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { useSession } from "next-auth/react"
// // // // export default function ProfessorInboxPage() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterRead, setFilterRead] = useState("all")
// // // //   const [filterDirection, setFilterDirection] = useState("all")
// // // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [readMessages, setReadMessages] = useState([])
// // // //   const { data: session, status } = useSession()
// // // //   useEffect(() => {
// // // //     if(!session) return
// // // //     fetchNotifications()
// // // //   }, [session])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       console.log("Getting professor notifications!!")
// // // //       setLoading(true)
// // // //       const response = await fetch("/api/professor/getNotifications", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ profEmail: session.user.email}),
// // // //       })
// // // //       const data = await response.json()
// // // //       console.log(response)
// // // //       console.log("emailsss",session.user.email)
// // // //       if (data.success) {
// // // //         // Transform the professor notifications data
// // // //         const transformedNotifications = data.professor
// // // //           .filter((item) => item.notification)
// // // //           .map((item) => {
// // // //             const notification = item.notification
// // // //             const isPoll = notification.type === "poll"

// // // //             // Determine direction: sent if the notification was created by the current professor
// // // //             const isSent = notification.prof && notification.prof.email === session.user.email
// // // //             const direction = isSent ? "sent" : "received"

// // // //             if (isPoll) {
// // // //               // For polls, process the votes from the message object
// // // //               const processedVotes = {}
// // // //               let totalVotes = 0

// // // //               if (notification.message && notification.message.votes) {
// // // //                 const pollVotes = notification.message.votes || []
// // // //                 totalVotes = pollVotes.length

// // // //                 // Calculate vote counts for each option
// // // //                 pollVotes.forEach((vote) => {
// // // //                   if (processedVotes[vote.option]) {
// // // //                     processedVotes[vote.option]++
// // // //                   } else {
// // // //                     processedVotes[vote.option] = 1
// // // //                   }
// // // //                 })
// // // //               }

// // // //               // Transform poll data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "poll",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 pollData: {
// // // //                   _id: notification.message._id,
// // // //                   options: notification.message.options.map((option) => ({
// // // //                     ...option,
// // // //                     voteCount: processedVotes[option._id] || 0,
// // // //                   })),
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                   prof: notification.prof ? notification.prof.profName?.[0] || "Unknown" : "Admin",
// // // //                   reason: notification.message.reason,
// // // //                   context: notification.message.context,
// // // //                   isApproved: notification.message.isApproved,
// // // //                   totalVotes: totalVotes,
// // // //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // // //                 },
// // // //               }
// // // //             } else {
// // // //               // Transform message data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "message",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 messageData: {
// // // //                   title: notification.messageTitle || "No Title",
// // // //                   content: typeof notification.message === "string" ? notification.message : "No content",
// // // //                   sender: notification.prof ? notification.prof.profName?.[0] || "Unknown" : "Admin",
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                 },
// // // //               }
// // // //             }
// // // //           })

// // // //         setNotifications(transformedNotifications)
// // // //         setFilteredNotifications(transformedNotifications)
// // // //       } else {
// // // //         setError("Failed to fetch notifications: " + data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching notifications:", error)
// // // //       setError("Error fetching notifications: " + error.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // API call to mark message as read
// // // //   const markMessageAsRead = async (notificationId) => {
// // // //     try {
// // // //       console.log("Marking message as read:", notificationId)
// // // //       const response = await fetch("/api/professor/markAsRead", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           profEmail: session.user.email,
// // // //           notificationList: notificationId,
// // // //         }),
// // // //       })
// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         console.log("Message marked as read successfully")
// // // //         // Add to read messages array
// // // //         setReadMessages((prev) => [...prev, notificationId])
// // // //       } else {
// // // //         console.error("Failed to mark message as read:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error marking message as read:", error)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (!loading) {
// // // //       filterNotifications()
// // // //     }
// // // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // // //   const filterNotifications = () => {
// // // //     let filtered = notifications

// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter((notification) => {
// // // //         const searchLower = searchTerm.toLowerCase()
// // // //         if (notification.type === "poll") {
// // // //           return (
// // // //             notification.pollData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.courseCode.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.reason.toLowerCase().includes(searchLower)
// // // //           )
// // // //         } else {
// // // //           return (
// // // //             notification.messageData.title.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.sender.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.content.toLowerCase().includes(searchLower)
// // // //           )
// // // //         }
// // // //       })
// // // //     }

// // // //     if (filterType !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // // //     }

// // // //     if (filterRead !== "all") {
// // // //       const isReadFilter = filterRead === "read"
// // // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // // //     }

// // // //     if (filterDirection !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // // //     }

// // // //     setFilteredNotifications(filtered)
// // // //   }

// // // //   const toggleExpanded = async (id) => {
// // // //     const newExpanded = new Set(expandedItems)
// // // //     if (newExpanded.has(id)) {
// // // //       newExpanded.delete(id)
// // // //     } else {
// // // //       newExpanded.add(id)

// // // //       // Find the notification
// // // //       const notification = notifications.find((n) => n._id === id)

// // // //       // If message was unread, mark as read and make API call
// // // //       if (notification && !notification.isRead) {
// // // //         // Update local state immediately
// // // //         setNotifications((prev) =>
// // // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // // //         )

// // // //         // Make API call to mark as read
// // // //         await markMessageAsRead(id)
// // // //       }
// // // //     }
// // // //     setExpandedItems(newExpanded)
// // // //   }

// // // //   const formatTime = (date) => {
// // // //     return new Date(date).toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     })
// // // //   }

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleDateString("en-US", {
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     })
// // // //   }

// // // //   const getRelativeTime = (date) => {
// // // //     const now = new Date()
// // // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // // //     if (diffInHours < 1) return "Just now"
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     const diffInDays = Math.floor(diffInHours / 24)
// // // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // // //     return formatDate(date)
// // // //   }

// // // //   const getVotePercentage = (voteCount, totalVotes) => {
// // // //     if (totalVotes === 0) return 0
// // // //     return Math.round((voteCount / totalVotes) * 100)
// // // //   }

// // // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // // //     if (totalStudents === 0) return 0
// // // //     return Math.round((totalVotes / totalStudents) * 100)
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       transition: {
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.5,
// // // //         ease: [0.25, 0.46, 0.45, 0.94],
// // // //       },
// // // //     },
// // // //   }

// // // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
// // // //               <p className="text-gray-600">Loading notifications...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // // //               <p className="text-gray-600 mb-4">{error}</p>
// // // //               <Button onClick={fetchNotifications} className="bg-emerald-600 hover:bg-emerald-700 text-white">
// // // //                 Try Again
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-3 sm:p-6">
// // // //       <div className="max-w-5xl mx-auto">
// // // //         {/* Header Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //           className="mb-6 sm:mb-8"
// // // //         >
// // // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md">
// // // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 flex-wrap">
// // // //                 <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm">
// // // //                   {filteredNotifications.length} Total
// // // //                 </Badge>
// // // //                 <Badge className="bg-blue-500 text-white text-xs sm:text-sm">
// // // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                   {sentCount} Sent
// // // //                 </Badge>
// // // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // // //                   <HiMail className="w-3 h-3 mr-1" />
// // // //                   {receivedCount} Received
// // // //                 </Badge>
// // // //                 {unreadCount > 0 && (
// // // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // // //                 )}
// // // //                 {readMessages.length > 0 && (
// // // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                     {readMessages.length} Recently Read
// // // //                   </Badge>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Search and Filter Section */}
// // // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // // //             <div className="relative sm:flex-grow">
// // // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <Input
// // // //                 placeholder="Search notifications..."
// // // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Direction" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="sent">Sent</SelectItem>
// // // //                   <SelectItem value="received">Received</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterType} onValueChange={setFilterType}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // // //                   <SelectValue placeholder="Type" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All Types</SelectItem>
// // // //                   <SelectItem value="poll">Polls</SelectItem>
// // // //                   <SelectItem value="message">Messages</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Status" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="unread">Unread</SelectItem>
// // // //                   <SelectItem value="read">Read</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>

// // // //         {/* Notifications List */}
// // // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // // //           <AnimatePresence>
// // // //             {filteredNotifications.map((notification) => {
// // // //               const isExpanded = expandedItems.has(notification._id)
// // // //               const isPoll = notification.type === "poll"
// // // //               const data = isPoll ? notification.pollData : notification.messageData
// // // //               const isSent = notification.direction === "sent"

// // // //               return (
// // // //                 <motion.div
// // // //                   key={notification._id}
// // // //                   variants={itemVariants}
// // // //                   layout
// // // //                   whileHover={{ scale: 1.01, y: -2 }}
// // // //                   transition={{ duration: 0.2 }}
// // // //                 >
// // // //                   <Card
// // // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // // //                       !notification.isRead ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"
// // // //                     }`}
// // // //                   >
// // // //                     <CardHeader className="pt-4 sm:pt-5">
// // // //                       <div className="flex items-start justify-between gap-3">
// // // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                           <motion.div
// // // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-gradient-to-br from-blue-500 to-blue-600"
// // // //                                   : "bg-gradient-to-br from-purple-500 to-purple-600"
// // // //                                 : isSent
// // // //                                   ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
// // // //                                   : "bg-gradient-to-br from-orange-500 to-orange-600"
// // // //                             }`}
// // // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // // //                             transition={{ duration: 0.2 }}
// // // //                           >
// // // //                             {isPoll ? (
// // // //                               isSent ? (
// // // //                                 <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               ) : (
// // // //                                 <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                               )
// // // //                             ) : isSent ? (
// // // //                               <HiPaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             ) : (
// // // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             )}
// // // //                           </motion.div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <div className="flex items-start gap-2 mb-1">
// // // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // // //                                 {isPoll ? `Poll: ${data.course}` : data.title}
// // // //                               </h3>
// // // //                               {!notification.isRead && (
// // // //                                 <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2"></div>
// // // //                               )}
// // // //                               <Badge
// // // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // // //                                   isSent ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
// // // //                                 }`}
// // // //                               >
// // // //                                 {isSent ? (
// // // //                                   <>
// // // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Sent</span>
// // // //                                   </>
// // // //                                 ) : (
// // // //                                   <>
// // // //                                     <HiMail className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Received</span>
// // // //                                   </>
// // // //                                 )}
// // // //                               </Badge>
// // // //                             </div>
// // // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {isPoll ? data.courseCode : data.courseCode}
// // // //                               </span>
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {getRelativeTime(notification.createdAt)}
// // // //                               </span>
// // // //                               {data.prof && <span className="">by {data.prof}</span>}
// // // //                               {!isPoll && data.sender && <span className="">by {data.sender}</span>}
// // // //                               {isPoll && (
// // // //                                 <span className="flex items-center gap-1">
// // // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                   {isSent
// // // //                                     ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                     : `${data.totalVotes} votes`}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // // //                               {isPoll
// // // //                                 ? data.reason
// // // //                                 : data.content.substring(0, 80) + (data.content.length > 80 ? "..." : "")}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // // //                           <Badge
// // // //                             variant={isPoll ? "secondary" : "outline"}
// // // //                             className={`${
// // // //                               isPoll
// // // //                                 ? isSent
// // // //                                   ? "bg-blue-100 text-blue-700"
// // // //                                   : "bg-purple-100 text-purple-700"
// // // //                                 : isSent
// // // //                                   ? "bg-emerald-100 text-emerald-700"
// // // //                                   : "bg-orange-100 text-orange-700"
// // // //                             } text-xs`}
// // // //                           >
// // // //                             {isPoll ? "Poll" : "Message"}
// // // //                           </Badge>
// // // //                           <Button
// // // //                             variant="ghost"
// // // //                             size="sm"
// // // //                             onClick={() => toggleExpanded(notification._id)}
// // // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // // //                           >
// // // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // // //                               <HiChevronRight className="w-4 h-4" />
// // // //                             </motion.div>
// // // //                           </Button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardHeader>

// // // //                     {/* Expandable Content */}
// // // //                     <AnimatePresence>
// // // //                       {isExpanded && (
// // // //                         <motion.div
// // // //                           initial={{ height: 0, opacity: 0 }}
// // // //                           animate={{ height: "auto", opacity: 1 }}
// // // //                           exit={{ height: 0, opacity: 0 }}
// // // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // // //                           className="overflow-hidden"
// // // //                         >
// // // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // // //                             {isPoll ? (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4 sm:space-y-6"
// // // //                               >
// // // //                                 {/* Light text - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // // //                                     {data.prof && <span className="">by {data.prof}</span>}
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiUsers className="w-3 h-3" />
// // // //                                       {isSent
// // // //                                         ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                         : `${data.totalVotes} votes`}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Context */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
// // // //                                       : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // // //                                     <HiInformationCircle
// // // //                                       className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                     />
// // // //                                     Context
// // // //                                   </h4>
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // // //                                     {data.context}
// // // //                                   </p>
// // // //                                   {isSent && (
// // // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiUsers className="w-3 h-3" />
// // // //                                         {data.totalStudents} students
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiChartBar className="w-3 h-3" />
// // // //                                         {data.totalVotes} responses
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiCheck className="w-3 h-3" />
// // // //                                         {getParticipationRate(data.totalVotes, data.totalStudents)}% response rate
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>

// // // //                                 {/* Poll Options */}
// // // //                                 <div className="space-y-3">
// // // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // // //                                       <HiChartBar
// // // //                                         className={`w-4 h-4 ${isSent ? "text-blue-600" : "text-purple-600"}`}
// // // //                                       />
// // // //                                       Poll Statistics:
// // // //                                     </h4>
// // // //                                   </div>
// // // //                                   <div className="space-y-2 sm:space-y-3">
// // // //                                     {data.options.map((option, index) => {
// // // //                                       const votePercentage = getVotePercentage(option.voteCount, data.totalVotes)

// // // //                                       return (
// // // //                                         <motion.div
// // // //                                           key={option._id}
// // // //                                           initial={{ opacity: 0, x: -20 }}
// // // //                                           animate={{ opacity: 1, x: 0 }}
// // // //                                           transition={{ delay: index * 0.1 }}
// // // //                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 border-gray-200 bg-white hover:border-gray-300`}
// // // //                                         >
// // // //                                           {/* Vote percentage bar */}
// // // //                                           <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // // //                                             <motion.div
// // // //                                               className={`h-full opacity-30 ${
// // // //                                                 isSent
// // // //                                                   ? "bg-gradient-to-r from-blue-100 to-blue-200"
// // // //                                                   : "bg-gradient-to-r from-purple-100 to-purple-200"
// // // //                                               }`}
// // // //                                               initial={{ width: 0 }}
// // // //                                               animate={{ width: `${votePercentage}%` }}
// // // //                                               transition={{ duration: 1, delay: 0.5 }}
// // // //                                             />
// // // //                                           </div>
// // // //                                           <div className="relative flex items-center justify-between">
// // // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                                               <div className="flex-1 min-w-0">
// // // //                                                 <div className="flex items-center gap-2 mb-1">
// // // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // // //                                                     {option.day}
// // // //                                                   </span>
// // // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // // //                                                     {formatDate(option.date)}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiClock className="w-3 h-3" />
// // // //                                                     {formatTime(option.start)} - {formatTime(option.end)}
// // // //                                                   </span>
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiLocationMarker className="w-3 h-3" />
// // // //                                                     {option.room}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                               </div>
// // // //                                             </div>
// // // //                                             {/* Vote count and percentage */}
// // // //                                             <div className="text-right flex-shrink-0 ml-2">
// // // //                                               <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // // //                                                 <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                                 {option.voteCount}
// // // //                                               </div>
// // // //                                               <div className="text-xs text-gray-500">{votePercentage}%</div>
// // // //                                             </div>
// // // //                                           </div>
// // // //                                         </motion.div>
// // // //                                       )
// // // //                                     })}
// // // //                                   </div>
// // // //                                 </div>

// // // //                                 {/* Poll Statistics Info */}
// // // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // // //                                   {isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
// // // //                                       <span className="text-blue-700">
// // // //                                         This poll was sent to your students. View the current response statistics above.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // // //                                       <span className="text-purple-700">
// // // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             ) : (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4"
// // // //                               >
// // // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="text-xs text-gray-600">by {data.sender}</div>
// // // //                                 </div>

// // // //                                 {/* Full Message Content */}
// // // //                                 <div
// // // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // // //                                     isSent
// // // //                                       ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-100"
// // // //                                       : "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
// // // //                                   }`}
// // // //                                 >
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{data.content}</p>
// // // //                                 </div>

// // // //                                 {/* Message Actions */}
// // // //                                 <div className="flex gap-3">
// // // //                                   {readMessages.includes(notification._id) ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">
// // // //                                         Message opened and marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
// // // //                                       <HiPaperAirplane className="w-4 h-4 text-emerald-600 flex-shrink-0" />
// // // //                                       <span className="text-emerald-700 font-medium">Message sent to students</span>
// // // //                                     </div>
// // // //                                   ) : !notification.isRead ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// // // //                                       <HiInformationCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
// // // //                                       <span className="text-orange-700 font-medium">
// // // //                                         Notification opened - marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             )}
// // // //                           </CardContent>
// // // //                         </motion.div>
// // // //                       )}
// // // //                     </AnimatePresence>
// // // //                   </Card>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </AnimatePresence>
// // // //         </motion.div>

// // // //         {/* Empty State */}
// // // //         {filteredNotifications.length === 0 && !loading && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   )
// // // // }


// // // // "use client"
// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import {
// // // //   HiInbox,
// // // //   HiMail,
// // // //   HiClock,
// // // //   HiLocationMarker,
// // // //   HiAcademicCap,
// // // //   HiExclamationCircle,
// // // //   HiInformationCircle,
// // // //   HiCheck,
// // // //   HiSearch,
// // // //   HiChevronRight,
// // // //   HiUsers,
// // // //   HiFilter,
// // // //   HiChartBar,
// // // //   HiEye,
// // // //   HiPaperAirplane,
// // // // } from "react-icons/hi"
// // // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { useSession } from "next-auth/react"

// // // // export default function ProfessorInboxPage() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterRead, setFilterRead] = useState("all")
// // // //   const [filterDirection, setFilterDirection] = useState("all")
// // // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [readMessages, setReadMessages] = useState([])
// // // //   const { data: session, status } = useSession()

// // // //   useEffect(() => {
// // // //     if (!session) return
// // // //     fetchNotifications()
// // // //   }, [session])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       console.log("Getting professor notifications!!")
// // // //       setLoading(true)
// // // //       const response = await fetch("/api/professor/getNotifications", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ profEmail: session.user.email }),
// // // //       })
// // // //       const data = await response.json()
// // // //       console.log(response)
// // // //       console.log("emailsss", session.user.email)
// // // //       if (data.success) {
// // // //         // Transform the professor notifications data
// // // //         const transformedNotifications = data.professor
// // // //           .filter((item) => item.notification)
// // // //           .map((item) => {
// // // //             const notification = item.notification
// // // //             const isPoll = notification.type === "poll"
// // // //             // Determine direction: sent if the notification was created by the current professor
// // // //             const isSent = notification.prof && notification.prof.email === session.user.email
// // // //             const direction = isSent ? "sent" : "received"

// // // //             if (isPoll) {
// // // //               // For polls, process the votes from the message object
// // // //               const processedVotes = {}
// // // //               let totalVotes = 0
// // // //               if (notification.message && notification.message.votes) {
// // // //                 const pollVotes = notification.message.votes || []
// // // //                 totalVotes = pollVotes.length
// // // //                 // Calculate vote counts for each option
// // // //                 pollVotes.forEach((vote) => {
// // // //                   if (processedVotes[vote.option]) {
// // // //                     processedVotes[vote.option]++
// // // //                   } else {
// // // //                     processedVotes[vote.option] = 1
// // // //                   }
// // // //                 })
// // // //               }

// // // //               // Transform poll data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "poll",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 pollData: {
// // // //                   _id: notification.message._id,
// // // //                   options: notification.message.options.map((option) => ({
// // // //                     ...option,
// // // //                     voteCount: processedVotes[option._id] || 0,
// // // //                   })),
// // //                   // course: notification.course ? notification.course.title : "Unknown Course",
// // //                   // courseCode: notification.course ? notification.course.courseCode : "N/A",
// // //                   // prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // //                   // reason: notification.message.reason,
// // //                   // context: notification.message.context,
// // //                   // isApproved: notification.message.isApproved,
// // //                   // totalVotes: totalVotes,
// // //                   // totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // // //                 },
// // // //               }
// // // //             } else {
// // // //               // Transform message data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "message",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // //                 // messageData: {
// // //                 //   title: notification.messageTitle || "No Title",
// // //                 //   content: typeof notification.message === "string" ? notification.message : "No content",
// // //                 //   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // //                 //   course: notification.course ? notification.course.title : "Unknown Course",
// // //                 //   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                 },
// // // //               }
// // // //             }
// // // //           })
// // // //         setNotifications(transformedNotifications)
// // // //         setFilteredNotifications(transformedNotifications)
// // // //       } else {
// // // //         setError("Failed to fetch notifications: " + data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching notifications:", error)
// // // //       setError("Error fetching notifications: " + error.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // API call to mark message as read
// // // //   const markMessageAsRead = async (notificationId) => {
// // // //     try {
// // // //       console.log("Marking message as read:", notificationId)
// // // //       const response = await fetch("/api/professor/markAsRead", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           profEmail: session.user.email,
// // // //           notificationList: notificationId,
// // // //         }),
// // // //       })
// // // //       const data = await response.json()
// // // //       if (data.success) {
// // // //         console.log("Message marked as read successfully")
// // // //         // Add to read messages array
// // // //         setReadMessages((prev) => [...prev, notificationId])
// // // //       } else {
// // // //         console.error("Failed to mark message as read:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error marking message as read:", error)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (!loading) {
// // // //       filterNotifications()
// // // //     }
// // // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // // //   const filterNotifications = () => {
// // // //     let filtered = notifications
// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter((notification) => {
// // // //         const searchLower = searchTerm.toLowerCase()
// // // //         if (notification.type === "poll") {
// // // //           return (
// // // //             notification.pollData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.courseCode.toLowerCase().includes(searchLower) ||
// // // //             notification.pollData.reason.toLowerCase().includes(searchLower)
// // // //           )
// // // //         } else {
// // // //           return (
// // // //             notification.messageData.title.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.course.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.sender.toLowerCase().includes(searchLower) ||
// // // //             notification.messageData.content.toLowerCase().includes(searchLower)
// // // //           )
// // // //         }
// // // //       })
// // // //     }
// // // //     if (filterType !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // // //     }
// // // //     if (filterRead !== "all") {
// // // //       const isReadFilter = filterRead === "read"
// // // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // // //     }
// // // //     if (filterDirection !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // // //     }
// // // //     setFilteredNotifications(filtered)
// // // //   }

// // // //   const toggleExpanded = async (id) => {
// // // //     const newExpanded = new Set(expandedItems)
// // // //     if (newExpanded.has(id)) {
// // // //       newExpanded.delete(id)
// // // //     } else {
// // // //       newExpanded.add(id)
// // // //       // Find the notification
// // // //       const notification = notifications.find((n) => n._id === id)
// // // //       // If message was unread, mark as read and make API call
// // // //       if (notification && !notification.isRead) {
// // // //         // Update local state immediately
// // // //         setNotifications((prev) =>
// // // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // // //         )
// // // //         // Make API call to mark as read
// // // //         await markMessageAsRead(id)
// // // //       }
// // // //     }
// // // //     setExpandedItems(newExpanded)
// // // //   }

// // // //   const formatTime = (date) => {
// // // //     return new Date(date).toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     })
// // // //   }

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleDateString("en-US", {
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     })
// // // //   }

// // // //   const getRelativeTime = (date) => {
// // // //     const now = new Date()
// // // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // // //     if (diffInHours < 1) return "Just now"
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     const diffInDays = Math.floor(diffInHours / 24)
// // // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // // //     return formatDate(date)
// // // //   }

// // // //   const getVotePercentage = (voteCount, totalVotes) => {
// // // //     if (totalVotes === 0) return 0
// // // //     return Math.round((voteCount / totalVotes) * 100)
// // // //   }

// // // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // // //     if (totalStudents === 0) return 0
// // // //     return Math.round((totalVotes / totalStudents) * 100)
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       transition: {
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.5,
// // // //         ease: [0.25, 0.46, 0.45, 0.94],
// // // //       },
// // // //     },
// // // //   }

// // // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // //               <p className="text-gray-600">Loading notifications...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // // //               <p className="text-gray-600 mb-4">{error}</p>
// // // //               <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
// // // //                 Try Again
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //       <div className="max-w-5xl mx-auto">
// // // //         {/* Header Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //           className="mb-6 sm:mb-8"
// // // //         >
// // // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
// // // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 flex-wrap">
// // // //                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
// // // //                   {filteredNotifications.length} Total
// // // //                 </Badge>
// // // //                 <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                   {sentCount} Sent
// // // //                 </Badge>
// // // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // // //                   <HiMail className="w-3 h-3 mr-1" />
// // // //                   {receivedCount} Received
// // // //                 </Badge>
// // // //                 {unreadCount > 0 && (
// // // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // // //                 )}
// // // //                 {readMessages.length > 0 && (
// // // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                     {readMessages.length} Recently Read
// // // //                   </Badge>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           {/* Search and Filter Section */}
// // // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // // //             <div className="relative sm:flex-grow">
// // // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <Input
// // // //                 placeholder="Search notifications..."
// // // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Direction" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="sent">Sent</SelectItem>
// // // //                   <SelectItem value="received">Received</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterType} onValueChange={setFilterType}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // // //                   <SelectValue placeholder="Type" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All Types</SelectItem>
// // // //                   <SelectItem value="poll">Polls</SelectItem>
// // // //                   <SelectItem value="message">Messages</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Status" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="unread">Unread</SelectItem>
// // // //                   <SelectItem value="read">Read</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>
// // // //         {/* Notifications List */}
// // // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // // //           <AnimatePresence>
// // // //             {filteredNotifications.map((notification) => {
// // // //               const isExpanded = expandedItems.has(notification._id)
// // // //               const isPoll = notification.type === "poll"
// // // //               const data = isPoll ? notification.pollData : notification.messageData
// // // //               const isSent = notification.direction === "sent"
// // // //               return (
// // // //                 <motion.div
// // // //                   key={notification._id}
// // // //                   variants={itemVariants}
// // // //                   layout
// // // //                   whileHover={{ scale: 1.01, y: -2 }}
// // // //                   transition={{ duration: 0.2 }}
// // // //                 >
// // // //                   <Card
// // // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // // //                       !notification.isRead ? "border-blue-200 bg-blue-50/30" : "border-gray-100"
// // // //                     }`}
// // // //                   >
// // // //                     <CardHeader className="pt-4 sm:pt-5">
// // // //                       <div className="flex items-start justify-between gap-3">
// // // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                           <motion.div
// // // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // // //                               isPoll
// // // //                                 ? "bg-gradient-to-br from-purple-500 to-purple-600"
// // // //                                 : "bg-gradient-to-br from-green-500 to-green-600"
// // // //                             }`}
// // // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // // //                             transition={{ duration: 0.2 }}
// // // //                           >
// // // //                             {isPoll ? (
// // // //                               <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             ) : (
// // // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             )}
// // // //                           </motion.div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <div className="flex items-start gap-2 mb-1">
// // // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // // //                                 {isPoll ? `Poll: ${data.course}` : data.title}
// // // //                               </h3>
// // // //                               {!notification.isRead && (
// // // //                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
// // // //                               )}
// // // //                               <Badge
// // // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // // //                                   isSent ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
// // // //                                 }`}
// // // //                               >
// // // //                                 {isSent ? (
// // // //                                   <>
// // // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Sent</span>
// // // //                                   </>
// // // //                                 ) : (
// // // //                                   <>
// // // //                                     <HiMail className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Received</span>
// // // //                                   </>
// // // //                                 )}
// // // //                               </Badge>
// // // //                             </div>
// // // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {isPoll ? data.courseCode : data.courseCode}
// // // //                               </span>
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {getRelativeTime(notification.createdAt)}
// // // //                               </span>
// // // //                               {data.prof && <span className="">by {data.prof}</span>}
// // // //                               {!isPoll && data.sender && <span className="">by {data.sender}</span>}
// // // //                               {isPoll && (
// // // //                                 <span className="flex items-center gap-1">
// // // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                   {isSent
// // // //                                     ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                     : `${data.totalVotes} votes`}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // // //                               {isPoll
// // // //                                 ? data.reason
// // // //                                 : data.content.substring(0, 80) + (data.content.length > 80 ? "..." : "")}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // // //                           <Badge
// // // //                             variant={isPoll ? "secondary" : "outline"}
// // // //                             className={`${
// // // //                               isPoll ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
// // // //                             } text-xs`}
// // // //                           >
// // // //                             {isPoll ? "Poll" : "Message"}
// // // //                           </Badge>
// // // //                           <Button
// // // //                             variant="ghost"
// // // //                             size="sm"
// // // //                             onClick={() => toggleExpanded(notification._id)}
// // // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // // //                           >
// // // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // // //                               <HiChevronRight className="w-4 h-4" />
// // // //                             </motion.div>
// // // //                           </Button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardHeader>
// // // //                     {/* Expandable Content */}
// // // //                     <AnimatePresence>
// // // //                       {isExpanded && (
// // // //                         <motion.div
// // // //                           initial={{ height: 0, opacity: 0 }}
// // // //                           animate={{ height: "auto", opacity: 1 }}
// // // //                           exit={{ height: 0, opacity: 0 }}
// // // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // // //                           className="overflow-hidden"
// // // //                         >
// // // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // // //                             {isPoll ? (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4 sm:space-y-6"
// // // //                               >
// // // //                                 {/* Light text - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // // //                                     {data.prof && <span className="">by {data.prof}</span>}
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiUsers className="w-3 h-3" />
// // // //                                       {isSent
// // // //                                         ? `${getParticipationRate(data.totalVotes, data.totalStudents)}% response`
// // // //                                         : `${data.totalVotes} votes`}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                 </div>
// // // //                                 {/* Poll Context */}
// // // //                                 <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100">
// // // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // // //                                     <HiInformationCircle className="w-4 h-4 text-purple-600" />
// // // //                                     Context
// // // //                                   </h4>
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // // //                                     {data.context}
// // // //                                   </p>
// // // //                                   {isSent && (
// // // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiUsers className="w-3 h-3" />
// // // //                                         {data.totalStudents} students
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiChartBar className="w-3 h-3" />
// // // //                                         {data.totalVotes} responses
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiCheck className="w-3 h-3" />
// // // //                                         {getParticipationRate(data.totalVotes, data.totalStudents)}% response rate
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                                 {/* Poll Options */}
// // // //                                 <div className="space-y-3">
// // // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // // //                                       <HiChartBar className="w-4 h-4 text-purple-600" />
// // // //                                       Poll Statistics:
// // // //                                     </h4>
// // // //                                   </div>
// // // //                                   <div className="space-y-2 sm:space-y-3">
// // // //                                     {data.options.map((option, index) => {
// // // //                                       const votePercentage = getVotePercentage(option.voteCount, data.totalVotes)
// // // //                                       return (
// // // //                                         <motion.div
// // // //                                           key={option._id}
// // // //                                           initial={{ opacity: 0, x: -20 }}
// // // //                                           animate={{ opacity: 1, x: 0 }}
// // // //                                           transition={{ delay: index * 0.1 }}
// // // //                                           className="relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 border-gray-200 bg-white hover:border-gray-300"
// // // //                                         >
// // // //                                           {/* Vote percentage bar */}
// // // //                                           <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // // //                                             <motion.div
// // // //                                               className="h-full opacity-30 bg-gradient-to-r from-purple-100 to-purple-200"
// // // //                                               initial={{ width: 0 }}
// // // //                                               animate={{ width: `${votePercentage}%` }}
// // // //                                               transition={{ duration: 1, delay: 0.5 }}
// // // //                                             />
// // // //                                           </div>
// // // //                                           <div className="relative flex items-center justify-between">
// // // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                                               <div className="flex-1 min-w-0">
// // // //                                                 <div className="flex items-center gap-2 mb-1">
// // // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // // //                                                     {option.day}
// // // //                                                   </span>
// // // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // // //                                                     {formatDate(option.date)}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiClock className="w-3 h-3" />
// // // //                                                     {formatTime(option.start)} - {formatTime(option.end)}
// // // //                                                   </span>
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiLocationMarker className="w-3 h-3" />
// // // //                                                     {option.room}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                               </div>
// // // //                                             </div>
// // // //                                             {/* Vote count and percentage */}
// // // //                                             <div className="text-right flex-shrink-0 ml-2">
// // // //                                               <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // // //                                                 <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                                 {option.voteCount}
// // // //                                               </div>
// // // //                                               <div className="text-xs text-gray-500">{votePercentage}%</div>
// // // //                                             </div>
// // // //                                           </div>
// // // //                                         </motion.div>
// // // //                                       )
// // // //                                     })}
// // // //                                   </div>
// // // //                                 </div>
// // // //                                 {/* Poll Statistics Info */}
// // // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // // //                                   {isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
// // // //                                       <span className="text-green-700">
// // // //                                         This poll was sent to your students. View the current response statistics above.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // // //                                       <span className="text-purple-700">
// // // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             ) : (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4"
// // // //                               >
// // // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data.courseCode}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="text-xs text-gray-600">by {data.sender}</div>
// // // //                                 </div>
// // // //                                 {/* Full Message Content */}
// // // //                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{data.content}</p>
// // // //                                 </div>
// // // //                                 {/* Message Actions */}
// // // //                                 <div className="flex gap-3">
// // // //                                   {readMessages.includes(notification._id) ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">
// // // //                                         Message opened and marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message sent to students</span>
// // // //                                     </div>
// // // //                                   ) : !notification.isRead ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // // //                                       <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
// // // //                                       <span className="text-blue-700 font-medium">
// // // //                                         Notification opened - marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             )}
// // // //                           </CardContent>
// // // //                         </motion.div>
// // // //                       )}
// // // //                     </AnimatePresence>
// // // //                   </Card>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </AnimatePresence>
// // // //         </motion.div>
// // // //         {/* Empty State */}
// // // //         {filteredNotifications.length === 0 && !loading && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   )
// // // // }


// // // // "use client"
// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import { useRouter, useSearchParams } from "next/navigation"
// // // // import {
// // // //   HiInbox,
// // // //   HiMail,
// // // //   HiClock,
// // // //   HiLocationMarker,
// // // //   HiAcademicCap,
// // // //   HiExclamationCircle,
// // // //   HiInformationCircle,
// // // //   HiCheck,
// // // //   HiSearch,
// // // //   HiChevronRight,
// // // //   HiUsers,
// // // //   HiFilter,
// // // //   HiChartBar,
// // // //   HiEye,
// // // //   HiPaperAirplane,
// // // // } from "react-icons/hi"
// // // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { useSession } from "next-auth/react"

// // // // export default function ProfessorInboxPage() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterRead, setFilterRead] = useState("all")
// // // //   const [filterDirection, setFilterDirection] = useState("all")
// // // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [readMessages, setReadMessages] = useState([])
// // // //   const { data: session, status } = useSession()
// // // //   const router = useRouter()
// // // //   const searchParams = useSearchParams()

// // // //   // Check for search parameter from dashboard navigation
// // // //   useEffect(() => {
// // // //     const searchFromDashboard = searchParams.get("search")
// // // //     if (searchFromDashboard) {
// // // //       setSearchTerm(decodeURIComponent(searchFromDashboard))
// // // //     }
// // // //   }, [searchParams])

// // // //   useEffect(() => {
// // // //     if (!session) return
// // // //     fetchNotifications()
// // // //   }, [session])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       console.log("Getting professor notifications!!")
// // // //       setLoading(true)
// // // //       const response = await fetch("/api/professor/getNotifications", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ profEmail: session.user.email }),
// // // //       })
// // // //       const data = await response.json()
// // // //       console.log(response)
// // // //       console.log("emailsss", session.user.email)
// // // //       if (data.success) {
// // // //         // Transform the professor notifications data
// // // //         const transformedNotifications = data.professor
// // // //           .filter((item) => item.notification)
// // // //           .map((item) => {
// // // //             const notification = item.notification
// // // //             const isPoll = notification.type === "poll"
// // // //             // Determine direction: sent if the notification was created by the current professor
// // // //             const isSent = notification.prof && notification.prof.email === session.user.email
// // // //             const direction = isSent ? "sent" : "received"
// // // //             if (isPoll) {
// // // //               // For polls, process the votes from the message object
// // // //               const processedVotes = {}
// // // //               let totalVotes = 0
// // // //               if (notification.message && notification.message.votes) {
// // // //                 const pollVotes = notification.message.votes || []
// // // //                 totalVotes = pollVotes.length
// // // //                 // Calculate vote counts for each option
// // // //                 pollVotes.forEach((vote) => {
// // // //                   if (processedVotes[vote.option]) {
// // // //                     processedVotes[vote.option]++
// // // //                   } else {
// // // //                     processedVotes[vote.option] = 1
// // // //                   }
// // // //                 })
// // // //               }
// // // //               // Transform poll data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "poll",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 pollData: {
// // // //                   _id: notification.message?._id || "",
// // // //                   options:
// // // //                     notification.message?.options?.map((option) => ({
// // // //                       ...option,
// // // //                       voteCount: processedVotes[option._id] || 0,
// // // //                     })) || [],
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                   prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // // //                   reason: notification.message.reason,
// // // //                   context: notification.message.context,
// // // //                   isApproved: notification.message.isApproved,
// // // //                   totalVotes: totalVotes,
// // // //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // // //                 },
// // // //               }
// // // //             } else {
// // // //               // Transform message data to match expected structure
// // // //               return {
// // // //                 _id: item._id,
// // // //                 message: notification._id,
// // // //                 type: "message",
// // // //                 direction: direction,
// // // //                 isRead: item.isRead === true,
// // // //                 createdAt: notification.createdAt,
// // // //                 updatedAt: notification.updatedAt,
// // // //                 messageData: {
// // // //                   title: notification.messageTitle || "No Title",
// // // //                   content: typeof notification.message === "string" ? notification.message : "No content",
// // // //                   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // // //                 },
// // // //               }
// // // //             }
// // // //           })
// // // //         setNotifications(transformedNotifications)
// // // //         setFilteredNotifications(transformedNotifications)
// // // //       } else {
// // // //         setError("Failed to fetch notifications: " + data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching notifications:", error)
// // // //       setError("Error fetching notifications: " + error.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // API call to mark message as read
// // // //   const markMessageAsRead = async (notificationId) => {
// // // //     try {
// // // //       console.log("Marking message as read:", notificationId)
// // // //       const response = await fetch("/api/professor/markAsRead", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           profEmail: session.user.email,
// // // //           notificationList: notificationId,
// // // //         }),
// // // //       })
// // // //       const data = await response.json()
// // // //       if (data.success) {
// // // //         console.log("Message marked as read successfully")
// // // //         // Add to read messages array
// // // //         setReadMessages((prev) => [...prev, notificationId])
// // // //       } else {
// // // //         console.error("Failed to mark message as read:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error marking message as read:", error)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     if (!loading) {
// // // //       filterNotifications()
// // // //     }
// // // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // // //   const filterNotifications = () => {
// // // //     let filtered = notifications
// // // //     if (searchTerm) {
// // // //       filtered = filtered.filter((notification) => {
// // // //         const searchLower = searchTerm.toLowerCase()
// // // //         if (notification.type === "poll") {
// // // //           const course = notification.pollData?.course || ""
// // // //           const courseCode = notification.pollData?.courseCode || ""
// // // //           const reason = notification.pollData?.reason || ""
// // // //           return (
// // // //             course.toLowerCase().includes(searchLower) ||
// // // //             courseCode.toLowerCase().includes(searchLower) ||
// // // //             reason.toLowerCase().includes(searchLower)
// // // //           )
// // // //         } else {
// // // //           const title = notification.messageData?.title || ""
// // // //           const course = notification.messageData?.course || ""
// // // //           const sender = notification.messageData?.sender || ""
// // // //           const content = notification.messageData?.content || ""
// // // //           return (
// // // //             title.toLowerCase().includes(searchLower) ||
// // // //             course.toLowerCase().includes(searchLower) ||
// // // //             sender.toLowerCase().includes(searchLower) ||
// // // //             content.toLowerCase().includes(searchLower)
// // // //           )
// // // //         }
// // // //       })
// // // //     }
// // // //     if (filterType !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // // //     }
// // // //     if (filterRead !== "all") {
// // // //       const isReadFilter = filterRead === "read"
// // // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // // //     }
// // // //     if (filterDirection !== "all") {
// // // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // // //     }
// // // //     setFilteredNotifications(filtered)
// // // //   }

// // // //   const toggleExpanded = async (id) => {
// // // //     const newExpanded = new Set(expandedItems)
// // // //     if (newExpanded.has(id)) {
// // // //       newExpanded.delete(id)
// // // //     } else {
// // // //       newExpanded.add(id)
// // // //       // Find the notification
// // // //       const notification = notifications.find((n) => n._id === id)
// // // //       // If message was unread, mark as read and make API call
// // // //       if (notification && !notification.isRead) {
// // // //         // Update local state immediately
// // // //         setNotifications((prev) =>
// // // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // // //         )
// // // //         // Make API call to mark as read
// // // //         await markMessageAsRead(id)
// // // //       }
// // // //     }
// // // //     setExpandedItems(newExpanded)
// // // //   }

// // // //   const formatTime = (date) => {
// // // //     return new Date(date).toLocaleTimeString("en-US", {
// // // //       hour: "numeric",
// // // //       minute: "2-digit",
// // // //       hour12: true,
// // // //     })
// // // //   }

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleDateString("en-US", {
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       year: "numeric",
// // // //     })
// // // //   }

// // // //   const getRelativeTime = (date) => {
// // // //     const now = new Date()
// // // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // // //     if (diffInHours < 1) return "Just now"
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     const diffInDays = Math.floor(diffInHours / 24)
// // // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // // //     return formatDate(date)
// // // //   }

// // // //   const getVotePercentage = (voteCount, totalVotes) => {
// // // //     if (totalVotes === 0) return 0
// // // //     return Math.round((voteCount / totalVotes) * 100)
// // // //   }

// // // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // // //     if (totalStudents === 0) return 0
// // // //     return Math.round((totalVotes / totalStudents) * 100)
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       transition: {
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.5,
// // // //         ease: [0.25, 0.46, 0.45, 0.94],
// // // //       },
// // // //     },
// // // //   }

// // // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // // //               <p className="text-gray-600">Loading notifications...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //         <div className="max-w-5xl mx-auto">
// // // //           <div className="flex items-center justify-center py-12">
// // // //             <div className="text-center">
// // // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // // //               <p className="text-gray-600 mb-4">{error}</p>
// // // //               <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
// // // //                 Try Again
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // // //       <div className="max-w-5xl mx-auto">
// // // //         {/* Header Section */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //           className="mb-6 sm:mb-8"
// // // //         >
// // // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
// // // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 flex-wrap">
// // // //                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
// // // //                   {filteredNotifications.length} Total
// // // //                 </Badge>
// // // //                 <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                   {sentCount} Sent
// // // //                 </Badge>
// // // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // // //                   <HiMail className="w-3 h-3 mr-1" />
// // // //                   {receivedCount} Received
// // // //                 </Badge>
// // // //                 {unreadCount > 0 && (
// // // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // // //                 )}
// // // //                 {readMessages.length > 0 && (
// // // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // // //                     {readMessages.length} Recently Read
// // // //                   </Badge>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           {/* Search and Filter Section */}
// // // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // // //             <div className="relative sm:flex-grow">
// // // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <Input
// // // //                 placeholder="Search notifications..."
// // // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Direction" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="sent">Sent</SelectItem>
// // // //                   <SelectItem value="received">Received</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterType} onValueChange={setFilterType}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // // //                   <SelectValue placeholder="Type" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All Types</SelectItem>
// // // //                   <SelectItem value="poll">Polls</SelectItem>
// // // //                   <SelectItem value="message">Messages</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // // //                   <SelectValue placeholder="Status" />
// // // //                 </SelectTrigger>
// // // //                 <SelectContent>
// // // //                   <SelectItem value="all">All</SelectItem>
// // // //                   <SelectItem value="unread">Unread</SelectItem>
// // // //                   <SelectItem value="read">Read</SelectItem>
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>

// // // //         {/* Notifications List */}
// // // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // // //           <AnimatePresence>
// // // //             {filteredNotifications.map((notification) => {
// // // //               const isExpanded = expandedItems.has(notification._id)
// // // //               const isPoll = notification.type === "poll"
// // // //               const data = isPoll ? notification.pollData : notification.messageData
// // // //               const isSent = notification.direction === "sent"
// // // //               return (
// // // //                 <motion.div
// // // //                   key={notification._id}
// // // //                   variants={itemVariants}
// // // //                   layout
// // // //                   whileHover={{ scale: 1.01, y: -2 }}
// // // //                   transition={{ duration: 0.2 }}
// // // //                 >
// // // //                   <Card
// // // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // // //                       !notification.isRead ? "border-blue-200 bg-blue-50/30" : "border-gray-100"
// // // //                     }`}
// // // //                   >
// // // //                     <CardHeader className="pt-4 sm:pt-5">
// // // //                       <div className="flex items-start justify-between gap-3">
// // // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                           <motion.div
// // // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // // //                               isPoll
// // // //                                 ? "bg-gradient-to-br from-purple-500 to-purple-600"
// // // //                                 : "bg-gradient-to-br from-green-500 to-green-600"
// // // //                             }`}
// // // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // // //                             transition={{ duration: 0.2 }}
// // // //                           >
// // // //                             {isPoll ? (
// // // //                               <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             ) : (
// // // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // // //                             )}
// // // //                           </motion.div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <div className="flex items-start gap-2 mb-1">
// // // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // // //                                 {isPoll ? `Poll: ${data?.course || "Unknown Course"}` : data?.title || "No Title"}
// // // //                               </h3>
// // // //                               {!notification.isRead && (
// // // //                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
// // // //                               )}
// // // //                               <Badge
// // // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // // //                                   isSent ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
// // // //                                 }`}
// // // //                               >
// // // //                                 {isSent ? (
// // // //                                   <>
// // // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Sent</span>
// // // //                                   </>
// // // //                                 ) : (
// // // //                                   <>
// // // //                                     <HiMail className="w-3 h-3 mr-1" />
// // // //                                     <span className="hidden sm:inline">Received</span>
// // // //                                   </>
// // // //                                 )}
// // // //                               </Badge>
// // // //                             </div>
// // // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {data?.courseCode || "N/A"}
// // // //                               </span>
// // // //                               <span className="flex items-center gap-1">
// // // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                 {getRelativeTime(notification.createdAt)}
// // // //                               </span>
// // // //                               {data?.prof && <span className="">by {data.prof}</span>}
// // // //                               {!isPoll && data?.sender && <span className="">by {data.sender}</span>}
// // // //                               {isPoll && (
// // // //                                 <span className="flex items-center gap-1">
// // // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                   {isSent
// // // //                                     ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// // // //                                     : `${data?.totalVotes || 0} votes`}
// // // //                                 </span>
// // // //                               )}
// // // //                             </div>
// // // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // // //                               {isPoll
// // // //                                 ? data?.reason || "No reason provided"
// // // //                                 : (data?.content || "No content").substring(0, 80) +
// // // //                                   ((data?.content || "").length > 80 ? "..." : "")}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // // //                           <Badge
// // // //                             variant={isPoll ? "secondary" : "outline"}
// // // //                             className={`${
// // // //                               isPoll ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
// // // //                             } text-xs`}
// // // //                           >
// // // //                             {isPoll ? "Poll" : "Message"}
// // // //                           </Badge>
// // // //                           <Button
// // // //                             variant="ghost"
// // // //                             size="sm"
// // // //                             onClick={() => toggleExpanded(notification._id)}
// // // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // // //                           >
// // // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // // //                               <HiChevronRight className="w-4 h-4" />
// // // //                             </motion.div>
// // // //                           </Button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardHeader>
// // // //                     {/* Expandable Content */}
// // // //                     <AnimatePresence>
// // // //                       {isExpanded && (
// // // //                         <motion.div
// // // //                           initial={{ height: 0, opacity: 0 }}
// // // //                           animate={{ height: "auto", opacity: 1 }}
// // // //                           exit={{ height: 0, opacity: 0 }}
// // // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // // //                           className="overflow-hidden"
// // // //                         >
// // // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // // //                             {isPoll ? (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4 sm:space-y-6"
// // // //                               >
// // // //                                 {/* Light text - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data?.courseCode || "N/A"}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // // //                                     {data?.prof && <span className="">by {data.prof}</span>}
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiUsers className="w-3 h-3" />
// // // //                                       {isSent
// // // //                                         ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// // // //                                         : `${data?.totalVotes || 0} votes`}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                 </div>
// // // //                                 {/* Poll Context */}
// // // //                                 <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100">
// // // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // // //                                     <HiInformationCircle className="w-4 h-4 text-purple-600" />
// // // //                                     Context
// // // //                                   </h4>
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // // //                                     {data?.context || "No context provided"}
// // // //                                   </p>
// // // //                                   {isSent && (
// // // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiUsers className="w-3 h-3" />
// // // //                                         {data?.totalStudents || 0} students
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiChartBar className="w-3 h-3" />
// // // //                                         {data?.totalVotes || 0} responses
// // // //                                       </span>
// // // //                                       <span className="flex items-center gap-1">
// // // //                                         <HiCheck className="w-3 h-3" />
// // // //                                         {getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}%
// // // //                                         response rate
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                                 {/* Poll Options */}
// // // //                                 <div className="space-y-3">
// // // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // // //                                       <HiChartBar className="w-4 h-4 text-purple-600" />
// // // //                                       Poll Statistics:
// // // //                                     </h4>
// // // //                                   </div>
// // // //                                   <div className="space-y-2 sm:space-y-3">
// // // //                                     {(data?.options || []).map((option, index) => {
// // // //                                       const votePercentage = getVotePercentage(
// // // //                                         option.voteCount || 0,
// // // //                                         data?.totalVotes || 0,
// // // //                                       )
// // // //                                       return (
// // // //                                         <motion.div
// // // //                                           key={option._id || index}
// // // //                                           initial={{ opacity: 0, x: -20 }}
// // // //                                           animate={{ opacity: 1, x: 0 }}
// // // //                                           transition={{ delay: index * 0.1 }}
// // // //                                           className="relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 border-gray-200 bg-white hover:border-gray-300"
// // // //                                         >
// // // //                                           {/* Vote percentage bar */}
// // // //                                           <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // // //                                             <motion.div
// // // //                                               className="h-full opacity-30 bg-gradient-to-r from-purple-100 to-purple-200"
// // // //                                               initial={{ width: 0 }}
// // // //                                               animate={{ width: `${votePercentage}%` }}
// // // //                                               transition={{ duration: 1, delay: 0.5 }}
// // // //                                             />
// // // //                                           </div>
// // // //                                           <div className="relative flex items-center justify-between">
// // // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // // //                                               <div className="flex-1 min-w-0">
// // // //                                                 <div className="flex items-center gap-2 mb-1">
// // // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // // //                                                     {option.day || "Unknown Day"}
// // // //                                                   </span>
// // // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // // //                                                     {option.date ? formatDate(option.date) : "No Date"}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiClock className="w-3 h-3" />
// // // //                                                     {option.start ? formatTime(option.start) : "00:00"} -{" "}
// // // //                                                     {option.end ? formatTime(option.end) : "00:00"}
// // // //                                                   </span>
// // // //                                                   <span className="flex items-center gap-1">
// // // //                                                     <HiLocationMarker className="w-3 h-3" />
// // // //                                                     {option.room || "No Room"}
// // // //                                                   </span>
// // // //                                                 </div>
// // // //                                               </div>
// // // //                                             </div>
// // // //                                             {/* Vote count and percentage */}
// // // //                                             <div className="text-right flex-shrink-0 ml-2">
// // // //                                               <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // // //                                                 <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                                                 {option.voteCount || 0}
// // // //                                               </div>
// // // //                                               <div className="text-xs text-gray-500">{votePercentage}%</div>
// // // //                                             </div>
// // // //                                           </div>
// // // //                                         </motion.div>
// // // //                                       )
// // // //                                     })}
// // // //                                   </div>
// // // //                                 </div>
// // // //                                 {/* Poll Statistics Info */}
// // // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // // //                                   {isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
// // // //                                       <span className="text-green-700">
// // // //                                         This poll was sent to your students. View the current response statistics above.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // // //                                       <span className="text-purple-700">
// // // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             ) : (
// // // //                               <motion.div
// // // //                                 initial={{ y: -20, opacity: 0 }}
// // // //                                 animate={{ y: 0, opacity: 1 }}
// // // //                                 transition={{ delay: 0.1 }}
// // // //                                 className="space-y-4"
// // // //                               >
// // // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiAcademicCap className="w-3 h-3" />
// // // //                                       {data?.courseCode || "N/A"}
// // // //                                     </span>
// // // //                                     <span className="flex items-center gap-1">
// // // //                                       <HiClock className="w-3 h-3" />
// // // //                                       {getRelativeTime(notification.createdAt)}
// // // //                                     </span>
// // // //                                   </div>
// // // //                                   <div className="text-xs text-gray-600">by {data?.sender || "Unknown"}</div>
// // // //                                 </div>
// // // //                                 {/* Full Message Content */}
// // // //                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
// // // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
// // // //                                     {data?.content || "No content"}
// // // //                                   </p>
// // // //                                 </div>
// // // //                                 {/* Message Actions */}
// // // //                                 <div className="flex gap-3">
// // // //                                   {readMessages.includes(notification._id) ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">
// // // //                                         Message opened and marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : isSent ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message sent to students</span>
// // // //                                     </div>
// // // //                                   ) : !notification.isRead ? (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // // //                                       <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
// // // //                                       <span className="text-blue-700 font-medium">
// // // //                                         Notification opened - marked as read
// // // //                                       </span>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // // //                                     </div>
// // // //                                   )}
// // // //                                 </div>
// // // //                               </motion.div>
// // // //                             )}
// // // //                           </CardContent>
// // // //                         </motion.div>
// // // //                       )}
// // // //                     </AnimatePresence>
// // // //                   </Card>
// // // //                 </motion.div>
// // // //               )
// // // //             })}
// // // //           </AnimatePresence>
// // // //         </motion.div>

// // // //         {/* Empty State */}
// // // //         {filteredNotifications.length === 0 && !loading && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   )
// // // // }
// // // "use client"
// // // import { useState, useEffect } from "react"
// // // import { motion, AnimatePresence } from "framer-motion"
// // // import { useRouter, useSearchParams } from "next/navigation"
// // // import {
// // //   HiInbox,
// // //   HiMail,
// // //   HiClock,
// // //   HiLocationMarker,
// // //   HiAcademicCap,
// // //   HiExclamationCircle,
// // //   HiInformationCircle,
// // //   HiCheck,
// // //   HiSearch,
// // //   HiChevronRight,
// // //   HiUsers,
// // //   HiFilter,
// // //   HiChartBar,
// // //   HiEye,
// // //   HiPaperAirplane,
// // //   HiCheckCircle,
// // // } from "react-icons/hi"
// // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Input } from "@/components/ui/input"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import { useSession } from "next-auth/react"

// // // export default function ProfessorInboxPage() {
// // //   const [notifications, setNotifications] = useState([])
// // //   const [filteredNotifications, setFilteredNotifications] = useState([])
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [filterType, setFilterType] = useState("all")
// // //   const [filterRead, setFilterRead] = useState("all")
// // //   const [filterDirection, setFilterDirection] = useState("all")
// // //   const [expandedItems, setExpandedItems] = useState(new Set())
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState(null)
// // //   const [readMessages, setReadMessages] = useState([])
// // //   const [selectedOptions, setSelectedOptions] = useState({}) // Track selected options for voting
// // //   const [votingLoading, setVotingLoading] = useState({}) // Track voting loading state
// // //   const { data: session, status } = useSession()
// // //   const router = useRouter()
// // //   const searchParams = useSearchParams()

// // //   // Check for search parameter from dashboard navigation
// // //   useEffect(() => {
// // //     const searchFromDashboard = searchParams.get("search")
// // //     if (searchFromDashboard) {
// // //       setSearchTerm(decodeURIComponent(searchFromDashboard))
// // //     }
// // //   }, [searchParams])

// // //   useEffect(() => {
// // //     if (!session) return
// // //     fetchNotifications()
// // //   }, [session])

// // //   const fetchNotifications = async () => {
// // //     try {
// // //       console.log("Getting professor notifications!!")
// // //       setLoading(true)
// // //       const response = await fetch("/api/professor/getNotifications", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ profEmail: session.user.email }),
// // //       })
// // //       const data = await response.json()
// // //       console.log(response)
// // //       console.log("emailsss", session.user.email)
// // //       if (data.success) {
// // //         // Transform the professor notifications data
// // //         const transformedNotifications = data.professor
// // //           .filter((item) => item.notification)
// // //           .map((item) => {
// // //             const notification = item.notification
// // //             const isPoll = notification.type === "poll"

// // //             // Determine direction: sent if the notification was created by the current professor
// // //             const isSent = notification.prof && notification.prof.email === session.user.email
// // //             const direction = isSent ? "sent" : "received"

// // //             if (isPoll) {
// // //               // For polls, process the votes from the message object
// // //               const processedVotes = {}
// // //               let totalVotes = 0
// // //               if (notification.message && notification.message.votes) {
// // //                 const pollVotes = notification.message.votes || []
// // //                 totalVotes = pollVotes.length
// // //                 // Calculate vote counts for each option
// // //                 pollVotes.forEach((vote) => {
// // //                   if (processedVotes[vote.option]) {
// // //                     processedVotes[vote.option]++
// // //                   } else {
// // //                     processedVotes[vote.option] = 1
// // //                   }
// // //                 })
// // //               }

// // //               // Transform poll data to match expected structure
// // //               return {
// // //                 _id: item._id,
// // //                 message: notification._id,
// // //                 type: "poll",
// // //                 direction: direction,
// // //                 isRead: item.isRead === true,
// // //                 createdAt: notification.createdAt,
// // //                 updatedAt: notification.updatedAt,
// // //                 pollData: {
// // //                   _id: notification.message?._id || "",
// // //                   options:
// // //                     notification.message?.options?.map((option) => ({
// // //                       ...option,
// // //                       voteCount: processedVotes[option._id] || 0,
// // //                     })) || [],
// // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // //                   prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // //                   reason: notification.message.reason,
// // //                   context: notification.message.context,
// // //                   isApproved: notification.message.isApproved,
// // //                   totalVotes: totalVotes,
// // //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// // //                   pollType: notification.message.pollType || "regular", // Add poll type
// // //                 },
// // //               }
// // //             } else {
// // //               // Transform message data to match expected structure
// // //               return {
// // //                 _id: item._id,
// // //                 message: notification._id,
// // //                 type: "message",
// // //                 direction: direction,
// // //                 isRead: item.isRead === true,
// // //                 createdAt: notification.createdAt,
// // //                 updatedAt: notification.updatedAt,
// // //                 messageData: {
// // //                   title: notification.messageTitle || "No Title",
// // //                   content: typeof notification.message === "string" ? notification.message : "No content",
// // //                   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// // //                   course: notification.course ? notification.course.title : "Unknown Course",
// // //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// // //                 },
// // //               }
// // //             }
// // //           })
// // //         setNotifications(transformedNotifications)
// // //         setFilteredNotifications(transformedNotifications)
// // //       } else {
// // //         setError("Failed to fetch notifications: " + data.message)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching notifications:", error)
// // //       setError("Error fetching notifications: " + error.message)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // API call to mark message as read
// // //   const markMessageAsRead = async (notificationId) => {
// // //     try {
// // //       console.log("Marking message as read:", notificationId)
// // //       const response = await fetch("/api/professor/markAsRead", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           profEmail: session.user.email,
// // //           notificationList: notificationId,
// // //         }),
// // //       })
// // //       const data = await response.json()
// // //       if (data.success) {
// // //         console.log("Message marked as read successfully")
// // //         // Add to read messages array
// // //         setReadMessages((prev) => [...prev, notificationId])
// // //       } else {
// // //         console.error("Failed to mark message as read:", data.message)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error marking message as read:", error)
// // //     }
// // //   }

// // //   // API call to submit vote for schedule selection polls
// // //   const submitVote = async (pollId, selectedOptionIds) => {
// // //     try {
// // //       setVotingLoading((prev) => ({ ...prev, [pollId]: true }))

// // //       const response = await fetch("/api/professor/votePoll", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           profEmail: session.user.email,
// // //           pollId: pollId,
// // //           selectedOptions: selectedOptionIds,
// // //         }),
// // //       })

// // //       const data = await response.json()

// // //       if (data.success) {
// // //         console.log("Vote submitted successfully")
// // //         // Refresh notifications to get updated vote counts
// // //         await fetchNotifications()
// // //         // Clear selected options for this poll
// // //         setSelectedOptions((prev) => ({ ...prev, [pollId]: [] }))
// // //       } else {
// // //         console.error("Failed to submit vote:", data.message)
// // //         alert("Failed to submit vote: " + data.message)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting vote:", error)
// // //       alert("Error submitting vote: " + error.message)
// // //     } finally {
// // //       setVotingLoading((prev) => ({ ...prev, [pollId]: false }))
// // //     }
// // //   }

// // //   // Handle option selection for voting
// // //   const handleOptionSelect = (pollId, optionId) => {
// // //     setSelectedOptions((prev) => {
// // //       const currentSelections = prev[pollId] || []
// // //       const isSelected = currentSelections.includes(optionId)

// // //       if (isSelected) {
// // //         // Remove option if already selected
// // //         return {
// // //           ...prev,
// // //           [pollId]: currentSelections.filter((id) => id !== optionId),
// // //         }
// // //       } else {
// // //         // Add option to selection
// // //         return {
// // //           ...prev,
// // //           [pollId]: [...currentSelections, optionId],
// // //         }
// // //       }
// // //     })
// // //   }

// // //   useEffect(() => {
// // //     if (!loading) {
// // //       filterNotifications()
// // //     }
// // //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// // //   const filterNotifications = () => {
// // //     let filtered = notifications
// // //     if (searchTerm) {
// // //       filtered = filtered.filter((notification) => {
// // //         const searchLower = searchTerm.toLowerCase()
// // //         if (notification.type === "poll") {
// // //           const course = notification.pollData?.course || ""
// // //           const courseCode = notification.pollData?.courseCode || ""
// // //           const reason = notification.pollData?.reason || ""
// // //           return (
// // //             course.toLowerCase().includes(searchLower) ||
// // //             courseCode.toLowerCase().includes(searchLower) ||
// // //             reason.toLowerCase().includes(searchLower)
// // //           )
// // //         } else {
// // //           const title = notification.messageData?.title || ""
// // //           const course = notification.messageData?.course || ""
// // //           const sender = notification.messageData?.sender || ""
// // //           const content = notification.messageData?.content || ""
// // //           return (
// // //             title.toLowerCase().includes(searchLower) ||
// // //             course.toLowerCase().includes(searchLower) ||
// // //             sender.toLowerCase().includes(searchLower) ||
// // //             content.toLowerCase().includes(searchLower)
// // //           )
// // //         }
// // //       })
// // //     }
// // //     if (filterType !== "all") {
// // //       filtered = filtered.filter((notification) => notification.type === filterType)
// // //     }
// // //     if (filterRead !== "all") {
// // //       const isReadFilter = filterRead === "read"
// // //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// // //     }
// // //     if (filterDirection !== "all") {
// // //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// // //     }
// // //     setFilteredNotifications(filtered)
// // //   }

// // //   const toggleExpanded = async (id) => {
// // //     const newExpanded = new Set(expandedItems)
// // //     if (newExpanded.has(id)) {
// // //       newExpanded.delete(id)
// // //     } else {
// // //       newExpanded.add(id)
// // //       // Find the notification
// // //       const notification = notifications.find((n) => n._id === id)
// // //       // If message was unread, mark as read and make API call
// // //       if (notification && !notification.isRead) {
// // //         // Update local state immediately
// // //         setNotifications((prev) =>
// // //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// // //         )
// // //         // Make API call to mark as read
// // //         await markMessageAsRead(id)
// // //       }
// // //     }
// // //     setExpandedItems(newExpanded)
// // //   }

// // //   const formatTime = (date) => {
// // //     return new Date(date).toLocaleTimeString("en-US", {
// // //       hour: "numeric",
// // //       minute: "2-digit",
// // //       hour12: true,
// // //     })
// // //   }

// // //   const formatDate = (date) => {
// // //     return new Date(date).toLocaleDateString("en-US", {
// // //       month: "short",
// // //       day: "numeric",
// // //       year: "numeric",
// // //     })
// // //   }

// // //   const getRelativeTime = (date) => {
// // //     const now = new Date()
// // //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// // //     if (diffInHours < 1) return "Just now"
// // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // //     const diffInDays = Math.floor(diffInHours / 24)
// // //     if (diffInDays < 7) return `${diffInDays}d ago`
// // //     return formatDate(date)
// // //   }

// // //   const getVotePercentage = (voteCount, totalVotes) => {
// // //     if (totalVotes === 0) return 0
// // //     return Math.round((voteCount / totalVotes) * 100)
// // //   }

// // //   const getParticipationRate = (totalVotes, totalStudents) => {
// // //     if (totalStudents === 0) return 0
// // //     return Math.round((totalVotes / totalStudents) * 100)
// // //   }

// // //   // Check if professor can vote on this poll
// // //   const canVote = (notification) => {
// // //     return (
// // //       notification.type === "poll" &&
// // //       notification.pollData?.pollType === "schedule selection" &&
// // //       notification.direction === "received"
// // //     )
// // //   }

// // //   const containerVariants = {
// // //     hidden: { opacity: 0 },
// // //     visible: {
// // //       opacity: 1,
// // //       transition: {
// // //         staggerChildren: 0.1,
// // //       },
// // //     },
// // //   }

// // //   const itemVariants = {
// // //     hidden: { opacity: 0, y: 20 },
// // //     visible: {
// // //       opacity: 1,
// // //       y: 0,
// // //       transition: {
// // //         duration: 0.5,
// // //         ease: [0.25, 0.46, 0.45, 0.94],
// // //       },
// // //     },
// // //   }

// // //   const unreadCount = notifications.filter((n) => !n.isRead).length
// // //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// // //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// // //   if (loading) {
// // //     return (
// // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // //         <div className="max-w-5xl mx-auto">
// // //           <div className="flex items-center justify-center py-12">
// // //             <div className="text-center">
// // //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// // //               <p className="text-gray-600">Loading notifications...</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     )
// // //   }

// // //   if (error) {
// // //     return (
// // //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // //         <div className="max-w-5xl mx-auto">
// // //           <div className="flex items-center justify-center py-12">
// // //             <div className="text-center">
// // //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// // //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// // //               <p className="text-gray-600 mb-4">{error}</p>
// // //               <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
// // //                 Try Again
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     )
// // //   }

// // //   return (
// // //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// // //       <div className="max-w-5xl mx-auto">
// // //         {/* Header Section */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //           className="mb-6 sm:mb-8"
// // //         >
// // //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //               <div className="flex items-center gap-3">
// // //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
// // //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // //                 </div>
// // //                 <div>
// // //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// // //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// // //                 </div>
// // //               </div>
// // //               <div className="flex items-center gap-2 flex-wrap">
// // //                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
// // //                   {filteredNotifications.length} Total
// // //                 </Badge>
// // //                 <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// // //                   {sentCount} Sent
// // //                 </Badge>
// // //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// // //                   <HiMail className="w-3 h-3 mr-1" />
// // //                   {receivedCount} Received
// // //                 </Badge>
// // //                 {unreadCount > 0 && (
// // //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// // //                 )}
// // //                 {readMessages.length > 0 && (
// // //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// // //                     {readMessages.length} Recently Read
// // //                   </Badge>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Search and Filter Section */}
// // //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// // //             <div className="relative sm:flex-grow">
// // //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //               <Input
// // //                 placeholder="Search notifications..."
// // //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="flex gap-2 flex-wrap">
// // //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // //                   <SelectValue placeholder="Direction" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="all">All</SelectItem>
// // //                   <SelectItem value="sent">Sent</SelectItem>
// // //                   <SelectItem value="received">Received</SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //               <Select value={filterType} onValueChange={setFilterType}>
// // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// // //                   <SelectValue placeholder="Type" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="all">All Types</SelectItem>
// // //                   <SelectItem value="poll">Polls</SelectItem>
// // //                   <SelectItem value="message">Messages</SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //               <Select value={filterRead} onValueChange={setFilterRead}>
// // //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// // //                   <SelectValue placeholder="Status" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="all">All</SelectItem>
// // //                   <SelectItem value="unread">Unread</SelectItem>
// // //                   <SelectItem value="read">Read</SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         {/* Notifications List */}
// // //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// // //           <AnimatePresence>
// // //             {filteredNotifications.map((notification) => {
// // //               const isExpanded = expandedItems.has(notification._id)
// // //               const isPoll = notification.type === "poll"
// // //               const data = isPoll ? notification.pollData : notification.messageData
// // //               const isSent = notification.direction === "sent"
// // //               const isVotable = canVote(notification)
// // //               const pollId = isPoll ? notification.pollData._id : null
// // //               const currentSelections = selectedOptions[pollId] || []
// // //               const isVotingLoading = votingLoading[pollId] || false

// // //               return (
// // //                 <motion.div
// // //                   key={notification._id}
// // //                   variants={itemVariants}
// // //                   layout
// // //                   whileHover={{ scale: 1.01, y: -2 }}
// // //                   transition={{ duration: 0.2 }}
// // //                 >
// // //                   <Card
// // //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// // //                       !notification.isRead
// // //                         ? isVotable
// // //                           ? "border-orange-300 bg-gradient-to-r from-orange-50/50 to-yellow-50/50"
// // //                           : "border-blue-200 bg-blue-50/30"
// // //                         : isVotable
// // //                           ? "border-orange-200 bg-orange-50/20"
// // //                           : "border-gray-100"
// // //                     }`}
// // //                   >
// // //                     <CardHeader className="pt-4 sm:pt-5">
// // //                       <div className="flex items-start justify-between gap-3">
// // //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// // //                           <motion.div
// // //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// // //                               isPoll
// // //                                 ? isVotable
// // //                                   ? "bg-gradient-to-br from-orange-500 to-amber-600"
// // //                                   : "bg-gradient-to-br from-purple-500 to-purple-600"
// // //                                 : "bg-gradient-to-br from-green-500 to-green-600"
// // //                             }`}
// // //                             whileHover={{ scale: 1.05, rotate: 5 }}
// // //                             transition={{ duration: 0.2 }}
// // //                           >
// // //                             {isPoll ? (
// // //                               isVotable ? (
// // //                                 <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // //                               ) : (
// // //                                 <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // //                               )
// // //                             ) : (
// // //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// // //                             )}
// // //                           </motion.div>
// // //                           <div className="flex-1 min-w-0">
// // //                             <div className="flex items-start gap-2 mb-1">
// // //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// // //                                 {isPoll
// // //                                   ? isVotable
// // //                                     ? `Schedule Selection: ${data?.course || "Unknown Course"}`
// // //                                     : `Poll: ${data?.course || "Unknown Course"}`
// // //                                   : data?.title || "No Title"}
// // //                               </h3>
// // //                               {!notification.isRead && (
// // //                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
// // //                               )}
// // //                               <Badge
// // //                                 className={`text-xs py-1 flex-shrink-0 ${
// // //                                   isSent
// // //                                     ? "bg-green-100 text-green-700"
// // //                                     : isVotable
// // //                                       ? "bg-orange-100 text-orange-700"
// // //                                       : "bg-purple-100 text-purple-700"
// // //                                 }`}
// // //                               >
// // //                                 {isSent ? (
// // //                                   <>
// // //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// // //                                     <span className="hidden sm:inline">Sent</span>
// // //                                   </>
// // //                                 ) : isVotable ? (
// // //                                   <>
// // //                                     <HiCheckCircle className="w-3 h-3 mr-1" />
// // //                                     <span className="hidden sm:inline">Vote</span>
// // //                                   </>
// // //                                 ) : (
// // //                                   <>
// // //                                     <HiMail className="w-3 h-3 mr-1" />
// // //                                     <span className="hidden sm:inline">Received</span>
// // //                                   </>
// // //                                 )}
// // //                               </Badge>
// // //                             </div>
// // //                             {/* Light text - hidden on small screens, visible on large screens */}
// // //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// // //                               <span className="flex items-center gap-1">
// // //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                                 {data?.courseCode || "N/A"}
// // //                               </span>
// // //                               <span className="flex items-center gap-1">
// // //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                                 {getRelativeTime(notification.createdAt)}
// // //                               </span>
// // //                               {data?.prof && <span className="">by {data.prof}</span>}
// // //                               {!isPoll && data?.sender && <span className="">by {data.sender}</span>}
// // //                               {isPoll && (
// // //                                 <span className="flex items-center gap-1">
// // //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                                   {isSent
// // //                                     ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// // //                                     : `${data?.totalVotes || 0} votes`}
// // //                                 </span>
// // //                               )}
// // //                             </div>
// // //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// // //                               {isPoll
// // //                                 ? data?.reason || "No reason provided"
// // //                                 : (data?.content || "No content").substring(0, 80) +
// // //                                   ((data?.content || "").length > 80 ? "..." : "")}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex items-start gap-2 flex-shrink-0">
// // //                           <Badge
// // //                             variant={isPoll ? "secondary" : "outline"}
// // //                             className={`${
// // //                               isPoll
// // //                                 ? isVotable
// // //                                   ? "bg-orange-100 text-orange-700"
// // //                                   : "bg-purple-100 text-purple-700"
// // //                                 : "bg-green-100 text-green-700"
// // //                             } text-xs`}
// // //                           >
// // //                             {isPoll ? (isVotable ? "Vote" : "Poll") : "Message"}
// // //                           </Badge>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="sm"
// // //                             onClick={() => toggleExpanded(notification._id)}
// // //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// // //                           >
// // //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// // //                               <HiChevronRight className="w-4 h-4" />
// // //                             </motion.div>
// // //                           </Button>
// // //                         </div>
// // //                       </div>
// // //                     </CardHeader>

// // //                     {/* Expandable Content */}
// // //                     <AnimatePresence>
// // //                       {isExpanded && (
// // //                         <motion.div
// // //                           initial={{ height: 0, opacity: 0 }}
// // //                           animate={{ height: "auto", opacity: 1 }}
// // //                           exit={{ height: 0, opacity: 0 }}
// // //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// // //                           className="overflow-hidden"
// // //                         >
// // //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// // //                             {isPoll ? (
// // //                               <motion.div
// // //                                 initial={{ y: -20, opacity: 0 }}
// // //                                 animate={{ y: 0, opacity: 1 }}
// // //                                 transition={{ delay: 0.1 }}
// // //                                 className="space-y-4 sm:space-y-6"
// // //                               >
// // //                                 {/* Light text - visible on small screens only when expanded */}
// // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // //                                     <span className="flex items-center gap-1">
// // //                                       <HiAcademicCap className="w-3 h-3" />
// // //                                       {data?.courseCode || "N/A"}
// // //                                     </span>
// // //                                     <span className="flex items-center gap-1">
// // //                                       <HiClock className="w-3 h-3" />
// // //                                       {getRelativeTime(notification.createdAt)}
// // //                                     </span>
// // //                                   </div>
// // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// // //                                     {data?.prof && <span className="">by {data.prof}</span>}
// // //                                     <span className="flex items-center gap-1">
// // //                                       <HiUsers className="w-3 h-3" />
// // //                                       {isSent
// // //                                         ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// // //                                         : `${data?.totalVotes || 0} votes`}
// // //                                     </span>
// // //                                   </div>
// // //                                 </div>

// // //                                 {/* Poll Context */}
// // //                                 <div
// // //                                   className={`p-3 sm:p-4 rounded-xl border ${
// // //                                     isVotable
// // //                                       ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
// // //                                       : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
// // //                                   }`}
// // //                                 >
// // //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// // //                                     <HiInformationCircle
// // //                                       className={`w-4 h-4 ${isVotable ? "text-orange-600" : "text-purple-600"}`}
// // //                                     />
// // //                                     Context
// // //                                   </h4>
// // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// // //                                     {data?.context || "No context provided"}
// // //                                   </p>
// // //                                   {isSent && (
// // //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// // //                                       <span className="flex items-center gap-1">
// // //                                         <HiUsers className="w-3 h-3" />
// // //                                         {data?.totalStudents || 0} students
// // //                                       </span>
// // //                                       <span className="flex items-center gap-1">
// // //                                         <HiChartBar className="w-3 h-3" />
// // //                                         {data?.totalVotes || 0} responses
// // //                                       </span>
// // //                                       <span className="flex items-center gap-1">
// // //                                         <HiCheck className="w-3 h-3" />
// // //                                         {getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}%
// // //                                         response rate
// // //                                       </span>
// // //                                     </div>
// // //                                   )}
// // //                                 </div>

// // //                                 {/* Poll Options */}
// // //                                 <div className="space-y-3">
// // //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// // //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// // //                                       <HiChartBar
// // //                                         className={`w-4 h-4 ${isVotable ? "text-orange-600" : "text-purple-600"}`}
// // //                                       />
// // //                                       {isVotable ? "Select Your Preferred Options:" : "Poll Statistics:"}
// // //                                     </h4>
// // //                                     {isVotable && currentSelections.length > 0 && (
// // //                                       <Button
// // //                                         onClick={() => submitVote(pollId, currentSelections)}
// // //                                         disabled={isVotingLoading}
// // //                                         className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2"
// // //                                       >
// // //                                         {isVotingLoading ? (
// // //                                           <>
// // //                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                                             Submitting...
// // //                                           </>
// // //                                         ) : (
// // //                                           <>
// // //                                             <HiCheck className="w-4 h-4 mr-2" />
// // //                                             Submit Vote ({currentSelections.length})
// // //                                           </>
// // //                                         )}
// // //                                       </Button>
// // //                                     )}
// // //                                   </div>
// // //                                   <div className="space-y-2 sm:space-y-3">
// // //                                     {(data?.options || []).map((option, index) => {
// // //                                       const votePercentage = getVotePercentage(
// // //                                         option.voteCount || 0,
// // //                                         data?.totalVotes || 0,
// // //                                       )
// // //                                       const isSelected = currentSelections.includes(option._id)

// // //                                       return (
// // //                                         <motion.div
// // //                                           key={option._id || index}
// // //                                           initial={{ opacity: 0, x: -20 }}
// // //                                           animate={{ opacity: 1, x: 0 }}
// // //                                           transition={{ delay: index * 0.1 }}
// // //                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
// // //                                             isVotable
// // //                                               ? isSelected
// // //                                                 ? "border-orange-400 bg-orange-50 cursor-pointer hover:border-orange-500"
// // //                                                 : "border-orange-200 bg-white cursor-pointer hover:border-orange-300"
// // //                                               : "border-gray-200 bg-white hover:border-gray-300"
// // //                                           }`}
// // //                                           onClick={isVotable ? () => handleOptionSelect(pollId, option._id) : undefined}
// // //                                         >
// // //                                           {/* Vote percentage bar */}
// // //                                           {!isVotable && (
// // //                                             <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// // //                                               <motion.div
// // //                                                 className="h-full opacity-30 bg-gradient-to-r from-purple-100 to-purple-200"
// // //                                                 initial={{ width: 0 }}
// // //                                                 animate={{ width: `${votePercentage}%` }}
// // //                                                 transition={{ duration: 1, delay: 0.5 }}
// // //                                               />
// // //                                             </div>
// // //                                           )}
// // //                                           <div className="relative flex items-center justify-between">
// // //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// // //                                               {isVotable && (
// // //                                                 <div
// // //                                                   className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
// // //                                                     isSelected ? "bg-orange-500 border-orange-500" : "border-gray-300"
// // //                                                   }`}
// // //                                                 >
// // //                                                   {isSelected && <HiCheck className="w-3 h-3 text-white" />}
// // //                                                 </div>
// // //                                               )}
// // //                                               <div className="flex-1 min-w-0">
// // //                                                 <div className="flex items-center gap-2 mb-1">
// // //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// // //                                                     {option.day || "Unknown Day"}
// // //                                                   </span>
// // //                                                   <span className="text-xs sm:text-sm text-gray-600">
// // //                                                     {option.date ? formatDate(option.date) : "No Date"}
// // //                                                   </span>
// // //                                                 </div>
// // //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// // //                                                   <span className="flex items-center gap-1">
// // //                                                     <HiClock className="w-3 h-3" />
// // //                                                     {option.start ? formatTime(option.start) : "00:00"} -{" "}
// // //                                                     {option.end ? formatTime(option.end) : "00:00"}
// // //                                                   </span>
// // //                                                   <span className="flex items-center gap-1">
// // //                                                     <HiLocationMarker className="w-3 h-3" />
// // //                                                     {option.room || "No Room"}
// // //                                                   </span>
// // //                                                 </div>
// // //                                               </div>
// // //                                             </div>
// // //                                             {/* Vote count and percentage */}
// // //                                             {!isVotable && (
// // //                                               <div className="text-right flex-shrink-0 ml-2">
// // //                                                 <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// // //                                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                                                   {option.voteCount || 0}
// // //                                                 </div>
// // //                                                 <div className="text-xs text-gray-500">{votePercentage}%</div>
// // //                                               </div>
// // //                                             )}
// // //                                           </div>
// // //                                         </motion.div>
// // //                                       )
// // //                                     })}
// // //                                   </div>
// // //                                 </div>

// // //                                 {/* Poll Statistics Info */}
// // //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// // //                                   {isSent ? (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
// // //                                       <span className="text-green-700">
// // //                                         This poll was sent to your students. View the current response statistics above.
// // //                                       </span>
// // //                                     </div>
// // //                                   ) : isVotable ? (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// // //                                       <HiCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
// // //                                       <span className="text-orange-700">
// // //                                         Schedule selection poll - Select your preferred time slots and submit your vote.
// // //                                       </span>
// // //                                     </div>
// // //                                   ) : (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// // //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// // //                                       <span className="text-purple-700">
// // //                                         Viewing poll statistics from colleague. You can only view results, not vote.
// // //                                       </span>
// // //                                     </div>
// // //                                   )}
// // //                                 </div>
// // //                               </motion.div>
// // //                             ) : (
// // //                               <motion.div
// // //                                 initial={{ y: -20, opacity: 0 }}
// // //                                 animate={{ y: 0, opacity: 1 }}
// // //                                 transition={{ delay: 0.1 }}
// // //                                 className="space-y-4"
// // //                               >
// // //                                 {/* Light text for messages - visible on small screens only when expanded */}
// // //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// // //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// // //                                     <span className="flex items-center gap-1">
// // //                                       <HiAcademicCap className="w-3 h-3" />
// // //                                       {data?.courseCode || "N/A"}
// // //                                     </span>
// // //                                     <span className="flex items-center gap-1">
// // //                                       <HiClock className="w-3 h-3" />
// // //                                       {getRelativeTime(notification.createdAt)}
// // //                                     </span>
// // //                                   </div>
// // //                                   <div className="text-xs text-gray-600">by {data?.sender || "Unknown"}</div>
// // //                                 </div>

// // //                                 {/* Full Message Content */}
// // //                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
// // //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
// // //                                     {data?.content || "No content"}
// // //                                   </p>
// // //                                 </div>

// // //                                 {/* Message Actions */}
// // //                                 <div className="flex gap-3">
// // //                                   {readMessages.includes(notification._id) ? (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // //                                       <span className="text-green-700 font-medium">
// // //                                         Message opened and marked as read
// // //                                       </span>
// // //                                     </div>
// // //                                   ) : isSent ? (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // //                                       <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
// // //                                       <span className="text-green-700 font-medium">Message sent to students</span>
// // //                                     </div>
// // //                                   ) : !notification.isRead ? (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// // //                                       <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
// // //                                       <span className="text-blue-700 font-medium">
// // //                                         Notification opened - marked as read
// // //                                       </span>
// // //                                     </div>
// // //                                   ) : (
// // //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// // //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// // //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// // //                                     </div>
// // //                                   )}
// // //                                 </div>
// // //                               </motion.div>
// // //                             )}
// // //                           </CardContent>
// // //                         </motion.div>
// // //                       )}
// // //                     </AnimatePresence>
// // //                   </Card>
// // //                 </motion.div>
// // //               )
// // //             })}
// // //           </AnimatePresence>
// // //         </motion.div>

// // //         {/* Empty State */}
// // //         {filteredNotifications.length === 0 && !loading && (
// // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// // //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// // //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// // //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// // //           </motion.div>
// // //         )}
// // //       </div>
// // //     </main>
// // //   )
// // // }
// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { useRouter, useSearchParams } from "next/navigation"
// // import {
// //   HiInbox,
// //   HiMail,
// //   HiClock,
// //   HiLocationMarker,
// //   HiAcademicCap,
// //   HiExclamationCircle,
// //   HiInformationCircle,
// //   HiCheck,
// //   HiSearch,
// //   HiChevronRight,
// //   HiUsers,
// //   HiFilter,
// //   HiChartBar,
// //   HiEye,
// //   HiPaperAirplane,
// //   HiCheckCircle,
// // } from "react-icons/hi"
// // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Input } from "@/components/ui/input"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { useSession } from "next-auth/react"

// // export default function ProfessorInboxPage() {
// //   const [notifications, setNotifications] = useState([])
// //   const [filteredNotifications, setFilteredNotifications] = useState([])
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [filterType, setFilterType] = useState("all")
// //   const [filterRead, setFilterRead] = useState("all")
// //   const [filterDirection, setFilterDirection] = useState("all")
// //   const [expandedItems, setExpandedItems] = useState(new Set())
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)
// //   const [readMessages, setReadMessages] = useState([])
// //   const [selectedOptions, setSelectedOptions] = useState({}) // Track selected options for voting
// //   const [votingLoading, setVotingLoading] = useState({}) // Track voting loading state
// //   const { data: session, status } = useSession()
// //   const router = useRouter()
// //   const searchParams = useSearchParams()

// //   // Check for search parameter from dashboard navigation
// //   useEffect(() => {
// //     const searchFromDashboard = searchParams.get("search")
// //     if (searchFromDashboard) {
// //       setSearchTerm(decodeURIComponent(searchFromDashboard))
// //     }
// //   }, [searchParams])

// //   useEffect(() => {
// //     if (!session) return
// //     fetchNotifications()
// //   }, [session])

// //   const fetchNotifications = async () => {
// //     try {
// //       console.log("Getting professor notifications!!")
// //       setLoading(true)
// //       const response = await fetch("/api/professor/getNotifications", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ profEmail: session.user.email }),
// //       })
// //       const data = await response.json()
// //       console.log(response)
// //       console.log("emailsss", session.user.email)

// //       if (data.success) {
// //         // Transform the professor notifications data
// //         const transformedNotifications = data.professor
// //           .filter((item) => item.notification)
// //           .map((item) => {
// //             const notification = item.notification
// //             // Check if this is a poll or schedule selection (both should be treated as polls)
// //             const isPollType = notification.type === "poll" || notification.type === "schedule selection"

// //             // Determine direction: sent if the notification was created by the current professor
// //             const isSent = notification.prof && notification.prof.email === session.user.email
// //             const direction = isSent ? "sent" : "received"

// //             if (isPollType) {
// //               // For polls and schedule selections, process the votes from the message object
// //               const processedVotes = {}
// //               let totalVotes = 0
// //               if (notification.message && notification.message.votes) {
// //                 const pollVotes = notification.message.votes || []
// //                 totalVotes = pollVotes.length
// //                 // Calculate vote counts for each option
// //                 pollVotes.forEach((vote) => {
// //                   if (processedVotes[vote.option]) {
// //                     processedVotes[vote.option]++
// //                   } else {
// //                     processedVotes[vote.option] = 1
// //                   }
// //                 })
// //               }

// //               // Determine poll type - use the notification type directly
// //               const pollType = notification.type === "schedule selection" ? "schedule selection" : "regular"

// //               // Transform poll data to match expected structure
// //               return {
// //                 _id: item._id,
// //                 message: notification._id,
// //                 type: "poll", // Always set as poll for UI consistency
// //                 direction: direction,
// //                 isRead: item.isRead === true,
// //                 createdAt: notification.createdAt,
// //                 updatedAt: notification.updatedAt,
// //                 pollData: {
// //                   _id: notification.message?._id || "",
// //                   options:
// //                     notification.message?.options?.map((option) => ({
// //                       ...option,
// //                       voteCount: processedVotes[option._id] || 0,
// //                     })) || [],
// //                   course: notification.course ? notification.course.title : "Unknown Course",
// //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// //                   prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// //                   reason: notification.message?.reason || "No reason provided",
// //                   context: notification.message?.context || "No context provided",
// //                   isApproved: notification.message?.isApproved,
// //                   totalVotes: totalVotes,
// //                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
// //                   pollType: pollType, // This determines if voting is allowed
// //                 },
// //               }
// //             } else {
// //               // Transform message data to match expected structure
// //               return {
// //                 _id: item._id,
// //                 message: notification._id,
// //                 type: "message",
// //                 direction: direction,
// //                 isRead: item.isRead === true,
// //                 createdAt: notification.createdAt,
// //                 updatedAt: notification.updatedAt,
// //                 messageData: {
// //                   title: notification.messageTitle || "No Title",
// //                   content: typeof notification.message === "string" ? notification.message : "No content",
// //                   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
// //                   course: notification.course ? notification.course.title : "Unknown Course",
// //                   courseCode: notification.course ? notification.course.courseCode : "N/A",
// //                 },
// //               }
// //             }
// //           })

// //         setNotifications(transformedNotifications)
// //         setFilteredNotifications(transformedNotifications)
// //       } else {
// //         setError("Failed to fetch notifications: " + data.message)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching notifications:", error)
// //       setError("Error fetching notifications: " + error.message)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // API call to mark message as read
// //   const markMessageAsRead = async (notificationId) => {
// //     try {
// //       console.log("Marking message as read:", notificationId)
// //       const response = await fetch("/api/professor/markAsRead", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           profEmail: session.user.email,
// //           notificationList: notificationId,
// //         }),
// //       })
// //       const data = await response.json()
// //       if (data.success) {
// //         console.log("Message marked as read successfully")
// //         // Add to read messages array
// //         setReadMessages((prev) => [...prev, notificationId])
// //       } else {
// //         console.error("Failed to mark message as read:", data.message)
// //       }
// //     } catch (error) {
// //       console.error("Error marking message as read:", error)
// //     }
// //   }

// //   // API call to submit vote for schedule selection polls
// //   const submitVote = async (pollId, selectedOptionIds) => {
// //     try {
// //       setVotingLoading((prev) => ({ ...prev, [pollId]: true }))
// //       const response = await fetch("/api/professor/voteForPolls", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           profEmail: session.user.email,
// //           pollId: pollId,
// //           selectedOptions: selectedOptionIds,
// //         }),
// //       })
// //       const data = await response.json()
// //       if (data.success) {
// //         console.log("Vote submitted successfully")
// //         // Refresh notifications to get updated vote counts
// //         await fetchNotifications()
// //         // Clear selected options for this poll
// //         setSelectedOptions((prev) => ({ ...prev, [pollId]: [] }))
// //       } else {
// //         console.error("Failed to submit vote:", data.message)
// //         alert("Failed to submit vote: " + data.message)
// //       }
// //     } catch (error) {
// //       console.error("Error submitting vote:", error)
// //       alert("Error submitting vote: " + error.message)
// //     } finally {
// //       setVotingLoading((prev) => ({ ...prev, [pollId]: false }))
// //     }
// //   }

// //   // Handle option selection for voting
// //   const handleOptionSelect = (pollId, optionId) => {
// //     setSelectedOptions((prev) => {
// //       const currentSelections = prev[pollId] || []
// //       const isSelected = currentSelections.includes(optionId)
// //       if (isSelected) {
// //         // Remove option if already selected
// //         return {
// //           ...prev,
// //           [pollId]: currentSelections.filter((id) => id !== optionId),
// //         }
// //       } else {
// //         // Add option to selection (allow multiple selections)
// //         return {
// //           ...prev,
// //           [pollId]: [...currentSelections, optionId],
// //         }
// //       }
// //     })
// //   }

// //   useEffect(() => {
// //     if (!loading) {
// //       filterNotifications()
// //     }
// //   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

// //   const filterNotifications = () => {
// //     let filtered = notifications

// //     if (searchTerm) {
// //       filtered = filtered.filter((notification) => {
// //         const searchLower = searchTerm.toLowerCase()
// //         if (notification.type === "poll") {
// //           const course = notification.pollData?.course || ""
// //           const courseCode = notification.pollData?.courseCode || ""
// //           const reason = notification.pollData?.reason || ""
// //           return (
// //             course.toLowerCase().includes(searchLower) ||
// //             courseCode.toLowerCase().includes(searchLower) ||
// //             reason.toLowerCase().includes(searchLower)
// //           )
// //         } else {
// //           const title = notification.messageData?.title || ""
// //           const course = notification.messageData?.course || ""
// //           const sender = notification.messageData?.sender || ""
// //           const content = notification.messageData?.content || ""
// //           return (
// //             title.toLowerCase().includes(searchLower) ||
// //             course.toLowerCase().includes(searchLower) ||
// //             sender.toLowerCase().includes(searchLower) ||
// //             content.toLowerCase().includes(searchLower)
// //           )
// //         }
// //       })
// //     }

// //     if (filterType !== "all") {
// //       filtered = filtered.filter((notification) => notification.type === filterType)
// //     }

// //     if (filterRead !== "all") {
// //       const isReadFilter = filterRead === "read"
// //       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
// //     }

// //     if (filterDirection !== "all") {
// //       filtered = filtered.filter((notification) => notification.direction === filterDirection)
// //     }

// //     setFilteredNotifications(filtered)
// //   }

// //   const toggleExpanded = async (id) => {
// //     const newExpanded = new Set(expandedItems)
// //     if (newExpanded.has(id)) {
// //       newExpanded.delete(id)
// //     } else {
// //       newExpanded.add(id)
// //       // Find the notification
// //       const notification = notifications.find((n) => n._id === id)
// //       // If message was unread, mark as read and make API call
// //       if (notification && !notification.isRead) {
// //         // Update local state immediately
// //         setNotifications((prev) =>
// //           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
// //         )
// //         // Make API call to mark as read
// //         await markMessageAsRead(id)
// //       }
// //     }
// //     setExpandedItems(newExpanded)
// //   }

// //   const formatTime = (date) => {
// //     return new Date(date).toLocaleTimeString("en-US", {
// //       hour: "numeric",
// //       minute: "2-digit",
// //       hour12: true,
// //     })
// //   }

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     })
// //   }

// //   const getRelativeTime = (date) => {
// //     const now = new Date()
// //     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
// //     if (diffInHours < 1) return "Just now"
// //     if (diffInHours < 24) return `${diffInHours}h ago`
// //     const diffInDays = Math.floor(diffInHours / 24)
// //     if (diffInDays < 7) return `${diffInDays}d ago`
// //     return formatDate(date)
// //   }

// //   const getVotePercentage = (voteCount, totalVotes) => {
// //     if (totalVotes === 0) return 0
// //     return Math.round((voteCount / totalVotes) * 100)
// //   }

// //   const getParticipationRate = (totalVotes, totalStudents) => {
// //     if (totalStudents === 0) return 0
// //     return Math.round((totalVotes / totalStudents) * 100)
// //   }

// //   // Check if professor can vote on this poll - ONLY for schedule selection polls that are received
// //   const canVote = (notification) => {
// //     return (
// //       notification.type === "poll" &&
// //       notification.pollData?.pollType === "schedule selection" &&
// //       notification.direction === "received"
// //     )
// //   }

// //   // Check if this is a schedule selection poll (for UI styling)
// //   const isScheduleSelection = (notification) => {
// //     return notification.type === "poll" && notification.pollData?.pollType === "schedule selection"
// //   }

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   }

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.5,
// //         ease: [0.25, 0.46, 0.45, 0.94],
// //       },
// //     },
// //   }

// //   const unreadCount = notifications.filter((n) => !n.isRead).length
// //   const sentCount = notifications.filter((n) => n.direction === "sent").length
// //   const receivedCount = notifications.filter((n) => n.direction === "received").length

// //   if (loading) {
// //     return (
// //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// //         <div className="max-w-5xl mx-auto">
// //           <div className="flex items-center justify-center py-12">
// //             <div className="text-center">
// //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //               <p className="text-gray-600">Loading notifications...</p>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// //         <div className="max-w-5xl mx-auto">
// //           <div className="flex items-center justify-center py-12">
// //             <div className="text-center">
// //               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
// //               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
// //               <p className="text-gray-600 mb-4">{error}</p>
// //               <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
// //                 Try Again
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     )
// //   }

// //   return (
// //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
// //       <div className="max-w-5xl mx-auto">
// //         {/* Header Section */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="mb-6 sm:mb-8"
// //         >
// //           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //               <div className="flex items-center gap-3">
// //                 <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
// //                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
// //                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-2 flex-wrap">
// //                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
// //                   {filteredNotifications.length} Total
// //                 </Badge>
// //                 <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// //                   <HiPaperAirplane className="w-3 h-3 mr-1" />
// //                   {sentCount} Sent
// //                 </Badge>
// //                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
// //                   <HiMail className="w-3 h-3 mr-1" />
// //                   {receivedCount} Received
// //                 </Badge>
// //                 {unreadCount > 0 && (
// //                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
// //                 )}
// //                 {readMessages.length > 0 && (
// //                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
// //                     {readMessages.length} Recently Read
// //                   </Badge>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Search and Filter Section */}
// //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
// //             <div className="relative sm:flex-grow">
// //               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input
// //                 placeholder="Search notifications..."
// //                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <div className="flex gap-2 flex-wrap">
// //               <Select value={filterDirection} onValueChange={setFilterDirection}>
// //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// //                   <SelectValue placeholder="Direction" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All</SelectItem>
// //                   <SelectItem value="sent">Sent</SelectItem>
// //                   <SelectItem value="received">Received</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //               <Select value={filterType} onValueChange={setFilterType}>
// //                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// //                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
// //                   <SelectValue placeholder="Type" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Types</SelectItem>
// //                   <SelectItem value="poll">Polls</SelectItem>
// //                   <SelectItem value="message">Messages</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //               <Select value={filterRead} onValueChange={setFilterRead}>
// //                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
// //                   <SelectValue placeholder="Status" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All</SelectItem>
// //                   <SelectItem value="unread">Unread</SelectItem>
// //                   <SelectItem value="read">Read</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Notifications List */}
// //         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
// //           <AnimatePresence>
// //             {filteredNotifications.map((notification) => {
// //               const isExpanded = expandedItems.has(notification._id)
// //               const isPoll = notification.type === "poll"
// //               const data = isPoll ? notification.pollData : notification.messageData
// //               const isSent = notification.direction === "sent"
// //               const isVotable = canVote(notification)
// //               const isScheduleSelectionPoll = isScheduleSelection(notification)
// //               const pollId = isPoll ? notification.pollData._id : null
// //               const currentSelections = selectedOptions[pollId] || []
// //               const isVotingLoading = votingLoading[pollId] || false

// //               return (
// //                 <motion.div
// //                   key={notification._id}
// //                   variants={itemVariants}
// //                   layout
// //                   whileHover={{ scale: 1.01, y: -2 }}
// //                   transition={{ duration: 0.2 }}
// //                 >
// //                   <Card
// //                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
// //                       !notification.isRead
// //                         ? isVotable
// //                           ? "border-orange-300 bg-gradient-to-r from-orange-50/50 to-yellow-50/50"
// //                           : isScheduleSelectionPoll
// //                             ? "border-orange-200 bg-orange-50/20"
// //                             : isPoll
// //                               ? "border-purple-200 bg-purple-50/20"
// //                               : "border-blue-200 bg-blue-50/30"
// //                         : isVotable
// //                           ? "border-orange-200 bg-orange-50/20"
// //                           : isScheduleSelectionPoll
// //                             ? "border-orange-100 bg-orange-50/10"
// //                             : isPoll
// //                               ? "border-purple-100 bg-purple-50/10"
// //                               : "border-gray-100"
// //                     }`}
// //                   >
// //                     <CardHeader className="pt-4 sm:pt-5">
// //                       <div className="flex items-start justify-between gap-3">
// //                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
// //                           <motion.div
// //                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
// //                               isPoll
// //                                 ? isVotable
// //                                   ? "bg-gradient-to-br from-orange-500 to-amber-600"
// //                                   : isScheduleSelectionPoll
// //                                     ? "bg-gradient-to-br from-orange-400 to-orange-500"
// //                                     : "bg-gradient-to-br from-purple-500 to-purple-600"
// //                                 : "bg-gradient-to-br from-green-500 to-green-600"
// //                             }`}
// //                             whileHover={{ scale: 1.05, rotate: 5 }}
// //                             transition={{ duration: 0.2 }}
// //                           >
// //                             {isPoll ? (
// //                               isVotable ? (
// //                                 <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// //                               ) : isScheduleSelectionPoll ? (
// //                                 <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// //                               ) : (
// //                                 <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// //                               )
// //                             ) : (
// //                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// //                             )}
// //                           </motion.div>
// //                           <div className="flex-1 min-w-0">
// //                             <div className="flex items-start gap-2 mb-1">
// //                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
// //                                 {isPoll
// //                                   ? isVotable
// //                                     ? `Schedule Selection: ${data?.course || "Unknown Course"}`
// //                                     : isScheduleSelectionPoll
// //                                       ? `Schedule Selection: ${data?.course || "Unknown Course"}`
// //                                       : `Poll: ${data?.course || "Unknown Course"}`
// //                                   : data?.title || "No Title"}
// //                               </h3>
// //                               {!notification.isRead && (
// //                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
// //                               )}
// //                               <Badge
// //                                 className={`text-xs py-1 flex-shrink-0 ${
// //                                   isSent
// //                                     ? "bg-green-100 text-green-700"
// //                                     : isVotable
// //                                       ? "bg-orange-100 text-orange-700"
// //                                       : isScheduleSelectionPoll
// //                                         ? "bg-orange-100 text-orange-600"
// //                                         : isPoll
// //                                           ? "bg-purple-100 text-purple-700"
// //                                           : "bg-blue-100 text-blue-700"
// //                                 }`}
// //                               >
// //                                 {isSent ? (
// //                                   <>
// //                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
// //                                     <span className="hidden sm:inline">Sent</span>
// //                                   </>
// //                                 ) : isVotable ? (
// //                                   <>
// //                                     <HiCheckCircle className="w-3 h-3 mr-1" />
// //                                     <span className="hidden sm:inline">Vote</span>
// //                                   </>
// //                                 ) : isScheduleSelectionPoll ? (
// //                                   <>
// //                                     <HiClock className="w-3 h-3 mr-1" />
// //                                     <span className="hidden sm:inline">Schedule</span>
// //                                   </>
// //                                 ) : isPoll ? (
// //                                   <>
// //                                     <HiChartBar className="w-3 h-3 mr-1" />
// //                                     <span className="hidden sm:inline">Poll</span>
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <HiMail className="w-3 h-3 mr-1" />
// //                                     <span className="hidden sm:inline">Message</span>
// //                                   </>
// //                                 )}
// //                               </Badge>
// //                             </div>
// //                             {/* Light text - hidden on small screens, visible on large screens */}
// //                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
// //                               <span className="flex items-center gap-1">
// //                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
// //                                 {data?.courseCode || "N/A"}
// //                               </span>
// //                               <span className="flex items-center gap-1">
// //                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
// //                                 {getRelativeTime(notification.createdAt)}
// //                               </span>
// //                               {data?.prof && <span className="">by {data.prof}</span>}
// //                               {!isPoll && data?.sender && <span className="">by {data.sender}</span>}
// //                               {isPoll && (
// //                                 <span className="flex items-center gap-1">
// //                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// //                                   {isSent
// //                                     ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// //                                     : `${data?.totalVotes || 0} votes`}
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
// //                               {isPoll
// //                                 ? data?.reason || "No reason provided"
// //                                 : (data?.content || "No content").substring(0, 80) +
// //                                   ((data?.content || "").length > 80 ? "..." : "")}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <div className="flex items-start gap-2 flex-shrink-0">
// //                           <Badge
// //                             variant={isPoll ? "secondary" : "outline"}
// //                             className={`${
// //                               isPoll
// //                                 ? isVotable
// //                                   ? "bg-orange-100 text-orange-700"
// //                                   : isScheduleSelectionPoll
// //                                     ? "bg-orange-100 text-orange-600"
// //                                     : "bg-purple-100 text-purple-700"
// //                                 : "bg-green-100 text-green-700"
// //                             } text-xs`}
// //                           >
// //                             {isPoll ? (isVotable ? "Vote" : isScheduleSelectionPoll ? "Schedule" : "Poll") : "Message"}
// //                           </Badge>
// //                           <Button
// //                             variant="ghost"
// //                             size="sm"
// //                             onClick={() => toggleExpanded(notification._id)}
// //                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
// //                           >
// //                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
// //                               <HiChevronRight className="w-4 h-4" />
// //                             </motion.div>
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     </CardHeader>

// //                     {/* Expandable Content */}
// //                     <AnimatePresence>
// //                       {isExpanded && (
// //                         <motion.div
// //                           initial={{ height: 0, opacity: 0 }}
// //                           animate={{ height: "auto", opacity: 1 }}
// //                           exit={{ height: 0, opacity: 0 }}
// //                           transition={{ duration: 0.3, ease: "easeInOut" }}
// //                           className="overflow-hidden"
// //                         >
// //                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
// //                             {isPoll ? (
// //                               <motion.div
// //                                 initial={{ y: -20, opacity: 0 }}
// //                                 animate={{ y: 0, opacity: 1 }}
// //                                 transition={{ delay: 0.1 }}
// //                                 className="space-y-4 sm:space-y-6"
// //                               >
// //                                 {/* Light text - visible on small screens only when expanded */}
// //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// //                                     <span className="flex items-center gap-1">
// //                                       <HiAcademicCap className="w-3 h-3" />
// //                                       {data?.courseCode || "N/A"}
// //                                     </span>
// //                                     <span className="flex items-center gap-1">
// //                                       <HiClock className="w-3 h-3" />
// //                                       {getRelativeTime(notification.createdAt)}
// //                                     </span>
// //                                   </div>
// //                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
// //                                     {data?.prof && <span className="">by {data.prof}</span>}
// //                                     <span className="flex items-center gap-1">
// //                                       <HiUsers className="w-3 h-3" />
// //                                       {isSent
// //                                         ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
// //                                         : `${data?.totalVotes || 0} votes`}
// //                                     </span>
// //                                   </div>
// //                                 </div>

// //                                 {/* Poll Context */}
// //                                 <div
// //                                   className={`p-3 sm:p-4 rounded-xl border ${
// //                                     isVotable
// //                                       ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
// //                                       : isScheduleSelectionPoll
// //                                         ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-100"
// //                                         : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
// //                                   }`}
// //                                 >
// //                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
// //                                     <HiInformationCircle
// //                                       className={`w-4 h-4 ${
// //                                         isVotable || isScheduleSelectionPoll ? "text-orange-600" : "text-purple-600"
// //                                       }`}
// //                                     />
// //                                     Context
// //                                   </h4>
// //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
// //                                     {data?.context || "No context provided"}
// //                                   </p>
// //                                   {isSent && (
// //                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
// //                                       <span className="flex items-center gap-1">
// //                                         <HiUsers className="w-3 h-3" />
// //                                         {data?.totalStudents || 0} students
// //                                       </span>
// //                                       <span className="flex items-center gap-1">
// //                                         <HiChartBar className="w-3 h-3" />
// //                                         {data?.totalVotes || 0} responses
// //                                       </span>
// //                                       <span className="flex items-center gap-1">
// //                                         <HiCheck className="w-3 h-3" />
// //                                         {getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}%
// //                                         response rate
// //                                       </span>
// //                                     </div>
// //                                   )}
// //                                 </div>

// //                                 {/* Poll Options */}
// //                                 <div className="space-y-3">
// //                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
// //                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
// //                                       <HiChartBar
// //                                         className={`w-4 h-4 ${
// //                                           isVotable || isScheduleSelectionPoll ? "text-orange-600" : "text-purple-600"
// //                                         }`}
// //                                       />
// //                                       {isVotable ? "Select Your Preferred Options:" : "Poll Statistics:"}
// //                                     </h4>
// //                                     {isVotable && currentSelections.length > 0 && (
// //                                       <Button
// //                                         onClick={() => submitVote(pollId, currentSelections)}
// //                                         disabled={isVotingLoading}
// //                                         className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2"
// //                                       >
// //                                         {isVotingLoading ? (
// //                                           <>
// //                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                                             Submitting...
// //                                           </>
// //                                         ) : (
// //                                           <>
// //                                             <HiCheck className="w-4 h-4 mr-2" />
// //                                             Submit Vote ({currentSelections.length})
// //                                           </>
// //                                         )}
// //                                       </Button>
// //                                     )}
// //                                   </div>
// //                                   <div className="space-y-2 sm:space-y-3">
// //                                     {(data?.options || []).map((option, index) => {
// //                                       const votePercentage = getVotePercentage(
// //                                         option.voteCount || 0,
// //                                         data?.totalVotes || 0,
// //                                       )
// //                                       const isSelected = currentSelections.includes(option._id)
// //                                       return (
// //                                         <motion.div
// //                                           key={option._id || index}
// //                                           initial={{ opacity: 0, x: -20 }}
// //                                           animate={{ opacity: 1, x: 0 }}
// //                                           transition={{ delay: index * 0.1 }}
// //                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
// //                                             isVotable
// //                                               ? isSelected
// //                                                 ? "border-orange-400 bg-orange-50 cursor-pointer hover:border-orange-500"
// //                                                 : "border-orange-200 bg-white cursor-pointer hover:border-orange-300"
// //                                               : "border-gray-200 bg-white hover:border-gray-300"
// //                                           }`}
// //                                           onClick={isVotable ? () => handleOptionSelect(pollId, option._id) : undefined}
// //                                         >
// //                                           {/* Vote percentage bar */}
// //                                           {!isVotable && (
// //                                             <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
// //                                               <motion.div
// //                                                 className={`h-full opacity-30 ${
// //                                                   isScheduleSelectionPoll
// //                                                     ? "bg-gradient-to-r from-orange-100 to-orange-200"
// //                                                     : "bg-gradient-to-r from-purple-100 to-purple-200"
// //                                                 }`}
// //                                                 initial={{ width: 0 }}
// //                                                 animate={{ width: `${votePercentage}%` }}
// //                                                 transition={{ duration: 1, delay: 0.5 }}
// //                                               />
// //                                             </div>
// //                                           )}
// //                                           <div className="relative flex items-center justify-between">
// //                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
// //                                               {isVotable && (
// //                                                 <div
// //                                                   className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
// //                                                     isSelected ? "bg-orange-500 border-orange-500" : "border-gray-300"
// //                                                   }`}
// //                                                 >
// //                                                   {isSelected && <HiCheck className="w-3 h-3 text-white" />}
// //                                                 </div>
// //                                               )}
// //                                               <div className="flex-1 min-w-0">
// //                                                 <div className="flex items-center gap-2 mb-1">
// //                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
// //                                                     {option.day || "Unknown Day"}
// //                                                   </span>
// //                                                   <span className="text-xs sm:text-sm text-gray-600">
// //                                                     {option.date ? formatDate(option.date) : "No Date"}
// //                                                   </span>
// //                                                 </div>
// //                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
// //                                                   <span className="flex items-center gap-1">
// //                                                     <HiClock className="w-3 h-3" />
// //                                                     {option.start ? formatTime(option.start) : "00:00"} -{" "}
// //                                                     {option.end ? formatTime(option.end) : "00:00"}
// //                                                   </span>
// //                                                   <span className="flex items-center gap-1">
// //                                                     <HiLocationMarker className="w-3 h-3" />
// //                                                     {option.room || "No Room"}
// //                                                   </span>
// //                                                 </div>
// //                                               </div>
// //                                             </div>
// //                                             {/* Vote count and percentage */}
// //                                             {!isVotable && (
// //                                               <div className="text-right flex-shrink-0 ml-2">
// //                                                 <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
// //                                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
// //                                                   {option.voteCount || 0}
// //                                                 </div>
// //                                                 <div className="text-xs text-gray-500">{votePercentage}%</div>
// //                                               </div>
// //                                             )}
// //                                           </div>
// //                                         </motion.div>
// //                                       )
// //                                     })}
// //                                   </div>
// //                                 </div>

// //                                 {/* Poll Statistics Info */}
// //                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
// //                                   {isSent ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// //                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
// //                                       <span className="text-green-700">
// //                                         This poll was sent to your students. View the current response statistics above.
// //                                       </span>
// //                                     </div>
// //                                   ) : isVotable ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// //                                       <HiCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
// //                                       <span className="text-orange-700">
// //                                         Schedule selection poll - Select your preferred time slots and submit your vote.
// //                                       </span>
// //                                     </div>
// //                                   ) : isScheduleSelectionPoll ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
// //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
// //                                       <span className="text-orange-700">
// //                                         Schedule selection poll from colleague. You can view results but cannot vote.
// //                                       </span>
// //                                     </div>
// //                                   ) : (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
// //                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
// //                                       <span className="text-purple-700">
// //                                         Regular poll from colleague. You can view results but cannot vote.
// //                                       </span>
// //                                     </div>
// //                                   )}
// //                                 </div>
// //                               </motion.div>
// //                             ) : (
// //                               <motion.div
// //                                 initial={{ y: -20, opacity: 0 }}
// //                                 animate={{ y: 0, opacity: 1 }}
// //                                 transition={{ delay: 0.1 }}
// //                                 className="space-y-4"
// //                               >
// //                                 {/* Light text for messages - visible on small screens only when expanded */}
// //                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
// //                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
// //                                     <span className="flex items-center gap-1">
// //                                       <HiAcademicCap className="w-3 h-3" />
// //                                       {data?.courseCode || "N/A"}
// //                                     </span>
// //                                     <span className="flex items-center gap-1">
// //                                       <HiClock className="w-3 h-3" />
// //                                       {getRelativeTime(notification.createdAt)}
// //                                     </span>
// //                                   </div>
// //                                   <div className="text-xs text-gray-600">by {data?.sender || "Unknown"}</div>
// //                                 </div>

// //                                 {/* Full Message Content */}
// //                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
// //                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
// //                                     {data?.content || "No content"}
// //                                   </p>
// //                                 </div>

// //                                 {/* Message Actions */}
// //                                 <div className="flex gap-3">
// //                                   {readMessages.includes(notification._id) ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// //                                       <span className="text-green-700 font-medium">
// //                                         Message opened and marked as read
// //                                       </span>
// //                                     </div>
// //                                   ) : isSent ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// //                                       <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
// //                                       <span className="text-green-700 font-medium">Message sent to students</span>
// //                                     </div>
// //                                   ) : !notification.isRead ? (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
// //                                       <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
// //                                       <span className="text-blue-700 font-medium">
// //                                         Notification opened - marked as read
// //                                       </span>
// //                                     </div>
// //                                   ) : (
// //                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
// //                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
// //                                       <span className="text-green-700 font-medium">Message marked as read</span>
// //                                     </div>
// //                                   )}
// //                                 </div>
// //                               </motion.div>
// //                             )}
// //                           </CardContent>
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </Card>
// //                 </motion.div>
// //               )
// //             })}
// //           </AnimatePresence>
// //         </motion.div>

// //         {/* Empty State */}
// //         {filteredNotifications.length === 0 && !loading && (
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
// //             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
// //             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
// //             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
// //           </motion.div>
// //         )}
// //       </div>
// //     </main>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { useRouter, useSearchParams } from "next/navigation"
// import {
//   HiInbox,
//   HiMail,
//   HiClock,
//   HiLocationMarker,
//   HiAcademicCap,
//   HiExclamationCircle,
//   HiInformationCircle,
//   HiCheck,
//   HiSearch,
//   HiChevronRight,
//   HiUsers,
//   HiFilter,
//   HiChartBar,
//   HiEye,
//   HiPaperAirplane,
//   HiCheckCircle,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useSession } from "next-auth/react"

// export default function ProfessorInboxPage() {
//   const [notifications, setNotifications] = useState([])
//   const [filteredNotifications, setFilteredNotifications] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterType, setFilterType] = useState("all")
//   const [filterRead, setFilterRead] = useState("all")
//   const [filterDirection, setFilterDirection] = useState("all")
//   const [expandedItems, setExpandedItems] = useState(new Set())
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [readMessages, setReadMessages] = useState([])
//   const [selectedOptions, setSelectedOptions] = useState({}) // Track selected options for voting
//   const [votingLoading, setVotingLoading] = useState({}) // Track voting loading state
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Check for search parameter from dashboard navigation
//   useEffect(() => {
//     const searchFromDashboard = searchParams.get("search")
//     if (searchFromDashboard) {
//       setSearchTerm(decodeURIComponent(searchFromDashboard))
//     }
//   }, [searchParams])

//   useEffect(() => {
//     if (!session) return
//     fetchNotifications()
//   }, [session])

//   const fetchNotifications = async () => {
//     try {
//       console.log("Getting professor notifications!!")
//       setLoading(true)
//       const response = await fetch("/api/professor/getNotifications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail: session.user.email }),
//       })
//       const data = await response.json()
//       console.log(response)
//       console.log("emailsss", session.user.email)

//       if (data.success) {
//         // Transform the professor notifications data
//         const transformedNotifications = data.professor
//           .filter((item) => item.notification)
//           .map((item) => {
//             const notification = item.notification
//             // Check if this is a poll or schedule selection (both should be treated as polls)
//             const isPollType = notification.type === "poll" || notification.type === "schedule selection"

//             // Determine direction: sent if the notification was created by the current professor
//             const isSent = notification.prof && notification.prof.email === session.user.email
//             const direction = isSent ? "sent" : "received"

//             if (isPollType) {
//               // For polls and schedule selections, process the votes from the message object
//               const processedVotes = {}
//               let totalVotes = 0
//               if (notification.message && notification.message.votes) {
//                 const pollVotes = notification.message.votes || []
//                 totalVotes = pollVotes.length
//                 // Calculate vote counts for each option
//                 pollVotes.forEach((vote) => {
//                   if (processedVotes[vote.option]) {
//                     processedVotes[vote.option]++
//                   } else {
//                     processedVotes[vote.option] = 1
//                   }
//                 })
//               }

//               // Determine poll type - use the notification type directly
//               const pollType = notification.type === "schedule selection" ? "schedule selection" : "regular"

//               // Transform poll data to match expected structure
//               return {
//                 _id: item._id,
//                 message: notification._id,
//                 type: "poll", // Always set as poll for UI consistency
//                 direction: direction,
//                 isRead: item.isRead === true,
//                 createdAt: notification.createdAt,
//                 updatedAt: notification.updatedAt,
//                 pollData: {
//                   _id: notification.message?._id || "",
//                   options:
//                     notification.message?.options?.map((option) => ({
//                       ...option,
//                       voteCount: processedVotes[option._id] || 0,
//                     })) || [],
//                   course: notification.course ? notification.course.title : "Unknown Course",
//                   courseCode: notification.course ? notification.course.courseCode : "N/A",
//                   prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
//                   reason: notification.message?.reason || "No reason provided",
//                   context: notification.message?.context || "No context provided",
//                   isApproved: notification.message?.isApproved,
//                   totalVotes: totalVotes,
//                   totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
//                   pollType: pollType, // This determines if voting is allowed
//                 },
//               }
//             } else {
//               // Transform message data to match expected structure
//               return {
//                 _id: item._id,
//                 message: notification._id,
//                 type: "message",
//                 direction: direction,
//                 isRead: item.isRead === true,
//                 createdAt: notification.createdAt,
//                 updatedAt: notification.updatedAt,
//                 messageData: {
//                   title: notification.messageTitle || "No Title",
//                   content: typeof notification.message === "string" ? notification.message : "No content",
//                   sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
//                   course: notification.course ? notification.course.title : "Unknown Course",
//                   courseCode: notification.course ? notification.course.courseCode : "N/A",
//                 },
//               }
//             }
//           })

//         setNotifications(transformedNotifications)
//         setFilteredNotifications(transformedNotifications)
//       } else {
//         setError("Failed to fetch notifications: " + data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error)
//       setError("Error fetching notifications: " + error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // API call to mark message as read
//   const markMessageAsRead = async (notificationId) => {
//     try {
//       console.log("Marking message as read:", notificationId)
//       const response = await fetch("/api/professor/markAsRead", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           profEmail: session.user.email,
//           notificationList: notificationId,
//         }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         console.log("Message marked as read successfully")
//         // Add to read messages array
//         setReadMessages((prev) => [...prev, notificationId])
//       } else {
//         console.error("Failed to mark message as read:", data.message)
//       }
//     } catch (error) {
//       console.error("Error marking message as read:", error)
//     }
//   }

//   // API call to submit vote for schedule selection polls
//   const submitVote = async (pollId, selectedOptionIds) => {
//     try {
//       setVotingLoading((prev) => ({ ...prev, [pollId]: true }))

//       // Find the notification to get the full option data
//       const notification = notifications.find((n) => n.pollData?._id === pollId)
//       if (!notification || !notification.pollData?.options) {
//         alert("Error: Could not find poll options")
//         return
//       }

//       // Transform selected option IDs into detailed option objects
//       const selectedOptionsData = selectedOptionIds
//         .map((optionId) => {
//           const option = notification.pollData.options.find((opt) => opt._id === optionId)
//           console.log(option)
//           if (!option) return null

//           // Create Date objects with 01-01-2000 as base date and the option times
//           const createTimeDate = (timeString) => {
//             if (!timeString) return new Date("2000-01-01T00:00:00")

//             // If timeString is already a Date object, extract time
//             let timeStr = timeString
//             if (timeString instanceof Date) {
//               timeStr = timeString.toTimeString().split(" ")[0] // Get HH:MM:SS format
//             }

//             return new Date(`2000-01-01T${timeStr}`)
//           }

//           return {
//             start: option.start,
//             end: option.end,
//             day: option.day || "Unknown",
//             room: option.room || "Unknown",
//           }
//         })
//         .filter(Boolean) // Remove any null values
//         console.log("selectedOption :",selectedOptions)
//         console.log("selection options modified: ",selectedOptionsData)
//       const response = await fetch("/api/professor/voteForPolls", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           profEmail: session.user.email,
//           pollId: pollId,
//           selectedOptions: selectedOptionsData, // Send the detailed option objects
//         }),
//       })

//       const data = await response.json()
//       if (data.success) {
//         console.log("Vote submitted successfully")
//         // Refresh notifications to get updated vote counts
//         await fetchNotifications()
//         // Clear selected options for this poll
//         setSelectedOptions((prev) => ({ ...prev, [pollId]: [] }))
//       } else {
//         console.error("Failed to submit vote:", data.message)
//         alert("Failed to submit vote: " + data.message)
//       }
//     } catch (error) {
//       console.error("Error submitting vote:", error)
//       alert("Error submitting vote: " + error.message)
//     } finally {
//       setVotingLoading((prev) => ({ ...prev, [pollId]: false }))
//     }
//   }

//   // Handle option selection for voting
//   const handleOptionSelect = (pollId, optionId) => {
//     setSelectedOptions((prev) => {
//       const currentSelections = prev[pollId] || []
//       const isSelected = currentSelections.includes(optionId)
//       if (isSelected) {
//         // Remove option if already selected
//         return {
//           ...prev,
//           [pollId]: currentSelections.filter((id) => id !== optionId),
//         }
//       } else {
//         // Add option to selection (allow multiple selections)
//         return {
//           ...prev,
//           [pollId]: [...currentSelections, optionId],
//         }
//       }
//     })
//   }

//   useEffect(() => {
//     if (!loading) {
//       filterNotifications()
//     }
//   }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

//   const filterNotifications = () => {
//     let filtered = notifications

//     if (searchTerm) {
//       filtered = filtered.filter((notification) => {
//         const searchLower = searchTerm.toLowerCase()
//         if (notification.type === "poll") {
//           const course = notification.pollData?.course || ""
//           const courseCode = notification.pollData?.courseCode || ""
//           const reason = notification.pollData?.reason || ""
//           return (
//             course.toLowerCase().includes(searchLower) ||
//             courseCode.toLowerCase().includes(searchLower) ||
//             reason.toLowerCase().includes(searchLower)
//           )
//         } else {
//           const title = notification.messageData?.title || ""
//           const course = notification.messageData?.course || ""
//           const sender = notification.messageData?.sender || ""
//           const content = notification.messageData?.content || ""
//           return (
//             title.toLowerCase().includes(searchLower) ||
//             course.toLowerCase().includes(searchLower) ||
//             sender.toLowerCase().includes(searchLower) ||
//             content.toLowerCase().includes(searchLower)
//           )
//         }
//       })
//     }

//     if (filterType !== "all") {
//       filtered = filtered.filter((notification) => notification.type === filterType)
//     }

//     if (filterRead !== "all") {
//       const isReadFilter = filterRead === "read"
//       filtered = filtered.filter((notification) => notification.isRead === isReadFilter)
//     }

//     if (filterDirection !== "all") {
//       filtered = filtered.filter((notification) => notification.direction === filterDirection)
//     }

//     setFilteredNotifications(filtered)
//   }

//   const toggleExpanded = async (id) => {
//     const newExpanded = new Set(expandedItems)
//     if (newExpanded.has(id)) {
//       newExpanded.delete(id)
//     } else {
//       newExpanded.add(id)
//       // Find the notification
//       const notification = notifications.find((n) => n._id === id)
//       // If message was unread, mark as read and make API call
//       if (notification && !notification.isRead) {
//         // Update local state immediately
//         setNotifications((prev) =>
//           prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
//         )
//         // Make API call to mark as read
//         await markMessageAsRead(id)
//       }
//     }
//     setExpandedItems(newExpanded)
//   }

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     })
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })
//   }

//   const getRelativeTime = (date) => {
//     const now = new Date()
//     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
//     if (diffInHours < 1) return "Just now"
//     if (diffInHours < 24) return `${diffInHours}h ago`
//     const diffInDays = Math.floor(diffInHours / 24)
//     if (diffInDays < 7) return `${diffInDays}d ago`
//     return formatDate(date)
//   }

//   const getVotePercentage = (voteCount, totalVotes) => {
//     if (totalVotes === 0) return 0
//     return Math.round((voteCount / totalVotes) * 100)
//   }

//   const getParticipationRate = (totalVotes, totalStudents) => {
//     if (totalStudents === 0) return 0
//     return Math.round((totalVotes / totalStudents) * 100)
//   }

//   // Check if professor can vote on this poll - ONLY for schedule selection polls that are received
//   const canVote = (notification) => {
//     return (
//       notification.type === "poll" &&
//       notification.pollData?.pollType === "schedule selection" &&
//       notification.direction === "received"
//     )
//   }

//   // Check if this is a schedule selection poll (for UI styling)
//   const isScheduleSelection = (notification) => {
//     return notification.type === "poll" && notification.pollData?.pollType === "schedule selection"
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   }

//   const unreadCount = notifications.filter((n) => !n.isRead).length
//   const sentCount = notifications.filter((n) => n.direction === "sent").length
//   const receivedCount = notifications.filter((n) => n.direction === "received").length

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading notifications...</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Notifications</h3>
//               <p className="text-gray-600 mb-4">{error}</p>
//               <Button onClick={fetchNotifications} className="bg-blue-600 hover:bg-blue-700 text-white">
//                 Try Again
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
//                   <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
//                   <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
//                   {filteredNotifications.length} Total
//                 </Badge>
//                 <Badge className="bg-green-500 text-white text-xs sm:text-sm">
//                   <HiPaperAirplane className="w-3 h-3 mr-1" />
//                   {sentCount} Sent
//                 </Badge>
//                 <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
//                   <HiMail className="w-3 h-3 mr-1" />
//                   {receivedCount} Received
//                 </Badge>
//                 {unreadCount > 0 && (
//                   <Badge className="bg-red-500 text-white text-xs sm:text-sm">{unreadCount} Unread</Badge>
//                 )}
//                 {readMessages.length > 0 && (
//                   <Badge className="bg-green-500 text-white text-xs sm:text-sm">
//                     {readMessages.length} Recently Read
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Search and Filter Section */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
//             <div className="relative sm:flex-grow">
//               <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Search notifications..."
//                 className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <Select value={filterDirection} onValueChange={setFilterDirection}>
//                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <SelectValue placeholder="Direction" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   <SelectItem value="sent">Sent</SelectItem>
//                   <SelectItem value="received">Received</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={filterType} onValueChange={setFilterType}>
//                 <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <SelectValue placeholder="Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Types</SelectItem>
//                   <SelectItem value="poll">Polls</SelectItem>
//                   <SelectItem value="message">Messages</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={filterRead} onValueChange={setFilterRead}>
//                 <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   <SelectItem value="unread">Unread</SelectItem>
//                   <SelectItem value="read">Read</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </motion.div>

//         {/* Notifications List */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 sm:space-y-4">
//           <AnimatePresence>
//             {filteredNotifications.map((notification) => {
//               const isExpanded = expandedItems.has(notification._id)
//               const isPoll = notification.type === "poll"
//               const data = isPoll ? notification.pollData : notification.messageData
//               const isSent = notification.direction === "sent"
//               const isVotable = canVote(notification)
//               const isScheduleSelectionPoll = isScheduleSelection(notification)
//               const pollId = isPoll ? notification.pollData._id : null
//               const currentSelections = selectedOptions[pollId] || []
//               const isVotingLoading = votingLoading[pollId] || false

//               return (
//                 <motion.div
//                   key={notification._id}
//                   variants={itemVariants}
//                   layout
//                   whileHover={{ scale: 1.01, y: -2 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Card
//                     className={`shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-2 pb-6 ${
//                       !notification.isRead
//                         ? isVotable
//                           ? "border-orange-300 bg-gradient-to-r from-orange-50/50 to-yellow-50/50"
//                           : isScheduleSelectionPoll
//                             ? "border-orange-200 bg-orange-50/20"
//                             : isPoll
//                               ? "border-purple-200 bg-purple-50/20"
//                               : "border-blue-200 bg-blue-50/30"
//                         : isVotable
//                           ? "border-orange-200 bg-orange-50/20"
//                           : isScheduleSelectionPoll
//                             ? "border-orange-100 bg-orange-50/10"
//                             : isPoll
//                               ? "border-purple-100 bg-purple-50/10"
//                               : "border-gray-100"
//                     }`}
//                   >
//                     <CardHeader className="pt-4 sm:pt-5">
//                       <div className="flex items-start justify-between gap-3">
//                         <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
//                           <motion.div
//                             className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
//                               isPoll
//                                 ? isVotable
//                                   ? "bg-gradient-to-br from-orange-500 to-amber-600"
//                                   : isScheduleSelectionPoll
//                                     ? "bg-gradient-to-br from-orange-400 to-orange-500"
//                                     : "bg-gradient-to-br from-purple-500 to-purple-600"
//                                 : "bg-gradient-to-br from-green-500 to-green-600"
//                             }`}
//                             whileHover={{ scale: 1.05, rotate: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             {isPoll ? (
//                               isVotable ? (
//                                 <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                               ) : isScheduleSelectionPoll ? (
//                                 <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                               ) : (
//                                 <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                               )
//                             ) : (
//                               <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                             )}
//                           </motion.div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-start gap-2 mb-1">
//                               <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
//                                 {isPoll
//                                   ? isVotable
//                                     ? `Schedule Selection: ${data?.course || "Unknown Course"}`
//                                     : isScheduleSelectionPoll
//                                       ? `Schedule Selection: ${data?.course || "Unknown Course"}`
//                                       : `Poll: ${data?.course || "Unknown Course"}`
//                                   : data?.title || "No Title"}
//                               </h3>
//                               {!notification.isRead && (
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
//                               )}
//                               <Badge
//                                 className={`text-xs py-1 flex-shrink-0 ${
//                                   isSent
//                                     ? "bg-green-100 text-green-700"
//                                     : isVotable
//                                       ? "bg-orange-100 text-orange-700"
//                                       : isScheduleSelectionPoll
//                                         ? "bg-orange-100 text-orange-600"
//                                         : isPoll
//                                           ? "bg-purple-100 text-purple-700"
//                                           : "bg-blue-100 text-blue-700"
//                                 }`}
//                               >
//                                 {isSent ? (
//                                   <>
//                                     <HiPaperAirplane className="w-3 h-3 mr-1" />
//                                     <span className="hidden sm:inline">Sent</span>
//                                   </>
//                                 ) : isVotable ? (
//                                   <>
//                                     <HiCheckCircle className="w-3 h-3 mr-1" />
//                                     <span className="hidden sm:inline">Vote</span>
//                                   </>
//                                 ) : isScheduleSelectionPoll ? (
//                                   <>
//                                     <HiClock className="w-3 h-3 mr-1" />
//                                     <span className="hidden sm:inline">Schedule</span>
//                                   </>
//                                 ) : isPoll ? (
//                                   <>
//                                     <HiChartBar className="w-3 h-3 mr-1" />
//                                     <span className="hidden sm:inline">Poll</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <HiMail className="w-3 h-3 mr-1" />
//                                     <span className="hidden sm:inline">Message</span>
//                                   </>
//                                 )}
//                               </Badge>
//                             </div>
//                             {/* Light text - hidden on small screens, visible on large screens */}
//                             <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
//                               <span className="flex items-center gap-1">
//                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 {data?.courseCode || "N/A"}
//                               </span>
//                               <span className="flex items-center gap-1">
//                                 <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 {getRelativeTime(notification.createdAt)}
//                               </span>
//                               {data?.prof && <span className="">by {data.prof}</span>}
//                               {!isPoll && data?.sender && <span className="">by {data.sender}</span>}
//                               {isPoll && (
//                                 <span className="flex items-center gap-1">
//                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
//                                   {isSent
//                                     ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
//                                     : `${data?.totalVotes || 0} votes`}
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
//                               {isPoll
//                                 ? data?.reason || "No reason provided"
//                                 : (data?.content || "No content").substring(0, 80) +
//                                   ((data?.content || "").length > 80 ? "..." : "")}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-2 flex-shrink-0">
//                           <Badge
//                             variant={isPoll ? "secondary" : "outline"}
//                             className={`${
//                               isPoll
//                                 ? isVotable
//                                   ? "bg-orange-100 text-orange-700"
//                                   : isScheduleSelectionPoll
//                                     ? "bg-orange-100 text-orange-600"
//                                     : "bg-purple-100 text-purple-700"
//                                 : "bg-green-100 text-green-700"
//                             } text-xs`}
//                           >
//                             {isPoll ? (isVotable ? "Vote" : isScheduleSelectionPoll ? "Schedule" : "Poll") : "Message"}
//                           </Badge>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => toggleExpanded(notification._id)}
//                             className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
//                           >
//                             <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
//                               <HiChevronRight className="w-4 h-4" />
//                             </motion.div>
//                           </Button>
//                         </div>
//                       </div>
//                     </CardHeader>

//                     {/* Expandable Content */}
//                     <AnimatePresence>
//                       {isExpanded && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3, ease: "easeInOut" }}
//                           className="overflow-hidden"
//                         >
//                           <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
//                             {isPoll ? (
//                               <motion.div
//                                 initial={{ y: -20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.1 }}
//                                 className="space-y-4 sm:space-y-6"
//                               >
//                                 {/* Light text - visible on small screens only when expanded */}
//                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
//                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
//                                     <span className="flex items-center gap-1">
//                                       <HiAcademicCap className="w-3 h-3" />
//                                       {data?.courseCode || "N/A"}
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       {getRelativeTime(notification.createdAt)}
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
//                                     {data?.prof && <span className="">by {data.prof}</span>}
//                                     <span className="flex items-center gap-1">
//                                       <HiUsers className="w-3 h-3" />
//                                       {isSent
//                                         ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
//                                         : `${data?.totalVotes || 0} votes`}
//                                     </span>
//                                   </div>
//                                 </div>

//                                 {/* Poll Context */}
//                                 <div
//                                   className={`p-3 sm:p-4 rounded-xl border ${
//                                     isVotable
//                                       ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
//                                       : isScheduleSelectionPoll
//                                         ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-100"
//                                         : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
//                                   }`}
//                                 >
//                                   <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
//                                     <HiInformationCircle
//                                       className={`w-4 h-4 ${
//                                         isVotable || isScheduleSelectionPoll ? "text-orange-600" : "text-purple-600"
//                                       }`}
//                                     />
//                                     Context
//                                   </h4>
//                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
//                                     {data?.context || "No context provided"}
//                                   </p>
//                                   {isSent && (
//                                     <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
//                                       <span className="flex items-center gap-1">
//                                         <HiUsers className="w-3 h-3" />
//                                         {data?.totalStudents || 0} students
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <HiChartBar className="w-3 h-3" />
//                                         {data?.totalVotes || 0} responses
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <HiCheck className="w-3 h-3" />
//                                         {getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}%
//                                         response rate
//                                       </span>
//                                     </div>
//                                   )}
//                                 </div>

//                                 {/* Poll Options */}
//                                 <div className="space-y-3">
//                                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
//                                     <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
//                                       <HiChartBar
//                                         className={`w-4 h-4 ${
//                                           isVotable || isScheduleSelectionPoll ? "text-orange-600" : "text-purple-600"
//                                         }`}
//                                       />
//                                       {isVotable ? "Select Your Preferred Options:" : "Poll Statistics:"}
//                                     </h4>
//                                     {isVotable && currentSelections.length > 0 && (
//                                       <Button
//                                         onClick={() => submitVote(pollId, currentSelections)}
//                                         disabled={isVotingLoading}
//                                         className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2"
//                                       >
//                                         {isVotingLoading ? (
//                                           <>
//                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                                             Submitting...
//                                           </>
//                                         ) : (
//                                           <>
//                                             <HiCheck className="w-4 h-4 mr-2" />
//                                             Submit Vote ({currentSelections.length})
//                                           </>
//                                         )}
//                                       </Button>
//                                     )}
//                                   </div>
//                                   <div className="space-y-2 sm:space-y-3">
//                                     {(data?.options || []).map((option, index) => {
//                                       const votePercentage = getVotePercentage(
//                                         option.voteCount || 0,
//                                         data?.totalVotes || 0,
//                                       )
//                                       const isSelected = currentSelections.includes(option._id)
//                                       return (
//                                         <motion.div
//                                           key={option._id || index}
//                                           initial={{ opacity: 0, x: -20 }}
//                                           animate={{ opacity: 1, x: 0 }}
//                                           transition={{ delay: index * 0.1 }}
//                                           className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
//                                             isVotable
//                                               ? isSelected
//                                                 ? "border-orange-400 bg-orange-50 cursor-pointer hover:border-orange-500"
//                                                 : "border-orange-200 bg-white cursor-pointer hover:border-orange-300"
//                                               : "border-gray-200 bg-white hover:border-gray-300"
//                                           }`}
//                                           onClick={isVotable ? () => handleOptionSelect(pollId, option._id) : undefined}
//                                         >
//                                           {/* Vote percentage bar */}
//                                           {!isVotable && (
//                                             <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
//                                               <motion.div
//                                                 className={`h-full opacity-30 ${
//                                                   isScheduleSelectionPoll
//                                                     ? "bg-gradient-to-r from-orange-100 to-orange-200"
//                                                     : "bg-gradient-to-r from-purple-100 to-purple-200"
//                                                 }`}
//                                                 initial={{ width: 0 }}
//                                                 animate={{ width: `${votePercentage}%` }}
//                                                 transition={{ duration: 1, delay: 0.5 }}
//                                               />
//                                             </div>
//                                           )}
//                                           <div className="relative flex items-center justify-between">
//                                             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                                               {isVotable && (
//                                                 <div
//                                                   className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
//                                                     isSelected ? "bg-orange-500 border-orange-500" : "border-gray-300"
//                                                   }`}
//                                                 >
//                                                   {isSelected && <HiCheck className="w-3 h-3 text-white" />}
//                                                 </div>
//                                               )}
//                                               <div className="flex-1 min-w-0">
//                                                 <div className="flex items-center gap-2 mb-1">
//                                                   <span className="font-medium text-gray-800 text-sm sm:text-base">
//                                                     {option.day || "Unknown Day"}
//                                                   </span>
//                                                   <span className="text-xs sm:text-sm text-gray-600">
//                                                     {option.date ? formatDate(option.date) : "No Date"}
//                                                   </span>
//                                                 </div>
//                                                 <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
//                                                   <span className="flex items-center gap-1">
//                                                     <HiClock className="w-3 h-3" />
//                                                     {option.start ? formatTime(option.start) : "00:00"} -{" "}
//                                                     {option.end ? formatTime(option.end) : "00:00"}
//                                                   </span>
//                                                   <span className="flex items-center gap-1">
//                                                     <HiLocationMarker className="w-3 h-3" />
//                                                     {option.room || "No Room"}
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                             {/* Vote count and percentage */}
//                                             {!isVotable && (
//                                               <div className="text-right flex-shrink-0 ml-2">
//                                                 <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
//                                                   <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
//                                                   {option.voteCount || 0}
//                                                 </div>
//                                                 <div className="text-xs text-gray-500">{votePercentage}%</div>
//                                               </div>
//                                             )}
//                                           </div>
//                                         </motion.div>
//                                       )
//                                     })}
//                                   </div>
//                                 </div>

//                                 {/* Poll Statistics Info */}
//                                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                                   {isSent ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
//                                       <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
//                                       <span className="text-green-700">
//                                         This poll was sent to your students. View the current response statistics above.
//                                       </span>
//                                     </div>
//                                   ) : isVotable ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
//                                       <HiCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
//                                       <span className="text-orange-700">
//                                         Schedule selection poll - Select your preferred time slots and submit your vote.
//                                       </span>
//                                     </div>
//                                   ) : isScheduleSelectionPoll ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
//                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
//                                       <span className="text-orange-700">
//                                         Schedule selection poll from colleague. You can view results but cannot vote.
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
//                                       <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
//                                       <span className="text-purple-700">
//                                         Regular poll from colleague. You can view results but cannot vote.
//                                       </span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </motion.div>
//                             ) : (
//                               <motion.div
//                                 initial={{ y: -20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.1 }}
//                                 className="space-y-4"
//                               >
//                                 {/* Light text for messages - visible on small screens only when expanded */}
//                                 <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
//                                   <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
//                                     <span className="flex items-center gap-1">
//                                       <HiAcademicCap className="w-3 h-3" />
//                                       {data?.courseCode || "N/A"}
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       {getRelativeTime(notification.createdAt)}
//                                     </span>
//                                   </div>
//                                   <div className="text-xs text-gray-600">by {data?.sender || "Unknown"}</div>
//                                 </div>

//                                 {/* Full Message Content */}
//                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
//                                   <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
//                                     {data?.content || "No content"}
//                                   </p>
//                                 </div>

//                                 {/* Message Actions */}
//                                 <div className="flex gap-3">
//                                   {readMessages.includes(notification._id) ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
//                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
//                                       <span className="text-green-700 font-medium">
//                                         Message opened and marked as read
//                                       </span>
//                                     </div>
//                                   ) : isSent ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
//                                       <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
//                                       <span className="text-green-700 font-medium">Message sent to students</span>
//                                     </div>
//                                   ) : !notification.isRead ? (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                                       <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
//                                       <span className="text-blue-700 font-medium">
//                                         Notification opened - marked as read
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
//                                       <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
//                                       <span className="text-green-700 font-medium">Message marked as read</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </motion.div>
//                             )}
//                           </CardContent>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </Card>
//                 </motion.div>
//               )
//             })}
//           </AnimatePresence>
//         </motion.div>

//         {/* Empty State */}
//         {filteredNotifications.length === 0 && !loading && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
//             <HiInbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
//             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}
//       </div>
//     </main>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import {
  HiInbox,
  HiMail,
  HiClock,
  HiLocationMarker,
  HiAcademicCap,
  HiExclamationCircle,
  HiInformationCircle,
  HiCheck,
  HiSearch,
  HiChevronRight,
  HiUsers,
  HiFilter,
  HiChartBar,
  HiEye,
  HiPaperAirplane,
  HiCheckCircle,
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"

export default function ProfessorInboxPage() {
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [filterDirection, setFilterDirection] = useState("all")
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readMessages, setReadMessages] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({}) // Track selected options for voting
  const [votingLoading, setVotingLoading] = useState({}) // Track voting loading state
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for search parameter from dashboard navigation
  useEffect(() => {
    const searchFromDashboard = searchParams.get("search")
    if (searchFromDashboard) {
      setSearchTerm(decodeURIComponent(searchFromDashboard))
    }
  }, [searchParams])

  useEffect(() => {
    if (!session) return
    fetchNotifications()
  }, [session])

  const fetchNotifications = async () => {
    try {
      console.log("Getting professor notifications!!")
      setLoading(true)
      const response = await fetch("/api/professor/getNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profEmail: session.user.email }),
      })
      const data = await response.json()
      console.log(response)
      console.log("emailsss", session.user.email)

      if (data.success) {
        // Transform the professor notifications data
        const transformedNotifications = data.professor
          .filter((item) => item.notification)
          .map((item) => {
            const notification = item.notification
            // Check if this is a poll or schedule selection (both should be treated as polls)
            const isPollType = notification.type === "poll" || notification.type === "schedule selection"

            // Determine direction: sent if the notification was created by the current professor
            const isSent = notification.prof && notification.prof.email === session.user.email
            const direction = isSent ? "sent" : "received"

            if (isPollType) {
              // For polls and schedule selections, process the votes from the message object
              const processedVotes = {}
              let totalVotes = 0
              if (notification.message && notification.message.votes) {
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

              // Determine poll type - use the notification type directly
              const pollType = notification.type === "schedule selection" ? "schedule selection" : "regular"

              // Transform poll data to match expected structure
              return {
                _id: item._id,
                message: notification._id,
                type: "poll", // Always set as poll for UI consistency
                direction: direction,
                isRead: item.isRead === true,
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt,
                pollData: {
                  _id: notification.message?._id || "",
                  options:
                    notification.message?.options?.map((option) => ({
                      ...option,
                      voteCount: processedVotes[option._id] || 0,
                    })) || [],
                  course: notification.course ? notification.course.title : "Unknown Course",
                  courseCode: notification.course ? notification.course.courseCode : "N/A",
                  prof: notification.prof ? notification.prof.username || "Unknown" : "Admin",
                  reason: notification.message?.reason || "No reason provided",
                  context: notification.message?.context || "No context provided",
                  isApproved: notification.message?.isApproved,
                  totalVotes: totalVotes,
                  totalStudents: notification.course ? notification.course.enrolledStudents?.length || 0 : 0,
                  pollType: pollType, // This determines if voting is allowed
                },
              }
            } else {
              // Transform message data to match expected structure
              return {
                _id: item._id,
                message: notification._id,
                type: "message",
                direction: direction,
                isRead: item.isRead === true,
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt,
                messageData: {
                  title: notification.messageTitle || "No Title",
                  content: typeof notification.message === "string" ? notification.message : "No content",
                  sender: notification.prof ? notification.prof.username || "Unknown" : "Admin",
                  course: notification.course ? notification.course.title : "Unknown Course",
                  courseCode: notification.course ? notification.course.courseCode : "N/A",
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
  }

  // API call to mark message as read
  const markMessageAsRead = async (notificationId) => {
    try {
      console.log("Marking message as read:", notificationId)
      const response = await fetch("/api/professor/markAsRead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profEmail: session.user.email,
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

  // API call to submit vote for schedule selection polls
  const submitVote = async (pollId, selectedOptionIds) => {
    try {
      setVotingLoading((prev) => ({ ...prev, [pollId]: true }))

      // Find the notification to get the full option data
      const notification = notifications.find((n) => n.pollData?._id === pollId)
      if (!notification || !notification.pollData?.options) {
        alert("Error: Could not find poll options")
        return
      }

      // Transform selected option IDs into detailed option objects
      const selectedOptionsData = selectedOptionIds
        .map((optionId) => {
          const option = notification.pollData.options.find((opt) => opt._id === optionId)
          console.log(option)
          if (!option) return null

          return {
            start: option.start,
            end: option.end,
            day: option.day || "Unknown",
            room: option.room || "Unknown",
          }
        })
        .filter(Boolean) // Remove any null values

      console.log("selectedOption :", selectedOptions)
      console.log("selection options modified: ", selectedOptionsData)

      const response = await fetch("/api/professor/voteForPolls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profEmail: session.user.email,
          pollId: pollId,
          selectedOptions: selectedOptionsData, // Send the detailed option objects
        }),
      })

      const data = await response.json()
      if (data.success) {
        console.log("Vote submitted successfully")

        // Mark the notification as read ONLY after successful vote submission
        await markMessageAsRead(notification._id)

        // Update local state to mark as read
        setNotifications((prev) =>
          prev.map((notif) => (notif._id === notification._id ? { ...notif, isRead: true } : notif)),
        )

        // Refresh notifications to get updated vote counts
        await fetchNotifications()
        // Clear selected options for this poll
        setSelectedOptions((prev) => ({ ...prev, [pollId]: [] }))
      } else {
        console.error("Failed to submit vote:", data.message)
        alert("Failed to submit vote: " + data.message)
      }
    } catch (error) {
      console.error("Error submitting vote:", error)
      alert("Error submitting vote: " + error.message)
    } finally {
      setVotingLoading((prev) => ({ ...prev, [pollId]: false }))
    }
  }

  // Handle option selection for voting
  const handleOptionSelect = (pollId, optionId) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[pollId] || []
      const isSelected = currentSelections.includes(optionId)
      if (isSelected) {
        // Remove option if already selected
        return {
          ...prev,
          [pollId]: currentSelections.filter((id) => id !== optionId),
        }
      } else {
        // Add option to selection (allow multiple selections)
        return {
          ...prev,
          [pollId]: [...currentSelections, optionId],
        }
      }
    })
  }

  useEffect(() => {
    if (!loading) {
      filterNotifications()
    }
  }, [searchTerm, filterType, filterRead, filterDirection, notifications, loading])

  const filterNotifications = () => {
    let filtered = notifications

    if (searchTerm) {
      filtered = filtered.filter((notification) => {
        const searchLower = searchTerm.toLowerCase()
        if (notification.type === "poll") {
          const course = notification.pollData?.course || ""
          const courseCode = notification.pollData?.courseCode || ""
          const reason = notification.pollData?.reason || ""
          return (
            course.toLowerCase().includes(searchLower) ||
            courseCode.toLowerCase().includes(searchLower) ||
            reason.toLowerCase().includes(searchLower)
          )
        } else {
          const title = notification.messageData?.title || ""
          const course = notification.messageData?.course || ""
          const sender = notification.messageData?.sender || ""
          const content = notification.messageData?.content || ""
          return (
            title.toLowerCase().includes(searchLower) ||
            course.toLowerCase().includes(searchLower) ||
            sender.toLowerCase().includes(searchLower) ||
            content.toLowerCase().includes(searchLower)
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

    if (filterDirection !== "all") {
      filtered = filtered.filter((notification) => notification.direction === filterDirection)
    }

    setFilteredNotifications(filtered)
  }

  const toggleExpanded = async (id) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
      // Find the notification
      const notification = notifications.find((n) => n._id === id)

      // Only mark as read if it's NOT a schedule selection poll that can be voted on
      // Schedule selection polls should only be marked as read after voting
      const isVotableScheduleSelection = canVote(notification)

      if (notification && !notification.isRead && !isVotableScheduleSelection) {
        // Update local state immediately
        setNotifications((prev) =>
          prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification)),
        )
        // Make API call to mark as read
        await markMessageAsRead(id)
      }
    }
    setExpandedItems(newExpanded)
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

  const getParticipationRate = (totalVotes, totalStudents) => {
    if (totalStudents === 0) return 0
    return Math.round((totalVotes / totalStudents) * 100)
  }

  // Check if professor can vote on this poll - ONLY for schedule selection polls that are received AND not already voted on
  const canVote = (notification) => {
    return (
      notification.type === "poll" &&
      notification.pollData?.pollType === "schedule selection" &&
      notification.direction === "received" &&
      !readMessages.includes(notification._id) && // Not already voted/read
      !notification.isRead // Not marked as read in database
    )
  }

  // Check if this poll has already been voted on
  const hasAlreadyVoted = (notification) => {
    return (
      notification.type === "poll" &&
      notification.pollData?.pollType === "schedule selection" &&
      notification.direction === "received" &&
      (readMessages.includes(notification._id) || notification.isRead)
    )
  }

  // Check if this is a schedule selection poll (for UI styling)
  const isScheduleSelection = (notification) => {
    return notification.type === "poll" && notification.pollData?.pollType === "schedule selection"
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const sentCount = notifications.filter((n) => n.direction === "sent").length
  const receivedCount = notifications.filter((n) => n.direction === "received").length

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
              <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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
                  <HiInbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Professor Inbox</h1>
                  <p className="text-sm sm:text-base text-gray-600">Manage your notifications and communications</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                  {filteredNotifications.length} Total
                </Badge>
                <Badge className="bg-green-500 text-white text-xs sm:text-sm">
                  <HiPaperAirplane className="w-3 h-3 mr-1" />
                  {sentCount} Sent
                </Badge>
                <Badge className="bg-purple-500 text-white text-xs sm:text-sm">
                  <HiMail className="w-3 h-3 mr-1" />
                  {receivedCount} Received
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
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={filterDirection} onValueChange={setFilterDirection}>
                <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
                  <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="flex-1 min-w-32 sm:w-36 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
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
                <SelectTrigger className="flex-1 min-w-32 sm:w-32 sm:flex-none bg-white/80 backdrop-blur-md border-gray-200 text-sm">
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
              const isSent = notification.direction === "sent"
              const isVotable = canVote(notification)
              const hasVoted = hasAlreadyVoted(notification)
              const isScheduleSelectionPoll = isScheduleSelection(notification)
              const pollId = isPoll ? notification.pollData._id : null
              const currentSelections = selectedOptions[pollId] || []
              const isVotingLoading = votingLoading[pollId] || false

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
                      !notification.isRead
                        ? isVotable
                          ? "border-orange-300 bg-gradient-to-r from-orange-50/50 to-yellow-50/50"
                          : hasVoted
                            ? "border-green-300 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
                            : isScheduleSelectionPoll
                              ? "border-orange-200 bg-orange-50/20"
                              : isPoll
                                ? "border-purple-200 bg-purple-50/20"
                                : "border-blue-200 bg-blue-50/30"
                        : isVotable
                          ? "border-orange-200 bg-orange-50/20"
                          : hasVoted
                            ? "border-green-200 bg-green-50/20"
                            : isScheduleSelectionPoll
                              ? "border-orange-100 bg-orange-50/10"
                              : isPoll
                                ? "border-purple-100 bg-purple-50/10"
                                : "border-gray-100"
                    }`}
                  >
                    <CardHeader className="pt-4 sm:pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <motion.div
                            className={`p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0 ${
                              isPoll
                                ? isVotable
                                  ? "bg-gradient-to-br from-orange-500 to-amber-600"
                                  : hasVoted
                                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                    : isScheduleSelectionPoll
                                      ? "bg-gradient-to-br from-orange-400 to-orange-500"
                                      : "bg-gradient-to-br from-purple-500 to-purple-600"
                                : "bg-gradient-to-br from-green-500 to-green-600"
                            }`}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isPoll ? (
                              isVotable ? (
                                <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              ) : hasVoted ? (
                                <HiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              ) : isScheduleSelectionPoll ? (
                                <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              ) : (
                                <HiChartBar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              )
                            ) : (
                              <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            )}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight">
                                {isPoll
                                  ? isVotable
                                    ? `Schedule Selection: ${data?.course || "Unknown Course"}`
                                    : hasVoted
                                      ? `Schedule Selection: ${data?.course || "Unknown Course"} (Voted)`
                                      : isScheduleSelectionPoll
                                        ? `Schedule Selection: ${data?.course || "Unknown Course"}`
                                        : `Poll: ${data?.course || "Unknown Course"}`
                                  : data?.title || "No Title"}
                              </h3>
                              {!notification.isRead && !hasVoted && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                              <Badge
                                className={`text-xs py-1 flex-shrink-0 ${
                                  isSent
                                    ? "bg-green-100 text-green-700"
                                    : isVotable
                                      ? "bg-orange-100 text-orange-700"
                                      : hasVoted
                                        ? "bg-green-100 text-green-700"
                                        : isScheduleSelectionPoll
                                          ? "bg-orange-100 text-orange-600"
                                          : isPoll
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {isSent ? (
                                  <>
                                    <HiPaperAirplane className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Sent</span>
                                  </>
                                ) : isVotable ? (
                                  <>
                                    <HiCheckCircle className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Vote</span>
                                  </>
                                ) : hasVoted ? (
                                  <>
                                    <HiCheck className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Voted</span>
                                  </>
                                ) : isScheduleSelectionPoll ? (
                                  <>
                                    <HiClock className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Schedule</span>
                                  </>
                                ) : isPoll ? (
                                  <>
                                    <HiChartBar className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Poll</span>
                                  </>
                                ) : (
                                  <>
                                    <HiMail className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Message</span>
                                  </>
                                )}
                              </Badge>
                            </div>
                            {/* Light text - hidden on small screens, visible on large screens */}
                            <div className="hidden sm:flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4" />
                                {data?.courseCode || "N/A"}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {getRelativeTime(notification.createdAt)}
                              </span>
                              {data?.prof && <span className="">by {data.prof}</span>}
                              {!isPoll && data?.sender && <span className="">by {data.sender}</span>}
                              {isPoll && (
                                <span className="flex items-center gap-1">
                                  <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {isSent
                                    ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
                                    : `${data?.totalVotes || 0} votes`}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed font-semibold line-clamp-2">
                              {isPoll
                                ? data?.reason || "No reason provided"
                                : (data?.content || "No content").substring(0, 80) +
                                  ((data?.content || "").length > 80 ? "..." : "")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 flex-shrink-0">
                          <Badge
                            variant={isPoll ? "secondary" : "outline"}
                            className={`${
                              isPoll
                                ? isVotable
                                  ? "bg-orange-100 text-orange-700"
                                  : hasVoted
                                    ? "bg-green-100 text-green-700"
                                    : isScheduleSelectionPoll
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-purple-100 text-purple-700"
                                : "bg-green-100 text-green-700"
                            } text-xs`}
                          >
                            {isPoll
                              ? isVotable
                                ? "Vote"
                                : hasVoted
                                  ? "Voted"
                                  : isScheduleSelectionPoll
                                    ? "Schedule"
                                    : "Poll"
                              : "Message"}
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
                                {/* Light text - visible on small screens only when expanded */}
                                <div className="sm:hidden bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <HiAcademicCap className="w-3 h-3" />
                                      {data?.courseCode || "N/A"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <HiClock className="w-3 h-3" />
                                      {getRelativeTime(notification.createdAt)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                                    {data?.prof && <span className="">by {data.prof}</span>}
                                    <span className="flex items-center gap-1">
                                      <HiUsers className="w-3 h-3" />
                                      {isSent
                                        ? `${getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}% response`
                                        : `${data?.totalVotes || 0} votes`}
                                    </span>
                                  </div>
                                </div>

                                {/* Poll Context */}
                                <div
                                  className={`p-3 sm:p-4 rounded-xl border ${
                                    isVotable
                                      ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
                                      : hasVoted
                                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
                                        : isScheduleSelectionPoll
                                          ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-100"
                                          : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
                                  }`}
                                >
                                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                    <HiInformationCircle
                                      className={`w-4 h-4 ${
                                        isVotable || isScheduleSelectionPoll
                                          ? "text-orange-600"
                                          : hasVoted
                                            ? "text-green-600"
                                            : "text-purple-600"
                                      }`}
                                    />
                                    Context
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                                    {data?.context || "No context provided"}
                                  </p>
                                  {isSent && (
                                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
                                      <span className="flex items-center gap-1">
                                        <HiUsers className="w-3 h-3" />
                                        {data?.totalStudents || 0} students
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <HiChartBar className="w-3 h-3" />
                                        {data?.totalVotes || 0} responses
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <HiCheck className="w-3 h-3" />
                                        {getParticipationRate(data?.totalVotes || 0, data?.totalStudents || 0)}%
                                        response rate
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Poll Options */}
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                                      <HiChartBar
                                        className={`w-4 h-4 ${
                                          isVotable || isScheduleSelectionPoll
                                            ? "text-orange-600"
                                            : hasVoted
                                              ? "text-green-600"
                                              : "text-purple-600"
                                        }`}
                                      />
                                      {isVotable
                                        ? "Select Your Preferred Options:"
                                        : hasVoted
                                          ? "Your Vote Has Been Submitted:"
                                          : "Poll Statistics:"}
                                    </h4>
                                    {isVotable && currentSelections.length > 0 && (
                                      <Button
                                        onClick={() => submitVote(pollId, currentSelections)}
                                        disabled={isVotingLoading}
                                        className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2"
                                      >
                                        {isVotingLoading ? (
                                          <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                          </>
                                        ) : (
                                          <>
                                            <HiCheck className="w-4 h-4 mr-2" />
                                            Submit Vote ({currentSelections.length})
                                          </>
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                  <div className="space-y-2 sm:space-y-3">
                                    {(data?.options || []).map((option, index) => {
                                      const votePercentage = getVotePercentage(
                                        option.voteCount || 0,
                                        data?.totalVotes || 0,
                                      )
                                      const isSelected = currentSelections.includes(option._id)
                                      return (
                                        <motion.div
                                          key={option._id || index}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className={`relative p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
                                            isVotable
                                              ? isSelected
                                                ? "border-orange-400 bg-orange-50 cursor-pointer hover:border-orange-500"
                                                : "border-orange-200 bg-white cursor-pointer hover:border-orange-300"
                                              : hasVoted
                                                ? "border-green-200 bg-green-50/30"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                          }`}
                                          onClick={isVotable ? () => handleOptionSelect(pollId, option._id) : undefined}
                                        >
                                          {/* Vote percentage bar */}
                                          {!isVotable && (
                                            <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
                                              <motion.div
                                                className={`h-full opacity-30 ${
                                                  hasVoted
                                                    ? "bg-gradient-to-r from-green-100 to-green-200"
                                                    : isScheduleSelectionPoll
                                                      ? "bg-gradient-to-r from-orange-100 to-orange-200"
                                                      : "bg-gradient-to-r from-purple-100 to-purple-200"
                                                }`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${votePercentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                              />
                                            </div>
                                          )}
                                          <div className="relative flex items-center justify-between">
                                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                              {isVotable && (
                                                <div
                                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                    isSelected ? "bg-orange-500 border-orange-500" : "border-gray-300"
                                                  }`}
                                                >
                                                  {isSelected && <HiCheck className="w-3 h-3 text-white" />}
                                                </div>
                                              )}
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                                                    {option.day || "Unknown Day"}
                                                  </span>
                                                  <span className="text-xs sm:text-sm text-gray-600">
                                                    {option.date ? formatDate(option.date) : "No Date"}
                                                  </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
                                                  <span className="flex items-center gap-1">
                                                    <HiClock className="w-3 h-3" />
                                                    {option.start ? formatTime(option.start) : "00:00"} -{" "}
                                                    {option.end ? formatTime(option.end) : "00:00"}
                                                  </span>
                                                  <span className="flex items-center gap-1">
                                                    <HiLocationMarker className="w-3 h-3" />
                                                    {option.room || "No Room"}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            {/* Vote count and percentage */}
                                            {!isVotable && (
                                              <div className="text-right flex-shrink-0 ml-2">
                                                <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
                                                  <HiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                                                  {option.voteCount || 0}
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

                                {/* Poll Statistics Info */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                  {isSent ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <HiChartBar className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                                      <span className="text-green-700">
                                        This poll was sent to your students. View the current response statistics above.
                                      </span>
                                    </div>
                                  ) : isVotable ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                      <HiCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
                                      <span className="text-orange-700">
                                        Schedule selection poll - Select your preferred time slots and submit your vote.
                                      </span>
                                    </div>
                                  ) : hasVoted ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <HiCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                                      <span className="text-green-700">
                                        You have already submitted your vote for this schedule selection poll. Thank you
                                        for your response!
                                      </span>
                                    </div>
                                  ) : isScheduleSelectionPoll ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                      <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-600" />
                                      <span className="text-orange-700">
                                        Schedule selection poll from colleague. You can view results but cannot vote.
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                      <HiEye className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600" />
                                      <span className="text-purple-700">
                                        Regular poll from colleague. You can view results but cannot vote.
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
                                      <HiAcademicCap className="w-3 h-3" />
                                      {data?.courseCode || "N/A"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <HiClock className="w-3 h-3" />
                                      {getRelativeTime(notification.createdAt)}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600">by {data?.sender || "Unknown"}</div>
                                </div>

                                {/* Full Message Content */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-100">
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    {data?.content || "No content"}
                                  </p>
                                </div>

                                {/* Message Actions */}
                                <div className="flex gap-3">
                                  {readMessages.includes(notification._id) ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <HiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-green-700 font-medium">
                                        Message opened and marked as read
                                      </span>
                                    </div>
                                  ) : isSent ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                      <HiPaperAirplane className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-green-700 font-medium">Message sent to students</span>
                                    </div>
                                  ) : !notification.isRead ? (
                                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                      <HiInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                      <span className="text-blue-700 font-medium">
                                        Notification opened - marked as read
                                      </span>
                                    </div>
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
        {filteredNotifications.length === 0 && !loading && (
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