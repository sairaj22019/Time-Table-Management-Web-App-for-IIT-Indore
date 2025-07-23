

// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { useRouter, useSearchParams } from "next/navigation"
// import {
//   HiSearch,
//   HiUsers,
//   HiAcademicCap,
//   HiCalendar,
//   HiPlus,
//   HiPencil,
//   HiTrash,
//   HiChevronDown,
//   HiUser,
//   HiFilter,
//   HiLocationMarker,
//   HiExclamation,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { useToast } from "@/hooks/use-toast"

// export default function ViewAllCoursesPage() {
//   const [courses, setCourses] = useState([])
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedSemester, setSelectedSemester] = useState("all")
//   const [loading, setLoading] = useState(true)
//   const [expandedCards, setExpandedCards] = useState([])
//   const [error, setError] = useState(null)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [courseToDelete, setCourseToDelete] = useState(null)
//   const [deletingCourseId, setDeletingCourseId] = useState(null)

//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { toast } = useToast()

//   const toggleCardExpansion = (courseId) => {
//     setExpandedCards((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
//   }

//   // Check for courseCode parameter and set search term
//   useEffect(() => {
//     const courseCode = searchParams.get("courseCode")
//     if (courseCode) {
//       setSearchTerm(decodeURIComponent(courseCode))
//     }
//   }, [searchParams])

//   // Fetch courses from API
//   const fetchCourses = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await fetch("/api/admin/courses")
//       const data = await response.json()
//       if (data.success) {
//         setCourses(data.courses)
//         setFilteredCourses(data.courses)
//       } else {
//         setError(data.error || "Failed to fetch courses")
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error)
//       setError("Failed to fetch courses. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Delete course function
//   const deleteCourse = async (courseId) => {
//     try {
//       setDeletingCourseId(courseId)

//       const response = await fetch("/api/course/deleteCourse", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: courseId }),
//       })

//       const data = await response.json()

//       if (data.success) {
//         // Remove the course from the local state
//         setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
//         setFilteredCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))

//         // Remove from expanded cards if it was expanded
//         setExpandedCards((prev) => prev.filter((id) => id !== courseId))

//         toast({
//           title: "Success",
//           description: "Course deleted successfully",
//           variant: "default",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: data.message || "Failed to delete course",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error deleting course:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete course. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setDeletingCourseId(null)
//       setDeleteDialogOpen(false)
//       setCourseToDelete(null)
//     }
//   }

//   // Handle delete button click
//   const handleDeleteClick = (course) => {
//     setCourseToDelete(course)
//     setDeleteDialogOpen(true)
//   }

//   // Confirm delete
//   const handleConfirmDelete = () => {
//     if (courseToDelete) {
//       deleteCourse(courseToDelete.id)
//     }
//   }

//   useEffect(() => {
//     fetchCourses()
//   }, [])

//   useEffect(() => {
//     let filtered = courses

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           course.profName?.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           course.courseCoordinator?.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     if (selectedSemester !== "all") {
//       filtered = filtered.filter((course) => course.forSemester === selectedSemester)
//     }

//     setFilteredCourses(filtered)
//   }, [searchTerm, selectedSemester, courses])

//   const semesters = [...new Set(courses.map((course) => course.forSemester).filter(Boolean))]

//   // Helper function to format time
//   const formatTime = (dateString) => {
//     if (!dateString) return "Time TBD"
//     const date = new Date(dateString)
//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     })
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

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//     hover: {
//       scale: 1.02,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//         <div className="w-full mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading courses...</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//         <div className="w-full mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="text-red-500 mb-4">
//                 <HiAcademicCap className="w-12 h-12 mx-auto" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-600 mb-2">Error Loading Courses</h3>
//               <p className="text-sm text-gray-500 mb-4">{error}</p>
//               <Button onClick={fetchCourses} className="bg-blue-600 hover:bg-blue-700">
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
//       <div className="w-full mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">All Courses</h1>
//                 <p className="text-sm sm:text-base text-gray-600">Manage and view all courses across academic years</p>
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
//                   {filteredCourses.length} Courses
//                 </Badge>
                
//                 <Button
//                   onClick={() => router.push("/admin/createCourses")}
//                   className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2"
//                 >
//                   <HiPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   Add New Course
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Search and Filter Section */}
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
//           <div className="relative flex-1">
//             <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="Search courses, codes, instructors, or coordinators..."
//               className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Select value={selectedSemester} onValueChange={setSelectedSemester}>
//             <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
//               <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
//               <SelectValue placeholder="Filter by semester" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Semesters</SelectItem>
//               {semesters.map((semester) => (
//                 <SelectItem key={semester} value={semester}>
//                   {semester}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Courses Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 gap-4 sm:gap-6 max-w-5xl mx-auto"
//         >
//           {filteredCourses.map((course) => {
//             const isExpanded = expandedCards.includes(course.id)
//             const isDeleting = deletingCourseId === course.id

//             return (
//               <motion.div
//                 key={course.id}
//                 variants={cardVariants}
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 transition={{ duration: 0.2 }}
//                 layout
//               >
//                 <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0">
//                   {/* Compact Header - Always Visible */}
//                   <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
//                     <div className="flex items-start sm:items-center justify-between gap-3">
//                       <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                         <motion.div
//                           className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md flex-shrink-0"
//                           whileHover={{ rotate: 5, scale: 1.05 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <HiAcademicCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                         </motion.div>
//                         <div className="min-w-0 flex-1">
//                           <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight mb-1 line-clamp-2">
//                             {course.title}
//                           </h3>
//                           <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
//                         <Badge
//                           variant="secondary"
//                           className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs"
//                         >
//                           {course.credits} Credits
//                         </Badge>
//                       </div>
//                     </div>
//                     {/* Action Buttons */}
//                     <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
//                       <Button
//                         onClick={() => toggleCardExpansion(course.id)}
//                         variant="outline"
//                         size="sm"
//                         className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
//                         disabled={isDeleting}
//                       >
//                         <motion.div
//                           animate={{ rotate: isExpanded ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mr-1 sm:mr-2"
//                         >
//                           <HiChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
//                         </motion.div>
//                         <span className="hidden sm:inline">{isExpanded ? "Hide Details" : "View Details"}</span>
//                         <span className="sm:hidden">{isExpanded ? "Hide" : "View"}</span>
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
//                         disabled={isDeleting}
//                       >
//                         <HiPencil className="w-3 h-3 sm:w-4 sm:h-4" />
//                         <span className="hidden sm:inline ml-1">Edit</span>
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
//                         onClick={() => handleDeleteClick(course)}
//                         disabled={isDeleting}
//                       >
//                         {isDeleting ? (
//                           <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-red-600" />
//                         ) : (
//                           <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
//                         )}
//                         <span className="hidden sm:inline ml-1">{isDeleting ? "Deleting..." : "Delete"}</span>
//                       </Button>
//                     </div>
//                   </CardHeader>

//                   {/* Expandable Details Section */}
//                   <motion.div
//                     initial={false}
//                     animate={{
//                       height: isExpanded ? "auto" : 0,
//                       opacity: isExpanded ? 1 : 0,
//                     }}
//                     transition={{
//                       duration: 0.4,
//                       ease: [0.04, 0.62, 0.23, 0.98],
//                     }}
//                     className="overflow-hidden"
//                   >
//                     <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
//                       <motion.div
//                         initial={false}
//                         animate={{
//                           y: isExpanded ? 0 : -20,
//                           opacity: isExpanded ? 1 : 0,
//                         }}
//                         transition={{
//                           duration: 0.3,
//                           delay: isExpanded ? 0.1 : 0,
//                         }}
//                         className="space-y-3 sm:space-y-4"
//                       >
//                         {/* Enrolled Students */}
//                         <motion.div
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <HiUsers className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="text-xs sm:text-sm font-medium text-gray-800">
//                               {course.enrolledStudentsCount} Students Enrolled
//                             </p>
//                             <p className="text-xs text-gray-500">Current enrollment</p>
//                           </div>
//                         </motion.div>

//                         {/* Course Instructors (profName) */}
//                         {course.profName && course.profName.length > 0 && (
//                           <motion.div
//                             className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div>
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                 {course.profName.join(", ")}
//                               </p>
//                               <p className="text-xs text-gray-500">Course Instructors</p>
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Course Coordinator */}
//                         {course.courseCoordinator && (
//                           <motion.div
//                             className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div>
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">{course.courseCoordinator}</p>
//                               <p className="text-xs text-gray-500">Course Coordinator</p>
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Semester Info */}
//                         <motion.div
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="text-xs sm:text-sm font-medium text-gray-800">{course.forSemester}</p>
//                             <p className="text-xs text-gray-500">Semester</p>
//                           </div>
//                         </motion.div>

//                         {/* Slots */}
//                         {course.slots && course.slots.length > 0 && (
//                           <motion.div
//                             className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-2 bg-white rounded-lg shadow-sm">
//                               <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div>
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">{course.slots.join(", ")}</p>
//                               <p className="text-xs text-gray-500">Time Slots</p>
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Weekly Schedule */}
//                         {course.schedule && course.schedule.length > 0 && (
//                           <div className="space-y-2">
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
//                               <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                               Weekly Schedule
//                             </h4>
//                             <div className="space-y-2">
//                               {course.schedule.map((scheduleItem, index) => (
//                                 <motion.div
//                                   key={index}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.1 }}
//                                   className="flex items-center justify-between p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
//                                 >
//                                   <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                                     <div>
//                                       <span className="font-medium text-gray-800 text-xs sm:text-sm">
//                                         {scheduleItem.day || "Day TBD"}
//                                       </span>
//                                       <p className="text-xs text-gray-500">
//                                         {scheduleItem.start && scheduleItem.end
//                                           ? `${formatTime(scheduleItem.start)} - ${formatTime(scheduleItem.end)}`
//                                           : "Time TBD"}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
//                                     <HiLocationMarker className="w-3 h-3" />
//                                     <span className="text-xs">{scheduleItem.room || "Room TBD"}</span>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Professor Emails */}
//                         {course.profEmail && course.profEmail.length > 0 && (
//                           <motion.div
//                             className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div>
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                 {course.profEmail.join(", ")}
//                               </p>
//                               <p className="text-xs text-gray-500">Professor Emails</p>
//                             </div>
//                           </motion.div>
//                         )}
//                       </motion.div>
//                     </CardContent>
//                   </motion.div>
//                 </Card>
//               </motion.div>
//             )
//           })}
//         </motion.div>

//         {filteredCourses.length === 0 && !loading && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
//             </div>
//             <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No courses found</h3>
//             <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}

//         {/* Delete Confirmation Dialog */}
//         <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle className="flex items-center gap-2">
//                 <HiExclamation className="w-5 h-5 text-red-500" />
//                 Delete Course
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 Are you sure you want to delete "{courseToDelete?.title}" ({courseToDelete?.courseCode})?
//                 <br />
//                 <br />
//                 <span className="text-red-600 font-medium">
//                   This action cannot be undone. This will permanently delete the course and remove all enrolled students
//                   and associated professors from this course.
//                 </span>
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={handleConfirmDelete}
//                 className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
//               >
//                 Delete Course
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </main>
//   )
// }



"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import {
  HiSearch,
  HiUsers,
  HiAcademicCap,
  HiCalendar,
  HiPlus,
  HiPencil,
  HiTrash,
  HiChevronDown,
  HiUser,
  HiFilter,
  HiLocationMarker,
  HiExclamation,
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function ViewAllCoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [loading, setLoading] = useState(true)
  const [expandedCards, setExpandedCards] = useState([])
  const [error, setError] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [deletingCourseId, setDeletingCourseId] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const toggleCardExpansion = (courseId) => {
    setExpandedCards((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  // Check for courseCode parameter and set search term
  useEffect(() => {
    const courseCode = searchParams.get("courseCode")
    if (courseCode) {
      setSearchTerm(decodeURIComponent(courseCode))
    }
  }, [searchParams])

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/courses")
      const data = await response.json()
      if (data.success) {
        setCourses(data.courses)
        setFilteredCourses(data.courses)
      } else {
        setError(data.error || "Failed to fetch courses")
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
      setError("Failed to fetch courses. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Delete course function
  const deleteCourse = async (courseId) => {
    try {
      setDeletingCourseId(courseId)
      const response = await fetch("/api/course/deleteCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: courseId }),
      })
      const data = await response.json()
      if (data.success) {
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
        setFilteredCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
        setExpandedCards((prev) => prev.filter((id) => id !== courseId))
        toast({
          title: "Success",
          description: "Course deleted successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete course",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting course:", error)
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletingCourseId(null)
      setDeleteDialogOpen(false)
      setCourseToDelete(null)
    }
  }

  // Handle delete button click
  const handleDeleteClick = (course) => {
    setCourseToDelete(course)
    setDeleteDialogOpen(true)
  }

  // Handle edit button click
  const handleEditClick = (course) => {
    setCourseToEdit(course)
    setEditDialogOpen(true)
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id)
    }
  }

  // Confirm edit
  const handleConfirmEdit = () => {
    if (courseToEdit) {
      // Use _id if available, otherwise fall back to id
      const courseId = courseToEdit._id || courseToEdit.id
      router.push(`/admin/editCourse?id=${courseId}`)
    }
    setEditDialogOpen(false)
    setCourseToEdit(null)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    let filtered = courses
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.profName?.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          course.courseCoordinator?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedSemester !== "all") {
      filtered = filtered.filter((course) => course.forSemester === selectedSemester)
    }
    setFilteredCourses(filtered)
  }, [searchTerm, selectedSemester, courses])

  const semesters = [...new Set(courses.map((course) => course.forSemester).filter(Boolean))]

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return "Time TBD"
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <HiAcademicCap className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Error Loading Courses</h3>
              <p className="text-sm text-gray-500 mb-4">{error}</p>
              <Button onClick={fetchCourses} className="bg-blue-600 hover:bg-blue-700">
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
      <div className="w-full mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">All Courses</h1>
                <p className="text-sm sm:text-base text-gray-600">Manage and view all courses across academic years</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                  {filteredCourses.length} Courses
                </Badge>
                <Button
                  onClick={() => router.push("/admin/createCourses")}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2"
                >
                  <HiPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Add New Course
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses, codes, instructors, or coordinators..."
              className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
              <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <SelectValue placeholder="Filter by semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {filteredCourses.map((course) => {
            const isExpanded = expandedCards.includes(course.id)
            const isDeleting = deletingCourseId === course.id
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0">
                  {/* Compact Header - Always Visible */}
                  <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <motion.div
                          className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md flex-shrink-0"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <HiAcademicCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-800 text-sm sm:text-lg leading-tight mb-1 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs"
                        >
                          {course.credits} Credits
                        </Badge>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <Button
                        onClick={() => toggleCardExpansion(course.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                        disabled={isDeleting}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="mr-1 sm:mr-2"
                        >
                          <HiChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="hidden sm:inline">{isExpanded ? "Hide Details" : "View Details"}</span>
                        <span className="sm:hidden">{isExpanded ? "Hide" : "View"}</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
                        onClick={() => handleEditClick(course)}
                        disabled={isDeleting}
                      >
                        <HiPencil className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
                        onClick={() => handleDeleteClick(course)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-red-600" />
                        ) : (
                          <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="hidden sm:inline ml-1">{isDeleting ? "Deleting..." : "Delete"}</span>
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Expandable Details Section */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
                      <motion.div
                        initial={false}
                        animate={{
                          y: isExpanded ? 0 : -20,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isExpanded ? 0.1 : 0,
                        }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {/* Enrolled Students */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiUsers className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">
                              {course.enrolledStudentsCount} Students Enrolled
                            </p>
                            <p className="text-xs text-gray-500">Current enrollment</p>
                          </div>
                        </motion.div>

                        {/* Course Instructors (profName) */}
                        {course.profName && course.profName.length > 0 && (
                          <motion.div
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-800">
                                {course.profName.join(", ")}
                              </p>
                              <p className="text-xs text-gray-500">Course Instructors</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Course Coordinator */}
                        {course.courseCoordinator && (
                          <motion.div
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-800">{course.courseCoordinator}</p>
                              <p className="text-xs text-gray-500">Course Coordinator</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Semester Info */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{course.forSemester}</p>
                            <p className="text-xs text-gray-500">Semester</p>
                          </div>
                        </motion.div>

                        {/* Slots */}
                        {course.slots && course.slots.length > 0 && (
                          <motion.div
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-800">{course.slots.join(", ")}</p>
                              <p className="text-xs text-gray-500">Time Slots</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Weekly Schedule */}
                        {course.schedule && course.schedule.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              Weekly Schedule
                            </h4>
                            <div className="space-y-2">
                              {course.schedule.map((scheduleItem, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center justify-between p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                                >
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <div>
                                      <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                        {scheduleItem.day || "Day TBD"}
                                      </span>
                                      <p className="text-xs text-gray-500">
                                        {scheduleItem.start && scheduleItem.end
                                          ? `${formatTime(scheduleItem.start)} - ${formatTime(scheduleItem.end)}`
                                          : "Time TBD"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                                    <HiLocationMarker className="w-3 h-3" />
                                    <span className="text-xs">{scheduleItem.room || "Room TBD"}</span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Professor Emails */}
                        {course.profEmail && course.profEmail.length > 0 && (
                          <motion.div
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-800">
                                {course.profEmail.join(", ")}
                              </p>
                              <p className="text-xs text-gray-500">Professor Emails</p>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {filteredCourses.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No courses found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <HiExclamation className="w-5 h-5 text-red-500" />
              Delete Course
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{courseToDelete?.title}" ({courseToDelete?.courseCode})?
              <br />
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone. This will permanently delete the course and remove all enrolled students
                and associated professors from this course.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Confirmation Dialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <HiPencil className="w-5 h-5 text-green-500" />
              Edit Course
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to edit "{courseToEdit?.title}" ({courseToEdit?.courseCode})?
              <br />
              <br />
              <span className="text-blue-600 font-medium">
                You will be redirected to the edit course page where you can modify all course details.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmEdit}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-600"
            >
              Edit Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
