// import React from 'react'
// import { Button } from './ui/button'
// import Image from 'next/image'

// function Navbar() {
//   return (
//     <div className='flex w-full justify-center items-center'>
//     <div className='px-4 bg-[var(--color-skin)]/[0.8] fixed z-100 top-5 py-2 w-[90%] md:w-[70%] flex justify-between items-center rounded-xl'>

//       <div className='text-blue-500 flex gap-3 items-center'>
//         <Image src={"/IITI_Logo.svg.png"} alt='logo' width={30} height={30}/>
//         NAME
//         </div>
//       <div className='flex gap-4'>
//         {/* <div className='bg-slate-50 hover:bg-gray-700 hover:text-white text-[1rem] px-3 py-1 rounded-md border border-slate-600'>
//           sign in
//         </div> */}
//         <Button variant={"outline"} className={"bg-slate-50 hover:cursor-pointer hover:bg-gray-200/[0.7] my-2"}>Sign in</Button>
//         <div className='bg-indigo-500 px-3 py-1 flex items-center hover:bg-indigo-500/[0.9] rounded-md text-sm font-medium hover:cursor-pointer my-2'>
//           Sign up
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Navbar

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
