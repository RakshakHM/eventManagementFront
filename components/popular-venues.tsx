"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star } from "lucide-react"
import { getApiUrl, getImageUrl } from "@/lib/utils"

export function PopularVenues() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        // Filter for halls and sort by rating
        const halls = data
          .filter((s: any) => s.category === "halls")
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 4)
        setVenues(halls)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load venues")
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {venues.map((venue) => (
        <Link key={venue.id} href={`/services/halls/${venue.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <img src={venue.image || "/placeholder.svg?height=300&width=500"} alt={venue.name} className="object-cover w-full h-full" />
              {venue.featured && <Badge className="absolute top-2 right-2">Popular</Badge>}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold">{venue.name}</h3>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {venue.location}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm">{venue.rating}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  {venue.capacity}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium">₹{venue.price}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
