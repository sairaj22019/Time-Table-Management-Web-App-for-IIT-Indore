// 'use client'

// import Image from 'next/image'
// import { Button } from '@/components/ui/button'

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 mb-24">
//         {/* Text Side */}
//         <div>
//           <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             CampusSync:<br /> Smart Scheduling for Smarter Campuses
//           </h1>
//           <p className="text-lg text-gray-600 mb-6">
//             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Button size="lg" className="px-6 py-3 text-base">Log In</Button>
//             <Button size="lg" variant="outline" className="px-6 py-3 text-base">Sign Up</Button>
//           </div>
//         </div>

//         {/* Image Side */}
//         <div className="flex justify-center">
//           <Image
//             src="/images/hero-illustration.png" // 📷 Replace this with your own
//             alt="Campus dashboard"
//             width={400}
//             height={400}
//             className="rounded-xl shadow-lg w-full max-w-md"
//           />
//         </div>
//       </section>

// 'use client'

// import Image from 'next/image'
// import Link from 'next/link' // ✅ import Link
// import { Button } from '@/components/ui/button'

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 mb-24">
//         {/* Text Side */}
//         <div>
//           <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             CampusSync:<br /> Smart Scheduling for Smarter Campuses
//           </h1>
//           <p className="text-lg text-gray-600 mb-6">
//             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Link href="/login" passHref>
//               <Button size="lg" className="px-6 py-3 text-base">Log In</Button>
//             </Link>
//             <Link href="/signup" passHref>
//               <Button size="lg" variant="outline" className="px-6 py-3 text-base">Sign Up</Button>
//             </Link>
//           </div>
//         </div>

//         {/* Image Side */}
//         <div className="flex justify-center">
//           <Image
//             src="/images/hero-illustration.png"
//             alt="Campus dashboard"
//             width={400}
//             height={400}
//             className="rounded-xl shadow-lg w-full max-w-md"
//           />
//         </div>
//       </section>

      

//       {/* Dashboard Cards Section */}
//       <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
//         {[
//           {
//             title: 'Admin Dashboard',
//             img: '/images/admin.png',
//             desc: 'Manage courses, assign rooms, resolve conflicts, and approve change requests.',
//           },
//           {
//             title: 'Student Dashboard',
//             img: '/images/student.png',
//             desc: 'View personalized schedules, receive live updates, and vote on polls.',
//           },
//           {
//             title: 'Professor Dashboard',
//             img: '/images/professor.png',
//             desc: 'Propose schedule changes, conduct class polls, and manage academic events.',
//           },
//         ].map(({ title, img, desc }) => (
//           <div key={title} className="bg-white rounded-xl shadow-md p-6 text-center">
//             <Image
//               src={img}
//               alt={title}
//               width={300}
//               height={200}
//               className="mx-auto rounded-md mb-4"
//             />
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
//             <p className="text-sm text-gray-600">{desc}</p>
//           </div>
//         ))}
//       </section>

//       {/* Core Features Section */}
//       <section className="max-w-4xl mx-auto text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Core Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
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
//               className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             >
//               <p className="text-gray-700 text-sm">{feature}</p>
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
//     <main className="min-h-screen bg-gray-50 px-4 pb-10">
//    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[90vw] bg-white border shadow-md rounded-lg px-6 py-2">
//   <div className="flex justify-between items-center">
//     {/* Branding */}
//     <Link href="/" className="text-base font-semibold text-gray-700">
//       Campus Sync
//     </Link>

//     {/* Auth Buttons */}
//     <div className="flex gap-2">
//       <Link href="/login">
//         <Button className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 px-6 py-2 text-sm rounded-md">
//           Log In
//         </Button>
//       </Link>
//       <Link href="/signup">
//         <Button variant="outline" className="px-6 py-2 text-sm rounded-md">
//           Sign Up
//         </Button>
//       </Link>
//     </div>
//   </div>
// </nav>

//       {/* Push content below navbar */}
//       <div className="pt-24" />

//       {/* 🔹 Hero Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 mb-24">
//         <div>
//           <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             CampusSync:<br /> Smart Scheduling for Smarter Campuses
//           </h1>
//           <p className="text-lg text-gray-600 mb-6">
//             Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
//           </p>
//           {/**/}
//         </div>

//         <div className="flex justify-center">
//           <Image
//             src="/images/hero-illustration.png"
//             alt="Campus dashboard"
//             width={400}
//             height={400}
//             className="rounded-xl shadow-lg w-full max-w-md"
//           />
//         </div>
//       </section>

//       {/* 🔹 Dashboards Carousel Section */}
     
// <section className="w-full px-4 mb-20 text-center">
//   <h2 className="text-3xl font-bold text-gray-800 mb-6">Role-Based Dashboards</h2>

//   <div className="relative max-w-6xl mx-auto">
//     <Carousel plugins={[plugin.current]} className="w-full">
//       <CarouselContent>
//         {dashboards.map((dashboard, index) => (
//           <CarouselItem key={index} className="p-4">
//             <Card className="relative w-full h-[300px] sm:h-[360px] max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
//               {/* Image Background */}
//               <Image
//                 src={dashboard.img}
//                 alt={dashboard.title} // prevent fallback text like "Prof..."
//                 fill
//                 className="object-cover w-full h-full"
//               />

//               {/* Overlay text */}
//               <div className="absolute inset-0 bg-white flex flex-col justify-center items-center text-center text-black px-4">
//                 <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
//                   {dashboard.title}
//                 </CardTitle>
//                 <p className="text-sm sm:text-base max-w-md">
//                   {dashboard.desc}
//                 </p>
//               </div>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       {/* Prev / Next buttons */}
//       <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20" />
//       <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20" />
//     </Carousel>
//   </div>
// </section>



//       {/* 🔹 Core Features */}
//       <section className="max-w-4xl mx-auto text-center mb-10 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Core Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
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
//               className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             >
//               <p className="text-gray-700 text-sm">{feature}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   )
// }


'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

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
    <main className="min-h-screen bg-gray-50 px-4 pb-20 overflow-y-auto">
      {/* 🔹 Navbar */}
      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[90vw] bg-white border shadow-md rounded-lg px-6 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-base font-semibold text-gray-700">
            Campus Sync
          </Link>
          <div className="flex gap-2">
            <Link href="/login">
              <Button className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 px-6 py-2 text-sm rounded-md">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="px-6 py-2 text-sm rounded-md">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 sm:pt-32" /> {/* Push content below navbar */}

      {/* 🔹 Hero Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 mb-24">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            CampusSync:<br /> Smart Scheduling for Smarter Campuses
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Empowering students, professors, and admins at IIT Indore to manage their time better through an integrated, real-time timetable management system.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/Bg_abinandhan.jpg"
            alt="Campus dashboard"
            width={400}
            height={400}
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* 🔹 Dashboards Carousel Section */}
      <section className="w-full px-4 mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Role-Based Dashboards</h2>

        <div className="relative max-w-6xl mx-auto">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {dashboards.map((dashboard, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={"/Bg_abinandhan.jpg"}
                      alt={dashboard.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                    {/* <div className="absolute inset-0 bg-white/90 flex flex-col justify-center items-center text-center text-black px-4"> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 flex flex-col justify-center items-center text-center text-white px-4">
                      <CardTitle className="text-2xl sm:text-3xl font-bold mb-3">
                        {dashboard.title}
                      </CardTitle>
                      <p className="text-sm sm:text-base max-w-md">
                        {dashboard.desc}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </section>

      {/* 🔹 Core Features */}
      <section id="core-features"
   className="w-full max-w-4xl mx-auto text-center mb-16 px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-8">Core Features</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[
      'Real-time timetable updates and conflict detection',
      'Custom dashboards for students, professors, and admins',
      'Polls for rescheduling and feedback',
      'Email notifications with Resend',
      'Responsive mobile-first design',
      'Calendar view + offline accessibility',
    ].map((feature, idx) => (
      <div
        key={idx}
        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
      >
        <p className="text-gray-700 text-base">{feature}</p>
      </div>
    ))}
  </div>
</section>
    </main>
  )
}
