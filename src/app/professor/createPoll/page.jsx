// "use client"

// import { useState, useEffect } from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   HiSpeakerphone,
//   HiAcademicCap,
//   HiPencilAlt,
//   HiCheck,
//   HiInformationCircle,
//   HiX,
//   HiCalendar,
//   HiClock,
//   HiLocationMarker,
//   HiPlus,
//   HiTrash,
//   HiUserGroup,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useSession } from "next-auth/react"

// // Poll option schema
// const pollOptionSchema = z.object({
//   date: z.string().min(1, "Date is required"),
//   startTime: z.string().min(1, "Start time is required"),
//   endTime: z.string().min(1, "End time is required"),
//   room: z.string().min(1, "Room is required"),
// })

// // Main form schema
// const formSchema = z.object({
//   selectedCourse: z.string().min(1, "Please select a course"),
//   title: z.string().min(1, "Poll title is required"),
//   context: z.string().min(10, "Context must be at least 10 characters long"),
//   options: z.array(pollOptionSchema).min(2, "At least 2 options are required"),
// })

// export default function CreatePollPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState(null)
//   const [courseSearch, setCourseSearch] = useState("")
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [allCourses, setAllCourses] = useState([])
//   const [prefilledCourse, setPrefilledCourse] = useState(null)

//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { data: session, status } = useSession()

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       selectedCourse: "",
//       title: "",
//       context: "",
//       options: [
//         { date: "", startTime: "", endTime: "", room: "" },
//         { date: "", startTime: "", endTime: "", room: "" },
//       ],
//     },
//   })

//   const {
//     fields: optionFields,
//     append: appendOption,
//     remove: removeOption,
//   } = useFieldArray({
//     control: form.control,
//     name: "options",
//   })

//   // Fetch user's teaching courses
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
//         } else {
//           console.error("Error fetching courses:", data.message)
//         }
//       } catch (error) {
//         console.error("Fetch error:", error)
//       }
//     }

//     fetchCourses()
//   }, [session])

//   const filteredCourses = allCourses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
//       course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()),
//   )

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".course-search-container")) {
//         setShowSuggestions(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Handle pre-filled course data from URL params
//   useEffect(() => {
//     const courseId = searchParams.get("courseId")
//     const courseCode = searchParams.get("courseCode")
//     const courseTitle = searchParams.get("courseTitle")
//     const professor = searchParams.get("professor")
//     const studentsCount = searchParams.get("studentsCount")

//     if (courseId && courseCode && courseTitle) {
//       const prefilledData = {
//         _id: courseId,
//         courseCode: courseCode,
//         title: courseTitle,
//         professor: professor || "You",
//         enrolledStudents: Array(Number.parseInt(studentsCount) || 0).fill({}),
//       }

//       setPrefilledCourse(prefilledData)
//       form.setValue("selectedCourse", courseId)
//       setCourseSearch(`${courseCode} - ${courseTitle}`)
//     }
//   }, [searchParams, form])

//   const handleSubmit = async (data) => {
//     setIsSubmitting(true)
//     setSubmitStatus(null)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       // Mock success/error for demo
//       const success = Math.random() > 0.2 // 80% success rate

//       if (success) {
//         setSubmitStatus("success")
//         // Reset form after success
//         setTimeout(() => {
//           form.reset()
//           setCourseSearch("")
//           setSubmitStatus(null)
//           setPrefilledCourse(null)
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

//   const selectedCourseData = prefilledCourse || allCourses.find((course) => course._id === form.watch("selectedCourse"))

//   // Capitalize room name with smart formatting
//   const capitalizeRoom = (room) => {
//     return room
//       .split(" ")
//       .map((word) => {
//         if (word.length === 0) return word
//         // Handle special cases like "l01" -> "L01"
//         if (/^[a-z]\d+$/i.test(word)) {
//           return word.toUpperCase()
//         }
//         // Regular capitalization
//         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//       })
//       .join(" ")
//   }

//   // Format date to show date and day
//   const formatDateWithDay = (dateString) => {
//     if (!dateString) return ""
//     const date = new Date(dateString)
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//     return date.toLocaleDateString("en-US", options)
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

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
//               <HiSpeakerphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Poll</h1>
//               <p className="text-sm sm:text-base text-gray-600">Create a scheduling poll for your course</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Form */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           <Card className="shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md border-gray-100">
//             <CardHeader className="pb-4 sm:pb-6">
//               <div className="flex items-center gap-2">
//                 <HiPencilAlt className="w-5 h-5 text-purple-600" />
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Poll Details</h2>
//               </div>
//             </CardHeader>

//             <CardContent className="space-y-4 sm:space-y-6">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
//                   {/* Course Selection */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="selectedCourse"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
//                             <HiAcademicCap className="w-4 h-4 text-purple-600" />
//                             Select Course
//                           </FormLabel>
//                           <div className="relative course-search-container">
//                             <Input
//                               value={courseSearch}
//                               onChange={(e) => {
//                                 setCourseSearch(e.target.value)
//                                 setShowSuggestions(true)
//                                 setPrefilledCourse(null) // Clear prefilled when manually searching
//                               }}
//                               onFocus={() => setShowSuggestions(true)}
//                               placeholder="Search for a course..."
//                               className="bg-white/80 backdrop-blur-md border-gray-200"
//                             />
//                             <AnimatePresence>
//                               {showSuggestions && filteredCourses.length > 0 && !prefilledCourse && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: -10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   exit={{ opacity: 0, y: -10 }}
//                                   transition={{ duration: 0.2 }}
//                                   className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
//                                 >
//                                   {filteredCourses.map((course) => (
//                                     <motion.div
//                                       key={course._id}
//                                       whileHover={{ backgroundColor: "#f3f4f6" }}
//                                       className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
//                                       onClick={() => {
//                                         field.onChange(course._id)
//                                         setCourseSearch(`${course.courseCode} - ${course.title}`)
//                                         setShowSuggestions(false)
//                                       }}
//                                     >
//                                       <div className="flex flex-col">
//                                         <span className="font-medium text-gray-800">
//                                           {course.courseCode} - {course.title}
//                                         </span>
//                                         <span className="text-xs text-gray-500">
//                                           {course.enrolledStudents?.length || 0} students enrolled
//                                         </span>
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Selected Course Display */}
//                   <AnimatePresence>
//                     {selectedCourseData && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-purple-100"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h3 className="font-bold text-gray-800 text-lg mb-2">{selectedCourseData.title}</h3>
//                             <div className="space-y-1 text-sm text-gray-600">
//                               <p>
//                                 <span className="font-medium">Course Code:</span> {selectedCourseData.courseCode}
//                               </p>
//                               <p>
//                                 <span className="font-medium">Professor:</span> {selectedCourseData.professor || "You"}
//                               </p>
//                               <div className="flex items-center gap-1">
//                                 <HiUserGroup className="w-4 h-4" />
//                                 <span>
//                                   <span className="font-medium">Students:</span>{" "}
//                                   {selectedCourseData.enrolledStudents?.length || 0}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                           <Badge className="bg-purple-100 text-purple-700 font-semibold">Selected</Badge>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Poll Title */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="title"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Poll Title</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., Reschedule Class Due to Holiday"
//                               className="bg-white/80 backdrop-blur-md border-gray-200"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Poll Context */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="context"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
//                             Context & Reason
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Explain the reason for this poll and provide any additional context students should know..."
//                               rows={4}
//                               className="bg-white/80 backdrop-blur-md border-gray-200 resize-none"
//                               {...field}
//                             />
//                           </FormControl>
//                           <div className="flex justify-between items-center">
//                             <div className="text-xs sm:text-sm text-gray-500">
//                               {field.value?.length || 0} characters (minimum 10)
//                             </div>
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Poll Options */}
//                   <motion.div variants={itemVariants} className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <HiCalendar className="w-5 h-5 text-purple-600" />
//                         <h3 className="text-lg font-semibold text-gray-800">Schedule Options</h3>
//                       </div>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => appendOption({ date: "", startTime: "", endTime: "", room: "" })}
//                         className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
//                       >
//                         <HiPlus className="w-4 h-4" />
//                         Add Option
//                       </Button>
//                     </div>

//                     <div className="space-y-4">
//                       <AnimatePresence>
//                         {optionFields.map((field, index) => (
//                           <motion.div
//                             key={field.id}
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-4"
//                           >
//                             <div className="flex items-center justify-between">
//                               <h4 className="font-medium text-gray-800">Option {index + 1}</h4>
//                               {optionFields.length > 2 && (
//                                 <Button
//                                   type="button"
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => removeOption(index)}
//                                   className="text-red-600 border-red-200 hover:bg-red-50"
//                                 >
//                                   <HiTrash className="w-4 h-4" />
//                                 </Button>
//                               )}
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                               {/* Date */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.date`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiCalendar className="w-3 h-3" />
//                                       Date
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="space-y-2">
//                                         <Input type="date" className="bg-white border-gray-200" {...field} />
//                                         {field.value && (
//                                           <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
//                                             <span className="font-medium">Selected:</span>{" "}
//                                             {formatDateWithDay(field.value)}
//                                           </div>
//                                         )}
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />

//                               {/* Room */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.room`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiLocationMarker className="w-3 h-3" />
//                                       Room
//                                     </FormLabel>
//                                     <FormControl>
//                                       <Input
//                                         placeholder="e.g., LH1, Lab A"
//                                         className="bg-white border-gray-200"
//                                         {...field}
//                                         onChange={(e) => {
//                                           const capitalizedValue = capitalizeRoom(e.target.value)
//                                           field.onChange(capitalizedValue)
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                               {/* Start Time */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.startTime`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       Start Time
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="grid grid-cols-3 gap-1">
//                                         <Select
//                                           onValueChange={(hour) => {
//                                             const currentTime = field.value || ""
//                                             const [, minute = "00", period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Hr" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                                               <SelectItem key={hour} value={hour.toString()}>
//                                                 {hour}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(minute) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", , period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/:(\d{2})/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Min" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             {[
//                                               "00",
//                                               "05",
//                                               "10",
//                                               "15",
//                                               "20",
//                                               "25",
//                                               "30",
//                                               "35",
//                                               "40",
//                                               "45",
//                                               "50",
//                                               "55",
//                                             ].map((minute) => (
//                                               <SelectItem key={minute} value={minute}>
//                                                 {minute}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(period) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", minute = "00"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="AM/PM" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             <SelectItem value="AM">AM</SelectItem>
//                                             <SelectItem value="PM">PM</SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />

//                               {/* End Time */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.endTime`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       End Time
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="grid grid-cols-3 gap-1">
//                                         <Select
//                                           onValueChange={(hour) => {
//                                             const currentTime = field.value || ""
//                                             const [, minute = "00", period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Hr" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                                               <SelectItem key={hour} value={hour.toString()}>
//                                                 {hour}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(minute) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", , period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/:(\d{2})/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Min" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             {[
//                                               "00",
//                                               "05",
//                                               "10",
//                                               "15",
//                                               "20",
//                                               "25",
//                                               "30",
//                                               "35",
//                                               "40",
//                                               "45",
//                                               "50",
//                                               "55",
//                                             ].map((minute) => (
//                                               <SelectItem key={minute} value={minute}>
//                                                 {minute}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(period) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", minute = "00"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="AM/PM" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             <SelectItem value="AM">AM</SelectItem>
//                                             <SelectItem value="PM">PM</SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     </div>
//                   </motion.div>

//                   {/* Submit Button */}
//                   <motion.div variants={itemVariants} className="pt-4">
//                     <Button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? (
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                         />
//                       ) : (
//                         <HiSpeakerphone className="w-4 h-4 mr-2" />
//                       )}
//                       {isSubmitting ? "Creating Poll..." : "Create Poll"}
//                     </Button>
//                   </motion.div>
//                 </form>
//               </Form>

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
//                           {submitStatus === "success" ? "Poll Created Successfully!" : "Failed to Create Poll"}
//                         </h4>
//                         <p className={`text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
//                           {submitStatus === "success"
//                             ? "Your poll has been created and sent to all course participants."
//                             : "There was an error creating your poll. Please try again."}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Info Box */}
//               {/* <motion.div
//                 variants={itemVariants}
//                 className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100"
//               >
//                 <div className="flex items-start gap-2">
//                   <HiInformationCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-xs sm:text-sm text-purple-700">
//                     <p className="font-medium mb-1">Poll Guidelines:</p>
//                     <ul className="space-y-1 text-purple-600">
//                       <li>• Provide at least 2 scheduling options for students to choose from</li>
//                       <li>• Include clear context explaining why the poll is needed</li>
//                       <li>• Students will receive notifications to vote on their preferred option</li>
//                       <li>• You can view poll results and responses in your dashboard</li>
//                     </ul>
//                   </div>
//                 </div>
//               </motion.div> */}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </main>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   HiSpeakerphone,
//   HiAcademicCap,
//   HiPencilAlt,
//   HiCheck,
//   HiInformationCircle,
//   HiX,
//   HiCalendar,
//   HiClock,
//   HiLocationMarker,
//   HiPlus,
//   HiTrash,
//   HiUserGroup,
// } from "react-icons/hi"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useSession } from "next-auth/react"

// // Poll option schema
// const pollOptionSchema = z.object({
//   date: z.string().min(1, "Date is required"),
//   startTime: z.string().min(1, "Start time is required"),
//   endTime: z.string().min(1, "End time is required"),
//   room: z.string().min(1, "Room is required"),
// })

// // Main form schema
// const formSchema = z.object({
//   selectedCourse: z.string().min(1, "Please select a course"),
//   title: z.string().min(1, "Poll title is required"),
//   context: z.string().min(10, "Context must be at least 10 characters long"),
//   options: z.array(pollOptionSchema).min(2, "At least 2 options are required"),
// })

// export default function CreatePollPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState(null)
//   const [courseSearch, setCourseSearch] = useState("")
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [allCourses, setAllCourses] = useState([])
//   const [prefilledCourse, setPrefilledCourse] = useState(null)

//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { data: session, status } = useSession()

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       selectedCourse: "",
//       title: "",
//       context: "",
//       options: [
//         { date: "", startTime: "", endTime: "", room: "" },
//         { date: "", startTime: "", endTime: "", room: "" },
//       ],
//     },
//   })

//   const {
//     fields: optionFields,
//     append: appendOption,
//     remove: removeOption,
//   } = useFieldArray({
//     control: form.control,
//     name: "options",
//   })

//   // Fetch user's teaching courses
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
//         } else {
//           console.error("Error fetching courses:", data.message)
//         }
//       } catch (error) {
//         console.error("Fetch error:", error)
//       }
//     }

//     fetchCourses()
//   }, [session])

//   const filteredCourses = allCourses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
//       course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()),
//   )

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".course-search-container")) {
//         setShowSuggestions(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Handle pre-filled course data from URL params
//   useEffect(() => {
//     const courseId = searchParams.get("courseId")
//     const courseCode = searchParams.get("courseCode")
//     const courseTitle = searchParams.get("courseTitle")
//     const professor = searchParams.get("professor")
//     const studentsCount = searchParams.get("studentsCount")

//     if (courseId && courseCode && courseTitle) {
//       const prefilledData = {
//         _id: courseId,
//         courseCode: courseCode,
//         title: courseTitle,
//         professor: professor || "You",
//         enrolledStudents: Array(Number.parseInt(studentsCount) || 0).fill({}),
//       }

//       setPrefilledCourse(prefilledData)
//       form.setValue("selectedCourse", courseId)
//       setCourseSearch(`${courseCode} - ${courseTitle}`)
//     }
//   }, [searchParams, form])

//   const handleSubmit = async (data) => {
//     setIsSubmitting(true)
//     setSubmitStatus(null)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       // Mock success/error for demo
//       const success = Math.random() > 0.2 // 80% success rate

//       if (success) {
//         setSubmitStatus("success")
//         // Reset form after success
//         setTimeout(() => {
//           form.reset()
//           setCourseSearch("")
//           setSubmitStatus(null)
//           setPrefilledCourse(null)
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

//   const selectedCourseData = prefilledCourse || allCourses.find((course) => course._id === form.watch("selectedCourse"))

//   // Capitalize room name with smart formatting
//   const capitalizeRoom = (room) => {
//     return room
//       .split(" ")
//       .map((word) => {
//         if (word.length === 0) return word
//         // Handle special cases like "l01" -> "L01"
//         if (/^[a-z]\d+$/i.test(word)) {
//           return word.toUpperCase()
//         }
//         // Regular capitalization
//         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//       })
//       .join(" ")
//   }

//   // Format date to show date and day in DD-MM-YYYY, Day format
//   const formatDateWithDay = (dateString) => {
//     if (!dateString) return ""
//     const date = new Date(dateString)
//     const day = date.getDate().toString().padStart(2, "0")
//     const month = (date.getMonth() + 1).toString().padStart(2, "0")
//     const year = date.getFullYear()
//     const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
//     return `${day}-${month}-${year}, ${dayName}`
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

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
//               <HiSpeakerphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Poll</h1>
//               <p className="text-sm sm:text-base text-gray-600">Create a scheduling poll for your course</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Form */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           <Card className="shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md border-gray-100">
//             <CardHeader className="pb-4 sm:pb-6">
//               <div className="flex items-center gap-2">
//                 <HiPencilAlt className="w-5 h-5 text-purple-600" />
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Poll Details</h2>
//               </div>
//             </CardHeader>

//             <CardContent className="space-y-4 sm:space-y-6">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
//                   {/* Course Selection */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="selectedCourse"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
//                             <HiAcademicCap className="w-4 h-4 text-purple-600" />
//                             Select Course
//                           </FormLabel>
//                           <div className="relative course-search-container">
//                             <Input
//                               value={courseSearch}
//                               onChange={(e) => {
//                                 setCourseSearch(e.target.value)
//                                 setShowSuggestions(true)
//                                 setPrefilledCourse(null) // Clear prefilled when manually searching
//                               }}
//                               onFocus={() => setShowSuggestions(true)}
//                               placeholder="Search for a course..."
//                               className="bg-white/80 backdrop-blur-md border-gray-200"
//                             />
//                             <AnimatePresence>
//                               {showSuggestions && filteredCourses.length > 0 && !prefilledCourse && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: -10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   exit={{ opacity: 0, y: -10 }}
//                                   transition={{ duration: 0.2 }}
//                                   className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
//                                 >
//                                   {filteredCourses.map((course) => (
//                                     <motion.div
//                                       key={course._id}
//                                       whileHover={{ backgroundColor: "#f3f4f6" }}
//                                       className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
//                                       onClick={() => {
//                                         field.onChange(course._id)
//                                         setCourseSearch(`${course.courseCode} - ${course.title}`)
//                                         setShowSuggestions(false)
//                                       }}
//                                     >
//                                       <div className="flex flex-col">
//                                         <span className="font-medium text-gray-800">
//                                           {course.courseCode} - {course.title}
//                                         </span>
//                                         <span className="text-xs text-gray-500">
//                                           {course.enrolledStudents?.length || 0} students enrolled
//                                         </span>
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Selected Course Display */}
//                   <AnimatePresence>
//                     {selectedCourseData && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-purple-100"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <h3 className="font-bold text-gray-800 text-lg mb-2">{selectedCourseData.title}</h3>
//                             <div className="space-y-1 text-sm text-gray-600">
//                               <p>
//                                 <span className="font-medium">Course Code:</span> {selectedCourseData.courseCode}
//                               </p>
//                               <p>
//                                 <span className="font-medium">Professor:</span> {selectedCourseData.professor || "You"}
//                               </p>
//                               <div className="flex items-center gap-1">
//                                 <HiUserGroup className="w-4 h-4" />
//                                 <span>
//                                   <span className="font-medium">Students:</span>{" "}
//                                   {selectedCourseData.enrolledStudents?.length || 0}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                           <Badge className="bg-purple-100 text-purple-700 font-semibold">Selected</Badge>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Poll Title */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="title"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Poll Title</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., Reschedule Class Due to Holiday"
//                               className="bg-white/80 backdrop-blur-md border-gray-200"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Poll Context */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <FormField
//                       control={form.control}
//                       name="context"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
//                             Context & Reason
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder="Explain the reason for this poll and provide any additional context students should know..."
//                               rows={4}
//                               className="bg-white/80 backdrop-blur-md border-gray-200 resize-none"
//                               {...field}
//                             />
//                           </FormControl>
//                           <div className="flex justify-between items-center">
//                             <div className="text-xs sm:text-sm text-gray-500">
//                               {field.value?.length || 0} characters (minimum 10)
//                             </div>
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   {/* Poll Options */}
//                   <motion.div variants={itemVariants} className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <HiCalendar className="w-5 h-5 text-purple-600" />
//                         <h3 className="text-lg font-semibold text-gray-800">Schedule Options</h3>
//                       </div>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => appendOption({ date: "", startTime: "", endTime: "", room: "" })}
//                         className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
//                       >
//                         <HiPlus className="w-4 h-4" />
//                         Add Option
//                       </Button>
//                     </div>

//                     <div className="space-y-4">
//                       <AnimatePresence>
//                         {optionFields.map((field, index) => (
//                           <motion.div
//                             key={field.id}
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-4"
//                           >
//                             <div className="flex items-center justify-between">
//                               <h4 className="font-medium text-gray-800">Option {index + 1}</h4>
//                               {optionFields.length > 2 && (
//                                 <Button
//                                   type="button"
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => removeOption(index)}
//                                   className="text-red-600 border-red-200 hover:bg-red-50"
//                                 >
//                                   <HiTrash className="w-4 h-4" />
//                                 </Button>
//                               )}
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                               {/* Date */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.date`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiCalendar className="w-3 h-3" />
//                                       Date
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="space-y-2">
//                                         <div className="relative">
//                                           <Input
//                                             type="date"
//                                             className="bg-white border-gray-200 pr-10"
//                                             {...field}
//                                             style={{
//                                               // Hide default calendar icon on webkit browsers
//                                               WebkitAppearance: "none",
//                                               MozAppearance: "textfield",
//                                             }}
//                                           />
//                                         </div>
//                                         {field.value && (
//                                           <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
//                                             <span className="font-medium">Selected:</span>{" "}
//                                             {formatDateWithDay(field.value)}
//                                           </div>
//                                         )}
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />

//                               {/* Room */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.room`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiLocationMarker className="w-3 h-3" />
//                                       Room
//                                     </FormLabel>
//                                     <FormControl>
//                                       <Input
//                                         placeholder="e.g., LH1, Lab A"
//                                         className="bg-white border-gray-200"
//                                         {...field}
//                                         onChange={(e) => {
//                                           const capitalizedValue = capitalizeRoom(e.target.value)
//                                           field.onChange(capitalizedValue)
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                               {/* Start Time */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.startTime`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       Start Time
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="grid grid-cols-3 gap-1">
//                                         <Select
//                                           onValueChange={(hour) => {
//                                             const currentTime = field.value || ""
//                                             const [, minute = "00", period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Hr" />
//                                           </SelectTrigger>
//                                           <SelectContent className="max-h-48 overflow-y-auto">
//                                             {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                                               <SelectItem key={hour} value={hour.toString()}>
//                                                 {hour}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(minute) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", , period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/:(\d{2})/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Min" />
//                                           </SelectTrigger>
//                                           <SelectContent className="max-h-48 overflow-y-auto">
//                                             {[
//                                               "00",
//                                               "05",
//                                               "10",
//                                               "15",
//                                               "20",
//                                               "25",
//                                               "30",
//                                               "35",
//                                               "40",
//                                               "45",
//                                               "50",
//                                               "55",
//                                             ].map((minute) => (
//                                               <SelectItem key={minute} value={minute}>
//                                                 {minute}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(period) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", minute = "00"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="AM/PM" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             <SelectItem value="AM">AM</SelectItem>
//                                             <SelectItem value="PM">PM</SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />

//                               {/* End Time */}
//                               <FormField
//                                 control={form.control}
//                                 name={`options.${index}.endTime`}
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                       <HiClock className="w-3 h-3" />
//                                       End Time
//                                     </FormLabel>
//                                     <FormControl>
//                                       <div className="grid grid-cols-3 gap-1">
//                                         <Select
//                                           onValueChange={(hour) => {
//                                             const currentTime = field.value || ""
//                                             const [, minute = "00", period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Hr" />
//                                           </SelectTrigger>
//                                           <SelectContent className="max-h-48 overflow-y-auto">
//                                             {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                                               <SelectItem key={hour} value={hour.toString()}>
//                                                 {hour}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(minute) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", , period = "AM"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/:(\d{2})/)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="Min" />
//                                           </SelectTrigger>
//                                           <SelectContent className="max-h-48 overflow-y-auto">
//                                             {[
//                                               "00",
//                                               "05",
//                                               "10",
//                                               "15",
//                                               "20",
//                                               "25",
//                                               "30",
//                                               "35",
//                                               "40",
//                                               "45",
//                                               "50",
//                                               "55",
//                                             ].map((minute) => (
//                                               <SelectItem key={minute} value={minute}>
//                                                 {minute}
//                                               </SelectItem>
//                                             ))}
//                                           </SelectContent>
//                                         </Select>

//                                         <Select
//                                           onValueChange={(period) => {
//                                             const currentTime = field.value || ""
//                                             const [, hour = "1", minute = "00"] =
//                                               currentTime.match(/(\d{1,2}):(\d{2})/i) || []
//                                             field.onChange(`${hour}:${minute} ${period}`)
//                                           }}
//                                           value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
//                                         >
//                                           <SelectTrigger className="h-10 text-sm border-gray-200">
//                                             <SelectValue placeholder="AM/PM" />
//                                           </SelectTrigger>
//                                           <SelectContent>
//                                             <SelectItem value="AM">AM</SelectItem>
//                                             <SelectItem value="PM">PM</SelectItem>
//                                           </SelectContent>
//                                         </Select>
//                                       </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     </div>
//                   </motion.div>

//                   {/* Submit Button */}
//                   <motion.div variants={itemVariants} className="pt-4">
//                     <Button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? (
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                         />
//                       ) : (
//                         <HiSpeakerphone className="w-4 h-4 mr-2" />
//                       )}
//                       {isSubmitting ? "Creating Poll..." : "Create Poll"}
//                     </Button>
//                   </motion.div>
//                 </form>
//               </Form>

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
//                           {submitStatus === "success" ? "Poll Created Successfully!" : "Failed to Create Poll"}
//                         </h4>
//                         <p className={`text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
//                           {submitStatus === "success"
//                             ? "Your poll has been created and sent to all course participants."
//                             : "There was an error creating your poll. Please try again."}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Info Box */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100"
//               >
//                 <div className="flex items-start gap-2">
//                   <HiInformationCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-xs sm:text-sm text-purple-700">
//                     <p className="font-medium mb-1">Poll Guidelines:</p>
//                     <ul className="space-y-1 text-purple-600">
//                       <li>• Provide at least 2 scheduling options for students to choose from</li>
//                       <li>• Include clear context explaining why the poll is needed</li>
//                       <li>• Students will receive notifications to vote on their preferred option</li>
//                       <li>• You can view poll results and responses in your dashboard</li>
//                     </ul>
//                   </div>
//                 </div>
//               </motion.div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </main>
//   )
// }




"use client"
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiSpeakerphone,
  HiAcademicCap,
  HiPencilAlt,
  HiCheck,
  HiInformationCircle,
  HiX,
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiPlus,
  HiTrash,
  HiUserGroup,
} from "react-icons/hi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

// Poll option schema
const pollOptionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  room: z.string().min(1, "Room is required"),
})

// Main form schema
const formSchema = z.object({
  selectedCourse: z.string().min(1, "Please select a course"),
  title: z.string().min(1, "Poll title is required"),
  context: z.string().min(10, "Context must be at least 10 characters long"),
  options: z.array(pollOptionSchema).min(2, "At least 2 options are required"),
})

export default function CreatePollPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [courseSearch, setCourseSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [allCourses, setAllCourses] = useState([])
  const [prefilledCourse, setPrefilledCourse] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCourse: "",
      title: "",
      context: "",
      options: [
        { date: "", startTime: "", endTime: "", room: "" },
        { date: "", startTime: "", endTime: "", room: "" },
      ],
    },
  })

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "options",
  })

  // Fetch user's teaching courses
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
        } else {
          console.error("Error fetching courses:", data.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }
    fetchCourses()
  }, [session])

  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".course-search-container")) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle pre-filled course data from URL params
  useEffect(() => {
    const courseId = searchParams.get("courseId")
    const courseCode = searchParams.get("courseCode")
    const courseTitle = searchParams.get("courseTitle")
    const professor = searchParams.get("professor")
    const studentsCount = searchParams.get("studentsCount")

    if (courseId && courseCode && courseTitle) {
      const prefilledData = {
        _id: courseId,
        courseCode: courseCode,
        title: courseTitle,
        professor: professor || "You",
        enrolledStudents: Array(Number.parseInt(studentsCount) || 0).fill({}),
      }
      setPrefilledCourse(prefilledData)
      form.setValue("selectedCourse", courseId)
      setCourseSearch(`${courseCode} - ${courseTitle}`)
    }
  }, [searchParams, form])

  const handleCourseSelection = (course) => {
    form.setValue("selectedCourse", course._id)
    setCourseSearch(`${course.courseCode} - ${course.title}`)
    setShowSuggestions(false)
    setPrefilledCourse(null) // Clear prefilled when manually selecting

    // Update URL with course details
    const queryParams = new URLSearchParams({
      courseId: course._id,
      courseCode: course.courseCode,
      courseTitle: course.title,
      professor: session?.user?.email || "",
      studentsCount: course.enrolledStudents?.length || 0,
    })

    router.push(`/professor/createPoll?${queryParams.toString()}`)
  }

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Get courseId from selected course or URL params
      const courseId = data.selectedCourse || searchParams.get("courseId")

      // Get professor email from session
      const profEmail = session?.user?.email || ""

      // Set default expiry date to 7 days from now
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 7)

      // Transform options to match backend format
      const transformedOptions = data.options.map((option) => {
        // Get day name from date
        const date = new Date(option.date)
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

        return {
          startTime: option.startTime,
          endTime: option.endTime,
          day: dayName,
          date: option.date,
          room: option.room,
        }
      })

      const requestBody = {
        options: transformedOptions,
        reason: data.title,
        context: data.context,
        prof: profEmail,
        courseId: courseId,
        expiryDate: expiryDate.toISOString(),
      }

      const response = await fetch("/api/professor/createPoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        // Reset form after success
        setTimeout(() => {
          form.reset()
          setCourseSearch("")
          setSubmitStatus(null)
          setPrefilledCourse(null)
        }, 3000)
      } else {
        setSubmitStatus("error")
        console.error("API Error:", result.message)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Network Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCourseData = prefilledCourse || allCourses.find((course) => course._id === form.watch("selectedCourse"))

  // Capitalize room name with smart formatting
  const capitalizeRoom = (room) => {
    return room
      .split(" ")
      .map((word) => {
        if (word.length === 0) return word
        // Handle special cases like "l01" -> "L01"
        if (/^[a-z]\d+$/i.test(word)) {
          return word.toUpperCase()
        }
        // Regular capitalization
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(" ")
  }

  // Format date to show date and day in DD-MM-YYYY Day format for input display
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

    // Capitalize first letter and add space instead of comma
    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()
    return `${day}-${month}-${year} ${capitalizedDayName}`
  }

  // Convert formatted display back to date string for form storage
  const parseDateFromDisplay = (displayValue) => {
    if (!displayValue) return ""
    const match = displayValue.match(/^(\d{2})-(\d{2})-(\d{4})/)
    if (match) {
      const [, day, month, year] = match
      return `${year}-${month}-${day}`
    }
    return ""
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
              <HiSpeakerphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Poll</h1>
              <p className="text-sm sm:text-base text-gray-600">Create a scheduling poll for your course</p>
            </div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg rounded-xl sm:rounded-2xl border bg-white/80 backdrop-blur-md border-gray-100">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2">
                <HiPencilAlt className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Poll Details</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Course Selection */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <FormField
                      control={form.control}
                      name="selectedCourse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                            <HiAcademicCap className="w-4 h-4 text-purple-600" />
                            Select Course
                          </FormLabel>
                          <div className="relative course-search-container">
                            <Input
                              value={courseSearch}
                              onChange={(e) => {
                                setCourseSearch(e.target.value)
                                setShowSuggestions(true)
                                setPrefilledCourse(null) // Clear prefilled when manually searching
                              }}
                              onFocus={() => setShowSuggestions(true)}
                              placeholder="Search for a course..."
                              className="bg-white/80 backdrop-blur-md border-gray-200"
                            />
                            <AnimatePresence>
                              {showSuggestions && filteredCourses.length > 0 && !prefilledCourse && (
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
                                        <span className="font-medium text-gray-800">
                                          {course.courseCode} - {course.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {course.enrolledStudents?.length || 0} students enrolled
                                        </span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Selected Course Display */}
                  <AnimatePresence>
                    {selectedCourseData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-purple-100"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{selectedCourseData.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">Course Code:</span> {selectedCourseData.courseCode}
                              </p>
                              <p>
                                <span className="font-medium">Professor:</span> {selectedCourseData.professor || "You"}
                              </p>
                              <div className="flex items-center gap-1">
                                <HiUserGroup className="w-4 h-4" />
                                <span>
                                  <span className="font-medium">Students:</span>{" "}
                                  {selectedCourseData.enrolledStudents?.length || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700 font-semibold">Selected</Badge>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Poll Title */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Poll Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Reschedule Class Due to Holiday"
                              className="bg-white/80 backdrop-blur-md border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Poll Context */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <FormField
                      control={form.control}
                      name="context"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                            Context & Reason
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Explain the reason for this poll and provide any additional context students should know..."
                              rows={4}
                              className="bg-white/80 backdrop-blur-md border-gray-200 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <div className="text-xs sm:text-sm text-gray-500">
                              {field.value?.length || 0} characters (minimum 10)
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Poll Options */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HiCalendar className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Schedule Options</h3>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendOption({ date: "", startTime: "", endTime: "", room: "" })}
                        className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <HiPlus className="w-4 h-4" />
                        Add Option
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {optionFields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-800">Option {index + 1}</h4>
                              {optionFields.length > 2 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeOption(index)}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <HiTrash className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Date - Fixed Section */}
                              <FormField
                                control={form.control}
                                name={`options.${index}.date`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                      <HiCalendar className="w-3 h-3" />
                                      Date
                                    </FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        {/* Visible input showing formatted date */}
                                        <Input
                                          type="text"
                                          className="bg-white border-gray-200 cursor-pointer pr-10"
                                          value={field.value ? formatDateForInput(field.value) : ""}
                                          placeholder="Click to select date"
                                          readOnly
                                          onClick={() => {
                                            // Trigger the hidden date input
                                            const hiddenInput = document.getElementById(`date-${index}`)
                                            if (hiddenInput) {
                                              hiddenInput.showPicker?.() || hiddenInput.click()
                                            }
                                          }}
                                        />
                                        {/* Calendar icon */}
                                        <HiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        {/* Hidden date input */}
                                        <input
                                          id={`date-${index}`}
                                          type="date"
                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                          value={field.value || ""}
                                          onChange={(e) => {
                                            field.onChange(e.target.value)
                                          }}
                                          style={{ zIndex: -1 }}
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {/* Room */}
                              <FormField
                                control={form.control}
                                name={`options.${index}.room`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                      <HiLocationMarker className="w-3 h-3" />
                                      Room
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., LH1, Lab A"
                                        className="bg-white border-gray-200"
                                        {...field}
                                        onChange={(e) => {
                                          const capitalizedValue = capitalizeRoom(e.target.value)
                                          field.onChange(capitalizedValue)
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Start Time */}
                              <FormField
                                control={form.control}
                                name={`options.${index}.startTime`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                      <HiClock className="w-3 h-3" />
                                      Start Time
                                    </FormLabel>
                                    <FormControl>
                                      <div className="grid grid-cols-3 gap-1">
                                        <Select
                                          onValueChange={(hour) => {
                                            const currentTime = field.value || ""
                                            const [, minute = "00", period = "AM"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="Hr" />
                                          </SelectTrigger>
                                          <SelectContent className="max-h-48 overflow-y-auto">
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                              <SelectItem key={hour} value={hour.toString()}>
                                                {hour}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <Select
                                          onValueChange={(minute) => {
                                            const currentTime = field.value || ""
                                            const [, hour = "1", , period = "AM"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/:(\d{2})/)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="Min" />
                                          </SelectTrigger>
                                          <SelectContent className="max-h-48 overflow-y-auto">
                                            {[
                                              "00",
                                              "05",
                                              "10",
                                              "15",
                                              "20",
                                              "25",
                                              "30",
                                              "35",
                                              "40",
                                              "45",
                                              "50",
                                              "55",
                                            ].map((minute) => (
                                              <SelectItem key={minute} value={minute}>
                                                {minute}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <Select
                                          onValueChange={(period) => {
                                            const currentTime = field.value || ""
                                            const [, hour = "1", minute = "00"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="AM/PM" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {/* End Time */}
                              <FormField
                                control={form.control}
                                name={`options.${index}.endTime`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                      <HiClock className="w-3 h-3" />
                                      End Time
                                    </FormLabel>
                                    <FormControl>
                                      <div className="grid grid-cols-3 gap-1">
                                        <Select
                                          onValueChange={(hour) => {
                                            const currentTime = field.value || ""
                                            const [, minute = "00", period = "AM"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/(\d{1,2}):/)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="Hr" />
                                          </SelectTrigger>
                                          <SelectContent className="max-h-48 overflow-y-auto">
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                              <SelectItem key={hour} value={hour.toString()}>
                                                {hour}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <Select
                                          onValueChange={(minute) => {
                                            const currentTime = field.value || ""
                                            const [, hour = "1", , period = "AM"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/:(\d{2})/)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="Min" />
                                          </SelectTrigger>
                                          <SelectContent className="max-h-48 overflow-y-auto">
                                            {[
                                              "00",
                                              "05",
                                              "10",
                                              "15",
                                              "20",
                                              "25",
                                              "30",
                                              "35",
                                              "40",
                                              "45",
                                              "50",
                                              "55",
                                            ].map((minute) => (
                                              <SelectItem key={minute} value={minute}>
                                                {minute}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <Select
                                          onValueChange={(period) => {
                                            const currentTime = field.value || ""
                                            const [, hour = "1", minute = "00"] =
                                              currentTime.match(/(\d{1,2}):(\d{2})/i) || []
                                            field.onChange(`${hour}:${minute} ${period}`)
                                          }}
                                          value={field.value?.match(/\s*(AM|PM)/i)?.[1] || ""}
                                        >
                                          <SelectTrigger className="h-10 text-sm border-gray-200">
                                            <SelectValue placeholder="AM/PM" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <HiSpeakerphone className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Creating Poll..." : "Create Poll"}
                    </Button>
                  </motion.div>
                </form>
              </Form>

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
                          {submitStatus === "success" ? "Poll Created Successfully!" : "Failed to Create Poll"}
                        </h4>
                        <p className={`text-sm ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                          {submitStatus === "success"
                            ? "Your poll has been created and sent to all course participants."
                            : "There was an error creating your poll. Please try again."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info Box */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-purple-100"
              >
                <div className="flex items-start gap-2">
                  <HiInformationCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-purple-700">
                    <p className="font-medium mb-1">Poll Guidelines:</p>
                    <ul className="space-y-1 text-purple-600">
                      <li>• Provide at least 2 scheduling options for students to choose from</li>
                      <li>• Include clear context explaining why the poll is needed</li>
                      <li>• Students will receive notifications to vote on their preferred option</li>
                      <li>• You can view poll results and responses in your dashboard</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}

