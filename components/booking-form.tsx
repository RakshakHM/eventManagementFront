"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { cn, formatDate, getApiUrl } from "@/lib/utils"

interface BookingFormProps {
  serviceId: string
}

export function BookingForm({ serviceId }: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("1")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book this service.",
        variant: "destructive",
      })
      router.push(`/login?redirect=/services/category/${serviceId}`)
      return
    }

    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for your booking.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(getApiUrl("/api/bookings"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: user.id,
          serviceId,
          date,
          guests: Number(guests),
          notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Booking failed")

      toast({
        title: "Booking successful",
        description: "Your booking has been confirmed.",
      })

      router.push("/dashboard/bookings")
    } catch (error: any) {
      toast({
        title: "Booking failed",
        description: error.message || "There was an error processing your booking.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? formatDate(date) : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests</Label>
        <Input id="guests" type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests</Label>
        <Textarea
          id="notes"
          placeholder="Any special requirements or requests..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Book Now"}
      </Button>
    </form>
  )
}
