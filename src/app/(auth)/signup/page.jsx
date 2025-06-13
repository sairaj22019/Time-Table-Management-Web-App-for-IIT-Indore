// 'use client'

// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Loader2 } from 'lucide-react' // Spinner icon

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
//         headers: {
//           'Content-Type': 'application/json',
//         },
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

//   return (
//     <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <Card className="w-full max-w-md shadow-md">
//         <CardContent className="py-8 px-6">
//           <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
//           {errorMsg && (
//             <p className="text-red-500 text-center text-sm mb-4">{errorMsg}</p>
//           )}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>UserName</FormLabel>
//                     <Input placeholder="Your full name" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="role"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Role</FormLabel>
//                     <div className="flex gap-4">
//                       {['student', 'professor', 'admin'].map((option) => (
//                         <label key={option} className="flex items-center space-x-2">
//                           <input
//                             type="radio"
//                             value={option}
//                             checked={field.value === option}
//                             onChange={() => field.onChange(option)}
//                           />
//                           <span className="capitalize">{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <Input type="email" placeholder="you@example.com" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <Input type="password" placeholder="••••••••" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Signing up...
//                   </span>
//                 ) : (
//                   'Sign Up'
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </main>
//   )
// }



'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc' // Google icon

const formSchema = z.object({
  username: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'professor', 'admin'], {
    required_error: 'Please select a role',
  }),
  email: z.string().email('Invalid email'),
})

export default function SignUpPage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
  })

  const onSubmit = async (data) => {
    setErrorMsg('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleGoogleSignup = async () => {
      signIn('google', { callbackUrl: '/profile' })
        .catch(() => {
          setErrorMsg('Failed to sign in with Google.')
        })
    }
  return (
    <main className="min-h-screen w-screen flex items-center justify-center ">
      <div className="backdrop-blur-sm bg-white/70 rounded-xl ">
        <Card className="w-[40vw] min-w-[350px] shadow-md">
        <CardContent className="py-8 px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          {errorMsg && (
            <p className="text-red-500 text-center text-sm mb-4">{errorMsg}</p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <Input placeholder="Your full name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <div className="flex gap-4">
                      {['student', 'professor', 'admin'].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={option}
                            checked={field.value === option}
                            onChange={() => field.onChange(option)}
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing up...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">or</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full flex items-center gap-2 justify-center"
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="h-5 w-5" />
              Sign up with Google
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}