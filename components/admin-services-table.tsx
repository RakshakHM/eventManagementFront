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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Star } from "lucide-react"

export function AdminServicesTable() {
  const services = [
    {
      id: "1",
      name: "Premium Photography",
      category: "camera",
      price: "$1,200",
      rating: 4.8,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Grand Convention Hall",
      category: "halls",
      price: "$3,500",
      rating: 4.5,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Floral Decoration Package",
      category: "decoration",
      price: "$800",
      rating: 4.9,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Budget Photography",
      category: "camera",
      price: "$500",
      rating: 4.2,
      status: "inactive",
      image: "/placeholder.svg",
    },
    {
      id: "5",
      name: "Small Conference Room",
      category: "halls",
      price: "$1,200",
      rating: 4.0,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "6",
      name: "Basic Decoration Package",
      category: "decoration",
      price: "$300",
      rating: 4.3,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "7",
      name: "Luxury Photography",
      category: "camera",
      price: "$2,000",
      rating: 4.9,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "8",
      name: "Wedding Hall",
      category: "halls",
      price: "$5,000",
      rating: 4.7,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "9",
      name: "Premium Decoration Package",
      category: "decoration",
      price: "$1,500",
      rating: 4.8,
      status: "active",
      image: "/placeholder.svg",
    },
    {
      id: "10",
      name: "Event Photography",
      category: "camera",
      price: "$800",
      rating: 4.4,
      status: "inactive",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-md">
                    <AvatarImage src={service.image || "/placeholder.svg"} alt={service.name} />
                    <AvatarFallback className="rounded-md">{service.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{service.name}</div>
                </div>
              </TableCell>
              <TableCell className="capitalize">{service.category}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  {service.rating}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
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
                    <DropdownMenuItem>Edit service</DropdownMenuItem>
                    <DropdownMenuItem>View bookings</DropdownMenuItem>
                    <DropdownMenuItem>{service.status === "active" ? "Deactivate" : "Activate"}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete service</DropdownMenuItem>
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
