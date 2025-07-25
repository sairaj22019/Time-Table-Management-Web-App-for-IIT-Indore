

// "use client"
// import { Calendar, CalendarDays, ChevronUp, Home, Inbox, Settings, LogOut, UserCog, GraduationCap, CalendarPlus, BookPlus, Users } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import Link from "next/link"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuBadge,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import { HiAcademicCap } from "react-icons/hi"
// import { signOut, useSession } from "next-auth/react"

// const MotionLink = motion(Link)

// const items = [
//   {
//     title: "Home",
//     url: "/admin",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "/admin/inbox",
//     icon: Inbox,
//   },
//   {
//     title: "all Courses",
//     url: "/admin/courses",
//     icon: GraduationCap,
//   },
//   {
//     title: "Create Grid",
//     url: "/admin/grid",
//     icon: CalendarPlus,
//   },
//   {
//     title: "Create Course",
//     url: "/admin/createCourses",
//     icon: BookPlus,
//   },
//   {
//     title: "View Users",
//     url: "/admin/viewUsers",
//     icon: Users,
//   },
//   {
//     title: "View Grids",
//     url: "/admin/viewGrids",
//     icon: Users,
//   },
//   {
//     title: "Approve Polls",
//     url: "/admin/approvePolls",
//     icon: Users,
//   },
//   {
//     title: "Send Message",
//     url: "/admin/sendMessage",
//     icon: Users,
//   },

// ]

// const dropdownVariants = {
//   hidden: {
//     opacity: 0,
//     y: -5,
//     scale: 0.95,
//     transition: {
//       duration: 0.2,
//       ease: "easeOut",
//     },
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
// }

// // Animation variants for menu items
// const itemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: (i) => ({
//     opacity: 1,
//     x: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.2,
//     },
//   }),
// }

// // Animation variants for chevron icon
// const chevronVariants = {
//   up: { rotate: 0, transition: { duration: 0.2 } },
//   down: { rotate: 180, transition: { duration: 0.2 } },
// }

// // User menu items
// const userMenuItems = [
//   // { label: "Account", icon: UserCog, action: "account" },
//   // { label: "Settings", icon: Settings, action: "settings" },
//   { label: "Logout", icon: LogOut, action: "signout", variant: "destructive" },
// ]

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { setOpen, open, isMobile } = useSidebar()
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
//       handleOpen()
//     } else {
//       handleClose()
//     }
//   }, [isDropdownOpen])

//   // Handle user menu actions
//   const handleUserMenuAction = (action) => {
//     switch (action) {
//       case "account":
//         // Navigate to account page
//         console.log("Navigate to account")
//         break
//       case "settings":
//         // Navigate to settings page
//         console.log("Navigate to settings")
//         break
//       case "signout":
//         // Handle sign out
//         console.log("signout")
//         signOut({ callbackUrl: '/login' })
//         break
//       default:
//         break
//     }
//   }

//   const { data: session, status } = useSession();
//       if (status === 'loading') return <p>Loading...</p>
//       console.log("session",session)
//       if (!session){ return <p>You are not signed in</p>}
  

//   return (
//     <Sidebar className={"shadow-sm"} collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
//       <SidebarHeader className={"mt-2"}>
//         <SidebarGroup className={"flex flex-row items-center justify-start gap-2 relative group-data-[collapsible=icon]:w-12 right-2"}>
//           <div className="w-8 h-8 flex items-center justify-center">
//             <Image
//               src="/IITI_Logo.svg.png"
//               alt="Logo"
//               width={32}
//               height={32}
//               className="rounded-full w-12 h-8 object-cover"

//             />
//           </div>
//           <motion.span
//             className="text-lg font-semibold group-data-[collapsible=icon]:hidden"
//             initial={{ opacity: 0, x: -10 }}
//             animate={{
//               opacity: (open || isMobile) ? 1 : 0,
//               x: (open || isMobile) ? 0 : -10,
//             }}
//             transition={{
//               duration: 0.3,
//               delay: open ? 0.1 : 0,
//               ease: "easeOut",
//             }}
//           >
//             Manager
//           </motion.span>
//         </SidebarGroup>
//       </SidebarHeader>
        
//       <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => {
//                 const isActive = pathname === item.url /*||(item.url !== '/' && pathname.startsWith(item.url))*/

//                 return (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild className={"text-md"} isActive={isActive}>
//                       <MotionLink
//                         href={item.url}
//                         whileHover={{
//                           x: 5,
//                           transition: { duration: 0.2 },
//                         }}
//                         className="group"
//                       >
//                         <motion.div
//                           whileHover={{
//                             scale: isActive ? 1.2 : 1.1,
//                             transition: { duration: 0.2 },
//                           }}
//                           animate={isActive ? { scale: 1.2 } : { scale: 1 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <item.icon className="w-4 h-4" />
//                         </motion.div>
//                         <span>{item.title}</span>
//                         {item.title === "Inbox" && (
//                           <SidebarMenuBadge className="transition-all duration-300 group-hover:scale-110">
//                             3
//                           </SidebarMenuBadge>
//                         )}
//                       </MotionLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 )
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="p-2">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton
//                   isActive={isDropdownOpen}
//                   className="group relative hover:bg-sidebar-accent/80 transition-all duration-200"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                     className="flex items-center justify-center"
//                   >
//                     <Avatar className="w-6 h-6">
//                       <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
//                       <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
//                       <Image alt="logo" src={session.user.image} width={100} height={100}/>
//                       </AvatarFallback>
//                     </Avatar>
//                   </motion.div>
//                   <div className="flex-1 text-left">
//                     <p className="text-sm font-medium">{session.user.name}</p>
//                     {/* <p className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
//                       Student ID: 12345
//                     </p> */}
//                   </div>
//                   <motion.div
//                     animate={isDropdownOpen ? "up" : "down"}
//                     variants={chevronVariants}
//                     className="group-data-[collapsible=icon]:hidden"
//                   >
//                     <ChevronUp className="w-4 h-4" />
//                   </motion.div>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>

//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <DropdownMenuContent
//                     side={isMobile? "top" : "right"}
//                     sideOffset={8}
//                     align="end"
//                     className="w-56"
//                     asChild
//                     forceMount
//                     onMouseEnter={handleOpen}
//                   >
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       variants={dropdownVariants}
//                       className="bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg overflow-hidden"
//                     >
//                       <div className="px-3 py-2 border-b border-border/50">
//                         <p className="text-sm font-medium">{session.user.email}</p>
//                         <p className="text-xs text-muted-foreground">{session.user.name}</p>
//                       </div>

//                       {userMenuItems.map((item, index) => (
//                         <div key={item.label}>
//                           {item.action === "signout" && <DropdownMenuSeparator className="my-1" />}
//                           <DropdownMenuItem asChild>
//                             <motion.button
//                               className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors duration-200 cursor-pointer focus:outline-none ${
//                                 item.variant === "destructive"
//                                   ? "text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/20"
//                                   : "hover:bg-accent hover:text-accent-foreground"
//                               }`}
//                               custom={index}
//                               initial="hidden"
//                               animate="visible"
//                               variants={itemVariants}
//                               whileHover={{ x: 2 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={() => handleUserMenuAction(item.action)}
//                             >
//                               <item.icon className="w-4 h-4" />
//                               <span>{item.label}</span>
//                             </motion.button>
//                           </DropdownMenuItem>
//                         </div>
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

// export default AppSidebar



"use client"

import { ChevronUp, Home, ClipboardCheck , CalendarSearch, Send, LogOut, GraduationCap, CalendarPlus, BookPlus, Users, UserPlus, MapPinHouse } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

const MotionLink = motion(Link)

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "all Courses",
    url: "/admin/courses",
    icon: GraduationCap,
  },
  {
    title: "Create Grid",
    url: "/admin/grid",
    icon: CalendarPlus,
  },
  {
    title: "Create Course",
    url: "/admin/createCourses",
    icon: BookPlus,
  },
  {
    title: "View Users",
    url: "/admin/viewUsers",
    icon: Users,
  },
  {
    title: "View Grids",
    url: "/admin/viewGrids",
    icon: CalendarSearch,
  },
  {
    title: "Approve Polls",
    url: "/admin/approvePolls",
    icon: ClipboardCheck ,
  },
  {
    title: "Send Message",
    url: "/admin/sendMessage",
    icon: Send,
  },
  {
    title: "View Room Vacancy",
    url: "/admin/viewFreeSlots",
    icon: MapPinHouse,
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

// Popup animation variants
const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

// User menu items
const userMenuItems = [
  { label: "Add Admin", icon: UserPlus, action: "addadmin" },
  { label: "Logout", icon: LogOut, action: "signout", variant: "destructive" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen, open, isMobile } = useSidebar()
  const { toast } = useToast()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [pendingEmail, setPendingEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

  // API call to add admin
  const addAdminAPI = async (email) => {
    try {
      const response = await fetch("/api/admin/addAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add admin")
      }

      return data
    } catch (error) {
      throw error
    }
  }

  // Handle popup submit
  const handlePopupSubmit = (e) => {
    e.preventDefault()
    if (adminEmail.trim()) {
      setPendingEmail(adminEmail)
      setIsPopupOpen(false)
      setIsConfirmationOpen(true)
    }
  }

  // Handle confirmation
  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      setIsLoading(true)
      try {
        const result = await addAdminAPI(pendingEmail)

        // Success
        toast({
          title: "Success!",
          description: `Admin access granted to ${pendingEmail}`,
          variant: "default",
        })

        console.log("Admin access granted to:", pendingEmail, result)

        // Reset states
        setAdminEmail("")
        setPendingEmail("")
        setIsConfirmationOpen(false)
        setIsDropdownOpen(false)
      } catch (error) {
        // Error handling
        toast({
          title: "Error",
          description: error.message || "Failed to add admin. Please try again.",
          variant: "destructive",
        })
        alert("No user exists with this email")
        console.error("Error adding admin:", error)

        // Keep the confirmation dialog open so user can try again
        // Or optionally close it and reopen the form
        setIsConfirmationOpen(false)
        setIsPopupOpen(true)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsConfirmationOpen(false)
      setIsPopupOpen(true) // Reopen the form popup
    }
  }

  // Handle user menu actions
  const handleUserMenuAction = (action) => {
    switch (action) {
      case "addadmin":
        setIsPopupOpen(true)
        setIsDropdownOpen(false)
        break
      case "account":
        console.log("Navigate to account")
        break
      case "settings":
        console.log("Navigate to settings")
        break
      case "signout":
        console.log("signout")
        signOut({ callbackUrl: "/login" })
        break
      default:
        break
    }
  }

  const { data: session, status } = useSession()

  if (status === "loading") return 

  console.log("session", session)

  if (!session) {
    return <p>You are not signed in</p>
  }

  

  return (
    <>
      <Sidebar className={"shadow-sm"} collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
        <SidebarHeader className={"mt-2"}>
          <SidebarGroup
            className={
              "flex flex-row items-center justify-start gap-2 relative group-data-[collapsible=icon]:w-12 right-2"
            }
          >
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
                opacity: open || isMobile ? 1 : 0,
                x: open || isMobile ? 0 : -10,
              }}
              transition={{
                duration: 0.3,
                delay: open ? 0.1 : 0,
                ease: "easeOut",
              }}
            >
              Campus Sync
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
                  const isActive = pathname === item.url
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
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                          <span>A</span>
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">Administrator</p>
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
                      side={isMobile ? "top" : "right"}
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
                          <p className="text-sm font-medium">Administrator</p>
                          <p className="text-xs text-muted-foreground">{session.user.email}</p>
                        </div>
                        {userMenuItems.map((item, index) => (
                          <div key={item.label}>
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

      {/* Add Admin Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popupVariants}
              className="bg-background border border-border rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Add Admin Access</h2>
              <form onSubmit={handlePopupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsPopupOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {isConfirmationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => !isLoading && handleConfirmation(false)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popupVariants}
              className="bg-background border border-border rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Confirm Admin Access</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to give admin access to{" "}
                <span className="font-medium text-foreground">{pendingEmail}</span>?
              </p>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => handleConfirmation(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => handleConfirmation(true)} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Yes, Grant Access"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AppSidebar


