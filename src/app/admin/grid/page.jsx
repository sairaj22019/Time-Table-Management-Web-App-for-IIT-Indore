// "use client"
// import { useState } from "react"
// import React from "react"

// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Save, RotateCcw, GraduationCap, Clock } from 'lucide-react'
// import { motion } from "framer-motion"

// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// // Time slots configuration
// const timeSlots = [
//   { id: "slot1", label: "8:30-9:25", start: "8:30", end: "9:25" },
//   { id: "slot2", label: "9:30-10:25", start: "9:30", end: "10:25" },
//   { id: "slot3", label: "10:30-11:25", start: "10:30", end: "11:25" },
//   { id: "slot4", label: "11:30-12:25", start: "11:30", end: "12:25" },
//   { id: "lunch", label: "12:30-13:25", start: "12:30", end: "13:25", isLunch: true },
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

// // Cell input component
// const TimetableCell = ({ day, slot, value, onChange, isLunch }) => {
//   const [localValue, setLocalValue] = useState(value || "")
//   const [isEditing, setIsEditing] = useState(false)
//   const slotInputRef = React.useRef(null)

//   const handleChange = (newValue) => {
//     setLocalValue(newValue)
//     onChange(newValue)
//   }

//   const handleCellClick = (e) => {
//     e.stopPropagation()
//     setIsEditing(true)
//   }

//   const handleSlotKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault()
//       setIsEditing(false)
//     }
//   }

//   const handleEditingEnd = () => {
//     setIsEditing(false)
//   }

//   // Don't show empty cells in display mode
//   const hasContent = localValue && localValue.trim()

//   if (isLunch) {
//     return (
//       <div className="h-16 sm:h-20 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center">
//         <span className="text-sm font-medium text-orange-700">Lunch Break</span>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="h-16 sm:h-20 bg-white border-2 border-gray-200 rounded-lg p-1 sm:p-2 hover:border-blue-300 transition-colors cursor-pointer group relative"
//       onClick={handleCellClick}
//     >
//       {isEditing ? (
//         <div className="h-full flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
//           <Input
//             ref={slotInputRef}
//             placeholder="Slot Letter"
//             value={localValue}
//             onChange={(e) => handleChange(e.target.value.toUpperCase())}
//             onKeyDown={handleSlotKeyDown}
//             onBlur={() => {
//               handleEditingEnd()
//             }}
//             className="h-8 text-sm border-0 p-1 bg-blue-50 focus:bg-white text-center"
//             autoFocus
//           />
//         </div>
//       ) : (
//         <div className="h-full flex flex-col justify-center items-center text-center group-hover:bg-blue-50 rounded transition-colors">
//           {hasContent ? (
//             <div className="text-sm sm:text-lg font-bold text-blue-700 leading-tight">{localValue}</div>
//           ) : (
//             <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
//               Click to add
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default function TimetablePage() {
//   const router = useRouter()
//   const [timetableData, setTimetableData] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [timetableTitle, setTimetableTitle] = useState("")
//   const [academicYear, setAcademicYear] = useState("")
//   const [semester, setSemester] = useState("")
//   const [showResetConfirm, setShowResetConfirm] = useState(false)
//   const [lunchBreakSlot, setLunchBreakSlot] = useState("lunch")
//   const [year, setYear] = useState("")

//   const handleCellChange = (day, slot, value) => {
//     setTimetableData((prev) => ({
//       ...prev,
//       [`${day}-${slot}`]: value,
//     }))
//   }

//   const handleReset = () => {
//     setShowResetConfirm(true)
//   }

//   const confirmReset = () => {
//     setTimetableData({})
//     setTimetableTitle("")
//     setAcademicYear("")
//     setSemester("")
//     setYear("")
//     setLunchBreakSlot("lunch")
//     setShowResetConfirm(false)
//     // Force re-render of all cells
//     window.location.reload()
//   }

//   const cancelReset = () => {
//     setShowResetConfirm(false)
//   }

//   const handleSave = async () => {
//     if (!timetableTitle.trim()) {
//       alert("Please enter a timetable title")
//       return
//     }

//     if (!academicYear || !semester || !year) {
//       alert("Please select semester year, semester, and year")
//       return
//     }

//     setLoading(true)

//     try {
//       // Convert timetableData to 6x10 grid format
//       const grid = daysOfWeek.map((day) => {
//         return timeSlots.map((timeSlot) => {
//           const cellKey = `${day.id}-${timeSlot.id}`
//           const cellData = timetableData[cellKey]

//           // Handle lunch break
//           if (timeSlot.id === lunchBreakSlot) {
//             return {
//               slot: "LB"
//             }
//           }

//           // Handle filled slots
//           if (cellData && cellData.trim()) {
//             return {
//               slot: cellData.trim()
//             }
//           }

//           // Handle free slots
//           return {
//             slot: "FS"
//           }
//         })
//       })

//       const payload = {
//         grid: grid,
//         semester: academicYear + " " + semester,
//         year: Number.parseInt(year), // Convert to number
//       }
//       console.log(payload)
//       // Send to backend
//       const response = await fetch("/api/course/createGrid", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })

//       const result = await response.json()

//       if (result.success) {
//         alert("Timetable saved successfully!")
//         console.log("Grid saved:", result.grid)
//       } else {
//         throw new Error(result.message || "Failed to save timetable")
//       }
//     } catch (error) {
//       console.error("Save error:", error)
//       alert(`Failed to save timetable: ${error.message}`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full max-w-7xl mx-auto"
//       >
//         <Card className="shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//           <CardContent className="p-4 sm:p-6 lg:p-10">
//             {/* Header */}
//             <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
//               <div className="flex items-center gap-3">
//                 <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
//                 <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
//                   Timetable Builder
//                 </h1>
//               </div>
//               <Link
//                 href="/admin/courses"
//                 className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//               >
//                 ← Back to courses
//               </Link>
//             </div>

//             {/* Timetable Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6 sm:mb-8">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Timetable Title *</label>
//                 <Input
//                   placeholder="e.g., B.Tech 2nd Year - Spring 2024"
//                   value={timetableTitle}
//                   onChange={(e) => setTimetableTitle(e.target.value)}
//                   className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Year *</label>
//                 <Select value={year} onValueChange={setYear}>
//                   <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
//                     <SelectValue placeholder="Select year" />
//                   </SelectTrigger>
//                   <SelectContent className="z-50">
//                     <SelectItem value="1">1st Year</SelectItem>
//                     <SelectItem value="2">2nd Year</SelectItem>
//                     <SelectItem value="3">3rd Year</SelectItem>
//                     <SelectItem value="4">4th Year</SelectItem>
//                     <SelectItem value="5">5th Year</SelectItem>
//                     <SelectItem value="6">6th Year</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Semester Year *</label>
//                 <Select value={academicYear} onValueChange={setAcademicYear}>
//                   <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
//                     <SelectValue placeholder="Select semester year" />
//                   </SelectTrigger>
//                   <SelectContent className="z-50">
//                     <SelectItem value="2024">2024</SelectItem>
//                     <SelectItem value="2025">2025</SelectItem>
//                     <SelectItem value="2026">2026</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Semester *</label>
//                 <Select value={semester} onValueChange={setSemester}>
//                   <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
//                     <SelectValue placeholder="Select semester" />
//                   </SelectTrigger>
//                   <SelectContent className="z-50">
//                     <SelectItem value="spring">Spring</SelectItem>
//                     <SelectItem value="autumn">Autumn</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Lunch Break Slot</label>
//                 <Select value={lunchBreakSlot} onValueChange={setLunchBreakSlot}>
//                   <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-blue-400">
//                     <SelectValue placeholder="Select lunch slot" />
//                   </SelectTrigger>
//                   <SelectContent className="z-50">
//                     {timeSlots.map((slot) => (
//                       <SelectItem key={slot.id} value={slot.id}>
//                         {slot.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Instructions */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 sm:mb-8">
//               <div className="flex items-start gap-3">
//                 <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                 <div className="text-sm text-blue-800">
//                   <p className="font-semibold mb-1">How to use:</p>
//                   <ul className="space-y-1 text-xs sm:text-sm">
//                     <li>• Click on any cell to add slot letter</li>
//                     <li>• Slot letters will be automatically capitalized</li>
//                     <li>• Press Enter to confirm entry</li>
//                     <li>• Lunch break is automatically handled</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Timetable Grid */}
//             <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
//               <div className="min-w-[800px] p-4">
//                 {/* Header Row */}
//                 <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                   <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
//                     <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
//                     <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
//                   </div>
//                   {timeSlots.map((slot) => (
//                     <div
//                       key={slot.id}
//                       className={`border border-gray-300 rounded-lg p-1 sm:p-2 text-center ${
//                         slot.id === lunchBreakSlot ? "bg-orange-100" : "bg-blue-50"
//                       }`}
//                     >
//                       <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Timetable Rows */}
//                 {daysOfWeek.map((day) => (
//                   <div key={day.id} className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                     <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
//                       <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
//                     </div>
//                     {timeSlots.map((slot) => (
//                       <TimetableCell
//                         key={`${day.id}-${slot.id}`}
//                         day={day.id}
//                         slot={slot.id}
//                         value={timetableData[`${day.id}-${slot.id}`]}
//                         onChange={(value) => handleCellChange(day.id, slot.id, value)}
//                         isLunch={slot.id === lunchBreakSlot}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 pt-6 border-t-2 border-gray-200">
//               <Button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="flex-1 h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-3">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Saving Timetable...
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <Save className="w-5 h-5" />
//                     Save Timetable
//                   </div>
//                 )}
//               </Button>
//               <Button
//                 onClick={handleReset}
//                 variant="outline"
//                 className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-base sm:text-lg transition-colors"
//               >
//                 <RotateCcw className="w-5 h-5 mr-2" />
//                 Reset
//               </Button>
//               <Button
//                 onClick={() => router.push("/courses")}
//                 variant="outline"
//                 className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-base sm:text-lg transition-colors"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//       {/* Reset Confirmation Dialog */}
//       {showResetConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[300] p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to reset the entire timetable? This action cannot be undone and will clear all
//               entered data.
//             </p>
//             <div className="flex gap-3 justify-end">
//               <Button
//                 onClick={cancelReset}
//                 variant="outline"
//                 className="px-4 py-2 border-2 border-gray-300 hover:bg-gray-50"
//               >
//                 Cancel
//               </Button>
//               <Button onClick={confirmReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
//                 Reset All
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }

"use client";
import { useState } from "react";
import React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, RotateCcw, GraduationCap, Clock } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Time slots configuration
const timeSlots = [
  { id: "slot1", label: "8:30-9:25", start: "8:30", end: "9:25" },
  { id: "slot2", label: "9:30-10:25", start: "9:30", end: "10:25" },
  { id: "slot3", label: "10:30-11:25", start: "10:30", end: "11:25" },
  { id: "slot4", label: "11:30-12:25", start: "11:30", end: "12:25" },
  {
    id: "lunch",
    label: "12:30-13:25",
    start: "12:30",
    end: "13:25",
    isLunch: true,
  },
  { id: "slot5", label: "13:30-14:25", start: "13:30", end: "14:25" },
  { id: "slot6", label: "14:30-15:25", start: "14:30", end: "15:25" },
  { id: "slot7", label: "15:30-16:25", start: "15:30", end: "16:25" },
  { id: "slot8", label: "16:30-17:25", start: "16:30", end: "17:25" },
  { id: "slot9", label: "17:30-18:25", start: "17:30", end: "18:25" },
];

const daysOfWeek = [
  { id: "monday", label: "Mon", fullName: "Monday" },
  { id: "tuesday", label: "Tue", fullName: "Tuesday" },
  { id: "wednesday", label: "Wed", fullName: "Wednesday" },
  { id: "thursday", label: "Thu", fullName: "Thursday" },
  { id: "friday", label: "Fri", fullName: "Friday" },
  { id: "saturday", label: "Sat", fullName: "Saturday" },
];

// Cell input component
const TimetableCell = ({ day, slot, value, onChange, isLunch }) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [isEditing, setIsEditing] = useState(false);
  const slotInputRef = React.useRef(null);

  const handleChange = (newValue) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleCellClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSlotKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  const handleEditingEnd = () => {
    setIsEditing(false);
  };

  // Don't show empty cells in display mode
  const hasContent = localValue && localValue.trim();

  if (isLunch) {
    return (
      <div className="h-12 sm:h-16 md:h-20 bg-orange-50 border border-orange-200 rounded-md sm:rounded-lg flex items-center justify-center px-1">
        <span className="text-xs sm:text-sm font-medium text-orange-700 text-center leading-tight">
          Lunch Break
        </span>
      </div>
    );
  }

  return (
    <div
      className="h-12 sm:h-16 md:h-20 bg-white border-2 border-gray-200 rounded-md sm:rounded-lg p-1 sm:p-2 hover:border-blue-300 transition-colors cursor-pointer group relative"
      onClick={handleCellClick}
    >
      {isEditing ? (
        <div
          className="h-full flex flex-col justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            ref={slotInputRef}
            placeholder="Slot"
            value={localValue}
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            onKeyDown={handleSlotKeyDown}
            onBlur={() => {
              handleEditingEnd();
            }}
            className="h-6 sm:h-8 text-xs sm:text-sm border-0 p-1 bg-blue-50 focus:bg-white text-center"
            autoFocus
          />
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center text-center group-hover:bg-blue-50 rounded transition-colors">
          {hasContent ? (
            <div className="text-xs sm:text-sm md:text-lg font-bold text-blue-700 leading-tight">
              {localValue}
            </div>
          ) : (
            <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to add
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function TimetablePage() {
  const router = useRouter();
  const [timetableData, setTimetableData] = useState({});
  const [loading, setLoading] = useState(false);
  const [timetableTitle, setTimetableTitle] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [lunchBreakSlot, setLunchBreakSlot] = useState("lunch");
  const [year, setYear] = useState("");

  const handleCellChange = (day, slot, value) => {
    setTimetableData((prev) => ({
      ...prev,
      [`${day}-${slot}`]: value,
    }));
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setTimetableData({});
    setTimetableTitle("");
    setAcademicYear("");
    setSemester("");
    setYear("");
    setLunchBreakSlot("lunch");
    setShowResetConfirm(false);
    // Force re-render of all cells
    window.location.reload();
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  const handleSave = async () => {
    if (!timetableTitle.trim()) {
      alert("Please enter a timetable title");
      return;
    }

    if (!academicYear || !semester || !year) {
      alert("Please select semester year, semester, and year");
      return;
    }

    setLoading(true);

    try {
      // Convert timetableData to 6x10 grid format
      const grid = daysOfWeek.map((day) => {
        return timeSlots.map((timeSlot) => {
          const cellKey = `${day.id}-${timeSlot.id}`;
          const cellData = timetableData[cellKey];

          // Handle lunch break
          if (timeSlot.id === lunchBreakSlot) {
            return {
              slot: "LB",
            };
          }

          // Handle filled slots
          if (cellData && cellData.trim()) {
            return {
              slot: cellData.trim(),
            };
          }

          // Handle free slots
          return {
            slot: "FS",
          };
        });
      });

      // const payload = {
      //   grid: grid,
      //   semester: academicYear + " " + semester,
      //   year: Number.parseInt(year), // Convert to number
      // }
      const capitalizedSemester =
        semester.charAt(0).toUpperCase() + semester.slice(1);

      const payload = {
        grid: grid,
        semester: academicYear + " " + capitalizedSemester,
        year: Number.parseInt(year),
      };

      console.log(payload);
      // Send to backend
      const response = await fetch("/api/course/createGrid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("Timetable saved successfully!");
        console.log("Grid saved:", result.grid);
      } else {
        throw new Error(result.message || "Failed to save timetable");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert(`Failed to save timetable: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto"
      >
        <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
          <CardContent className="p-3 sm:p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
                  Timetable Builder
                </h1>
              </div>
              <Link
                href="/admin/courses"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ← Back to courses
              </Link>
            </div>

            {/* Timetable Info */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {/* Title - Full width */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-semibold text-gray-700">
                  Timetable Title *
                </label>
                <Input
                  placeholder="e.g., B.Tech 2nd Year - Spring 2024"
                  value={timetableTitle}
                  onChange={(e) => setTimetableTitle(e.target.value)}
                  className="h-12 sm:h-14 text-sm sm:text-base border-2 focus:border-blue-400"
                />
              </div>

              {/* Form fields - 2 columns initially, 4 columns on large screens */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 sm:gap-2">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-700">
                    Year *
                  </label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-base border-2 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select Year" />
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
                  <label className="text-sm sm:text-base font-semibold text-gray-700">
                    Sem Year *
                  </label>
                  <Select value={academicYear} onValueChange={setAcademicYear}>
                    <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-base border-2 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select Semester Year" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-700">
                    Semester *
                  </label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-base border-2 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="autumn">Autumn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-semibold text-gray-700">
                    Lunch Slot
                  </label>
                  <Select
                    value={lunchBreakSlot}
                    onValueChange={setLunchBreakSlot}
                  >
                    <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-base border-2 focus:border-blue-400 w-full">
                      <SelectValue placeholder="Select Lunch Slot" />
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
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm text-blue-800">
                  <p className="font-semibold mb-1">How to use:</p>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>• Click on any cell to add slot letter</li>
                    <li>• Slot letters will be automatically capitalized</li>
                    <li>• Press Enter to confirm entry</li>
                    <li>• Lunch break is automatically handled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timetable Grid - Keep horizontal scroll on all devices */}
            <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
              <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
                {/* Header Row */}
                <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
                    <div className="text-xs sm:text-sm font-bold text-gray-700">
                      Day/
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-700">
                      Time
                    </div>
                  </div>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border border-gray-300 rounded-lg p-1 sm:p-2 text-center ${
                        slot.id === lunchBreakSlot
                          ? "bg-orange-100"
                          : "bg-blue-50"
                      }`}
                    >
                      <div className="text-xs font-semibold text-gray-700 leading-tight">
                        {slot.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timetable Rows */}
                {daysOfWeek.map((day) => (
                  <div
                    key={day.id}
                    className="grid grid-cols-11 gap-1 sm:gap-2 mb-2"
                  >
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-700">
                        {day.label}
                      </span>
                    </div>
                    {timeSlots.map((slot) => (
                      <TimetableCell
                        key={`${day.id}-${slot.id}`}
                        day={day.id}
                        slot={slot.id}
                        value={timetableData[`${day.id}-${slot.id}`]}
                        onChange={(value) =>
                          handleCellChange(day.id, slot.id, value)
                        }
                        isLunch={slot.id === lunchBreakSlot}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t-2 border-gray-200">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Timetable...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    Save Timetable
                  </div>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-sm sm:text-base md:text-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() => router.push("/courses")}
                variant="outline"
                className="px-6 sm:px-8 h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold text-sm sm:text-base md:text-lg transition-colors"
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Reset
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset the entire timetable? This action
              cannot be undone and will clear all entered data.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={cancelReset}
                variant="outline"
                className="px-4 py-2 border-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
