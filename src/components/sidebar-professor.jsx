"use client"
import { Calendar,ListPlus, CalendarDays, ChevronUp, Home, Inbox, Settings, LogOut, UserCog, Send } from "lucide-react"
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
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const MotionLink = motion(Link)

const items = [
  {
    title: "Home",
    url: "/professor",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/professor/inbox",
    icon: Inbox,
  },
  {
    title: "My Courses",
    url: "/professor/courses",
    icon: Calendar,
  },
  {
    title: "timetable",
    url: "/professor/timeTable",
    icon: CalendarDays,
  },
  {
    title: "Send Message",
    url: "/professor/sendMessage",
    icon: Send,
  },
  {
    title: "Create poll",
    url: "/professor/createPoll",
    icon: ListPlus,
  },
    {
      title: "Settings",
      url: "/professor/settings",
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
  { label: "Logout", icon: LogOut, action: "signout", variant: "destructive" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen, open, isMobile } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const timeoutRef = useRef(null)
  const [ismenuitemHovered, setIsMenuItemHovered] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter();

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    if (!session?.user?.email) return 0
    try {
      const response = await fetch("/api/professor/getNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profEmail: session.user.email }),
      })
      const data = await response.json()
      if (data.success) {
        const unreadCount = data.professor.filter((item) => item.notification && item.isRead !== true).length
        return unreadCount
      }
      return 0
    } catch (error) {
      console.error("Error fetching notifications:", error)
      return 0
    }
  }

  // Load unread count when component mounts or session changes
  useEffect(() => {
    const loadUnreadCount = async () => {
      if (session?.user?.email) {
        const count = await fetchUnreadCount()
        setUnreadCount(count)
      }
    }
    loadUnreadCount()
  }, [session])

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
        router.push('/professor/settings')
        break
      case "signout":
        // Handle sign out
        signOut({ callbackUrl: "/login" })
        break
      default:
        break
    }
  }

  if (status === "loading") return <p>Loading...</p>
  console.log("session", session)
  if (!session) {
    return <p>You are not signed in</p>
  }

  return (
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
                        {item.title === "Inbox" && unreadCount > 0 && (
                          <SidebarMenuBadge className="transition-all duration-300 group-hover:scale-110">
                            {unreadCount}
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
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                        {session.user.googleProvider ? (
                          <Image alt="logo" src={session.user.image || "/placeholder.svg"} width={100} height={100} />
                        ) : (
                          <span>{session.user.username.charAt(0).toUpperCase()}</span>
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{session.user.username}</p>
                    {/* <p className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
                      Student ID: 12345
                    </p> */}
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
                        <p className="text-sm font-medium">{session.user.username}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
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
