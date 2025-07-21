"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Edit3, MessageCircle, Send } from "lucide-react"

export default function AdminSendMessage() {
  const [messageTitle, setMessageTitle] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!messageTitle.trim() || !messageContent.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/admin/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminEmail: "admin@example.com", // Replace this with dynamic data if needed
          message: messageContent,
          messageTitle: messageTitle,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // alert("✅ Message sent successfully!")
        
        setMessageTitle("")
        setMessageContent("")
      } else {
        // alert(`❌ Failed to send message: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    //   alert("❌ An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg"><MessageCircle /></span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Send Message</h1>
            <p className="text-gray-600">Compose and send a message to all users</p>
          </div>
        </motion.div>

        {/* Message Form */}
        <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md">
          <CardHeader className="pb-0 ">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Message Details</h2>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 py-6 px-8  pt-0">
            {/* Message Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="message-title" className="text-sm font-medium text-gray-700">
                Message Title
              </Label>
              <Input
                id="message-title"
                placeholder="Enter a clear, descriptive title..."
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </motion.div>

            {/* Message Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="message-content" className="text-sm font-medium text-gray-700">
                Message Content
              </Label>
              <Textarea
                id="message-content"
                placeholder="Write your message here... Be clear and concise."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[200px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-sm text-gray-500">{messageContent.length} characters</div>
            </motion.div>

            {/* Send Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={handleSendMessage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold transition-all duration-150 shadow-lg"
                disabled={!messageTitle.trim() || !messageContent.trim() || loading}
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
