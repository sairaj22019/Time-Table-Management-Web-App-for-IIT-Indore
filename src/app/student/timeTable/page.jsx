// "use client"
// import { useState, useRef, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import {
//   FileImage,
//   FileText,
//   Clock,
//   MapPin,
//   User,
//   BookOpen,
//   Calendar,
//   GraduationCap,
//   ChevronDown,
//   ChevronUp,
//   AlertCircle,
//   Loader2,
// } from "lucide-react"
// import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
// import { useSession } from "next-auth/react"

// const timeSlots = [
//   { label: "8:30 - 9:25", start: "08:30", end: "09:25", utcHour: 3 },
//   { label: "9:30 - 10:25", start: "09:30", end: "10:25", utcHour: 4 },
//   { label: "10:30 - 11:25", start: "10:30", end: "11:25", utcHour: 5 },
//   { label: "11:30 - 12:25", start: "11:30", end: "12:25", utcHour: 6 },
//   { label: "12:30 - 1:25", start: "12:30", end: "13:25", utcHour: 7 },
//   { label: "1:30 - 2:25", start: "13:30", end: "14:25", utcHour: 8 },
//   { label: "2:30 - 3:25", start: "14:30", end: "15:25", utcHour: 9 },
//   { label: "3:30 - 4:25", start: "15:30", end: "16:25", utcHour: 10 },
//   { label: "4:30 - 5:25", start: "16:30", end: "17:25", utcHour: 11 },
//   { label: "5:30 - 6:25", start: "17:30", end: "18:25", utcHour: 12 },
// ]

// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// // Course overview color palette matching the image
// const courseOverviewColors = [
//   { bg: "from-blue-100 to-blue-200", border: "border-blue-200", text: "text-blue-700" },
//   { bg: "from-purple-100 to-purple-200", border: "border-purple-200", text: "text-purple-700" },
//   { bg: "from-green-100 to-green-200", border: "border-green-200", text: "text-green-700" },
//   { bg: "from-orange-100 to-orange-200", border: "border-orange-200", text: "text-orange-700" },
//   { bg: "from-indigo-100 to-indigo-200", border: "border-indigo-200", text: "text-indigo-700" },
//   { bg: "from-teal-100 to-teal-200", border: "border-teal-200", text: "text-teal-700" },
//   { bg: "from-pink-100 to-pink-200", border: "border-pink-200", text: "text-pink-700" },
//   { bg: "from-cyan-100 to-cyan-200", border: "border-cyan-200", text: "text-cyan-700" },
// ]

// // Timetable color palette with sky theme
// const timetableColors = [
//   { bg: "from-sky-400 to-sky-600", text: "text-white", border: "border-sky-300" },
//   { bg: "from-blue-400 to-blue-600", text: "text-white", border: "border-blue-300" },
//   { bg: "from-indigo-400 to-indigo-600", text: "text-white", border: "border-indigo-300" },
//   { bg: "from-cyan-400 to-cyan-600", text: "text-white", border: "border-cyan-300" },
//   { bg: "from-teal-400 to-teal-600", text: "text-white", border: "border-teal-300" },
//   { bg: "from-purple-400 to-purple-600", text: "text-white", border: "border-purple-300" },
//   { bg: "from-violet-400 to-violet-600", text: "text-white", border: "border-violet-300" },
//   { bg: "from-slate-400 to-slate-600", text: "text-white", border: "border-slate-300" },
// ]

// export default function StudentTimetable() {
//   const { data: session , status } = useSession()
//   const [selectedCourse, setSelectedCourse] = useState(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [showCourseOverview, setShowCourseOverview] = useState(true)
//   const [coursesData, setCoursesData] = useState()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const timetableRef = useRef(null)
//   const courseOverviewRef = useRef(null)

//   // Fetch courses data from API
//   useEffect(() => {
//     console.log("entered useeffect")
//     if(!session) return 

//     const fetchCourses = async () => {
//       try {
//         setLoading(true)

//         const response = await fetch("/api/student/myCourses", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             studentEmail: session.user.email,
//           }),
//         })
//         if (!response.ok) {
//           throw new Error("Failed to fetch courses")
//         }
//         const data = await response.json()
//         console.log("data is...", data)
//         if (data.success) {
//           setCoursesData(data)
//           console.log("Coursessss",coursesData)
//         } else {
//           throw new Error(data.message || "Failed to fetch courses")
//         }
//       } catch (err) {
//         setError(err.message)
//         console.error("Error fetching courses:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCourses()
//   }, [session])

//   // Function to get consistent color for course overview
//   const getCourseOverviewColor = (courseCode) => {
//     const hash = courseCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
//     return courseOverviewColors[hash % courseOverviewColors.length]
//   }

//   // Function to get consistent color for timetable
//   const getTimetableColor = (courseCode) => {
//     const hash = courseCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
//     return timetableColors[hash % timetableColors.length]
//   }

//   // Fixed function to map course schedule to time slots
//   const getCourseForSlot = (day, slotIndex) => {
//     if (!coursesData?.courses) return null

//     const targetSlot = timeSlots[slotIndex]
//     if (!targetSlot) return null

//     for (const course of coursesData.courses) {
//       if (!course.schedule) continue

//       for (const schedule of course.schedule) {
//         if (schedule.day === day) {
//           const scheduleStart = new Date(schedule.start)
//           const scheduleHour = scheduleStart.getUTCHours()

//           // Map UTC hour to time slot
//           if (scheduleHour === targetSlot.utcHour) {
//             return {
//               ...course,
//               currentSchedule: schedule,
//             }
//           }
//         }
//       }
//     }
//     return null
//   }

//   const handleCourseClick = (course) => {
//     setSelectedCourse(course)
//     setIsDialogOpen(true)
//   }

//   const exportAsImage = async () => {
//     if (timetableRef.current && courseOverviewRef.current) {
//       // Create a temporary container with both sections
//       const tempContainer = document.createElement("div")
//       tempContainer.style.background = "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd)"
//       tempContainer.style.padding = "24px"
//       // Clone both sections
//       const overviewClone = courseOverviewRef.current.cloneNode(true)
//       const timetableClone = timetableRef.current.cloneNode(true)
//       tempContainer.appendChild(overviewClone)
//       tempContainer.appendChild(timetableClone)
//       document.body.appendChild(tempContainer)

//       const canvas = await html2canvas(tempContainer, {
//         backgroundColor: "#f0f9ff",
//         scale: 2,
//         useCORS: true,
//       })
//       document.body.removeChild(tempContainer)

//       const link = document.createElement("a")
//       link.download = "student-timetable-complete.png"
//       link.href = canvas.toDataURL()
//       link.click()
//     }
//   }

//   const exportAsPDF = async () => {
//     if (timetableRef.current && courseOverviewRef.current) {
//       // Create a temporary container with both sections
//       const tempContainer = document.createElement("div")
//       tempContainer.style.background = "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd)"
//       tempContainer.style.padding = "24px"
//       // Clone both sections
//       const overviewClone = courseOverviewRef.current.cloneNode(true)
//       const timetableClone = timetableRef.current.cloneNode(true)
//       tempContainer.appendChild(overviewClone)
//       tempContainer.appendChild(timetableClone)
//       document.body.appendChild(tempContainer)

//       const canvas = await html2canvas(tempContainer, {
//         backgroundColor: "#f0f9ff",
//         scale: 2,
//         useCORS: true,
//       })
//       document.body.removeChild(tempContainer)

//       const imgData = canvas.toDataURL("image/png")
//       const pdf = new jsPDF("l", "mm", "a4")
//       const imgWidth = 297
//       const imgHeight = (canvas.height * imgWidth) / canvas.width
//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
//       pdf.save("student-timetable-complete.pdf")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6 flex items-center justify-center">
//         <div className="flex items-center gap-3">
//           <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
//           <span className="text-sky-700 font-medium">Loading your timetable...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Timetable</h2>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-8xl mx-auto space-y-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-lg"
//                   whileHover={{ rotate: 5, scale: 1.05 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <GraduationCap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
//                   Student Timetable
//                 </h1>
//               </div>
//               <p className="text-sky-600/70 text-lg">Academic Year 2025 • Spring & Autumn Semester</p>
//             </div>
//             <div className="flex gap-3">
//               <Button
//                 onClick={exportAsImage}
//                 variant="outline"
//                 size="lg"
//                 className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-300"
//               >
//                 <FileImage className="w-4 h-4 text-sky-600" />
//                 <span className="hidden sm:inline text-sky-700">Export PNG</span>
//                 <span className="sm:hidden text-sky-700">PNG</span>
//               </Button>
//               <Button
//                 onClick={exportAsPDF}
//                 variant="outline"
//                 size="lg"
//                 className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-300"
//               >
//                 <FileText className="w-4 h-4 text-sky-600" />
//                 <span className="hidden sm:inline text-sky-700">Export PDF</span>
//                 <span className="sm:hidden text-sky-700">PDF</span>
//               </Button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Timetable Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden py-0">
//             <CardContent className="px-0">
//               <div ref={timetableRef} className="overflow-x-auto">
//                 <div className="min-w-[800px] sm:min-w-[900px]">
//                   {/* Header Row */}
//                   <div className="grid grid-cols-8 bg-gradient-to-r from-sky-500 to-blue-600">
//                     <div className="p-2 sm:p-4 font-bold text-white text-xs sm:text-sm border-r border-sky-400/30">
//                       <div className="flex items-center gap-1 sm:gap-2">
//                         <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
//                         <span className="hidden sm:inline">Time Slots</span>
//                         <span className="sm:hidden">Time</span>
//                       </div>
//                     </div>
//                     {daysOfWeek.map((day) => (
//                       <div
//                         key={day}
//                         className="p-2 sm:p-4 font-bold text-white text-xs sm:text-sm text-center border-r border-sky-400/30 last:border-r-0"
//                       >
//                         <div className="block sm:hidden">{day.slice(0, 3)}</div>
//                         <div className="hidden sm:block">{day}</div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Time Slots */}
//                   {timeSlots.map((slot, slotIndex) => (
//                     <div
//                       key={slotIndex}
//                       className={`grid grid-cols-8 border-b border-sky-100 last:border-b-0 ${
//                         slotIndex % 2 === 0 ? "bg-sky-50/30" : "bg-white/50"
//                       } hover:bg-sky-50/50 transition-colors duration-200`}
//                     >
//                       <div className="p-2 sm:p-4 bg-gradient-to-r from-sky-50 to-white text-sm font-semibold text-sky-700 border-r border-sky-100 flex items-center">
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-400 rounded-full"></div>
//                           <span className="text-xs sm:text-sm">{slot.label}</span>
//                         </div>
//                       </div>
//                       {daysOfWeek.map((day) => {
//                         const courseData = getCourseForSlot(day, slotIndex)
//                         const colors = courseData ? getTimetableColor(courseData.courseCode) : null
//                         return (
//                           <div
//                             key={day}
//                             className="p-2 sm:p-3 border-r border-sky-100 last:border-r-0 min-h-[100px] sm:min-h-[90px] flex items-center justify-center"
//                           >
//                             {courseData ? (
//                               <motion.div
//                                 onClick={() => handleCourseClick(courseData)}
//                                 className={`w-full h-full bg-gradient-to-br ${colors?.bg} rounded-xl p-2 sm:p-3 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center group relative overflow-hidden`}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//                                 {/* Status Indicator Badge */}
//                                 {!courseData.isFinalized && (
//                                   <motion.div
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     className="absolute top-1 mt-1 right-2 w-2 h-2 bg-red-500 rounded-full shadow-lg z-20"
//                                     title="Schedule not finalized"
//                                   >
//                                     <div className="w-full h-full bg-red-500 rounded-full animate-pulse"></div>
//                                   </motion.div>
//                                 )}
//                                 <span
//                                   className={`${colors?.text} font-bold text-xs sm:text-sm text-center relative z-10 leading-tight`}
//                                 >
//                                   {courseData.courseCode}
//                                 </span>
//                                 <span
//                                   className={`${colors?.text} text-xs opacity-80 mt-0.5 sm:mt-1 text-center relative z-10 leading-tight`}
//                                 >
//                                   {courseData.title.length > 10
//                                     ? courseData.title.substring(0, 10) + "..."
//                                     : courseData.title}
//                                 </span>
//                                 <span
//                                   className={`${colors?.text} text-xs opacity-90 mt-0.5 text-center relative z-10 leading-tight font-medium bg-white/20 px-1.5 py-0.5 rounded-md`}
//                                 >
//                                   {courseData.currentSchedule?.room || courseData.room || "TBA"}
//                                 </span>
//                               </motion.div>
//                             ) : (
//                               <div className="w-full h-full bg-gradient-to-br from-sky-50 to-white rounded-xl border-2 border-dashed border-sky-200 hover:border-sky-300 transition-colors duration-200 flex items-center justify-center">
//                                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-200 rounded-full opacity-50"></div>
//                               </div>
//                             )}
//                           </div>
//                         )
//                       })}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Legend for Status Indicators - Moved after timetable */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="flex items-center justify-center gap-6 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-sky-200"
//         >
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//             <span className="text-sm text-gray-700 font-medium">Schedule finalization is pending</span>
//           </div>
//         </motion.div>

//         {/* Course Overview Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           ref={courseOverviewRef}
//         >
//           <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden mb-8 py-0">
//             <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
//                     <BookOpen className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Course Overview</h2>
//                 </div>
//                 <div className="flex items-center">
//                   <Button
//                     onClick={() => setShowCourseOverview(!showCourseOverview)}
//                     variant="ghost"
//                     size="sm"
//                     className="text-sky-600 hover:text-sky-700 hover:bg-sky-100"
//                   >
//                     {showCourseOverview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <motion.div
//               initial={false}
//               animate={{
//                 height: showCourseOverview ? "auto" : 0,
//                 opacity: showCourseOverview ? 1 : 0,
//               }}
//               transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
//               className="overflow-hidden"
//             >
//               <CardContent className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
//                   {coursesData?.courses?.map((course, index) => {
//                     const colors = getCourseOverviewColor(course.courseCode)
//                     return (
//                       <motion.div
//                         key={course._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                         whileHover={{ scale: 1.02, y: -5 }}
//                         className={`bg-gradient-to-br ${colors.bg} rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border ${colors.border} relative`}
//                         onClick={() => handleCourseClick(course)}
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="flex items-center gap-2">
//                             <h3 className={`font-bold ${colors.text} text-lg`}>{course.courseCode}</h3>
//                             {!course.isFinalized && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
//                           </div>
//                           <Badge variant="secondary" className={`bg-white/60 ${colors.text} border-white/50`}>
//                             {course.credits} Credits
//                           </Badge>
//                         </div>
//                         <h4 className={`${colors.text} font-semibold mb-2 text-sm leading-tight`}>{course.title}</h4>
//                         <p className={`${colors.text}/80 text-sm mb-3`}>{course.profName?.[0] || "TBA"}</p>
//                         <div className={`flex gap-4 ${colors.text}/90 text-sm`}>
//                           <span>L: {course.lectures}</span>
//                           <span>T: {course.tutorials}</span>
//                           <span>P: {course.practicals}</span>
//                         </div>
//                       </motion.div>
//                     )
//                   })}
//                 </div>
//               </CardContent>
//             </motion.div>
//           </Card>
//         </motion.div>

//         {/* Course Details Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-lg mx-auto bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl max-h-[95vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle className="flex items-center gap-3 text-xl">
//                 <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
//                   <BookOpen className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
//                   Course Details
//                 </span>
//               </DialogTitle>
//             </DialogHeader>
//             {selectedCourse && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-6"
//               >
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <h3 className="font-bold text-xl text-slate-800 capitalize">{selectedCourse.title}</h3>
//                     {!selectedCourse.isFinalized && (
//                       <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
//                         <AlertCircle className="w-3 h-3 mr-1" />
//                         Not Finalized
//                       </Badge>
//                     )}
//                   </div>
//                   <Badge
//                     variant="secondary"
//                     className={`bg-gradient-to-r ${getTimetableColor(selectedCourse.courseCode).bg} text-white px-3 py-1 text-sm font-semibold`}
//                   >
//                     {selectedCourse.courseCode}
//                   </Badge>
//                 </div>

//                 {!selectedCourse.isFinalized && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-red-700">
//                       <AlertCircle className="w-4 h-4" />
//                       <span className="text-sm font-medium">Schedule Status</span>
//                     </div>
//                     <p className="text-red-600 text-sm mt-1">
//                       This course schedule has not been finalized by the professor yet. Times and rooms may change.
//                     </p>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <motion.div
//                     className="bg-sky-50/50 p-4 rounded-xl border border-sky-100"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <User className=" w-4 h-4 text-sky-600" />
//                       <p className="font-semibold text-sky-800">Professor</p>
//                     </div>
//                     <p className="text-slate-700 capitalize">{selectedCourse.profName?.join(", ") || "TBA"}</p>
//                   </motion.div>

//                   <motion.div
//                     className="bg-sky-50/50 p-4 rounded-xl border border-sky-100"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <Calendar className="w-4 h-4 text-sky-600" />
//                       <p className="font-semibold text-sky-800">Credits</p>
//                     </div>
//                     <p className="text-slate-700 text-lg font-bold">{selectedCourse.credits}</p>
//                   </motion.div>
//                 </div>

//                 <div className="space-y-3">
//                   <p className="font-semibold text-sky-800">Class Structure:</p>
//                   <div className="flex flex-wrap gap-2">
//                     <motion.span
//                       className="bg-gradient-to-r from-sky-100 to-sky-200 text-sky-800 px-3 py-2 rounded-lg text-sm font-medium"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {selectedCourse.lectures} Lectures
//                     </motion.span>
//                     <motion.span
//                       className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 px-3 py-2 rounded-lg text-sm font-medium"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {selectedCourse.tutorials} Tutorials
//                     </motion.span>
//                     <motion.span
//                       className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {selectedCourse.practicals} Practicals
//                     </motion.span>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <p className="font-semibold text-sky-800">Schedule:</p>
//                   <div className="space-y-3">
//                     {selectedCourse.schedule && selectedCourse.schedule.length > 0 ? (
//                       selectedCourse.schedule.map((schedule, index) => {
//                         const startTime = new Date(schedule.start)
//                         const endTime = new Date(schedule.end)
//                         const timeSlot = timeSlots.find((slot) => slot.utcHour === startTime.getUTCHours())

//                         return (
//                           <motion.div
//                             key={index}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-xl border border-sky-100 hover:border-sky-200 transition-colors duration-200"
//                           >
//                             <div className="flex items-center gap-2 mb-2">
//                               <Calendar className="w-4 h-4 text-sky-600" />
//                               <span className="font-semibold text-sky-800">{schedule.day}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-slate-600 mb-1">
//                               <Clock className="w-4 h-4 text-sky-500" />
//                               <span>
//                                 {timeSlot?.label ||
//                                   `${startTime.getUTCHours()}:${startTime.getUTCMinutes().toString().padStart(2, "0")} - ${endTime.getUTCHours()}:${endTime.getUTCMinutes().toString().padStart(2, "0")}`}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 text-slate-600">
//                               <MapPin className="w-4 h-4 text-sky-500" />
//                               <span>{schedule.room}</span>
//                             </div>
//                           </motion.div>
//                         )
//                       })
//                     ) : (
//                       <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//                         <p className="text-gray-600 text-sm">No schedule available yet</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-sky-100">
//                   <p className="text-sm text-sky-600 bg-sky-50 px-3 py-2 rounded-lg inline-block">
//                     Semester: {selectedCourse.forSemester}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }












"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  FileImage,
  FileText,
  Clock,
  MapPin,
  User,
  BookOpen,
  Calendar,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
} from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useSession } from "next-auth/react"

const timeSlots = [
  { label: "8:30 - 9:25", start: "08:30", end: "09:25", utcHour: 3 },
  { label: "9:30 - 10:25", start: "09:30", end: "10:25", utcHour: 4 },
  { label: "10:30 - 11:25", start: "10:30", end: "11:25", utcHour: 5 },
  { label: "11:30 - 12:25", start: "11:30", end: "12:25", utcHour: 6 },
  { label: "12:30 - 1:25", start: "12:30", end: "13:25", utcHour: 7 },
  { label: "1:30 - 2:25", start: "13:30", end: "14:25", utcHour: 8 },
  { label: "2:30 - 3:25", start: "14:30", end: "15:25", utcHour: 9 },
  { label: "3:30 - 4:25", start: "15:30", end: "16:25", utcHour: 10 },
  { label: "4:30 - 5:25", start: "16:30", end: "17:25", utcHour: 11 },
  { label: "5:30 - 6:25", start: "17:30", end: "18:25", utcHour: 12 },
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Course overview color palette matching the image
const courseOverviewColors = [
  { bg: "from-blue-100 to-blue-200", border: "border-blue-200", text: "text-blue-700" },
  { bg: "from-purple-100 to-purple-200", border: "border-purple-200", text: "text-purple-700" },
  { bg: "from-green-100 to-green-200", border: "border-green-200", text: "text-green-700" },
  { bg: "from-orange-100 to-orange-200", border: "border-orange-200", text: "text-orange-700" },
  { bg: "from-indigo-100 to-indigo-200", border: "border-indigo-200", text: "text-indigo-700" },
  { bg: "from-teal-100 to-teal-200", border: "border-teal-200", text: "text-teal-700" },
  { bg: "from-pink-100 to-pink-200", border: "border-pink-200", text: "text-pink-700" },
  { bg: "from-cyan-100 to-cyan-200", border: "border-cyan-200", text: "text-cyan-700" },
]

export default function StudentTimetable() {
  const { data: session, status } = useSession()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showCourseOverview, setShowCourseOverview] = useState(true)
  const [coursesData, setCoursesData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const timetableRef = useRef(null)
  const courseOverviewRef = useRef(null)

  // Fetch courses data from API
  useEffect(() => {
    console.log("entered useeffect")
    if (!session) return

    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/student/myCourses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentEmail: session.user.email,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        console.log("data is...", data)
        if (data.success) {
          setCoursesData(data)
          console.log("Coursessss", coursesData)
        } else {
          throw new Error(data.message || "Failed to fetch courses")
        }
      } catch (err) {
        setError(err.message)
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [session])

  // Function to get consistent color for course overview
  const getCourseOverviewColor = (courseCode) => {
    const hash = courseCode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return courseOverviewColors[hash % courseOverviewColors.length]
  }

  // Fixed function to map course schedule to time slots
  const getCourseForSlot = (day, slotIndex) => {
    if (!coursesData?.courses) return null

    const targetSlot = timeSlots[slotIndex]
    if (!targetSlot) return null

    for (const course of coursesData.courses) {
      if (!course.schedule) continue

      for (const schedule of course.schedule) {
        if (schedule.day === day) {
          const scheduleStart = new Date(schedule.start)
          const scheduleHour = scheduleStart.getUTCHours()

          // Map UTC hour to time slot
          if (scheduleHour === targetSlot.utcHour) {
            return {
              ...course,
              currentSchedule: schedule,
            }
          }
        }
      }
    }

    return null
  }

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const exportAsImage = async () => {
    if (timetableRef.current && courseOverviewRef.current) {
      // Create a temporary container with both sections
      const tempContainer = document.createElement("div")
      tempContainer.style.background = "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd)"
      tempContainer.style.padding = "24px"

      // Clone both sections
      const overviewClone = courseOverviewRef.current.cloneNode(true)
      const timetableClone = timetableRef.current.cloneNode(true)

      tempContainer.appendChild(overviewClone)
      tempContainer.appendChild(timetableClone)
      document.body.appendChild(tempContainer)

      const canvas = await html2canvas(tempContainer, {
        backgroundColor: "#f0f9ff",
        scale: 2,
        useCORS: true,
      })

      document.body.removeChild(tempContainer)

      const link = document.createElement("a")
      link.download = "student-timetable-complete.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const exportAsPDF = async () => {
    if (timetableRef.current && courseOverviewRef.current) {
      // Create a temporary container with both sections
      const tempContainer = document.createElement("div")
      tempContainer.style.background = "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #bae6fd)"
      tempContainer.style.padding = "24px"

      // Clone both sections
      const overviewClone = courseOverviewRef.current.cloneNode(true)
      const timetableClone = timetableRef.current.cloneNode(true)

      tempContainer.appendChild(overviewClone)
      tempContainer.appendChild(timetableClone)
      document.body.appendChild(tempContainer)

      const canvas = await html2canvas(tempContainer, {
        backgroundColor: "#f0f9ff",
        scale: 2,
        useCORS: true,
      })

      document.body.removeChild(tempContainer)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("l", "mm", "a4")
      const imgWidth = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save("student-timetable-complete.pdf")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-sky-600" />
          <span className="text-sky-700 font-medium">Loading your timetable...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Timetable</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
                  Student Timetable
                </h1>
              </div>
              <p className="text-sky-600/70 text-lg">Academic Year 2025 • Spring & Autumn Semester</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={exportAsImage}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-300"
              >
                <FileImage className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline text-sky-700">Export PNG</span>
                <span className="sm:hidden text-sky-700">PNG</span>
              </Button>
              <Button
                onClick={exportAsPDF}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-300"
              >
                <FileText className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline text-sky-700">Export PDF</span>
                <span className="sm:hidden text-sky-700">PDF</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Timetable Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div ref={timetableRef} className="overflow-x-auto">
                <div className="min-w-[900px] space-y-2">
                  {/* Header Row */}
                  <div className="grid grid-cols-11 gap-2">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-center">
                      <div className="text-sm font-bold text-gray-700">Day/</div>
                      <div className="text-sm font-bold text-gray-700">Time</div>
                    </div>
                    {timeSlots.map((slot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-blue-50 border border-gray-300 rounded-lg p-2 text-center flex items-center justify-center"
                      >
                        <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Day Rows */}
                  {daysOfWeek.map((day, dayIndex) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
                      className="grid grid-cols-11 gap-2"
                    >
                      <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700">{day.slice(0, 3)}</span>
                      </div>
                      {timeSlots.map((slot, slotIndex) => {
                        const courseData = getCourseForSlot(day, slotIndex)

                        // Check if this is lunch time (12:30-1:25)
                        const isLunchTime = slot.label === "12:30 - 1:25"

                        return (
                          <motion.div
                            key={`${day}-${slotIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: (dayIndex * timeSlots.length + slotIndex) * 0.02 }}
                            className={`h-16 border rounded-lg p-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                              isLunchTime
                                ? "bg-orange-50 border-orange-200 hover:bg-orange-100"
                                : courseData
                                  ? "bg-green-50 border-green-200 hover:bg-green-100 hover:scale-105"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                            onClick={() => courseData && handleCourseClick(courseData)}
                            whileHover={{ scale: courseData ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-center">
                              {isLunchTime ? (
                                <div className="text-orange-600 font-semibold text-sm">Lunch Break</div>
                              ) : courseData ? (
                                <div className="space-y-1 relative">
                                  {!courseData.isFinalized && (
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse absolute right-2 -top-3 sm:-right-3 sm:-top-3 "></div>
                                  )}
                                  <div className="text-green-600 font-bold text-sm sm:text-md">{courseData.courseCode}</div>
                                </div>
                              ) : (
                                <div className="text-gray-400 font-semibold text-sm">Free Slot</div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Legend for Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-6 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-sky-200"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700 font-medium">Schedule finalization is pending</span>
          </div>
        </motion.div>

        {/* Course Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          ref={courseOverviewRef}
        >
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden mb-8 py-0">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100 pt-2 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Course Overview</h2>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() => setShowCourseOverview(!showCourseOverview)}
                    variant="ghost"
                    size="sm"
                    className="text-sky-600 hover:text-sky-700 hover:bg-sky-100"
                  >
                    {showCourseOverview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <motion.div
              initial={false}
              animate={{
                height: showCourseOverview ? "auto" : 0,
                opacity: showCourseOverview ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coursesData?.courses?.map((course, index) => {
                    const colors = getCourseOverviewColor(course.courseCode)
                    return (
                      <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`bg-gradient-to-br ${colors.bg} rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border ${colors.border} relative`}
                        onClick={() => handleCourseClick(course)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-bold ${colors.text} text-lg`}>{course.courseCode}</h3>
                            {!course.isFinalized && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                          </div>
                          <Badge variant="secondary" className={`bg-white/60 ${colors.text} border-white/50`}>
                            {course.credits} Credits
                          </Badge>
                        </div>
                        <h4 className={`${colors.text} font-semibold mb-2 text-sm leading-tight`}>{course.title}</h4>
                        <p className={`${colors.text}/80 text-sm mb-3`}>{course.profName?.[0] || "TBA"}</p>
                        <div className={`flex gap-4 ${colors.text}/90 text-sm`}>
                          <span>L: {course.lectures}</span>
                          <span>T: {course.tutorials}</span>
                          <span>P: {course.practicals}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </motion.div>
          </Card>
        </motion.div>

        {/* Course Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg mx-auto bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
                  Course Details
                </span>
              </DialogTitle>
            </DialogHeader>
            {selectedCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-xl text-slate-800 capitalize">{selectedCourse.title}</h3>
                    {!selectedCourse.isFinalized && (
                      <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not Finalized
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-sm font-semibold"
                  >
                    {selectedCourse.courseCode}
                  </Badge>
                </div>

                {!selectedCourse.isFinalized && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Schedule Status</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1">
                      This course schedule has not been finalized by the professor yet. Times and rooms may change.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    className="bg-sky-50/50 p-4 rounded-xl border border-sky-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-sky-600" />
                      <p className="font-semibold text-sky-800">Professor</p>
                    </div>
                    <p className="text-slate-700 capitalize">{selectedCourse.profName?.join(", ") || "TBA"}</p>
                  </motion.div>

                  <motion.div
                    className="bg-sky-50/50 p-4 rounded-xl border border-sky-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <p className="font-semibold text-sky-800">Credits</p>
                    </div>
                    <p className="text-slate-700 text-lg font-bold">{selectedCourse.credits}</p>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sky-800">Class Structure:</p>
                  <div className="flex flex-wrap gap-2">
                    <motion.span
                      className="bg-gradient-to-r from-sky-100 to-sky-200 text-sky-800 px-3 py-2 rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedCourse.lectures} Lectures
                    </motion.span>
                    <motion.span
                      className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 px-3 py-2 rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedCourse.tutorials} Tutorials
                    </motion.span>
                    <motion.span
                      className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedCourse.practicals} Practicals
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sky-800">Schedule:</p>
                  <div className="space-y-3">
                    {selectedCourse.schedule && selectedCourse.schedule.length > 0 ? (
                      selectedCourse.schedule.map((schedule, index) => {
                        const startTime = new Date(schedule.start)
                        const endTime = new Date(schedule.end)
                        const timeSlot = timeSlots.find((slot) => slot.utcHour === startTime.getUTCHours())

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-xl border border-sky-100 hover:border-sky-200 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-sky-600" />
                              <span className="font-semibold text-sky-800">{schedule.day}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 mb-1">
                              <Clock className="w-4 h-4 text-sky-500" />
                              <span>
                                {timeSlot?.label ||
                                  `${startTime.getUTCHours()}:${startTime.getUTCMinutes().toString().padStart(2, "0")} - ${endTime.getUTCHours()}:${endTime.getUTCMinutes().toString().padStart(2, "0")}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4 text-sky-500" />
                              <span>{schedule.room}</span>
                            </div>
                          </motion.div>
                        )
                      })
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-gray-600 text-sm">No schedule available yet</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-100">
                  <p className="text-sm text-sky-600 bg-sky-50 px-3 py-2 rounded-lg inline-block">
                    Semester: {selectedCourse.forSemester}
                  </p>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
