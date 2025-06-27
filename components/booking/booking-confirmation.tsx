import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, MapPin } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BookingConfirmationProps {
  service: any
  bookingData: any
}

export function BookingConfirmation({ service, bookingData }: BookingConfirmationProps) {
  // Generate a random booking ID
  const bookingId = `BLR-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center">
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        <p className="text-muted-foreground mt-2">Your booking has been successfully confirmed</p>
      </div>

      <div className="bg-muted p-4 rounded-md text-left">
        <h3 className="font-medium text-center mb-4">Booking Details</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {bookingData.date ? formatDate(bookingData.date) : "Not selected"}, {bookingData.time}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{service.location}, Bangalore</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="font-medium">{bookingId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>A confirmation email has been sent to {bookingData.contactEmail} with all the details.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button asChild>
          <Link href="/dashboard/bookings">View My Bookings</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
