import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function UpcomingBookings() {
  const bookings = [
    {
      id: "1",
      service: "Premium Photography",
      date: "June 15, 2023",
      location: "Central Park",
      status: "confirmed",
    },
    {
      id: "2",
      service: "Grand Convention Hall",
      date: "July 22, 2023",
      location: "Downtown",
      status: "pending",
    },
    {
      id: "3",
      service: "Floral Decoration Package",
      date: "August 5, 2023",
      location: "Riverside Hotel",
      status: "confirmed",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Your scheduled events and services</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/bookings">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="font-medium">{booking.service}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {booking.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {booking.location}
                </div>
              </div>
              <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>{booking.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
