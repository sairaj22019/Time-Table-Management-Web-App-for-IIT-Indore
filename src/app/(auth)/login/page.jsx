'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

const formSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
        router.push('/') 
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/welcome' })
      .catch(() => {
        setErrorMsg('Failed to sign in with Google.')
      })
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-[40vw] min-w-[350px] shadow-md">
        <CardContent className="py-8 px-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Login to your account</h2>
            <Link href="/signup" className="text-sm text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>

          <p className="text-sm text-gray-500 mb-6">Enter your email below to login to your account.</p>

          {errorMsg && (
            <p className="text-sm text-red-500 text-center mb-2">{errorMsg}</p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="m@example.com" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>
                      {/* <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                        Forgot your password?
                      </Link> */}
                    </div>
                    <Input type="password" placeholder="••••••••" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-5 h-5" />
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
