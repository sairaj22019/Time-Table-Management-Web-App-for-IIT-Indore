// // // "use client"
// // // import { useEffect, useState } from "react"
// // // import { motion } from "framer-motion"
// // // import { useRouter } from "next/navigation"
// // // import {
// // //   HiAcademicCap,
// // //   HiCalendar,
// // //   HiLocationMarker,
// // //   HiSearch,
// // //   HiFilter,
// // //   HiChevronDown,
// // //   HiSpeakerphone,
// // //   HiMail,
// // //   HiUserGroup,
// // // } from "react-icons/hi"
// // // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // // import { Input } from "@/components/ui/input"
// // // import { Button } from "@/components/ui/button"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import { useSession } from "next-auth/react"

// // // export default function ProfessorCoursesPage() {
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [selectedCategory, setSelectedCategory] = useState("all")
// // //   const [filteredCourses, setFilteredCourses] = useState([])
// // //   const [allCourses, setAllCourses] = useState([])
// // //   const [expandedCards, setExpandedCards] = useState([])

// // //   const { data: session, status } = useSession()
// // //   const router = useRouter()

// // //   useEffect(() => {
// // //     if (!session) return

// // //     const fetchCourses = async () => {
// // //       try {
// // //         const res = await fetch("/api/professor/getAllCourses", {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({ profEmail: session.user.email }),
// // //         })
// // //         const data = await res.json()
// // //         if (data.success) {
// // //           setAllCourses(data.data)
// // //           setFilteredCourses(data.data)
// // //         } else {
// // //           console.error("Error:", data.message)
// // //         }
// // //       } catch (error) {
// // //         console.error("Fetch error:", error)
// // //       }
// // //     }

// // //     fetchCourses()
// // //   }, [session])

// // //   const handleSearch = (term) => {
// // //     setSearchTerm(term)
// // //     filterCourses(term, selectedCategory)
// // //   }

// // //   const handleCategoryFilter = (category) => {
// // //     setSelectedCategory(category)
// // //     filterCourses(searchTerm, category)
// // //   }

// // //   const filterCourses = (term, category) => {
// // //     let filtered = allCourses

// // //     if (term) {
// // //       filtered = filtered.filter(
// // //         (course) =>
// // //           course.title.toLowerCase().includes(term.toLowerCase()) ||
// // //           course.courseCode.toLowerCase().includes(term.toLowerCase()),
// // //       )
// // //     }

// // //     if (category !== "all") {
// // //       filtered = filtered.filter((course) => course.category?.toLowerCase() === category.toLowerCase())
// // //     }

// // //     setFilteredCourses(filtered)
// // //   }

// // //   const categories = ["all", ...Array.from(new Set(allCourses.map((course) => course.category || "uncategorized")))]

// // //   const containerVariants = {
// // //     hidden: { opacity: 0 },
// // //     visible: {
// // //       opacity: 1,
// // //       transition: {
// // //         staggerChildren: 0.1,
// // //       },
// // //     },
// // //   }

// // //   const cardVariants = {
// // //     hidden: { opacity: 0, y: 20 },
// // //     visible: {
// // //       opacity: 1,
// // //       y: 0,
// // //       transition: {
// // //         duration: 0.5,
// // //         ease: "easeOut",
// // //       },
// // //     },
// // //   }

// // //   const toggleCardExpansion = (id) => {
// // //     setExpandedCards((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
// // //   }

// // //   const handlePoll = (courseId, courseName) => {
// // //     console.log(`Creating poll for course: ${courseName}`)
// // //   }

// // //   const handleMessage = (course) => {
// // //     // Navigate to send message page with comprehensive course data pre-filled
// // //     const queryParams = new URLSearchParams({
// // //       courseId: course._id,
// // //       courseCode: course.courseCode,
// // //       courseTitle: course.title,
// // //       professor: session?.user?.name || "You",
// // //       studentsCount: course.enrolledStudents?.length || 0,
// // //     })

// // //     // Use the correct path based on your app structure
// // //     router.push(`/professor/sendMessage?${queryParams.toString()}`)
// // //   }

// // //   return (
// // //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
// // //       <div className="w-full mx-auto">
// // //         {/* Loading and auth checks */}
// // //         {status === "loading" || !session ? (
// // //           <div className="text-center py-12">
// // //             <p className="text-gray-600 text-lg">{status === "loading" ? "Loading..." : "You are not signed in"}</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             {/* Header Section */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: -20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6 }}
// // //               className="mb-8"
// // //             >
// // //               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// // //                 <div>
// // //                   <h1 className="text-3xl font-bold text-gray-800 mb-2">My Teaching Courses</h1>
// // //                   <p className="text-gray-600">Manage and monitor your teaching courses</p>
// // //                 </div>
// // //                 <div className="flex items-center gap-2">
// // //                   <Badge variant="secondary" className="bg-blue-100 text-blue-700">
// // //                     {filteredCourses.length} Courses
// // //                   </Badge>
// // //                   <Badge variant="secondary" className="bg-green-100 text-green-700">
// // //                     Fall 2024
// // //                   </Badge>
// // //                 </div>
// // //               </div>

// // //               {/* Search and Filter Section */}
// // //               <div className="flex flex-col md:flex-row gap-4 mb-6">
// // //                 <div className="relative flex-1">
// // //                   <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // //                   <Input
// // //                     placeholder="Search courses or course codes..."
// // //                     className="pl-10 bg-white/80 backdrop-blur-md border-gray-200"
// // //                     value={searchTerm}
// // //                     onChange={(e) => handleSearch(e.target.value)}
// // //                   />
// // //                 </div>
// // //                 <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
// // //                   <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-md border-gray-200">
// // //                     <HiFilter className="w-4 h-4 mr-2" />
// // //                     <SelectValue placeholder="Filter by category" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {categories.map((category) => (
// // //                       <SelectItem key={category} value={category}>
// // //                         {category === "all" ? "All Categories" : category}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </motion.div>

// // //             {/* Courses Grid */}
// // //             <motion.div
// // //               variants={containerVariants}
// // //               initial="hidden"
// // //               animate="visible"
// // //               className="grid grid-cols-1 gap-5 sm:gap-6 max-w-7xl mx-auto"
// // //             >
// // //               {filteredCourses.map((course) => {
// // //                 const isExpanded = expandedCards.includes(course._id)
// // //                 return (
// // //                   <motion.div
// // //                     key={course._id}
// // //                     variants={cardVariants}
// // //                     whileHover={{ scale: 1.02, y: -5 }}
// // //                     transition={{ duration: 0.2 }}
// // //                     layout
// // //                   >
// // //                     <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0 pt-2">
// // //                       {/* Compact Header - Always Visible */}
// // //                       <CardHeader className="pb-4 sm:pb-6 pt-5 sm:pt-6">
// // //                         <div className="flex items-center justify-between mb-5">
// // //                           <div className="flex items-center gap-3 sm:gap-4">
// // //                             <motion.div
// // //                               className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
// // //                               whileHover={{ rotate: 5, scale: 1.05 }}
// // //                               transition={{ duration: 0.2 }}
// // //                             >
// // //                               <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// // //                             </motion.div>
// // //                             <div>
// // //                               <h3 className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl leading-tight mb-1">
// // //                                 {course.title}
// // //                               </h3>
// // //                               <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
// // //                             </div>
// // //                           </div>
// // //                           <Badge
// // //                             variant="secondary"
// // //                             className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm whitespace-nowrap"
// // //                           >
// // //                             {course.credits} Credits
// // //                           </Badge>
// // //                         </div>

// // //                         {/* Action Buttons */}
// // //                         <div className="flex gap-4 mb-6 sm:mb-7">
// // //                           <Button
// // //                             onClick={() => handlePoll(course._id, course.title)}
// // //                             size="sm"
// // //                             className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
// // //                           >
// // //                             <HiSpeakerphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
// // //                             Create Poll
// // //                           </Button>
// // //                           <Button
// // //                             onClick={() => handleMessage(course)}
// // //                             size="sm"
// // //                             className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
// // //                           >
// // //                             <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
// // //                             Send Message
// // //                           </Button>
// // //                         </div>

// // //                         {/* View Details Button */}
// // //                         <motion.div>
// // //                           <Button
// // //                             onClick={() => toggleCardExpansion(course._id)}
// // //                             variant="outline"
// // //                             size="sm"
// // //                             className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base"
// // //                           >
// // //                             <motion.div
// // //                               animate={{ rotate: isExpanded ? 180 : 0 }}
// // //                               transition={{ duration: 0.3 }}
// // //                               className="mr-2"
// // //                             >
// // //                               <HiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// // //                             </motion.div>
// // //                             {isExpanded ? "Hide Details" : "View Details"}
// // //                           </Button>
// // //                         </motion.div>
// // //                       </CardHeader>

// // //                       {/* Expandable Details Section */}
// // //                       <motion.div
// // //                         initial={false}
// // //                         animate={{
// // //                           height: isExpanded ? "auto" : 0,
// // //                           opacity: isExpanded ? 1 : 0,
// // //                         }}
// // //                         transition={{
// // //                           duration: 0.4,
// // //                           ease: [0.04, 0.62, 0.23, 0.98],
// // //                         }}
// // //                         className="overflow-hidden"
// // //                       >
// // //                         <CardContent className="pt-0 pb-5 sm:pb-6 px-5 sm:px-6">
// // //                           <motion.div
// // //                             initial={false}
// // //                             animate={{
// // //                               y: isExpanded ? 0 : -20,
// // //                               opacity: isExpanded ? 1 : 0,
// // //                             }}
// // //                             transition={{
// // //                               duration: 0.3,
// // //                               delay: isExpanded ? 0.1 : 0,
// // //                             }}
// // //                             className="space-y-5"
// // //                           >
// // //                             {/* Course Stats - Student Count */}
// // //                             <div className="grid grid-cols-1 gap-4">
// // //                               <motion.div
// // //                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
// // //                                 whileHover={{ x: 5 }}
// // //                                 transition={{ duration: 0.2 }}
// // //                               >
// // //                                 <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                                   <HiUserGroup className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
// // //                                 </div>
// // //                                 <div>
// // //                                   <p className="text-sm sm:text-base font-semibold text-gray-800">
// // //                                     {course.enrolledStudents?.length || 0} Students
// // //                                   </p>
// // //                                   <p className="text-xs sm:text-sm text-gray-500 font-medium">Enrolled</p>
// // //                                 </div>
// // //                               </motion.div>
// // //                             </div>

// // //                             {/* Course Description */}
// // //                             {course.description && (
// // //                               <motion.div
// // //                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
// // //                                 whileHover={{ x: 5 }}
// // //                                 transition={{ duration: 0.2 }}
// // //                               >
// // //                                 <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                                   <HiAcademicCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
// // //                                 </div>
// // //                                 <div>
// // //                                   <p className="text-sm sm:text-base font-semibold text-gray-800">Course Description</p>
// // //                                   <p className="text-xs sm:text-sm text-gray-500">{course.description}</p>
// // //                                 </div>
// // //                               </motion.div>
// // //                             )}

// // //                             {/* Detailed Schedule */}
// // //                             {course.schedule && course.schedule.length > 0 && (
// // //                               <div className="space-y-2 sm:space-y-3">
// // //                                 <h4 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2 mb-4">
// // //                                   <HiCalendar className="w-4 h-4" />
// // //                                   Weekly Schedule
// // //                                 </h4>
// // //                                 <div className="space-y-2 sm:space-y-3">
// // //                                   {course.schedule.map((sch, index) => (
// // //                                     <motion.div
// // //                                       key={index}
// // //                                       initial={{ opacity: 0, x: -20 }}
// // //                                       animate={{ opacity: 1, x: 0 }}
// // //                                       transition={{ delay: index * 0.1 }}
// // //                                       className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
// // //                                     >
// // //                                       <div className="flex items-center gap-3">
// // //                                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// // //                                         <div>
// // //                                           <span className="font-medium text-gray-800 text-sm sm:text-base">
// // //                                             {sch.day}
// // //                                           </span>
// // //                                           <p className="text-xs sm:text-sm text-gray-500">
// // //                                             {new Date(sch.start).toLocaleTimeString()} -{" "}
// // //                                             {new Date(sch.end).toLocaleTimeString()}
// // //                                           </p>
// // //                                         </div>
// // //                                       </div>
// // //                                       <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
// // //                                         <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                                         <span>{sch.room}</span>
// // //                                       </div>
// // //                                     </motion.div>
// // //                                   ))}
// // //                                 </div>
// // //                               </div>
// // //                             )}
// // //                           </motion.div>
// // //                         </CardContent>
// // //                       </motion.div>
// // //                     </Card>
// // //                   </motion.div>
// // //                 )
// // //               })}
// // //             </motion.div>

// // //             {/* Empty State */}
// // //             {filteredCourses.length === 0 && (
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// // //                 <HiAcademicCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// // //                 <h3 className="text-lg font-medium text-gray-500 mb-2">No courses found</h3>
// // //                 <p className="text-gray-400">Try adjusting your search or filter criteria</p>
// // //               </motion.div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </main>
// // //   )
// // // }


// // "use client"

// // import { useEffect, useState } from "react"
// // import { motion } from "framer-motion"
// // import { useRouter } from "next/navigation"
// // import {
// //   HiAcademicCap,
// //   HiCalendar,
// //   HiLocationMarker,
// //   HiSearch,
// //   HiFilter,
// //   HiChevronDown,
// //   HiSpeakerphone,
// //   HiMail,
// //   HiUserGroup,
// // } from "react-icons/hi"
// // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { useSession } from "next-auth/react"

// // export default function ProfessorCoursesPage() {
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedCategory, setSelectedCategory] = useState("all")
// //   const [filteredCourses, setFilteredCourses] = useState([])
// //   const [allCourses, setAllCourses] = useState([])
// //   const [expandedCards, setExpandedCards] = useState([])
// //   const { data: session, status } = useSession()
// //   const router = useRouter()

// //   useEffect(() => {
// //     if (!session) return

// //     const fetchCourses = async () => {
// //       try {
// //         const res = await fetch("/api/professor/getAllCourses", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ profEmail: session.user.email }),
// //         })
// //         const data = await res.json()
// //         if (data.success) {
// //           setAllCourses(data.data)
// //           setFilteredCourses(data.data)
// //           console.log(data);
// //         } else {
// //           console.error("Error:", data.message)
// //         }
// //       } catch (error) {
// //         console.error("Fetch error:", error)
// //       }
// //     }

// //     fetchCourses()
// //   }, [session])

// //   const handleSearch = (term) => {
// //     setSearchTerm(term)
// //     filterCourses(term, selectedCategory)
// //   }

// //   const handleCategoryFilter = (category) => {
// //     setSelectedCategory(category)
// //     filterCourses(searchTerm, category)
// //   }

// //   const filterCourses = (term, category) => {
// //     let filtered = allCourses

// //     if (term) {
// //       filtered = filtered.filter(
// //         (course) =>
// //           course.title.toLowerCase().includes(term.toLowerCase()) ||
// //           course.courseCode.toLowerCase().includes(term.toLowerCase()),
// //       )
// //     }

// //     if (category !== "all") {
// //       filtered = filtered.filter((course) => course.category?.toLowerCase() === category.toLowerCase())
// //     }

// //     setFilteredCourses(filtered)
// //   }

// //   const categories = ["all", ...Array.from(new Set(allCourses.map((course) => course.category || "uncategorized")))]

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   }

// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.5,
// //         ease: "easeOut",
// //       },
// //     },
// //   }

// //   const toggleCardExpansion = (id) => {
// //     setExpandedCards((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
// //   }

// //   const handlePoll = (course) => {
// //     console.log(`Creating poll for course: ${course.title}`)

// //     // Navigate to create poll page with comprehensive course data pre-filled
// //     const queryParams = new URLSearchParams({
// //       courseId: course._id,
// //       courseCode: course.courseCode,
// //       courseTitle: course.title,
// //       professor: session?.user?.email || "",
// //       studentsCount: course.enrolledStudents?.length || 0,
// //     })

// //     router.push(`/professor/createPoll?${queryParams.toString()}`)
// //   }

// //   const handleMessage = (course) => {
// //     // Navigate to send message page with comprehensive course data pre-filled
// //     const queryParams = new URLSearchParams({
// //       courseId: course._id,
// //       courseCode: course.courseCode,
// //       courseTitle: course.title,
// //       professor: session?.user?.email || "",
// //       studentsCount: course.enrolledStudents?.length || 0,
// //     })

// //     // Use the correct path based on your app structure
// //     router.push(`/professor/sendMessage?${queryParams.toString()}`)
// //   }

// //   return (
// //     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
// //       <div className="w-full mx-auto">
// //         {/* Loading and auth checks */}
// //         {status === "loading" || !session ? (
// //           <div className="text-center py-12">
// //             <p className="text-gray-600 text-lg">{status === "loading" ? "Loading..." : "You are not signed in"}</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Header Section */}
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="mb-8"
// //             >
// //               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// //                 <div>
// //                   <h1 className="text-3xl font-bold text-gray-800 mb-2">My Teaching Courses</h1>
// //                   <p className="text-gray-600">Manage and monitor your teaching courses</p>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Badge variant="secondary" className="bg-blue-100 text-blue-700">
// //                     {filteredCourses.length} Courses
// //                   </Badge>
// //                   <Badge variant="secondary" className="bg-green-100 text-green-700">
// //                     Fall 2024
// //                   </Badge>
// //                 </div>
// //               </div>

// //               {/* Search and Filter Section */}
// //               <div className="flex flex-col md:flex-row gap-4 mb-6">
// //                 <div className="relative flex-1">
// //                   <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <Input
// //                     placeholder="Search courses or course codes..."
// //                     className="pl-10 bg-white/80 backdrop-blur-md border-gray-200"
// //                     value={searchTerm}
// //                     onChange={(e) => handleSearch(e.target.value)}
// //                   />
// //                 </div>
// //                 <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
// //                   <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-md border-gray-200">
// //                     <HiFilter className="w-4 h-4 mr-2" />
// //                     <SelectValue placeholder="Filter by category" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {categories.map((category) => (
// //                       <SelectItem key={category} value={category}>
// //                         {category === "all" ? "All Categories" : category}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //             </motion.div>

// //             {/* Courses Grid */}
// //             <motion.div
// //               variants={containerVariants}
// //               initial="hidden"
// //               animate="visible"
// //               className="grid grid-cols-1 gap-5 sm:gap-6 max-w-7xl mx-auto"
// //             >
// //               {filteredCourses.map((course) => {
// //                 const isExpanded = expandedCards.includes(course._id)
// //                 return (
// //                   <motion.div
// //                     key={course._id}
// //                     variants={cardVariants}
// //                     whileHover={{ scale: 1.02, y: -5 }}
// //                     transition={{ duration: 0.2 }}
// //                     layout
// //                   >
// //                     <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0 pt-2">
// //                       {/* Compact Header - Always Visible */}
// //                       <CardHeader className="pb-4 sm:pb-6 pt-5 sm:pt-6">
// //                         <div className="flex items-center justify-between mb-5">
// //                           <div className="flex items-center gap-3 sm:gap-4">
// //                             <motion.div
// //                               className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
// //                               whileHover={{ rotate: 5, scale: 1.05 }}
// //                               transition={{ duration: 0.2 }}
// //                             >
// //                               <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
// //                             </motion.div>
// //                             <div>
// //                               <h3 className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl leading-tight mb-1">
// //                                 {course.title}
// //                               </h3>
// //                               <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
// //                             </div>
// //                           </div>
// //                           <Badge
// //                             variant="secondary"
// //                             className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm whitespace-nowrap"
// //                           >
// //                             {course.credits} Credits
// //                           </Badge>
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className="flex gap-4 mb-6 sm:mb-7">
// //                           <Button
// //                             onClick={() => handlePoll(course)}
// //                             size="sm"
// //                             className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
// //                           >
// //                             <HiSpeakerphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
// //                             Create Poll
// //                           </Button>
// //                           <Button
// //                             onClick={() => handleMessage(course)}
// //                             size="sm"
// //                             className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
// //                           >
// //                             <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
// //                             Send Message
// //                           </Button>
// //                         </div>

// //                         {/* View Details Button */}
// //                         <motion.div>
// //                           <Button
// //                             onClick={() => toggleCardExpansion(course._id)}
// //                             variant="outline"
// //                             size="sm"
// //                             className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base"
// //                           >
// //                             <motion.div
// //                               animate={{ rotate: isExpanded ? 180 : 0 }}
// //                               transition={{ duration: 0.3 }}
// //                               className="mr-2"
// //                             >
// //                               <HiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// //                             </motion.div>
// //                             {isExpanded ? "Hide Details" : "View Details"}
// //                           </Button>
// //                         </motion.div>
// //                       </CardHeader>

// //                       {/* Expandable Details Section */}
// //                       <motion.div
// //                         initial={false}
// //                         animate={{
// //                           height: isExpanded ? "auto" : 0,
// //                           opacity: isExpanded ? 1 : 0,
// //                         }}
// //                         transition={{
// //                           duration: 0.4,
// //                           ease: [0.04, 0.62, 0.23, 0.98],
// //                         }}
// //                         className="overflow-hidden"
// //                       >
// //                         <CardContent className="pt-0 pb-5 sm:pb-6 px-5 sm:px-6">
// //                           <motion.div
// //                             initial={false}
// //                             animate={{
// //                               y: isExpanded ? 0 : -20,
// //                               opacity: isExpanded ? 1 : 0,
// //                             }}
// //                             transition={{
// //                               duration: 0.3,
// //                               delay: isExpanded ? 0.1 : 0,
// //                             }}
// //                             className="space-y-5"
// //                           >
// //                             {/* Course Stats - Student Count */}
// //                             <div className="grid grid-cols-1 gap-4">
// //                               <motion.div
// //                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
// //                                 whileHover={{ x: 5 }}
// //                                 transition={{ duration: 0.2 }}
// //                               >
// //                                 <div className="p-2 bg-white rounded-lg shadow-sm">
// //                                   <HiUserGroup className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
// //                                 </div>
// //                                 <div>
// //                                   <p className="text-sm sm:text-base font-semibold text-gray-800">
// //                                     {course.enrolledStudents?.length || 0} Students
// //                                   </p>
// //                                   <p className="text-xs sm:text-sm text-gray-500 font-medium">Enrolled</p>
// //                                 </div>
// //                               </motion.div>
// //                             </div>

// //                             {/* Course Description */}
// //                             {course.description && (
// //                               <motion.div
// //                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
// //                                 whileHover={{ x: 5 }}
// //                                 transition={{ duration: 0.2 }}
// //                               >
// //                                 <div className="p-2 bg-white rounded-lg shadow-sm">
// //                                   <HiAcademicCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
// //                                 </div>
// //                                 <div>
// //                                   <p className="text-sm sm:text-base font-semibold text-gray-800">Course Description</p>
// //                                   <p className="text-xs sm:text-sm text-gray-500">{course.description}</p>
// //                                 </div>
// //                               </motion.div>
// //                             )}
// //                             {/* Detailed Schedule */}
// //                             {course.schedule && course.schedule.length > 0 && (
// //                               <div className="space-y-2 sm:space-y-3">
// //                                 <h4 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2 mb-4">
// //                                   <HiCalendar className="w-4 h-4" />
// //                                   Weekly Schedule
// //                                 </h4>
// //                                 <div className="space-y-2 sm:space-y-3">
// //                                   {course.schedule.map((sch, index) => (
// //                                     <motion.div
// //                                       key={index}
// //                                       initial={{ opacity: 0, x: -20 }}
// //                                       animate={{ opacity: 1, x: 0 }}
// //                                       transition={{ delay: index * 0.1 }}
// //                                       className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
// //                                     >
// //                                       <div className="flex items-center gap-3">
// //                                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// //                                         <div>
// //                                           <span className="font-medium text-gray-800 text-sm sm:text-base">
// //                                             {sch.day}
// //                                           </span>
// //                                           <p className="text-xs sm:text-sm text-gray-500">
// //                                             {new Date(sch.start).toLocaleTimeString()} -{" "}
// //                                             {new Date(sch.end).toLocaleTimeString()}
// //                                           </p>
// //                                         </div>
// //                                       </div>
// //                                       <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
// //                                         <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4" />
// //                                         <span>{sch.room}</span>
// //                                       </div>
// //                                     </motion.div>
// //                                   ))}
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </motion.div>
// //                         </CardContent>
// //                       </motion.div>
// //                     </Card>
// //                   </motion.div>
// //                 )
// //               })}
// //             </motion.div>

// //             {/* Empty State */}
// //             {filteredCourses.length === 0 && (
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// //                 <HiAcademicCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// //                 <h3 className="text-lg font-medium text-gray-500 mb-2">No courses found</h3>
// //                 <p className="text-gray-400">Try adjusting your search or filter criteria</p>
// //               </motion.div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </main>
// //   )
// // }
// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { useRouter } from "next/navigation"
// import {
//   HiAcademicCap,
//   HiCalendar,
//   HiLocationMarker,
//   HiSearch,
//   HiFilter,
//   HiChevronDown,
//   HiSpeakerphone,
//   HiMail,
//   HiUserGroup,
//   HiPlus,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useSession } from "next-auth/react"
// import SlotRoomPopup from "@/components/slotRoomPopup"

// export default function ProfessorCoursesPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [allCourses, setAllCourses] = useState([])
//   const [expandedCards, setExpandedCards] = useState([])
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (!session) return

//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("/api/professor/getAllCourses", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ profEmail: session.user.email }),
//         })
//         const data = await res.json()
//         if (data.success) {
//           setAllCourses(data.data)
//           setFilteredCourses(data.data)
//           console.log(data)
//         } else {
//           console.error("Error:", data.message)
//         }
//       } catch (error) {
//         console.error("Fetch error:", error)
//       }
//     }

//     fetchCourses()
//   }, [session])

//   const handleSearch = (term) => {
//     setSearchTerm(term)
//     filterCourses(term, selectedCategory)
//   }

//   const handleCategoryFilter = (category) => {
//     setSelectedCategory(category)
//     filterCourses(searchTerm, category)
//   }

//   const filterCourses = (term, category) => {
//     let filtered = allCourses

//     if (term) {
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(term.toLowerCase()) ||
//           course.courseCode.toLowerCase().includes(term.toLowerCase()),
//       )
//     }

//     if (category !== "all") {
//       filtered = filtered.filter((course) => course.category?.toLowerCase() === category.toLowerCase())
//     }

//     setFilteredCourses(filtered)
//   }

//   const categories = ["all", ...Array.from(new Set(allCourses.map((course) => course.category || "uncategorized")))]

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
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   }

//   const toggleCardExpansion = (id) => {
//     setExpandedCards((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
//   }

//   const handlePoll = (course) => {
//     console.log(`Creating poll for course: ${course.title}`)
//     // Navigate to create poll page with comprehensive course data pre-filled
//     const queryParams = new URLSearchParams({
//       courseId: course._id,
//       courseCode: course.courseCode,
//       courseTitle: course.title,
//       professor: session?.user?.email || "",
//       studentsCount: course.enrolledStudents?.length || 0,
//     })
//     router.push(`/professor/createPoll?${queryParams.toString()}`)
//   }

//   const handleMessage = (course) => {
//     // Navigate to send message page with comprehensive course data pre-filled
//     const queryParams = new URLSearchParams({
//       courseId: course._id,
//       courseCode: course.courseCode,
//       courseTitle: course.title,
//       professor: session?.user?.email || "",
//       studentsCount: course.enrolledStudents?.length || 0,
//     })
//     // Use the correct path based on your app structure
//     router.push(`/professor/sendMessage?${queryParams.toString()}`)
//   }

//   const handleAddTutorialSlot = async (course, data) => {
//     try {
//       console.log(`Adding tutorial slot for course: ${course.title}`)
//       console.log("Slot data:", data)

//       // Here you would typically make an API call to add the tutorial slot
//        const response = await fetch("/api/professor/addTutorialSlot", {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({
//            courseId: course._id,
//            slotName: data.slotName,
//            roomName: data.roomName,
//          }),
//        })

//       // For now, just log the data
      
//     } catch (error) {
//       console.error("Error adding tutorial slot:", error)
//       alert("Failed to add tutorial slot. Please try again.")
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
//       <div className="w-full mx-auto">
//         {/* Loading and auth checks */}
//         {status === "loading" || !session ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">{status === "loading" ? "Loading..." : "You are not signed in"}</p>
//           </div>
//         ) : (
//           <>
//             {/* Header Section */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8"
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-800 mb-2">My Teaching Courses</h1>
//                   <p className="text-gray-600">Manage and monitor your teaching courses</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant="secondary" className="bg-blue-100 text-blue-700">
//                     {filteredCourses.length} Courses
//                   </Badge>
//                   <Badge variant="secondary" className="bg-green-100 text-green-700">
//                     Fall 2024
//                   </Badge>
//                 </div>
//               </div>

//               {/* Search and Filter Section */}
//               <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <Input
//                     placeholder="Search courses or course codes..."
//                     className="pl-10 bg-white/80 backdrop-blur-md border-gray-200"
//                     value={searchTerm}
//                     onChange={(e) => handleSearch(e.target.value)}
//                   />
//                 </div>
//                 <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
//                   <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-md border-gray-200">
//                     <HiFilter className="w-4 h-4 mr-2" />
//                     <SelectValue placeholder="Filter by category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category === "all" ? "All Categories" : category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </motion.div>

//             {/* Courses Grid */}
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 gap-5 sm:gap-6 max-w-7xl mx-auto"
//             >
//               {filteredCourses.map((course) => {
//                 const isExpanded = expandedCards.includes(course._id)
//                 const shouldShowTutorialSlot = course.tutorials > 0 && !course.isGiven

//                 return (
//                   <motion.div
//                     key={course._id}
//                     variants={cardVariants}
//                     whileHover={{ scale: 1.02, y: -5 }}
//                     transition={{ duration: 0.2 }}
//                     layout
//                   >
//                     <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0 pt-2">
//                       {/* Compact Header - Always Visible */}
//                       <CardHeader className="pb-4 sm:pb-6 pt-5 sm:pt-6">
//                         <div className="flex items-center justify-between mb-5">
//                           <div className="flex items-center gap-3 sm:gap-4">
//                             <motion.div
//                               className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
//                               whileHover={{ rotate: 5, scale: 1.05 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                             </motion.div>
//                             <div>
//                               <h3 className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl leading-tight mb-1">
//                                 {course.title}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
//                             </div>
//                           </div>
//                           <Badge
//                             variant="secondary"
//                             className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm whitespace-nowrap"
//                           >
//                             {course.credits} Credits
//                           </Badge>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-4 mb-6 sm:mb-7">
//                           <Button
//                             onClick={() => handlePoll(course)}
//                             size="sm"
//                             className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
//                           >
//                             <HiSpeakerphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
//                             Create Poll
//                           </Button>
//                           <Button
//                             onClick={() => handleMessage(course)}
//                             size="sm"
//                             className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
//                           >
//                             <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
//                             Send Message
//                           </Button>
//                         </div>

//                         {/* Tutorial Slot Button - Show only if tutorials > 0 and isGiven is false */}
//                         {shouldShowTutorialSlot && (
//                           <div className="mb-4">
//                             <SlotRoomPopup
//                               buttonText="Add Tutorial Slot"
//                               dialogTitle="Add Tutorial Slot"
//                               dialogDescription={`Add a tutorial slot for ${course.courseCode} - ${course.title}`}
//                               onSubmit={(data) => handleAddTutorialSlot(course, data)}
//                               buttonVariant="outline"
//                               buttonSize="sm"
//                               buttonIcon={<HiPlus className="w-4 h-4" />}
//                             />
//                           </div>
//                         )}

//                         {/* View Details Button */}
//                         <motion.div>
//                           <Button
//                             onClick={() => toggleCardExpansion(course._id)}
//                             variant="outline"
//                             size="sm"
//                             className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base"
//                           >
//                             <motion.div
//                               animate={{ rotate: isExpanded ? 180 : 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="mr-2"
//                             >
//                               <HiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </motion.div>
//                             {isExpanded ? "Hide Details" : "View Details"}
//                           </Button>
//                         </motion.div>
//                       </CardHeader>

//                       {/* Expandable Details Section */}
//                       <motion.div
//                         initial={false}
//                         animate={{
//                           height: isExpanded ? "auto" : 0,
//                           opacity: isExpanded ? 1 : 0,
//                         }}
//                         transition={{
//                           duration: 0.4,
//                           ease: [0.04, 0.62, 0.23, 0.98],
//                         }}
//                         className="overflow-hidden"
//                       >
//                         <CardContent className="pt-0 pb-5 sm:pb-6 px-5 sm:px-6">
//                           <motion.div
//                             initial={false}
//                             animate={{
//                               y: isExpanded ? 0 : -20,
//                               opacity: isExpanded ? 1 : 0,
//                             }}
//                             transition={{
//                               duration: 0.3,
//                               delay: isExpanded ? 0.1 : 0,
//                             }}
//                             className="space-y-5"
//                           >
//                             {/* Course Structure Information */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                               <motion.div
//                                 className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
//                                   <HiAcademicCap className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{course.lectures}</p>
//                                 <p className="text-xs text-gray-500 font-medium">Lectures</p>
//                               </motion.div>

//                               <motion.div
//                                 className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
//                                   <HiUserGroup className="w-4 h-4 text-green-600" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{course.tutorials}</p>
//                                 <p className="text-xs text-gray-500 font-medium">Tutorials</p>
//                               </motion.div>

//                               <motion.div
//                                 className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
//                                   <HiLocationMarker className="w-4 h-4 text-purple-600" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{course.practicals}</p>
//                                 <p className="text-xs text-gray-500 font-medium">Practicals</p>
//                               </motion.div>

//                               <motion.div
//                                 className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
//                                   <HiAcademicCap className="w-4 h-4 text-orange-600" />
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800">{course.credits}</p>
//                                 <p className="text-xs text-gray-500 font-medium">Credits</p>
//                               </motion.div>
//                             </div>

//                             {/* Course Stats - Student Count */}
//                             <div className="grid grid-cols-1 gap-4">
//                               <motion.div
//                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
//                                 whileHover={{ x: 5 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm">
//                                   <HiUserGroup className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
//                                 </div>
//                                 <div>
//                                   <p className="text-sm sm:text-base font-semibold text-gray-800">
//                                     {course.enrolledStudents?.length || 0} Students
//                                   </p>
//                                   <p className="text-xs sm:text-sm text-gray-500 font-medium">Enrolled</p>
//                                 </div>
//                               </motion.div>
//                             </div>

//                             {/* Course Description */}
//                             {course.description && (
//                               <motion.div
//                                 className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                                 whileHover={{ x: 5 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <div className="p-2 bg-white rounded-lg shadow-sm">
//                                   <HiAcademicCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
//                                 </div>
//                                 <div>
//                                   <p className="text-sm sm:text-base font-semibold text-gray-800">Course Description</p>
//                                   <p className="text-xs sm:text-sm text-gray-500">{course.description}</p>
//                                 </div>
//                               </motion.div>
//                             )}

//                             {/* Detailed Schedule */}
//                             {course.schedule && course.schedule.length > 0 && (
//                               <div className="space-y-2 sm:space-y-3">
//                                 <h4 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2 mb-4">
//                                   <HiCalendar className="w-4 h-4" />
//                                   Weekly Schedule
//                                 </h4>
//                                 <div className="space-y-2 sm:space-y-3">
//                                   {course.schedule.map((sch, index) => (
//                                     <motion.div
//                                       key={index}
//                                       initial={{ opacity: 0, x: -20 }}
//                                       animate={{ opacity: 1, x: 0 }}
//                                       transition={{ delay: index * 0.1 }}
//                                       className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
//                                     >
//                                       <div className="flex items-center gap-3">
//                                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                         <div>
//                                           <span className="font-medium text-gray-800 text-sm sm:text-base">
//                                             {sch.day}
//                                           </span>
//                                           <p className="text-xs sm:text-sm text-gray-500">
//                                             {new Date(sch.start).toLocaleTimeString()} -{" "}
//                                             {new Date(sch.end).toLocaleTimeString()}
//                                           </p>
//                                         </div>
//                                       </div>
//                                       <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
//                                         <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4" />
//                                         <span>{sch.room}</span>
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </motion.div>
//                         </CardContent>
//                       </motion.div>
//                     </Card>
//                   </motion.div>
//                 )
//               })}
//             </motion.div>

//             {/* Empty State */}
//             {filteredCourses.length === 0 && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//                 <HiAcademicCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-500 mb-2">No courses found</h3>
//                 <p className="text-gray-400">Try adjusting your search or filter criteria</p>
//               </motion.div>
//             )}
//           </>
//         )}
//       </div>
//     </main>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  HiAcademicCap,
  HiCalendar,
  HiLocationMarker,
  HiSearch,
  HiFilter,
  HiChevronDown,
  HiSpeakerphone,
  HiMail,
  HiUserGroup,
  HiPlus,
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"
import SlotRoomPopup from "@/components/slotRoomPopup"
import { useToast } from "@/hooks/use-toast"

export default function ProfessorCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredCourses, setFilteredCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [expandedCards, setExpandedCards] = useState([])
  const [addingTutorialSlot, setAddingTutorialSlot] = useState(null) // Track which course is having tutorial slot added
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!session) return

    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/professor/getAllCourses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profEmail: session.user.email }),
        })
        const data = await res.json()
        if (data.success) {
          setAllCourses(data.data)
          setFilteredCourses(data.data)
          console.log(data)
        } else {
          console.error("Error:", data.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchCourses()
  }, [session])

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterCourses(term, selectedCategory)
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    filterCourses(searchTerm, category)
  }

  const filterCourses = (term, category) => {
    let filtered = allCourses

    if (term) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(term.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(term.toLowerCase()),
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((course) => course.category?.toLowerCase() === category.toLowerCase())
    }

    setFilteredCourses(filtered)
  }

  const categories = ["all", ...Array.from(new Set(allCourses.map((course) => course.category || "uncategorized")))]

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

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handlePoll = (course) => {
    console.log(`Creating poll for course: ${course.title}`)
    // Navigate to create poll page with comprehensive course data pre-filled
    const queryParams = new URLSearchParams({
      courseId: course._id,
      courseCode: course.courseCode,
      courseTitle: course.title,
      professor: session?.user?.email || "",
      studentsCount: course.enrolledStudents?.length || 0,
    })
    router.push(`/professor/createPoll?${queryParams.toString()}`)
  }

  const handleMessage = (course) => {
    // Navigate to send message page with comprehensive course data pre-filled
    const queryParams = new URLSearchParams({
      courseId: course._id,
      courseCode: course.courseCode,
      courseTitle: course.title,
      professor: session?.user?.email || "",
      studentsCount: course.enrolledStudents?.length || 0,
    })
    // Use the correct path based on your app structure
    router.push(`/professor/sendMessage?${queryParams.toString()}`)
  }

  const handleAddTutorialSlot = async (course, data) => {
    setAddingTutorialSlot(course._id) // Set loading state for this specific course

    try {
      console.log(`Adding tutorial slot for course: ${course.title}`)
      console.log("Slot data:", data)

      const response = await fetch("/api/course/addTutorial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          slot: data.slotName,
          room: data.roomName,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Success - show success toast
        toast({
          title: "Tutorial Slot Added Successfully! 🎉",
          description: `Tutorial slot "${data.slotName}" has been added to ${course.courseCode} in ${data.roomName}.`,
          variant: "default",
        })

        // Update the course data in state to reflect the change
        const updatedCourses = allCourses.map((c) => {
          if (c._id === course._id) {
            return {
              ...c,
              isGiven: true, // Mark as given so the button disappears
              tutorialSlots: [...(c.tutorialSlots || []), { slotName: data.slotName, roomName: data.roomName }],
            }
          }
          return c
        })

        setAllCourses(updatedCourses)
        setFilteredCourses(updatedCourses)

        console.log("Tutorial slot added successfully:", result)
      } else {
        // API returned an error
        const errorMessage = result.message || "Failed to add tutorial slot"

        toast({
          title: "Failed to Add Tutorial Slot ❌",
          description: errorMessage,
          variant: "destructive",
        })

        console.error("API Error:", result)
      }
    } catch (error) {
      // Network or other errors
      console.error("Error adding tutorial slot:", error)

      toast({
        title: "Network Error ⚠️",
        description: "Unable to connect to the server. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setAddingTutorialSlot(null) // Clear loading state
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
      <div className="w-full mx-auto">
        {/* Loading and auth checks */}
        {status === "loading" || !session ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{status === "loading" ? "Loading..." : "You are not signed in"}</p>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">My Teaching Courses</h1>
                  <p className="text-gray-600">Manage and monitor your teaching courses</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {filteredCourses.length} Courses
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Fall 2024
                  </Badge>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search courses or course codes..."
                    className="pl-10 bg-white/80 backdrop-blur-md border-gray-200"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-md border-gray-200">
                    <HiFilter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Courses Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-5 sm:gap-6 max-w-7xl mx-auto"
            >
              {filteredCourses.map((course) => {
                const isExpanded = expandedCards.includes(course._id)
                const shouldShowTutorialSlot = course.tutorials > 0 && !course.isGiven
                const isAddingSlot = addingTutorialSlot === course._id

                return (
                  <motion.div
                    key={course._id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                    layout
                  >
                    <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0 pt-2">
                      {/* Compact Header - Always Visible */}
                      <CardHeader className="pb-4 sm:pb-6 pt-5 sm:pt-6">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <motion.div
                              className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl leading-tight mb-1">
                                {course.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.courseCode}</p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm whitespace-nowrap"
                          >
                            {course.credits} Credits
                          </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6 sm:mb-7">
                          <Button
                            onClick={() => handlePoll(course)}
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
                          >
                            <HiSpeakerphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                            Create Poll
                          </Button>
                          <Button
                            onClick={() => handleMessage(course)}
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base font-medium"
                          >
                            <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>

                        {/* Tutorial Slot Button - Show only if tutorials > 0 and isGiven is false */}
                        {shouldShowTutorialSlot && (
                          <div className="mb-4">
                            <div className="relative">
                              <SlotRoomPopup
                                buttonText={isAddingSlot ? "Adding..." : "Add Tutorial Slot"}
                                dialogTitle="Add Tutorial Slot"
                                dialogDescription={`Add a tutorial slot for ${course.courseCode} - ${course.title}`}
                                onSubmit={(data) => handleAddTutorialSlot(course, data)}
                                buttonVariant="outline"
                                buttonSize="sm"
                                buttonIcon={<HiPlus className="w-4 h-4" />}
                              />
                              {isAddingSlot && (
                                <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tutorial Slot Added Indicator */}
                        {course.tutorials > 0 && course.isGiven && (
                          <div className="mb-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                              ✅ Tutorial Slot Added
                            </Badge>
                          </div>
                        )}

                        {/* View Details Button */}
                        <motion.div>
                          <Button
                            onClick={() => toggleCardExpansion(course._id)}
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 py-2.5 sm:py-3 text-sm sm:text-base"
                          >
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="mr-2"
                            >
                              <HiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                        <CardContent className="pt-0 pb-5 sm:pb-6 px-5 sm:px-6">
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
                            className="space-y-5"
                          >
                            {/* Course Structure Information */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <motion.div
                                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
                                  <HiAcademicCap className="w-4 h-4 text-blue-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{course.lectures}</p>
                                <p className="text-xs text-gray-500 font-medium">Lectures</p>
                              </motion.div>

                              <motion.div
                                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
                                  <HiUserGroup className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{course.tutorials}</p>
                                <p className="text-xs text-gray-500 font-medium">Tutorials</p>
                              </motion.div>

                              <motion.div
                                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
                                  <HiLocationMarker className="w-4 h-4 text-purple-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{course.practicals}</p>
                                <p className="text-xs text-gray-500 font-medium">Practicals</p>
                              </motion.div>

                              <motion.div
                                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
                                  <HiAcademicCap className="w-4 h-4 text-orange-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">{course.credits}</p>
                                <p className="text-xs text-gray-500 font-medium">Credits</p>
                              </motion.div>
                            </div>

                            {/* Course Stats - Student Count */}
                            <div className="grid grid-cols-1 gap-4">
                              <motion.div
                                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                  <HiUserGroup className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                                    {course.enrolledStudents?.length || 0} Students
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Enrolled</p>
                                </div>
                              </motion.div>
                            </div>

                            {/* Course Description */}
                            {course.description && (
                              <motion.div
                                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                  <HiAcademicCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="text-sm sm:text-base font-semibold text-gray-800">Course Description</p>
                                  <p className="text-xs sm:text-sm text-gray-500">{course.description}</p>
                                </div>
                              </motion.div>
                            )}

                            {/* Detailed Schedule */}
                            {course.schedule && course.schedule.length > 0 && (
                              <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2 mb-4">
                                  <HiCalendar className="w-4 h-4" />
                                  Weekly Schedule
                                </h4>
                                <div className="space-y-2 sm:space-y-3">
                                  {course.schedule.map((sch, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div>
                                          <span className="font-medium text-gray-800 text-sm sm:text-base">
                                            {sch.day}
                                          </span>
                                          <p className="text-xs sm:text-sm text-gray-500">
                                            {new Date(sch.start).toLocaleTimeString()} -{" "}
                                            {new Date(sch.end).toLocaleTimeString()}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                                        <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>{sch.room}</span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </CardContent>
                      </motion.div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <HiAcademicCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No courses found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
