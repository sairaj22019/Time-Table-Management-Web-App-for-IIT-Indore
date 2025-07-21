

"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, MapPin, CheckCircle, XCircle, Calendar, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- TRANSFORM FUNCTION ---
function transformNotificationToPoll(notification) {
  const { message, prof, course, type, messageTitle } = notification
  // Find vote counts for each option
  const voteCounts = {}
  if (message.votes && Array.isArray(message.votes)) {
    message.votes.forEach((vote) => {
      const optionId = vote.option?.toString()
      if (optionId) voteCounts[optionId] = (voteCounts[optionId] || 0) + 1
    })
  }
  // Find winning option
  const topVotedOptionId = Object.entries(voteCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const topOption = message.options.find((opt) => opt._id.toString() === topVotedOptionId)
  const topVotes = voteCounts[topVotedOptionId] || 0
  const totalVotes = message.votes?.length || 0
  const percentage = totalVotes > 0 ? Math.round((topVotes / totalVotes) * 100) : 0

  // --- FIX PROFESSOR NAME LOGIC ---
  const professor =
    prof?.name ||
    (Array.isArray(prof?.profName) ? prof.profName.join(", ") : prof?.profName) ||
    (Array.isArray(course?.profName) ? course.profName.join(", ") : course?.profName) ||
    "Professor"

  return {
    id: notification._id,
    title: messageTitle || message.reason || (course?.title ? `${course.title} Poll` : "Poll"),
    course: course?.courseCode || "Course",
    professor,
    status: message.isApproved ? "approved" : "pending",
    totalVotes: totalVotes,
    winningOption: topOption
      ? {
          date: new Date(topOption.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          time: `${new Date(topOption.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(topOption.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          location: topOption.room || "TBD",
          votes: topVotes,
          percentage: percentage,
        }
      : {
          date: "No votes",
          time: "No votes",
          location: "No votes",
          votes: 0,
          percentage: 0,
        },
  }
}

export default function ApprovePollPage() {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processingId, setProcessingId] = useState(null)

  // Calculate pending approvals count
  const pendingCount = polls.filter((poll) => poll.status === "pending").length

  // Fetch polls from backend on mount
  useEffect(() => {
    fetchPolls()
  }, [])

  const fetchPolls = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/approvePolls")
      const data = await response.json()
      if (data.success && data.notifications) {
        setPolls(data.notifications.map(transformNotificationToPoll))
      } else if (data.success && data.polls) {
        // fallback for old API
        setPolls(data.polls.map(transformNotificationToPoll))
      } else {
        setError(data.message || "Unknown error")
      }
    } catch (err) {
      setError("Failed to fetch polls")
      console.error("Error fetching polls:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (pollId) => {
    setProcessingId(pollId)
    try {
      const response = await fetch("/api/admin/approvePolls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId, status: true }), // or notificationId: pollId
      })
      const data = await response.json()
      if (data.success) {
        setPolls(polls.map((poll) => (poll.id === pollId ? { ...poll, status: "approved" } : poll)))
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to approve poll")
      console.error("Error approving poll:", err)
    } finally {
      setProcessingId(null)
    }
  }

  const handleDisapprove = async (pollId) => {
    setProcessingId(pollId)
    try {
      const response = await fetch("/api/admin/approvePolls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId, status: false }), // or notificationId: pollId
      })
      const data = await response.json()
      if (data.success) {
        setPolls(polls.map((poll) => (poll.id === pollId ? { ...poll, status: "disapproved" } : poll)))
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to disapprove poll")
      console.error("Error disapproving poll:", err)
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "disapproved":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "disapproved":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading polls...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Polls</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchPolls} className="bg-blue-500 hover:bg-blue-600">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="container mx-auto p-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <h1 className="text-xl sm:text-4xl font-bold mb-2 text-gray-800">Poll Approval Dashboard</h1>
            <p className="text-gray-600 text-md sm:text-lg">Review and approve poll results from professors and students</p>
          </div>

          {/* Pending Approvals Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium text-sm border border-blue-200 shadow-sm"
              style={{
                height: "36px",
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pendingCount} Pending
            </div>
          </motion.div>
        </motion.div>

        <div className="grid gap-6">
          <AnimatePresence>
            {polls
              .slice()
              .reverse()
              .map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5 }}
                  className="transform transition-all duration-300"
                >
                  <Card className="w-full shadow-lg hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2 text-gray-800">{poll.title}</CardTitle>
                          <CardDescription className="text-base text-gray-600">
                            {poll.course} • Professor: {poll.professor}
                          </CardDescription>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Badge
                            className={`${getStatusColor(poll.status)} flex items-center gap-1 px-3 py-1 font-medium`}
                          >
                            {getStatusIcon(poll.status)}
                            {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                          </Badge>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Winning Poll Option */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-lg text-gray-800">
                              {poll.totalVotes > 0 ? "Winning Poll Option" : "No Votes Yet"}
                            </h3>
                          </div>
                          <div className="grid md:grid-cols-3 gap-6">
                            <motion.div
                              className="flex items-center gap-3"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{poll.winningOption.date}</p>
                                <p className="text-sm text-gray-600">{poll.winningOption.time}</p>
                              </div>
                            </motion.div>
                            <motion.div
                              className="flex items-center gap-3"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <MapPin className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{poll.winningOption.location}</p>
                                <p className="text-sm text-gray-600">Venue</p>
                              </div>
                            </motion.div>
                            <motion.div
                              className="flex items-center gap-3"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{poll.winningOption.votes} votes</p>
                                <p className="text-sm text-gray-600">{poll.winningOption.percentage}% support</p>
                              </div>
                            </motion.div>
                          </div>
                          {/* Vote Progress Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Vote Progress</span>
                              <span>{poll.totalVotes} total votes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${poll.winningOption.percentage}%`,
                                }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                        {/* Action Buttons */}
                        {poll.status === "pending" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4 pt-4 border-t border-gray-100"
                          >
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button
                                onClick={() => handleApprove(poll.id)}
                                disabled={processingId === poll.id}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                <AnimatePresence mode="wait">
                                  {processingId === poll.id ? (
                                    <motion.div
                                      key="loading"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                          duration: 1,
                                          repeat: Number.POSITIVE_INFINITY,
                                          ease: "linear",
                                        }}
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                      />
                                      Processing...
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      key="approve"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle className="h-5 w-5" />
                                      Approve Poll
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button
                                onClick={() => handleDisapprove(poll.id)}
                                disabled={processingId === poll.id}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                <AnimatePresence mode="wait">
                                  {processingId === poll.id ? (
                                    <motion.div
                                      key="loading"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                          duration: 1,
                                          repeat: Number.POSITIVE_INFINITY,
                                          ease: "linear",
                                        }}
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                      />
                                      Processing...
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      key="disapprove"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <XCircle className="h-5 w-5" />
                                      Disapprove Poll
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                        {/* Status Message for Processed Polls */}
                        {poll.status !== "pending" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`p-4 rounded-xl border ${
                              poll.status === "approved"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {poll.status === "approved" ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <XCircle className="h-5 w-5" />
                              )}
                              <span className="font-semibold">Poll has been {poll.status}</span>
                            </div>
                            <p className="text-sm mt-1 opacity-80">
                              {poll.status === "approved"
                                ? "Students and professor have been notified of the approved schedule."
                                : "The poll request has been declined. Professor has been notified."}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        {polls.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No polls to review</h3>
              <p className="text-gray-500">All polls have been processed or there are no pending polls at this time.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Users, Clock, MapPin, CheckCircle, XCircle, Calendar, AlertCircle } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// // --- TRANSFORM FUNCTION ---
// function transformNotificationToPoll(notification) {
//   const { message, prof, course, type, messageTitle } = notification

//   // Find vote counts for each option
//   const voteCounts = {}
//   if (message.votes && Array.isArray(message.votes)) {
//     message.votes.forEach((vote) => {
//       const optionId = vote.option?.toString()
//       if (optionId) voteCounts[optionId] = (voteCounts[optionId] || 0) + 1
//     })
//   }

//   // Find winning option
//   const topVotedOptionId = Object.entries(voteCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
//   const topOption = message.options.find((opt) => opt._id.toString() === topVotedOptionId)
//   const topVotes = voteCounts[topVotedOptionId] || 0
//   const totalVotes = message.votes?.length || 0
//   const percentage = totalVotes > 0 ? Math.round((topVotes / totalVotes) * 100) : 0

//   // --- FIX PROFESSOR NAME LOGIC ---
//   const professor =
//     prof?.name ||
//     (Array.isArray(prof?.profName) ? prof.profName.join(", ") : prof?.profName) ||
//     (Array.isArray(course?.profName) ? course.profName.join(", ") : course?.profName) ||
//     "Professor"

//   return {
//     id: notification._id,
//     title: messageTitle || message.reason || (course?.title ? `${course.title} Poll` : "Poll"),
//     course: course?.courseCode || "Course",
//     professor,
//     status: message.isApproved ? "approved" : "pending",
//     totalVotes: totalVotes,
//     winningOption: topOption
//       ? {
//           date: new Date(topOption.date).toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           }),
//           time: `${new Date(topOption.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(topOption.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
//           location: topOption.room || "TBD",
//           votes: topVotes,
//           percentage: percentage,
//         }
//       : {
//           date: "No votes",
//           time: "No votes",
//           location: "No votes",
//           votes: 0,
//           percentage: 0,
//         },
//   }
// }

// export default function ApprovePollPage() {
//   const [polls, setPolls] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [processingApprove, setProcessingApprove] = useState(null)
//   const [processingDisapprove, setProcessingDisapprove] = useState(null)

//   // Calculate pending approvals count
//   const pendingCount = polls.filter((poll) => poll.status === "pending").length

//   // Fetch polls from backend on mount
//   useEffect(() => {
//     fetchPolls()
//   }, [])

//   const fetchPolls = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await fetch("/api/admin/approvePolls")
//       const data = await response.json()

//       if (data.success && data.notifications) {
//         setPolls(data.notifications.map(transformNotificationToPoll))
//       } else if (data.success && data.polls) {
//         // fallback for old API
//         setPolls(data.polls.map(transformNotificationToPoll))
//       } else {
//         setError(data.message || "Unknown error")
//       }
//     } catch (err) {
//       setError("Failed to fetch polls")
//       console.error("Error fetching polls:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (pollId) => {
//     setProcessingApprove(pollId)
//     try {
//       const response = await fetch("/api/admin/approvePolls", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ pollId, status: true }), // or notificationId: pollId
//       })

//       const data = await response.json()
//       if (data.success) {
//         setPolls(polls.map((poll) => (poll.id === pollId ? { ...poll, status: "approved" } : poll)))
//       } else {
//         setError(data.message)
//       }
//     } catch (err) {
//       setError("Failed to approve poll")
//       console.error("Error approving poll:", err)
//     } finally {
//       setProcessingApprove(null)
//     }
//   }

//   const handleDisapprove = async (pollId) => {
//     setProcessingDisapprove(pollId)
//     try {
//       const response = await fetch("/api/admin/approvePolls", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ pollId, status: false }), // or notificationId: pollId
//       })

//       const data = await response.json()
//       if (data.success) {
//         setPolls(polls.map((poll) => (poll.id === pollId ? { ...poll, status: "disapproved" } : poll)))
//       } else {
//         setError(data.message)
//       }
//     } catch (err) {
//       setError("Failed to disapprove poll")
//       console.error("Error disapproving poll:", err)
//     } finally {
//       setProcessingDisapprove(null)
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-100 text-green-800 border-green-200"
//       case "disapproved":
//         return "bg-red-100 text-red-800 border-red-200"
//       default:
//         return "bg-blue-100 text-blue-800 border-blue-200"
//     }
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "approved":
//         return <CheckCircle className="h-4 w-4" />
//       case "disapproved":
//         return <XCircle className="h-4 w-4" />
//       default:
//         return <Clock className="h-4 w-4" />
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 1,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//             }}
//             className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//           />
//           <p className="text-gray-600 text-lg">Loading polls...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
//         <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Polls</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <Button onClick={fetchPolls} className="bg-blue-500 hover:bg-blue-600">
//             Try Again
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
//       <div className="container mx-auto p-6 max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
//           className="mb-8 flex justify-between items-start"
//         >
//           <div>
//             <h1 className="text-xl sm:text-4xl font-bold mb-2 text-gray-800">Poll Approval Dashboard</h1>
//             <p className="text-gray-600 text-md sm:text-lg">
//               Review and approve poll results from professors and students
//             </p>
//           </div>
//           {/* Pending Approvals Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="flex-shrink-0"
//           >
//             <div
//               className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium text-sm border border-blue-200 shadow-sm"
//               style={{
//                 height: "36px",
//                 minWidth: "100px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {pendingCount} Pending
//             </div>
//           </motion.div>
//         </motion.div>

//         <div className="grid gap-6">
//           <AnimatePresence>
//             {polls
//               .slice()
//               .reverse()
//               .map((poll, index) => (
//                 <motion.div
//                   key={poll.id}
//                   initial={{ opacity: 0, y: 50, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -50, scale: 0.95 }}
//                   transition={{
//                     duration: 0.5,
//                     delay: index * 0.1,
//                     ease: "easeOut",
//                   }}
//                   whileHover={{ y: -5 }}
//                   className="transform transition-all duration-200"
//                 >
//                   <Card className="w-full shadow-lg hover:shadow-xl border-0 bg-white/90 backdrop-blur-sm">
//                     <CardHeader className="pb-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-xl mb-2 text-gray-800">{poll.title}</CardTitle>
//                           <CardDescription className="text-base text-gray-600">
//                             {poll.course} • Professor: {poll.professor}
//                           </CardDescription>
//                         </div>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             delay: 0.3,
//                             type: "spring",
//                             stiffness: 200,
//                           }}
//                         >
//                           <Badge
//                             className={`${getStatusColor(poll.status)} flex items-center gap-1 px-3 py-1 font-medium`}
//                           >
//                             {getStatusIcon(poll.status)}
//                             {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
//                           </Badge>
//                         </motion.div>
//                       </div>
//                     </CardHeader>

//                     <CardContent>
//                       <div className="space-y-6">
//                         {/* Winning Poll Option */}
//                         <motion.div
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 0.2 }}
//                           className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500"
//                         >
//                           <div className="flex items-center gap-2 mb-4">
//                             <Calendar className="h-5 w-5 text-blue-600" />
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {poll.totalVotes > 0 ? "Winning Poll Option" : "No Votes Yet"}
//                             </h3>
//                           </div>

//                           <div className="grid md:grid-cols-3 gap-6">
//                             <motion.div
//                               className="flex items-center gap-3"
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ type: "spring", stiffness: 400, duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-blue-100 rounded-lg">
//                                 <Clock className="h-5 w-5 text-blue-600" />
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-gray-800">{poll.winningOption.date}</p>
//                                 <p className="text-sm text-gray-600">{poll.winningOption.time}</p>
//                               </div>
//                             </motion.div>

//                             <motion.div
//                               className="flex items-center gap-3"
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ type: "spring", stiffness: 400, duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-blue-100 rounded-lg">
//                                 <MapPin className="h-5 w-5 text-blue-600" />
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-gray-800">{poll.winningOption.location}</p>
//                                 <p className="text-sm text-gray-600">Venue</p>
//                               </div>
//                             </motion.div>

//                             <motion.div
//                               className="flex items-center gap-3"
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ type: "spring", stiffness: 400, duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-blue-100 rounded-lg">
//                                 <Users className="h-5 w-5 text-blue-600" />
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-gray-800">{poll.winningOption.votes} votes</p>
//                                 <p className="text-sm text-gray-600">{poll.winningOption.percentage}% support</p>
//                               </div>
//                             </motion.div>
//                           </div>

//                           {/* Vote Progress Bar */}
//                           <div className="mt-4">
//                             <div className="flex justify-between text-sm text-gray-600 mb-2">
//                               <span>Vote Progress</span>
//                               <span>{poll.totalVotes} total votes</span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{
//                                   width: `${poll.winningOption.percentage}%`,
//                                 }}
//                                 transition={{ duration: 1, delay: 0.5 }}
//                                 className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
//                               />
//                             </div>
//                           </div>
//                         </motion.div>

//                         {/* Action Buttons */}
//                         {poll.status === "pending" && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4 }}
//                             className="flex gap-4 pt-4 border-t border-gray-100"
//                           >
//                             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//                               <Button
//                                 onClick={() => handleApprove(poll.id)}
//                                 disabled={processingApprove === poll.id}
//                                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                               >
//                                 <AnimatePresence mode="wait">
//                                   {processingApprove === poll.id ? (
//                                     <motion.div
//                                       key="loading"
//                                       initial={{ opacity: 0 }}
//                                       animate={{ opacity: 1 }}
//                                       exit={{ opacity: 0 }}
//                                       className="flex items-center gap-2"
//                                     >
//                                       <motion.div
//                                         animate={{ rotate: 360 }}
//                                         transition={{
//                                           duration: 1,
//                                           repeat: Number.POSITIVE_INFINITY,
//                                           ease: "linear",
//                                         }}
//                                         className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
//                                       />
//                                       Processing...
//                                     </motion.div>
//                                   ) : (
//                                     <motion.div
//                                       key="approve"
//                                       initial={{ opacity: 0 }}
//                                       animate={{ opacity: 1 }}
//                                       exit={{ opacity: 0 }}
//                                       className="flex items-center gap-2"
//                                     >
//                                       <CheckCircle className="h-5 w-5" />
//                                       Approve Poll
//                                     </motion.div>
//                                   )}
//                                 </AnimatePresence>
//                               </Button>
//                             </motion.div>

//                             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//                               <Button
//                                 onClick={() => handleDisapprove(poll.id)}
//                                 disabled={processingDisapprove === poll.id}
//                                 className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                               >
//                                 <AnimatePresence mode="wait">
//                                   {processingDisapprove === poll.id ? (
//                                     <motion.div
//                                       key="loading"
//                                       initial={{ opacity: 0 }}
//                                       animate={{ opacity: 1 }}
//                                       exit={{ opacity: 0 }}
//                                       className="flex items-center gap-2"
//                                     >
//                                       <motion.div
//                                         animate={{ rotate: 360 }}
//                                         transition={{
//                                           duration: 1,
//                                           repeat: Number.POSITIVE_INFINITY,
//                                           ease: "linear",
//                                         }}
//                                         className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
//                                       />
//                                       Processing...
//                                     </motion.div>
//                                   ) : (
//                                     <motion.div
//                                       key="disapprove"
//                                       initial={{ opacity: 0 }}
//                                       animate={{ opacity: 1 }}
//                                       exit={{ opacity: 0 }}
//                                       className="flex items-center gap-2"
//                                     >
//                                       <XCircle className="h-5 w-5" />
//                                       Disapprove Poll
//                                     </motion.div>
//                                   )}
//                                 </AnimatePresence>
//                               </Button>
//                             </motion.div>
//                           </motion.div>
//                         )}

//                         {/* Status Message for Processed Polls */}
//                         {poll.status !== "pending" && (
//                           <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: 0.3 }}
//                             className={`p-4 rounded-xl border ${
//                               poll.status === "approved"
//                                 ? "bg-green-50 border-green-200 text-green-800"
//                                 : "bg-red-50 border-red-200 text-red-800"
//                             }`}
//                           >
//                             <div className="flex items-center gap-2">
//                               {poll.status === "approved" ? (
//                                 <CheckCircle className="h-5 w-5" />
//                               ) : (
//                                 <XCircle className="h-5 w-5" />
//                               )}
//                               <span className="font-semibold">Poll has been {poll.status}</span>
//                             </div>
//                             <p className="text-sm mt-1 opacity-80">
//                               {poll.status === "approved"
//                                 ? "Students and professor have been notified of the approved schedule."
//                                 : "The poll request has been declined. Professor has been notified."}
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//           </AnimatePresence>
//         </div>

//         {polls.length === 0 && !loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-center py-12"
//           >
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
//               <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No polls to review</h3>
//               <p className="text-gray-500">All polls have been processed or there are no pending polls at this time.</p>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

