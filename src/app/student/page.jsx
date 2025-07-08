"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  HiAcademicCap,
  HiCalendar,
  HiOutlineMail,
  HiCog,
  HiBookOpen,
  HiChevronRight,
  HiStar,
  HiTrendingUp,
  HiLightBulb,
  HiHeart,
  HiSparkles,
  HiGlobe,
} from "react-icons/hi"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data - replace with your actual data
const studentData = {
  name: "Alex Johnson",
  coursesEnrolled: 4,
  unreadMessages: 7,
}

const quickActions = [
  {
    id: 1,
    title: "View All Courses",
    description: "Access your enrolled courses",
    icon: HiAcademicCap,
    color: "bg-blue-600 hover:bg-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    path: "/student/courses",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Check Inbox",
    description: "Read your messages and notifications",
    icon: HiOutlineMail,
    color: "bg-green-600 hover:bg-green-700",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badge: studentData.unreadMessages,
    path: "/student/inbox",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "View Timetable",
    description: "Check your class schedule",
    icon: HiCalendar,
    color: "bg-purple-600 hover:bg-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    path: "/student/timetable",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "Settings",
    description: "Manage your account preferences",
    icon: HiCog,
    color: "bg-gray-600 hover:bg-gray-700",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    path: "/student/settings",
    gradient: "from-gray-500 to-gray-600",
  },
]

const motivationalCards = [
  {
    id: 1,
    title: "Keep Learning!",
    message: "Every day is a new opportunity to grow and discover something amazing.",
    icon: HiLightBulb,
    gradient: "from-yellow-100 to-orange-100",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: 2,
    title: "Stay Organized",
    message: "Success comes from consistent effort and good planning.",
    icon: HiStar,
    gradient: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 3,
    title: "You're Doing Great!",
    message: "Remember to take breaks and celebrate your achievements.",
    icon: HiHeart,
    gradient: "from-pink-100 to-rose-100",
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
]

const floatingElements = [
  { id: 1, icon: HiSparkles, delay: 0, duration: 3 },
  { id: 2, icon: HiGlobe, delay: 1, duration: 4 },
  { id: 3, icon: HiStar, delay: 2, duration: 3.5 },
]

export default function DashboardHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) / 50)
        y.set((e.clientY - centerY) / 50)
      }
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-hidden relative"
    >
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            x,
            y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-sky-500/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute hidden sm:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + element.id * 25}%`,
              top: `${30 + element.id * 20}%`,
            }}
          >
            <element.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/30" />
          </motion.div>
        ))}
      </div>

      <motion.div className="relative z-10 p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-screen" style={{ y: backgroundY }}>
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Enhanced Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className="text-center relative px-2 sm:px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center px-3 py-2 sm:px-4 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-600 text-xs sm:text-sm mb-3 sm:mb-4 border border-blue-200/50"
            >
              <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-pulse" />
              Campus Sync Dashboard
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 px-2"
              style={{ y: textY }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent bg-300% animate-gradient">
                {getGreeting()}, {studentData.name}! 👋
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to Campus Sync
            </motion.p>

            <motion.p
              className="text-gray-500 text-xs sm:text-sm mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0"
          >
            {[
              {
                label: "Enrolled Courses",
                value: studentData.coursesEnrolled,
                icon: HiBookOpen,
                color: "blue",
                trend: "Active this semester",
              },
              {
                label: "Unread Messages",
                value: studentData.unreadMessages,
                icon: HiOutlineMail,
                color: "orange",
                trend: "Needs attention",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <CardContent className="p-4 sm:p-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <motion.p
                          className="text-xs sm:text-sm text-gray-600 mb-1 truncate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {stat.label}
                        </motion.p>
                        <motion.p
                          className="text-2xl sm:text-3xl font-bold text-gray-800"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        >
                          {stat.value}
                        </motion.p>
                        <motion.p
                          className={`text-xs sm:text-sm flex items-center mt-1 ${
                            stat.color === "blue" ? "text-green-600" : "text-orange-600"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                        >
                          <HiTrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{stat.trend}</span>
                        </motion.p>
                      </div>
                      <motion.div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ml-3 flex-shrink-0 ${
                          stat.color === "blue" ? "bg-blue-100" : "bg-orange-100"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <stat.icon
                          className={`h-6 w-6 sm:h-8 sm:w-8 ${
                            stat.color === "blue" ? "text-blue-600" : "text-orange-600"
                          }`}
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="px-2 sm:px-0"
          >
            <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
              <CardContent className="p-4 sm:p-6 relative z-10">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Quick Actions
                </motion.h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleNavigation(action.path)}
                        className={`w-full h-20 sm:h-24 ${action.color} text-white font-semibold transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl text-left`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <div className="flex items-center justify-between w-full relative z-10 px-1">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                            <div className={`p-2 sm:p-3 ${action.iconBg} rounded-lg sm:rounded-xl flex-shrink-0`}>
                              <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.iconColor}`} />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <p className="font-semibold text-white text-sm sm:text-base truncate">{action.title}</p>
                              <p className="text-xs sm:text-sm text-white/80 truncate">{action.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            {action.badge && (
                              <motion.span
                                className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                {action.badge}
                              </motion.span>
                            )}
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                            </motion.div>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Motivational Cards with Same Height */}
          {/* <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0"
          >
            {motivationalCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.8 + index * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  rotateY: 2,
                  transition: { duration: 0.3 },
                }}
                className="h-full"
              >
                <Card
                  className={`shadow-lg rounded-xl sm:rounded-2xl border bg-gradient-to-br ${card.gradient} backdrop-blur-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group overflow-hidden relative h-full flex flex-col`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <CardContent className="p-4 sm:p-6 text-center flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <motion.div
                        className="flex justify-center mb-3 sm:mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl">
                          <card.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${card.iconColor}`} />
                        </div>
                      </motion.div>
                      <motion.h4
                        className="font-semibold text-gray-800 mb-2 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {card.title}
                      </motion.h4>
                    </div>
                    <motion.p
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      {card.message}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Enhanced Campus Sync Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="px-2 sm:px-0"
          >
            <Card className="shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
              <CardContent className="p-4 sm:p-6 text-center relative z-10">
                <motion.h3
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  About Campus Sync
                </motion.h3>
                <motion.p
                  className="text-sm sm:text-base text-gray-600 leading-relaxed px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  Your all-in-one platform for managing your academic journey. Stay organized, connected, and focused on
                  what matters most - your education.
                </motion.p>
                <motion.div
                  className="flex justify-center mt-3 sm:mt-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <HiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                    </motion.div>
                    <span className="text-center">Making student life easier, one click at a time</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer spacing */}
          <div className="h-4 sm:h-8"></div>
        </div>
      </motion.div>
    </div>
  )
}
