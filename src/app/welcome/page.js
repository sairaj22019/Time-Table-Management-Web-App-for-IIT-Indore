// app/welcome/page.js
'use client'
import { useSession } from 'next-auth/react'
import SessionWrapper from '../SessionWrapper'
import { signOut } from 'next-auth/react'



export default function WelcomePage() {
  return (
    <SessionWrapper>
      <WelcomeContent />
      <button onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </button>
    </SessionWrapper>
  )
}

function WelcomeContent() {
  const { data: session } = useSession()

  if (!session?.user?.email) {
    // Redirect or show loading/error
    return <div>Loading...</div>
  }

  return <div>Welcome, {session.user.email}!</div>
}
