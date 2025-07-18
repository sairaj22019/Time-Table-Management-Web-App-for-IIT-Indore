


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Mail,
  Calendar,
  Building,
  Hash,
  Edit3,
  Lock,
  LogOut,
  SettingsIcon,
  ChevronRight,
  Shield,
} from "lucide-react"
import { HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { signOut, useSession } from "next-auth/react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import toast, { Toaster } from "react-hot-toast"

// Add this schema after the imports
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })

// Add username schema
const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
})

export default function UserSettingsPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [activeAction, setActiveAction] = useState("")
  const [userData, setUserData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState("")

  // Password reset modal state
  const [showResetModal, setShowResetModal] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  // Username edit modal state
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!session?.user?.id) return

    try {
      setDataLoading(true)
      const response = await fetch("/api/profile/viewProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      })

      const data = await response.json()

      if (response.ok) {
        setUserData(data.profile)
        setError("")
      } else {
        setError(data.error || "Failed to fetch profile")
      }
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("Failed to fetch profile")
    } finally {
      setDataLoading(false)
    }
  }

  // Fetch data when session is available
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchUserProfile()
    }
  }, [session, status])

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handlePasswordSubmit = async () => {
    const errors = {}
    if (!passwordData.oldPassword) {
      errors.oldPassword = "Current password is required"
    }
    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters"
    }
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required"
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    setActiveAction("reset")
    setLoading(true)

    try {
      const response = await fetch("/api/profile/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowResetModal(false)
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
        setPasswordErrors({})
        toast.success("Password Updated Successfully!", {
          duration: 4000,
          style: {
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#f0fdf4",
          },
        })
      } else {
        toast.error(data.error || "Failed to reset password. Please try again.", {
          duration: 4000,
          style: {
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        })
      }
    } catch (err) {
      console.error("Error resetting password:", err)
      toast.error("Network Error: Unable to connect to server. Please check your connection and try again.", {
        duration: 5000,
        style: {
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fef2f2",
        },
      })
      setPasswordErrors({ oldPassword: "Failed to reset password" })
    } finally {
      setLoading(false)
      setActiveAction("")
    }
  }

  // Username edit functions
  const handleEditUsername = () => {
    setNewUsername(userData?.username || "")
    setShowUsernameModal(true)
    setUsernameError("")
  }

  const handleUsernameSubmit = async () => {
    // Validate username
    if (!newUsername.trim()) {
      setUsernameError("Username is required")
      return
    }
    if (newUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters")
      return
    }
    if (newUsername.length > 20) {
      setUsernameError("Username must be less than 20 characters")
      return
    }
    if (newUsername === userData?.username) {
      setUsernameError("New username must be different from current username")
      return
    }

    setActiveAction("username")
    setLoading(true)

    try {
      const response = await fetch("/api/profile/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          username: newUsername,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setUserData((prev) => ({ ...prev, username: newUsername }))
        setShowUsernameModal(false)
        setNewUsername("")
        setUsernameError("")
        toast.success(`Username Updated Successfully!`, {
          duration: 4000,
          style: {
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#eff6ff",
          },
        })
      } else {
        toast.error(data.error || "Failed to update username. Please try again.", {
          duration: 4000,
          style: {
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        })
      }
    } catch (err) {
      console.error("Error updating username:", err)
      toast.error("Network Error: Unable to connect to server. Please check your connection and try again.", {
        duration: 5000,
        style: {
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fef2f2",
        },
      })
      setUsernameError("Failed to update username")
    } finally {
      setLoading(false)
      setActiveAction("")
    }
  }

  // Update the password handling functions
  const handleResetPassword = () => {
    setShowResetModal(true)
  }

  const onPasswordSubmit = async (data) => {
    setActiveAction("reset")
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setActiveAction("")
      setShowResetModal(false)
      passwordForm.reset()
      toast.success("Password Updated Successfully!", {
        duration: 4000,
        style: {
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          color: "#166534",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#f0fdf4",
        },
      })
    }, 2000)
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  // Show loading state
  if (status === "loading" || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchUserProfile} className="bg-blue-600 hover:bg-blue-700">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  // Show login required state
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <Button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-blue-600 hover:bg-blue-700">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    )
  }

  const userDetails = [
    {
      label: "Username",
      value: userData.username,
      icon: User,
      color: "text-blue-600",
      editable: true,
    },
    {
      label: "Email",
      value: userData.email,
      icon: Mail,
      color: "text-green-600",
    },
    {
      label: "Role",
      value: userData.role.charAt(0).toUpperCase() + userData.role.slice(1),
      icon: Shield,
      color: "text-purple-600",
      badge: true,
    },
    ...(userData.role === "student"
      ? [
          {
            label: "Academic Year",
            value: userData.year,
            icon: Calendar,
            color: "text-orange-600",
          },
          {
            label: "Department",
            value: userData.department.toUpperCase(),
            icon: Building,
            color: "text-indigo-600",
          },
          {
            label: "Roll Number",
            value: userData.rollno,
            icon: Hash,
            color: "text-red-600",
          },
        ]
      : []),
    ...(userData.role === "professor"
      ? [
          {
            label: "Department",
            value: userData.department,
            icon: Building,
            color: "text-indigo-600",
          },
        ]
      : []),
  ]

  // Remove Edit Profile from settings actions
  const settingsActions = [
    {
      title: "Reset Password",
      description: "Change your account password for security",
      icon: Lock,
      color: "bg-teal-500 hover:bg-teal-600",
      action: handleResetPassword,
      actionKey: "reset",
    },
    {
      title: "Logout",
      description: "Sign out of your account securely",
      icon: LogOut,
      color: "bg-red-500 hover:bg-red-600",
      action: handleLogout,
      actionKey: "logout",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 ">
      {/* <SidebarTrigger /> */}
      <main className="px-2 sm:px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-lg overflow-visible">
            <CardContent className="py-6 sm:py-12 px-4 sm:px-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <SettingsIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
                    Account Settings
                  </h1>
                </div>
                <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl px-2">
                  Manage your account information and preferences. Keep your details up to date for the best experience.
                </p>
              </motion.div>

              {/* User Details Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 mb-6 sm:mb-8 border-b-2 border-blue-100">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    1
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Profile Information</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                  {userDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="group p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div
                          className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors flex-shrink-0`}
                        >
                          <detail.icon
                            className={`w-4 h-4 sm:w-6 sm:h-6 ${detail.color} group-hover:scale-110 transition-transform`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            {detail.label}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {detail.badge ? (
                              <Badge
                                variant="secondary"
                                className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs sm:text-sm"
                              >
                                {detail.value}
                              </Badge>
                            ) : (
                              <p className="text-sm sm:text-base md:text-base font-bold text-gray-800 pl-1">
                                {detail.value}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Add edit button for username */}
                        {detail.editable && (
                          <button
                            onClick={handleEditUsername}
                            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors"
                          >
                            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <Separator className="my-6 sm:my-8" />

              {/* Settings Actions Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b-2 border-blue-100">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    2
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Account Actions</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {settingsActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group"
                    >
                      <Card className="h-full border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                        <CardContent className="px-4 py-0 sm:px-6 sm:py-0 h-full flex flex-col">
                          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                            <div
                              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${action.color.split(" ")[0]} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                            >
                              <action.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {action.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-1 leading-relaxed">
                            {action.description}
                          </p>
                          <Button
                            onClick={action.action}
                            disabled={loading}
                            className={`w-full h-10 sm:h-12 ${action.color} text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group-hover:scale-105 text-sm sm:text-base`}
                          >
                            <AnimatePresence mode="wait">
                              {loading && activeAction === action.actionKey ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-1 sm:gap-2"
                                >
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-xs sm:text-sm">Processing...</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-1 sm:gap-2"
                                >
                                  <span className="text-xs sm:text-sm">{action.title}</span>
                                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 sm:mt-12 pt-4 sm:pt-8 border-t-2 border-gray-200 text-center"
              >
                <p className="text-xs sm:text-sm text-gray-500 px-2">
                  Need help? Contact support at{" "}
                  <a
                    href="mailto:support@university.edu"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all"
                  >
                    support@university.edu
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Username Edit Modal */}
        <Dialog open={showUsernameModal} onOpenChange={setShowUsernameModal}>
          <DialogContent className="w-[95vw] max-w-md mx-auto shadow-2xl rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-lg">
            <DialogHeader className="space-y-2 sm:space-y-3 px-2">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center">
                Edit Username
              </DialogTitle>
              <p className="text-xs sm:text-sm text-gray-600 text-center px-2">Enter your new username below</p>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="newUsername" className="text-sm font-semibold text-gray-700">
                  Username *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    id="newUsername"
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value)
                      if (usernameError) setUsernameError("")
                    }}
                    className={`h-10 sm:h-12 pl-10 sm:pl-12 border-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${
                      usernameError ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder="Enter your new username"
                  />
                </div>
                {usernameError && <p className="text-xs sm:text-sm text-red-600">{usernameError}</p>}
                <p className="text-xs text-gray-500">Username must be 3-20 characters long</p>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleUsernameSubmit}
                  disabled={loading && activeAction === "username"}
                  className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {loading && activeAction === "username" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs sm:text-sm">Updating...</span>
                    </div>
                  ) : (
                    "Update Username"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowUsernameModal(false)
                    setNewUsername("")
                    setUsernameError("")
                  }}
                  variant="outline"
                  className="w-full h-10 sm:h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-colors text-sm sm:text-base"
                  disabled={loading && activeAction === "username"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Password Reset Modal */}
        <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
          <DialogContent className="w-[95vw] max-w-md mx-auto shadow-2xl rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-lg">
            <DialogHeader className="space-y-2 sm:space-y-3 px-2">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center">
                Reset Password
              </DialogTitle>
              <p className="text-xs sm:text-sm text-gray-600 text-center px-2">
                Enter your current password and choose a new secure password
              </p>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-sm font-semibold text-gray-700">
                  Current Password *
                </Label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    id="oldPassword"
                    type={showPasswords.old ? "text" : "password"}
                    value={passwordData.oldPassword}
                    onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                    className={`h-10 sm:h-12 pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${
                      passwordErrors.oldPassword ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("old")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.old ? (
                      <HiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.oldPassword && (
                  <p className="text-xs sm:text-sm text-red-600">{passwordErrors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                  New Password *
                </Label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    className={`h-10 sm:h-12 pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${
                      passwordErrors.newPassword ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <HiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-xs sm:text-sm text-red-600">{passwordErrors.newPassword}</p>
                )}
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                  Confirm New Password *
                </Label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    className={`h-10 sm:h-12 pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${
                      passwordErrors.confirmPassword ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <HiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-xs sm:text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handlePasswordSubmit}
                  disabled={loading && activeAction === "reset"}
                  className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {loading && activeAction === "reset" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs sm:text-sm">Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowResetModal(false)
                    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
                    setPasswordErrors({})
                  }}
                  variant="outline"
                  className="w-full h-10 sm:h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-colors text-sm sm:text-base"
                  disabled={loading && activeAction === "reset"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#374151",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      />
    </div>
  )
}
