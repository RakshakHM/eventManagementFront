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

interface AdminBookingsTableProps {
  fullTable?: boolean
}

export function AdminBookingsTable({ fullTable = false }: AdminBookingsTableProps) {
  const bookings = [
    {
      id: "1",
      user: "John Doe",
      email: "john@example.com",
      service: "Premium Photography",
      date: "June 15, 2023",
      price: "$1,200",
      status: "confirmed",
    },
    {
      id: "2",
      user: "Jane Smith",
      email: "jane@example.com",
      service: "Grand Convention Hall",
      date: "July 22, 2023",
      price: "$3,500",
      status: "pending",
    },
    {
      id: "3",
      user: "Robert Johnson",
      email: "robert@example.com",
      service: "Floral Decoration Package",
      date: "August 5, 2023",
      price: "$800",
      status: "confirmed",
    },
    {
      id: "4",
      user: "Emily Davis",
      email: "emily@example.com",
      service: "Premium Photography",
      date: "September 10, 2023",
      price: "$1,200",
      status: "cancelled",
    },
    {
      id: "5",
      user: "Michael Wilson",
      email: "michael@example.com",
      service: "Luxury Catering",
      date: "October 18, 2023",
      price: "$2,500",
      status: "confirmed",
    },
  ]

  // For dashboard view, show only first 3 bookings
  const displayBookings = fullTable ? bookings : bookings.slice(0, 3)

  const content = (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell>
                <div className="font-medium">{booking.user}</div>
                <div className="text-sm text-muted-foreground">{booking.email}</div>
              </TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.price}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : booking.status === "pending"
                        ? "outline"
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
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem>Contact customer</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Cancel booking</DropdownMenuItem>
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
