// 'use client'

// import * as React from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { useSearchParams, useRouter } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Loader2 } from 'lucide-react'
// import ClientOnly from '@/components/ClientOnly'

// const formSchema = z.object({
//   otp: z.string().min(6, 'OTP must be 6 digits').max(6),
// })

// export default function OTPPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const email = searchParams.get('email')
//   const [errorMsg, setErrorMsg] = React.useState('')
//   const [successMsg, setSuccessMsg] = React.useState('')
//   const [loading, setLoading] = React.useState(false)

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       otp: '',
//     },
//   })

//   const onSubmit = async (data) => {
//     setErrorMsg('')
//     setSuccessMsg('')
//     setLoading(true)

//     try {
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp: data.otp,
//         }),
//       })

//       if (!res.ok) {
//         const text = await res.text()
//         throw new Error('Failed to verify OTP')
//       }

//       const result = await res.json()
//       setLoading(false)

//       if (result.success) {
//         setSuccessMsg(result.message)
//         setTimeout(() => router.push('/login'), 1500)
//       } else {
//         setErrorMsg( 'Invalid OTP')
//       }
//     } catch (err) {
//       setErrorMsg('Invalid or expired OTP')
//       setLoading(false)
//     }
//   }

//   return (
//     <ClientOnly>
//       <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <Card className="w-full max-w-md shadow-md">
//           <CardContent className="py-8 px-6">
//             <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>

//             {errorMsg && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
//             {successMsg && <p className="text-sm text-green-600 text-center">{successMsg}</p>}

//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
//                 <FormField
//                   control={form.control}
//                   name="otp"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>One-Time Password</FormLabel>
//                       <InputOTP maxLength={6} {...field}>
//                         <InputOTPGroup>
//                           {[...Array(6)].map((_, i) => (
//                             <InputOTPSlot key={i} index={i} />
//                           ))}
//                         </InputOTPGroup>
//                       </InputOTP>
//                       <p className="text-sm text-muted-foreground mt-2">
//                         Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
//                       </p>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Verifying...
//                     </span>
//                   ) : (
//                     'Submit OTP'
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </main>
//     </ClientOnly>
//   )
// }


'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams, useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import ClientOnly from '@/components/ClientOnly'

const formSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6),
})

export default function OTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data) => {
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: data.otp,
        }),
      })

      const result = await res.json()
      setLoading(false)

      if (!res.ok || !result.success) {
        setErrorMsg('Invalid or expired OTP')
      } else {
        setSuccessMsg(result.message)
        setTimeout(() => router.push('/login'), 1500)
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <ClientOnly>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Verify Your Email
              </CardTitle>
              {/* <p className="text-sm text-gray-500 mt-1">
                Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
              </p> */}
            </CardHeader>

            <CardContent className="pt-0 px-8 pb-8">
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
                >
                  {errorMsg}
                </motion.p>
              )}

              {successMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-600 bg-green-50 border border-green-200 p-2 rounded text-center mb-4"
                >
                  {successMsg}
                </motion.p>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <motion.div
                          initial={false}
                          animate={{
                            scale: form.formState.errors.otp ? 1.03 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              {[...Array(6)].map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </motion.div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                    <p className="text-sm text-gray-500 mt-1">
                        Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
                    </p>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      'Submit OTP'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </ClientOnly>
  )
}
