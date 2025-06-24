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
import TimetablePage from "@/app/admin/createGrid/page"
const MotionLink = motion(Link)

const items = [
  { title: "Home", url: "/admin", icon: Home },
  { title: "Inbox", url: "/admin/inbox", icon: Inbox },
  { title: "allCourses", url: "/admin/courses", icon: Calendar },
  { title: "createcourse", url: "/admin/createCourse", icon: CalendarDays },
  { title: "createGrid", url: "/admin/createGrid", icon: Calendar },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

const chevronVariants = {
  up: { rotate: 0 },
  down: { rotate: 180 }
}

export function AppSidebar() {
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()
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
    <Sidebar className={"shadow-sm"} collapsible="icon" onMouseLeave={handleClose} onMouseEnter={handleOpen}>
          <SidebarHeader className={"mt-2"}>
            <SidebarGroup className={"flex flex-row items-center justify-start gap-2 relative group-data-[collapsible=icon]:w-12 right-2"}>
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/Bg_abinandhan.jpg"
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
                Campus Sync
              </motion.span>
            </SidebarGroup>
          </SidebarHeader>
            
          <div className="h-[1px] bg-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>
    
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = pathname === item.url /*||(item.url !== '/' && pathname.startsWith(item.url))*/
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