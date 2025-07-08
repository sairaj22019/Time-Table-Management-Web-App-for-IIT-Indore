// "use client"
// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import { HiPaperAirplane, HiAcademicCap, HiPencilAlt, HiCheck, HiExclamation, HiX } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { useSession } from "next-auth/react"

// const messageTypes = [
//   { value: "announcement", label: "Announcement", color: "bg-blue-100 text-blue-700" },
//   { value: "assignment", label: "Assignment", color: "bg-green-100 text-green-700" },
//   { value: "reminder", label: "Reminder", color: "bg-yellow-100 text-yellow-700" },
//   { value: "update", label: "Course Update", color: "bg-purple-100 text-purple-700" },
// ]

// export default function SendMessagePage() {
//   const [selectedCourse, setSelectedCourse] = useState("")
//   const [title, setTitle] = useState("")
//   const [message, setMessage] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState(null)
//   const [errors, setErrors] = useState({})
//   const [courseSearch, setCourseSearch] = useState("")
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [teachingCourses, setTeachingCourses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { data: session } = useSession()
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Fetch teaching courses from API
//   useEffect(() => {
//     if (!session) return
//     const fetchTeachingCourses = async () => {
//       try {
//         const res = await fetch("/api/professor/getAllCourses", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ profEmail: session.user.email }),
//         })
//         const data = await res.json()
//         if (data.success) {
//           setTeachingCourses(data.data)
//         } else {
//           console.error("Error:", data.message)
//         }
//       } catch (error) {
//         console.error("Fetch error:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTeachingCourses()
//   }, [session])

//   // Auto-fill course data from URL parameters
//   useEffect(() => {
//     const courseId = searchParams.get("courseId")
//     const courseCode = searchParams.get("courseCode")
//     const courseTitle = searchParams.get("courseTitle")
//     const professor = searchParams.get("professor")
//     const studentsCount = searchParams.get("studentsCount")

//     if (courseId && courseCode && courseTitle) {
//       setSelectedCourse(courseId)
//       setCourseSearch(`${courseCode} - ${courseTitle}`)
//       // Store additional info for display
//       if (professor || studentsCount) {
//         // This will be used when selectedCourseData is found
//       }
//     }
//   }, [searchParams])

//   const filteredCourses = teachingCourses.filter(
//     (course) =>
//       course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()) ||
//       course.title.toLowerCase().includes(courseSearch.toLowerCase()),
//   )

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".relative")) {
//         setShowSuggestions(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const validateForm = () => {
//     const newErrors = {}
//     if (!selectedCourse) newErrors.course = "Please select a course"
//     if (!title.trim()) newErrors.title = "Title is required"
//     if (!message.trim()) newErrors.message = "Message content is required"
//     if (message.trim().length < 10) newErrors.message = "Message must be at least 10 characters long"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return

//     setIsSubmitting(true)
//     setSubmitStatus(null)

//     try {
//       // Simulate API call - replace with your actual API endpoint
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       // Mock success/error for demo
//       const success = Math.random() > 0.2 // 80% success rate

//       if (success) {
//         setSubmitStatus("success")
//         // Reset form after success
//         setTimeout(() => {
//           setSelectedCourse("")
//           setCourseSearch("")
//           setTitle("")
//           setMessage("")
//           setSubmitStatus(null)
//         }, 3000)
//       } else {
//         setSubmitStatus("error")
//       }
//     } catch (error) {
//       setSubmitStatus("error")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleCourseSelection = (course) => {
//     setSelectedCourse(course._id)
//     setCourseSearch(`${course.courseCode} - ${course.title}`)
//     setShowSuggestions(false)

//     // Update URL with course details
//     const queryParams = new URLSearchParams({
//       courseId: course._id,
//       courseCode: course.courseCode,
//       courseTitle: course.title,
//       professor: session?.user?.email || "",
//       studentsCount: course.enrolledStudents?.length || 0,
//     })

//     router.push(`/professor/sendMessage?${queryParams.toString()}`)
//   }

//   const selectedCourseData = teachingCourses.find((course) => course._id === selectedCourse)

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
//         ease: "easeOut",
//       },
//     },
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">Loading courses...</p>
//           </div>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
//               <HiPaperAirplane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Send Message</h1>
//               <p className="text-sm sm:text-base text-gray-600">Compose and send a message to your course</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Form */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           <Card className="shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md border-gray-100">
//             <CardHeader className="pb-4 sm:pb-6">
//               <div className="flex items-center gap-2">
//                 <HiPencilAlt className="w-5 h-5 text-blue-600" />
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Message Details</h2>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4 sm:space-y-6">
//               <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//                 {/* Course Selection */}
//                 <motion.div variants={itemVariants} className="space-y-2">
//                   <label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
//                     <HiAcademicCap className="w-4 h-4 text-blue-600" />
//                     <span className="font-bold">Select Course</span>
//                   </label>
//                   <div className="relative">
//                     <Input
//                       value={courseSearch}
//                       onChange={(e) => {
//                         setCourseSearch(e.target.value)
//                         setShowSuggestions(true)
//                       }}
//                       onFocus={() => setShowSuggestions(true)}
//                       placeholder="Search for a course..."
//                       className={`bg-white/80 backdrop-blur-md border-gray-200 ${errors.course ? "border-red-300" : ""}`}
//                     />
//                     <AnimatePresence>
//                       {showSuggestions && filteredCourses.length > 0 && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
//                         >
//                           {filteredCourses.map((course) => (
//                             <motion.div
//                               key={course._id}
//                               whileHover={{ backgroundColor: "#f3f4f6" }}
//                               className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
//                               onClick={() => handleCourseSelection(course)}
//                             >
//                               <div className="flex flex-col">
//                                 <span className="font-bold text-gray-800">
//                                   {course.courseCode} - {course.title}
//                                 </span>
//                                 <span className="text-xs text-gray-500">
//                                   <span className="font-bold">Students:</span> {course.enrolledStudents?.length || 0}{" "}
//                                   enrolled
//                                 </span>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                   {errors.course && (
//                     <motion.p
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="text-sm text-red-600 flex items-center gap-1"
//                     >
//                       <HiExclamation className="w-4 h-4" />
//                       {errors.course}
//                     </motion.p>
//                   )}
//                 </motion.div>

//                 {/* Selected Course Display */}
//                 <AnimatePresence>
//                   {selectedCourseData && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-1">
//                           <h3 className="font-bold text-gray-800 text-sm sm:text-base">{selectedCourseData.title}</h3>
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             <span className="font-bold">Course Code:</span> {selectedCourseData.courseCode}
//                           </p>
//                           {/* <p className="text-xs sm:text-sm text-gray-600">
//                             <span className="font-bold">Professor Email:</span> {session?.user?.email || ""}
//                           </p> */}
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             <span className="font-bold">Students:</span>{" "}
//                             {selectedCourseData.enrolledStudents?.length || 0}
//                           </p>
//                         </div>
//                         <Badge className="bg-blue-100 text-blue-700 font-bold">Selected</Badge>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Message Title */}
//                 <motion.div variants={itemVariants} className="space-y-2">
//                   <label className="text-sm sm:text-base font-medium text-gray-700">
//                     <span className="font-bold">Message Title</span>
//                   </label>
//                   <Input
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="Enter a clear, descriptive title..."
//                     className={`bg-white/80 mt-2 backdrop-blur-md border-gray-200 ${errors.title ? "border-red-300" : ""}`}
//                   />
//                   {errors.title && (
//                     <motion.p
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="text-sm text-red-600 flex items-center gap-1"
//                     >
//                       <HiExclamation className="w-4 h-4" />
//                       {errors.title}
//                     </motion.p>
//                   )}
//                 </motion.div>

//                 {/* Message Content */}
//                 <motion.div variants={itemVariants} className="space-y-2">
//                   <label className="text-sm sm:text-base font-medium text-gray-700">
//                     <span className="font-bold">Message Content</span>
//                   </label>
//                   <Textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Write your message here... Be clear and concise."
//                     rows={6}
//                     className={`bg-white/80 mt-2 backdrop-blur-md max-h-32 sm:max-h-48 border-gray-200 resize-none ${errors.message ? "border-red-300" : ""}`}
//                   />
//                   <div className="flex flex-col items-start justify-between">
//                     <div className="text-xs sm:text-sm text-gray-500">
//                       {message.length} characters {message.length < 10 && message.length > 0 && "(minimum 10)"}
//                     </div>
//                     {errors.message && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-sm text-red-600 flex items-center gap-1"
//                       >
//                         <HiExclamation className="w-4 h-4" />
//                         {errors.message}
//                       </motion.p>
//                     )}
//                   </div>
//                 </motion.div>

//                 {/* Submit Button */}
//                 <motion.div variants={itemVariants} className="pt-4">
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                       />
//                     ) : (
//                       <HiPaperAirplane className="w-4 h-4 mr-2" />
//                     )}
//                     {isSubmitting ? "Sending Message..." : "Send Message"}
//                   </Button>
//                 </motion.div>
//               </form>

//               {/* Status Messages */}
//               <AnimatePresence>
//                 {submitStatus && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className={`p-4 rounded-xl border ${
//                       submitStatus === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       {submitStatus === "success" ? (
//                         <HiCheck className="w-5 h-5 text-green-600" />
//                       ) : (
//                         <HiX className="w-5 h-5 text-red-600" />
//                       )}
//                       <div>
//                         <h4 className={`font-medium ${submitStatus === "success" ? "text-green-800" : "text-red-800"}`}>
//                           {submitStatus === "success" ? "Message Sent Successfully!" : "Failed to Send Message"}
//                         </h4>
//                         <p className={`text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
//                           {submitStatus === "success"
//                             ? "Your message has been delivered to all course participants."
//                             : "There was an error sending your message. Please try again."}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </main>
//   )
// }



"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiPaperAirplane, HiAcademicCap, HiPencilAlt, HiCheck, HiExclamation, HiX } from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import React from "react"
const messageTypes = [
  { value: "announcement", label: "Announcement", color: "bg-blue-100 text-blue-700" },
  { value: "assignment", label: "Assignment", color: "bg-green-100 text-green-700" },
  { value: "reminder", label: "Reminder", color: "bg-yellow-100 text-yellow-700" },
  { value: "update", label: "Course Update", color: "bg-purple-100 text-purple-700" },
]

export default function SendMessagePage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [courseSearch, setCourseSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [teachingCourses, setTeachingCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Fetch teaching courses from API
  useEffect(() => {
    if (!session) return
    const fetchTeachingCourses = async () => {
      try {
        const res = await fetch("/api/professor/getAllCourses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profEmail: session.user.email }),
        })
        const data = await res.json()
        if (data.success) {
          setTeachingCourses(data.data)
        } else {
          console.error("Error:", data.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeachingCourses()
  }, [session])

  // Auto-fill course data from URL parameters
  useEffect(() => {
    const courseId = searchParams.get("courseId")
    const courseCode = searchParams.get("courseCode")
    const courseTitle = searchParams.get("courseTitle")
    const professor = searchParams.get("professor")
    const studentsCount = searchParams.get("studentsCount")

    if (courseId && courseCode && courseTitle) {
      setSelectedCourse(courseId)
      setCourseSearch(`${courseCode} - ${courseTitle}`)
      // Store additional info for display
      if (professor || studentsCount) {
        // This will be used when selectedCourseData is found
      }
    }
  }, [searchParams])

  const filteredCourses = teachingCourses.filter(
    (course) =>
      course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.title.toLowerCase().includes(courseSearch.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!selectedCourse) newErrors.course = "Please select a course"
    if (!title.trim()) newErrors.title = "Title is required"
    if (!message.trim()) newErrors.message = "Message content is required"
    if (message.trim().length < 10) newErrors.message = "Message must be at least 10 characters long"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get courseId from selected course or URL params
      const courseId = selectedCourse || searchParams.get("courseId")

      // Get professor email from URL params or session, with fallback logic
      let profEmail = searchParams.get("professor") || session?.user?.email || ""

      // If profEmail is empty, we'll let the backend fetch course coordinator email
      if (!profEmail || profEmail === "You") {
        profEmail = session?.user?.email || ""
      }

      const requestBody = {
        courseId: courseId,
        profEmail: profEmail,
        message: message.trim(),
        messageTitle: title.trim(),
      }

      const response = await fetch("/api/professor/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus("success")
        // Reset form after success
        setTimeout(() => {
          setSelectedCourse("")
          setCourseSearch("")
          setTitle("")
          setMessage("")
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus("error")
        console.error("API Error:", data.message)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Network Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCourseSelection = (course) => {
    setSelectedCourse(course._id)
    setCourseSearch(`${course.courseCode} - ${course.title}`)
    setShowSuggestions(false)

    // Update URL with course details
    const queryParams = new URLSearchParams({
      courseId: course._id,
      courseCode: course.courseCode,
      courseTitle: course.title,
      professor: session?.user?.email || "",
      studentsCount: course.enrolledStudents?.length || 0,
    })

    router.push(`/professor/sendMessage?${queryParams.toString()}`)
  }

  const selectedCourseData = teachingCourses.find((course) => course._id === selectedCourse)

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
        ease: "easeOut",
      },
    },
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading courses...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
              <HiPaperAirplane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Send Message</h1>
              <p className="text-sm sm:text-base text-gray-600">Compose and send a message to your course</p>
            </div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md border-gray-100">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2">
                <HiPencilAlt className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Message Details</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Course Selection */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                    <HiAcademicCap className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">Select Course</span>
                  </label>
                  <div className="relative">
                    <Input
                      value={courseSearch}
                      onChange={(e) => {
                        setCourseSearch(e.target.value)
                        setShowSuggestions(true)
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search for a course..."
                      className={`bg-white/80 backdrop-blur-md border-gray-200 ${errors.course ? "border-red-300" : ""}`}
                    />
                    <AnimatePresence>
                      {showSuggestions && filteredCourses.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {filteredCourses.map((course) => (
                            <motion.div
                              key={course._id}
                              whileHover={{ backgroundColor: "#f3f4f6" }}
                              className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleCourseSelection(course)}
                            >
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-800">
                                  {course.courseCode} - {course.title}
                                </span>
                                <span className="text-xs text-gray-500">
                                  <span className="font-bold">Students:</span> {course.enrolledStudents?.length || 0}{" "}
                                  enrolled
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.course && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <HiExclamation className="w-4 h-4" />
                      {errors.course}
                    </motion.p>
                  )}
                </motion.div>

                {/* Selected Course Display */}
                <AnimatePresence>
                  {selectedCourseData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base">{selectedCourseData.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            <span className="font-bold">Course Code:</span> {selectedCourseData.courseCode}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            <span className="font-bold">Professor:</span> {session?.user?.name || "You"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            <span className="font-bold">Students:</span>{" "}
                            {selectedCourseData.enrolledStudents?.length || 0}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 font-bold">Selected</Badge>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message Title */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-gray-700">
                    <span className="font-bold">Message Title</span>
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a clear, descriptive title..."
                    className={`bg-white/80 mt-2 backdrop-blur-md border-gray-200 ${errors.title ? "border-red-300" : ""}`}
                  />
                  {errors.title && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 flex items-center gap-1"
                    >
                      <HiExclamation className="w-4 h-4" />
                      {errors.title}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Content */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-gray-700">
                    <span className="font-bold">Message Content</span>
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here... Be clear and concise."
                    rows={6}
                    className={`bg-white/80 mt-2 backdrop-blur-md max-h-32 sm:max-h-48 border-gray-200 resize-none ${errors.message ? "border-red-300" : ""}`}
                  />
                  <div className="flex flex-col items-start justify-between">
                    <div className="text-xs sm:text-sm text-gray-500">
                      {message.length} characters {message.length < 10 && message.length > 0 && "(minimum 10)"}
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 flex items-center gap-1"
                      >
                        <HiExclamation className="w-4 h-4" />
                        {errors.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <HiPaperAirplane className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl border ${
                      submitStatus === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {submitStatus === "success" ? (
                        <HiCheck className="w-5 h-5 text-green-600" />
                      ) : (
                        <HiX className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <h4 className={`font-medium ${submitStatus === "success" ? "text-green-800" : "text-red-800"}`}>
                          {submitStatus === "success" ? "Message Sent Successfully!" : "Failed to Send Message"}
                        </h4>
                        <p className={`text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                          {submitStatus === "success"
                            ? "Your message has been delivered to all course participants."
                            : "There was an error sending your message. Please try again."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
