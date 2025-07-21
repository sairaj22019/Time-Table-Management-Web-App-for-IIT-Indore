// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Calendar, Clock, MapPin, Info } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// // Time slots configuration
// const timeSlots = [
//   { id: "slot1", label: "8:30-9:25", start: "8:30", end: "9:25" },
//   { id: "slot2", label: "9:30-10:25", start: "9:30", end: "10:25" },
//   { id: "slot3", label: "10:30-11:25", start: "10:30", end: "11:25" },
//   { id: "slot4", label: "11:30-12:25", start: "11:30", end: "12:25" },
//   {
//     id: "lunch",
//     label: "12:30-13:25",
//     start: "12:30",
//     end: "13:25",
//   },
//   { id: "slot5", label: "13:30-14:25", start: "13:30", end: "14:25" },
//   { id: "slot6", label: "14:30-15:25", start: "14:30", end: "15:25" },
//   { id: "slot7", label: "15:30-16:25", start: "15:30", end: "16:25" },
//   { id: "slot8", label: "16:30-17:25", start: "16:30", end: "17:25" },
//   { id: "slot9", label: "17:30-18:25", start: "17:30", end: "18:25" },
// ]

// const daysOfWeek = [
//   { id: "monday", label: "Mon", fullName: "Monday" },
//   { id: "tuesday", label: "Tue", fullName: "Tuesday" },
//   { id: "wednesday", label: "Wed", fullName: "Wednesday" },
//   { id: "thursday", label: "Thu", fullName: "Thursday" },
//   { id: "friday", label: "Fri", fullName: "Friday" },
//   { id: "saturday", label: "Sat", fullName: "Saturday" },
// ]

// // Mock data for demonstration - in real app, this would come from API
// const mockClassroomData = {
//   "Gargi Hall": [
//     ["A", "NA", "A", "A", "LB", "A", "A", "A", "A", "A"], // Monday
//     ["A", "NA", "A", "NA", "LB", "A", "A", "A", "A", "A"], // Tuesday
//     ["A", "A", "A", "NA", "LB", "A", "A", "A", "A", "A"], // Wednesday
//     ["A", "A", "A", "A", "LB", "NA", "A", "A", "A", "A"], // Thursday
//     ["A", "A", "NA", "A", "LB", "A", "A", "A", "A", "A"], // Friday
//     ["A", "A", "A", "A", "LB", "A", "A", "A", "A", "A"], // Saturday
//   ],
//   "Science Block": [
//     ["NA", "A", "A", "NA", "LB", "A", "NA", "A", "A", "A"], // Monday
//     ["A", "A", "NA", "A", "LB", "NA", "A", "A", "A", "A"], // Tuesday
//     ["A", "NA", "A", "A", "LB", "A", "A", "NA", "A", "A"], // Wednesday
//     ["NA", "A", "A", "A", "LB", "A", "A", "A", "A", "NA"], // Thursday
//     ["A", "A", "A", "NA", "LB", "A", "A", "A", "NA", "A"], // Friday
//     ["A", "A", "A", "A", "LB", "A", "A", "A", "A", "A"], // Saturday
//   ],
// }

// const FreeslotCell = ({ value, index }) => {
//   const getCellContent = () => {
//     if (value === "LB") return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" }
//     if (value === "A") return { text: "A", style: "text-green-600 bg-green-50 border-green-200 font-bold text-lg" }
//     if (value === "NA") return { text: "NA", style: "text-red-600 bg-red-50 border-red-200 font-bold text-lg" }
//     return { text: value, style: "text-blue-700 bg-blue-50 border-blue-200" }
//   }

//   const { text, style } = getCellContent()

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3, delay: index * 0.02 }}
//       className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}
//     >
//       <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
//     </motion.div>
//   )
// }

// const capitalizeWords = (str) => {
//   return str.replace(/\b\w/g, (char) => char.toUpperCase())
// }

// export default function FreeslotsPage() {
//   const [classroomName, setClassroomName] = useState("")
//   const [displayName, setDisplayName] = useState("")
//   const [showGrid, setShowGrid] = useState(false)
//   const [gridData, setGridData] = useState(null)

//   useEffect(() => {
//     if (classroomName.trim()) {
//       const formatted = capitalizeWords(classroomName.trim())
//       setDisplayName(formatted)
//       setShowGrid(true)

//       // Get data for the classroom (mock data for demo)
//       const data = mockClassroomData[formatted] || mockClassroomData["Gargi Hall"]
//       setGridData(data)
//     } else {
//       setShowGrid(false)
//       setDisplayName("")
//       setGridData(null)
//     }
//   }, [classroomName])

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full max-w-7xl mx-auto"
//       >
//         <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//           <CardContent className="p-3 sm:p-6 lg:p-10">
//             <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
//                 <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
//                   View Free Slots
//                 </h1>
//               </div>
//               <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl">
//                 Enter a classroom name to view its availability schedule
//               </p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//               className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
//             >
//               <div className="max-w-md mx-auto">
//                 <Label htmlFor="classroom" className="text-sm font-semibold text-blue-800 mb-2 block">
//                   Classroom Name
//                 </Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
//                   <Input
//                     id="classroom"
//                     type="text"
//                     placeholder="Enter classroom name (e.g., gargi hall)"
//                     value={classroomName}
//                     onChange={(e) => setClassroomName(e.target.value)}
//                     className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 {displayName && (
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-sm text-blue-700 mt-2 font-medium"
//                   >
//                     Showing schedule for: {displayName}
//                   </motion.p>
//                 )}
//               </div>
//             </motion.div>

//             <AnimatePresence>
//               {showGrid && gridData && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -30 }}
//                   transition={{ duration: 0.5 }}
//                   className="space-y-6"
//                 >
//                   <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
//                     <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.4, delay: 0.1 }}
//                         className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
//                       >
//                         <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
//                           <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
//                           <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
//                         </div>
//                         {timeSlots.map((slot, index) => (
//                           <motion.div
//                             key={slot.id}
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                             className="border border-gray-300 rounded-lg p-1 sm:p-2 text-center bg-blue-50"
//                           >
//                             <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
//                           </motion.div>
//                         ))}
//                       </motion.div>

//                       {daysOfWeek.map((day, dayIndex) => (
//                         <motion.div
//                           key={day.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
//                           className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
//                         >
//                           <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
//                             <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
//                           </div>
//                           {timeSlots.map((slot, slotIndex) => (
//                             <FreeslotCell
//                               key={`${day.id}-${slot.id}`}
//                               value={gridData[dayIndex]?.[slotIndex] || "A"}
//                               index={dayIndex * timeSlots.length + slotIndex}
//                             />
//                           ))}
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: 0.6 }}
//                     className="bg-gray-50 border border-gray-200 rounded-lg p-4"
//                   >
//                     <div className="flex items-center gap-2 mb-3">
//                       <Info className="w-4 h-4 text-gray-600" />
//                       <h3 className="text-sm font-semibold text-gray-700">Legend:</h3>
//                     </div>
//                     <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-green-50 border border-green-200 rounded flex items-center justify-center">
//                           <span className="text-xs font-bold text-green-600">A</span>
//                         </div>
//                         <span>Available</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-red-50 border border-red-200 rounded flex items-center justify-center">
//                           <span className="text-xs font-bold text-red-600">NA</span>
//                         </div>
//                         <span>Not Available</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
//                         <span>Lunch Break</span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {!showGrid && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//                 <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">Enter Classroom Name</h3>
//                 <p className="text-gray-500">Please enter a classroom name to view its availability schedule</p>
//               </motion.div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Calendar, Clock, MapPin, Info, Loader2, AlertCircle } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { AlertDialog,AlertDialogDescription } from "@/components/ui/alert-dialog"

// // Time slots configuration
// const timeSlots = [
//   { id: "slot1", label: "8:30-9:30", start: "08:30", end: "09:30" },
//   { id: "slot2", label: "9:30-10:30", start: "09:30", end: "10:30" },
//   { id: "slot3", label: "10:30-11:30", start: "10:30", end: "11:30" },
//   { id: "slot4", label: "11:30-12:30", start: "11:30", end: "12:30" },
//   { id: "lunch", label: "12:30-13:30", start: "12:30", end: "13:30" },
//   { id: "slot5", label: "13:30-14:30", start: "13:30", end: "14:30" },
//   { id: "slot6", label: "14:30-15:30", start: "14:30", end: "15:30" },
//   { id: "slot7", label: "15:30-16:30", start: "15:30", end: "16:30" },
//   { id: "slot8", label: "16:30-17:30", start: "16:30", end: "17:30" },
//   { id: "slot9", label: "17:30-18:30", start: "17:30", end: "18:30" },
// ]

// const daysOfWeek = [
//   { id: "monday", label: "Mon", fullName: "Monday" },
//   { id: "tuesday", label: "Tue", fullName: "Tuesday" },
//   { id: "wednesday", label: "Wed", fullName: "Wednesday" },
//   { id: "thursday", label: "Thu", fullName: "Thursday" },
//   { id: "friday", label: "Fri", fullName: "Friday" },
//   { id: "saturday", label: "Sat", fullName: "Saturday" },
// ]

// const FreeslotCell = ({ value, index, isLunchBreak }) => {
//   const getCellContent = () => {
//     if (isLunchBreak) return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" }
//     if (value) return { text: "A", style: "text-green-600 bg-green-50 border-green-200 font-bold text-lg" }
//     return { text: "NA", style: "text-red-600 bg-red-50 border-red-200 font-bold text-lg" }
//   }

//   const { text, style } = getCellContent()

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3, delay: index * 0.02 }}
//       className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}
//     >
//       <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
//     </motion.div>
//   )
// }

// // Function to normalize classroom name
// const normalizeClassroomName = (name) => {
//   return name
//     .trim()
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ")
// }

// // Function to transform API response to grid format
// const transformApiDataToGrid = (slots) => {
//   const grid = []

//   // Initialize grid for each day
//   daysOfWeek.forEach(() => {
//     grid.push(new Array(timeSlots.length).fill(true))
//   })

//   // Fill grid based on API response
//   slots.forEach((slot) => {
//     const dayIndex = daysOfWeek.findIndex((day) => day.fullName === slot.day)
//     const timeIndex = timeSlots.findIndex((time) => time.start === slot.start && time.end === slot.end)

//     if (dayIndex !== -1 && timeIndex !== -1) {
//       grid[dayIndex][timeIndex] = slot.isAvailable
//     }
//   })

//   return grid
// }

// export default function FreeslotsPage() {
//   const [classroomName, setClassroomName] = useState("")
//   const [displayName, setDisplayName] = useState("")
//   const [showGrid, setShowGrid] = useState(false)
//   const [gridData, setGridData] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const fetchClassroomData = async (roomName) => {
//     setLoading(true)
//     setError(null)

//     try {
//       const normalizedName = normalizeClassroomName(roomName)

//       // Replace with your actual API endpoint
//         const response = await fetch('/api/admin/getRoomDetails', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({room : normalizedName }),
//         });


//       if (!response.ok) {
//         throw new Error(`Failed to fetch data: ${response.status}`)
//       }

//       const data = await response.json()

//       if (data.success && data.slots) {
//         const transformedData = transformApiDataToGrid(data.slots)
//         setGridData(transformedData)
//         setShowGrid(true)
//       } else {
//         throw new Error(data.message || "Failed to retrieve classroom data")
//       }
//     } catch (err) {
//       setError(err.message)
//       setShowGrid(false)
//       setGridData(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (classroomName.trim()) {
//       const formatted = normalizeClassroomName(classroomName.trim())
//       setDisplayName(formatted)

//       // Debounce API calls
//       const timeoutId = setTimeout(() => {
//         fetchClassroomData(classroomName)
//       }, 500)

//       return () => clearTimeout(timeoutId)
//     } else {
//       setShowGrid(false)
//       setDisplayName("")
//       setGridData(null)
//       setError(null)
//     }
//   }, [classroomName])

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full max-w-7xl mx-auto"
//       >
//         <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//           <CardContent className="p-3 sm:p-6 lg:p-10">
//             <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
//                 <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
//                   View Free Slots
//                 </h1>
//               </div>
//               <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl">
//                 Enter a classroom name to view its availability schedule
//               </p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//               className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
//             >
//               <div className="max-w-md mx-auto">
//                 <Label htmlFor="classroom" className="text-sm font-semibold text-blue-800 mb-2 block">
//                   Classroom Name
//                 </Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
//                   <Input
//                     id="classroom"
//                     type="text"
//                     placeholder="Enter classroom name (e.g., gargi hall)"
//                     value={classroomName}
//                     onChange={(e) => setClassroomName(e.target.value)}
//                     className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={loading}
//                   />
//                   {loading && (
//                     <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4 animate-spin" />
//                   )}
//                 </div>
//                 {displayName && !error && (
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-sm text-blue-700 mt-2 font-medium"
//                   >
//                     Showing schedule for: {displayName}
//                   </motion.p>
//                 )}
//               </div>
//             </motion.div>

//             {error && (
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               </motion.div>
//             )}

//             <AnimatePresence>
//               {showGrid && gridData && !loading && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -30 }}
//                   transition={{ duration: 0.5 }}
//                   className="space-y-6"
//                 >
//                   <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
//                     <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.4, delay: 0.1 }}
//                         className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
//                       >
//                         <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
//                           <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
//                           <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
//                         </div>
//                         {timeSlots.map((slot, index) => (
//                           <motion.div
//                             key={slot.id}
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                             className="border border-gray-300 rounded-lg p-1 sm:p-2 text-center bg-blue-50"
//                           >
//                             <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
//                           </motion.div>
//                         ))}
//                       </motion.div>

//                       {daysOfWeek.map((day, dayIndex) => (
//                         <motion.div
//                           key={day.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
//                           className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
//                         >
//                           <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
//                             <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
//                           </div>
//                           {timeSlots.map((slot, slotIndex) => (
//                             <FreeslotCell
//                               key={`${day.id}-${slot.id}`}
//                               value={gridData[dayIndex]?.[slotIndex] ?? true}
//                               index={dayIndex * timeSlots.length + slotIndex}
//                               isLunchBreak={slot.id === "lunch"}
//                             />
//                           ))}
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: 0.6 }}
//                     className="bg-gray-50 border border-gray-200 rounded-lg p-4"
//                   >
//                     <div className="flex items-center gap-2 mb-3">
//                       <Info className="w-4 h-4 text-gray-600" />
//                       <h3 className="text-sm font-semibold text-gray-700">Legend:</h3>
//                     </div>
//                     <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-green-50 border border-green-200 rounded flex items-center justify-center">
//                           <span className="text-xs font-bold text-green-600">A</span>
//                         </div>
//                         <span>Available</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-red-50 border border-red-200 rounded flex items-center justify-center">
//                           <span className="text-xs font-bold text-red-600">NA</span>
//                         </div>
//                         <span>Not Available</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
//                         <span>Lunch Break</span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//                 <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">Loading Schedule</h3>
//                 <p className="text-gray-500">Fetching availability data for {displayName}...</p>
//               </motion.div>
//             )}

//             {!showGrid && !loading && !error && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//                 <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">Enter Classroom Name</h3>
//                 <p className="text-gray-500">Please enter a classroom name to view its availability schedule</p>
//               </motion.div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Info, Loader2, AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Time slots configuration
const timeSlots = [
  { id: "slot1", label: "8:30-9:30", start: "08:30", end: "09:30" },
  { id: "slot2", label: "9:30-10:30", start: "09:30", end: "10:30" },
  { id: "slot3", label: "10:30-11:30", start: "10:30", end: "11:30" },
  { id: "slot4", label: "11:30-12:30", start: "11:30", end: "12:30" },
  { id: "lunch", label: "12:30-13:30", start: "12:30", end: "13:30" },
  { id: "slot5", label: "13:30-14:30", start: "13:30", end: "14:30" },
  { id: "slot6", label: "14:30-15:30", start: "14:30", end: "15:30" },
  { id: "slot7", label: "15:30-16:30", start: "15:30", end: "16:30" },
  { id: "slot8", label: "16:30-17:30", start: "16:30", end: "17:30" },
  { id: "slot9", label: "17:30-18:30", start: "17:30", end: "18:30" },
]

const daysOfWeek = [
  { id: "monday", label: "Mon", fullName: "Monday" },
  { id: "tuesday", label: "Tue", fullName: "Tuesday" },
  { id: "wednesday", label: "Wed", fullName: "Wednesday" },
  { id: "thursday", label: "Thu", fullName: "Thursday" },
  { id: "friday", label: "Fri", fullName: "Friday" },
  { id: "saturday", label: "Sat", fullName: "Saturday" },
]

const FreeslotCell = ({ value, index, isLunchBreak }) => {
  const getCellContent = () => {
    if (isLunchBreak) return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" }
    if (value) return { text: "A", style: "text-green-600 bg-green-50 border-green-200 font-bold text-lg" }
    return { text: "NA", style: "text-red-600 bg-red-50 border-red-200 font-bold text-lg" }
  }

  const { text, style } = getCellContent()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}
    >
      <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
    </motion.div>
  )
}

// Function to normalize classroom name
const normalizeClassroomName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Function to transform API response to grid format
const transformApiDataToGrid = (slots) => {
  const grid = []
  // Initialize grid for each day
  daysOfWeek.forEach(() => {
    grid.push(new Array(timeSlots.length).fill(true))
  })

  // Fill grid based on API response
  slots.forEach((slot) => {
    const dayIndex = daysOfWeek.findIndex((day) => day.fullName === slot.day)
    const timeIndex = timeSlots.findIndex((time) => time.start === slot.start && time.end === slot.end)

    if (dayIndex !== -1 && timeIndex !== -1) {
      grid[dayIndex][timeIndex] = slot.isAvailable
    }
  })

  return grid
}

export default function FreeslotsPage() {
  const [classroomName, setClassroomName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showGrid, setShowGrid] = useState(false)
  const [gridData, setGridData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchClassroomData = async (roomName) => {
    setLoading(true)
    setError(null)

    try {
      const normalizedName = normalizeClassroomName(roomName)
      // Replace with your actual API endpoint
      const response = await fetch("/api/admin/getRoomDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room: normalizedName }),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`)
      }

      const data = await response.json()
      if (data.success && data.slots) {
        const transformedData = transformApiDataToGrid(data.slots)
        setGridData(transformedData)
        setDisplayName(normalizedName)
        setShowGrid(true)
      } else {
        throw new Error(data.message || "Failed to retrieve classroom data")
      }
    } catch (err) {
      setError(err.message)
      setShowGrid(false)
      setGridData(null)
      setDisplayName("")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (classroomName.trim()) {
      fetchClassroomData(classroomName)
    } else {
      setError("Please enter a classroom name")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleInputChange = (e) => {
    setClassroomName(e.target.value)
    // Clear previous results when user starts typing
    if (error) setError(null)
    if (showGrid) {
      setShowGrid(false)
      setGridData(null)
      setDisplayName("")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto p-3 sm:p-6 lg:p-10"
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
              View Free Slots
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl">
            Enter a classroom name to view its availability schedule
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="max-w-md mx-auto">
            <Label htmlFor="classroom" className="text-sm font-semibold text-blue-800 mb-2 block">
              Classroom Name
            </Label>
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                <Input
                  id="classroom"
                  type="text"
                  placeholder="Enter classroom name (e.g., gargi hall)"
                  value={classroomName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading || !classroomName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {displayName && !error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-blue-700 mt-2 font-medium"
              >
                Showing schedule for: {displayName}
              </motion.p>
            )}
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showGrid && gridData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
                <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
                  >
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
                    </div>
                    {timeSlots.map((slot, index) => (
                      <motion.div
                        key={slot.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border border-gray-300 rounded-lg p-1 sm:p-2 text-center bg-blue-50"
                      >
                        <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {daysOfWeek.map((day, dayIndex) => (
                    <motion.div
                      key={day.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
                      className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
                    >
                      <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                        <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
                      </div>
                      {timeSlots.map((slot, slotIndex) => (
                        <FreeslotCell
                          key={`${day.id}-${slot.id}`}
                          value={gridData[dayIndex]?.[slotIndex] ?? true}
                          index={dayIndex * timeSlots.length + slotIndex}
                          isLunchBreak={slot.id === "lunch"}
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Legend:</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-50 border border-green-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">A</span>
                    </div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-50 border border-red-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">NA</span>
                    </div>
                    <span>Not Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                    <span>Lunch Break</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Loading Schedule</h3>
            <p className="text-gray-500">Fetching availability data for {displayName}...</p>
          </motion.div>
        )}

        {!showGrid && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Enter Classroom Name</h3>
            <p className="text-gray-500">Please enter a classroom name to view its availability schedule</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  )
}
