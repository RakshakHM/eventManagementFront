"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function MapSearchFinder() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [radius, setRadius] = useState([5])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (category) params.append("category", category)
    params.append("radius", radius[0].toString())

    // Navigate to search results
    router.push(`/services?${params.toString()}`)
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Find Event Services Near You</h2>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location in Bangalore</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Indiranagar, Koramangala, etc."
                className="pl-9"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Service Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cameras">Photography & Videography</SelectItem>
                <SelectItem value="halls">Convention Halls</SelectItem>
                <SelectItem value="decorators">Event Decorators</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="radius">Search Radius</Label>
              <span className="text-sm text-muted-foreground">{radius[0]} km</span>
            </div>
            <Slider id="radius" min={1} max={20} step={1} value={radius} onValueChange={setRadius} />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search Services
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t">
        <div className="relative w-full h-[200px] md:h-[300px] bg-muted rounded-md overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=800&text=Bangalore+Map"
            alt="Bangalore Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground bg-background/80 p-2 rounded">
              Interactive map will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
