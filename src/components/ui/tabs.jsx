// "use client";;
// import { useState } from "react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";

// export const Tabs = ({
//   tabs: propTabs,
//   containerClassName,
//   activeTabClassName,
//   tabClassName,
//   contentClassName
// }) => {
//   const [active, setActive] = useState(propTabs[0]);
//   const [tabs, setTabs] = useState(propTabs);

//   const moveSelectedTabToTop = (idx) => {
//     const newTabs = [...propTabs];
//     const selectedTab = newTabs.splice(idx, 1);
//     newTabs.unshift(selectedTab[0]);
//     setTabs(newTabs);
//     setActive(newTabs[0]);
//   };

//   const [hovering, setHovering] = useState(false);

//   return (
//     <>
//       <div
//         className={cn(
//           "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar bg-indigo-200 max-w-full px-5 py-2 rounded-md mt-3 ",
//           containerClassName
//         )}>
//         {propTabs.map((tab, idx) => (
//           <button
//             key={tab.title}
//             onClick={() => {
//               moveSelectedTabToTop(idx);
//             }}
//             onMouseEnter={() => setHovering(true)}
//             onMouseLeave={() => setHovering(false)}
//             className={cn("relative px-4 py-2 rounded-full", tabClassName)}
//             style={{
//               transformStyle: "preserve-3d",
//             }}>
//             {active.value === tab.value && (
//               <motion.div
//                 layoutId="clickedbutton"
//                 transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
//                 className={cn(
//                   "absolute inset-0 bg-purple-700 rounded-full ",
//                   activeTabClassName
//                 )} />
//             )}

//             <span className="relative block text-white ">
//               {tab.title}
//             </span>
//           </button>
//         ))}
//       </div>
//       <FadeInDiv
//         tabs={tabs}
//         active={active}
//         key={active.value}
//         hovering={hovering}
//         className={cn("mt-20", contentClassName)} />
//     </>
//   );
// };

// export const FadeInDiv = ({
//   className,
//   tabs,
//   hovering
// }) => {
//   const isActive = (tab) => {
//     return tab.value === tabs[0].value;
//   };
//   return (
//     <div className="relative w-[90%] sm:w-full h-full flex justify-center ">
//       {tabs.map((tab, idx) => (
//         <motion.div
//           key={tab.value}
//           layoutId={tab.value}
//           style={{
//             scale: 1 - idx * 0.1,
//             top: hovering ? idx * -50 : 0,
//             zIndex: -idx,
//             opacity: idx < 3 ? 1 - idx * 0.1 : 0,
//           }}
//           animate={{
//             y: isActive(tab) ? [0, 40, 0] : 0,
//           }}
//           className={cn("absolute", className)}>
//           {tab.content}
//         </motion.div>
//       ))}
//     </div>
//   );
// };


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-center overflow-auto sm:overflow-visible no-scrollbar bg-indigo-100 rounded-lg px-4 py-2 gap-3 shadow-inner",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 text-sm md:text-base font-medium text-slate-800 rounded-full transition-all duration-300 hover:bg-indigo-200",
              tabClassName
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-purple-700 rounded-full shadow-md",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative z-10 text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        hovering={hovering}
        key={active.value}
        className={cn("mt-10", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, hovering }) => {
  const isActive = (tab) => tab.value === tabs[0].value;

  return (
    <div className="relative w-[90%] sm:w-full h-full flex justify-center">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.07,
            top: hovering ? idx * -40 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 30, 0] : 0,
          }}
          className={cn("absolute", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
