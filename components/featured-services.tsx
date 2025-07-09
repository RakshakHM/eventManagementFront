"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getApiUrl, getImageUrl } from "@/lib/utils"
// import { getFeaturedServices } from "@/lib/data"

export function FeaturedServices() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleServices, setVisibleServices] = useState(6)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        // Only show featured services
        setServices(data.filter((s: any) => s.featured))
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load featured services")
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.slice(0, visibleServices).map((service) => (
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
                <p className="text-sm text-muted-foreground">{service.location}, Bangalore</p>
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
  )
}
