
// "use client"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { useRouter } from "next/navigation"
// import { FaUserGraduate } from "react-icons/fa"
// import { FaUser } from "react-icons/fa6"
// import {
//   HiSearch,
//   HiUsers,
//   HiAcademicCap,
//   HiCalendar,
//   HiPencil,
//   HiTrash,
//   HiChevronDown,
//   HiFilter,
//   HiMail,
//   HiIdentification,
//   HiOfficeBuilding,
//   HiRefresh,
//   HiCheck,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import toast from "react-hot-toast"

// const studentDepartments = [
//   { value: "che", label: "Chemical Engineering" },
//   { value: "ce", label: "Civil Engineering" },
//   { value: "cse", label: "Computer Science and Engineering" },
//   { value: "ee", label: "Electrical Engineering" },
//   { value: "ep", label: "Engineering Physics" },
//   { value: "sse", label: "Space Sciences and Engineering" },
//   { value: "mc", label: "Mathematics and Computing" },
//   { value: "me", label: "Mechanical Engineering" },
//   { value: "mems", label: "Metallurgical Engineering & Materials Science" },
// ]

// const professorDepartments = [
//   { value: "che", label: "Chemistry" },
//   { value: "ce", label: "Civil Engineering" },
//   { value: "cse", label: "Computer Science and Engineering" },
//   { value: "ee", label: "Electrical Engineering" },
//   { value: "ep", label: "Engineering Physics" },
//   { value: "hs", label: "Humanities and Social Sciences" },
//   { value: "phy", label: "Physics" },
//   { value: "ma", label: "Mathematics" },
//   { value: "bse", label: "Biosciences and Biomedical Engineering" },
//   { value: "me", label: "Mechanical Engineering" },
//   { value: "mems", label: "Metallurgical Engineering & Materials Science" },
//   { value: "sse", label: "Astronomy, Astrophysics and Space Engineering" },
// ]

// export default function ViewAllUsersPage() {
//   const [users, setUsers] = useState([])
//   const [filteredUsers, setFilteredUsers] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedUserType, setSelectedUserType] = useState("all")
//   const [loading, setLoading] = useState(true)
//   const [expandedCards, setExpandedCards] = useState([])
//   const [error, setError] = useState(null)
//   const [showCoursesModal, setShowCoursesModal] = useState(false)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [showDepartmentModal, setShowDepartmentModal] = useState(false)
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false)
//   const [editingUser, setEditingUser] = useState(null)
//   const [newDepartment, setNewDepartment] = useState("")
//   const [oldDepartment, setOldDepartment] = useState("")
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deletingUser, setDeletingUser] = useState(null)
//   const router = useRouter()

//   const toggleCardExpansion = (userId) => {
//     setExpandedCards((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
//   }

//   const handleViewCourses = (user) => {
//     setSelectedUser(user)
//     setShowCoursesModal(true)
//   }

//   const handleCourseClick = (courseCode) => {
//     router.push(`/admin/courses?courseCode=${encodeURIComponent(courseCode)}`)
//     setShowCoursesModal(false)
//   }

//   const handleEditDepartment = (user) => {
//     setEditingUser(user)
//     setOldDepartment(user.department)
//     setNewDepartment(user.department)
//     setShowDepartmentModal(true)
//   }

//   const handleDepartmentChange = () => {
//     if (newDepartment === oldDepartment) {
//       setShowDepartmentModal(false)
//       return
//     }
//     setShowDepartmentModal(false)
//     setShowConfirmationModal(true)
//   }

//   const confirmDepartmentChange = async () => {
//     try {
//       const response = await fetch(`/api/admin/changeDepartment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: editingUser.email,
//           newDepartment: getCurrentDepartmentValue(newDepartment, editingUser.type),
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update department")
//       }

//       // Update the user in the local state
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user.id === editingUser.id ? { ...user, department: newDepartment } : user)),
//       )
//       setShowConfirmationModal(false)
//       toast.success(`Department changed successfully`)
//     } catch (error) {
//       toast.error("Failed to update department. Please try again.")
//     }
//   }

//   const handleDeleteUser = (user) => {
//     setDeletingUser(user)
//     setShowDeleteModal(true)
//   }

//   const confirmDeleteUser = async () => {
//     try {
//       const response = await fetch(`/api/admin/deleteUser`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: deletingUser.email,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to delete user")
//       }

//       // Remove user from local state
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletingUser.id))
//       setShowDeleteModal(false)
//       toast.success(`User deleted successfully`)
//     } catch (error) {
//       toast.error("Failed to delete user. Please try again.")
//     }
//   }

//   const getDepartmentLabel = (value, userType) => {
//     const departments = userType === "student" ? studentDepartments : professorDepartments
//     const dept = departments.find((d) => d.value === value)
//     return dept ? dept.label : value
//   }

//   const getCurrentDepartmentValue = (departmentLabel, userType) => {
//     const departments = userType === "student" ? studentDepartments : professorDepartments
//     const dept = departments.find((d) => d.label === departmentLabel)
//     return dept ? dept.value : departmentLabel
//   }

//   // Replace the fetchUsers function with:
//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await fetch("/api/admin/viewUsers")
//       const data = await response.json()
//       if (!data.success) {
//         throw new Error(data.message || "Failed to fetch users")
//       }
//       // Transform backend data to frontend format
//       const transformedUsers = []
//       // Transform students
//       data.students.forEach((student, index) => {
//         transformedUsers.push({
//           id: `student_${index}`, // Generate unique ID
//           type: "student",
//           email: student.email,
//           username: student.username,
//           rollNo: student.rollno,
//           department: getDepartmentLabel(student.department, "student"), // Convert short form to full form
//           year: `${student.year}${getYearSuffix(student.year)} Year`,
//           enrolledCoursesCount: student.enrolledClasses?.length || 0,
//           enrolledClasses: student.enrolledClasses || [],
//         })
//       })
//       // Transform professors
//       data.professors.forEach((professor, index) => {
//         transformedUsers.push({
//           id: `professor_${index}`, // Generate unique ID
//           type: "professor",
//           email: professor.email,
//           username: professor.username,
//           department: getDepartmentLabel(professor.department, "professor"), // Convert short form to full form
//           teachingCoursesCount: professor.teachingClasses?.length || 0,
//           teachingClasses: professor.teachingClasses || [],
//         })
//       })
//       setUsers(transformedUsers)
//       setFilteredUsers(transformedUsers)
//     } catch (error) {
//       console.error("Error fetching users:", error)
//       setError("Failed to fetch users. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add helper function for year suffix
//   const getYearSuffix = (year) => {
//     if (year === 1) return "st"
//     if (year === 2) return "nd"
//     if (year === 3) return "rd"
//     return "th"
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     let filtered = users
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (user.rollNo && user.rollNo.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//     }
//     if (selectedUserType !== "all") {
//       filtered = filtered.filter((user) => user.type === selectedUserType)
//     }
//     setFilteredUsers(filtered)
//   }, [searchTerm, selectedUserType, users])

//   const totalStudents = users.filter((user) => user.type === "student").length
//   const totalProfessors = users.filter((user) => user.type === "professor").length

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
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
//         <div className="w-full mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading users...</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
//         <div className="w-full mx-auto">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="text-red-500 mb-4">
//                 <HiUsers className="w-12 h-12 mx-auto" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-600 mb-2">Error Loading Users</h3>
//               <p className="text-sm text-gray-500 mb-4">{error}</p>
//               <Button onClick={fetchUsers} className="bg-blue-600 hover:bg-blue-700">
//                 Try Again
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
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
//                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">All Users</h1>
//                 <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//                   Manage students and professors across all departments
//                 </p>
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//                 <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
//                   {totalStudents} Students
//                 </Badge>
//                 <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
//                   {totalProfessors} Professors
//                 </Badge>
//                 <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2">
//                   <HiRefresh className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                   Update Student Years
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
//               placeholder="Search users by email, username, department, or roll number..."
//               className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Select value={selectedUserType} onValueChange={setSelectedUserType}>
//             <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
//               <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
//               <SelectValue placeholder="Filter by user type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Users</SelectItem>
//               <SelectItem value="student">Students</SelectItem>
//               <SelectItem value="professor">Professors</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         {/* Users Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 gap-4 sm:gap-6 max-w-5xl mx-auto"
//         >
//           {filteredUsers.map((user) => {
//             const isExpanded = expandedCards.includes(user.id)
//             const isStudent = user.type === "student"
//             return (
//               <motion.div
//                 key={user.id}
//                 variants={cardVariants}
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 transition={{ duration: 0.2 }}
//                 layout
//               >
//                 <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0">
//                   {/* Compact Header - Always Visible */}
//                   <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-4 lg:p-6">
//                     <div className="flex items-start sm:items-center justify-between gap-3">
//                       <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//                         <motion.div
//                           className={`p-2 sm:p-3 ${
//                             isStudent
//                               ? "bg-gradient-to-br from-green-500 to-green-600"
//                               : "bg-gradient-to-br from-purple-500 to-purple-600"
//                           } rounded-xl shadow-md flex-shrink-0`}
//                           whileHover={{ rotate: 5, scale: 1.05 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           {isStudent ? (
//                             <FaUserGraduate className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                           ) : (
//                             <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                           )}
//                         </motion.div>
//                         <div className="min-w-0 flex-1">
//                           <h3 className="font-bold text-sm sm:text-base lg:text-lg leading-tight mb-1">
//                             {user.username}
//                           </h3>
//                           <p className="text-xs text-gray-500 font-medium truncate">{user.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
//                         <Badge
//                           variant="secondary"
//                           className={`${
//                             isStudent ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
//                           } font-semibold px-2 sm:px-3 py-1 text-xs`}
//                         >
//                           {isStudent ? "Student" : "Professor"}
//                         </Badge>
//                       </div>
//                     </div>
//                     {/* Action Buttons */}
//                     <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
//                       <Button
//                         onClick={() => toggleCardExpansion(user.id)}
//                         variant="outline"
//                         size="sm"
//                         className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
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
//                         onClick={() => handleDeleteUser(user)}
//                         className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
//                       >
//                         <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
//                         <span className="hidden sm:inline ml-1">Delete</span>
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
//                     <CardContent className="pt-0 pb-4 px-3 sm:px-4 lg:px-6">
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
//                         {/* Email */}
//                         <motion.div
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <HiMail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="text-xs sm:text-sm font-medium text-gray-800">{user.email}</p>
//                             <p className="text-xs text-gray-500">Email Address</p>
//                           </div>
//                         </motion.div>
//                         {/* Username */}
//                         <motion.div
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <HiIdentification className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="text-xs sm:text-sm font-medium text-gray-800">{user.username}</p>
//                             <p className="text-xs text-gray-500">Username</p>
//                           </div>
//                         </motion.div>
//                         {/* Department with Edit Button */}
//                         <motion.div
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                           whileHover={{ x: 5 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <HiOfficeBuilding className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-xs sm:text-sm font-medium text-gray-800">{user.department}</p>
//                             <p className="text-xs text-gray-500">Department</p>
//                           </div>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => handleEditDepartment(user)}
//                             className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-2 py-1 bg-transparent"
//                           >
//                             <HiPencil className="w-3 h-3" />
//                             <span className="hidden sm:inline ml-1">Edit</span>
//                           </Button>
//                         </motion.div>
//                         {/* Student-specific fields */}
//                         {isStudent && (
//                           <>
//                             {/* Roll Number */}
//                             <motion.div
//                               className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                               whileHover={{ x: 5 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-white rounded-lg shadow-sm">
//                                 <HiIdentification className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                               </div>
//                               <div>
//                                 <p className="text-xs sm:text-sm font-medium text-gray-800">{user.rollNo}</p>
//                                 <p className="text-xs text-gray-500">Roll Number</p>
//                               </div>
//                             </motion.div>
//                             {/* Year */}
//                             <motion.div
//                               className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                               whileHover={{ x: 5 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-white rounded-lg shadow-sm">
//                                 <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
//                               </div>
//                               <div>
//                                 <p className="text-xs sm:text-sm font-medium text-gray-800">{user.year}</p>
//                                 <p className="text-xs text-gray-500">Academic Year</p>
//                               </div>
//                             </motion.div>
//                             {/* Enrolled Courses Button */}
//                             <motion.div
//                               className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
//                               whileHover={{ x: 5 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-white rounded-lg shadow-sm">
//                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                               </div>
//                               <div className="flex-1">
//                                 <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                   {user.enrolledCoursesCount} Enrolled Courses
//                                 </p>
//                                 <p className="text-xs text-gray-500">View student's enrolled courses</p>
//                               </div>
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => handleViewCourses(user)}
//                                 className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs px-2 py-1 bg-transparent"
//                               >
//                                 View Courses
//                               </Button>
//                             </motion.div>
//                           </>
//                         )}
//                         {/* Professor-specific fields */}
//                         {!isStudent && (
//                           <>
//                             {/* Teaching Courses Button */}
//                             <motion.div
//                               className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
//                               whileHover={{ x: 5 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <div className="p-2 bg-white rounded-lg shadow-sm">
//                                 <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//                               </div>
//                               <div className="flex-1">
//                                 <p className="text-xs sm:text-sm font-medium text-gray-800">
//                                   {user.teachingCoursesCount} Teaching Courses
//                                 </p>
//                                 <p className="text-xs text-gray-500">View professor's teaching courses</p>
//                               </div>
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => handleViewCourses(user)}
//                                 className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs px-2 py-1 bg-transparent"
//                               >
//                                 View Courses
//                               </Button>
//                             </motion.div>
//                           </>
//                         )}
//                       </motion.div>
//                     </CardContent>
//                   </motion.div>
//                 </Card>
//               </motion.div>
//             )
//           })}
//         </motion.div>
//         {filteredUsers.length === 0 && !loading && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <HiUsers className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
//             </div>
//             <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No users found</h3>
//             <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
//           </motion.div>
//         )}
//       </div>
//       {/* Courses Modal */}
//       <Dialog open={showCoursesModal} onOpenChange={setShowCoursesModal}>
//         <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
//           {/* Modal Header */}
//           <DialogHeader className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {selectedUser?.type === "student" ? (
//                     <HiAcademicCap className="w-6 h-6 text-white" />
//                   ) : (
//                     <HiAcademicCap className="w-6 h-6 text-white" />
//                   )}
//                 </motion.div>
//                 <div>
//                   <DialogTitle className="text-xl font-bold text-gray-800">
//                     {selectedUser?.type === "student" ? "Enrolled Courses" : "Teaching Courses"}
//                   </DialogTitle>
//                   <p className="text-sm text-gray-600">{selectedUser?.username}</p>
//                 </div>
//               </div>
//             </div>
//           </DialogHeader>
//           {/* Modal Content */}
//           <div className="p-6 max-h-96 overflow-y-auto">
//             <div className="space-y-3">
//               {selectedUser &&
//                 (selectedUser.type === "student"
//                   ? selectedUser.enrolledClasses?.map((course, index) => (
//                       <motion.div
//                         key={course._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         onClick={() => handleCourseClick(course.courseCode)}
//                         className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
//                       >
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <HiAcademicCap className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
//                           <p className="text-xs text-gray-500">{course.courseCode}</p>
//                         </div>
//                         <div className="text-gray-400">
//                           <HiChevronDown className="w-4 h-4 rotate-[-90deg]" />
//                         </div>
//                       </motion.div>
//                     ))
//                   : selectedUser.teachingClasses?.map((course, index) => (
//                       <motion.div
//                         key={course._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         onClick={() => handleCourseClick(course.courseCode)}
//                         className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
//                       >
//                         <div className="p-2 bg-blue-100 rounded-lg">
//                           <HiAcademicCap className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
//                           <p className="text-xs text-gray-500">{course.courseCode}</p>
//                         </div>
//                         <div className="text-gray-400">
//                           <HiChevronDown className="w-4 h-4 rotate-[-90deg]" />
//                         </div>
//                       </motion.div>
//                     )))}
//             </div>
//             {selectedUser &&
//               ((selectedUser.type === "student" &&
//                 (!selectedUser.enrolledClasses || selectedUser.enrolledClasses.length === 0)) ||
//                 (selectedUser.type === "professor" &&
//                   (!selectedUser.teachingClasses || selectedUser.teachingClasses.length === 0))) && (
//                 <motion.div
//                   className="text-center py-8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="text-gray-400 mb-4">
//                     <HiAcademicCap className="w-12 h-12 mx-auto" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-600 mb-2">No courses found</h3>
//                   <p className="text-sm text-gray-500">
//                     {selectedUser.type === "student"
//                       ? "This student is not enrolled in any courses"
//                       : "This professor is not teaching any courses"}
//                   </p>
//                 </motion.div>
//               )}
//           </div>
//         </DialogContent>
//       </Dialog>
//       {/* Department Edit Modal */}
//       <Dialog open={showDepartmentModal} onOpenChange={setShowDepartmentModal}>
//         <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
//           <DialogHeader className="p-6 border-b border-gray-200">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <HiOfficeBuilding className="w-6 h-6 text-white" />
//               </motion.div>
//               <div>
//                 <DialogTitle className="text-xl font-bold text-gray-800">Edit Department</DialogTitle>
//                 <p className="text-sm text-gray-600">{editingUser?.username}</p>
//               </div>
//             </div>
//           </DialogHeader>
//           <div className="p-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">Select Department</label>
//                 <Select
//                   value={getCurrentDepartmentValue(newDepartment, editingUser?.type)}
//                   onValueChange={(value) => setNewDepartment(getDepartmentLabel(value, editingUser?.type))}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {(editingUser?.type === "student" ? studentDepartments : professorDepartments).map((dept) => (
//                       <SelectItem key={dept.value} value={dept.value}>
//                         {dept.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
//           <DialogFooter className="p-6 border-t border-gray-200">
//             <Button variant="outline" onClick={() => setShowDepartmentModal(false)} className="mr-2">
//               Cancel
//             </Button>
//             <Button onClick={handleDepartmentChange} className="bg-green-600 hover:bg-green-700 text-white">
//               Update Department
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       {/* Confirmation Modal */}
//       <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
//         <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
//           <DialogHeader className="p-6 border-b border-gray-200">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-md"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <HiCheck className="w-6 h-6 text-white" />
//               </motion.div>
//               <div>
//                 <DialogTitle className="text-xl font-bold text-gray-800">Confirm Department Change</DialogTitle>
//               </div>
//             </div>
//           </DialogHeader>
//           <div className="p-6">
//             <p className="text-gray-700 mb-4">
//               Are you sure you want to change the department of{" "}
//               <span className="font-semibold text-gray-900">{editingUser?.username}</span> from{" "}
//               <span className="font-semibold text-red-600">{oldDepartment}</span> to{" "}
//               <span className="font-semibold text-green-600">{newDepartment}</span>?
//             </p>
//             <p className="text-sm text-gray-500">This action cannot be undone.</p>
//           </div>
//           <DialogFooter className="p-6 border-t border-gray-200">
//             <Button variant="outline" onClick={() => setShowConfirmationModal(false)} className="mr-2">
//               Cancel
//             </Button>
//             <Button onClick={confirmDepartmentChange} className="bg-green-600 hover:bg-green-700 text-white">
//               Confirm Change
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       {/* Delete Confirmation Modal */}
//       <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
//         <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
//           <DialogHeader className="p-6 border-b border-gray-200">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <HiTrash className="w-6 h-6 text-white" />
//               </motion.div>
//               <div>
//                 <DialogTitle className="text-xl font-bold text-gray-800">Confirm User Deletion</DialogTitle>
//               </div>
//             </div>
//           </DialogHeader>
//           <div className="p-6">
//             <p className="text-gray-700 mb-4">
//               Are you sure you want to delete{" "}
//               <span className="font-semibold text-gray-900">{deletingUser?.username}</span>?
//             </p>
//             <p className="text-sm text-gray-500">
//               This action cannot be undone and will permanently remove all user data.
//             </p>
//           </div>
//           <DialogFooter className="p-6 border-t border-gray-200">
//             <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="mr-2">
//               Cancel
//             </Button>
//             <Button onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">
//               Delete User
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </main>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FaUserGraduate } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"
import {
  HiSearch,
  HiUsers,
  HiAcademicCap,
  HiCalendar,
  HiPencil,
  HiTrash,
  HiChevronDown,
  HiFilter,
  HiMail,
  HiIdentification,
  HiOfficeBuilding,
  HiRefresh,
  HiCheck,
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import toast from "react-hot-toast"

const studentDepartments = [
  { value: "che", label: "Chemical Engineering" },
  { value: "ce", label: "Civil Engineering" },
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "ep", label: "Engineering Physics" },
  { value: "sse", label: "Space Sciences and Engineering" },
  { value: "mc", label: "Mathematics and Computing" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "mems", label: "Metallurgical Engineering & Materials Science" },
]

const professorDepartments = [
  { value: "che", label: "Chemistry" },
  { value: "ce", label: "Civil Engineering" },
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "ep", label: "Engineering Physics" },
  { value: "hs", label: "Humanities and Social Sciences" },
  { value: "phy", label: "Physics" },
  { value: "ma", label: "Mathematics" },
  { value: "bse", label: "Biosciences and Biomedical Engineering" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "mems", label: "Metallurgical Engineering & Materials Science" },
  { value: "sse", label: "Astronomy, Astrophysics and Space Engineering" },
]

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
  { value: "6", label: "6th Year" },
]

export default function ViewAllUsersPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUserType, setSelectedUserType] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [loading, setLoading] = useState(true)
  const [expandedCards, setExpandedCards] = useState([])
  const [error, setError] = useState(null)
  const [showCoursesModal, setShowCoursesModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [newDepartment, setNewDepartment] = useState("")
  const [oldDepartment, setOldDepartment] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingUser, setDeletingUser] = useState(null)
  const router = useRouter()

  const toggleCardExpansion = (userId) => {
    setExpandedCards((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleViewCourses = (user) => {
    setSelectedUser(user)
    setShowCoursesModal(true)
  }

  const handleCourseClick = (courseCode) => {
    router.push(`/admin/courses?courseCode=${encodeURIComponent(courseCode)}`)
    setShowCoursesModal(false)
  }

  const handleEditDepartment = (user) => {
    setEditingUser(user)
    setOldDepartment(user.department)
    setNewDepartment(user.department)
    setShowDepartmentModal(true)
  }

  const handleDepartmentChange = () => {
    if (newDepartment === oldDepartment) {
      setShowDepartmentModal(false)
      return
    }
    setShowDepartmentModal(false)
    setShowConfirmationModal(true)
  }

  const confirmDepartmentChange = async () => {
    try {
      const response = await fetch(`/api/admin/changeDepartment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: editingUser.email,
          newDepartment: getCurrentDepartmentValue(newDepartment, editingUser.type),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to update department")
      }
      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editingUser.id ? { ...user, department: newDepartment } : user)),
      )
      setShowConfirmationModal(false)
      toast.success(`Department changed successfully`)
    } catch (error) {
      toast.error("Failed to update department. Please try again.")
    }
  }

  const handleDeleteUser = (user) => {
    setDeletingUser(user)
    setShowDeleteModal(true)
  }

  const confirmDeleteUser = async () => {
    try {
      const response = await fetch(`/api/admin/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: deletingUser.email,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user")
      }
      // Remove user from local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletingUser.id))
      setShowDeleteModal(false)
      toast.success(`User deleted successfully`)
    } catch (error) {
      toast.error("Failed to delete user. Please try again.")
    }
  }

  const getDepartmentLabel = (value, userType) => {
    const departments = userType === "student" ? studentDepartments : professorDepartments
    const dept = departments.find((d) => d.value === value)
    return dept ? dept.label : value
  }

  const getCurrentDepartmentValue = (departmentLabel, userType) => {
    const departments = userType === "student" ? studentDepartments : professorDepartments
    const dept = departments.find((d) => d.label === departmentLabel)
    return dept ? dept.value : departmentLabel
  }

  // Reset additional filters when user type changes
  const handleUserTypeChange = (value) => {
    setSelectedUserType(value)
    setSelectedYear("all")
    setSelectedDepartment("all")
  }

  // Replace the fetchUsers function with:
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/viewUsers")
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch users")
      }
      // Transform backend data to frontend format
      const transformedUsers = []
      // Transform students
      data.students.forEach((student, index) => {
        transformedUsers.push({
          id: `student_${index}`, // Generate unique ID
          type: "student",
          email: student.email,
          username: student.username,
          rollNo: student.rollno,
          department: getDepartmentLabel(student.department, "student"), // Convert short form to full form
          year: `${student.year}${getYearSuffix(student.year)} Year`,
          yearNumber: student.year, // Keep the numeric year for filtering
          enrolledCoursesCount: student.enrolledClasses?.length || 0,
          enrolledClasses: student.enrolledClasses || [],
        })
      })
      // Transform professors
      data.professors.forEach((professor, index) => {
        transformedUsers.push({
          id: `professor_${index}`, // Generate unique ID
          type: "professor",
          email: professor.email,
          username: professor.username,
          department: getDepartmentLabel(professor.department, "professor"), // Convert short form to full form
          teachingCoursesCount: professor.teachingClasses?.length || 0,
          teachingClasses: professor.teachingClasses || [],
        })
      })
      setUsers(transformedUsers)
      setFilteredUsers(transformedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to fetch users. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Add helper function for year suffix
  const getYearSuffix = (year) => {
    if (year === 1) return "st"
    if (year === 2) return "nd"
    if (year === 3) return "rd"
    return "th"
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    let filtered = users

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.rollNo && user.rollNo.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by user type
    if (selectedUserType !== "all") {
      filtered = filtered.filter((user) => user.type === selectedUserType)
    }

    // Filter by year (only for students)
    if (selectedUserType === "student" && selectedYear !== "all") {
      filtered = filtered.filter((user) => user.yearNumber === Number.parseInt(selectedYear))
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      const departmentValue = selectedDepartment
      const departments = selectedUserType === "student" ? studentDepartments : professorDepartments
      const dept = departments.find((d) => d.value === departmentValue)
      if (dept) {
        filtered = filtered.filter((user) => user.department === dept.label)
      }
    }

    setFilteredUsers(filtered)
  }, [searchTerm, selectedUserType, selectedYear, selectedDepartment, users])

  const totalStudents = users.filter((user) => user.type === "student").length
  const totalProfessors = users.filter((user) => user.type === "professor").length

  // Calculate search bar width based on number of filters
  const getSearchBarWidth = () => {
    if (selectedUserType === "student") return "flex-1" // 3 filters total
    if (selectedUserType === "professor") return "flex-[2]" // 2 filters total
    return "flex-1" // 1 filter total
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
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <HiUsers className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Error Loading Users</h3>
              <p className="text-sm text-gray-500 mb-4">{error}</p>
              <Button onClick={fetchUsers} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-2 sm:p-4 lg:p-6">
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
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">All Users</h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                  Manage students and professors across all departments
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  {totalStudents} Students
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                  {totalProfessors} Professors
                </Badge>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2">
                  <HiRefresh className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Update Student Years
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className={`relative ${getSearchBarWidth()}`}>
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by email, username, department, or roll number..."
              className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* User Type Filter */}
          <Select value={selectedUserType} onValueChange={handleUserTypeChange}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
              <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <SelectValue placeholder="Filter by user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="professor">Professors</SelectItem>
            </SelectContent>
          </Select>

          {/* Year Filter - Only show for students */}
          {selectedUserType === "student" && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
                <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {yearOptions.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Department Filter - Show for students and professors */}
          {(selectedUserType === "student" || selectedUserType === "professor") && (
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
                <HiOfficeBuilding className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {(selectedUserType === "student" ? studentDepartments : professorDepartments).map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Users Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {filteredUsers.map((user) => {
            const isExpanded = expandedCards.includes(user.id)
            const isStudent = user.type === "student"
            return (
              <motion.div
                key={user.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden py-0">
                  {/* Compact Header - Always Visible */}
                  <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <motion.div
                          className={`p-2 sm:p-3 ${
                            isStudent
                              ? "bg-gradient-to-br from-green-500 to-green-600"
                              : "bg-gradient-to-br from-purple-500 to-purple-600"
                          } rounded-xl shadow-md flex-shrink-0`}
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isStudent ? (
                            <FaUserGraduate className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            <FaUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg leading-tight mb-1">
                            {user.username}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                        <Badge
                          variant="secondary"
                          className={`${
                            isStudent ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
                          } font-semibold px-2 sm:px-3 py-1 text-xs`}
                        >
                          {isStudent ? "Student" : "Professor"}
                        </Badge>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <Button
                        onClick={() => toggleCardExpansion(user.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
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
                        onClick={() => handleDeleteUser(user)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2 bg-transparent"
                      >
                        <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline ml-1">Delete</span>
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
                    <CardContent className="pt-0 pb-4 px-3 sm:px-4 lg:px-6">
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
                        {/* Email */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiMail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{user.email}</p>
                            <p className="text-xs text-gray-500">Email Address</p>
                          </div>
                        </motion.div>
                        {/* Username */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiIdentification className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{user.username}</p>
                            <p className="text-xs text-gray-500">Username</p>
                          </div>
                        </motion.div>
                        {/* Department with Edit Button */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiOfficeBuilding className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{user.department}</p>
                            <p className="text-xs text-gray-500">Department</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditDepartment(user)}
                            className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-2 py-1 bg-transparent"
                          >
                            <HiPencil className="w-3 h-3" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </Button>
                        </motion.div>
                        {/* Student-specific fields */}
                        {isStudent && (
                          <>
                            {/* Roll Number */}
                            <motion.div
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <HiIdentification className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-800">{user.rollNo}</p>
                                <p className="text-xs text-gray-500">Roll Number</p>
                              </div>
                            </motion.div>
                            {/* Year */}
                            <motion.div
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-800">{user.year}</p>
                                <p className="text-xs text-gray-500">Academic Year</p>
                              </div>
                            </motion.div>
                            {/* Enrolled Courses Button */}
                            <motion.div
                              className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">
                                  {user.enrolledCoursesCount} Enrolled Courses
                                </p>
                                <p className="text-xs text-gray-500">View student's enrolled courses</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewCourses(user)}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs px-2 py-1 bg-transparent"
                              >
                                View Courses
                              </Button>
                            </motion.div>
                          </>
                        )}
                        {/* Professor-specific fields */}
                        {!isStudent && (
                          <>
                            {/* Teaching Courses Button */}
                            <motion.div
                              className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <HiAcademicCap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">
                                  {user.teachingCoursesCount} Teaching Courses
                                </p>
                                <p className="text-xs text-gray-500">View professor's teaching courses</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewCourses(user)}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-xs px-2 py-1 bg-transparent"
                              >
                                View Courses
                              </Button>
                            </motion.div>
                          </>
                        )}
                      </motion.div>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {filteredUsers.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <HiUsers className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No users found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Courses Modal */}
      <Dialog open={showCoursesModal} onOpenChange={setShowCoursesModal}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
          {/* Modal Header */}
          <DialogHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedUser?.type === "student" ? (
                    <HiAcademicCap className="w-6 h-6 text-white" />
                  ) : (
                    <HiAcademicCap className="w-6 h-6 text-white" />
                  )}
                </motion.div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-800">
                    {selectedUser?.type === "student" ? "Enrolled Courses" : "Teaching Courses"}
                  </DialogTitle>
                  <p className="text-sm text-gray-600">{selectedUser?.username}</p>
                </div>
              </div>
            </div>
          </DialogHeader>
          {/* Modal Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {selectedUser &&
                (selectedUser.type === "student"
                  ? selectedUser.enrolledClasses?.map((course, index) => (
                      <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCourseClick(course.courseCode)}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <HiAcademicCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
                          <p className="text-xs text-gray-500">{course.courseCode}</p>
                        </div>
                        <div className="text-gray-400">
                          <HiChevronDown className="w-4 h-4 rotate-[-90deg]" />
                        </div>
                      </motion.div>
                    ))
                  : selectedUser.teachingClasses?.map((course, index) => (
                      <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCourseClick(course.courseCode)}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <HiAcademicCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
                          <p className="text-xs text-gray-500">{course.courseCode}</p>
                        </div>
                        <div className="text-gray-400">
                          <HiChevronDown className="w-4 h-4 rotate-[-90deg]" />
                        </div>
                      </motion.div>
                    )))}
            </div>
            {selectedUser &&
              ((selectedUser.type === "student" &&
                (!selectedUser.enrolledClasses || selectedUser.enrolledClasses.length === 0)) ||
                (selectedUser.type === "professor" &&
                  (!selectedUser.teachingClasses || selectedUser.teachingClasses.length === 0))) && (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-gray-400 mb-4">
                    <HiAcademicCap className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No courses found</h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser.type === "student"
                      ? "This student is not enrolled in any courses"
                      : "This professor is not teaching any courses"}
                  </p>
                </motion.div>
              )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Department Edit Modal */}
      <Dialog open={showDepartmentModal} onOpenChange={setShowDepartmentModal}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HiOfficeBuilding className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">Edit Department</DialogTitle>
                <p className="text-sm text-gray-600">{editingUser?.username}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Department</label>
                <Select
                  value={getCurrentDepartmentValue(newDepartment, editingUser?.type)}
                  onValueChange={(value) => setNewDepartment(getDepartmentLabel(value, editingUser?.type))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {(editingUser?.type === "student" ? studentDepartments : professorDepartments).map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="p-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowDepartmentModal(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleDepartmentChange} className="bg-green-600 hover:bg-green-700 text-white">
              Update Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HiCheck className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">Confirm Department Change</DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Are you sure you want to change the department of{" "}
              <span className="font-semibold text-gray-900">{editingUser?.username}</span> from{" "}
              <span className="font-semibold text-red-600">{oldDepartment}</span> to{" "}
              <span className="font-semibold text-green-600">{newDepartment}</span>?
            </p>
            {/* <p className="text-sm text-gray-500">This action cannot be undone.</p> */}
          </div>
          <DialogFooter className="p-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowConfirmationModal(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={confirmDepartmentChange} className="bg-green-600 hover:bg-green-700 text-white">
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HiTrash className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800">Confirm User Deletion</DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{deletingUser?.username}</span>?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone and will permanently remove all user data.
            </p>
          </div>
          <DialogFooter className="p-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700 text-white">
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
