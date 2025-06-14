'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CheckProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/login')
      return
    }

    const checkProfile = async () => {
      try {
        const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
        const data = await res.json()

        if (
          data.role &&
          ((data.role === 'student' && data.rollno) ||
           (data.role === 'professor' && data.department))
        ) {
          router.push('/welcome')
        } else {
          router.push('/complete-profile')
        }
      } catch (err) {
        console.error('Profile check error:', err)
        router.push('/complete-profile')
      }
    }

    checkProfile()
  }, [session, status, router])

  return <p className="text-center mt-10">Redirecting...</p>
}
