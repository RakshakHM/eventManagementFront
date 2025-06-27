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
import { MoreHorizontal } from "lucide-react"

export function BookingsTable() {
  const bookings = [
    {
      id: "1",
      service: "Premium Photography",
      date: "June 15, 2023",
      price: "$1,200",
      status: "confirmed",
    },
    {
      id: "2",
      service: "Grand Convention Hall",
      date: "July 22, 2023",
      price: "$3,500",
      status: "pending",
    },
    {
      id: "3",
      service: "Floral Decoration Package",
      date: "August 5, 2023",
      price: "$800",
      status: "confirmed",
    },
    {
      id: "4",
      service: "Premium Photography",
      date: "September 10, 2023",
      price: "$1,200",
      status: "cancelled",
    },
    {
      id: "5",
      service: "Luxury Catering",
      date: "October 18, 2023",
      price: "$2,500",
      status: "confirmed",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.service}</TableCell>
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
                    <DropdownMenuItem>Modify booking</DropdownMenuItem>
                    <DropdownMenuItem>Contact service</DropdownMenuItem>
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
}
