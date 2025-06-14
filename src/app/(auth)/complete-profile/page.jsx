// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// export default function CompleteProfilePage() {
//   const { data: session } = useSession()
//   const router = useRouter()

//   const [username, setUsername] = useState('')
//   const [role, setRole] = useState('')
//   const [department, setDepartment] = useState('')
//   const [rollno, setRollno] = useState('')
//   const [year, setYear] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//   if (!session?.user?.email) {
//     router.push('/login')
//     return
//   }

//   const checkProfileCompletion = async () => {
//     try {
//       const res = await fetch(`/api/auth/profile?email=${session.user.email}`)
//       const data = await res.json()

//       // If already filled, redirect to welcome page
//       if (
//         data.role &&
//         ((data.role === 'student' && data.rollno) ||
//          (data.role === 'professor' && data.department))
//       ) {
//         router.push('/welcome')
//       }
//     } catch (err) {
//       console.error('Profile check failed', err)
//     }
//   }

//   checkProfileCompletion()
// }, [session, router])


//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     if (!username || !role || !department || (role === 'student' && (!rollno || !year))) {
//       setError('Please fill all required fields.')
//       setLoading(false)
//       return
//     }

//     try {
//       const res = await fetch('/api/auth/complete-profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: session.user.email,
//           username,
//           role,
//           department,
//           rollno,
//           year,
//         }),
//       })

//       const data = await res.json()
//       if (data.success) {
//         router.push('/welcome')
//       } else {
//         setError(data.message || 'Something went wrong.')
//       }
//     } catch (err) {
//       setError('Server error.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="min-h-screen flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow p-6 rounded-lg space-y-4 w-[350px]"
//       >
//         <h2 className="text-xl font-bold text-center">Complete Your Profile</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <Input
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <div className="flex gap-4">
//           {['student', 'professor'].map((r) => (
//             <label key={r} className="flex items-center gap-1 text-sm">
//               <input
//                 type="radio"
//                 name="role"
//                 value={r}
//                 checked={role === r}
//                 onChange={() => setRole(r)}
//               />
//               <span className="capitalize">{r}</span>
//             </label>
//           ))}
//         </div>

//         {role === 'student' && (
//           <select
//             className="w-full border border-gray-300 rounded p-2 text-sm"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//             required
//           >
//             <option value="">Select Department</option>
//             <option value="che">Chemical Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="ce">Civil Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="cse">Computer Science and Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="ee">Electrical Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="ep">Engineering Physics (4 Years, Bachelor of Technology)</option>
//             <option value="sse">Space Sciences and Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="mc">Mathematics and Computing (4 Years, Bachelor of Technology)</option>
//             <option value="me">Mechanical Engineering (4 Years, Bachelor of Technology)</option>
//             <option value="mems">Metallurgical Engineering and Materials Science (4 Years, Bachelor of Technology)</option>
//           </select>
//         )}

//         {role === 'professor' && (
//           <Input
//             placeholder="Department"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//           />
//         )}

//         {role === 'student' && (
//           <>
//             <Input
//               placeholder="Roll Number"
//               value={rollno}
//               onChange={(e) => setRollno(e.target.value)}
//             />
//             <Input
//               placeholder="Year (1-6)"
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               min={1}
//               max={6}
//             />
//           </>
//         )}

//         <Button type="submit" disabled={loading} className="w-full">
//           {loading ? 'Submitting...' : 'Complete Profile'}
//         </Button>
//       </form>
//     </main>
//   )
// }



'use client'
import React from 'react'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
          <CardContent className="py-10 px-8">
            <div className="flex flex-col items-center mb-6 gap-2">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Complete Your Profile
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Please fill out your details to continue.
              </p>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded text-center mb-4"
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
                />
              </motion.div>

              <div className="flex gap-4 text-sm">
                {['student', 'professor'].map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border ${
                      role === r
                        ? 'border-blue-500 bg-blue-100 text-blue-800 font-medium'
                        : 'border-gray-300 text-gray-700'
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

              {role === 'student' && (
                <select
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="che">Chemical Engineering</option>
                  <option value="ce">Civil Engineering</option>
                  <option value="cse">Computer Science and Engineering</option>
                  <option value="ee">Electrical Engineering</option>
                  <option value="ep">Engineering Physics</option>
                  <option value="sse">Space Sciences and Engineering</option>
                  <option value="mc">Mathematics and Computing</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="mems">Metallurgical Engineering & Materials Science</option>
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
                    min={1}
                    max={6}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-150"
              >
                {loading ? 'Submitting...' : 'Complete Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
