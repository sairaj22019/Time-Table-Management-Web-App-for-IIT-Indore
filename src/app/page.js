// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useRef } from 'react'
// import Autoplay from 'embla-carousel-autoplay'

// import { Button } from '@/components/ui/button'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel'
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
// } from '@/components/ui/card'

// export default function LandingPage() {
//   const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

//   const dashboards = [
//     {
//       title: 'Admin Dashboard',
//       img: '/images/admin.png',
//       desc: 'Manage courses, assign rooms, resolve conflicts, and approve change requests.',
//     },
//     {
//       title: 'Student Dashboard',
//       img: '/images/student.png',
//       desc: 'View personalized schedules, receive live updates, and vote on polls.',
//     },
//     {
//       title: 'Professor Dashboard',
//       img: '/images/professor.png',
//       desc: 'Propose schedule changes, conduct class polls, and manage academic events.',
//     },
//   ]

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 pb-20 overflow-y-auto">
//       {/* 🔹 Navbar */}
//       <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[90vw] bg-white border shadow-lg rounded-full px-6 py-3 backdrop-blur-md">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-lg font-bold text-indigo-700">
//             CampusSync
//           </Link>
//           <div className="flex gap-3">
//             <Link href="/login">
//               <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 text-sm rounded-full shadow">
//                 Log In
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 px-6 py-2 text-sm rounded-full">
//                 Sign Up
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-28 sm:pt-36" />

//       {/* 🔹 Hero Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4 mb-24">
//         <div>
//           <h1 className="text-5xl font-extrabold text-indigo-900 leading-tight mb-6">
//             CampusSync:<br /> Smart Scheduling for Smarter Campuses
//           </h1>
//           <p className="text-lg text-gray-700 mb-8">
//             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
//           </p>
//         </div>

//         <div className="flex justify-center animate-fade-in">
//           <Image
//             src="/Bg_abinandhan.jpg"
//             alt="Campus dashboard"
//             width={450}
//             height={450}
//             className="rounded-2xl shadow-xl w-full max-w-md border"
//           />
//         </div>
//       </section>

//       {/* 🔹 Dashboards Carousel Section */}
//       <section className="w-full px-4 mb-24 text-center">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8">Role-Based Dashboards</h2>

//         <div className="relative max-w-6xl mx-auto">
//           <Carousel plugins={[plugin.current]} className="w-full">
//             <CarouselContent>
//               {dashboards.map((dashboard, index) => (
//                 <CarouselItem key={index} className="p-4">
//                   <Card className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
//                     <Image
//                       src={dashboard.img}
//                       alt={dashboard.title}
//                       fill
//                       className="object-cover w-full h-full"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start text-left text-white p-6">
//                       <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
//                         {dashboard.title}
//                       </CardTitle>
//                       <p className="text-sm sm:text-base max-w-lg">
//                         {dashboard.desc}
//                       </p>
//                     </div>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20" />
//             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20" />
//           </Carousel>
//         </div>
//       </section>

//       {/* 🔹 Core Features */}
//       <section id="core-features" className="w-full max-w-5xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-10">Core Features</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             'Real-time timetable updates and conflict detection',
//             'Custom dashboards for students, professors, and admins',
//             'Polls for rescheduling and feedback',
//             'Email notifications with Resend',
//             'Responsive mobile-first design',
//             'Calendar view + offline accessibility',
//           ].map((feature, idx) => (
//             <div
//               key={idx}
//               className="bg-white border border-indigo-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-200 text-left"
//             >
//               <p className="text-gray-700 text-base leading-relaxed font-medium">
//                 {feature}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   )
// }



// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useRef } from 'react'
// import Autoplay from 'embla-carousel-autoplay'
// import { motion } from 'framer-motion'

// import { Button } from '@/components/ui/button'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel'
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
// } from '@/components/ui/card'

// export default function LandingPage() {
//   const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

//   const dashboards = [
//     {
//       title: 'Admin Dashboard',
//       img: '/images/admin.png',
//       desc: 'Manage courses, assign rooms, resolve conflicts, and approve change requests.',
//     },
//     {
//       title: 'Student Dashboard',
//       img: '/images/student.png',
//       desc: 'View personalized schedules, receive live updates, and vote on polls.',
//     },
//     {
//       title: 'Professor Dashboard',
//       img: '/images/professor.png',
//       desc: 'Propose schedule changes, conduct class polls, and manage academic events.',
//     },
//   ]

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 pb-20 overflow-y-auto">
//       {/* 🔹 Navbar */}
//       <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[90vw] bg-white border shadow-lg rounded-full px-6 py-3 backdrop-blur-md">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-lg font-bold text-indigo-700">
//             CampusSync
//           </Link>
//           <div className="flex gap-3">
//             <Link href="/login">
//               <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 text-sm rounded-full shadow">
//                 Log In
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 px-6 py-2 text-sm rounded-full">
//                 Sign Up
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </motion.nav>

//       <div className="pt-28 sm:pt-36" />

//       {/* 🔹 Hero Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4 mb-24">
//         <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
//           <h1 className="text-5xl font-extrabold text-indigo-900 leading-tight mb-6">
//             CampusSync:<br /> Smart Scheduling for Smarter Campuses
//           </h1>
//           <p className="text-lg text-gray-700 mb-8">
//             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
//           </p>
//         </motion.div>

//         <motion.div className="flex justify-center" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
//           <Image
//             src="/Bg_abinandhan.jpg"
//             alt="Campus dashboard"
//             width={450}
//             height={450}
//             className="rounded-2xl shadow-xl w-full max-w-md border"
//           />
//         </motion.div>
//       </section>

//       {/* 🔹 Dashboards Carousel Section */}
//       <section className="w-full px-4 mb-24 text-center">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8">Role-Based Dashboards</h2>

//         <div className="relative max-w-6xl mx-auto">
//           <Carousel plugins={[plugin.current]} className="w-full">
//             <CarouselContent>
//               {dashboards.map((dashboard, index) => (
//                 <CarouselItem key={index} className="p-4">
//                   <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
//                     <Card className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
//                       <Image
//                         src={dashboard.img}
//                         alt={dashboard.title}
//                         fill
//                         className="object-cover w-full h-full"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start text-left text-white p-6">
//                         <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
//                           {dashboard.title}
//                         </CardTitle>
//                         <p className="text-sm sm:text-base max-w-lg">
//                           {dashboard.desc}
//                         </p>
//                       </div>
//                     </Card>
//                   </motion.div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20" />
//             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20" />
//           </Carousel>
//         </div>
//       </section>

//       {/* 🔹 Core Features */}
//       <section id="core-features" className="w-full max-w-5xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-10">Core Features</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {["Real-time timetable updates and conflict detection", "Custom dashboards for students, professors, and admins", "Polls for rescheduling and feedback", "Email notifications with Resend", "Responsive mobile-first design", "Calendar view + offline accessibility"].map((feature, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-white border border-indigo-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-200 text-left"
//             >
//               <p className="text-gray-700 text-base leading-relaxed font-medium">
//                 {feature}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* 🔹 New Section: Testimonials */}
//       <section className="max-w-6xl mx-auto mb-24 px-4 text-center">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8">What Users Say</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {["CampusSync saved me hours every week!", "Professors finally get an easy way to manage schedules.", "No more clashes! The app handles everything."].map((quote, index) => (
//             <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow">
//               <p className="text-gray-700 font-medium">"{quote}"</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* 🔹 New Section: Call to Action */}
//       <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center px-4">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-6">Ready to Simplify Scheduling?</h2>
//         <p className="text-gray-700 mb-6">Join the IIT Indore community using CampusSync today and make academic scheduling effortless.</p>
//         <Link href="/signup">
//           <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-full text-lg shadow">
//             Get Started
//           </Button>
//         </Link>
//       </motion.section>
//     </main>
//   )
// }

// sairaj

  // 'use client'

  // import Image from 'next/image'
  // import Link from 'next/link'
  // import { useRef } from 'react'
  // import Autoplay from 'embla-carousel-autoplay'
  // import { motion } from 'framer-motion'

  // import { Button } from '@/components/ui/button'
  // import {
  //   Carousel,
  //   CarouselContent,
  //   CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
  // } from '@/components/ui/carousel'
  // import {
  //   Card,
  //   CardHeader,
  //   CardContent,
  //   CardTitle,
  // } from '@/components/ui/card'

  // export default function LandingPage() {
  //   const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  //   const dashboards = [
  //     {
  //       title: 'Admin Dashboard',
  //       img: '/images/admin.png',
  //       desc: 'Manage courses, assign rooms, resolve conflicts, and approve change requests.',
  //     },
  //     {
  //       title: 'Student Dashboard',
  //       img: '/images/student.png',
  //       desc: 'View personalized schedules, receive live updates, and vote on polls.',
  //     },
  //     {
  //       title: 'Professor Dashboard',
  //       img: '/images/professor.png',
  //       desc: 'Propose schedule changes, conduct class polls, and manage academic events.',
  //     },
  //   ]

  //   return (
  //     <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 pb-20 overflow-y-auto">
  //       {/* 🔹 Navbar */}
  //       <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-2 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-[1000px] bg-white border shadow-md rounded-full px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-md">
  //         <div className="flex justify-between items-center">
  //           <Link href="/" className="text-base sm:text-lg font-bold text-indigo-700">
  //             CampusSync
  //           </Link>
  //           <div className="flex gap-2 sm:gap-3">
  //             <Link href="/login">
  //               <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full shadow">
  //                 Log In
  //               </Button>
  //             </Link>
  //             <Link href="/signup">
  //               <Button variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full">
  //                 Sign Up
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>
  //       </motion.nav>

  //       <div className="pt-24 sm:pt-36" />

  //       {/* 🔹 Hero Section */}
  //       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-12 px-2 sm:px-4 mb-20 sm:mb-24">
  //         <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
  //           <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-900 leading-tight mb-4 sm:mb-6">
  //             CampusSync:<br /> Smart Scheduling for Smarter Campuses
  //           </h1>
  //           <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
  //             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
  //           </p>
  //         </motion.div>

  //         <motion.div className="flex justify-center" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
  //           <Image
  //             src="/Bg_abinandhan.jpg"
  //             alt="Campus dashboard"
  //             width={450}
  //             height={450}
  //             className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md border"
  //           />
  //         </motion.div>
  //       </section>

  //       {/* Other sections remain unchanged */}
  //       {/* 🔹 Dashboards Carousel Section */}
  //       <section className="w-full px-4 mb-24 text-center">
  //         <h2 className="text-3xl font-bold text-indigo-800 mb-8">Role-Based Dashboards</h2>

  //         <div className="relative max-w-6xl mx-auto">
  //           <Carousel plugins={[plugin.current]} className="w-full">
  //             <CarouselContent>
  //               {dashboards.map((dashboard, index) => (
  //                 <CarouselItem key={index} className="p-4">
  //                   <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
  //                     <Card className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
  //                       <Image
  //                         src={dashboard.img}
  //                         alt={dashboard.title}
  //                         fill
  //                         className="object-cover w-full h-full"
  //                       />
  //                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start text-left text-white p-6">
  //                         <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
  //                           {dashboard.title}
  //                         </CardTitle>
  //                         <p className="text-sm sm:text-base max-w-lg">
  //                           {dashboard.desc}
  //                         </p>
  //                       </div>
  //                     </Card>
  //                   </motion.div>
  //                 </CarouselItem>
  //               ))}
  //             </CarouselContent>
  //             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20" />
  //             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20" />
  //           </Carousel>
  //         </div>
  //       </section>

  //       {/* 🔹 Core Features */}
  //       <section id="core-features" className="w-full max-w-5xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8">
  //         <h2 className="text-3xl font-bold text-indigo-800 mb-10">Core Features</h2>

  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {["Real-time timetable updates and conflict detection", "Custom dashboards for students, professors, and admins", "Polls for rescheduling and feedback", "Email notifications with Resend", "Responsive mobile-first design", "Calendar view + offline accessibility"].map((feature, idx) => (
  //             <motion.div
  //               key={idx}
  //               initial={{ opacity: 0, y: 30 }}
  //               whileInView={{ opacity: 1, y: 0 }}
  //               transition={{ duration: 0.6, delay: idx * 0.1 }}
  //               viewport={{ once: true }}
  //               className="bg-white border border-indigo-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-200 text-left"
  //             >
  //               <p className="text-gray-700 text-base leading-relaxed font-medium">
  //                 {feature}
  //               </p>
  //             </motion.div>
  //           ))}
  //         </div>
  //       </section>

  //       {/* 🔹 New Section: Testimonials */}
  //       <section className="max-w-6xl mx-auto mb-24 px-4 text-center">
  //         <h2 className="text-3xl font-bold text-indigo-800 mb-8">What Users Say</h2>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  //           {["CampusSync saved me hours every week!", "Professors finally get an easy way to manage schedules.", "No more clashes! The app handles everything."].map((quote, index) => (
  //             <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow">
  //               <p className="text-gray-700 font-medium">"{quote}"</p>
  //             </motion.div>
  //           ))}
  //         </div>
  //       </section>

  //       {/* 🔹 New Section: Call to Action */}
  //       <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center px-4">
  //         <h2 className="text-3xl font-bold text-indigo-800 mb-6">Ready to Simplify Scheduling?</h2>
  //         <p className="text-gray-700 mb-6">Join the IIT Indore community using CampusSync today and make academic scheduling effortless.</p>
  //         <Link href="/signup">
  //           <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-full text-lg shadow">
  //             Get Started
  //           </Button>
  //         </Link>
  //       </motion.section>
  //     </main>
  //   )
  // }


//k1 

// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { useRef, useEffect, useState } from "react"
// import Autoplay from "embla-carousel-autoplay"
// import { motion, useScroll, useTransform } from "framer-motion"
// import {
//   Calendar,
//   Users,
//   Bell,
//   Shield,
//   Zap,
//   Clock,
//   CheckCircle,
//   Star,
//   ArrowRight,
//   Play,
//   ChevronDown,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Card, CardTitle } from "@/components/ui/card"

// export default function EnhancedLandingPage() {
//   const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
//   const { scrollYProgress } = useScroll()
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   const dashboards = [
//     {
//       title: "Admin Dashboard",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "Manage courses, assign rooms, resolve conflicts, and approve change requests with powerful analytics.",
//       features: ["Course Management", "Room Assignment", "Conflict Resolution", "Analytics Dashboard"],
//     },
//     {
//       title: "Student Dashboard",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "View personalized schedules, receive live updates, and participate in interactive polls.",
//       features: ["Personal Schedule", "Live Updates", "Interactive Polls", "Mobile Sync"],
//     },
//     {
//       title: "Professor Dashboard",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "Propose schedule changes, conduct class polls, and manage academic events seamlessly.",
//       features: ["Schedule Proposals", "Class Polls", "Event Management", "Student Analytics"],
//     },
//   ]

//   const stats = [
//     { number: "2000+", label: "Active Users", icon: Users },
//     { number: "50+", label: "Departments", icon: Calendar },
//     { number: "99.9%", label: "Uptime", icon: Shield },
//     { number: "24/7", label: "Support", icon: Clock },
//   ]

//   const features = [
//     {
//       icon: Zap,
//       title: "Real-time Updates",
//       description: "Instant notifications for schedule changes and conflicts",
//     },
//     {
//       icon: Users,
//       title: "Role-based Access",
//       description: "Customized dashboards for students, professors, and admins",
//     },
//     {
//       icon: Bell,
//       title: "Smart Notifications",
//       description: "Email alerts and push notifications for important updates",
//     },
//     {
//       icon: Calendar,
//       title: "Calendar Integration",
//       description: "Sync with Google Calendar and other popular calendar apps",
//     },
//     {
//       icon: Shield,
//       title: "Secure & Reliable",
//       description: "Enterprise-grade security with 99.9% uptime guarantee",
//     },
//     {
//       icon: CheckCircle,
//       title: "Conflict Detection",
//       description: "Automatic detection and resolution of scheduling conflicts",
//     },
//   ]

//   const testimonials = [
//     {
//       quote:
//         "CampusSync revolutionized how we manage our academic schedules. The real-time updates are a game-changer!",
//       author: "Dr. Sarah Johnson",
//       role: "Professor, Computer Science",
//       rating: 5,
//     },
//     {
//       quote: "As a student, I love how easy it is to stay updated with my classes. No more missed lectures!",
//       author: "Rahul Sharma",
//       role: "B.Tech Student",
//       rating: 5,
//     },
//     {
//       quote: "The admin dashboard gives us complete control over scheduling. Conflicts are resolved automatically!",
//       author: "Prof. Michael Chen",
//       role: "Academic Coordinator",
//       rating: 5,
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
//           style={{
//             left: mousePosition.x - 192,
//             top: mousePosition.y - 192,
//             transition: "all 0.3s ease-out",
//           }}
//         />
//         <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
//         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-bounce" />
//       </div>

//       {/* Enhanced Navbar */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-6xl"
//       >
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
//           <div className="flex justify-between items-center">
//             <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
//                 <Calendar className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                 CampusSync
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8 text-white/80">
//               <Link href="#features" className="hover:text-white transition-colors">
//                 Features
//               </Link>
//               <Link href="#testimonials" className="hover:text-white transition-colors">
//                 Reviews
//               </Link>
//               <Link href="#pricing" className="hover:text-white transition-colors">
//                 Pricing
//               </Link>
//             </div>

//             <div className="flex gap-3">
//               <Link href="/login">
//                 <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl">
//                   Log In
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       <div className="pt-32" />

//       {/* Enhanced Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="text-center lg:text-left"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6 border border-purple-500/30"
//             >
//               <Zap className="w-4 h-4 mr-2" />
//               Trusted by 2000+ Students & Faculty
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
//             >
//               <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
//                 Smart Scheduling
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                 Made Simple
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//               className="text-xl text-gray-300 mb-8 max-w-2xl"
//             >
//               Transform your academic scheduling experience with AI-powered conflict detection, real-time updates, and
//               seamless collaboration across your entire campus.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.8 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//             >
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
//               >
//                 Start Free Trial
//                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg group"
//               >
//                 <Play className="mr-2 w-5 h-5" />
//                 Watch Demo
//               </Button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
//             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//             transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
//             className="relative"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl transform rotate-6" />
//               <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//                 <Image
//                   src="/placeholder.svg?height=500&width=600"
//                   alt="CampusSync Dashboard Preview"
//                   width={600}
//                   height={500}
//                   className="rounded-2xl shadow-2xl"
//                 />
//                 <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
//                   Live Updates
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
//         >
//           <ChevronDown className="w-8 h-8" />
//         </motion.div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="text-center group"
//               >
//                 <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105">
//                   <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
//                   <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
//                   <div className="text-gray-400">{stat.label}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Dashboards Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
//           >
//             Powerful Dashboards for Every Role
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-xl text-gray-400 max-w-3xl mx-auto"
//           >
//             Experience tailored interfaces designed specifically for students, professors, and administrators
//           </motion.p>
//         </div>

//         <div className="relative max-w-6xl mx-auto">
//           <Carousel plugins={[plugin.current]} className="w-full">
//             <CarouselContent>
//               {dashboards.map((dashboard, index) => (
//                 <CarouselItem key={index} className="p-4">
//                   <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                     className="group"
//                   >
//                     <Card className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-purple-500/50 transition-all duration-500 group-hover:scale-[1.02]">
//                       <div className="relative h-96 lg:h-[500px]">
//                         <Image
//                           src={dashboard.img || "/placeholder.svg"}
//                           alt={dashboard.title}
//                           fill
//                           className="object-cover rounded-3xl"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                         <div className="absolute bottom-0 left-0 right-0 p-8">
//                           <CardTitle className="text-3xl font-bold text-white mb-4">{dashboard.title}</CardTitle>
//                           <p className="text-gray-200 text-lg mb-6 max-w-2xl">{dashboard.desc}</p>

//                           <div className="grid grid-cols-2 gap-3">
//                             {dashboard.features.map((feature, idx) => (
//                               <div key={idx} className="flex items-center text-sm text-gray-300">
//                                 <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                                 {feature}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   </motion.div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-4 bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20" />
//             <CarouselNext className="right-4 bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20" />
//           </Carousel>
//         </div>
//       </section>

//       {/* Enhanced Features Section */}
//       <section id="features" className="py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Everything You Need
//             </h2>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               Comprehensive features designed to streamline your academic scheduling experience
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105 h-full">
//                   <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                     <feature.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
//                   <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Testimonials */}
//       <section id="testimonials" className="py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Loved by Thousands
//             </h2>
//             <p className="text-xl text-gray-400">See what our users have to say about CampusSync</p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105 h-full">
//                   <div className="flex mb-4">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                     ))}
//                   </div>
//                   <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
//                   <div>
//                     <div className="font-semibold text-white">{testimonial.author}</div>
//                     <div className="text-gray-400 text-sm">{testimonial.role}</div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-20 px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse" />
//             <div className="relative z-10">
//               <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Ready to Transform Your Campus?
//               </h2>
//               <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Join thousands of students and faculty who have already revolutionized their scheduling experience
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button
//                   size="lg"
//                   className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
//                 >
//                   Start Your Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg"
//                 >
//                   Schedule a Demo
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-4 border-t border-white/10">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
//               <Calendar className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//               CampusSync
//             </span>
//           </div>
//           <p className="text-gray-400 mb-4">Empowering academic institutions with smart scheduling solutions</p>
//           <div className="flex justify-center space-x-6 text-gray-400">
//             <Link href="/privacy" className="hover:text-white transition-colors">
//               Privacy
//             </Link>
//             <Link href="/terms" className="hover:text-white transition-colors">
//               Terms
//             </Link>
//             <Link href="/support" className="hover:text-white transition-colors">
//               Support
//             </Link>
//             <Link href="/contact" className="hover:text-white transition-colors">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


// k2

"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Calendar,
  Users,
  Bell,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardTitle } from "@/components/ui/card"

export default function EnhancedLandingPage() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const dashboards = [
    {
      title: "Admin Dashboard",
      img: "/placeholder.svg?height=600&width=800",
      desc: "Manage courses, assign rooms, resolve conflicts, and approve change requests with powerful analytics.",
      features: ["Course Management", "Room Assignment", "Conflict Resolution", "Analytics Dashboard"],
    },
    {
      title: "Student Dashboard",
      img: "/placeholder.svg?height=600&width=800",
      desc: "View personalized schedules, receive live updates, and participate in interactive polls.",
      features: ["Personal Schedule", "Live Updates", "Interactive Polls", "Mobile Sync"],
    },
    {
      title: "Professor Dashboard",
      img: "/placeholder.svg?height=600&width=800",
      desc: "Propose schedule changes, conduct class polls, and manage academic events seamlessly.",
      features: ["Schedule Proposals", "Class Polls", "Event Management", "Student Analytics"],
    },
  ]

  const stats = [
    { number: "2000+", label: "Active Users", icon: Users },
    { number: "50+", label: "Departments", icon: Calendar },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Clock },
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant notifications for schedule changes and conflicts",
    },
    {
      icon: Users,
      title: "Role-based Access",
      description: "Customized dashboards for students, professors, and admins",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Email alerts and push notifications for important updates",
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Sync with Google Calendar and other popular calendar apps",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: CheckCircle,
      title: "Conflict Detection",
      description: "Automatic detection and resolution of scheduling conflicts",
    },
  ]

  const testimonials = [
    {
      quote:
        "CampusSync revolutionized how we manage our academic schedules. The real-time updates are a game-changer!",
      author: "Dr. Sarah Johnson",
      role: "Professor, Computer Science",
      rating: 5,
    },
    {
      quote: "As a student, I love how easy it is to stay updated with my classes. No more missed lectures!",
      author: "Rahul Sharma",
      role: "B.Tech Student",
      rating: 5,
    },
    {
      quote: "The admin dashboard gives us complete control over scheduling. Conflicts are resolved automatically!",
      author: "Prof. Michael Chen",
      role: "Academic Coordinator",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Enhanced Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-6xl"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                CampusSync
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 text-gray-600">
              <Link href="#features" className="hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="hover:text-blue-600 transition-colors">
                Reviews
              </Link>
              <Link href="#pricing" className="hover:text-blue-600 transition-colors">
                Pricing
              </Link>
            </div>

            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-100 rounded-xl">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="pt-12" />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm mb-6 border border-blue-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Trusted by 2000+ Students & Faculty
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Smart Scheduling
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Transform your academic scheduling experience with AI-powered conflict detection, real-time updates, and
              seamless collaboration across your entire campus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg group"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-sky-200/30 rounded-3xl blur-3xl transform rotate-6" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="CampusSync Dashboard Preview"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  Live Updates
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Dashboards Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Powerful Dashboards for Every Role
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience tailored interfaces designed specifically for students, professors, and administrators
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {dashboards.map((dashboard, index) => (
                <CarouselItem key={index} className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-blue-300 transition-all duration-500 group-hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                      <div className="relative h-96 lg:h-[500px]">
                        <Image
                          src={dashboard.img || "/placeholder.svg"}
                          alt={dashboard.title}
                          fill
                          className="object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <CardTitle className="text-3xl font-bold text-white mb-4">{dashboard.title}</CardTitle>
                          <p className="text-gray-200 text-lg mb-6 max-w-2xl">{dashboard.desc}</p>

                          <div className="grid grid-cols-2 gap-3">
                            {dashboard.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-xl border-gray-200 text-gray-700 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 backdrop-blur-xl border-gray-200 text-gray-700 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed to streamline your academic scheduling experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:scale-105 h-full shadow-lg hover:shadow-xl">
                  <div className="bg-gradient-to-r from-blue-500 to-sky-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600">See what our users have to say about CampusSync</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:scale-105 h-full shadow-lg hover:shadow-xl">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 backdrop-blur-xl rounded-3xl p-12 border border-blue-200 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Ready to Transform Your Campus?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students and faculty who have already revolutionized their scheduling experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              CampusSync
            </span>
          </div>
          <p className="text-gray-600 mb-4">Empowering academic institutions with smart scheduling solutions</p>
          <div className="flex justify-center space-x-6 text-gray-500">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </Link>
            <Link href="/support" className="hover:text-blue-600 transition-colors">
              Support
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { useRef, useEffect, useState } from "react"
// import Autoplay from "embla-carousel-autoplay"
// import { motion, useScroll, useInView } from "framer-motion"
// import {
//   Calendar,
//   Bell,
//   Zap,
//   CheckCircle,
//   ArrowRight,
//   Play,
//   ChevronDown,
//   BookOpen,
//   UserCheck,
//   BarChart3,
//   MessageSquare,
//   Wifi,
//   RefreshCw,
//   Vote,
//   FileSpreadsheet,
//   AlertTriangle,
//   Smartphone,
//   Monitor,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Card, CardTitle } from "@/components/ui/card"

// export default function EnhancedLandingPage() {
//   const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
//   const { scrollYProgress } = useScroll()
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const heroRef = useRef(null)
//   const isHeroInView = useInView(heroRef, { once: true })

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   const dashboards = [
//     {
//       title: "Admin Dashboard",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "Complete control over course management, timetable creation, and scheduling coordination.",
//       features: [
//         "Create & manage courses with details",
//         "Design comprehensive timetables",
//         "Handle professor timing requests",
//         "Monitor all schedules centrally",
//       ],
//       color: "from-blue-500 to-indigo-600",
//     },
//     {
//       title: "Student Interface",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "Personalized timetables with real-time updates and interactive features for better academic planning.",
//       features: [
//         "Personalized course schedules",
//         "Real-time notifications",
//         "Vote on professor polls",
//         "Mobile-friendly access",
//       ],
//       color: "from-blue-600 to-sky-600",
//     },
//     {
//       title: "Professor Interface",
//       img: "/placeholder.svg?height=600&width=800",
//       desc: "Streamlined tools for schedule management, timing requests, and student engagement.",
//       features: ["View assigned schedules", "Request timing changes", "Create student polls", "Track approval status"],
//       color: "from-indigo-600 to-blue-700",
//     },
//   ]

//   const problemSolutions = [
//     {
//       problem: "Cluttered Excel Sheets",
//       solution: "Clean Digital Interface",
//       icon: FileSpreadsheet,
//       description: "Replace confusing spreadsheets with intuitive web interface",
//     },
//     {
//       problem: "Manual Updates",
//       solution: "Real-time Sync",
//       icon: RefreshCw,
//       description: "Instant updates across all user interfaces automatically",
//     },
//     {
//       problem: "Class Time Negotiations",
//       solution: "Digital Polls & Requests",
//       icon: Vote,
//       description: "Streamlined voting system for timing changes",
//     },
//     {
//       problem: "Scheduling Conflicts",
//       solution: "Smart Conflict Detection",
//       icon: AlertTriangle,
//       description: "Automatic detection and prevention of scheduling overlaps",
//     },
//   ]

//   const coreFeatures = [
//     {
//       icon: BookOpen,
//       title: "Course Management",
//       description:
//         "Create, edit, and organize courses with detailed information including credits, professors, and schedules",
//       category: "Admin",
//     },
//     {
//       icon: Calendar,
//       title: "Timetable Designer",
//       description: "Intuitive drag-and-drop interface for creating and managing complex academic schedules",
//       category: "Admin",
//     },
//     {
//       icon: Bell,
//       title: "Smart Notifications",
//       description: "Real-time alerts for schedule changes, new courses, and class reminders via browser and email",
//       category: "All Users",
//     },
//     {
//       icon: Vote,
//       title: "Interactive Polls",
//       description: "Professors can create polls for timing preferences, students vote, admins see results",
//       category: "Professor/Student",
//     },
//     {
//       icon: UserCheck,
//       title: "Request Management",
//       description: "Streamlined system for professors to request timing changes with admin approval workflow",
//       category: "Professor/Admin",
//     },
//     {
//       icon: Zap,
//       title: "Real-time Updates",
//       description: "Instant synchronization of all changes across student and professor interfaces",
//       category: "All Users",
//     },
//   ]

//   const optionalFeatures = [
//     {
//       icon: Calendar,
//       title: "Calendar Integration",
//       description: "Sync with Google Calendar and other popular calendar applications",
//     },
//     {
//       icon: BarChart3,
//       title: "Analytics Dashboard",
//       description: "Track enrollment, schedule changes, and usage patterns",
//     },
//     {
//       icon: MessageSquare,
//       title: "Communication Hub",
//       description: "Built-in messaging for discussing timing changes and coordination",
//     },
//     {
//       icon: Wifi,
//       title: "Offline Access",
//       description: "View cached timetables even without internet connection",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-x-hidden">
//       {/* Simplified Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute w-96 h-96 bg-blue-400/8 rounded-full blur-3xl transition-all duration-700 ease-out"
//           style={{
//             left: mousePosition.x - 192,
//             top: mousePosition.y - 192,
//           }}
//         />
//         <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-400/6 rounded-full blur-2xl" />
//         <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-400/6 rounded-full blur-3xl" />
//       </div>

//       {/* Simplified Navbar */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-6xl"
//       >
//         <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-6 py-4 shadow-lg">
//           <div className="flex justify-between items-center">
//             <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                   CampusSync
//                 </span>
//                 <div className="text-xs text-gray-500">IIT Indore</div>
//               </div>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8 text-gray-600">
//               {["Features", "Dashboards", "Solutions"].map((item, index) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="hover:text-blue-600 transition-colors relative"
//                   whileHover={{ y: -1 }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index + 0.5 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </div>

//             <motion.div
//               className="flex gap-3"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <Link href="/login">
//                 <Button
//                   variant="ghost"
//                   className="text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
//                 >
//                   Log In
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                   <Button className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
//                     Get Started
//                   </Button>
//                 </motion.div>
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </motion.nav>

//       <div className="pt-32" />

//       {/* Perfect Fit Hero Section */}
//       <section ref={heroRef} className="relative h-screen flex items-center justify-center px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="text-center lg:text-left"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-full text-blue-700 text-sm mb-8 border border-blue-200/50 shadow-sm"
//             >
//               <Zap className="w-4 h-4 mr-2" />
//               Replacing Excel-based Chaos with Digital Clarity
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
//             >
//               <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Smart Timetable
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                 Management
//               </span>
//               <br />
//               <motion.span
//                 className="text-2xl lg:text-3xl text-gray-600 font-medium"
//                 initial={{ opacity: 0 }}
//                 animate={isHeroInView ? { opacity: 1 } : {}}
//                 transition={{ delay: 1, duration: 0.6 }}
//               >
//                 for IIT Indore
//               </motion.span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.6, duration: 0.6 }}
//               className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
//             >
//               Transform your academic scheduling from cluttered Excel sheets to a streamlined, real-time platform that
//               connects administrators, students, and professors seamlessly.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//             >
//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                   size="lg"
//                   className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
//                 >
//                   Start Managing Schedules
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg group"
//                 >
//                   <Play className="mr-2 w-5 h-5" />
//                   See How It Works
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
//             className="relative"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-sky-200/20 rounded-3xl blur-2xl" />
//               <motion.div
//                 className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl"
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Image
//                   src="/placeholder.svg?height=500&width=600"
//                   alt="CampusSync Timetable Interface"
//                   width={600}
//                   height={500}
//                   className="rounded-2xl shadow-lg"
//                 />
//                 <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                   Real-time Updates
//                 </div>
//                 <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                   No More Excel!
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
//         >
//           <ChevronDown className="w-8 h-8" />
//         </motion.div>
//       </section>

//       {/* Improved Problem-Solution Section with Blue Theme */}
//       <section id="solutions" className="py-24 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               From Chaos to Clarity
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               See how CampusSync transforms common scheduling problems into streamlined solutions
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {problemSolutions.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <motion.div
//                   className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl"
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="text-center">
//                     <div className="bg-gradient-to-r from-gray-500 to-gray-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
//                       <item.icon className="w-8 h-8 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-700 mb-2">{item.problem}</h3>
//                     <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-blue-500 mx-auto mb-4" />
//                     <h4 className="text-lg font-bold text-blue-600 mb-3">{item.solution}</h4>
//                     <p className="text-gray-600 text-sm">{item.description}</p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Dashboards Section */}
//       <section id="dashboards" className="py-24 px-4">
//         <div className="max-w-7xl mx-auto text-center mb-20">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
//           >
//             Three Powerful Interfaces
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-xl text-gray-600 max-w-3xl mx-auto"
//           >
//             Tailored experiences for administrators, students, and professors with role-specific features
//           </motion.p>
//         </div>

//         <div className="relative max-w-6xl mx-auto">
//           <Carousel plugins={[plugin.current]} className="w-full">
//             <CarouselContent>
//               {dashboards.map((dashboard, index) => (
//                 <CarouselItem key={index} className="p-4">
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                     className="group"
//                   >
//                     <Card className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 group-hover:scale-[1.01] shadow-xl hover:shadow-2xl">
//                       <div className="relative h-96 lg:h-[500px]">
//                         <Image
//                           src={dashboard.img || "/placeholder.svg"}
//                           alt={dashboard.title}
//                           fill
//                           className="object-cover rounded-3xl"
//                         />
//                         <div className={`absolute inset-0 bg-gradient-to-t ${dashboard.color} opacity-80`} />

//                         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                           <CardTitle className="text-3xl font-bold mb-4">{dashboard.title}</CardTitle>
//                           <p className="text-gray-100 text-lg mb-6 max-w-2xl">{dashboard.desc}</p>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             {dashboard.features.map((feature, idx) => (
//                               <div key={idx} className="flex items-center text-sm">
//                                 <CheckCircle className="w-4 h-4 text-green-300 mr-2 flex-shrink-0" />
//                                 <span>{feature}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   </motion.div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-4 bg-white/90 backdrop-blur-xl border-gray-200/50 text-gray-700 hover:bg-white shadow-lg" />
//             <CarouselNext className="right-4 bg-white/90 backdrop-blur-xl border-gray-200/50 text-gray-700 hover:bg-white shadow-lg" />
//           </Carousel>
//         </div>
//       </section>

//       {/* Simplified Core Features Section */}
//       <section id="features" className="py-24 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Core Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Essential tools designed to streamline every aspect of academic scheduling
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {coreFeatures.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <motion.div
//                   className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl"
//                   whileHover={{ y: -3 }}
//                 >
//                   <div className="bg-gradient-to-r from-blue-500 to-sky-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
//                     <feature.icon className="w-7 h-7 text-white" />
//                   </div>
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
//                     <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{feature.category}</span>
//                   </div>
//                   <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Optional Features Section */}
//       <section className="py-24 px-4 bg-gradient-to-r from-blue-50/50 to-sky-50/50">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Advanced Capabilities
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Additional features to enhance your scheduling experience even further
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {optionalFeatures.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="group"
//               >
//                 <motion.div
//                   className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl text-center"
//                   whileHover={{ y: -3 }}
//                 >
//                   <div className="bg-gradient-to-r from-indigo-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
//                     <feature.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Responsive Design Showcase */}
//       <section className="py-24 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Access Anywhere, Anytime
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Fully responsive design ensures perfect functionality on all devices
//             </p>
//           </motion.div>

//           <div className="flex justify-center items-end space-x-8">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-center"
//             >
//               <div className="bg-gradient-to-r from-blue-500 to-sky-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto">
//                 <Monitor className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Desktop</h3>
//               <p className="text-gray-600 text-sm">Full-featured interface</p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-center"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto">
//                 <Smartphone className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Mobile</h3>
//               <p className="text-gray-600 text-sm">Touch-optimized experience</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-24 px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="max-w-5xl mx-auto text-center"
//         >
//           <div className="bg-gradient-to-r from-blue-50/80 to-sky-50/80 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-blue-200/50 relative overflow-hidden shadow-xl">
//             <div className="relative z-10">
//               <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Ready to Revolutionize
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                   IIT Indore's Scheduling?
//                 </span>
//               </h2>
//               <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
//                 Join the digital transformation and experience seamless timetable management that saves time, reduces
//                 conflicts, and enhances communication across campus.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-6 justify-center">
//                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                   <Button
//                     size="lg"
//                     className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl px-10 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
//                   >
//                     Start Your Digital Journey
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </motion.div>
//                 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-10 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//                   >
//                     Request Demo
//                   </Button>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="py-16 px-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center space-x-3 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                   CampusSync
//                 </span>
//                 <div className="text-sm text-gray-500">IIT Indore</div>
//               </div>
//             </div>
//             <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//               Transforming academic scheduling through intelligent automation and seamless collaboration
//             </p>
//             <div className="flex justify-center space-x-8 text-gray-500">
//               {["Privacy", "Terms", "Support", "Contact"].map((item, index) => (
//                 <motion.a
//                   key={item}
//                   href={`/${item.toLowerCase()}`}
//                   className="hover:text-blue-600 transition-colors"
//                   whileHover={{ y: -1 }}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.4 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </div>
//           </div>
//           <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200/50">
//             © 2024 CampusSync. Built for IIT Indore's digital future.
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
