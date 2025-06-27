"use client"

import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"

interface BookingStep1Props {
  service: any
  bookingData: any
  updateBookingData: (data: any) => void
}

export function BookingStep1({ service, bookingData, updateBookingData }: BookingStep1Props) {
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Select Date & Time</h2>
        <p className="text-muted-foreground">Choose when you'd like to book {service.name}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Date</Label>
          <div className="mt-2 border rounded-md p-4">
            <Calendar
              mode="single"
              selected={bookingData.date}
              onSelect={(date) => updateBookingData({ date })}
              className="mx-auto"
              disabled={(date) => {
                // Disable dates in the past
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today
              }}
            />
          </div>
          {bookingData.date && (
            <p className="text-sm text-muted-foreground mt-2">Selected date: {formatDate(bookingData.date)}</p>
          )}
        </div>

        <div>
          <Label className="text-base">Time</Label>
          <div className="mt-2">
            <RadioGroup
              value={bookingData.time}
              onValueChange={(value) => updateBookingData({ time: value })}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2"
            >
              {timeSlots.map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <RadioGroupItem value={time} id={`time-${time}`} />
                  <Label htmlFor={`time-${time}`}>{time}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="text-base">
            Number of Guests
          </Label>
          <div className="mt-2">
            <Input
              id="guests"
              type="number"
              min={1}
              max={service.capacity || 1000}
              value={bookingData.guests}
              onChange={(e) => updateBookingData({ guests: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">Maximum capacity: {service.capacity || "Not specified"}</p>
        </div>
      </div>
    </div>
  )
}
