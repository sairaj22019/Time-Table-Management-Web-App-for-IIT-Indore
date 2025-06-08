// "use client";

// import { Tabs } from "@/components/ui/tabs";
// import Image from "next/image";
// import React from 'react'

// function Images() {
//     const tabs = [
//     {
//       title: "student",
//       value: "student",
//       content: (
//         <div
//           className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col gap-2 items-center justify-center">
//           <p>Student dashboard</p>
//           <Image width={600} height={100} src={"/pic.png"} alt="pic"/>
//         </div>
//       ),
//     },
//     {
//       title: "Professor",
//       value: "Professor",
//       content: (
//         <div
//           className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Professor dashboard</p>
//           <Image width={600} height={100} src={"/pic.png"} alt="pic"/>
//         </div>
//       ),
//     },
//     {
//       title: "Admin",
//       value: "Admin",
//       content: (
//         <div
//           className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
//           <p>Admin dashboard</p>
//           <Image width={600} height={100} src={"/pic.png"} alt="pic" className="mx-2 my-2"/>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="">
//       <h1 className="text-slate-700 text-3xl font-bold text-center py-3">Personalised dashboards</h1>
//       <div
//       className="h-[33rem] sm:h-[37rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-center justify-start">
//       <Tabs tabs={tabs} />
//       </div>
//     </div>
//   )
// }

// export default Images


// const DummyContent = () => {
//   return (
//     <img
//       src="/linear.webp"
//       alt="dummy image"
//       width="1000"
//       height="1000"
//       className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto" />
//   );
// };


"use client";

import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

function Images() {
  const tabs = [
    {
      title: "Student",
      value: "student",
      content: (
        <div className="relative h-full w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-purple-700 to-violet-900 text-white flex flex-col items-center justify-center gap-4 shadow-lg">
          <p className="text-2xl md:text-4xl font-bold text-center">Student Dashboard</p>
          <Image width={600} height={400} src="/pic.png" alt="Student Dashboard" className="rounded-xl object-contain" />
        </div>
      ),
    },
    {
      title: "Professor",
      value: "Professor",
      content: (
        <div className="relative h-full w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-purple-700 to-violet-900 text-white flex flex-col items-center justify-center gap-4 shadow-lg">
          <p className="text-2xl md:text-4xl font-bold text-center">Professor Dashboard</p>
          <Image width={600} height={400} src="/pic.png" alt="Professor Dashboard" className="rounded-xl object-contain" />
        </div>
      ),
    },
    {
      title: "Admin",
      value: "Admin",
      content: (
        <div className="relative h-full w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-purple-700 to-violet-900 text-white flex flex-col items-center justify-center gap-4 shadow-lg">
          <p className="text-2xl md:text-4xl font-bold text-center">Admin Dashboard</p>
          <Image width={600} height={400} src="/pic.png" alt="Admin Dashboard" className="rounded-xl object-contain" />
        </div>
      ),
    },
  ];

  return (
    <div className="py-10 px-4">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-700 mb-6">
        Personalized Dashboards
      </h1>
      <div className="h-[35rem] md:h-[42rem] relative flex flex-col max-w-6xl mx-auto items-center justify-start">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Images;
