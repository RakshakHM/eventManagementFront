import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Flower, MapPin } from "lucide-react"

export function AdminServiceStats() {
  const stats = [
    {
      category: "Camera Companies",
      count: 15,
      bookings: 87,
      revenue: "$24,500",
      icon: Camera,
    },
    {
      category: "Convention Halls",
      count: 12,
      bookings: 56,
      revenue: "$105,200",
      icon: MapPin,
    },
    {
      category: "Flower Decoration",
      count: 18,
      bookings: 111,
      revenue: "$32,800",
      icon: Flower,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Categories</CardTitle>
        <CardDescription>Overview of service categories and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div key={stat.category} className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">{stat.category}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.count} services, {stat.bookings} bookings
                  </div>
                </div>
                <div className="font-medium">{stat.revenue}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
