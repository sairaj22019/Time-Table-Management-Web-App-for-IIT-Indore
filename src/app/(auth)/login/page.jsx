// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { signIn } from 'next-auth/react'

// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import Link from 'next/link'
// import { FcGoogle } from 'react-icons/fc'

// const formSchema = z.object({
//   email: z.string().email('Enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// })

// export default function LoginPage() {
//   const router = useRouter()
//   const [errorMsg, setErrorMsg] = useState('')

//   const form = useForm({
//     // resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   // const onSubmit = async (data) => {
//   //   setErrorMsg('')
//   //   try {
//   //     const result = await signIn('credentials', {
//   //       redirect: false,
//   //       email: data.email,
//   //       password: data.password,
//   //     })

//   //     if (result?.error) {
//   //       setErrorMsg(result.error)
//   //     } else {
//   //       router.push('/complete-profile')
//   //     }
//   //   } catch (error) {
//   //     setErrorMsg('Something went wrong. Please try again.')
//   //   }
//   // }
//   const onSubmit = async (data) => {
//   setErrorMsg('')
//   try {
//     const result = await signIn('credentials', {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     })

//     if (result?.error) {
//       setErrorMsg(result.error)
//     } else {
//       // Fetch user profile
//       const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(data.email)}`)
//       const profile = await res.json()

//       const { username, role, department } = profile || {}

//       const isStudent = role === 'student'
//       const studentFieldsMissing = !profile?.rollno || !profile?.year
//       const commonFieldsMissing = !username || !role || !department

//       if (commonFieldsMissing || (isStudent && studentFieldsMissing)) {
//         router.push('/complete-profile')
//       } else {
//         router.push('/welcome')
//       }
//     }
//   } catch (error) {
//     setErrorMsg('Something went wrong. Please try again.')
//   }
// }


//   const handleGoogleLogin = async () => {
//     signIn('google', { callbackUrl: '/profile' })
//       .catch(() => {
//         setErrorMsg('Failed to sign in with Google.')
//       })
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center p-4">
//       <Card className="w-[40vw] min-w-[350px] shadow-md">
//         <CardContent className="py-8 px-6">
//           <div className="flex justify-between mb-4">
//             <h2 className="text-xl font-semibold">Login to your account</h2>
//             <Link href="/signup" className="text-sm text-blue-600 hover:underline">
//               Sign Up
//             </Link>
//           </div>

//           <p className="text-sm text-gray-500 mb-6">Enter your email below to login to your account.</p>

//           {errorMsg && (
//             <p className="text-sm text-red-500 text-center mb-2">{errorMsg}</p>
//           )}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <Input type="email" placeholder="m@example.com" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <div className="flex justify-between">
//                       <FormLabel>Password</FormLabel>
//                       {/* <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
//                         Forgot your password?
//                       </Link> */}
//                     </div>
//                     <Input type="password" placeholder="••••••••" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full">
//                 Login
//               </Button>
//             </form>
//           </Form>

//           <div className="mt-4">
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full flex items-center justify-center gap-2"
//               onClick={handleGoogleLogin}
//             >
//               <FcGoogle className="w-5 h-5" />
//               Login with Google
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   )
// }




'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setErrorMsg('')
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        setErrorMsg(result.error)
      } else {
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(data.email)}`)
        const profile = await res.json()

        const { username, role, department } = profile || {}
        const isStudent = role === 'student'
        const studentFieldsMissing = !profile?.rollno || !profile?.year
        const commonFieldsMissing = !username || !role || !department

        
        if (commonFieldsMissing || (isStudent && studentFieldsMissing)) {
          router.push('/complete-profile')
        } else {
          if (role === 'student') {
            router.push('/student')
          } else if (role === 'professor') {
            router.push('/professor')
          } else {
            throw new Error("No Valid Role Specified")
          }
        }

      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/profile' })
      .catch(() => setErrorMsg('Failed to sign in with Google.'))
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
              <h2 className="text-2xl font-bold text-gray-800">Login to your account</h2>
              <Link href="/signup" className="text-sm text-blue-600 hover:underline">
                Don’t have an account? <span className="font-medium">Sign Up</span>
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your email and password to access your account.
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
                        animate={{
                          scale: form.formState.errors.email ? 1.03 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="name@iit.ac.in"
                            className="pl-10"
                            {...field}
                          />
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
                        animate={{
                          scale: form.formState.errors.password ? 1.03 : 1,
                        }}
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
                >
                  Login
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
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-5 h-5" />
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

