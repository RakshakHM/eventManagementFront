"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { formatDate, getApiUrl } from "@/lib/utils"

interface BookingStep1Props {
  service: any
  bookingData: any
  updateBookingData: (data: any) => void
  onAvailabilityChange?: (isAvailable: boolean) => void
}

export function BookingStep1({ service, bookingData, updateBookingData, onAvailabilityChange }: BookingStep1Props) {
  const [availabilityStatus, setAvailabilityStatus] = useState<'checking' | 'available' | 'unavailable' | null>(null)
  const [availabilityMessage, setAvailabilityMessage] = useState('')

  // Since bookings are for the entire day, we don't need time slots
  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) {
      updateBookingData({ date: null, time: '' })
      setAvailabilityStatus(null)
      setAvailabilityMessage('')
      return
    }

    updateBookingData({ date, time: 'Full Day' })
    setAvailabilityStatus('checking')
    setAvailabilityMessage('Checking availability...')

    try {
      const formattedDate = date.toISOString().split('T')[0] // YYYY-MM-DD format
      const response = await fetch(getApiUrl(`/api/availability/${service.id}/${formattedDate}`))
      const data = await response.json()

      if (data.available) {
        setAvailabilityStatus('available')
        setAvailabilityMessage('This date is available for booking!')
        onAvailabilityChange?.(true)
      } else {
        setAvailabilityStatus('unavailable')
        setAvailabilityMessage('This date is already booked. Please select another date.')
        onAvailabilityChange?.(false)
      }
    } catch (error) {
      setAvailabilityStatus('unavailable')
      setAvailabilityMessage('Unable to check availability. Please try again.')
      onAvailabilityChange?.(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Select Date</h2>
        <p className="text-muted-foreground">Choose when you'd like to book {service.name} (Full day booking)</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Date</Label>
          <div className="mt-2 border rounded-md p-4">
            <Calendar
              mode="single"
              selected={bookingData.date}
              onSelect={handleDateSelect}
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

        {/* Availability Status */}
        {availabilityStatus && (
          <Alert variant={availabilityStatus === 'available' ? 'default' : 'destructive'}>
            <div className="flex items-center space-x-2">
              {availabilityStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin" />}
              {availabilityStatus === 'available' && <CheckCircle className="h-4 w-4" />}
              {availabilityStatus === 'unavailable' && <XCircle className="h-4 w-4" />}
              <AlertDescription>{availabilityMessage}</AlertDescription>
            </div>
          </Alert>
        )}

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
