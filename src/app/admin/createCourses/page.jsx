// "use client"
// import React from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Plus, Trash2, GraduationCap, User, Mail, X } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"

// const scheduleSchema = z.object({
//   day: z.enum(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], {
//     required_error: "Please select a day",
//   }),
//   startTime: z.string().min(1, "Start time is required"),
//   endTime: z.string().min(1, "End time is required"),
//   room: z.string().min(1, "Room is required"),
// })

// const professorSchema = z.object({
//   name: z.string().min(1, "Professor name is required"),
//   email: z.string().email("Please enter a valid email address"),
// })

// const formSchema = z
//   .object({
//     title: z.string().min(1, "Course title is required"),
//     year: z.string().min(1, "Year is required"),
//     courseCode: z.string().min(1, "Course code is required"),
//     semesterYear: z.string().min(1, "Semester year is required"),
//     duration: z.string().min(1, "Duration is required"),
//     L: z.number().min(0, "L must be 0 or greater").max(10, "L cannot exceed 10"),
//     T: z.number().min(0, "T must be 0 or greater").max(10, "T cannot exceed 10"),
//     P: z.number().min(0, "P must be 0 or greater").max(10, "P cannot exceed 10"),
//     C: z.number().min(0, "C must be 0 or greater").max(20, "C cannot exceed 20"),
//     courseCoordinator: z.string().min(1, "Course coordinator is required"),
//     professors: z.array(professorSchema).min(1, "At least one professor is required"),
//     selectedDepartments: z.array(z.string()),
//     rollNumbers: z.array(z.string()),
//     schedule: z.array(scheduleSchema).optional(),
//   })
//   .refine(
//     (data) => {
//       return data.selectedDepartments.length > 0 || data.rollNumbers.length > 0
//     },
//     {
//       message: "Either select at least one department or add at least one roll number",
//       path: ["selectedDepartments"],
//     },
//   )

// const departments = [
//   "Chemical Engineering",
//   "Civil Engineering",
//   "Computer Science and Engineering",
//   "Electrical Engineering",
//   "Engineering Physics",
//   "Space Sciences and Engineering",
//   "Mathematics and Computing",
//   "Mechanical Engineering",
//   "Metallurgical Engineering & Materials Science",
// ]

// // Generate years from 2008 to current year + 4
// const currentYear = new Date().getFullYear()
// const years = Array.from({ length: currentYear + 4 - 2008 + 1 }, (_, i) => 2008 + i)

// export default function CreateCoursePage() {
//   const router = useRouter()
//   const [errorMsg, setErrorMsg] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [rollNumberInput, setRollNumberInput] = useState("")
//   const [rollNumberError, setRollNumberError] = useState("")
//   const [generalError, setGeneralError] = useState("")

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       year: "",
//       courseCode: "",
//       semesterYear: "",
//       duration: "",
//       L: 0,
//       T: 0,
//       P: 0,
//       C: 0,
//       courseCoordinator: "",
//       professors: [{ name: "", email: "" }],
//       selectedDepartments: [],
//       rollNumbers: [],
//       schedule: [],
//     },
//   })

//   const watchYear = form.watch("year")
//   const watchSemesterYear = form.watch("semesterYear")
//   const watchDuration = form.watch("duration")

//   // Compute semester value dynamically
//   const semesterValue = watchSemesterYear && watchDuration ? `${watchSemesterYear} ${watchDuration}` : ""

//   const {
//     fields: professorFields,
//     append: appendProfessor,
//     remove: removeProfessor,
//   } = useFieldArray({
//     control: form.control,
//     name: "professors",
//   })

//   const {
//     fields: scheduleFields,
//     append: appendSchedule,
//     remove: removeSchedule,
//   } = useFieldArray({
//     control: form.control,
//     name: "schedule",
//   })

//   // Validate roll number (exactly 9 characters)
//   const validateRollNumber = (rollNumber) => {
//     return rollNumber.trim().length === 9
//   }

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

//   const addRollNumbers = () => {
//     if (rollNumberInput.trim()) {
//       setRollNumberError("")
//       const currentRollNumbers = form.getValues("rollNumbers") || []

//       // Enhanced parsing: split by comma and/or spaces, filter empty strings
//       const newRollNumbers = rollNumberInput
//         .split(/[,\s]+/)
//         .map((num) => num.trim())
//         .filter((num) => num.length > 0)

//       const validRollNumbers = []
//       const invalidRollNumbers = []

//       newRollNumbers.forEach((rollNumber) => {
//         if (validateRollNumber(rollNumber)) {
//           if (!currentRollNumbers.includes(rollNumber)) {
//             validRollNumbers.push(rollNumber)
//           }
//         } else {
//           invalidRollNumbers.push(rollNumber)
//         }
//       })

//       if (invalidRollNumbers.length > 0) {
//         setRollNumberError(`Invalid roll numbers (must be exactly 9 characters): ${invalidRollNumbers.join(", ")}`)
//         return
//       }

//       if (validRollNumbers.length > 0) {
//         form.setValue("rollNumbers", [...currentRollNumbers, ...validRollNumbers])
//         setRollNumberInput("")
//       }
//     }
//   }

//   const removeRollNumber = (index) => {
//     const currentRollNumbers = form.getValues("rollNumbers") || []
//     const updatedRollNumbers = currentRollNumbers.filter((_, i) => i !== index)
//     form.setValue("rollNumbers", updatedRollNumbers)
//   }

//   const handleKeyDown = (e, nextFieldName) => {
//     if (e.key === "Enter") {
//       e.preventDefault()
//       const nextField = document.querySelector(`[name="${nextFieldName}"]`)
//       if (nextField) {
//         nextField.focus()
//       }
//     }
//   }

//   const onSubmit = async (data) => {
//     setErrorMsg("")
//     setGeneralError("")

//     // Check for required fields
//     const requiredFields = [
//       { field: data.title, name: "Course Title" },
//       { field: data.year, name: "Year" },
//       { field: data.courseCode, name: "Course Code" },
//       { field: data.semesterYear, name: "Semester Year" },
//       { field: data.duration, name: "Duration" },
//       { field: data.L !== undefined && data.L !== "", name: "L" },
//       { field: data.T !== undefined && data.T !== "", name: "T" },
//       { field: data.P !== undefined && data.P !== "", name: "P" },
//       { field: data.C !== undefined && data.C !== "", name: "C" },
//       { field: data.courseCoordinator, name: "Course Coordinator" },
//     ]

//     // Check professors
//     const hasValidProfessors = data.professors.some((prof) => prof.name && prof.email)
//     if (!hasValidProfessors) {
//       requiredFields.push({ field: false, name: "At least one professor" })
//     }

//     // Check departments or roll numbers
//     if (data.selectedDepartments.length === 0 && data.rollNumbers.length === 0) {
//       requiredFields.push({ field: false, name: "Departments or roll numbers" })
//     }

//     const missingFields = requiredFields.filter((item) => !item.field)

//     if (missingFields.length > 0) {
//       setGeneralError("All starred fields are required")
//       return
//     }

//     setLoading(true)

//     try {
//       const courseData = {
//         title: data.title,
//         year: data.year,
//         courseCode: data.courseCode,
//         forSemester: semesterValue,
//         L: data.L,
//         T: data.T,
//         P: data.P,
//         C: data.C,
//         courseCoordinator: data.courseCoordinator,
//         profName: data.professors.map((prof) => prof.name),
//         profEmail: data.professors.map((prof) => prof.email),
//         selectedDepartments: data.selectedDepartments,
//         rollNumbers: data.rollNumbers || [],
//         schedule:
//           data.schedule?.map((slot) => ({
//             day: slot.day,
//             start: slot.startTime,
//             end: slot.endTime,
//             room: slot.room,
//           })) || [],
//       }

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       setLoading(false)
//       alert("Course created successfully!")
//       console.log("Course Data:", courseData)
//     } catch (error) {
//       console.error("Course creation error:", error)
//       setErrorMsg("Something went wrong. Please try again.")
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 50 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="w-full max-w-5xl mx-auto"
//       >
//         <Card className="shadow-2xl rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg overflow-visible">
//           <CardContent className="py-12 px-10 overflow-visible">
//             <div className="flex flex-col items-center justify-between gap-3 mb-8">
//               <div className="flex items-center gap-4">
//                 <div>
//                   <GraduationCap className="w-10 h-10 text-blue-600" />
//                 </div>
//                 <h2 className="text-4xl font-bold text-gray-800">Create New Course</h2>
//               </div>
//               <Link
//                 href="/courses"
//                 className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//               >
//                 ← Back to courses
//               </Link>
//             </div>

//             <p className="text-sm text-gray-600 text-center mb-10 max-w-2xl mx-auto">
//               Fill in the details below to create a new course for the semester. All required fields must be completed
//               before submission.
//             </p>

//             {errorMsg && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-sm text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg text-center mb-8 shadow-sm"
//               >
//                 {errorMsg}
//               </motion.div>
//             )}

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 overflow-visible">
//                 {/* Basic Course Information */}
//                 <motion.section
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="space-y-8 overflow-visible"
//                 >
//                   <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                       1
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800">Course Information</h3>
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel
//                           className={`text-base font-semibold ${form.formState.errors.title ? "text-red-600" : "text-gray-700"}`}
//                         >
//                           Course Title *
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="e.g., Introduction to Machine Learning"
//                             className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                             {...field}
//                             onKeyDown={(e) => handleKeyDown(e, "year")}
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-visible">
//                     <FormField
//                       control={form.control}
//                       name="year"
//                       render={({ field }) => (
//                         <FormItem className="overflow-visible">
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.year ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Year *
//                           </FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger className="h-12 w-full text-base border-2 focus:border-blue-400">
//                                 <SelectValue placeholder="Select academic year" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent className="z-50">
//                               <SelectItem value="1">1st Year</SelectItem>
//                               <SelectItem value="2">2nd Year</SelectItem>
//                               <SelectItem value="3">3rd Year</SelectItem>
//                               <SelectItem value="4">4th Year</SelectItem>
//                               <SelectItem value="5">5th Year</SelectItem>
//                               <SelectItem value="6">6th Year</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="courseCode"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.courseCode ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Course Code *
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., CS 101"
//                               className="h-12 text-base border-2 focus:border-blue-400 transition-colors uppercase"
//                               {...field}
//                               onChange={(e) => field.onChange(e.target.value.toUpperCase())}
//                               onKeyDown={(e) => handleKeyDown(e, "semesterYear")}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Enhanced Semester Fields */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
//                     <FormField
//                       control={form.control}
//                       name="semesterYear"
//                       render={({ field }) => (
//                         <FormItem className="overflow-visible">
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.semesterYear ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Semester Year *
//                           </FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
//                                 <SelectValue placeholder="Select year" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent className="max-h-60 z-50">
//                               {years.map((year) => (
//                                 <SelectItem key={year} value={year.toString()}>
//                                   {year}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="duration"
//                       render={({ field }) => (
//                         <FormItem className="overflow-visible">
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.duration ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Duration *
//                           </FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
//                                 <SelectValue placeholder="Select duration" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent className="z-50">
//                               <SelectItem value="Autumn">🍂 Autumn</SelectItem>
//                               <SelectItem value="Spring">🌸 Spring</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />

//                     <div className="space-y-2">
//                       <label className="text-base font-semibold text-gray-700">Semester</label>
//                       <div className="flex items-center h-12 px-4 py-2 border-2 border-gray-200 rounded-md bg-gray-50">
//                         <span className="text-base text-gray-700 font-medium">
//                           {semesterValue || "Select year and duration"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="grid grid-cols-4 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="L"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               className={`text-base font-semibold ${form.formState.errors.L ? "text-red-600" : "text-gray-700"}`}
//                             >
//                               Lectures *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 max="10"
//                                 placeholder="0"
//                                 className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
//                                 {...field}
//                                 onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
//                                 onKeyDown={(e) => handleKeyDown(e, "T")}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="T"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               className={`text-base font-semibold ${form.formState.errors.T ? "text-red-600" : "text-gray-700"}`}
//                             >
//                               Tutorials *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 max="10"
//                                 placeholder="0"
//                                 className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
//                                 {...field}
//                                 onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
//                                 onKeyDown={(e) => handleKeyDown(e, "P")}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="P"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               className={`text-base font-semibold ${form.formState.errors.P ? "text-red-600" : "text-gray-700"}`}
//                             >
//                               Practicals *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 max="10"
//                                 placeholder="0"
//                                 className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
//                                 {...field}
//                                 onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
//                                 onKeyDown={(e) => handleKeyDown(e, "C")}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="C"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel
//                               className={`text-base font-semibold ${form.formState.errors.C ? "text-red-600" : "text-gray-700"}`}
//                             >
//                               Credits *
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 max="20"
//                                 placeholder="0"
//                                 className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
//                                 {...field}
//                                 onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
//                                 onKeyDown={(e) => handleKeyDown(e, "courseCoordinator")}
//                               />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <FormField
//                       control={form.control}
//                       name="courseCoordinator"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.courseCoordinator ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Course Coordinator *
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="e.g., Dr. Smith"
//                               className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                               {...field}
//                               onKeyDown={(e) => handleKeyDown(e, "professors.0.name")}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </motion.section>

//                 {/* Professors Section */}
//                 <motion.section
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="space-y-8"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                         2
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800">Professors</h3>
//                     </div>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => appendProfessor({ name: "", email: "" })}
//                       className="flex items-center gap-2 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Professor
//                     </Button>
//                   </div>

//                   <AnimatePresence>
//                     {professorFields.map((field, index) => (
//                       <motion.div
//                         key={field.id}
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50"
//                       >
//                         <FormField
//                           control={form.control}
//                           name={`professors.${index}.name`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel
//                                 className={`text-base font-semibold ${form.formState.errors.professors?.[index]?.name ? "text-red-600" : "text-gray-700"}`}
//                               >
//                                 Professor Name *
//                               </FormLabel>
//                               <FormControl>
//                                 <div className="relative">
//                                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                                   <Input
//                                     placeholder="Dr. John Doe"
//                                     className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                     {...field}
//                                     onKeyDown={(e) => handleKeyDown(e, `professors.${index}.email`)}
//                                   />
//                                 </div>
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />

//                         <FormField
//                           control={form.control}
//                           name={`professors.${index}.email`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel
//                                 className={`text-base font-semibold ${form.formState.errors.professors?.[index]?.email ? "text-red-600" : "text-gray-700"}`}
//                               >
//                                 Email *
//                               </FormLabel>
//                               <FormControl>
//                                 <div className="relative flex gap-3">
//                                   <div className="relative flex-1">
//                                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                                     <Input
//                                       type="email"
//                                       placeholder="john.doe@university.edu"
//                                       className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                       {...field}
//                                       onKeyDown={(e) => handleKeyDown(e, "selectedDepartments")}
//                                     />
//                                   </div>
//                                   {professorFields.length > 1 && (
//                                     <Button
//                                       type="button"
//                                       variant="outline"
//                                       size="sm"
//                                       onClick={() => removeProfessor(index)}
//                                       className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                     </Button>
//                                   )}
//                                 </div>
//                               </FormControl>
//                             </FormItem>
//                           )}
//                         />
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </motion.section>

//                 {/* Enhanced Enrolled Students Section */}
//                 <motion.section
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-8"
//                 >
//                   <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                       3
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800">Enrolled Students</h3>
//                   </div>

//                   {/* Department Selection */}
//                   <FormField
//                     control={form.control}
//                     name="selectedDepartments"
//                     render={() => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-gray-700">
//                           Select Departments
//                           <span className="text-sm font-normal text-gray-500 ml-2">
//                             (Optional if roll numbers are provided)
//                           </span>
//                         </FormLabel>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 max-h-72 overflow-y-auto">
//                           {departments.map((department) => (
//                             <FormField
//                               key={department}
//                               control={form.control}
//                               name="selectedDepartments"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={department}
//                                     className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-lg hover:bg-white transition-colors"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(department)}
//                                         onCheckedChange={(checked) => {
//                                           return checked
//                                             ? field.onChange([...field.value, department])
//                                             : field.onChange(field.value?.filter((value) => value !== department))
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-medium cursor-pointer leading-relaxed">
//                                       {department}
//                                     </FormLabel>
//                                   </FormItem>
//                                 )
//                               }}
//                             />
//                           ))}
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Enhanced Roll Numbers Section */}
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-2">
//                       <label className="text-base font-semibold text-gray-700">Additional Roll Numbers</label>
//                       <span className="text-sm font-normal text-gray-500">(Optional if departments are selected)</span>
//                     </div>

//                     {/* Roll Number Error */}
//                     <AnimatePresence>
//                       {rollNumberError && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           className="text-sm text-red-700 bg-red-50 border-2 border-red-200 p-4 rounded-lg shadow-sm"
//                         >
//                           <strong>Error:</strong> {rollNumberError}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     <div className="flex gap-3">
//                       <Input
//                         placeholder="Enter roll numbers (comma or space separated, 9 characters each) e.g., 240001070, 240001071"
//                         value={rollNumberInput}
//                         onChange={(e) => {
//                           setRollNumberInput(e.target.value)
//                           if (rollNumberError) setRollNumberError("")
//                         }}
//                         onKeyPress={(e) => {
//                           if (e.key === "Enter") {
//                             e.preventDefault()
//                             addRollNumbers()
//                           }
//                         }}
//                         className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                       />
//                       <Button
//                         type="button"
//                         onClick={addRollNumbers}
//                         variant="outline"
//                         className="h-12 px-6 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </Button>
//                     </div>

//                     {/* Enhanced Roll Numbers Display */}
//                     <AnimatePresence>
//                       {form.watch("rollNumbers")?.length > 0 && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="max-h-64 overflow-y-auto p-6 bg-blue-50/50 rounded-xl border-2 border-blue-200"
//                         >
//                           <div className="flex items-center justify-between mb-4">
//                             <h4 className="text-sm font-semibold text-gray-700">
//                               Added Roll Numbers ({form.watch("rollNumbers").length})
//                             </h4>
//                           </div>
//                           <div className="flex flex-wrap gap-3">
//                             {form.watch("rollNumbers").map((rollNumber, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
//                               >
//                                 {rollNumber}
//                                 <button
//                                   type="button"
//                                   onClick={() => removeRollNumber(index)}
//                                   className="ml-1 text-blue-600 hover:text-blue-800 transition-colors"
//                                 >
//                                   <X className="w-4 h-4" />
//                                 </button>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </motion.section>

//                 {/* Enhanced Schedule Section */}
//                 <AnimatePresence>
//                   {watchYear && (
//                     <motion.section
//                       initial={{ opacity: 0, y: 20, height: 0 }}
//                       animate={{ opacity: 1, y: 0, height: "auto" }}
//                       exit={{ opacity: 0, y: -20, height: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="space-y-8 overflow-visible"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
//                           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                             4
//                           </div>
//                           <h3 className="text-xl font-bold text-gray-800">Schedule</h3>
//                         </div>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => appendSchedule({ day: "Monday", startTime: "", endTime: "", room: "" })}
//                           className="flex items-center gap-2 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
//                         >
//                           <Plus className="w-4 h-4" />
//                           Add Time Slot
//                         </Button>
//                       </div>

//                       <AnimatePresence>
//                         {scheduleFields.map((field, index) => (
//                           <motion.div
//                             key={field.id}
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 overflow-visible"
//                           >
//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.day`}
//                               render={({ field }) => (
//                                 <FormItem className="overflow-visible">
//                                   <FormLabel className="text-base font-semibold text-gray-700">Day *</FormLabel>
//                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                     <FormControl>
//                                       <SelectTrigger className="h-12 text-base border-2 focus:border-blue-400">
//                                         <SelectValue placeholder="Select day" />
//                                       </SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent className="z-50">
//                                       <SelectItem value="Sunday">🌅 Sunday</SelectItem>
//                                       <SelectItem value="Monday">📅 Monday</SelectItem>
//                                       <SelectItem value="Tuesday">📅 Tuesday</SelectItem>
//                                       <SelectItem value="Wednesday">📅 Wednesday</SelectItem>
//                                       <SelectItem value="Thursday">📅 Thursday</SelectItem>
//                                       <SelectItem value="Friday">📅 Friday</SelectItem>
//                                       <SelectItem value="Saturday">🌅 Saturday</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.startTime`}
//                               render={({ field }) => (
//                                 <FormItem className="overflow-visible">
//                                   <FormLabel className="text-base font-semibold text-gray-700">Start Time *</FormLabel>
//                                   <FormControl>
//                                     <Input
//                                       placeholder="8:30 AM"
//                                       className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                       {...field}
//                                       onKeyDown={(e) => handleKeyDown(e, `schedule.${index}.endTime`)}
//                                     />
//                                   </FormControl>
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.endTime`}
//                               render={({ field }) => (
//                                 <FormItem className="overflow-visible">
//                                   <FormLabel className="text-base font-semibold text-gray-700">End Time *</FormLabel>
//                                   <FormControl>
//                                     <Input
//                                       placeholder="9:30 AM"
//                                       className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                       {...field}
//                                       onKeyDown={(e) => handleKeyDown(e, `schedule.${index}.room`)}
//                                     />
//                                   </FormControl>
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.room`}
//                               render={({ field }) => (
//                                 <FormItem>
//                                   <FormLabel className="text-base font-semibold text-gray-700">Room *</FormLabel>
//                                   <FormControl>
//                                     <div className="relative flex gap-3">
//                                       <Input
//                                         placeholder="e.g., gargi hall"
//                                         className="flex-1 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                         {...field}
//                                         onChange={(e) => {
//                                           const capitalizedValue = capitalizeRoom(e.target.value)
//                                           field.onChange(capitalizedValue)
//                                         }}
//                                       />
//                                       {scheduleFields.length > 1 && (
//                                         <Button
//                                           type="button"
//                                           variant="outline"
//                                           size="sm"
//                                           onClick={() => removeSchedule(index)}
//                                           className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
//                                         >
//                                           <Trash2 className="w-4 h-4" />
//                                         </Button>
//                                       )}
//                                     </div>
//                                   </FormControl>
//                                 </FormItem>
//                               )}
//                             />
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     </motion.section>
//                   )}
//                 </AnimatePresence>

//                 {/* Enhanced Submit Section */}
//                 {generalError && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-sm text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg text-center mb-4 shadow-sm"
//                   >
//                     {generalError}
//                   </motion.div>
//                 )}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex gap-6 pt-8 border-t-2 border-gray-200"
//                 >
//                   <Button
//                     type="submit"
//                     className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <div className="flex items-center gap-3">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Creating Course...
//                       </div>
//                     ) : (
//                       "Create Course"
//                     )}
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="px-8 h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-lg transition-colors"
//                     onClick={() => router.push("/courses")}
//                   >
//                     Cancel
//                   </Button>
//                 </motion.div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }


"use client"
import { useState } from "react"
import React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Save, RotateCcw, GraduationCap, Clock } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Time slots configuration
const timeSlots = [
  { id: "slot1", label: "8:30-9:25", start: "8:30", end: "9:25" },
  { id: "slot2", label: "9:30-10:25", start: "9:30", end: "10:25" },
  { id: "slot3", label: "10:30-11:25", start: "10:30", end: "11:25" },
  { id: "slot4", label: "11:30-12:25", start: "11:30", end: "12:25" },
  { id: "lunch", label: "12:30-13:25", start: "12:30", end: "13:25", isLunch: true },
  { id: "slot5", label: "13:30-14:25", start: "13:30", end: "14:25" },
  { id: "slot6", label: "14:30-15:25", start: "14:30", end: "15:25" },
  { id: "slot7", label: "15:30-16:25", start: "15:30", end: "16:25" },
  { id: "slot8", label: "16:30-17:25", start: "16:30", end: "17:25" },
  { id: "slot9", label: "17:30-18:25", start: "17:30", end: "18:25" },
]

const daysOfWeek = [
  { id: "monday", label: "Mon", fullName: "Monday" },
  { id: "tuesday", label: "Tue", fullName: "Tuesday" },
  { id: "wednesday", label: "Wed", fullName: "Wednesday" },
  { id: "thursday", label: "Thu", fullName: "Thursday" },
  { id: "friday", label: "Fri", fullName: "Friday" },
  { id: "saturday", label: "Sat", fullName: "Saturday" },
]

// Predefined room options
const commonRooms = [
  "Gargi Hall",
  "Kalpana Hall",
  "Vikram Hall",
  "Bhabha Hall",
  "L01",
  "L02",
  "L03",
  "L04",
  "L05",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "N1",
  "N2",
  "N3",
  "N4",
  "N5",
  "O1",
  "O2",
  "O3",
  "O4",
  "O5",
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "Lab A",
  "Lab B",
  "Lab C",
  "Computer Lab",
  "Physics Lab",
]

// Cell input component
const TimetableCell = ({
  day,
  slot,
  value,
  onChange,
  isLunch,
  activeDropdown,
  closeAllDropdowns,
  setActiveDropdown,
}) => {
  const [localValue, setLocalValue] = useState(value || { course: "", room: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [roomSearchText, setRoomSearchText] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const courseInputRef = React.useRef(null)
  const roomInputRef = React.useRef(null)
  const cellId = `${day}-${slot}`

  const showRoomDropdown = activeDropdown === cellId

  // Capitalize room names properly
  const capitalizeRoomName = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const filteredRooms = commonRooms.filter((room) => room.toLowerCase().includes(roomSearchText.toLowerCase()))

  const handleChange = (field, newValue) => {
    const updated = { ...localValue, [field]: newValue }
    setLocalValue(updated)
    onChange(updated)
  }

  const handleRoomSelect = (room) => {
    handleChange("room", room)
    setRoomSearchText("")
    closeAllDropdowns()
    setHighlightedIndex(0)
  }

  const handleCellClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
    closeAllDropdowns()
  }

  const handleCourseKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      roomInputRef.current?.focus()
    }
  }

  const handleRoomInputChange = (e) => {
    const value = capitalizeRoomName(e.target.value)
    setRoomSearchText(value)
    handleChange("room", value)
    setActiveDropdown(cellId)
    setHighlightedIndex(0)
  }

  const handleRoomKeyDown = (e) => {
    if (showRoomDropdown && filteredRooms.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev + 1) % filteredRooms.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev - 1 + filteredRooms.length) % filteredRooms.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        handleRoomSelect(filteredRooms[highlightedIndex])
      }
    }
  }

  const handleRoomFocus = () => {
    setActiveDropdown(cellId)
  }

  const handleEditingEnd = () => {
    setIsEditing(false)
    setActiveDropdown(null)
    setRoomSearchText("")
  }

  // Don't show empty cells in display mode
  const hasContent = localValue.course || localValue.room

  if (isLunch) {
    return (
      <div className="h-16 sm:h-20 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
        <span className="text-sm font-medium text-orange-700">Lunch Break</span>
      </div>
    )
  }

  return (
    <div
      className="h-16 sm:h-20 bg-white border-2 border-gray-200 rounded-lg p-1 sm:p-2 hover:border-blue-300 transition-colors cursor-pointer group relative"
      onClick={handleCellClick}
    >
      {isEditing ? (
        <div className="h-full flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
          <Input
            ref={courseInputRef}
            placeholder="Course"
            value={localValue.course}
            onChange={(e) => handleChange("course", e.target.value.toUpperCase())}
            onKeyDown={handleCourseKeyDown}
            onBlur={() => {
              if (!localValue.course && !localValue.room) {
                handleEditingEnd()
              }
            }}
            className="h-6 text-xs border-0 p-1 bg-blue-50 focus:bg-white"
            autoFocus
          />
          <div className="relative">
            <Input
              ref={roomInputRef}
              placeholder="Type or select room"
              value={localValue.room}
              onChange={handleRoomInputChange}
              onKeyDown={handleRoomKeyDown}
              onFocus={handleRoomFocus}
              onBlur={() => {
                setTimeout(() => {
                  if (!localValue.course && !localValue.room) {
                    handleEditingEnd()
                  }
                }, 150)
              }}
              className="h-6 text-xs border-0 p-1 bg-gray-50 focus:bg-white"
            />
            {showRoomDropdown && filteredRooms.length > 0 && (
              <div className="absolute top-full left-0 w-48 bg-white border-2 border-blue-200 rounded-lg shadow-xl z-[500] max-h-40 overflow-y-auto">
                <div className="p-2 border-b border-gray-200">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Select Room:</div>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {filteredRooms.map((room, index) => (
                    <button
                      key={room}
                      type="button"
                      onClick={() => handleRoomSelect(room)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        index === highlightedIndex ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center text-center group-hover:bg-blue-50 rounded transition-colors">
          {hasContent ? (
            <>
              {localValue.course && (
                <div className="text-xs sm:text-sm font-semibold text-blue-700 leading-tight">{localValue.course}</div>
              )}
              {localValue.room && <div className="text-xs text-gray-600 leading-tight">{localValue.room}</div>}
            </>
          ) : (
            <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to add
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TimetablePage() {
  const router = useRouter()
  const [timetableData, setTimetableData] = useState({})
  const [loading, setLoading] = useState(false)
  const [timetableTitle, setTimetableTitle] = useState("")
  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [lunchBreakSlot, setLunchBreakSlot] = useState("lunch")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [year, setYear] = useState("")

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        closeAllDropdowns()
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleCellChange = (day, slot, value) => {
    setTimetableData((prev) => ({
      ...prev,
      [`${day}-${slot}`]: value,
    }))
  }

  const handleReset = () => {
    setShowResetConfirm(true)
  }

  const confirmReset = () => {
    setTimetableData({})
    setTimetableTitle("")
    setAcademicYear("")
    setSemester("")
    setYear("")
    setLunchBreakSlot("lunch")
    setShowResetConfirm(false)
    // Force re-render of all cells
    window.location.reload()
  }

  const cancelReset = () => {
    setShowResetConfirm(false)
  }

  const handleSave = async () => {
    if (!timetableTitle.trim()) {
      alert("Please enter a timetable title")
      return
    }

    if (!academicYear || !semester || !year) {
      alert("Please select semester year, semester, and year")
      return
    }

    setLoading(true)

    try {
      // Convert timetableData to 6x10 grid format
      const grid = daysOfWeek.map((day) => {
        return timeSlots.map((timeSlot) => {
          const cellKey = `${day.id}-${timeSlot.id}`
          const cellData = timetableData[cellKey]

          // Handle lunch break
          if (timeSlot.id === lunchBreakSlot) {
            return {
              slot: "LB",
              room: "",
            }
          }

          // Handle filled slots
          if (cellData && (cellData.course || cellData.room)) {
            return {
              slot: cellData.course || "FS",
              room: cellData.room || "",
            }
          }

          // Handle free slots
          return {
            slot: "FS",
            room: "",
          }
        })
      })

      const payload = {
        grid: grid,
        semester: semester+academicYear,
        year: Number.parseInt(year), // Convert to number
      }
      console.log(payload)
      // Send to backend
      const response = await fetch("/api/createGrid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        alert("Timetable saved successfully!")
        console.log("Grid saved:", result.grid)
      } else {
        throw new Error(result.message || "Failed to save timetable")
      }
    } catch (error) {
      console.error("Save error:", error)
      alert(`Failed to save timetable: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto"
      >
        <Card className="shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
          <CardContent className="p-4 sm:p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
                  Timetable Builder
                </h1>
              </div>
              <Link
                href="/courses"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ← Back to courses
              </Link>
            </div>

            {/* Timetable Info */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6 sm:mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Timetable Title *</label>
                <Input
                  placeholder="e.g., B.Tech 2nd Year - Spring 2024"
                  value={timetableTitle}
                  onChange={(e) => setTimetableTitle(e.target.value)}
                  className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Year *</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                    <SelectItem value="6">6th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Semester Year *</label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
                    <SelectValue placeholder="Select semester year" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Semester *</label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="autumn">Autumn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Lunch Break Slot</label>
                <Select value={lunchBreakSlot} onValueChange={setLunchBreakSlot}>
                  <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
                    <SelectValue placeholder="Select lunch slot" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">How to use:</p>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>• Click on any cell to add course code and room</li>
                    <li>• Course codes will be automatically capitalized</li>
                    <li>• Select rooms from the dropdown or type custom ones</li>
                    <li>• Lunch break is automatically handled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timetable Grid */}
            <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
              <div className="min-w-[800px] p-4">
                {/* Header Row */}
                <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
                    <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
                  </div>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border border-gray-300 rounded-lg p-1 sm:p-2 text-center ${
                        slot.id === lunchBreakSlot ? "bg-orange-100" : "bg-blue-50"
                      }`}
                    >
                      <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
                    </div>
                  ))}
                </div>

                {/* Timetable Rows */}
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
                    </div>
                    {timeSlots.map((slot) => (
                      <TimetableCell
                        key={`${day.id}-${slot.id}`}
                        day={day.id}
                        slot={slot.id}
                        value={timetableData[`${day.id}-${slot.id}`]}
                        onChange={(value) => handleCellChange(day.id, slot.id, value)}
                        isLunch={slot.id === lunchBreakSlot}
                        activeDropdown={activeDropdown}
                        closeAllDropdowns={closeAllDropdowns}
                        setActiveDropdown={setActiveDropdown}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 pt-6 border-t-2 border-gray-200">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Timetable...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Timetable
                  </div>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-base sm:text-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() => router.push("/courses")}
                variant="outline"
                className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-base sm:text-lg transition-colors"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[300] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset the entire timetable? This action cannot be undone and will clear all
              entered data.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={cancelReset}
                variant="outline"
                className="px-4 py-2 border-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button onClick={confirmReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
