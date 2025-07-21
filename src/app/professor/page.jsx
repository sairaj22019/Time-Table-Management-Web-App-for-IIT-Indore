// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion, useScroll, useTransform, useSpring } from "framer-motion"
// import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"
// import {
//   HiAcademicCap,
//   HiCalendar,
//   HiOutlineMail,
//   HiCog,
//   HiBookOpen,
//   HiChevronRight,
//   HiStar,
//   HiTrendingUp,
//   HiSparkles,
//   HiGlobe,
//   HiInformationCircle,
//   HiClock,
//   HiChevronLeft,
//   HiBadgeCheck,
//   HiNewspaper,
//   HiChatAlt,
//   HiUserGroup,
//   HiClipboardList,
// } from "react-icons/hi"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// const quickActions = [
//   {
//     id: 1,
//     title: "View All Courses",
//     description: "Manage your teaching courses",
//     icon: HiAcademicCap,
//     color: "bg-blue-600 hover:bg-blue-700",
//     iconBg: "bg-blue-100",
//     iconColor: "text-blue-600",
//     path: "/professor/courses",
//     gradient: "from-blue-500 to-blue-600",
//   },
//   {
//     id: 2,
//     title: "Messages & Polls",
//     description: "Send messages or create polls",
//     icon: HiChatAlt,
//     color: "bg-green-600 hover:bg-green-700",
//     iconBg: "bg-green-100",
//     iconColor: "text-green-600",
//     path: "/professor/inbox",
//     gradient: "from-green-500 to-green-600",
//   },
//   {
//     id: 3,
//     title: "View Timetable",
//     description: "Check your teaching schedule",
//     icon: HiCalendar,
//     color: "bg-purple-600 hover:bg-purple-700",
//     iconBg: "bg-purple-100",
//     iconColor: "text-purple-600",
//     path: "/professor/timeTable",
//     gradient: "from-purple-500 to-purple-600",
//   },
//   {
//     id: 4,
//     title: "Settings",
//     description: "Manage your account preferences",
//     icon: HiCog,
//     color: "bg-gray-600 hover:bg-gray-700",
//     iconBg: "bg-gray-100",
//     iconColor: "text-gray-600",
//     path: "/professor/settings",
//     gradient: "from-gray-500 to-gray-600",
//   },
// ]

// const teachingTipsAndUpdates = [
//   {
//     id: 1,
//     type: "tip",
//     title: "Engage Your Students",
//     content:
//       "Use interactive teaching methods like polls, Q&A sessions, and group discussions to keep students engaged.",
//     icon: HiUserGroup,
//     color: "text-yellow-600",
//     bgColor: "bg-yellow-50",
//     borderColor: "border-yellow-200",
//   },
//   {
//     id: 2,
//     type: "update",
//     title: "New Grading System",
//     content: "The updated grading portal is now live with enhanced analytics and automated feedback features.",
//     icon: HiNewspaper,
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//   },
//   {
//     id: 3,
//     type: "tip",
//     title: "Effective Feedback",
//     content: "Provide specific, actionable feedback that helps students understand how to improve their work.",
//     icon: HiClipboardList,
//     color: "text-green-600",
//     bgColor: "bg-green-50",
//     borderColor: "border-green-200",
//   },
//   {
//     id: 4,
//     type: "update",
//     title: "Faculty Meeting Reminder",
//     content: "Monthly faculty meeting scheduled for next Friday at 3:00 PM in Conference Room A.",
//     icon: HiInformationCircle,
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//   },
//   {
//     id: 5,
//     type: "tip",
//     title: "Office Hours Optimization",
//     content: "Schedule regular office hours and encourage students to visit for personalized guidance and support.",
//     icon: HiBadgeCheck,
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//   },
// ]

// const floatingElements = [
//   { id: 1, icon: HiSparkles, delay: 0, duration: 3 },
//   { id: 2, icon: HiGlobe, delay: 1, duration: 4 },
//   { id: 3, icon: HiStar, delay: 2, duration: 3.5 },
// ]
// // useEffect(() => {
// //   function sess() {
// //     if (!session) return;
// //     // do something with session
// //   }
// //   sess();
// // }, [session]); // <-- dependencies go here
  
//   // if(status === "loading") return <p>Loading...</p>
// export default function ProfessorDashboardHome() {
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [currentTipIndex, setCurrentTipIndex] = useState(0)
//   const [professorData, setProfessorData] = useState({
//     name: "Professor",
//     teachingCourses: 0,
//     unreadMessages: 0,
//     department: "Computer Science",
//   })
//   const [loading, setLoading] = useState(true)

//   const router = useRouter()
//   const containerRef = useRef(null)
//   const { data: session,status } = useSession()
//   let profEmail
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   })

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
//   const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
//   const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
//   const x = useSpring(0, springConfig)
//   const y = useSpring(0, springConfig)
// useEffect(()=>{
//   if(!session) return
//   profEmail = session.user.email
// },[session])
//   // Fetch courses count
//   const fetchCoursesCount = async () => {
//     if (!profEmail) return 0

//     try {
//       const response = await fetch("/api/professor/getAllCourses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail }),
//       })
//       const data = await response.json()

//       if (data.success) {
//         return data.data.length
//       }
//       return 0
//     } catch (error) {
//       console.error("Error fetching courses:", error)
//       return 0
//     }
//   }

//   // Fetch unread messages count
//   const fetchUnreadCount = async () => {
//     if (!profEmail) return 0

//     try {
//       const response = await fetch("/api/professor/getNotifications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail }),
//       })
//       const data = await response.json()

//       if (data.success) {
//         const unreadCount = data.professor.filter((item) => item.notification && item.isRead !== true).length
//         return unreadCount
//       }
//       return 0
//     } catch (error) {
//       console.error("Error fetching notifications:", error)
//       return 0
//     }
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   useEffect(() => {
//     const tipTimer = setInterval(() => {
//       setCurrentTipIndex((prev) => (prev + 1) % teachingTipsAndUpdates.length)
//     }, 5000) // Change tip every 5 seconds
//     return () => clearInterval(tipTimer)
//   }, [])

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const rect = containerRef.current?.getBoundingClientRect()
//       if (rect) {
//         const centerX = rect.left + rect.width / 2
//         const centerY = rect.top + rect.height / 2
//         x.set((e.clientX - centerX) / 50)
//         y.set((e.clientY - centerY) / 50)
//       }
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [x, y])

//   // Load professor data
//   useEffect(() => {
//     const loadProfessorData = async () => {
//       if (!profEmail) return
//       if(!session) return
//       setLoading(true)

//       try {
//         const [coursesCount, unreadCount] = await Promise.all([fetchCoursesCount(), fetchUnreadCount()])

//         // Get name from profEmail (you can modify this to use session data)
//         const displayName = session.user.username || "Professor"

//         setProfessorData({
//           name: displayName,
//           teachingCourses: coursesCount,
//           unreadMessages: unreadCount,
//           department: "Computer Science", // You can fetch this from API if needed
//         })
//       } catch (error) {
//         console.error("Error loading professor data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProfessorData()
//   }, [profEmail,session])

//   const updatedQuickActions = quickActions.map((action) => {
//     if (action.id === 2) {
//       // Messages & Polls action
//       return {
//         ...action,
//         badge: professorData.unreadMessages > 0 ? professorData.unreadMessages : undefined,
//       }
//     }
//     return action
//   })

//   const getGreeting = () => {
//     const hour = currentTime.getHours()
//     if (hour < 12) return "Good morning"
//     if (hour < 17) return "Good afternoon"
//     return "Good evening"
//   }

//   const handleNavigation = (path) => {
//     router.push(path)
//   }

//   const nextTip = () => {
//     setCurrentTipIndex((prev) => (prev + 1) % teachingTipsAndUpdates.length)
//   }

//   const prevTip = () => {
//     setCurrentTipIndex((prev) => (prev - 1 + teachingTipsAndUpdates.length) % teachingTipsAndUpdates.length)
//   }

//   const currentTip = teachingTipsAndUpdates[currentTipIndex]

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-hidden relative"
//     >
//       {/* Enhanced Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
//           style={{
//             left: mousePosition.x - 128,
//             top: mousePosition.y - 128,
//             x,
//             y,
//           }}
//           transition={{ type: "spring", stiffness: 50, damping: 30 }}
//         />
//         <motion.div
//           className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-sky-500/8 rounded-full blur-2xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500/8 rounded-full blur-3xl"
//           animate={{
//             y: [0, -50, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//         />
//         {/* Floating Elements */}
//         {floatingElements.map((element) => (
//           <motion.div
//             key={element.id}
//             className="absolute hidden sm:block"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{
//               opacity: [0, 0.4, 0],
//               scale: [0, 1, 0],
//               x: [0, 100, -100, 0],
//               y: [0, -100, 100, 0],
//             }}
//             transition={{
//               duration: element.duration,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: element.delay,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${20 + element.id * 25}%`,
//               top: `${30 + element.id * 20}%`,
//             }}
//           >
//             <element.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/30" />
//           </motion.div>
//         ))}
//       </div>

//       <motion.div className="relative z-10 p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-screen" style={{ y: backgroundY }}>
//         <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//           {/* Enhanced Welcome Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             style={{ scale: scaleProgress, opacity: opacityProgress }}
//             className="text-center relative px-2 sm:px-4"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="inline-flex items-center px-3 py-2 sm:px-4 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-600 text-xs sm:text-sm mb-3 sm:mb-4 border border-blue-200/50"
//             >
//               <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-pulse" />
//               Professor Dashboard
//             </motion.div>
//             <motion.h1
//               className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 px-2"
//               style={{ y: textY }}
//               animate={{
//                 backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//               }}
//               transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//             >
//               <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent bg-300% animate-gradient">
//                 {getGreeting()}, {professorData.name}! 👨‍🏫
//               </span>
//             </motion.h1>
//             <motion.p
//               className="text-gray-600 text-base sm:text-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//             >
//               Welcome to your Teaching Dashboard
//             </motion.p>
//             <motion.p
//               className="text-gray-500 text-xs sm:text-sm mt-1"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7, duration: 0.8 }}
//             >
//               {professorData.department} Department •{" "}
//               {currentTime.toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </motion.p>
//           </motion.div>

//           {/* Enhanced Quick Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0"
//           >
//             {[
//               {
//                 label: "Teaching Courses",
//                 value: professorData.teachingCourses,
//                 icon: HiAcademicCap,
//                 color: "blue",
//                 trend: "Active this semester",
//               },
//               {
//                 label: "Unread Messages",
//                 value: professorData.unreadMessages,
//                 icon: HiOutlineMail,
//                 color: "orange",
//                 trend: professorData.unreadMessages > 0 ? "Needs attention" : "All caught up",
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
//                 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//                 transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
//                 whileHover={{
//                   scale: 1.02,
//                   rotateY: 2,
//                   transition: { duration: 0.2 },
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                   <CardContent className="p-4 sm:p-6 relative z-10">
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 min-w-0">
//                         <motion.p
//                           className="text-xs sm:text-sm text-gray-600 mb-1 truncate"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.6 + index * 0.1 }}
//                         >
//                           {stat.label}
//                         </motion.p>
//                         <motion.p
//                           className="text-2xl sm:text-3xl font-bold text-gray-800"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             delay: 0.8 + index * 0.1,
//                             type: "spring",
//                             stiffness: 200,
//                             damping: 10,
//                           }}
//                         >
//                           {stat.value}
//                         </motion.p>
//                         <motion.p
//                           className={`text-xs sm:text-sm flex items-center mt-1 ${
//                             stat.color === "blue"
//                               ? "text-green-600"
//                               : stat.value > 0
//                                 ? "text-orange-600"
//                                 : "text-green-600"
//                           }`}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 1 + index * 0.1 }}
//                         >
//                           <HiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
//                           <span className="truncate">{stat.trend}</span>
//                         </motion.p>
//                       </div>
//                       <motion.div
//                         className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ml-3 flex-shrink-0 ${
//                           stat.color === "blue" ? "bg-blue-100" : "bg-orange-100"
//                         }`}
//                         whileHover={{ scale: 1.1 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <stat.icon
//                           className={`h-6 w-6 sm:h-8 sm:w-8 ${
//                             stat.color === "blue" ? "text-blue-600" : "text-orange-600"
//                           }`}
//                         />
//                       </motion.div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Enhanced Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 80 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
//               <CardContent className="p-4 sm:p-6 relative z-10">
//                 <motion.h3
//                   className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6, duration: 0.8 }}
//                 >
//                   Quick Actions
//                 </motion.h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                   {updatedQuickActions.map((action, index) => (
//                     <motion.div
//                       key={action.id}
//                       initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       transition={{
//                         delay: 0.8 + index * 0.1,
//                         duration: 0.6,
//                         type: "spring",
//                         stiffness: 100,
//                       }}
//                       whileHover={{
//                         scale: 1.02,
//                         y: -2,
//                         transition: { duration: 0.2 },
//                       }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Button
//                         onClick={() => handleNavigation(action.path)}
//                         className={`w-full h-20 sm:h-24 ${action.color} text-white font-semibold transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl text-left`}
//                       >
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//                         <div className="flex items-center justify-between w-full relative z-10 px-1">
//                           <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
//                             <div className={`p-2 sm:p-3 ${action.iconBg} rounded-lg sm:rounded-xl flex-shrink-0`}>
//                               <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor}`} />
//                             </div>
//                             <div className="text-left flex-1 min-w-0">
//                               <p className="font-semibold text-white text-sm sm:text-base truncate">{action.title}</p>
//                               <p className="text-xs sm:text-sm text-white/80 truncate">{action.description}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
//                             {action.badge && (
//                               <motion.span
//                                 className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full"
//                                 animate={{ scale: [1, 1.1, 1] }}
//                                 transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                               >
//                                 {action.badge}
//                               </motion.span>
//                             )}
//                             <motion.div
//                               animate={{ x: [0, 3, 0] }}
//                               transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//                             >
//                               <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
//                             </motion.div>
//                           </div>
//                         </div>
//                       </Button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Teaching Tips & Faculty Updates Carousel */}
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
//               <CardContent className="p-4 sm:p-6 relative z-10">
//                 <motion.div
//                   className="flex items-center justify-between mb-4 sm:mb-6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1, duration: 0.8 }}
//                 >
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
//                     <HiClock className="h-5 w-5 mr-2 text-indigo-600" />
//                     Teaching Tips & Updates
//                   </h3>
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={prevTip}
//                       className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
//                     >
//                       <HiChevronLeft className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={nextTip}
//                       className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
//                     >
//                       <HiChevronRight className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   key={currentTip.id}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.5 }}
//                   className={`p-4 sm:p-6 rounded-xl border-2 ${currentTip.borderColor} ${currentTip.bgColor} relative overflow-hidden group`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                   <div className="flex items-start space-x-4 relative z-10">
//                     <motion.div
//                       className="flex-shrink-0 p-3 bg-white/70 rounded-xl"
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <currentTip.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${currentTip.color}`} />
//                     </motion.div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center space-x-2 mb-2">
//                         <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{currentTip.title}</h4>
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full font-medium ${
//                             currentTip.type === "tip" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
//                           }`}
//                         >
//                           {currentTip.type === "tip" ? "💡 Tip" : "📢 Update"}
//                         </span>
//                       </div>
//                       <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{currentTip.content}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//                 {/* Progress Indicators */}
//                 <div className="flex justify-center mt-4 space-x-2">
//                   {teachingTipsAndUpdates.map((_, index) => (
//                     <motion.div
//                       key={index}
//                       className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                         index === currentTipIndex ? "bg-indigo-600 w-6" : "bg-gray-300"
//                       }`}
//                       whileHover={{ scale: 1.2 }}
//                       onClick={() => setCurrentTipIndex(index)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Enhanced Professor Dashboard Info */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
//               <CardContent className="p-4 sm:p-6 text-center relative z-10">
//                 <motion.h3
//                   className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 }}
//                 >
//                   About Professor Dashboard
//                 </motion.h3>
//                 <motion.p
//                   className="text-sm sm:text-base text-gray-600 leading-relaxed px-2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.4 }}
//                 >
//                   Your comprehensive teaching platform for managing courses, connecting with students, and enhancing the
//                   educational experience through effective communication and organization.
//                 </motion.p>
//                 <motion.div
//                   className="flex justify-center mt-3 sm:mt-4"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
//                 >
//                   <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                     >
//                       <HiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
//                     </motion.div>
//                     <span className="text-center">Empowering educators, inspiring students</span>
//                   </div>
//                 </motion.div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Footer spacing */}
//           <div className="h-4 sm:h-8"></div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }



// "use client"
// import React from "react"
// import { useState, useEffect, useRef } from "react"
// import { motion, useScroll, useTransform, useSpring } from "framer-motion"
// import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"
// import {
//   HiAcademicCap,
//   HiCalendar,
//   HiOutlineMail,
//   HiCog,
//   HiChevronRight,
//   HiStar,
//   HiTrendingUp,
//   HiSparkles,
//   HiGlobe,
//   HiInformationCircle,
//   HiClock,
//   HiChevronLeft,
//   HiChatAlt,
//   HiExclamationCircle,
//   HiMail,
// } from "react-icons/hi"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// const quickActions = [
//   {
//     id: 1,
//     title: "View All Courses",
//     description: "Manage your teaching courses",
//     icon: HiAcademicCap,
//     color: "bg-blue-600 hover:bg-blue-700",
//     iconBg: "bg-blue-100",
//     iconColor: "text-blue-600",
//     path: "/professor/courses",
//     gradient: "from-blue-500 to-blue-600",
//   },
//   {
//     id: 2,
//     title: "Messages & Polls",
//     description: "Send messages or create polls",
//     icon: HiChatAlt,
//     color: "bg-green-600 hover:bg-green-700",
//     iconBg: "bg-green-100",
//     iconColor: "text-green-600",
//     path: "/professor/inbox",
//     gradient: "from-green-500 to-green-600",
//   },
//   {
//     id: 3,
//     title: "View Timetable",
//     description: "Check your teaching schedule",
//     icon: HiCalendar,
//     color: "bg-purple-600 hover:bg-purple-700",
//     iconBg: "bg-purple-100",
//     iconColor: "text-purple-600",
//     path: "/professor/timeTable",
//     gradient: "from-purple-500 to-purple-600",
//   },
//   {
//     id: 4,
//     title: "Settings",
//     description: "Manage your account preferences",
//     icon: HiCog,
//     color: "bg-gray-600 hover:bg-gray-700",
//     iconBg: "bg-gray-100",
//     iconColor: "text-gray-600",
//     path: "/professor/settings",
//     gradient: "from-gray-500 to-gray-600",
//   },
// ]

// const floatingElements = [
//   { id: 1, icon: HiSparkles, delay: 0, duration: 3 },
//   { id: 2, icon: HiGlobe, delay: 1, duration: 4 },
//   { id: 3, icon: HiStar, delay: 2, duration: 3.5 },
// ]

// export default function ProfessorDashboardHome() {
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [currentTipIndex, setCurrentTipIndex] = useState(0)
//   const [professorData, setProfessorData] = useState({
//     name: "Professor",
//     teachingCourses: 0,
//     unreadMessages: 0,
//     department: "Computer Science",
//   })
//   const [loading, setLoading] = useState(true)
//   const [latestNotifications, setLatestNotifications] = useState([])
//   const router = useRouter()
//   const containerRef = useRef(null)
//   const { data: session, status } = useSession()
//   let profEmail

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   })

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
//   const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
//   const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
//   const x = useSpring(0, springConfig)
//   const y = useSpring(0, springConfig)

//   useEffect(() => {
//     if (!session) return
//     profEmail = session.user.email
//   }, [session])

//   // Fetch latest notifications for teaching tips
//   const fetchLatestNotifications = async () => {
//     if (!profEmail) return []
//     try {
//       const response = await fetch("/api/professor/getNotifications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         // Transform and get latest 5 notifications
//         const transformedNotifications = data.professor
//           .filter((item) => item.notification)
//           .map((item) => {
//             const notification = item.notification
//             const isPoll = notification.type === "poll"
//             const isSent = notification.prof && notification.prof.email === session.user.email

//             if (isPoll) {
//               return {
//                 id: item._id,
//                 type: "update",
//                 title: `Poll: ${notification.course ? notification.course.title : "Course Poll"}`,
//                 content: notification.message.reason || "New poll created for your course",
//                 icon: HiExclamationCircle,
//                 color: "text-purple-600",
//                 bgColor: "bg-purple-50",
//                 borderColor: "border-purple-200",
//                 createdAt: notification.createdAt,
//                 direction: isSent ? "sent" : "received",
//               }
//             } else {
//               return {
//                 id: item._id,
//                 type: "update",
//                 title: notification.messageTitle || "New Message",
//                 content:
//                   typeof notification.message === "string"
//                     ? notification.message.substring(0, 120) + (notification.message.length > 120 ? "..." : "")
//                     : "New message received",
//                 icon: HiMail,
//                 color: "text-blue-600",
//                 bgColor: "bg-blue-50",
//                 borderColor: "border-blue-200",
//                 createdAt: notification.createdAt,
//                 direction: isSent ? "sent" : "received",
//               }
//             }
//           })
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//           .slice(0, 5)

//         return transformedNotifications
//       }
//       return []
//     } catch (error) {
//       console.error("Error fetching notifications:", error)
//       return []
//     }
//   }

//   // Fetch courses count
//   const fetchCoursesCount = async () => {
//     if (!profEmail) return 0
//     try {
//       const response = await fetch("/api/professor/getAllCourses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         return data.data.length
//       }
//       return 0
//     } catch (error) {
//       console.error("Error fetching courses:", error)
//       return 0
//     }
//   }

//   // Fetch unread messages count
//   const fetchUnreadCount = async () => {
//     if (!profEmail) return 0
//     try {
//       const response = await fetch("/api/professor/getNotifications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ profEmail }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         const unreadCount = data.professor.filter((item) => item.notification && item.isRead !== true).length
//         return unreadCount
//       }
//       return 0
//     } catch (error) {
//       console.error("Error fetching notifications:", error)
//       return 0
//     }
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   useEffect(() => {
//     if (latestNotifications.length > 0) {
//       const tipTimer = setInterval(() => {
//         setCurrentTipIndex((prev) => (prev + 1) % latestNotifications.length)
//       }, 5000) // Change tip every 5 seconds
//       return () => clearInterval(tipTimer)
//     }
//   }, [latestNotifications])

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const rect = containerRef.current?.getBoundingClientRect()
//       if (rect) {
//         const centerX = rect.left + rect.width / 2
//         const centerY = rect.top + rect.height / 2
//         x.set((e.clientX - centerX) / 50)
//         y.set((e.clientY - centerY) / 50)
//       }
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [x, y])

//   // Load professor data
//   useEffect(() => {
//     const loadProfessorData = async () => {
//       if (!profEmail) return
//       if (!session) return
//       setLoading(true)
//       try {
//         const [coursesCount, unreadCount, notifications] = await Promise.all([
//           fetchCoursesCount(),
//           fetchUnreadCount(),
//           fetchLatestNotifications(),
//         ])

//         // Get name from session
//         const displayName = session.user.username || "Professor"
//         setProfessorData({
//           name: displayName,
//           teachingCourses: coursesCount,
//           unreadMessages: unreadCount,
//           department: "Computer Science",
//         })

//         setLatestNotifications(notifications)
//       } catch (error) {
//         console.error("Error loading professor data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProfessorData()
//   }, [profEmail, session])

//   const updatedQuickActions = quickActions.map((action) => {
//     if (action.id === 2) {
//       // Messages & Polls action
//       return {
//         ...action,
//         badge: professorData.unreadMessages > 0 ? professorData.unreadMessages : undefined,
//       }
//     }
//     return action
//   })

//   const getGreeting = () => {
//     const hour = currentTime.getHours()
//     if (hour < 12) return "Good morning"
//     if (hour < 17) return "Good afternoon"
//     return "Good evening"
//   }

//   const handleNavigation = (path) => {
//     router.push(path)
//   }

//   const nextTip = () => {
//     if (latestNotifications.length > 0) {
//       setCurrentTipIndex((prev) => (prev + 1) % latestNotifications.length)
//     }
//   }

//   const prevTip = () => {
//     if (latestNotifications.length > 0) {
//       setCurrentTipIndex((prev) => (prev - 1 + latestNotifications.length) % latestNotifications.length)
//     }
//   }

//   const getRelativeTime = (date) => {
//     const now = new Date()
//     const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
//     if (diffInHours < 1) return "Just now"
//     if (diffInHours < 24) return `${diffInHours}h ago`
//     const diffInDays = Math.floor(diffInHours / 24)
//     if (diffInDays < 7) return `${diffInDays}d ago`
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const currentTip = latestNotifications.length > 0 ? latestNotifications[currentTipIndex] : null

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-hidden relative"
//     >
//       {/* Enhanced Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
//           style={{
//             left: mousePosition.x - 128,
//             top: mousePosition.y - 128,
//             x,
//             y,
//           }}
//           transition={{ type: "spring", stiffness: 50, damping: 30 }}
//         />
//         <motion.div
//           className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-sky-500/8 rounded-full blur-2xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500/8 rounded-full blur-3xl"
//           animate={{
//             y: [0, -50, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//         />
//         {/* Floating Elements */}
//         {floatingElements.map((element) => (
//           <motion.div
//             key={element.id}
//             className="absolute hidden sm:block"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{
//               opacity: [0, 0.4, 0],
//               scale: [0, 1, 0],
//               x: [0, 100, -100, 0],
//               y: [0, -100, 100, 0],
//             }}
//             transition={{
//               duration: element.duration,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: element.delay,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${20 + element.id * 25}%`,
//               top: `${30 + element.id * 20}%`,
//             }}
//           >
//             <element.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/30" />
//           </motion.div>
//         ))}
//       </div>

//       <motion.div className="relative z-10 p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-screen" style={{ y: backgroundY }}>
//         <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//           {/* Enhanced Welcome Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             style={{ scale: scaleProgress, opacity: opacityProgress }}
//             className="text-center relative px-2 sm:px-4"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="inline-flex items-center px-3 py-2 sm:px-4 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-600 text-xs sm:text-sm mb-3 sm:mb-4 border border-blue-200/50"
//             >
//               <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-pulse" />
//               Professor Dashboard
//             </motion.div>
//             <motion.h1
//               className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 px-2"
//               style={{ y: textY }}
//               animate={{
//                 backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//               }}
//               transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//             >
//               <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent bg-300% animate-gradient">
//                 {getGreeting()}, {professorData.name}! 👨‍🏫
//               </span>
//             </motion.h1>
//             <motion.p
//               className="text-gray-600 text-base sm:text-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//             >
//               Welcome to your Teaching Dashboard
//             </motion.p>
//             <motion.p
//               className="text-gray-500 text-xs sm:text-sm mt-1"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7, duration: 0.8 }}
//             >
//               {professorData.department} Department •{" "}
//               {currentTime.toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </motion.p>
//           </motion.div>

//           {/* Enhanced Quick Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0"
//           >
//             {[
//               {
//                 label: "Teaching Courses",
//                 value: professorData.teachingCourses,
//                 icon: HiAcademicCap,
//                 color: "blue",
//                 trend: "Active this semester",
//               },
//               {
//                 label: "Unread Messages",
//                 value: professorData.unreadMessages,
//                 icon: HiOutlineMail,
//                 color: "orange",
//                 trend: professorData.unreadMessages > 0 ? "Needs attention" : "All caught up",
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
//                 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//                 transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
//                 whileHover={{
//                   scale: 1.02,
//                   rotateY: 2,
//                   transition: { duration: 0.2 },
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                   <CardContent className="p-4 sm:p-6 relative z-10">
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 min-w-0">
//                         <motion.p
//                           className="text-xs sm:text-sm text-gray-600 mb-1 truncate"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.6 + index * 0.1 }}
//                         >
//                           {stat.label}
//                         </motion.p>
//                         <motion.p
//                           className="text-2xl sm:text-3xl font-bold text-gray-800"
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             delay: 0.8 + index * 0.1,
//                             type: "spring",
//                             stiffness: 200,
//                             damping: 10,
//                           }}
//                         >
//                           {stat.value}
//                         </motion.p>
//                         <motion.p
//                           className={`text-xs sm:text-sm flex items-center mt-1 ${
//                             stat.color === "blue"
//                               ? "text-green-600"
//                               : stat.value > 0
//                                 ? "text-orange-600"
//                                 : "text-green-600"
//                           }`}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 1 + index * 0.1 }}
//                         >
//                           <HiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
//                           <span className="truncate">{stat.trend}</span>
//                         </motion.p>
//                       </div>
//                       <motion.div
//                         className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ml-3 flex-shrink-0 ${
//                           stat.color === "blue" ? "bg-blue-100" : "bg-orange-100"
//                         }`}
//                         whileHover={{ scale: 1.1 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <stat.icon
//                           className={`h-6 w-6 sm:h-8 sm:w-8 ${
//                             stat.color === "blue" ? "text-blue-600" : "text-orange-600"
//                           }`}
//                         />
//                       </motion.div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Enhanced Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 80 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
//               <CardContent className="p-4 sm:p-6 relative z-10">
//                 <motion.h3
//                   className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6, duration: 0.8 }}
//                 >
//                   Quick Actions
//                 </motion.h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                   {updatedQuickActions.map((action, index) => (
//                     <motion.div
//                       key={action.id}
//                       initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       transition={{
//                         delay: 0.8 + index * 0.1,
//                         duration: 0.6,
//                         type: "spring",
//                         stiffness: 100,
//                       }}
//                       whileHover={{
//                         scale: 1.02,
//                         y: -2,
//                         transition: { duration: 0.2 },
//                       }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Button
//                         onClick={() => handleNavigation(action.path)}
//                         className={`w-full h-20 sm:h-24 ${action.color} text-white font-semibold transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl text-left`}
//                       >
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//                         <div className="flex items-center justify-between w-full relative z-10 px-1">
//                           <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
//                             <div className={`p-2 sm:p-3 ${action.iconBg} rounded-lg sm:rounded-xl flex-shrink-0`}>
//                               <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor}`} />
//                             </div>
//                             <div className="text-left flex-1 min-w-0">
//                               <p className="font-semibold text-white text-sm sm:text-base truncate">{action.title}</p>
//                               <p className="text-xs sm:text-sm text-white/80 truncate">{action.description}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
//                             {action.badge && (
//                               <motion.span
//                                 className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full"
//                                 animate={{ scale: [1, 1.1, 1] }}
//                                 transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                               >
//                                 {action.badge}
//                               </motion.span>
//                             )}
//                             <motion.div
//                               animate={{ x: [0, 3, 0] }}
//                               transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//                             >
//                               <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
//                             </motion.div>
//                           </div>
//                         </div>
//                       </Button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Latest Notifications Carousel */}
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
//               <CardContent className="p-4 sm:p-6 relative z-10">
//                 <motion.div
//                   className="flex items-center justify-between mb-4 sm:mb-6"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1, duration: 0.8 }}
//                 >
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
//                     <HiClock className="h-5 w-5 mr-2 text-indigo-600" />
//                     Latest Notifications
//                   </h3>
//                   {latestNotifications.length > 1 && (
//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={prevTip}
//                         className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
//                       >
//                         <HiChevronLeft className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={nextTip}
//                         className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
//                       >
//                         <HiChevronRight className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </motion.div>

//                 {currentTip ? (
//                   <motion.div
//                     key={currentTip.id}
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     transition={{ duration: 0.5 }}
//                     className={`p-4 sm:p-6 rounded-xl border-2 ${currentTip.borderColor} ${currentTip.bgColor} relative overflow-hidden group`}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                     <div className="flex items-start space-x-4 relative z-10">
//                       <motion.div
//                         className="flex-shrink-0 p-3 bg-white/70 rounded-xl"
//                         whileHover={{ scale: 1.1, rotate: 5 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <currentTip.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${currentTip.color}`} />
//                       </motion.div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{currentTip.title}</h4>
//                           <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
//                             📢 {currentTip.direction === "sent" ? "Sent" : "Received"}
//                           </span>
//                           <span className="text-xs text-gray-500">{getRelativeTime(currentTip.createdAt)}</span>
//                         </div>
//                         <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{currentTip.content}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <div className="p-4 sm:p-6 rounded-xl border-2 border-gray-200 bg-gray-50 text-center">
//                     <HiInformationCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">No recent notifications</p>
//                     <p className="text-xs text-gray-500 mt-1">Check back later for updates</p>
//                   </div>
//                 )}

//                 {/* Progress Indicators */}
//                 {latestNotifications.length > 1 && (
//                   <div className="flex justify-center mt-4 space-x-2">
//                     {latestNotifications.map((_, index) => (
//                       <motion.div
//                         key={index}
//                         className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                           index === currentTipIndex ? "bg-indigo-600 w-6" : "bg-gray-300"
//                         }`}
//                         whileHover={{ scale: 1.2 }}
//                         onClick={() => setCurrentTipIndex(index)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Enhanced Professor Dashboard Info */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
//             className="px-2 sm:px-0"
//           >
//             <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
//               <CardContent className="p-4 sm:p-6 text-center relative z-10">
//                 <motion.h3
//                   className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 }}
//                 >
//                   About Professor Dashboard
//                 </motion.h3>
//                 <motion.p
//                   className="text-sm sm:text-base text-gray-600 leading-relaxed px-2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.4 }}
//                 >
//                   Your comprehensive teaching platform for managing courses, connecting with students, and enhancing the
//                   educational experience through effective communication and organization.
//                 </motion.p>
//                 <motion.div
//                   className="flex justify-center mt-3 sm:mt-4"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
//                 >
//                   <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                     >
//                       <HiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
//                     </motion.div>
//                     <span className="text-center">Empowering educators, inspiring students</span>
//                   </div>
//                 </motion.div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Footer spacing */}
//           <div className="h-4 sm:h-8"></div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }


"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  HiAcademicCap,
  HiCalendar,
  HiOutlineMail,
  HiCog,
  HiChevronRight,
  HiStar,
  HiTrendingUp,
  HiSparkles,
  HiGlobe,
  HiInformationCircle,
  HiClock,
  HiChevronLeft,
  HiChatAlt,
  HiExclamationCircle,
  HiMail,
} from "react-icons/hi"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    id: 1,
    title: "View All Courses",
    description: "Manage your teaching courses",
    icon: HiAcademicCap,
    color: "bg-blue-600 hover:bg-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    path: "/professor/courses",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Messages & Polls",
    description: "Send messages or create polls",
    icon: HiChatAlt,
    color: "bg-green-600 hover:bg-green-700",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    path: "/professor/inbox",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "View Timetable",
    description: "Check your teaching schedule",
    icon: HiCalendar,
    color: "bg-purple-600 hover:bg-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    path: "/professor/timeTable",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Settings",
    description: "Manage your account preferences",
    icon: HiCog,
    color: "bg-gray-600 hover:bg-gray-700",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    path: "/professor/settings",
    gradient: "from-gray-500 to-gray-600",
  },
]

const floatingElements = [
  { id: 1, icon: HiSparkles, delay: 0, duration: 3 },
  { id: 2, icon: HiGlobe, delay: 1, duration: 4 },
  { id: 3, icon: HiStar, delay: 2, duration: 3.5 },
]

export default function ProfessorDashboardHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [professorData, setProfessorData] = useState({
    name: "Professor",
    teachingCourses: 0,
    unreadMessages: 0,
    department: "Computer Science",
  })
  const [loading, setLoading] = useState(true)
  const [latestNotifications, setLatestNotifications] = useState([])
  const router = useRouter()
  const containerRef = useRef(null)
  const { data: session, status } = useSession()
  let profEmail

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if (!session) return
    profEmail = session.user.email
  }, [session])

  // Fetch latest notifications for teaching tips
  const fetchLatestNotifications = async () => {
    if (!profEmail) return []
    try {
      const response = await fetch("/api/professor/getNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profEmail }),
      })
      const data = await response.json()
      if (data.success) {
        // Transform and get latest 5 notifications
        const transformedNotifications = data.professor
          .filter((item) => item.notification)
          .map((item) => {
            const notification = item.notification
            const isPoll = notification.type === "poll"
            const isSent = notification.prof && notification.prof.email === session.user.email
            if (isPoll) {
              const courseTitle = notification.course?.title || "Course Poll"
              const courseCode = notification.course?.courseCode || ""
              const reason = notification.message?.reason || "New poll created for your course"

              return {
                id: item._id,
                type: "update",
                title: `Poll: ${courseTitle}`,
                content: reason,
                icon: HiExclamationCircle,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                createdAt: notification.createdAt,
                direction: isSent ? "sent" : "received",
                searchTerm: courseTitle,
                courseCode: courseCode,
              }
            } else {
              const messageTitle = notification.messageTitle || "New Message"
              const messageContent =
                typeof notification.message === "string"
                  ? notification.message.substring(0, 120) + (notification.message.length > 120 ? "..." : "")
                  : "New message received"

              return {
                id: item._id,
                type: "update",
                title: messageTitle,
                content: messageContent,
                icon: HiMail,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                createdAt: notification.createdAt,
                direction: isSent ? "sent" : "received",
                searchTerm: messageTitle,
                courseCode: notification.course?.courseCode || "",
              }
            }
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
        return transformedNotifications
      }
      return []
    } catch (error) {
      console.error("Error fetching notifications:", error)
      return []
    }
  }

  // Fetch courses count
  const fetchCoursesCount = async () => {
    if (!profEmail) return 0
    try {
      const response = await fetch("/api/professor/getAllCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profEmail }),
      })
      const data = await response.json()
      if (data.success) {
        return data.data.length
      }
      return 0
    } catch (error) {
      console.error("Error fetching courses:", error)
      return 0
    }
  }

  // Fetch unread messages count
  const fetchUnreadCount = async () => {
    if (!profEmail) return 0
    try {
      const response = await fetch("/api/professor/getNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profEmail }),
      })
      const data = await response.json()
      if (data.success) {
        const unreadCount = data.professor.filter((item) => item.notification && item.isRead !== true).length
        return unreadCount
      }
      return 0
    } catch (error) {
      console.error("Error fetching notifications:", error)
      return 0
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (latestNotifications.length > 0) {
      const tipTimer = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % latestNotifications.length)
      }, 5000) // Change tip every 5 seconds
      return () => clearInterval(tipTimer)
    }
  }, [latestNotifications])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) / 50)
        y.set((e.clientY - centerY) / 50)
      }
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  // Load professor data
  useEffect(() => {
    const loadProfessorData = async () => {
      if (!profEmail) return
      if (!session) return
      setLoading(true)
      try {
        const [coursesCount, unreadCount, notifications] = await Promise.all([
          fetchCoursesCount(),
          fetchUnreadCount(),
          fetchLatestNotifications(),
        ])
        // Get name from session
        const displayName = session.user.username || "Professor"
        setProfessorData({
          name: displayName,
          teachingCourses: coursesCount,
          unreadMessages: unreadCount,
          department: "Computer Science",
        })
        setLatestNotifications(notifications)
      } catch (error) {
        console.error("Error loading professor data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProfessorData()
  }, [profEmail, session])

  const updatedQuickActions = quickActions.map((action) => {
    if (action.id === 2) {
      // Messages & Polls action
      return {
        ...action,
        badge: professorData.unreadMessages > 0 ? professorData.unreadMessages : undefined,
      }
    }
    return action
  })

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleNavigation = (path) => {
    router.push(path)
  }

  // Handle notification click - redirect to inbox with search term
  const handleNotificationClick = (notification) => {
    const searchTerm = notification.searchTerm || notification.title || ""
    if (searchTerm) {
      router.push(`/professor/inbox?search=${encodeURIComponent(searchTerm)}`)
    } else {
      router.push("/professor/inbox")
    }
  }

  const nextTip = () => {
    if (latestNotifications.length > 0) {
      setCurrentTipIndex((prev) => (prev + 1) % latestNotifications.length)
    }
  }

  const prevTip = () => {
    if (latestNotifications.length > 0) {
      setCurrentTipIndex((prev) => (prev - 1 + latestNotifications.length) % latestNotifications.length)
    }
  }

  const getRelativeTime = (date) => {
    const now = new Date()
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const currentTip = latestNotifications.length > 0 ? latestNotifications[currentTipIndex] : null

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-hidden relative"
    >
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            x,
            y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-sky-500/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute hidden sm:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + element.id * 25}%`,
              top: `${30 + element.id * 20}%`,
            }}
          >
            <element.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/30" />
          </motion.div>
        ))}
      </div>

      <motion.div className="relative z-10 p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-screen" style={{ y: backgroundY }}>
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Enhanced Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className="text-center relative px-2 sm:px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center px-3 py-2 sm:px-4 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-600 text-xs sm:text-sm mb-3 sm:mb-4 border border-blue-200/50"
            >
              <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-pulse" />
              Professor Dashboard
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 px-2"
              style={{ y: textY }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent bg-300% animate-gradient">
                {getGreeting()}, {professorData.name}! 
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-600 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to your Teaching Dashboard
            </motion.p>
            <motion.p
              className="text-gray-500 text-xs sm:text-sm mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {professorData.department} Department •{" "}
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0"
          >
            {[
              {
                label: "Teaching Courses",
                value: professorData.teachingCourses,
                icon: HiAcademicCap,
                color: "blue",
                trend: "Active this semester",
              },
              {
                label: "Unread Messages",
                value: professorData.unreadMessages,
                icon: HiOutlineMail,
                color: "orange",
                trend: professorData.unreadMessages > 0 ? "Needs attention" : "All caught up",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <CardContent className="p-4 sm:p-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <motion.p
                          className="text-xs sm:text-sm text-gray-600 mb-1 truncate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {stat.label}
                        </motion.p>
                        <motion.p
                          className="text-2xl sm:text-3xl font-bold text-gray-800"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        >
                          {stat.value}
                        </motion.p>
                        <motion.p
                          className={`text-xs sm:text-sm flex items-center mt-1 ${
                            stat.color === "blue"
                              ? "text-green-600"
                              : stat.value > 0
                                ? "text-orange-600"
                                : "text-green-600"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                        >
                          <HiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{stat.trend}</span>
                        </motion.p>
                      </div>
                      <motion.div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ml-3 flex-shrink-0 ${
                          stat.color === "blue" ? "bg-blue-100" : "bg-orange-100"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <stat.icon
                          className={`h-6 w-6 sm:h-8 sm:w-8 ${
                            stat.color === "blue" ? "text-blue-600" : "text-orange-600"
                          }`}
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="px-2 sm:px-0"
          >
            <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
              <CardContent className="p-4 sm:p-6 relative z-10">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Quick Actions
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {updatedQuickActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleNavigation(action.path)}
                        className={`w-full h-20 sm:h-24 ${action.color} text-white font-semibold transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl text-left`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <div className="flex items-center justify-between w-full relative z-10 px-1">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                            <div className={`p-2 sm:p-3 ${action.iconBg} rounded-lg sm:rounded-xl flex-shrink-0`}>
                              <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor}`} />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-semibold text-white text-sm sm:text-base truncate">{action.title}</p>
                              <p className="text-xs sm:text-sm text-white/80 truncate">{action.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            {action.badge && (
                              <motion.span
                                className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                {action.badge}
                              </motion.span>
                            )}
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                            </motion.div>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Latest Notifications Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="px-2 sm:px-0"
          >
            <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
              <CardContent className="p-4 sm:p-6 relative z-10">
                <motion.div
                  className="flex items-center justify-between mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                    <HiClock className="h-5 w-5 mr-2 text-indigo-600" />
                    Latest Notifications
                  </h3>
                  {latestNotifications.length > 1 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevTip}
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                      >
                        <HiChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextTip}
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                      >
                        <HiChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </motion.div>
                {currentTip ? (
                  <motion.div
                    key={currentTip.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 sm:p-6 rounded-xl border-2 ${currentTip.borderColor} ${currentTip.bgColor} relative overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300`}
                    onClick={() => handleNotificationClick(currentTip)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-start space-x-4 relative z-10">
                      <motion.div
                        className="flex-shrink-0 p-3 bg-white/70 rounded-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <currentTip.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${currentTip.color}`} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{currentTip.title}</h4>
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                            📢 {currentTip.direction === "sent" ? "Sent" : "Received"}
                          </span>
                          <span className="text-xs text-gray-500">{getRelativeTime(currentTip.createdAt)}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{currentTip.content}</p>
                        <div className="mt-2 text-xs text-blue-600 font-medium flex items-center">
                          <span>Click to view in inbox</span>
                          <HiChevronRight className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 sm:p-6 rounded-xl border-2 border-gray-200 bg-gray-50 text-center">
                    <HiInformationCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No recent notifications</p>
                    <p className="text-xs text-gray-500 mt-1">Check back later for updates</p>
                  </div>
                )}
                {/* Progress Indicators */}
                {latestNotifications.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {latestNotifications.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentTipIndex ? "bg-indigo-600 w-6" : "bg-gray-300"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentTipIndex(index)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Professor Dashboard Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="px-2 sm:px-0"
          >
            <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
              <CardContent className="p-4 sm:p-6 text-center relative z-10">
                <motion.h3
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  About Professor Dashboard
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-gray-600 leading-relaxed px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  Your comprehensive teaching platform for managing courses, connecting with students, and enhancing the
                  educational experience through effective communication and organization.
                </motion.p>
                <motion.div
                  className="flex justify-center mt-3 sm:mt-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <HiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                    </motion.div>
                    <span className="text-center">Empowering educators, inspiring students</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer spacing */}
          <div className="h-4 sm:h-8"></div>
        </div>
      </motion.div>
    </div>
  )
}

