
'use client'

import { useEffect } from 'react'
import { useSession , update} from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CheckProfilePage() {
  const { data: session, status , update } = useSession()
  const router = useRouter()

  // useEffect(() => {
  //   if (status === 'loading') return

  //   if (!session?.user?.email) {
  //     router.push('/login')
  //     return
  //   }

  //   const checkProfile = async () => {
  //     try {
  //       const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
  //       const data = await res.json()
  //       await update({ role, username })
  //       if (data.role) {
  //         if (data.role === 'student' && data.rollno) {
  //           router.push('/student')
  //         } else if (data.role === 'professor' && data.department) {
  //           router.push('/professor')
  //         } else {
  //           router.push('/complete-profile')
  //         }
  //       } else {
  //         router.push('/complete-profile')
  //       }
  //     } catch (err) {
  //       console.error('Profile check error:', err)
  //       router.push('/complete-profile')
  //     }
  //   }

  //   checkProfile()
  // }, [session, status, router])


  useEffect(() => {
  if (status !== 'authenticated' || !session?.user?.email) return;

  const checkProfile = async () => {
    try {
      const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
      const data = await res.json()
      // remove or carefully handle update() here if not needed
      if (data.role) {
        if (data.role === 'student' && data.rollno) {
          router.push('/student')
        } else if (data.role === 'professor' && data.department) {
          router.push('/professor')
        } else {
          router.push('/complete-profile')
        }
      } else {
        router.push('/complete-profile')
      }
    } catch (err) {
      console.error('Profile check error:', err)
      router.push('/complete-profile')
    }
  }

  checkProfile()
}, [session?.user?.email, status, router])


  return <p className="text-center mt-10">Redirecting...</p>
}