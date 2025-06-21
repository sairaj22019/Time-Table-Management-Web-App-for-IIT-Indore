 "use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - replace with actual API call
const mockCourses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    enrolledStudents: 45,
    academicYear: "2024-2025",
    semester: "Fall",
    instructor: "Dr. Sarah Johnson",
    coordinator: "Prof. David Miller",
    department: "Computer Science",
    credits: 3,
    timings: [
      { day: "Monday", time: "10:00 AM - 11:30 AM", room: "Room 201" },
      { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Room 201" },
      { day: "Friday", time: "2:00 PM - 3:30 PM", room: "Lab 105" },
    ],
  },
  {
    id: 2,
    name: "Advanced Mathematics",
    code: "MATH301",
    enrolledStudents: 32,
    academicYear: "2024-2025",
    semester: "Fall",
    instructor: "Prof. Michael Chen",
    coordinator: "Dr. Anna Rodriguez",
    department: "Mathematics",
    credits: 4,
    timings: [
      { day: "Tuesday", time: "2:00 PM - 3:30 PM", room: "Room 305" },
      { day: "Thursday", time: "2:00 PM - 3:30 PM", room: "Room 305" },
    ],
  },
  {
    id: 3,
    name: "Digital Marketing Fundamentals",
    code: "MKT201",
    enrolledStudents: 28,
    academicYear: "2024-2025",
    semester: "Spring",
    instructor: "Dr. Emily Rodriguez",
    coordinator: "Prof. James Wilson",
    department: "Business",
    credits: 3,
    timings: [
      { day: "Monday", time: "9:00 AM - 10:30 AM", room: "Room 150" },
      { day: "Wednesday", time: "9:00 AM - 10:30 AM", room: "Room 150" },
      { day: "Friday", time: "11:00 AM - 12:30 PM", room: "Room 150" },
    ],
  },
  {
    id: 4,
    name: "Organic Chemistry",
    code: "CHEM302",
    enrolledStudents: 38,
    academicYear: "2023-2024",
    semester: "Fall",
    instructor: "Dr. James Wilson",
    coordinator: "Prof. Lisa Thompson",
    department: "Chemistry",
    credits: 4,
    timings: [
      { day: "Tuesday", time: "11:00 AM - 12:30 PM", room: "Room 220" },
      { day: "Thursday", time: "11:00 AM - 12:30 PM", room: "Lab 301" },
    ],
  },
  {
    id: 5,
    name: "World History",
    code: "HIST101",
    enrolledStudents: 52,
    academicYear: "2024-2025",
    semester: "Fall",
    instructor: "Prof. Lisa Thompson",
    coordinator: "Dr. Robert Kim",
    department: "History",
    credits: 3,
    timings: [
      { day: "Monday", time: "1:00 PM - 2:30 PM", room: "Room 401" },
      { day: "Wednesday", time: "1:00 PM - 2:30 PM", room: "Room 401" },
      { day: "Friday", time: "3:00 PM - 4:30 PM", room: "Room 401" },
    ],
  },
  {
    id: 6,
    name: "Data Structures & Algorithms",
    code: "CS201",
    enrolledStudents: 41,
    academicYear: "2024-2025",
    semester: "Spring",
    instructor: "Dr. Robert Kim",
    coordinator: "Dr. Sarah Johnson",
    department: "Computer Science",
    credits: 4,
    timings: [
      { day: "Tuesday", time: "3:30 PM - 5:00 PM", room: "Room 501" },
      { day: "Thursday", time: "3:30 PM - 5:00 PM", room: "Lab 205" },
    ],
  },
]

export default function ViewAllCoursesPage() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [loading, setLoading] = useState(true)
  const [expandedCards, setExpandedCards] = useState([])

  const toggleCardExpansion = (courseId) => {
    setExpandedCards((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses)
      setFilteredCourses(mockCourses)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((course) => course.academicYear === selectedYear)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, selectedYear, courses])

  const academicYears = [...new Set(courses.map((course) => course.academicYear))]
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents, 0)

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
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                  {totalStudents} Students
                </Badge>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2">
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
              placeholder="Search courses, codes, or instructors..."
              className="pl-10 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-md border-gray-200 text-sm sm:text-base">
              <HiFilter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
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
          className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {filteredCourses.map((course) => {
            const isExpanded = expandedCards.includes(course.id)
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                            {course.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">{course.code}</p>
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
                        className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2"
                      >
                        <HiPencil className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline ml-1">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 px-2 sm:px-3 py-1 sm:py-2"
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
                        {/* Course Stats */}
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
                              {course.enrolledStudents} Students Enrolled
                            </p>
                            <p className="text-xs text-gray-500">Current enrollment</p>
                          </div>
                        </motion.div>

                        {/* Instructor Info */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{course.instructor}</p>
                            <p className="text-xs text-gray-500">Course Instructor</p>
                          </div>
                        </motion.div>

                        {/* Course Coordinator */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">{course.coordinator}</p>
                            <p className="text-xs text-gray-500">Course Coordinator</p>
                          </div>
                        </motion.div>

                        {/* Academic Info */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">
                              {course.academicYear} • {course.semester}
                            </p>
                            <p className="text-xs text-gray-500">{course.department}</p>
                          </div>
                        </motion.div>

                        {/* Weekly Schedule */}
                        <div className="space-y-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            Weekly Schedule
                          </h4>
                          <div className="space-y-2">
                            {course.timings.map((timing, index) => (
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
                                    <span className="font-medium text-gray-800 text-xs sm:text-sm">{timing.day}</span>
                                    <p className="text-xs text-gray-500">{timing.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                                  <HiLocationMarker className="w-3 h-3" />
                                  <span className="text-xs">{timing.room}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
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
    </main>
  )
} 