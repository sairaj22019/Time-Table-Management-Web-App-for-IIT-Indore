
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MapPin, Clock, AlertTriangle } from "lucide-react"

export default function SlotRoomPopup({
  buttonText = "Add Slot",
  dialogTitle = "Add New Slot",
  dialogDescription = "Enter the slot name and room details below.",
  onSubmit,
  buttonVariant = "default",
  buttonSize = "default",
  buttonIcon = <Plus className="w-4 h-4" />,
}) {
  const [open, setOpen] = useState(false)
  const [slotName, setSlotName] = useState("")
  const [roomName, setRoomName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!slotName.trim() || !roomName.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        slotName: slotName.trim().toUpperCase(),
        roomName: roomName.trim().toUpperCase(),
      })

      setSlotName("")
      setRoomName("")
      setOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setSlotName("")
    setRoomName("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className="gap-2">
          {buttonIcon}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
            </div>
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>{dialogDescription}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Important:</p>
                  <p>
                    Please check if the room and time slot are available before adding to avoid scheduling conflicts.
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slotName" className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Slot Name
            </Label>
            <Input
              id="slotName"
              placeholder="e.g., M1,M2"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              required
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomName" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              Room Name
            </Label>
            <Input
              id="roomName"
              placeholder="e.g., Room 101, Lab A, Auditorium"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="focus:ring-2 focus:ring-green-500"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !slotName.trim() || !roomName.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isSubmitting ? "Adding..." : "Add Slot"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
