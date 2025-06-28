
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   HiAcademicCap,
//   HiClock,
//   HiUser,
//   HiCalendar,
//   HiStar,
//   HiBookOpen,
//   HiLocationMarker,
//   HiSearch,
//   HiFilter,
//   HiChevronDown,
// } from "react-icons/hi"

// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Accepts studentEmail, year, and currentSem as props
// export default function CoursesPage({ studentEmail, year, currentSem }) {
//   const [courses, setCourses] = useState([])
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [expandedCards, setExpandedCards] = useState(new Set())
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   // Fetch courses from backend
//   useEffect(() => {
//     async function fetchCourses() {
//       setLoading(true)
//       setError(null)
//       let url, body
//       if (year === 1) {
//         url = "/api/student/getScheduleForYear1"
//         body = { studentEmail }
//       } else {
//         url = "/api/student/getSchedule" // <-- Change to your actual route for other years
//         body = { studentEmail, currentSem, year }
//       }
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         })
//         const data = await response.json()
//         if (data.success) {
//           setCourses(data.courses)
//           setFilteredCourses(data.courses)
//         } else {
//           setError(data.message || "Failed to fetch courses")
//         }
//       } catch (err) {
//         setError("Failed to fetch courses")
//       }
//       setLoading(false)
//     }
//     if (studentEmail && year && (year === 1 || currentSem)) {
//       fetchCourses()
//     }
//   }, [studentEmail, year, currentSem])

//   // Filter logic
//   const handleSearch = (term) => {
//     setSearchTerm(term)
//     filterCourses(term, selectedCategory)
//   }

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category)
//     filterCourses(searchTerm, category)
//   }

//   const filterCourses = (term, category) => {
//     let filtered = courses
//     if (term) {
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(term.toLowerCase()) ||
//           course.courseCode.toLowerCase().includes(term.toLowerCase()) ||
//           course.professor.toLowerCase().includes(term.toLowerCase())
//       )
//     }
//     if (category !== "all") {
//       filtered = filtered.filter(
//         (course) => course.category && course.category.toLowerCase() === category.toLowerCase()
//       )
//     }
//     setFilteredCourses(filtered)
//   }

//   // Extract categories from courses
//   const categories = ["all", ...Array.from(new Set(courses.map((course) => course.category).filter(Boolean)))]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   }

//   const toggleCardExpansion = (courseId) => {
//     const newExpanded = new Set(expandedCards)
//     if (newExpanded.has(courseId)) {
//       newExpanded.delete(courseId)
//     } else {
//       newExpanded.add(courseId)
//     }
//     setExpandedCards(newExpanded)
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
//                 <p className="text-sm sm:text-base text-gray-600">Manage and track your enrolled courses</p>
//               </div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
//                   {filteredCourses.length} Courses
//                 </Badge>
//               </div>
//             </div>
//             {/* Search and Filter Section */}
//             <div className="flex gap-3 flex-col sm:flex-row sm:gap-4">
//               <div className="relative flex-grow">
//                 <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search courses, professors, or course codes..."
//                   className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//                   value={searchTerm}
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//               <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
//                 <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <SelectValue placeholder="Filter by category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </motion.div>

//         {/* Loading and Error States */}
//         {loading && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">Loading courses...</h3>
//           </div>
//         )}
//         {error && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-red-500 mb-2">{error}</h3>
//           </div>
//         )}

//         {/* Courses Grid */}
//         {!loading && !error && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto"
//           >
//             {filteredCourses.map((course) => {
//               const isExpanded = expandedCards.has(course._id || course.id)
//               return (
//                 <motion.div
//                   key={course._id || course.id}
//                   variants={cardVariants}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   transition={{ duration: 0.2 }}
//                   layout
//                 >
//                   <Card className="shadow-lg py-0 rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden">
//                     {/* Compact Header - Always Visible */}
//                     <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6 ">
//                       <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3">
//                         <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                           <motion.div
//                             className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md flex-shrink-0"
//                             whileHover={{ rotate: 5, scale: 1.05 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                           </motion.div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight mb-1 ">
//                               {course.title}
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
//                           </div>
//                         </div>
//                         <Badge
//                           variant="secondary"
//                           className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm flex-shrink-0"
//                         >
//                           {course.credits} Credits
//                         </Badge>
//                       </div>
//                       {/* View Details Button */}
//                       <motion.div className="mt-3 sm:mt-4 w-full">
//                         <Button
//                           onClick={() => toggleCardExpansion(course._id || course.id)}
//                           variant="outline"
//                           size="sm"
//                           className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm"
//                         >
//                           <motion.div
//                             animate={{ rotate: isExpanded ? 180 : 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="mr-2"
//                           >
//                             <HiChevronDown className="w-4 h-4" />
//                           </motion.div>
//                           {isExpanded ? "Hide Details" : "View Details"}
//                         </Button>
//                       </motion.div>
//                     </CardHeader>
//                     {/* Expandable Details Section */}
//                     <motion.div
//                       initial={false}
//                       animate={{
//                         height: isExpanded ? "auto" : 0,
//                         opacity: isExpanded ? 1 : 0,
//                       }}
//                       transition={{
//                         duration: 0.4,
//                         ease: [0.04, 0.62, 0.23, 0.98],
//                       }}
//                       className="overflow-hidden"
//                     >
//                       <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
//                         <motion.div
//                           initial={false}
//                           animate={{
//                             y: isExpanded ? 0 : -20,
//                             opacity: isExpanded ? 1 : 0,
//                           }}
//                           transition={{
//                             duration: 0.3,
//                             delay: isExpanded ? 0.1 : 0,
//                           }}
//                           className="space-y-3 sm:space-y-4"
//                         >
//                           {/* Course Description */}
//                           {/* <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100">
//                             <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{course.description}</p>
//                           </div> */}
//                           {/* Professor Info */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{course.professor}</p>
//                               <p className="text-xs text-gray-500">Course Instructor</p>
//                             </div>
//                           </motion.div>
//                           {/* Schedule Summary */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                 {course.lecturesPerWeek} lectures per week
//                               </p>
//                               <p className="text-xs text-gray-500 truncate">Next: {course.nextClass}</p>
//                             </div>
//                           </motion.div>
//                           {/* Detailed Schedule */}
//                           <div className="space-y-2">
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
//                               <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                               Weekly Schedule
//                             </h4>
//                             <div className="space-y-2">
//                               {course.timings && course.timings.map((timing, index) => (
//                                 <motion.div
//                                   key={index}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.1 }}
//                                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
//                                 >
//                                   <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                                     <div className="flex-1 min-w-0">
//                                       <span className="font-medium text-gray-800 text-xs sm:text-sm">{timing.day}</span>
//                                       <p className="text-xs text-gray-500">{timing.time}</p>
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center gap-1 text-xs text-gray-500 ml-4 sm:ml-0">
//                                     <HiLocationMarker className="w-3 h-3" />
//                                     <span>{timing.room}</span>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>
//                           {/* Action Buttons */}
//                           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                             <Button
//                               size="sm"
//                               className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm"
//                             >
//                               <HiBookOpen className="w-4 h-4 mr-2" />
//                               Course Materials
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="sm:w-auto border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
//                             >
//                               <HiStar className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </CardContent>
//                     </motion.div>
//                   </Card>
//                 </motion.div>
//               )
//             })}
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredCourses.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No courses found</h3>
//             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}
//       </div>
//     </main>
//   )
// }




// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   HiAcademicCap,
//   HiClock,
//   HiUser,
//   HiCalendar,
//   HiStar,
//   HiBookOpen,
//   HiLocationMarker,
//   HiSearch,
//   HiFilter,
//   HiChevronDown,
// } from "react-icons/hi"

// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Accepts studentEmail, year, and currentSem as props
// export default function CoursesPage({ studentEmail, year, currentSem }) {
//   const [courses, setCourses] = useState([])
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [expandedCards, setExpandedCards] = useState(new Set())
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   // Fetch courses from backend
//   useEffect(() => {
//     async function fetchCourses() {
//       setLoading(true)
//       setError(null)
//       let url, body
//       if (year === 1) {
//         url = "/api/student/getScheduleForYear1"
//         body = { studentEmail }
//       } else {
//         url = "/api/student/getSchedule"
//         body = { studentEmail, currentSem, year }
//       }
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         })
//         const data = await response.json()
//         if (data.success) {
//           setCourses(data.courses)
//           setFilteredCourses(data.courses)
//         } else {
//           setError(data.message || "Failed to fetch courses")
//         }
//       } catch (err) {
//         setError("Failed to fetch courses")
//       }
//       setLoading(false)
//     }
//     if (studentEmail && year && (year === 1 || currentSem)) {
//       fetchCourses()
//     }
//   }, [studentEmail, year, currentSem])

//   // Filter logic
//   const handleSearch = (term) => {
//     setSearchTerm(term)
//     filterCourses(term, selectedCategory)
//   }

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category)
//     filterCourses(searchTerm, category)
//   }

//   const filterCourses = (term, category) => {
//     let filtered = courses
//     if (term) {
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(term.toLowerCase()) ||
//           course.courseCode.toLowerCase().includes(term.toLowerCase()) ||
//           (course.profName && course.profName.join(", ").toLowerCase().includes(term.toLowerCase()))
//       )
//     }
//     if (category !== "all") {
//       filtered = filtered.filter(
//         (course) => course.forSemester && course.forSemester.toLowerCase() === category.toLowerCase()
//       )
//     }
//     setFilteredCourses(filtered)
//   }

//   // Extract categories from courses (using forSemester as category)
//   const categories = ["all", ...Array.from(new Set(courses.map((course) => course.forSemester).filter(Boolean)))]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   }

//   const toggleCardExpansion = (courseId) => {
//     const newExpanded = new Set(expandedCards)
//     if (newExpanded.has(courseId)) {
//       newExpanded.delete(courseId)
//     } else {
//       newExpanded.add(courseId)
//     }
//     setExpandedCards(newExpanded)
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
//                 <p className="text-sm sm:text-base text-gray-600">Manage and track your enrolled courses</p>
//               </div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
//                   {filteredCourses.length} Courses
//                 </Badge>
//               </div>
//             </div>
//             {/* Search and Filter Section */}
//             <div className="flex gap-3 flex-col sm:flex-row sm:gap-4">
//               <div className="relative flex-grow">
//                 <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search courses, professors, or course codes..."
//                   className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//                   value={searchTerm}
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//               <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
//                 <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <SelectValue placeholder="Filter by semester" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category === "all" ? "All Semesters" : category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </motion.div>

//         {/* Loading and Error States */}
//         {loading && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">Loading courses...</h3>
//           </div>
//         )}
//         {error && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-red-500 mb-2">{error}</h3>
//           </div>
//         )}

//         {/* Courses Grid */}
//         {!loading && !error && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto"
//           >
//             {filteredCourses.map((course) => {
//               const isExpanded = expandedCards.has(course._id)
//               return (
//                 <motion.div
//                   key={course._id}
//                   variants={cardVariants}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   transition={{ duration: 0.2 }}
//                   layout
//                 >
//                   <Card className="shadow-lg py-0 rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden">
//                     {/* Compact Header - Always Visible */}
//                     <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6 ">
//                       <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3">
//                         <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                           <motion.div
//                             className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md flex-shrink-0"
//                             whileHover={{ rotate: 5, scale: 1.05 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                           </motion.div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight mb-1 ">
//                               {course.title}
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
//                           </div>
//                         </div>
//                         <Badge
//                           variant="secondary"
//                           className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm flex-shrink-0"
//                         >
//                           {course.credits} Credits
//                         </Badge>
//                       </div>
//                       {/* View Details Button */}
//                       <motion.div className="mt-3 sm:mt-4 w-full">
//                         <Button
//                           onClick={() => toggleCardExpansion(course._id)}
//                           variant="outline"
//                           size="sm"
//                           className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm"
//                         >
//                           <motion.div
//                             animate={{ rotate: isExpanded ? 180 : 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="mr-2"
//                           >
//                             <HiChevronDown className="w-4 h-4" />
//                           </motion.div>
//                           {isExpanded ? "Hide Details" : "View Details"}
//                         </Button>
//                       </motion.div>
//                     </CardHeader>
//                     {/* Expandable Details Section */}
//                     <motion.div
//                       initial={false}
//                       animate={{
//                         height: isExpanded ? "auto" : 0,
//                         opacity: isExpanded ? 1 : 0,
//                       }}
//                       transition={{
//                         duration: 0.4,
//                         ease: [0.04, 0.62, 0.23, 0.98],
//                       }}
//                       className="overflow-hidden"
//                     >
//                       <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
//                         <motion.div
//                           initial={false}
//                           animate={{
//                             y: isExpanded ? 0 : -20,
//                             opacity: isExpanded ? 1 : 0,
//                           }}
//                           transition={{
//                             duration: 0.3,
//                             delay: isExpanded ? 0.1 : 0,
//                           }}
//                           className="space-y-3 sm:space-y-4"
//                         >
//                           {/* Professor Info */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
//                                 {course.profName && course.profName.join(", ")}
//                               </p>
//                               <p className="text-xs text-gray-500">Course Instructor(s)</p>
//                             </div>
//                           </motion.div>
//                           {/* Schedule Summary */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                 {course.schedule && course.schedule.length} session(s) per week
//                               </p>
//                               <p className="text-xs text-gray-500 truncate">
//                                 Next: {course.schedule && course.schedule[0] && course.schedule[0].day}{" "}
//                                 {course.schedule && course.schedule[0] && course.schedule[0].start &&
//                                   new Date(course.schedule[0].start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                               </p>
//                             </div>
//                           </motion.div>
//                           {/* Detailed Schedule */}
//                           <div className="space-y-2">
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
//                               <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                               Weekly Schedule
//                             </h4>
//                             <div className="space-y-2">
//                               {course.schedule && course.schedule.map((timing, index) => (
//                                 <motion.div
//                                   key={timing._id || index}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.1 }}
//                                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
//                                 >
//                                   <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                                     <div className="flex-1 min-w-0">
//                                       <span className="font-medium text-gray-800 text-xs sm:text-sm">{timing.day}</span>
//                                       <p className="text-xs text-gray-500">
//                                         {timing.start && new Date(timing.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timing.end && new Date(timing.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center gap-1 text-xs text-gray-500 ml-4 sm:ml-0">
//                                     <HiLocationMarker className="w-3 h-3" />
//                                     <span>{timing.room}</span>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>
//                           {/* Action Buttons */}
//                           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                             <Button
//                               size="sm"
//                               className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm"
//                             >
//                               <HiBookOpen className="w-4 h-4 mr-2" />
//                               Course Materials
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="sm:w-auto border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
//                             >
//                               <HiStar className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </motion.div>
//                       </CardContent>
//                     </motion.div>
//                   </Card>
//                 </motion.div>
//               )
//             })}
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredCourses.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No courses found</h3>
//             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}
//       </div>
//     </main>
//   )
// }






// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   HiAcademicCap,
//   HiClock,
//   HiUser,
//   HiCalendar,
//   HiStar,
//   HiBookOpen,
//   HiLocationMarker,
//   HiSearch,
//   HiFilter,
//   HiChevronDown,
// } from "react-icons/hi"

// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Helper to get next session from schedule
// function getNextSession(schedule) {
//   if (!Array.isArray(schedule) || schedule.length === 0) return null

//   const now = new Date()
//   // Map days to numbers for easier comparison (Sunday=0, Monday=1, ..., Saturday=6)
//   const dayMap = {
//     Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
//     Thursday: 4, Friday: 5, Saturday: 6
//   }

//   // Build a list of all upcoming sessions in the next 7 days
//   const upcoming = schedule.map((item) => {
//     if (!item.day || !item.start) return null
//     const classDay = dayMap[item.day]
//     if (classDay === undefined) return null

//     // Find the next date for this class
//     const nowDay = now.getDay()
//     let daysUntil = classDay - nowDay
//     if (daysUntil < 0 || (daysUntil === 0 && new Date(item.start).getHours() <= now.getHours() && new Date(item.start).getMinutes() <= now.getMinutes())) {
//       daysUntil += 7
//     }
//     // Set the next class date
//     const nextDate = new Date(now)
//     nextDate.setDate(now.getDate() + daysUntil)
//     // Set the time from the schedule
//     const startTime = new Date(item.start)
//     nextDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)
//     return { ...item, nextDate }
//   }).filter(Boolean)

//   // Find the soonest upcoming session
//   upcoming.sort((a, b) => a.nextDate - b.nextDate)
//   return upcoming[0] || null
// }

// export default function CoursesPage({ studentEmail, year, currentSem }) {
//   const [courses, setCourses] = useState([])
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [expandedCards, setExpandedCards] = useState(new Set())
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchCourses() {
//       setLoading(true)
//       setError(null)
//       let url, body
//       if (year === 1) {
//         url = "/api/student/getScheduleForYear1"
//         body = { studentEmail }
//       } else {
//         url = "/api/student/getSchedule"
//         body = { studentEmail, currentSem, year }
//       }
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         })
//         const data = await response.json()
//         if (data.success) {
//           setCourses(data.courses)
//           setFilteredCourses(data.courses)
//         } else {
//           setError(data.message || "Failed to fetch courses")
//         }
//       } catch (err) {
//         setError("Failed to fetch courses")
//       }
//       setLoading(false)
//     }
//     if (studentEmail && year && (year === 1 || currentSem)) {
//       fetchCourses()
//     }
//   }, [studentEmail, year, currentSem])

//   const handleSearch = (term) => {
//     setSearchTerm(term)
//     filterCourses(term, selectedCategory)
//   }

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category)
//     filterCourses(searchTerm, category)
//   }

//   const filterCourses = (term, category) => {
//     let filtered = courses
//     if (term) {
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(term.toLowerCase()) ||
//           course.courseCode.toLowerCase().includes(term.toLowerCase()) ||
//           (course.profName && course.profName.join(", ").toLowerCase().includes(term.toLowerCase()))
//       )
//     }
//     if (category !== "all") {
//       filtered = filtered.filter(
//         (course) => course.forSemester && course.forSemester.toLowerCase() === category.toLowerCase()
//       )
//     }
//     setFilteredCourses(filtered)
//   }

//   const categories = ["all", ...Array.from(new Set(courses.map((course) => course.forSemester).filter(Boolean)))]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   }

//   const toggleCardExpansion = (courseId) => {
//     const newExpanded = new Set(expandedCards)
//     if (newExpanded.has(courseId)) {
//       newExpanded.delete(courseId)
//     } else {
//       newExpanded.add(courseId)
//     }
//     setExpandedCards(newExpanded)
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col gap-4 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
//                 <p className="text-sm sm:text-base text-gray-600">Manage and track your enrolled courses</p>
//               </div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
//                   {filteredCourses.length} Courses
//                 </Badge>
//               </div>
//             </div>
//             {/* Search and Filter Section */}
//             <div className="flex gap-3 flex-col sm:flex-row sm:gap-4">
//               <div className="relative flex-grow">
//                 <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search courses, professors, or course codes..."
//                   className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//                   value={searchTerm}
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//               </div>
//               <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
//                 <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm">
//                   <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   <SelectValue placeholder="Filter by semester" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category === "all" ? "All Semesters" : category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </motion.div>

//         {/* Loading and Error States */}
//         {loading && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">Loading courses...</h3>
//           </div>
//         )}
//         {error && (
//           <div className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-red-500 mb-2">{error}</h3>
//           </div>
//         )}

//         {/* Courses Grid */}
//         {!loading && !error && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto"
//           >
//             {filteredCourses.map((course) => {
//               const isExpanded = expandedCards.has(course._id)
//               const nextSession = getNextSession(course.schedule)
//               return (
//                 <motion.div
//                   key={course._id}
//                   variants={cardVariants}
//                   whileHover={{ scale: 1.02, y: -5 }}
//                   transition={{ duration: 0.2 }}
//                   layout
//                 >
//                   <Card className="shadow-lg py-0 rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden">
//                     {/* Compact Header - Always Visible */}
//                     <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6 ">
//                       <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3">
//                         <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                           <motion.div
//                             className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md flex-shrink-0"
//                             whileHover={{ rotate: 5, scale: 1.05 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                           </motion.div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight mb-1 ">
//                               {course.title}
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
//                           </div>
//                         </div>
//                         <Badge
//                           variant="secondary"
//                           className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm flex-shrink-0"
//                         >
//                           {course.credits} Credits
//                         </Badge>
//                       </div>
                      
//                       {/* View Details Button */}
//                       <motion.div className="mt-3 sm:mt-4 w-full">
//                         <Button
//                           onClick={() => toggleCardExpansion(course._id)}
//                           variant="outline"
//                           size="sm"
//                           className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm"
//                         >
//                           <motion.div
//                             animate={{ rotate: isExpanded ? 180 : 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="mr-2"
//                           >
//                             <HiChevronDown className="w-4 h-4" />
//                           </motion.div>
//                           {isExpanded ? "Hide Details" : "View Details"}
//                         </Button>
//                       </motion.div>
//                     </CardHeader>
//                     {/* Expandable Details Section */}
//                     <motion.div
//                       initial={false}
//                       animate={{
//                         height: isExpanded ? "auto" : 0,
//                         opacity: isExpanded ? 1 : 0,
//                       }}
//                       transition={{
//                         duration: 0.4,
//                         ease: [0.04, 0.62, 0.23, 0.98],
//                       }}
//                       className="overflow-hidden"
//                     >
//                       <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
//                         <motion.div
//                           initial={false}
//                           animate={{
//                             y: isExpanded ? 0 : -20,
//                             opacity: isExpanded ? 1 : 0,
//                           }}
//                           transition={{
//                             duration: 0.3,
//                             delay: isExpanded ? 0.1 : 0,
//                           }}
//                           className="space-y-3 sm:space-y-4"
//                         >
//                           {/* Professor Info */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
//                                 {course.profName && course.profName.join(", ")}
//                               </p>
//                               <p className="text-xs text-gray-500">Course Instructor(s)</p>
//                             </div>
//                           </motion.div>
//                           {/* Schedule Summary */}
//                           <motion.div
//                             className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                             whileHover={{ x: 5 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
//                               <HiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                 {course.schedule && course.schedule.length} session(s) per week
//                               </p>
//                               <p className="text-xs text-gray-500 truncate">
//                                 Next: {nextSession
//                                   ? `${nextSession.day} ${nextSession.nextDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
//                                   : "N/A"}
//                               </p>
//                             </div>
//                           </motion.div>
//                           {/* Detailed Schedule */}
//                           <div className="space-y-2">
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
//                               <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                               Weekly Schedule
//                             </h4>
//                             <div className="space-y-2">
//                               {course.schedule && course.schedule.map((timing, index) => (
//                                 <motion.div
//                                   key={timing._id || index}
//                                   initial={{ opacity: 0, x: -20 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: index * 0.1 }}
//                                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
//                                 >
//                                   <div className="flex items-center gap-2 sm:gap-3">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                                     <div className="flex-1 min-w-0">
//                                       <span className="font-medium text-gray-800 text-xs sm:text-sm">{timing.day}</span>
//                                       <p className="text-xs text-gray-500">
//                                         {timing.start && new Date(timing.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timing.end && new Date(timing.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center gap-1 text-xs text-gray-500 ml-4 sm:ml-0">
//                                     <HiLocationMarker className="w-3 h-3" />
//                                     <span>{timing.room}</span>
//                                   </div>
//                                 </motion.div>
//                               ))}
//                             </div>
//                           </div>
//                           {/* Action Buttons */}
//                           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                             <Button
//                               size="sm"
//                               className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm py-2"
//                             >
//                               <HiBookOpen className="w-4 h-4 mr-2" />
//                               Course Materials
//                             </Button>
//                             {/* <Button
//                               size="sm"
//                               variant="outline"
//                               className="sm:w-auto border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
//                             >
//                               <HiStar className="w-4 h-4" />
//                             </Button> */}
//                           </div>
//                         </motion.div>
//                       </CardContent>
//                     </motion.div>
//                   </Card>
//                 </motion.div>
//               )
//             })}
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredCourses.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
//             <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No courses found</h3>
//             <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}
//       </div>
//     </main>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  HiAcademicCap,
  HiClock,
  HiUser,
  HiCalendar,
  HiBookOpen,
  HiLocationMarker,
  HiSearch,
  HiFilter,
  HiChevronDown,
} from "react-icons/hi"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Department code mapping
const DEPARTMENT_MAPPING = {
  CS: "Computer Science and Engineering",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  CE: "Civil Engineering",
  CH: "Chemical Engineering",
  BT: "Biotechnology",
  MT: "Metallurgical Engineering",
  PH: "Physics",
  CY: "Chemistry",
  MA: "Mathematics",
  HSS: "Humanities and Social Sciences",
  ECO: "Economics",
  PSY: "Psychology",
  ENG: "English",
  HIN: "Hindi",
  MGT: "Management",
  IE: "Industrial Engineering",
  AE: "Aerospace Engineering",
  BME: "Biomedical Engineering",
  ENV: "Environmental Engineering",
  GEO: "Geology",
  ARCH: "Architecture",
  PLAN: "Planning",
  STAT: "Statistics",
  BIO: "Biology",
  NANO: "Nanotechnology",
  MSE: "Materials Science and Engineering",
}

// Helper function to extract department code from course code
function extractDepartmentCode(courseCode) {
  if (!courseCode) return null
  // Extract letters before the first number (e.g., "CS 101" -> "CS", "HSS 201" -> "HSS")
  const match = courseCode.match(/^([A-Z]+)/)
  return match ? match[1] : null
}

// Helper to get next session from schedule
function getNextSession(schedule) {
  if (!Array.isArray(schedule) || schedule.length === 0) return null

  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentTime = now.getHours() * 60 + now.getMinutes() // Current time in minutes

  // Map days to numbers for easier comparison
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }

  // Build a list of all upcoming sessions in the next 7 days
  const upcoming = []

  schedule.forEach((item) => {
    if (!item.day || !item.start) return

    const classDay = dayMap[item.day]
    if (classDay === undefined) return

    const startTime = new Date(item.start)
    const classTimeInMinutes = startTime.getHours() * 60 + startTime.getMinutes()

    // Check if class is today and hasn't started yet
    if (classDay === currentDay && classTimeInMinutes > currentTime) {
      const nextDate = new Date(now)
      nextDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)
      upcoming.push({ ...item, nextDate, daysUntil: 0 })
    } else {
      // Find next occurrence of this day
      let daysUntil = classDay - currentDay
      if (daysUntil <= 0) {
        daysUntil += 7 // Next week
      }

      const nextDate = new Date(now)
      nextDate.setDate(now.getDate() + daysUntil)
      nextDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)
      upcoming.push({ ...item, nextDate, daysUntil })
    }
  })

  // Sort by next occurrence time and return the soonest
  upcoming.sort((a, b) => a.nextDate - b.nextDate)
  return upcoming[0] || null
}

export default function CoursesPage({ studentEmail, year, currentSem }) {

  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [expandedCards, setExpandedCards] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      setError(null)
      let url, body
      console.log("which year",year)
      if (year === 1) {
        url = "/api/student/myCourses"
        body = { studentEmail }
      } else {
        url = "/api/student/myCourses"
        body = { studentEmail}
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await response.json()
        console.log("Data",data)
        if (data.success) {
          setCourses(data.courses)
          setFilteredCourses(data.courses)
        } else {
          setError(data.message || "Failed to fetch courses")
        }
      } catch (err) {
        setError("Failed to fetch courses")
      }
      setLoading(false)
    }
    if (studentEmail && year ) {
      fetchCourses()
    }
  }, [studentEmail, year, currentSem])

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterCourses(term, selectedDepartment)
  }

  const handleDepartmentFilter = (department) => {
    setSelectedDepartment(department)
    filterCourses(searchTerm, department)
  }

  const filterCourses = (term, department) => {
    let filtered = courses
    if (term) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(term.toLowerCase()) ||
          (course.profName && course.profName.join(", ").toLowerCase().includes(term.toLowerCase())),
      )
    }
    if (department !== "all") {
      filtered = filtered.filter((course) => {
        const deptCode = extractDepartmentCode(course.courseCode)
        return deptCode === department
      })
    }
    setFilteredCourses(filtered)
  }

  // Get unique department codes from courses
  const availableDepartments = Array.from(
    new Set(courses.map((course) => extractDepartmentCode(course.courseCode)).filter(Boolean)),
  ).sort()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const toggleCardExpansion = (courseId) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId)
    } else {
      newExpanded.add(courseId)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col gap-4 mb-4 sm:mb-6">
            {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
                <p className="text-sm sm:text-base text-gray-600">Manage and track your enrolled courses</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                  {filteredCourses.length} Courses
                </Badge> */}
  
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  {/* Title and Description */}
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">My Courses</h1>
    <p className="text-sm sm:text-base text-gray-600">Manage and track your enrolled courses</p>
  </div>

  {/* Right-Aligned Badge always visible */}
  <div className="flex items-center gap-2">
    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
      {filteredCourses.length} Courses
    </Badge>
    {selectedDepartment !== "all" && (
      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
        {DEPARTMENT_MAPPING[selectedDepartment] || selectedDepartment}
      </Badge>
    )}
  </div>
</div>
            {/* Search and Filter Section */}
            <div className="flex gap-3 flex-col sm:flex-row sm:gap-4">
              <div className="relative flex-grow">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses, professors, or course codes..."
                  className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Select value={selectedDepartment} onValueChange={handleDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-64 bg-white/80 backdrop-blur-md border-gray-200 text-sm">
                  <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {availableDepartments.map((deptCode) => (
                    <SelectItem key={deptCode} value={deptCode}>
                      {DEPARTMENT_MAPPING[deptCode] || deptCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8 sm:py-12">
            <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">Loading courses...</h3>
          </div>
        )}
        {error && (
          <div className="text-center py-8 sm:py-12">
            <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-red-500 mb-2">{error}</h3>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {filteredCourses.map((course) => {
              const isExpanded = expandedCards.has(course._id)
              const nextSession = getNextSession(course.schedule)
              const departmentCode = extractDepartmentCode(course.courseCode)
              const departmentName = DEPARTMENT_MAPPING[departmentCode] || departmentCode

              return (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <Card className="shadow-lg py-0 rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Compact Header - Always Visible */}
                    <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6 ">
                      {/* <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3"> */}
                      <div className="flex flex-row items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <motion.div
                            className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-md flex-shrink-0"
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight mb-1 ">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
                              {/* {departmentCode && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-300"
                                >
                                  {departmentCode}
                                </Badge>
                              )} */}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm flex-shrink-0"
                        >
                          {course.credits} Credits
                        </Badge>
                      </div>

                      {/* View Details Button */}
                      <motion.div className="mt-3 sm:mt-4 w-full">
                        <Button
                          onClick={() => toggleCardExpansion(course._id)}
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm"
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="mr-2"
                          >
                            <HiChevronDown className="w-4 h-4" />
                          </motion.div>
                          {isExpanded ? "Hide Details" : "View Details"}
                        </Button>
                      </motion.div>
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
                          {/* Department Info */}
                          {departmentName && (
                            <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100">
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                <span className="font-semibold">Department:</span> {departmentName}
                              </p>
                              {course.forSemester && (
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                  <span className="font-semibold">Semester:</span> {course.forSemester}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Course Coordinator - Separate Section */}
                          {course.courseCoordinator && (
                            <motion.div
                              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                                <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                                  {course.courseCoordinator}
                                </p>
                                <p className="text-xs text-gray-500">Course Coordinator</p>
                              </div>
                            </motion.div>
                          )}

                          {/* Professor Info */}
                          <motion.div
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                              <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                                {course.profName && course.profName.join(", ")}
                              </p>
                              <p className="text-xs text-gray-500">Course Instructor(s)</p>
                            </div>
                          </motion.div>

                          
                          
                          {/* Schedule Summary */}
                          <motion.div
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                              <HiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-800">
                                {course.schedule && course.schedule.length} session(s) per week
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {nextSession ? (
                                  nextSession.daysUntil === 0 ? (
                                    <span className="text-green-600 font-medium">
                                      Today at{" "}
                                      {nextSession.nextDate.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      - {nextSession.room}
                                    </span>
                                  ) : nextSession.daysUntil === 1 ? (
                                    <span className="text-blue-600 font-medium">
                                      Tomorrow ({nextSession.day}) at{" "}
                                      {nextSession.nextDate.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      - {nextSession.room}
                                    </span>
                                  ) : (
                                    <span>
                                      Next: {nextSession.day} at{" "}
                                      {nextSession.nextDate.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      - {nextSession.room}
                                    </span>
                                  )
                                ) : (
                                  "No upcoming sessions"
                                )}
                              </p>
                            </div>
                          </motion.div>
                          {/* Detailed Schedule */}
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              Weekly Schedule
                            </h4>
                            <div className="space-y-2">
                              {course.schedule &&
                                course.schedule.map((timing, index) => (
                                  <motion.div
                                    key={timing._id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                      <div className="flex-1 min-w-0">
                                        <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                          {timing.day}
                                        </span>
                                        <p className="text-xs text-gray-500">
                                          {timing.start &&
                                            new Date(timing.start).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}{" "}
                                          -{" "}
                                          {timing.end &&
                                            new Date(timing.end).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 ml-4 sm:ml-0">
                                      <HiLocationMarker className="w-3 h-3" />
                                      <span>{timing.room}</span>
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </div>
                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm py-2"
                            >
                              <HiBookOpen className="w-4 h-4 mr-2" />
                              Course Materials
                            </Button>
                          </div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCourses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
            <HiAcademicCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">No courses found</h3>
            <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
