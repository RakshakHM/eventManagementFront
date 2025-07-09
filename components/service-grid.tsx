"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import { getApiUrl, getImageUrl } from "@/lib/utils"
// import { getServices } from "@/lib/data" // Remove this import

interface ServiceGridProps {
  category?: string
}

export function ServiceGrid({ category }: ServiceGridProps) {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleServices, setVisibleServices] = useState(9)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        // Convert images from comma-separated string to array
        const fixed = data.map((service: any) => ({
          ...service,
          images: service.images ? service.images.split(",") : [],
        }))
        setServices(fixed)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load services")
        setLoading(false)
      })
  }, [])

  const filteredServices = category
    ? services.filter((service) => service.category === category)
    : services

  const loadMore = () => {
    setVisibleServices((prev) => prev + 9)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  if (filteredServices.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No services found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.slice(0, visibleServices).map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={getImageUrl(service.image) || "/placeholder.svg?height=300&width=500"}
                alt={service.name}
                className="object-cover w-full h-full"
              />
              {service.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{service.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {service.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm font-medium">{service.rating}</span>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-sm">{service.description}</p>
              <div className="mt-2 text-sm font-medium">Starting from ₹{service.price}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild variant="default" className="w-full">
                <Link href={`/services/${service.category}/${service.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {visibleServices < filteredServices.length && (
        <div className="flex justify-center pt-6">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
