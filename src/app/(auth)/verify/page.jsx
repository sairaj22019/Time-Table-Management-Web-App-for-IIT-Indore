// 'use client'

// import * as React from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// const formSchema = z.object({
//   otp: z.string().min(6, 'OTP must be 6 digits').max(6),
// })

// export default function OTPPage() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       otp: '',
//     },
//   })

//   const onSubmit = (data) => {
//     console.log('OTP submitted:', data.otp)
//     // TODO: Verify OTP with backend, then redirect or show success
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <Card className="w-full max-w-md shadow-md">
//         <CardContent className="py-8 px-6">
//           <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="otp"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>One-Time Password</FormLabel>
//                     <InputOTP maxLength={6} {...field}>
//                       <InputOTPGroup>
//                         {[...Array(6)].map((_, i) => (
//                           <InputOTPSlot key={i} index={i} />
//                         ))}
//                       </InputOTPGroup>
//                     </InputOTP>
//                     <p className="text-sm text-muted-foreground mt-2">
//                       Please enter the 6-digit code sent to your email.
//                     </p>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </main>
//   )
// }

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
// import ClientOnly from '@/components/ClientOnly' // Import the wrapper

// const formSchema = z.object({
//   otp: z.string().min(6, 'OTP must be 6 digits').max(6),
// })

// export default function OTPPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const email = searchParams.get('email')
//   const [errorMsg, setErrorMsg] = React.useState('')
//   const [successMsg, setSuccessMsg] = React.useState('')

//   const form = useForm({
//     // resolver: zodResolver(formSchema),
//     defaultValues: {
//       otp: '',
//     },
//   })

//   const onSubmit = async (data) => {
//     setErrorMsg('')
//     setSuccessMsg('')
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
//           const text = await res.text()
//           console.error('Server error:', text)
//           throw new Error('Failed to verify OTP')
//         }
//       const result = await res.json()

//       if (result.success) {
//         setSuccessMsg(result.message)
//         setTimeout(() => router.push('/login'), 2000)
//       } else {
//         setErrorMsg(result.message || 'Invalid OTP')
//       }
//     } catch (err) {
//       console.error(err)
//       setErrorMsg('Something went wrong. Please try again.')
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

//                 <Button type="submit" className="w-full">
//                   Submit OTP
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

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
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
    // resolver: zodResolver(formSchema),
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

      if (!res.ok) {
        const text = await res.text()
        throw new Error('Failed to verify OTP')
      }

      const result = await res.json()
      setLoading(false)

      if (result.success) {
        setSuccessMsg(result.message)
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setErrorMsg( 'Invalid OTP')
      }
    } catch (err) {
      setErrorMsg('Invalid or expired OTP')
      setLoading(false)
    }
  }

  return (
    <ClientOnly>
      <main className="min-h-screen flex items-center justify-center p-4">
        {/* <Card className="w-full max-w-md shadow-md"> */}
        <Card className="w-[40vw] min-w-[350px] shadow-md">
          <CardContent className="py-8 px-6">
            <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>

            {errorMsg && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
            {successMsg && <p className="text-sm text-green-600 text-center">{successMsg}</p>}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      <p className="text-sm text-muted-foreground mt-2">
                        Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
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
      </main>
    </ClientOnly>
  )
}
