
"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Calendar,
  Users,
  Bell,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardTitle } from "@/components/ui/card"

export default function EnhancedLandingPage() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const dashboards = [
    {
      title: "Admin Dashboard",
      img: "/admin.png",
      desc: "Manage courses, assign rooms, resolve conflicts, and approve change requests with powerful analytics.",
      features: ["Course Management", "Room Assignment", "Conflict Resolution", "Analytics Dashboard"],
    },
    {
      title: "Student Dashboard",
      img: "/student.png",
      desc: "View personalized schedules, receive live updates, and participate in interactive polls.",
      features: ["Personal Schedule", "Live Updates", "Interactive Polls", "Mobile Sync"],
    },
    {
      title: "Professor Dashboard",
      img: "/professor.png",
      desc: "Propose schedule changes, conduct class polls, and manage academic events seamlessly.",
      features: ["Schedule Proposals", "Class Polls", "Event Management", "Student Analytics"],
    },
  ]

  const stats = [
    { number: "2000+", label: "Active Users", icon: Users },
    { number: "50+", label: "Departments", icon: Calendar },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Clock },
  ]

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Enhanced Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-6xl"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                CampusSync
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 text-gray-600">
              <Link href="#features" className="hover:text-blue-600 transition-colors">
                Features
              </Link>
              
              <Link href="#dashboard" className="hover:text-blue-600 transition-colors">
                Dashboards
              </Link>
            </div>

            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-100 rounded-xl">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="pt-48" />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm mb-6 border border-blue-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Trusted by 2000+ Students & Faculty
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Smart Scheduling
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Transform your academic scheduling experience with AI-powered conflict detection, real-time updates, and
              seamless collaboration across your entire campus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-sky-200/30 rounded-3xl blur-3xl transform rotate-6" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl">
                <Image
                  src="/bg.jpeg"
                  alt="CampusSync Dashboard Preview"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  Live Updates
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Stats Section */}
      

      {/* Enhanced Dashboards Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Powerful Dashboards for Every Role
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience tailored interfaces designed specifically for students, professors, and administrators
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {dashboards.map((dashboard, index) => (
                <CarouselItem key={index} className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-blue-300 transition-all duration-500 group-hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                      <div className="relative h-96 lg:h-[500px]">
                        <Image
                          src={dashboard.img || "/placeholder.svg"}
                          alt={dashboard.title}
                          fill
                          className="object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <CardTitle className="text-3xl font-bold text-white mb-4">{dashboard.title}</CardTitle>
                          <p className="text-gray-200 text-lg mb-6 max-w-2xl">{dashboard.desc}</p>

                          <div className="grid grid-cols-2 gap-3">
                            {dashboard.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-xl border-gray-200 text-gray-700 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 backdrop-blur-xl border-gray-200 text-gray-700 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      

      

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              CampusSync
            </span>
          </div>
          <p className="text-gray-600 mb-4">Empowering academic institutions with smart scheduling solutions</p>
          <div className="flex justify-center space-x-6 text-gray-500">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact Support
            </Link>
            
          </div>
        </div>
      </footer>
    </div>
  )
}

