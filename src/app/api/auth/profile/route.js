

import { connectDB } from '@/dbConnection/ConnectDB'
import User from '@/models/User.model'
import Student from '@/models/Student.model'
import Professor from '@/models/Professor.model'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) return NextResponse.json({ message: 'Email is required' }, { status: 400 })

  try {
    await connectDB()
    const user = await User.findOne({ email }).lean()
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    let extra = {}

    if (user.role === 'student') {
      const student = await Student.findOne({ userId: user._id }).lean()
      extra = student || {}
    } else if (user.role === 'professor') {
      const prof = await Professor.findOne({ userId: user._id }).lean()
      extra = prof || {}
    }

    return NextResponse.json({ ...user, ...extra }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

