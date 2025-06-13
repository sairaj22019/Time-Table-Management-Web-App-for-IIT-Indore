'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CompleteProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')
  const [rollno, setRollno] = useState('')
  const [year, setYear] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  if (!session?.user?.email) {
    router.push('/login')
    return
  }

  const checkProfileCompletion = async () => {
    try {
      const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
      const data = await res.json()

      // If already filled, redirect to welcome page
      if (
        data.role &&
        ((data.role === 'student' && data.rollno) ||
         (data.role === 'professor' && data.department))
      ) {
        router.push('/welcome')
      }
    } catch (err) {
      console.error('Profile check failed', err)
    }
  }

  checkProfileCompletion()
}, [session, router])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!username || !role || !department || (role === 'student' && (!rollno || !year))) {
      setError('Please fill all required fields.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        router.push('/welcome')
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg space-y-4 w-[350px]"
      >
        <h2 className="text-xl font-bold text-center">Complete Your Profile</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="flex gap-4">
          {['student', 'professor'].map((r) => (
            <label key={r} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
              />
              <span className="capitalize">{r}</span>
            </label>
          ))}
        </div>

        {role === 'student' && (
          <select
            className="w-full border border-gray-300 rounded p-2 text-sm"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="che">Chemical Engineering (4 Years, Bachelor of Technology)</option>
            <option value="ce">Civil Engineering (4 Years, Bachelor of Technology)</option>
            <option value="cse">Computer Science and Engineering (4 Years, Bachelor of Technology)</option>
            <option value="ee">Electrical Engineering (4 Years, Bachelor of Technology)</option>
            <option value="ep">Engineering Physics (4 Years, Bachelor of Technology)</option>
            <option value="sse">Space Sciences and Engineering (4 Years, Bachelor of Technology)</option>
            <option value="mc">Mathematics and Computing (4 Years, Bachelor of Technology)</option>
            <option value="me">Mechanical Engineering (4 Years, Bachelor of Technology)</option>
            <option value="mems">Metallurgical Engineering and Materials Science (4 Years, Bachelor of Technology)</option>
          </select>
        )}

        {role === 'professor' && (
          <Input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        )}

        {role === 'student' && (
          <>
            <Input
              placeholder="Roll Number"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />
            <Input
              placeholder="Year (1-6)"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={1}
              max={6}
            />
          </>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Complete Profile'}
        </Button>
      </form>
    </main>
  )
}
