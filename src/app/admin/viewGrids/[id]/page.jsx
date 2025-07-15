
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { GraduationCap, Calendar, BookOpen, ArrowLeft, Clock, Edit, Download } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

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
// ];

// const daysOfWeek = [
//   { id: "monday", label: "Mon" },
//   { id: "tuesday", label: "Tue" },
//   { id: "wednesday", label: "Wed" },
//   { id: "thursday", label: "Thu" },
//   { id: "friday", label: "Fri" },
//   { id: "saturday", label: "Sat" },
// ];

// const TimetableDisplayCell = ({ value, isLunch }) => {
//   if (isLunch) {
//     return (
//       <div className="h-12 sm:h-16 md:h-20 bg-orange-50 border border-orange-200 rounded-md sm:rounded-lg flex items-center justify-center px-1">
//         <span className="text-xs sm:text-sm font-medium text-orange-700 text-center leading-tight">
//           Lunch Break
//         </span>
//       </div>
//     );
//   }

//   const getCellContent = () => {
//     if (value === "FS") return { text: "Free Slot", style: "text-green-600 bg-green-50 border-green-200" };
//     if (value === "LB") return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" };
//     return { text: value, style: "text-blue-700 bg-blue-50 border-blue-200" };
//   };

//   const { text, style } = getCellContent();

//   return (
//     <div className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}>
//       <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
//     </div>
//   );
// };

// export default function GridDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [gridData, setGridData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGridData = async () => {
//       try {
//         const mockGridData = {
//           id: params.id,
//           semester: "2024 Spring",
//           year: 2,
//           grid: [
//             ["CS101", "MATH201", "FS", "PHY101", "LB", "CS102", "FS", "ENG101", "FS", "FS"],
//             ["MATH201", "CS101", "PHY101", "FS", "LB", "ENG101", "CS102", "FS", "LAB1", "LAB1"],
//             ["PHY101", "FS", "CS101", "MATH201", "LB", "FS", "ENG101", "CS102", "FS", "FS"],
//             ["CS102", "PHY101", "MATH201", "FS", "LB", "CS101", "FS", "ENG101", "LAB2", "LAB2"],
//             ["ENG101", "CS102", "FS", "CS101", "LB", "MATH201", "PHY101", "FS", "FS", "FS"],
//             ["FS", "FS", "FS", "FS", "LB", "FS", "FS", "FS", "FS", "FS"],
//           ],
//           createdAt: "2024-01-15T10:30:00Z",
//           updatedAt: "2024-01-15T10:30:00Z",
//         };

//         setGridData(mockGridData);
//       } catch (err) {
//         setError("Failed to load grid data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) {
//       fetchGridData();
//     }
//   }, [params.id]);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getYearSuffix = (year) => {
//     const suffixes = ["st", "nd", "rd", "th"];
//     const v = year % 100;
//     return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
//   };

//   const handleExport = () => {
//     alert("Export functionality would be implemented here");
//   };

//   if (loading || !gridData) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full max-w-7xl mx-auto"
//       >
//         <Card className="shadow-2xl rounded-xl border bg-white/90 backdrop-blur-lg">
//           <CardContent className="p-6 lg:p-10">
//             <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
//                 <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
//                   Timetable Grid Details
//                 </h1>
//               </div>
//               <Link
//                 href="/admin/viewGrids"
//                 className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline"
//               >
//                 ← Back to all grids
//               </Link>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Academic Year</p>
//                     <p className="text-lg font-bold text-blue-900">{gridData.semester}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <BookOpen className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Year Level</p>
//                     <p className="text-lg font-bold text-blue-900">{getYearSuffix(gridData.year)} Year</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Created</p>
//                     <p className="text-sm text-blue-700">{formatDate(gridData.createdAt)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Edit className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Last Updated</p>
//                     <p className="text-sm text-blue-700">{formatDate(gridData.updatedAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 mb-6">
//               <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export Grid
//               </Button>
//               <Link href={`/grids/${gridData.id}/edit`}>
//                 <Button variant="outline" className="border-2 border-blue-300 hover:bg-blue-50 font-semibold h-12">
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit Grid
//                 </Button>
//               </Link>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
//               <div className="min-w-[700px] sm:min-w-[800px] p-4">
//                 <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                   <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-center">
//                     <div className="text-xs font-bold text-gray-700">Day/</div>
//                     <div className="text-xs font-bold text-gray-700">Time</div>
//                   </div>
//                   {timeSlots.map((slot) => (
//                     <div key={slot.id} className={`border rounded-lg p-2 text-center ${slot.isLunch ? "bg-orange-100" : "bg-blue-50"}`}>
//                       <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {daysOfWeek.map((day, dayIndex) => (
//                   <div key={day.id} className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                     <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 flex items-center justify-center">
//                       <span className="text-sm font-bold text-gray-700">{day.label}</span>
//                     </div>
//                     {timeSlots.map((slot, slotIndex) => (
//                       <TimetableDisplayCell
//                         key={`${day.id}-${slot.id}`}
//                         value={gridData.grid[dayIndex]?.[slotIndex] || "FS"}
//                         isLunch={slot.isLunch || false}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
//               <div className="flex flex-wrap gap-4 text-xs">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
//                   <span>Course Slots</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
//                   <span>Free Slots (FS)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
//                   <span>Lunch Break (LB)</span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   GraduationCap,
//   Calendar,
//   BookOpen,
//   ArrowLeft,
//   Clock,
//   Edit,
//   Download,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

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
//     isLunch: true,
//   },
//   { id: "slot5", label: "13:30-14:25", start: "13:30", end: "14:25" },
//   { id: "slot6", label: "14:30-15:25", start: "14:30", end: "15:25" },
//   { id: "slot7", label: "15:30-16:25", start: "15:30", end: "16:25" },
//   { id: "slot8", label: "16:30-17:25", start: "16:30", end: "17:25" },
//   { id: "slot9", label: "17:30-18:25", start: "17:30", end: "18:25" },
// ];

// const daysOfWeek = [
//   { id: "monday", label: "Mon", fullName: "Monday" },
//   { id: "tuesday", label: "Tue", fullName: "Tuesday" },
//   { id: "wednesday", label: "Wed", fullName: "Wednesday" },
//   { id: "thursday", label: "Thu", fullName: "Thursday" },
//   { id: "friday", label: "Fri", fullName: "Friday" },
//   { id: "saturday", label: "Sat", fullName: "Saturday" },
// ];

// const TimetableDisplayCell = ({ value, isLunch }) => {
//   if (isLunch) {
//     return (
//       <div className="h-12 sm:h-16 md:h-20 bg-orange-50 border border-orange-200 rounded-md sm:rounded-lg flex items-center justify-center px-1">
//         <span className="text-xs sm:text-sm font-medium text-orange-700 text-center leading-tight">
//           Lunch Break
//         </span>
//       </div>
//     );
//   }

//   const getCellContent = () => {
//     if (value === "FS") return { text: "Free Slot", style: "text-green-600 bg-green-50 border-green-200" };
//     if (value === "LB") return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" };
//     return { text: value, style: "text-blue-700 bg-blue-50 border-blue-200" };
//   };

//   const { text, style } = getCellContent();

//   return (
//     <div className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}>
//       <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
//     </div>
//   );
// };

// export default function GridDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [gridData, setGridData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//   const fetchGridData = async () => {
//     try {
//       const response = await fetch(`/api/admin/getGridWithId?gridId=${params.id}`);
//       const result = await response.json();

//       if (result.success) {
//         setGridData(result.grid);
//       } else {
//         setError(result.message || "Failed to load grid data");
//       }
//     } catch (error) {
//       console.error("Error fetching grid data:", error);
//       setError("Failed to load grid data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (params.id) {
//     fetchGridData();
//   }
// }, [params.id]);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getYearSuffix = (year) => {
//     const suffixes = ["st", "nd", "rd", "th"];
//     const v = year % 100;
//     return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
//   };

//   const handleExport = () => {
//     alert("Export functionality would be implemented here");
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//         <div className="w-full max-w-7xl mx-auto">
//           <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//             <CardContent className="p-6 lg:p-10">
//               <div className="flex items-center justify-center h-64">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                   <span className="text-lg font-semibold text-gray-700">Loading grid details...</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     );
//   }

//   if (error || !gridData) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//         <div className="w-full max-w-7xl mx-auto">
//           <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//             <CardContent className="p-6 lg:p-10">
//               <div className="text-center py-12">
//                 <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">Grid Not Found</h3>
//                 <p className="text-gray-500 mb-4">{error || "The requested timetable grid could not be found."}</p>
//                 <Link href="/grids">
//                   <Button className="bg-blue-600 hover:bg-blue-700">
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Grids
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     );
//   }

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
//                 <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
//                 <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
//                   Timetable Grid Details
//                 </h1>
//               </div>
//               <Link
//                 href="/grids"
//                 className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//               >
//                 ← Back to all grids
//               </Link>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Academic Year</p>
//                     <p className="text-lg font-bold text-blue-900">{gridData.semester}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <BookOpen className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Year Level</p>
//                     <p className="text-lg font-bold text-blue-900">
//                       {getYearSuffix(parseInt(gridData.year))} Year
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Created</p>
//                     <p className="text-sm text-blue-700">{formatDate(gridData.createdAt)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Edit className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-800">Last Updated</p>
//                     <p className="text-sm text-blue-700">{formatDate(gridData.updatedAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
//               <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export Grid
//               </Button>
//               <Link href={`/admin/courses/edit-grid/${gridData._id}`}>
//                 <Button variant="outline" className="w-full sm:w-auto border-2 border-blue-300 hover:bg-blue-50 font-semibold h-12 bg-transparent">
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit Grid
//                 </Button>
//               </Link>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
//               <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
//                 <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                   <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
//                     <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
//                     <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
//                   </div>
//                   {timeSlots.map((slot) => (
//                     <div key={slot.id} className={`border border-gray-300 rounded-lg p-1 sm:p-2 text-center ${slot.isLunch ? "bg-orange-100" : "bg-blue-50"}`}>
//                       <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {daysOfWeek.map((day, dayIndex) => (
//                   <div key={day.id} className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
//                     <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
//                       <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
//                     </div>
//                     {timeSlots.map((slot, slotIndex) => (
//                       <TimetableDisplayCell
//                         key={`${day.id}-${slot.id}`}
//                         value={gridData.grid[dayIndex]?.[slotIndex]?.slot || "FS"}
//                         isLunch={slot.isLunch || false}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6 sm:mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
//               <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
//                   <span>Course Slots</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
//                   <span>Free Slots (FS)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
//                   <span>Lunch Break (LB)</span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   );
// }




"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap, Calendar, BookOpen, ArrowLeft, Clock, Edit, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
]

const daysOfWeek = [
  { id: "monday", label: "Mon", fullName: "Monday" },
  { id: "tuesday", label: "Tue", fullName: "Tuesday" },
  { id: "wednesday", label: "Wed", fullName: "Wednesday" },
  { id: "thursday", label: "Thu", fullName: "Thursday" },
  { id: "friday", label: "Fri", fullName: "Friday" },
  { id: "saturday", label: "Sat", fullName: "Saturday" },
]

const TimetableDisplayCell = ({ value, isLunch }) => {
  if (isLunch) {
    return (
      <div className="h-12 sm:h-16 md:h-20 bg-orange-50 border border-orange-200 rounded-md sm:rounded-lg flex items-center justify-center px-1">
        <span className="text-xs sm:text-sm font-medium text-orange-700 text-center leading-tight">Lunch Break</span>
      </div>
    )
  }

  const getCellContent = () => {
    if (value === "FS") return { text: "Free Slot", style: "text-green-600 bg-green-50 border-green-200" }
    if (value === "LB") return { text: "Lunch Break", style: "text-orange-600 bg-orange-50 border-orange-200" }
    return { text: value, style: "text-blue-700 bg-blue-50 border-blue-200" }
  }

  const { text, style } = getCellContent()

  return (
    <div
      className={`h-12 sm:h-16 md:h-20 border rounded-md sm:rounded-lg p-1 sm:p-2 flex items-center justify-center ${style}`}
    >
      <div className="text-xs sm:text-sm md:text-base font-semibold text-center leading-tight">{text}</div>
    </div>
  )
}

export default function GridDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [gridData, setGridData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
  const fetchGridData = async () => {
    try {
      const response = await fetch('/api/admin/getGridWithId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gridId: "685a7869e91c8c8e4777d904" }),
      });

      const result = await response.json();
      console.log("result", result);

      if (result.success) {
        setGridData(result.grid);
      } else {
        setError(result.message || "Failed to load grid data");
      }
    } catch (error) {
      console.error("Error fetching grid data:", error);
      setError("Failed to load grid data");
    } finally {
      setLoading(false);
    }
  };

  if (params.id) {
    fetchGridData();
  }
}, [params.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getYearSuffix = (year) => {
    const suffixes = ["st", "nd", "rd", "th"]
    const v = year % 100
    return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
  }

  const handleExport = () => {
    alert("Export functionality would be implemented here")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-7xl mx-auto">
          <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
            <CardContent className="p-6 lg:p-10">
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-semibold text-gray-700">Loading grid details...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (error || !gridData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-7xl mx-auto">
          <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
            <CardContent className="p-6 lg:p-10">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Grid Not Found</h3>
                <p className="text-gray-500 mb-4">{error || "The requested timetable grid could not be found."}</p>
                <Link href="/grids">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Grids
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

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
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
                  Timetable Grid Details
                </h1>
              </div>
              <Link
                href="/grids"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ← Back to all grids
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Academic Year</p>
                    <p className="text-lg font-bold text-blue-900">{gridData.semester}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Year Level</p>
                    <p className="text-lg font-bold text-blue-900">
                      {getYearSuffix(Number.parseInt(gridData.year))} Year
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Created</p>
                    <p className="text-sm text-blue-700">{formatDate(gridData.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Edit className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Last Updated</p>
                    <p className="text-sm text-blue-700">{formatDate(gridData.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white font-semibold h-12">
                <Download className="w-4 h-4 mr-2" />
                Export Grid
              </Button>
              <Link href={`/admin/courses/edit-grid/${gridData._id}`}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-300 hover:bg-blue-50 font-semibold h-12 bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Grid
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl border-2 border-gray-200 shadow-inner">
              <div className="min-w-[700px] sm:min-w-[800px] p-2 sm:p-4">
                <div className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 text-center">
                    <div className="text-xs sm:text-sm font-bold text-gray-700">Day/</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-700">Time</div>
                  </div>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`border border-gray-300 rounded-lg p-1 sm:p-2 text-center ${slot.isLunch ? "bg-orange-100" : "bg-blue-50"}`}
                    >
                      <div className="text-xs font-semibold text-gray-700 leading-tight">{slot.label}</div>
                    </div>
                  ))}
                </div>
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={day.id} className="grid grid-cols-11 gap-1 sm:gap-2 mb-2">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-700">{day.label}</span>
                    </div>
                    {timeSlots.map((slot, slotIndex) => (
                      <TimetableDisplayCell
                        key={`${day.id}-${slot.id}`}
                        value={gridData.grid[dayIndex]?.[slotIndex]?.slot || "FS"}
                        isLunch={slot.isLunch || false}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                  <span>Course Slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span>Free Slots (FS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                  <span>Lunch Break (LB)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
