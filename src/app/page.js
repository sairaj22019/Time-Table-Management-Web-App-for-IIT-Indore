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


'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card'

export default function LandingPage() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  const dashboards = [
    {
      title: 'Admin Dashboard',
      img: '/images/admin.png',
      desc: 'Manage courses, assign rooms, resolve conflicts, and approve change requests.',
    },
    {
      title: 'Student Dashboard',
      img: '/images/student.png',
      desc: 'View personalized schedules, receive live updates, and vote on polls.',
    },
    {
      title: 'Professor Dashboard',
      img: '/images/professor.png',
      desc: 'Propose schedule changes, conduct class polls, and manage academic events.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 pb-20 overflow-y-auto">
      {/* 🔹 Navbar */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-2 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-[1000px] bg-white border shadow-md rounded-full px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-base sm:text-lg font-bold text-indigo-700">
            CampusSync
          </Link>
          <div className="flex gap-2 sm:gap-3">
            <Link href="/login">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full shadow">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <div className="pt-24 sm:pt-36" />

      {/* 🔹 Hero Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-12 px-2 sm:px-4 mb-20 sm:mb-24">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-900 leading-tight mb-4 sm:mb-6">
            CampusSync:<br /> Smart Scheduling for Smarter Campuses
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
            Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
          </p>
        </motion.div>

        <motion.div className="flex justify-center" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Image
            src="/Bg_abinandhan.jpg"
            alt="Campus dashboard"
            width={450}
            height={450}
            className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md border"
          />
        </motion.div>
      </section>

      {/* Other sections remain unchanged */}
      {/* 🔹 Dashboards Carousel Section */}
      <section className="w-full px-4 mb-24 text-center">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8">Role-Based Dashboards</h2>

        <div className="relative max-w-6xl mx-auto">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {dashboards.map((dashboard, index) => (
                <CarouselItem key={index} className="p-4">
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <Card className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
                      <Image
                        src={dashboard.img}
                        alt={dashboard.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start text-left text-white p-6">
                        <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                          {dashboard.title}
                        </CardTitle>
                        <p className="text-sm sm:text-base max-w-lg">
                          {dashboard.desc}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </section>

      {/* 🔹 Core Features */}
      <section id="core-features" className="w-full max-w-5xl mx-auto text-center mb-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-indigo-800 mb-10">Core Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Real-time timetable updates and conflict detection", "Custom dashboards for students, professors, and admins", "Polls for rescheduling and feedback", "Email notifications with Resend", "Responsive mobile-first design", "Calendar view + offline accessibility"].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-indigo-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-200 text-left"
            >
              <p className="text-gray-700 text-base leading-relaxed font-medium">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 New Section: Testimonials */}
      <section className="max-w-6xl mx-auto mb-24 px-4 text-center">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8">What Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["CampusSync saved me hours every week!", "Professors finally get an easy way to manage schedules.", "No more clashes! The app handles everything."].map((quote, index) => (
            <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 font-medium">"{quote}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 New Section: Call to Action */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center px-4">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Ready to Simplify Scheduling?</h2>
        <p className="text-gray-700 mb-6">Join the IIT Indore community using CampusSync today and make academic scheduling effortless.</p>
        <Link href="/signup">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-full text-lg shadow">
            Get Started
          </Button>
        </Link>
      </motion.section>
    </main>
  )
}
