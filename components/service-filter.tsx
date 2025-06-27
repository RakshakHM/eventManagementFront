"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Building2, Palette, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceFilterProps {
  category?: string
}

export function ServiceFilter({ category }: ServiceFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [expanded, setExpanded] = useState<string[]>(["category", "price", "rating"])

  const categories = [
    { id: "cameras", name: "Photography & Videography", icon: Camera },
    { id: "halls", name: "Convention Halls", icon: Building2 },
    { id: "decorators", name: "Event Decorators", icon: Palette },
  ]

  const features = [
    { id: "parking", label: "Parking Available" },
    { id: "wifi", label: "Free WiFi" },
    { id: "catering", label: "Catering Services" },
    { id: "accessibility", label: "Wheelchair Accessible" },
    { id: "ac", label: "Air Conditioned" },
  ]

  const locations = [
    { id: "indiranagar", label: "Indiranagar" },
    { id: "koramangala", label: "Koramangala" },
    { id: "jayanagar", label: "Jayanagar" },
    { id: "whitefield", label: "Whitefield" },
    { id: "electronic-city", label: "Electronic City" },
  ]

  const ratings = [5, 4, 3, 2, 1]

  return (
    <div className="space-y-6 sticky top-24">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm">
          Reset
        </Button>
      </div>

      <Accordion type="multiple" value={expanded} onValueChange={setExpanded} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = category === cat.id

                return (
                  <Button
                    key={cat.id}
                    variant={isActive ? "default" : "outline"}
                    className={cn("w-full justify-start", isActive ? "" : "bg-transparent")}
                    asChild
                  >
                    <Link href={`/services/${cat.id}`}>
                      <Icon className="mr-2 h-4 w-4" />
                      {cat.name}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Min:</Label>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="h-8 w-20"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label>Max:</Label>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="h-8 w-20"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted-foreground" />
                    ))}
                    <span className="ml-2">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox id={location.id} />
                  <Label htmlFor={location.i}>{location.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox id={feature.id} />
                  <Label htmlFor={feature.id}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
