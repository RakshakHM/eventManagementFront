import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function RecentServices() {
  const services = [
    {
      id: "1",
      name: "Premium Photography",
      category: "camera",
      image: "/placeholder.svg",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Grand Convention Hall",
      category: "halls",
      image: "/placeholder.svg",
      rating: 4.5,
    },
    {
      id: "3",
      name: "Floral Decoration Package",
      category: "decoration",
      image: "/placeholder.svg",
      rating: 4.9,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recently Viewed</CardTitle>
          <CardDescription>Services you've recently browsed</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/services">Browse More</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={service.image || "/placeholder.svg"} alt={service.name} />
                <AvatarFallback className="rounded-md">{service.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{service.category}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm font-medium">{service.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
