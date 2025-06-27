"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BookingStep3Props {
  service: any
  bookingData: any
  updateBookingData: (data: any) => void
}

export function BookingStep3({ service, bookingData, updateBookingData }: BookingStep3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <p className="text-muted-foreground">Please provide your contact details for this booking</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="contact-name">Full Name</Label>
          <Input
            id="contact-name"
            placeholder="John Doe"
            value={bookingData.contactName}
            onChange={(e) => updateBookingData({ contactName: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="contact-email">Email Address</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            value={bookingData.contactEmail}
            onChange={(e) => updateBookingData({ contactEmail: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="contact-phone">Phone Number</Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={bookingData.contactPhone}
            onChange={(e) => updateBookingData({ contactPhone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Your contact information will be shared with the service provider to coordinate your booking.</p>
      </div>
    </div>
  )
}
