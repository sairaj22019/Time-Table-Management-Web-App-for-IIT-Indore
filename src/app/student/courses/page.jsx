"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiAcademicCap,
  HiClock,
  HiUser,
  HiCalendar,
  HiStar,
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

// Mock data - replace with your actual data
const coursesData = [
  {
    id: 1,
    name: "Advanced Web Development",
    code: "CS 401",
    professor: "Dr. Sarah Johnson",
    credits: 4,
    lecturesPerWeek: 3,
    timings: [
      { day: "Monday", time: "10:00 AM - 11:30 AM", room: "Room 201" },
      { day: "Wednesday", time: "10:00 AM - 11:30 AM", room: "Room 201" },
      { day: "Friday", time: "2:00 PM - 3:30 PM", room: "Lab 105" },
    ],
    description: "Learn modern web development frameworks and best practices",
    progress: 75,
    nextClass: "Monday, 10:00 AM",
    semester: "Fall 2024",
    category: "Computer Science",
  },
  {
    id: 2,
    name: "Database Management Systems",
    code: "CS 350",
    professor: "Prof. Michael Chen",
    credits: 3,
    lecturesPerWeek: 2,
    timings: [
      { day: "Tuesday", time: "2:00 PM - 3:30 PM", room: "Room 305" },
      { day: "Thursday", time: "2:00 PM - 3:30 PM", room: "Room 305" },
    ],
    description: "Comprehensive study of database design and implementation",
    progress: 60,
    nextClass: "Tuesday, 2:00 PM",
    semester: "Fall 2024",
    category: "Computer Science",
  },
  {
    id: 3,
    name: "Linear Algebra",
    code: "MATH 250",
    professor: "Dr. Emily Rodriguez",
    credits: 4,
    lecturesPerWeek: 3,
    timings: [
      { day: "Monday", time: "9:00 AM - 10:00 AM", room: "Room 150" },
      { day: "Wednesday", time: "9:00 AM - 10:00 AM", room: "Room 150" },
      { day: "Friday", time: "9:00 AM - 10:00 AM", room: "Room 150" },
    ],
    description: "Vector spaces, linear transformations, and matrix theory",
    progress: 45,
    nextClass: "Monday, 9:00 AM",
    semester: "Fall 2024",
    category: "Mathematics",
  },
  {
    id: 4,
    name: "Software Engineering",
    code: "CS 425",
    professor: "Dr. James Wilson",
    credits: 3,
    lecturesPerWeek: 2,
    timings: [
      { day: "Tuesday", time: "11:00 AM - 12:30 PM", room: "Room 220" },
      { day: "Thursday", time: "11:00 AM - 12:30 PM", room: "Room 220" },
    ],
    description: "Software development lifecycle and project management",
    progress: 80,
    nextClass: "Tuesday, 11:00 AM",
    semester: "Fall 2024",
    category: "Computer Science",
  },
  {
    id: 5,
    name: "Digital Signal Processing",
    code: "EE 380",
    professor: "Prof. Lisa Park",
    credits: 4,
    lecturesPerWeek: 3,
    timings: [
      { day: "Monday", time: "1:00 PM - 2:30 PM", room: "Room 401" },
      { day: "Wednesday", time: "1:00 PM - 2:30 PM", room: "Room 401" },
      { day: "Friday", time: "3:00 PM - 4:30 PM", room: "Lab 301" },
    ],
    description: "Analysis and processing of digital signals and systems",
    progress: 55,
    nextClass: "Monday, 1:00 PM",
    semester: "Fall 2024",
    category: "Electrical Engineering",
  },
  {
    id: 6,
    name: "Machine Learning",
    code: "CS 480",
    professor: "Dr. Alex Kumar",
    credits: 4,
    lecturesPerWeek: 2,
    timings: [
      { day: "Tuesday", time: "3:30 PM - 5:00 PM", room: "Room 501" },
      { day: "Thursday", time: "3:30 PM - 5:00 PM", room: "Lab 205" },
    ],
    description: "Introduction to machine learning algorithms and applications",
    progress: 30,
    nextClass: "Tuesday, 3:30 PM",
    semester: "Fall 2024",
    category: "Computer Science",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredCourses, setFilteredCourses] = useState(coursesData)
  // Add this state for managing expanded cards
  const [expandedCards, setExpandedCards] = useState([])

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterCourses(term, selectedCategory)
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    filterCourses(searchTerm, category)
  }

  const filterCourses = (term, category) => {
    let filtered = coursesData

    if (term) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(term.toLowerCase()) ||
          course.code.toLowerCase().includes(term.toLowerCase()) ||
          course.professor.toLowerCase().includes(term.toLowerCase()),
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((course) => course.category.toLowerCase() === category.toLowerCase())
    }

    setFilteredCourses(filtered)
  }

  const categories = ["all", ...Array.from(new Set(coursesData.map((course) => course.category)))]

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

//   const toggleCardExpansion = (courseId) => {
//     const newExpanded = new Set(expandedCards)
//     if (newExpanded.has(courseId)) {
//       newExpanded.delete(courseId)
//     } else {
//       newExpanded.add(courseId)
//     }
//     setExpandedCards(newExpanded)
//   }

const toggleCardExpansion = (courseId) => {
  setExpandedCards((prev) =>
    prev.includes(courseId)
      ? prev.filter((id) => id !== courseId)
      : [...prev, courseId]
  );
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200  p-6">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
              <p className="text-gray-600">Manage and track your enrolled courses</p>
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
                placeholder="Search courses, professors, or course codes..."
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
          className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
        >
          {filteredCourses.map((course) => {
            // const isExpanded = expandedCards.has(course.id)
            const isExpanded = expandedCards.includes(course.id);
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
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <HiAcademicCap className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{course.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">{course.code}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
                        {course.credits} Credits
                      </Badge>
                    </div>

                    {/* View Details Button */}
                    <motion.div className="mt-4">
                      <Button
                        onClick={() => toggleCardExpansion(course.id)}
                        variant="outline"
                        size="sm"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
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
                    <CardContent className="pt-0 pb-6">
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
                        className="space-y-4"
                      >
                        {/* Course Description */}
                        {/* <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-100">
                          <p className="text-sm text-gray-700 leading-relaxed">{course.description}</p>
                        </div> */}

                        {/* Professor Info */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiUser className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{course.professor}</p>
                            <p className="text-xs text-gray-500">Course Instructor</p>
                          </div>
                        </motion.div>

                        {/* Schedule Summary */}
                        <motion.div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <HiClock className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {course.lecturesPerWeek} lectures per week
                            </p>
                            <p className="text-xs text-gray-500">Next: {course.nextClass}</p>
                          </div>
                        </motion.div>

                        {/* Detailed Schedule */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <HiCalendar className="w-4 h-4" />
                            Weekly Schedule
                          </h4>
                          <div className="space-y-2">
                            {course.timings.map((timing, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <div>
                                    <span className="font-medium text-gray-800 text-sm">{timing.day}</span>
                                    <p className="text-xs text-gray-500">{timing.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <HiLocationMarker className="w-3 h-3" />
                                  <span>{timing.room}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {/* <div className="flex gap-3 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <HiBookOpen className="w-4 h-4 mr-2" />
                            Course Materials
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                          >
                            <HiStar className="w-4 h-4" />
                          </Button>
                        </div> */}
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
      </div>
    </main>
  )
}