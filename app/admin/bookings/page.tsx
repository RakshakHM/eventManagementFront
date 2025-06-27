import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminBookingsTable } from "@/components/admin-bookings-table"
import { Search } from "lucide-react"

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground mt-2">Manage all customer bookings and reservations</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <AdminBookingsTable fullTable={true} />
    </div>
  )
}
