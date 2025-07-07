"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Logged in successfully",
      description: "Welcome back!",
      duration: 3000,
      className: "bg-green-50 border-green-200 text-green-800",
    })
  }, [toast])

  return <div>hello student</div>
}
