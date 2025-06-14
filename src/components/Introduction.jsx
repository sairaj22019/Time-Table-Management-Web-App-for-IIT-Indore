// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import React from 'react'

// function Introduction() {
//   return (
//     <div className={cn(
//           "relative inset-0",
//           "[background-size:20px_20px]",
//           "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
//         'flex justify-center bg-slate-50 items-center h-[660px] ')}>
//       <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
//       <div className="flex gap-4 justify-center items-center mx-3 w-[90%] md:w-[80%]">

//       <div className="flex flex-col gapx-4 justify-center items-center">
//       <h1 className='py-2 text-center text-5xl z-20 text-transparent bg-gradient-to-b from-slate-400 to-slate-800 bg-clip-text font-semibold '>Smarter Scheduling for IIT Indore</h1>
//       <p className="text-center text-xl text-slate-800">  A centralized and intelligent platform for IIT Indore that simplifies timetable management for students, professors, and administrators — all in one place.</p>
//       </div>
//       <div>
//       <Image src="/IITI_Logo.svg.png" width={200} height={200} alt="logo"/>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default Introduction


import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

function Introduction() {
  return (
    <div
      className={cn(
        "relative inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        "flex justify-center items-center min-h-screen bg-slate-50 px-6"
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row justify-between items-center gap-10 w-full max-w-6xl">

        <div className="text-center md:text-left max-w-xl space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-b from-slate-400 to-slate-800 bg-clip-text">
            Smarter Scheduling for IIT Indore
          </h1>
          <p className="text-xl text-slate-700">
            A centralized and intelligent platform that simplifies timetable management for students, professors, and administrators — all in one place.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 text-base rounded-xl">
              Get Started
            </Button>
            <Button variant="outline" className="text-indigo-600 border-indigo-500 hover:bg-indigo-100 px-6 py-3 text-base rounded-xl">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Image
            src="/IITI_Logo.svg.png"
            width={240}
            height={240}
            alt="IIT Indore Logo"
            className="drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
