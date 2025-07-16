
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { GraduationCap, Calendar, BookOpen, Eye, Search } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export default function ViewGridsPage() {
//   const [grids, setGrids] = useState([])
//   const [filteredGrids, setFilteredGrids] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [yearFilter, setYearFilter] = useState("all")
//   const [semesterFilter, setSemesterFilter] = useState("all")

//   useEffect(() => {
//     const fetchGrids = async () => {
//       try {
//         const mockGrids = [
//           {
//             id: "1",
//             semester: "2024 Spring",
//             year: 2,
//             createdAt: "2024-01-15T10:30:00Z",
//             updatedAt: "2024-01-15T10:30:00Z",
//           },
//           {
//             id: "2",
//             semester: "2024 Autumn",
//             year: 3,
//             createdAt: "2024-08-20T14:45:00Z",
//             updatedAt: "2024-08-20T14:45:00Z",
//           },
//           {
//             id: "3",
//             semester: "2025 Spring",
//             year: 1,
//             createdAt: "2024-12-10T09:15:00Z",
//             updatedAt: "2024-12-10T09:15:00Z",
//           },
//           {
//             id: "4",
//             semester: "2024 Spring",
//             year: 4,
//             createdAt: "2024-01-18T16:20:00Z",
//             updatedAt: "2024-01-18T16:20:00Z",
//           },
//         ]

//         setGrids(mockGrids)
//         setFilteredGrids(mockGrids)
//       } catch (error) {
//         console.error("Error fetching grids:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchGrids()
//   }, [])

//   useEffect(() => {
//     let filtered = grids

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (grid) =>
//           grid.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           grid.year.toString().includes(searchTerm)
//       )
//     }

//     if (yearFilter !== "all") {
//       filtered = filtered.filter((grid) => grid.year.toString() === yearFilter)
//     }

//     if (semesterFilter !== "all") {
//       filtered = filtered.filter((grid) =>
//         grid.semester.toLowerCase().includes(semesterFilter.toLowerCase())
//       )
//     }

//     setFilteredGrids(filtered)
//   }, [grids, searchTerm, yearFilter, semesterFilter])

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const getYearSuffix = (year) => {
//     const suffixes = ["st", "nd", "rd", "th"]
//     const v = year % 100
//     return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
//         <div className="w-full max-w-7xl mx-auto">
//           <Card className="shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg">
//             <CardContent className="p-6 lg:p-10">
//               <div className="flex items-center justify-center h-64">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                   <span className="text-lg font-semibold text-gray-700">Loading grids...</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     )
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
//                   View Timetable Grids
//                 </h1>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-2 text-xs sm:text-sm text-blue-600">
//                 <Link href="/admin/courses" className="hover:text-blue-800 hover:underline transition-colors">
//                   ← Back to courses
//                 </Link>
//                 <span className="hidden sm:inline">|</span>
//                 <Link href="/grids/create" className="hover:text-blue-800 hover:underline transition-colors">
//                   Create new grid →
//                 </Link>
//               </div>
//             </div>

//             <div className="space-y-4 mb-6 sm:mb-8">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Search by semester or year..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 h-12 text-sm sm:text-base border-2 focus:border-blue-400"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Select value={yearFilter} onValueChange={setYearFilter}>
//                     <SelectTrigger className="w-32 h-12 text-sm border-2 focus:border-blue-400">
//                       <SelectValue placeholder="Year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Years</SelectItem>
//                       <SelectItem value="1">1st Year</SelectItem>
//                       <SelectItem value="2">2nd Year</SelectItem>
//                       <SelectItem value="3">3rd Year</SelectItem>
//                       <SelectItem value="4">4th Year</SelectItem>
//                       <SelectItem value="5">5th Year</SelectItem>
//                       <SelectItem value="6">6th Year</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Select value={semesterFilter} onValueChange={setSemesterFilter}>
//                     <SelectTrigger className="w-36 h-12 text-sm border-2 focus:border-blue-400">
//                       <SelectValue placeholder="Semester" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Semesters</SelectItem>
//                       <SelectItem value="spring">Spring</SelectItem>
//                       <SelectItem value="autumn">Autumn</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <p className="text-sm text-gray-600">
//                 Showing {filteredGrids.length} of {grids.length} timetable grids
//               </p>
//             </div>

//             {filteredGrids.length === 0 ? (
//               <div className="text-center py-12">
//                 <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">No grids found</h3>
//                 <p className="text-gray-500 mb-4">
//                   {grids.length === 0
//                     ? "No timetable grids have been created yet."
//                     : "No grids match your current filters."}
//                 </p>
//                 {grids.length === 0 && (
//                   <Link href="/grids/create">
//                     <Button className="bg-blue-600 hover:bg-blue-700">Create your first grid</Button>
//                   </Link>
//                 )}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                 {filteredGrids.map((grid, index) => (
//                   <motion.div
//                     key={grid.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 bg-white">
//                       <CardContent className="p-4 sm:p-6">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="w-5 h-5 text-blue-600" />
//                             <span className="text-sm font-medium text-blue-600">Timetable Grid</span>
//                           </div>
//                           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">ID: {grid.id}</span>
//                         </div>

//                         <div className="space-y-3 mb-6">
//                           <div>
//                             <h3 className="text-lg font-bold text-gray-800 mb-1">{getYearSuffix(grid.year)} Year</h3>
//                             <p className="text-sm text-gray-600">Academic Year & Semester</p>
//                           </div>

//                           <div className="bg-blue-50 rounded-lg p-3">
//                             <div className="flex items-center gap-2 mb-1">
//                               <BookOpen className="w-4 h-4 text-blue-600" />
//                               <span className="text-sm font-semibold text-blue-800">{grid.semester}</span>
//                             </div>
//                             <p className="text-xs text-blue-600">Year {grid.year} Curriculum</p>
//                           </div>

//                           <div className="text-xs text-gray-500 space-y-1">
//                             <p>Created: {formatDate(grid.createdAt)}</p>
//                             <p>Updated: {formatDate(grid.updatedAt)}</p>
//                           </div>
//                         </div>

//                         <Link href={`viewGrids/${grid.id}`}>
//                           <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 transition-colors">
//                             <Eye className="w-4 h-4 mr-2" />
//                             View Grid Details
//                           </Button>
//                         </Link>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ViewGridsPage() {
  const [grids, setGrids] = useState([]);
  const [filteredGrids, setFilteredGrids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrids = async () => {
      try {
        const response = await fetch("/api/admin/getGrids");
        const result = await response.json();

        if (result.success) {
          setGrids(result.grids);
          setFilteredGrids(result.grids);
        } else {
          console.error("Failed to fetch grids:", result.message);
          setError("Failed to load grids");
        }
      } catch (error) {
        console.error("Error fetching grids:", error);
        setError("Failed to load grids");
      } finally {
        setLoading(false);
      }
    };

    fetchGrids();
  }, []);

  useEffect(() => {
    let filtered = grids;

    if (searchTerm) {
      filtered = filtered.filter(
        (grid) =>
          grid.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grid.year.toString().includes(searchTerm)
      );
    }

    if (yearFilter !== "all") {
      filtered = filtered.filter((grid) => grid.year === yearFilter);
    }

    if (semesterFilter !== "all") {
      filtered = filtered.filter((grid) =>
        grid.semester.toLowerCase().includes(semesterFilter.toLowerCase())
      );
    }

    setFilteredGrids(filtered);
  }, [grids, searchTerm, yearFilter, semesterFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getYearSuffix = (year) => {
    const suffixes = ["st", "nd", "rd", "th"];
    const v = year % 100;
    return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-7xl mx-auto">
          <Card className="shadow-2xl rounded-xl border border-gray-100 bg-white/90 backdrop-blur-lg">
            <CardContent className="p-6 lg:p-10">
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-semibold text-gray-700">Loading grids...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-7xl mx-auto">
          <Card className="shadow-2xl rounded-xl border border-gray-100 bg-white/90 backdrop-blur-lg">
            <CardContent className="p-6 lg:p-10">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Error Loading Grids</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 px-2 sm:px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto"
      >
        <Card className="shadow-2xl rounded-xl border border-gray-100 bg-white/90 backdrop-blur-lg">
          <CardContent className="p-3 sm:p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 text-center">
                  View Timetable Grids
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-600">
                <Link href="/admin/courses" className="hover:text-blue-800 hover:underline">
                  ← Back to courses
                </Link>
                <span className="hidden sm:inline">|</span>
                <Link href="/admin/courses/create-grid" className="hover:text-blue-800 hover:underline">
                  Create new grid →
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by semester or year..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-sm border-2 focus:border-blue-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-32 h-12 text-sm border-2 focus:border-blue-400">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="5">5th Year</SelectItem>
                      <SelectItem value="6">6th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger className="w-36 h-12 text-sm border-2 focus:border-blue-400">
                      <SelectValue placeholder="Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="autumn">Autumn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredGrids.length} of {grids.length} timetable grids
              </p>
            </div>

            {/* Grid Cards */}
            {filteredGrids.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No grids found</h3>
                <p className="text-gray-500 mb-4">
                  {grids.length === 0
                    ? "No timetable grids have been created yet."
                    : "No grids match your current filters."}
                </p>
                {grids.length === 0 && (
                  <Link href="/grids/create">
                    <Button className="bg-blue-600 hover:bg-blue-700">Create your first grid</Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrids.map((grid, index) => (
                  <motion.div
                    key={grid._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg border-2 hover:border-blue-300 bg-white">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">Timetable Grid</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            ID: {grid._id}
                          </span>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              {getYearSuffix(parseInt(grid.year))} Year
                            </h3>
                            <p className="text-sm text-gray-600">Academic Year & Semester</p>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-800">{grid.semester}</span>
                            </div>
                            <p className="text-xs text-blue-600">Year {grid.year} Curriculum</p>
                          </div>

                          <div className="text-xs text-gray-500 space-y-1">
                            <p>Created: {formatDate(grid.createdAt)}</p>
                            <p>Updated: {formatDate(grid.updatedAt)}</p>
                          </div>
                        </div>

                        <Link href={`/admin/viewGrids/${grid._id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10">
                            <Eye className="w-4 h-4 mr-2" />
                            View Grid Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
