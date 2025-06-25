"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CompleteProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
  const [rollno, setRollno] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!session?.user?.email) {
      router.push("/login")
      return
    }

  const checkProfileCompletion = async () => {
        try {
          const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
          const data = await res.json()

          if(data.role){
            if (data.role === 'student' && data.rollno) {
              router.push('/student')
            } else if (data.role === 'professor' && data.department) {
              router.push('/professor')
            }
          }
        } catch (err) {
          console.error('Profile check failed', err)
        }
      }


    checkProfileCompletion()
  }, [session, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !role || !department || (role === "student" && (!rollno || !year))) {
      setError("Please fill all required fields.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          username,
          role,
          department,
          rollno,
          year,
        }),
      })

       const data = await res.json()
      if (data.success) {
        if (role === 'student') {
        router.push('/student')
      } else if (role === 'professor') {
        router.push('/professor')
      }
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server error.')
    } finally {
      setLoading(false)
    }
  }

  const studentDepartments = [
    { value: "che", label: "Chemical Engineering" },
    { value: "ce", label: "Civil Engineering" },
    { value: "cse", label: "Computer Science and Engineering" },
    { value: "ee", label: "Electrical Engineering" },
    { value: "ep", label: "Engineering Physics" },
    { value: "sse", label: "Space Sciences and Engineering" },
    { value: "mc", label: "Mathematics and Computing" },
    { value: "me", label: "Mechanical Engineering" },
    { value: "mems", label: "Metallurgical Engineering & Materials Science" },
  ]

  const professorDepartments = [
    { value: "che", label: "Chemistry" },
    { value: "ce", label: "Civil Engineering" },
    { value: "cse", label: "Computer Science and Engineering" },
    { value: "ee", label: "Electrical Engineering" },
    { value: "ep", label: "Engineering Physics" },
    { value: "hs", label: "Humanities and Social Sciences" },
    { value: "phy", label: "Physics" },
    { value: "ma", label: "Mathematics" },
    { value: "bse", label: "Biosciences and Biomedical Engineering" },
    { value: "me", label: "Mechanical Engineering" },
    { value: "mems", label: "Metallurgical Engineering & Materials Science" },
    { value: "sse", label: "Astronomy, Astrophysics and Space Engineering" },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
          <CardContent className="py-8 px-6">
            <div className="flex flex-col items-center mb-6 gap-2">
              <h2 className="text-xl font-bold text-gray-800 text-center">Complete Your Profile</h2>
              <p className="text-xs text-gray-500 text-center">Please fill out your details to continue.</p>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
              >
                {error}
              </motion.p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-sm"
                />
              </motion.div>

              <div className="flex gap-3 text-xs">
                {["student", "professor"].map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border ${
                      role === r
                        ? "border-blue-500 bg-blue-100 text-blue-800 font-medium"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                      className="accent-blue-600"
                    />
                    <span className="capitalize">{r}</span>
                  </label>
                ))}
              </div>

              {role === "student" && (
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="text-sm w-full">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {studentDepartments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value} className="text-xs">
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {role === "professor" && (
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="text-sm w-full">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {professorDepartments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value} className="text-xs">
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {role === "student" && (
                <>
                  <Input
                    placeholder="Roll Number"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Year (1-6)"
                    type="number"
                    min={1}
                    max={6}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="text-sm"
                  />
                </>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150 text-sm"
              >
                {loading ? "Submitting..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}