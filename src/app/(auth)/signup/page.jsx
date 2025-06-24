// 'use client'

// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { signIn } from 'next-auth/react'
// import Link from 'next/link'
// import { FcGoogle } from 'react-icons/fc'
// import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi'
// import { motion } from 'framer-motion'

// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// const formSchema = z.object({
//   username: z.string().min(2, 'Name must be at least 2 characters'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   role: z.enum(['student', 'professor', 'admin'], {
//     required_error: 'Please select a role',
//   }),
//   email: z.string().email('Invalid email'),
// })

// export default function SignUpPage() {
//   const router = useRouter()
//   const [errorMsg, setErrorMsg] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       role: '',
//     },
//   })

//   const onSubmit = async (data) => {
//     setErrorMsg('')
//     setLoading(true)
//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })

//       const result = await res.json()
//       setLoading(false)

//       if (result.success) {
//         router.push(`/verify?email=${encodeURIComponent(data.email)}`)
//       } else {
//         setErrorMsg(result.message || 'Signup failed.')
//       }
//     } catch (error) {
//       console.error('Signup error:', error)
//       setErrorMsg('Something went wrong. Please try again.')
//       setLoading(false)
//     }
//   }

//   const handleGoogleSignup = () => {
//     signIn('google', { callbackUrl: '/profile' }).catch(() =>
//       setErrorMsg('Failed to sign in with Google.')
//     )
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 50 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
//           <CardContent className="py-10 px-8">
//             <div className="flex flex-col items-center justify-between gap-2 mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
//               <Link href="/login" className="text-sm text-blue-600 hover:underline">
//                 Already have an account? <span className="font-medium">Login</span>
//               </Link>
//             </div>

//             <p className="text-sm text-gray-500 text-center mb-6">
//               Enter your details to create your account.
//             </p>

//             {errorMsg && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
//               >
//                 {errorMsg}
//               </motion.p>
//             )}

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <motion.div
//                         initial={false}
//                         animate={{ scale: form.formState.errors.username ? 1.03 : 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="relative">
//                           <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <Input placeholder="Your full name" className="pl-10" {...field} />
//                         </div>
//                       </motion.div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <div className="flex gap-4">
//                         {['student', 'professor', 'admin'].map((option) => (
//                           <label key={option} className="flex items-center space-x-2">
//                             <input
//                               type="radio"
//                               value={option}
//                               checked={field.value === option}
//                               onChange={() => field.onChange(option)}
//                             />
//                             <span className="capitalize text-sm">{option}</span>
//                           </label>
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <motion.div
//                         initial={false}
//                         animate={{ scale: form.formState.errors.email ? 1.03 : 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="relative">
//                           <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
//                         </div>
//                       </motion.div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <motion.div
//                         initial={false}
//                         animate={{ scale: form.formState.errors.password ? 1.03 : 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="relative">
//                           <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <Input
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="••••••••"
//                             className="pl-10 pr-10"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword((prev) => !prev)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? <HiEyeOff /> : <HiEye />}
//                           </button>
//                         </div>
//                       </motion.div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150"
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing up...' : 'Sign Up'}
//                 </Button>
//               </form>
//             </Form>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">or continue with</span>
//               </div>
//             </div>

//             <Button
//               type="button"
//               variant="outline"
//               className="w-full flex items-center justify-center gap-3 text-gray-700 font-medium border border-gray-300 hover:bg-gray-100"
//               onClick={handleGoogleSignup}
//             >
//               <FcGoogle className="w-5 h-5" />
//               Sign up with Google
//             </Button>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }



// // ✅ UPDATED FRONTEND: Removed username and role field

// 'use client'

// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { signIn } from 'next-auth/react'
// import Link from 'next/link'
// import { FcGoogle } from 'react-icons/fc'
// import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
// import { motion } from 'framer-motion'

// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// const formSchema = z.object({
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   email: z.string().email('Invalid email'),
// })

// export default function SignUpPage() {
//   const router = useRouter()
//   const [errorMsg, setErrorMsg] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   const onSubmit = async (data) => {
//     setErrorMsg('')
//     setLoading(true)
//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })

//       const result = await res.json()
//       setLoading(false)

//       if (result.success) {
//         router.push(`/verify?email=${encodeURIComponent(data.email)}`)
//       } else {
//         setErrorMsg(result.message || 'Signup failed.')
//       }
//     } catch (error) {
//       console.error('Signup error:', error)
//       setErrorMsg('Something went wrong. Please try again.')
//       setLoading(false)
//     }
//   }

//   const handleGoogleSignup = () => {
//     signIn('google', { callbackUrl: '/profile' }).catch(() =>
//       setErrorMsg('Failed to sign in with Google.')
//     )
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 50 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
//           <CardContent className="py-10 px-8">
//             <div className="flex flex-col items-center justify-between gap-2 mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
//               <Link href="/login" className="text-sm text-blue-600 hover:underline">
//                 Already have an account? <span className="font-medium">Login</span>
//               </Link>
//             </div>

//             <p className="text-sm text-gray-500 text-center mb-6">
//               Enter your details to create your account.
//             </p>

//             {errorMsg && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
//               >
//                 {errorMsg}
//               </motion.p>
//             )}

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <motion.div
//                         initial={false}
//                         animate={{ scale: form.formState.errors.email ? 1.03 : 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="relative">
//                           <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
//                         </div>
//                       </motion.div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <motion.div
//                         initial={false}
//                         animate={{ scale: form.formState.errors.password ? 1.03 : 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="relative">
//                           <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                           <Input
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="••••••••"
//                             className="pl-10 pr-10"
//                             {...field}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword((prev) => !prev)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? <HiEyeOff /> : <HiEye />}
//                           </button>
//                         </div>
//                       </motion.div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150"
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing up...' : 'Sign Up'}
//                 </Button>
//               </form>
//             </Form>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">or continue with</span>
//               </div>
//             </div>

//             <Button
//               type="button"
//               variant="outline"
//               className="w-full flex items-center justify-center gap-3 text-gray-700 font-medium border border-gray-300 hover:bg-gray-100"
//               onClick={handleGoogleSignup}
//             >
//               <FcGoogle className="w-5 h-5" />
//               Sign up with Google
//             </Button>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </main>
//   )
// }



// ✅ UPDATED FRONTEND: Removed username and role field

'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Invalid email'),
})

export default function SignUpPage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setErrorMsg('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      setLoading(false)

      if (result.success) {
        router.push(`/verify?email=${encodeURIComponent(data.email)}`)
      } else {
        setErrorMsg(result.message || 'Signup failed.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrorMsg('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    signIn('google', { callbackUrl: '/profile' }).catch(() =>
      setErrorMsg('Failed to sign in with Google.')
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
          <CardContent className="py-10 px-8">
            <div className="flex flex-col items-center justify-between gap-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Already have an account? <span className="font-medium">Login</span>
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your details to create your account.
            </p>

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
              >
                {errorMsg}
              </motion.p>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <motion.div
                        initial={false}
                        animate={{ scale: form.formState.errors.email ? 1.03 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                        </div>
                      </motion.div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <motion.div
                        initial={false}
                        animate={{ scale: form.formState.errors.password ? 1.03 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                          </button>
                        </div>
                      </motion.div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 text-gray-700 font-medium border border-gray-300 hover:bg-gray-100"
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
