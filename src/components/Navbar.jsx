import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function Navbar() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="fixed top-5 z-100 w-[90%] md:w-[70%] px-6 py-3 bg-white/80 backdrop-blur-lg shadow-md rounded-xl flex justify-between items-center border border-slate-200">
        
        <div className="flex items-center gap-3 text-indigo-600 font-semibold text-lg">
          <Image src="/IITI_Logo.svg.png" alt="logo" width={36} height={36} />
          <span>IIT Indore Timetable</span>
        </div>

        <div className="flex gap-3 items-center">
          <Button variant="outline" className="hover:bg-slate-200 hover:text-indigo-600 transition font-medium">Sign In</Button>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4">Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
