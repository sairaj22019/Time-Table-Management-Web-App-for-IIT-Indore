
"use client"
import CoursesPage from "@/components/coursePage"
import Student from "@/models/Student.model"
import { useSession } from "next-auth/react"
import { useYear } from "@/components/YearProvider"

export default function Courses() {
  const { data: session, status } = useSession()
  const year = useYear()
  if (status === 'loading') return <p>Loading...</p>
  console.log("year",year);
  if (!session){ return <p>You are not signed in</p>}
  
  return (
    <CoursesPage studentEmail={session.user.email} year={year} />
  )
}

