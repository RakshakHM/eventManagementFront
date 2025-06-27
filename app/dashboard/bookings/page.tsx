import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookingsTable } from "@/components/bookings-table"
import { PlusCircle, Search } from "lucide-react"

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-2">Manage your event bookings and reservations</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <BookingsTable />
    </div>
  )
}
