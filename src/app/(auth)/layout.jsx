export default function SignupLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </section>
  )
}

// 'use client'

// import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'
// import { Loader2 } from 'lucide-react'

// // You can move this layout under (auth)/layout.jsx if it's only for /login & /signup
// export default function RootLayout({ children }) {
//   const pathname = usePathname()
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)
//     const timeout = setTimeout(() => {
//       setLoading(false)
//     }, 500) // Adjust duration for effect

//     return () => clearTimeout(timeout)
//   }, [pathname])

//   return (
//     <html lang="en">
//       <body className="bg-white text-black">
//         {loading ? (
//           <div className="min-h-screen flex justify-center items-center bg-white">
//             <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//           </div>
//         ) : (
//           children
//         )}
//       </body>
//     </html>
//   )
// }


