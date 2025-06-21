// 'use client'
// import { Calendar, CalendarDays, ChevronDown, ChevronUp, Home, HomeIcon, Inbox, Search, Settings, User2 } from "lucide-react"

// import {
//   Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
//   SidebarSeparator,
//   useSidebar
// } from "@/components/ui/sidebar"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// const items = [
//   {
//     title: "Home",
//     url: "/home",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "/inbox",
//     icon: Inbox,
//   },
//   {
//     title: "Courses",
//     url: "/courses",
//     icon: Calendar,
//   },
//   {
//     title: "timetable",
//     url: "/timetable",
//     icon: CalendarDays,
//   },
//   {
//     title: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ]

// export function AppSidebar() {
//   const { setOpen } = useSidebar()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const timeoutRef = useRef(null)

//   const handleOpen = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current)
//     setOpen(true)
//   }
//   const handleClose = () => {
//     if (!isDropdownOpen) {
//       timeoutRef.current = setTimeout(() => {
//         setOpen(false)
//       }, 100)
//     }
//   }
//   useEffect(() => {
//     if (isDropdownOpen) {
//       handleOpen();
//     } else {
//       handleClose();
//     }
//   }, [isDropdownOpen])


//   return (
//     <Sidebar collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
//       <SidebarHeader className={'mt-2'}>
//         <SidebarGroup className={"flex flex-row items-center justify-start gap-2"}>
//           <Image src="/IITI_Logo.svg.png" alt="Logo" width={32} height={32} className="rounded-full w-8 h-8 " />
//           <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Manager</span>
//         </SidebarGroup>
//       </SidebarHeader>
//       <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild >
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                       {item.title === "Inbox" && <SidebarMenuBadge>3</SidebarMenuBadge>}
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}

//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu open={isDropdownOpen} onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton>
//                   <User2 /> Username
//                   <ChevronUp className="ml-auto" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 side="right"
//                 sideOffset={4}
//                 className="w-[--radix-popper-anchor-width] border px-2 py-2 my-2 relative z-50 bg-slate-50 rounded-md shadow-lg" onMouseEnter={handleOpen}
//               >
//                 <DropdownMenuItem>
//                   <span>Account</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <span>settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <span>Sign out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//     </Sidebar>
//   )
// }

// export default AppSidebar;


// 'use client'
// import { Calendar, CalendarDays, ChevronDown, ChevronUp, Home, HomeIcon, Inbox, Search, Settings, User2 } from "lucide-react"

// import {
//   Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
//   SidebarSeparator,
//   useSidebar
// } from "@/components/ui/sidebar"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// const items = [
//   {
//     title: "Home",
//     url: "/home",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "/inbox",
//     icon: Inbox,
//   },
//   {
//     title: "Courses",
//     url: "/courses",
//     icon: Calendar,
//   },
//   {
//     title: "timetable",
//     url: "/timetable",
//     icon: CalendarDays,
//   },
//   {
//     title: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ]

// export function AppSidebar() {
//   const { setOpen } = useSidebar()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const timeoutRef = useRef(null)

//   const handleOpen = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current)
//     setOpen(true)
//   }
//   const handleClose = () => {
//     if (!isDropdownOpen) {
//       timeoutRef.current = setTimeout(() => {
//         setOpen(false)
//       }, 100)
//     }
//   }
//   useEffect(() => {
//     if (isDropdownOpen) {
//       handleOpen();
//     } else {
//       handleClose();
//     }
//   }, [isDropdownOpen])


//   return (
//     <Sidebar collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
//       <SidebarHeader className={'mt-2'}>
//         <SidebarGroup className={"flex flex-row items-center justify-start gap-2"}>
//           <Image src="/IITI_Logo.svg.png" alt="Logo" width={32} height={32} className="rounded-full w-8 h-8 " />
//           <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Manager</span>
//         </SidebarGroup>
//       </SidebarHeader>
//       <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild >
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                       {item.title === "Inbox" && <SidebarMenuBadge>3</SidebarMenuBadge>}
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}

//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu open={isDropdownOpen} onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton>
//                   <User2 /> Username
//                   <ChevronUp className="ml-auto" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 side="right"
//                 sideOffset={4}
//                 className="w-[--radix-popper-anchor-width] border px-2 py-2 my-2 relative z-50 bg-slate-50 rounded-md shadow-lg" onMouseEnter={handleOpen}
//               >
//                 <DropdownMenuItem>
//                   <span>Account</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <span>Sign out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//     </Sidebar>
//   )
// }

// export default AppSidebar;


// 'use client'
// import { Calendar, CalendarDays, ChevronDown, ChevronUp, Home, HomeIcon, Inbox, Search, Settings, User2 } from "lucide-react"
// import { motion, AnimatePresence, inView, scale } from "framer-motion"
// import Link from 'next/link'

// import {
//   Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
//   SidebarSeparator,
//   useSidebar
// } from "@/components/ui/sidebar"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { usePathname } from 'next/navigation'

// const MotionLink = motion(Link)


// const items = [
//   {
//     title: "Home",
//     url: "/student",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "/student/inbox",
//     icon: Inbox,
//   },
//   {
//     title: "Courses",
//     url: "/student/courses",
//     icon: Calendar,
//   },
//   {
//     title: "timetable",
//     url: "/student/timetable",
//     icon: CalendarDays,
//   },
//   {
//     title: "Settings",
//     url: "student/settings",
//     icon: Settings,
//   },
// ]

// const dropdownVariants = {
//   hidden: {
//     opacity: 0,
//     y: -5,
//     scale: 0.95,
//     transition: {
//       duration: 0.2,
//       ease: "easeOut"
//     }
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut"
//     }
//   }
// };

// // Animation variants for menu items
// const itemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: i => ({
//     opacity: 1,
//     x: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.2
//     }
//   })
// };

// // Animation variants for chevron icon
// const chevronVariants = {
//   up: { rotate: 0, transition: { duration: 0.2 } },
//   down: { rotate: 180, transition: { duration: 0.2 } }
// };

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { setOpen } = useSidebar()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const timeoutRef = useRef(null)
//   const [ismenuitemHovered, setIsMenuItemHovered] = useState(false)

//   const handleOpen = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current)
//     setOpen(true)
//   }

//   const handleClose = () => {
//     if (!isDropdownOpen) {
//       timeoutRef.current = setTimeout(() => {
//         setOpen(false)
//       }, 100)
//     }
//   }

//   useEffect(() => {
//     if (isDropdownOpen) {
//       handleOpen();
//     } else {
//       handleClose();
//     }
//   }, [isDropdownOpen])

//   return (
//     <Sidebar className={"shadow-sm"} collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>

//       <SidebarHeader className={'mt-2'}>
//         <SidebarGroup className={"flex flex-row items-center justify-start gap-2"}>
//           <Image src="/IITI_Logo.svg.png" alt="Logo" width={32} height={32} className="rounded-full " />
//           <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Manager</span>
//         </SidebarGroup>
//       </SidebarHeader>

//       <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//       {items.map((item) => {
//         const isActive = pathname === item.url /* ||(item.url !== '/' && pathname.startsWith(item.url)) */
        
//         return (
//           <SidebarMenuItem key={item.title}>
//             <SidebarMenuButton 
//               asChild 
//               className={"text-md"}
//               isActive={isActive} 
//             >
//               <MotionLink
//                 href={item.url}
//                 whileHover={{
//                   x: 5,
//                   transition: { duration: 0.2 }
//                 }}
//                 className="group"
//               >
//                 <motion.div
//                   whileHover={{
//                     scale: isActive ? 1.2 : 1.1,
//                     transition: { duration: 0.2 }
//                   }}
//                   animate={isActive ? { scale: 1.2 } : { scale: 1 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <item.icon className="w-4 h-4" />
//                 </motion.div>
//                 <span>{item.title}</span>
//                 {item.title === "Inbox" && (
//                   <SidebarMenuBadge className="transition-all duration-300 group-hover:scale-110">
//                     3
//                   </SidebarMenuBadge>
//                 )}
//               </MotionLink>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         )
//       })}
//     </SidebarMenu>

//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton isActive={isDropdownOpen} className="relative group">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <User2 className="transition-transform duration-300 ease-in-out w-4 h-4" />
//                   </motion.div>
//                   <span className="flex-1">Username</span>
//                   <motion.div
//                     animate={isDropdownOpen ? "up" : "down"}
//                     variants={chevronVariants}
//                   >
//                     <ChevronUp className="ml-auto w-4 h-4" />
//                   </motion.div>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <DropdownMenuContent
//                     side="right"
//                     sideOffset={4}
//                     asChild
//                     forceMount
//                     className="w-[--radix-popper-anchor-width] relative z-50"
//                     onMouseEnter={handleOpen}
//                     onCloseAutoFocus={e => e.preventDefault()}
//                   >
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       variants={dropdownVariants}
//                       className="border px-2 py-2 my-2 bg-white/90 backdrop-blur-md rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1)] overflow-hidden border-slate-200/80"
//                     >
//                       {['Account', 'Settings', 'Sign out'].map((item, i) => (
//                         <DropdownMenuItem key={item} asChild>
//                           <motion.button
//                             className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100/80 transition-colors duration-200 cursor-pointer flex items-center gap-2 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-0 focus:border-0 border-0 hover:border-0"
//                             custom={i}
//                             initial="hidden"
//                             animate="visible"
//                             variants={itemVariants}
//                             whileHover={{
//                               x: 5,
//                               backgroundColor: 'rgb(241 245 249 / 0.8)',
//                               transition: { duration: 0.15 }
//                             }}
//                             whileTap={{
//                               scale: 0.98,
//                               transition: { duration: 0.1 }
//                             }}
//                           >
//                             <span className="relative">
//                               {item}
//                               {item === 'Sign out' && (
//                                 <motion.div
//                                   className="absolute bottom-0 left-0 h-0.5 bg-red-400"
//                                   initial={{ width: 0 }}
//                                   whileHover={{ width: '100%' }}
//                                   transition={{ duration: 0.2 }}
//                                 />
//                               )}
//                             </span>
//                           </motion.button>
//                         </DropdownMenuItem>
//                       ))}
//                     </motion.div>
//                   </DropdownMenuContent>
//                 )}
//               </AnimatePresence>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

// export default AppSidebar;

'use client'

import {
  Calendar,
  CalendarDays,
  ChevronUp,
  Home,
  Inbox,
  LogOut,
  Settings,
  User2
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"

const MotionLink = motion(Link)

const items = [
  { title: "Home", url: "/student", icon: Home },
  { title: "Inbox", url: "/student/inbox", icon: Inbox },
  { title: "Courses", url: "/student/courses", icon: Calendar },
  { title: "Timetable", url: "/student/timetable", icon: CalendarDays },
  { title: "Settings", url: "/student/settings", icon: Settings },
]

const chevronVariants = {
  up: { rotate: 0 },
  down: { rotate: 180 }
}

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleClose = () => {
    if (!isDropdownOpen) {
      timeoutRef.current = setTimeout(() => setOpen(false), 100)
    }
  }

  useEffect(() => {
    isDropdownOpen ? handleOpen() : handleClose()
  }, [isDropdownOpen])

  return (
    <Sidebar
      className="shadow-xl backdrop-blur-lg bg-white/70 border-r border-gray-200"
      collapsible="icon"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {/* Header */}
      <SidebarHeader className="mt-3 mb-2">
        <SidebarGroup className="flex items-center gap-3">
          <Image src="/Bg_abinandhan.jpg" alt="Logo" width={36} height={36} className="rounded-full border" />
          <span className="text-lg font-semibold text-gray-800 group-data-[collapsible=icon]:hidden">CampusSync</span>
        </SidebarGroup>
      </SidebarHeader>

      <div className="h-[1px] bg-gray-300 mx-2 group-data-[collapsible=icon]:hidden"></div>

      {/* Main Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <MotionLink
                        href={item.url}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1.2 : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="w-5 h-5 text-gray-600" />
                        </motion.div>
                        <span>{item.title}</span>
                        {item.title === "Inbox" && (
                          <SidebarMenuBadge>3</SidebarMenuBadge>
                        )}
                      </MotionLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile Footer */}
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  isActive={isDropdownOpen}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white/40 backdrop-blur transition"
                >
                  <Image
                    src="/images/avatar.png" // ✅ your avatar image
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full border border-white shadow"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-gray-800">shadcn</span>
                    <span className="text-xs text-gray-500">m@example.com</span>
                  </div>
                  <motion.div
                    animate={isDropdownOpen ? "up" : "down"}
                    variants={chevronVariants}
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isDropdownOpen && (
                  <DropdownMenuContent
                    side="right"
                    sideOffset={4}
                    asChild
                    forceMount
                    className="relative z-50 w-56"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/90 backdrop-blur border rounded-md shadow-lg p-2"
                    >
                      <div className="flex items-center gap-3 p-2 border-b">
                        <Image
                          src="/images/avatar.png"
                          alt="User"
                          width={40}
                          height={40}
                          className="rounded-full border"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">username</p>
                          <p className="text-xs text-gray-500">m@iiti.ac.in</p>
                        </div>
                      </div>
                      {[
                        { label: "Upgrade to Pro", icon: "🚀" },
                        { label: "Account", icon: "⚙️" },
                        { label: "Billing", icon: "💳" },
                        { label: "Notifications", icon: "🔔" },
                      ].map((item) => (
                        <DropdownMenuItem key={item.label} asChild>
                          <motion.button
                            whileHover={{ x: 4, backgroundColor: "#f1f5f9" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 flex items-center gap-2"
                          >
                            <span>{item.icon}</span> {item.label}
                          </motion.button>
                        </DropdownMenuItem>
                      ))}

                      <div className="border-t my-2"></div>

                      <DropdownMenuItem asChild>
                        <motion.button
                          whileHover={{ x: 4, backgroundColor: "#fef2f2" }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </motion.button>
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar


