"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"

interface BookingButtonProps {
  serviceId: string
}

export function BookingButton({ serviceId }: BookingButtonProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleBookNow = () => {
    router.push(`/booking/${serviceId}`)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">Select Date</div>
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

      <Button onClick={handleBookNow} className="w-full">
        Book Now
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        No payment required now. You'll pay when your booking is confirmed.
      </p>
    </div>
  )
}
