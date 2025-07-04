"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Camera, Building2, Palette } from "lucide-react"
import { getApiUrl } from "@/lib/utils"

const iconMap: Record<string, any> = {
  cameras: Camera,
  halls: Building2,
  decorators: Palette,
}

export function ServiceCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        // Extract unique categories with a sample image and description
        const map: Record<string, any> = {}
        data.forEach((service: any) => {
          if (!map[service.category]) {
            map[service.category] = {
              id: service.category,
              title:
                service.category === "cameras"
                  ? "Photography & Videography"
                  : service.category === "halls"
                  ? "Convention Halls"
                  : service.category === "decorators"
                  ? "Event Decorators"
                  : service.category,
              description: service.description,
              icon: iconMap[service.category] || Camera,
              image: service.image,
            }
          }
        })
        setCategories(Object.values(map))
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load categories")
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Services</h2>
        <p className="text-muted-foreground">Discover the perfect services for your event in Bangalore</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <Link
              key={category.id}
              href={`/services/${category.id}`}
              className="group relative overflow-hidden rounded-lg border hover:shadow-md transition-all"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">{category.title}</h3>
                </div>
                <p className="mt-3 text-muted-foreground">{category.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
