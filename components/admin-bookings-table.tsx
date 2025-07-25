"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { getApiUrl } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface AdminBookingsTableProps {
  fullTable?: boolean
  searchId?: string
}

interface Booking {
  id: number
  user: { name: string; email: string }
  service: { name: string }
  date: string
  price: number
  status: "confirmed" | "cancelled"
}

export function AdminBookingsTable({ fullTable = false, searchId: searchIdProp }: AdminBookingsTableProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchId, setSearchId] = useState("")
  const { toast } = useToast()
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl("/api/bookings"))
      .then(res => res.json())
      .then(data => {
        setBookings(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch bookings")
        setLoading(false)
      })
  }, [])

  const filterValue = typeof searchIdProp === "string" ? searchIdProp : searchId
  const filteredBookings = filterValue.trim()
    ? bookings.filter(b => b.id.toString().toLowerCase().includes(filterValue.trim().toLowerCase()))
    : bookings
  const displayBookings = fullTable ? filteredBookings : (Array.isArray(filteredBookings) ? filteredBookings.slice(0, 3) : []);

  if (loading) return <div>Loading bookings...</div>
  if (error) return <div className="text-red-500">{error}</div>

  const handleStatusChange = async (bookingId: number, newStatus: "confirmed" | "cancelled") => {
    setUpdatingId(bookingId)
    try {
      const res = await fetch(getApiUrl(`/api/bookings/${bookingId}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
      toast({ title: "Status updated", description: `Booking #${bookingId} set to ${newStatus}` })
    } catch (e) {
      toast({ title: "Error", description: "Could not update booking status", variant: "destructive" })
    } finally {
      setUpdatingId(null)
    }
  }

  const content = (
    <div className="rounded-md border">
      {typeof searchIdProp !== "string" && (
        <div className="p-2 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>
                <div className="font-medium">{booking.user?.name}</div>
                <div className="text-sm text-muted-foreground">{booking.user?.email}</div>
              </TableCell>
              <TableCell>{booking.service?.name}</TableCell>
              <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
              <TableCell>${booking.price}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : "destructive"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(booking.id, booking.status === "confirmed" ? "cancelled" : "confirmed")}
                      disabled={updatingId === booking.id}
                    >
                      {updatingId === booking.id
                        ? "Updating..."
                        : booking.status === "confirmed"
                          ? "Set as Cancelled"
                          : "Set as Confirmed"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  if (fullTable) {
    return content
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest customer bookings</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/admin/bookings">View All</a>
        </Button>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
