
// "use client"

// import { useForm, useFieldArray } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { HiPlus, HiTrash, HiAcademicCap, HiUser, HiMail, HiX } from "react-icons/hi"
// import { motion, AnimatePresence } from "framer-motion"

// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
//   name: z.string(),
//   email: z.string().email(),
// })

// const formSchema = z
//   .object({
//     title: z.string(),
//     year: z.string(),
//     courseCode: z.string(),
//     semesterYear: z.string(),
//     duration: z.string(),
//     credits: z.number().min(0.5, "Credits must be at least 0.5").max(20, "Credits cannot exceed 20"),
//     courseCoordinator: z.string(),
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

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       year: "",
//       courseCode: "",
//       semesterYear: "",
//       duration: "",
//       credits: 3,
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

//   const onSubmit = async (data) => {
//     setErrorMsg("")
//     setLoading(true)

//     try {
//       const courseData = {
//         title: data.title,
//         year: data.year,
//         courseCode: data.courseCode,
//         forSemester: semesterValue,
//         credits: data.credits,
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
//                   <HiAcademicCap className="w-10 h-10 text-blue-600" />
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
//                         <FormLabel className="text-base font-semibold text-gray-700">Course Title *</FormLabel>
//                         <motion.div
//                           initial={false}
//                           animate={{ scale: form.formState.errors.title ? 1.02 : 1 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Input
//                             placeholder="e.g., Introduction to Machine Learning"
//                             className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                             {...field}
//                           />
//                         </motion.div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-visible">
//                     <FormField
//                       control={form.control}
//                       name="year"
//                       render={({ field }) => (
//                         <FormItem className="overflow-visible">
//                           <FormLabel className="text-base font-semibold text-gray-700">Year *</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <SelectTrigger className="h-12 w-full text-base border-2 focus:border-blue-400">
//                               <SelectValue placeholder="Select academic year" />
//                             </SelectTrigger>
//                             <SelectContent className="z-50">
//                               <SelectItem value="1">1st Year</SelectItem>
//                               <SelectItem value="2">2nd Year</SelectItem>
//                               <SelectItem value="3">3rd Year</SelectItem>
//                               <SelectItem value="4">4th Year</SelectItem>
//                               <SelectItem value="5">5th Year</SelectItem>
//                               <SelectItem value="6">6th Year</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="courseCode"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-base font-semibold text-gray-700">Course Code *</FormLabel>
//                           <motion.div
//                             initial={false}
//                             animate={{ scale: form.formState.errors.courseCode ? 1.02 : 1 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <Input
//                               placeholder="e.g., CS 101"
//                               className="h-12 text-base border-2 focus:border-blue-400 transition-colors uppercase"
//                               {...field}
//                               onChange={(e) => field.onChange(e.target.value.toUpperCase())}
//                             />
//                           </motion.div>
//                           <FormMessage />
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
//                           <FormLabel className="text-base font-semibold text-gray-700">Semester Year *</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
//                               <SelectValue placeholder="Select year" />
//                             </SelectTrigger>
//                             <SelectContent className="max-h-60 z-50">
//                               {years.map((year) => (
//                                 <SelectItem key={year} value={year.toString()}>
//                                   {year}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="duration"
//                       render={({ field }) => (
//                         <FormItem className="overflow-visible">
//                           <FormLabel className="text-base font-semibold text-gray-700">Duration *</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
//                               <SelectValue placeholder="Select duration" />
//                             </SelectTrigger>
//                             <SelectContent className="z-50">
//                               <SelectItem value="Autumn">🍂 Autumn</SelectItem>
//                               <SelectItem value="Spring">🌸 Spring</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
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
//                     <FormField
//                       control={form.control}
//                       name="credits"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-base font-semibold text-gray-700">Credits *</FormLabel>
//                           <Input
//                             type="number"
//                             step="0.5"
//                             min="0.5"
//                             max="20"
//                             placeholder="e.g., 3.0 or 1.5"
//                             className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                             {...field}
//                             onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || "")}
//                           />
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="courseCoordinator"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-base font-semibold text-gray-700">Course Coordinator *</FormLabel>
//                           <Input
//                             placeholder="e.g., Dr. Smith"
//                             className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                             {...field}
//                           />
//                           <FormMessage />
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
//                       <HiPlus className="w-4 h-4" />
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
//                               <FormLabel className="text-base font-semibold text-gray-700">Professor Name *</FormLabel>
//                               <div className="relative">
//                                 <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <Input
//                                   placeholder="Dr. John Doe"
//                                   className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                   {...field}
//                                 />
//                               </div>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         <FormField
//                           control={form.control}
//                           name={`professors.${index}.email`}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel className="text-base font-semibold text-gray-700">Email *</FormLabel>
//                               <div className="relative flex gap-3">
//                                 <div className="relative flex-1">
//                                   <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                   <Input
//                                     type="email"
//                                     placeholder="john.doe@university.edu"
//                                     className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                     {...field}
//                                   />
//                                 </div>
//                                 {professorFields.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => removeProfessor(index)}
//                                     className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
//                                   >
//                                     <HiTrash className="w-4 h-4" />
//                                   </Button>
//                                 )}
//                               </div>
//                               <FormMessage />
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
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-gray-700">
//                           Select Departments
//                           <span className="text-sm font-normal text-gray-500 ml-2">
//                             (Optional if roll numbers are provided)
//                           </span>
//                         </FormLabel>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 max-h-72 overflow-y-auto">
//                           {departments.map((department) => (
//                             <motion.div
//                               key={department}
//                               className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-lg hover:bg-white transition-colors"
//                               whileHover={{ scale: 1.02 }}
//                             >
//                               <Checkbox
//                                 checked={field.value?.includes(department)}
//                                 id={department}
//                                 onCheckedChange={(checked) => {
//                                   return checked
//                                     ? field.onChange([...field.value, department])
//                                     : field.onChange(field.value?.filter((value) => value !== department))
//                                 }}
//                                 className="mt-1"
//                               />
//                               <label htmlFor={department} className="text-sm font-medium cursor-pointer leading-relaxed">{department}</label>
//                             </motion.div>
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
//                         <HiPlus className="w-4 h-4" />
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
//                                   <HiX className="w-4 h-4" />
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
//                           onClick={() => appendSchedule({ day: "", startTime: "", endTime: "", room: "" })}
//                           className="flex items-center gap-2 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
//                         >
//                           <HiPlus className="w-4 h-4" />
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
//                                     <SelectTrigger className="h-12 text-base border-2 focus:border-blue-400">
//                                       <SelectValue placeholder="Select day" />
//                                     </SelectTrigger>
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
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.startTime`}
//                               render={({ field }) => (
//                                 <FormItem className="overflow-visible">
//                                   <FormLabel className="text-base font-semibold text-gray-700">Start Time *</FormLabel>
//                                   <Input
//                                     placeholder="8:30 AM"
//                                     className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                     {...field}
//                                   />
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.endTime`}
//                               render={({ field }) => (
//                                 <FormItem className="overflow-visible">
//                                   <FormLabel className="text-base font-semibold text-gray-700">End Time *</FormLabel>
//                                   <Input
//                                     placeholder="9:30 AM"
//                                     className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                     {...field}
//                                   />
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />

//                             <FormField
//                               control={form.control}
//                               name={`schedule.${index}.room`}
//                               render={({ field }) => (
//                                 <FormItem>
//                                   <FormLabel className="text-base font-semibold text-gray-700">Room *</FormLabel>
//                                   <div className="relative flex gap-3">
//                                     <Input
//                                       placeholder="e.g., gargi hall"
//                                       className="flex-1 h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                                       {...field}
//                                       onChange={(e) => {
//                                         const capitalizedValue = capitalizeRoom(e.target.value)
//                                         field.onChange(capitalizedValue)
//                                       }}
//                                     />
//                                     {scheduleFields.length > 1 && (
//                                       <Button
//                                         type="button"
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => removeSchedule(index)}
//                                         className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
//                                       >
//                                         <HiTrash className="w-4 h-4" />
//                                       </Button>
//                                     )}
//                                   </div>
//                                   <FormMessage />
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
// "use client"

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
//     credits: z.number().min(0.5, "Credits must be at least 0.5").max(20, "Credits cannot exceed 20"),
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
//       credits: 3,
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
//       { field: data.credits, name: "Credits" },
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
//         credits: data.credits,
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
//                               <SelectItem value="Autumn">Autumn</SelectItem>
//                               <SelectItem value="Spring">Spring</SelectItem>
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
//                     <FormField
//                       control={form.control}
//                       name="credits"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel
//                             className={`text-base font-semibold ${form.formState.errors.credits ? "text-red-600" : "text-gray-700"}`}
//                           >
//                             Credits *
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               step="0.5"
//                               min="0.5"
//                               max="20"
//                               placeholder="e.g., 3.0 or 1.5"
//                               className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
//                               {...field}
//                               onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || "")}
//                               onKeyDown={(e) => handleKeyDown(e, "courseCoordinator")}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

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
//                                       <SelectItem value="Sunday">Sunday</SelectItem>
//                                       <SelectItem value="Monday">Monday</SelectItem>
//                                       <SelectItem value="Tuesday">Tuesday</SelectItem>
//                                       <SelectItem value="Wednesday">Wednesday</SelectItem>
//                                       <SelectItem value="Thursday">Thursday</SelectItem>
//                                       <SelectItem value="Friday">Friday</SelectItem>
//                                       <SelectItem value="Saturday">Saturday</SelectItem>
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


// added ltpc

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
//                               <SelectItem value="Autumn">Autumn</SelectItem>
//                               <SelectItem value="Spring">Spring</SelectItem>
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
//                                       <SelectItem value="Sunday">Sunday</SelectItem>
//                                       <SelectItem value="Monday">Monday</SelectItem>
//                                       <SelectItem value="Tuesday">Tuesday</SelectItem>
//                                       <SelectItem value="Wednesday">Wednesday</SelectItem>
//                                       <SelectItem value="Thursday">Thursday</SelectItem>
//                                       <SelectItem value="Friday">Friday</SelectItem>
//                                       <SelectItem value="Saturday">Saturday</SelectItem>
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



//with backend

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
//       // Format data according to backend expectations
//       const courseData = {
//         title: data.title,
//         courseCode: data.courseCode,
//         lectures: data.L,
//         tutorials: data.T,
//         practicals: data.P,
//         credits: data.C,
//         studentYear: data.year,
//         forSemester: semesterValue,
//         courseCoordinator: data.courseCoordinator,
//         profName: data.professors.filter((prof) => prof.name && prof.email).map((prof) => prof.name),
//         profEmail: data.professors.filter((prof) => prof.name && prof.email).map((prof) => prof.email),
//         schedule:
//           data.schedule?.map((slot) => ({
//             day: slot.day,
//             start: slot.startTime,
//             end: slot.endTime,
//             room: slot.room,
//           })) || [],
//         students: {
//           departments: data.selectedDepartments,
//           year: data.year,
//           rollnos: data.rollNumbers || [],
//         },
//       }

//       console.log("Sending course data:", courseData)

//       const response = await fetch("/api/course/createCourseForYear1", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(courseData),
//       })

//       const result = await response.json()

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to create course")
//       }

//       setLoading(false)
//       alert("Course created successfully!")
//       console.log("Course created:", result.course)

//       // Redirect to courses page or reset form
//       router.push("/courses")
//     } catch (error) {
//       console.error("Course creation error:", error)
//       setErrorMsg(error.message || "Something went wrong. Please try again.")
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



// with enchanced backend

"use client"
import React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Trash2, GraduationCap, User, Mail, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const scheduleSchema = z.object({
  day: z.enum(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], {
    required_error: "Please select a day",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  room: z.string().min(1, "Room is required"),
})

const professorSchema = z.object({
  name: z.string().min(1, "Professor name is required"),
  email: z.string().email("Please enter a valid email address"),
})

const formSchema = z
  .object({
    title: z.string().min(1, "Course title is required"),
    year: z.string().min(1, "Year is required"),
    courseCode: z.string().min(1, "Course code is required"),
    semesterYear: z.string().min(1, "Semester year is required"),
    duration: z.string().min(1, "Duration is required"),
    L: z.number().min(0, "L must be 0 or greater").max(10, "L cannot exceed 10"),
    T: z.number().min(0, "T must be 0 or greater").max(10, "T cannot exceed 10"),
    P: z.number().min(0, "P must be 0 or greater").max(10, "P cannot exceed 10"),
    C: z.number().min(0, "C must be 0 or greater").max(20, "C cannot exceed 20"),
    courseCoordinator: z.string().min(1, "Course coordinator is required"),
    professors: z.array(professorSchema).min(1, "At least one professor is required"),
    selectedDepartments: z.array(z.string()),
    rollNumbers: z.array(z.string()),
    schedule: z.array(scheduleSchema).optional(),
  })
  .refine(
    (data) => {
      return data.selectedDepartments.length > 0 || data.rollNumbers.length > 0
    },
    {
      message: "Either select at least one department or add at least one roll number",
      path: ["selectedDepartments"],
    },
  )

const departments = [
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Electrical Engineering",
  "Engineering Physics",
  "Space Sciences and Engineering",
  "Mathematics and Computing",
  "Mechanical Engineering",
  "Metallurgical Engineering & Materials Science",
]

// Department mapping: full name to abbreviation
const departmentMapping = {
  "Chemical Engineering": "che",
  "Civil Engineering": "ce",
  "Computer Science and Engineering": "cse",
  "Electrical Engineering": "ee",
  "Engineering Physics": "ep",
  "Space Sciences and Engineering": "sse",
  "Mathematics and Computing": "mnc",
  "Mechanical Engineering": "me",
  "Metallurgical Engineering & Materials Science": "mems",
}

// Generate years from 2008 to current year + 4
const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear + 4 - 2008 + 1 }, (_, i) => 2008 + i)

export default function CreateCoursePage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [rollNumberInput, setRollNumberInput] = useState("")
  const [rollNumberError, setRollNumberError] = useState("")
  const [generalError, setGeneralError] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      year: "",
      courseCode: "",
      semesterYear: "",
      duration: "",
      L: 0,
      T: 0,
      P: 0,
      C: 0,
      courseCoordinator: "",
      professors: [{ name: "", email: "" }],
      selectedDepartments: [],
      rollNumbers: [],
      schedule: [],
    },
  })

  const watchYear = form.watch("year")
  const watchSemesterYear = form.watch("semesterYear")
  const watchDuration = form.watch("duration")

  // Compute semester value dynamically
  const semesterValue = watchSemesterYear && watchDuration ? `${watchSemesterYear} ${watchDuration}` : ""

  const {
    fields: professorFields,
    append: appendProfessor,
    remove: removeProfessor,
  } = useFieldArray({
    control: form.control,
    name: "professors",
  })

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control: form.control,
    name: "schedule",
  })

  // Validate roll number (exactly 9 characters)
  const validateRollNumber = (rollNumber) => {
    return rollNumber.trim().length === 9
  }

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

  // Convert time format from "h:mm a" to "h:mm:a"
  const changeTime = (timeString) => {
    if (!timeString) return timeString
    return timeString.replace(" ", ":")
  }

  const addRollNumbers = () => {
    if (rollNumberInput.trim()) {
      setRollNumberError("")
      const currentRollNumbers = form.getValues("rollNumbers") || []

      // Enhanced parsing: split by comma and/or spaces, filter empty strings
      const newRollNumbers = rollNumberInput
        .split(/[,\s]+/)
        .map((num) => num.trim())
        .filter((num) => num.length > 0)

      const validRollNumbers = []
      const invalidRollNumbers = []

      newRollNumbers.forEach((rollNumber) => {
        if (validateRollNumber(rollNumber)) {
          if (!currentRollNumbers.includes(rollNumber)) {
            validRollNumbers.push(rollNumber)
          }
        } else {
          invalidRollNumbers.push(rollNumber)
        }
      })

      if (invalidRollNumbers.length > 0) {
        setRollNumberError(`Invalid roll numbers (must be exactly 9 characters): ${invalidRollNumbers.join(", ")}`)
        return
      }

      if (validRollNumbers.length > 0) {
        form.setValue("rollNumbers", [...currentRollNumbers, ...validRollNumbers])
        setRollNumberInput("")
      }
    }
  }

  const removeRollNumber = (index) => {
    const currentRollNumbers = form.getValues("rollNumbers") || []
    const updatedRollNumbers = currentRollNumbers.filter((_, i) => i !== index)
    form.setValue("rollNumbers", updatedRollNumbers)
  }

  const handleKeyDown = (e, nextFieldName) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const nextField = document.querySelector(`[name="${nextFieldName}"]`)
      if (nextField) {
        nextField.focus()
      }
    }
  }

  const onSubmit = async (data) => {
    setErrorMsg("")
    setGeneralError("")

    // Check for required fields
    const requiredFields = [
      { field: data.title, name: "Course Title" },
      { field: data.year, name: "Year" },
      { field: data.courseCode, name: "Course Code" },
      { field: data.semesterYear, name: "Semester Year" },
      { field: data.duration, name: "Duration" },
      { field: data.L !== undefined && data.L !== "", name: "L" },
      { field: data.T !== undefined && data.T !== "", name: "T" },
      { field: data.P !== undefined && data.P !== "", name: "P" },
      { field: data.C !== undefined && data.C !== "", name: "C" },
      { field: data.courseCoordinator, name: "Course Coordinator" },
    ]

    // Check professors
    const hasValidProfessors = data.professors.some((prof) => prof.name && prof.email)
    if (!hasValidProfessors) {
      requiredFields.push({ field: false, name: "At least one professor" })
    }

    // Check departments or roll numbers
    if (data.selectedDepartments.length === 0 && data.rollNumbers.length === 0) {
      requiredFields.push({ field: false, name: "Departments or roll numbers" })
    }

    const missingFields = requiredFields.filter((item) => !item.field)

    if (missingFields.length > 0) {
      setGeneralError("All starred fields are required")
      return
    }

    setLoading(true)

    try {
      // Format data according to backend expectations
      const courseData = {
        title: data.title,
        courseCode: data.courseCode,
        lectures: data.L,
        tutorials: data.T,
        practicals: data.P,
        credits: data.C,
        studentYear: data.year,
        forSemester: semesterValue,
        courseCoordinator: data.courseCoordinator,
        profName: data.professors.filter((prof) => prof.name && prof.email).map((prof) => prof.name),
        profEmail: data.professors.filter((prof) => prof.name && prof.email).map((prof) => prof.email),
        schedule:
          data.schedule?.map((slot) => ({
            day: slot.day,
            start: changeTime(slot.startTime),
            end: changeTime(slot.endTime),
            room: slot.room,
          })) || [],
        students: {
          departments: data.selectedDepartments,
          year: data.year,
          rollnos: data.rollNumbers || [],
        },
      }

      console.log("Sending course data:", courseData)

      const response = await fetch("/api/course/createCourseForYear1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to create course")
      }

      setLoading(false)
      alert("Course created successfully!")
      console.log("Course created:", result.course)

      // Redirect to courses page or reset form
      router.push("/courses")
    } catch (error) {
      console.error("Course creation error:", error)
      setErrorMsg(error.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        <Card className="shadow-2xl rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg overflow-visible">
          <CardContent className="py-12 px-10 overflow-visible">
            <div className="flex flex-col items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800">Create New Course</h2>
              </div>
              <Link
                href="/courses"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ← Back to courses
              </Link>
            </div>

            <p className="text-sm text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Fill in the details below to create a new course for the semester. All required fields must be completed
              before submission.
            </p>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg text-center mb-8 shadow-sm"
              >
                {errorMsg}
              </motion.div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 overflow-visible">
                {/* Basic Course Information */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-8 overflow-visible"
                >
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Course Information</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`text-base font-semibold ${form.formState.errors.title ? "text-red-600" : "text-gray-700"}`}
                        >
                          Course Title *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Introduction to Machine Learning"
                            className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
                            {...field}
                            onKeyDown={(e) => handleKeyDown(e, "year")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-visible">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="overflow-visible">
                          <FormLabel
                            className={`text-base font-semibold ${form.formState.errors.year ? "text-red-600" : "text-gray-700"}`}
                          >
                            Year *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 w-full text-base border-2 focus:border-blue-400">
                                <SelectValue placeholder="Select academic year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="z-50">
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                              <SelectItem value="5">5th Year</SelectItem>
                              <SelectItem value="6">6th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="courseCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={`text-base font-semibold ${form.formState.errors.courseCode ? "text-red-600" : "text-gray-700"}`}
                          >
                            Course Code *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., CS 101"
                              className="h-12 text-base border-2 focus:border-blue-400 transition-colors uppercase"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                              onKeyDown={(e) => handleKeyDown(e, "semesterYear")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Enhanced Semester Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
                    <FormField
                      control={form.control}
                      name="semesterYear"
                      render={({ field }) => (
                        <FormItem className="overflow-visible">
                          <FormLabel
                            className={`text-base font-semibold ${form.formState.errors.semesterYear ? "text-red-600" : "text-gray-700"}`}
                          >
                            Semester Year *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60 z-50">
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="overflow-visible">
                          <FormLabel
                            className={`text-base font-semibold ${form.formState.errors.duration ? "text-red-600" : "text-gray-700"}`}
                          >
                            Duration *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-2 w-full focus:border-blue-400">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="z-50">
                              <SelectItem value="Autumn">🍂 Autumn</SelectItem>
                              <SelectItem value="Spring">🌸 Spring</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <label className="text-base font-semibold text-gray-700">Semester</label>
                      <div className="flex items-center h-12 px-4 py-2 border-2 border-gray-200 rounded-md bg-gray-50">
                        <span className="text-base text-gray-700 font-medium">
                          {semesterValue || "Select year and duration"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="L"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`text-base font-semibold ${form.formState.errors.L ? "text-red-600" : "text-gray-700"}`}
                            >
                              Lectures *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                placeholder="0"
                                className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                onKeyDown={(e) => handleKeyDown(e, "T")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="T"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`text-base font-semibold ${form.formState.errors.T ? "text-red-600" : "text-gray-700"}`}
                            >
                              Tutorials *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                placeholder="0"
                                className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                onKeyDown={(e) => handleKeyDown(e, "P")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="P"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`text-base font-semibold ${form.formState.errors.P ? "text-red-600" : "text-gray-700"}`}
                            >
                              Practicals *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                placeholder="0"
                                className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                onKeyDown={(e) => handleKeyDown(e, "C")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="C"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className={`text-base font-semibold ${form.formState.errors.C ? "text-red-600" : "text-gray-700"}`}
                            >
                              Credits *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                placeholder="0"
                                className="h-12 text-base border-2 focus:border-blue-400 transition-colors text-center"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                onKeyDown={(e) => handleKeyDown(e, "courseCoordinator")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="courseCoordinator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={`text-base font-semibold ${form.formState.errors.courseCoordinator ? "text-red-600" : "text-gray-700"}`}
                          >
                            Course Coordinator *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Dr. Smith"
                              className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
                              {...field}
                              onKeyDown={(e) => handleKeyDown(e, "professors.0.name")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.section>

                {/* Professors Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Professors</h3>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendProfessor({ name: "", email: "" })}
                      className="flex items-center gap-2 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Professor
                    </Button>
                  </div>

                  <AnimatePresence>
                    {professorFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50"
                      >
                        <FormField
                          control={form.control}
                          name={`professors.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className={`text-base font-semibold ${form.formState.errors.professors?.[index]?.name ? "text-red-600" : "text-gray-700"}`}
                              >
                                Professor Name *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  <Input
                                    placeholder="Dr. John Doe"
                                    className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
                                    {...field}
                                    onKeyDown={(e) => handleKeyDown(e, `professors.${index}.email`)}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`professors.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className={`text-base font-semibold ${form.formState.errors.professors?.[index]?.email ? "text-red-600" : "text-gray-700"}`}
                              >
                                Email *
                              </FormLabel>
                              <FormControl>
                                <div className="relative flex gap-3">
                                  <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                      type="email"
                                      placeholder="john.doe@university.edu"
                                      className="pl-10 h-12 text-base border-2 focus:border-blue-400 transition-colors"
                                      {...field}
                                      onKeyDown={(e) => handleKeyDown(e, "selectedDepartments")}
                                    />
                                  </div>
                                  {professorFields.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeProfessor(index)}
                                      className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.section>

                {/* Enhanced Enrolled Students Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Enrolled Students</h3>
                  </div>

                  {/* Department Selection */}
                  <FormField
                    control={form.control}
                    name="selectedDepartments"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-gray-700">
                          Select Departments
                          <span className="text-sm font-normal text-gray-500 ml-2">
                            (Optional if roll numbers are provided)
                          </span>
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 max-h-72 overflow-y-auto">
                          {departments.map((department) => (
                            <FormField
                              key={department}
                              control={form.control}
                              name="selectedDepartments"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={department}
                                    className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-lg hover:bg-white transition-colors"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(departmentMapping[department])}
                                        onCheckedChange={(checked) => {
                                          const deptCode = departmentMapping[department]
                                          return checked
                                            ? field.onChange([...field.value, deptCode])
                                            : field.onChange(field.value?.filter((value) => value !== deptCode))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-medium cursor-pointer leading-relaxed">
                                      {department}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Enhanced Roll Numbers Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <label className="text-base font-semibold text-gray-700">Additional Roll Numbers</label>
                      <span className="text-sm font-normal text-gray-500">(Optional if departments are selected)</span>
                    </div>

                    {/* Roll Number Error */}
                    <AnimatePresence>
                      {rollNumberError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-700 bg-red-50 border-2 border-red-200 p-4 rounded-lg shadow-sm"
                        >
                          <strong>Error:</strong> {rollNumberError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter roll numbers (comma or space separated, 9 characters each) e.g., 240001070, 240001071"
                        value={rollNumberInput}
                        onChange={(e) => {
                          setRollNumberInput(e.target.value)
                          if (rollNumberError) setRollNumberError("")
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addRollNumbers()
                          }
                        }}
                        className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
                      />
                      <Button
                        type="button"
                        onClick={addRollNumbers}
                        variant="outline"
                        className="h-12 px-6 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Enhanced Roll Numbers Display */}
                    <AnimatePresence>
                      {form.watch("rollNumbers")?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="max-h-64 overflow-y-auto p-6 bg-blue-50/50 rounded-xl border-2 border-blue-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-gray-700">
                              Added Roll Numbers ({form.watch("rollNumbers").length})
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {form.watch("rollNumbers").map((rollNumber, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                              >
                                {rollNumber}
                                <button
                                  type="button"
                                  onClick={() => removeRollNumber(index)}
                                  className="ml-1 text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.section>

                {/* Enhanced Schedule Section */}
                <AnimatePresence>
                  {watchYear && (
                    <motion.section
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-8 overflow-visible"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            4
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Schedule</h3>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => appendSchedule({ day: "Monday", startTime: "", endTime: "", room: "" })}
                          className="flex items-center gap-2 border-2 border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Time Slot
                        </Button>
                      </div>

                      <AnimatePresence>
                        {scheduleFields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50/50 overflow-visible"
                          >
                            <FormField
                              control={form.control}
                              name={`schedule.${index}.day`}
                              render={({ field }) => (
                                <FormItem className="overflow-visible">
                                  <FormLabel className="text-base font-semibold text-gray-700">Day *</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 text-base border-2 focus:border-blue-400">
                                        <SelectValue placeholder="Select day" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-50">
                                      <SelectItem value="Sunday">🌅 Sunday</SelectItem>
                                      <SelectItem value="Monday">📅 Monday</SelectItem>
                                      <SelectItem value="Tuesday">📅 Tuesday</SelectItem>
                                      <SelectItem value="Wednesday">📅 Wednesday</SelectItem>
                                      <SelectItem value="Thursday">📅 Thursday</SelectItem>
                                      <SelectItem value="Friday">📅 Friday</SelectItem>
                                      <SelectItem value="Saturday">🌅 Saturday</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`schedule.${index}.startTime`}
                              render={({ field }) => (
                                <FormItem className="overflow-visible">
                                  <FormLabel className="text-base font-semibold text-gray-700">Start Time *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="8:30 AM"
                                      className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
                                      {...field}
                                      onKeyDown={(e) => handleKeyDown(e, `schedule.${index}.endTime`)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`schedule.${index}.endTime`}
                              render={({ field }) => (
                                <FormItem className="overflow-visible">
                                  <FormLabel className="text-base font-semibold text-gray-700">End Time *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="9:30 AM"
                                      className="h-12 text-base border-2 focus:border-blue-400 transition-colors"
                                      {...field}
                                      onKeyDown={(e) => handleKeyDown(e, `schedule.${index}.room`)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`schedule.${index}.room`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-semibold text-gray-700">Room *</FormLabel>
                                  <FormControl>
                                    <div className="relative flex gap-3">
                                      <Input
                                        placeholder="e.g., gargi hall"
                                        className="flex-1 h-12 text-base border-2 focus:border-blue-400 transition-colors"
                                        {...field}
                                        onChange={(e) => {
                                          const capitalizedValue = capitalizeRoom(e.target.value)
                                          field.onChange(capitalizedValue)
                                        }}
                                      />
                                      {scheduleFields.length > 1 && (
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => removeSchedule(index)}
                                          className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 h-12 px-4"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      )}
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.section>
                  )}
                </AnimatePresence>

                {/* Enhanced Submit Section */}
                {generalError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg text-center mb-4 shadow-sm"
                  >
                    {generalError}
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-6 pt-8 border-t-2 border-gray-200"
                >
                  <Button
                    type="submit"
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Course...
                      </div>
                    ) : (
                      "Create Course"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-lg transition-colors"
                    onClick={() => router.push("/courses")}
                  >
                    Cancel
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
