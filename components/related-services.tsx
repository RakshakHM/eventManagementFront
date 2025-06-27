import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import { getServices } from "@/lib/data"

interface RelatedServicesProps {
  category: string
  currentId: string
}

export function RelatedServices({ category, currentId }: RelatedServicesProps) {
  const allServices = getServices()
  const relatedServices = allServices
    .filter((service) => service.category === category && service.id !== currentId)
    .slice(0, 4)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedServices.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <div className="aspect-video">
            <img
              src={service.image || "/placeholder.svg?height=300&width=500"}
              alt={service.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{service.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {service.location}, Bangalore
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm font-medium">{service.rating}</span>
              </div>
            </div>
            <div className="mt-2 text-sm font-medium">₹{service.price}</div>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href={`/services/${service.category}/${service.id}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
