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
//     title: "My Courses",
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
//     url: "/student/settings",
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
//   const { setOpen,open } = useSidebar()
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
//         <SidebarGroup className={"flex flex-row items-center justify-start gap-2 relative"}>
//           <Image src="/IITI_Logo.svg.png" alt="Logo" width={32} height={32} className={`rounded-full ${open?"":"realtive z-50 scale-200"}`} />
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
//         const isActive = pathname === item.url /*||(item.url !== '/' && pathname.startsWith(item.url))*/
        
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


"use client"
import { Calendar, CalendarDays, ChevronUp, Home, Inbox, Settings, LogOut, UserCog } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

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
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const MotionLink = motion(Link)

const items = [
  {
    title: "Home",
    url: "/student",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/student/inbox",
    icon: Inbox,
  },
  {
    title: "My Courses",
    url: "/student/courses",
    icon: Calendar,
  },
  {
    title: "timetable",
    url: "/student/timetable",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    url: "/student/settings",
    icon: Settings,
  },
]

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

// Animation variants for menu items
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
}

// Animation variants for chevron icon
const chevronVariants = {
  up: { rotate: 0, transition: { duration: 0.2 } },
  down: { rotate: 180, transition: { duration: 0.2 } },
}

// User menu items
const userMenuItems = [
  { label: "Account", icon: UserCog, action: "account" },
  { label: "Settings", icon: Settings, action: "settings" },
  { label: "Sign out", icon: LogOut, action: "signout", variant: "destructive" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen, open } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef(null)
  const [ismenuitemHovered, setIsMenuItemHovered] = useState(false)

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleClose = () => {
    if (!isDropdownOpen) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 100)
    }
  }

  useEffect(() => {
    if (isDropdownOpen) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [isDropdownOpen])

  // Handle user menu actions
  const handleUserMenuAction = (action) => {
    switch (action) {
      case "account":
        // Navigate to account page
        console.log("Navigate to account")
        break
      case "settings":
        // Navigate to settings page
        console.log("Navigate to settings")
        break
      case "signout":
        // Handle sign out
        console.log("Sign out user")
        break
      default:
        break
    }
  }

  return (
    <Sidebar className={"shadow-sm"} collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
      <SidebarHeader className={"mt-2"}>
        <SidebarGroup className={"flex flex-row items-center justify-start gap-2 relative group-data-[collapsible=icon]:w-12 right-2"}>
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/IITI_Logo.svg.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full w-12 h-8 object-cover"

            />
          </div>
          <motion.span
            className="text-lg font-semibold group-data-[collapsible=icon]:hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: open ? 1 : 0,
              x: open ? 0 : -10,
            }}
            transition={{
              duration: 0.3,
              delay: open ? 0.1 : 0,
              ease: "easeOut",
            }}
          >
            Manager
          </motion.span>
        </SidebarGroup>
      </SidebarHeader>

      <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url /*||(item.url !== '/' && pathname.startsWith(item.url))*/

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={"text-md"} isActive={isActive}>
                      <MotionLink
                        href={item.url}
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 },
                        }}
                        className="group"
                      >
                        <motion.div
                          whileHover={{
                            scale: isActive ? 1.2 : 1.1,
                            transition: { duration: 0.2 },
                          }}
                          animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="w-4 h-4" />
                        </motion.div>
                        <span>{item.title}</span>
                        {item.title === "Inbox" && (
                          <SidebarMenuBadge className="transition-all duration-300 group-hover:scale-110">
                            3
                          </SidebarMenuBadge>
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

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  isActive={isDropdownOpen}
                  className="group relative hover:bg-sidebar-accent/80 transition-all duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">JD</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
                      Student ID: 12345
                    </p>
                  </div>
                  <motion.div
                    animate={isDropdownOpen ? "up" : "down"}
                    variants={chevronVariants}
                    className="group-data-[collapsible=icon]:hidden"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </motion.div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isDropdownOpen && (
                  <DropdownMenuContent
                    side="right"
                    sideOffset={8}
                    align="end"
                    className="w-56"
                    asChild
                    forceMount
                    onMouseEnter={handleOpen}
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-border/50">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@iiti.ac.in</p>
                      </div>

                      {userMenuItems.map((item, index) => (
                        <div key={item.label}>
                          {item.action === "signout" && <DropdownMenuSeparator className="my-1" />}
                          <DropdownMenuItem asChild>
                            <motion.button
                              className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors duration-200 cursor-pointer focus:outline-none ${
                                item.variant === "destructive"
                                  ? "text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              }`}
                              custom={index}
                              initial="hidden"
                              animate="visible"
                              variants={itemVariants}
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleUserMenuAction(item.action)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </motion.button>
                          </DropdownMenuItem>
                        </div>
                      ))}
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
