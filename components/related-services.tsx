import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Loader2 } from "lucide-react"
import { getApiUrl } from "@/lib/utils"
import { useState, useEffect } from "react"

interface RelatedServicesProps {
  category: string
  currentId: string
}

export function RelatedServices({ category, currentId }: RelatedServicesProps) {
  const [relatedServices, setRelatedServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(getApiUrl("/api/services"))
        
        if (!response.ok) {
          throw new Error('Failed to fetch services')
        }
        
        const allServices = await response.json()
        const filtered = allServices
          .filter((service: any) => {
            // Ensure both IDs are compared as strings to avoid type mismatch
            return service.category === category && String(service.id) !== String(currentId)
          })
          .slice(0, 4)
        
        setRelatedServices(filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load related services')
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedServices()
  }, [category, currentId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading related services...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load related services</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  if (relatedServices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No related services found in this category</p>
      </div>
    )
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
