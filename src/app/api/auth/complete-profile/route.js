
import { connectDB } from '@/dbConnection/ConnectDB'
import User from '@/models/User.model'
import Student from '@/models/Student.model'
import Professor from '@/models/Professor.model'

export async function POST(request) {
  const body = await request.json()
  const { email, username, role, department, rollno, year } = body

  if (!email || !username || !role || !department) {
    return Response.json({ message: 'Missing required fields.' }, { status: 400 })
  }

  try {
    await connectDB()
    const user = await User.findOneAndUpdate({ email }, { username, role }, { new: true })

    if (!user) {
      return Response.json({ message: 'User not found.' }, { status: 404 })
    }

    if (role === 'student') {
      if (!rollno || !year) {
        return Response.json({ message: 'Roll number and year are required for students.' }, { status: 400 })
      }

      const existing = await Student.findOne({ userId: user._id })
      if (!existing) {
        await Student.create({ userId: user._id, department, rollno, year })
      }
    }

    if (role === 'professor') {
      const existing = await Professor.findOne({ userId: user._id })
      if (!existing) {
        await Professor.create({ userId: user._id, department })
      }
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
