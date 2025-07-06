"use client"

import { Button } from "@/components/ui/button"
import { Camera, Building2, Palette, Grid3X3 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceFilterProps {
  category?: string
}

export function ServiceFilter({ category }: ServiceFilterProps) {
  const categories = [
    { id: "all", name: "All Services", icon: Grid3X3, description: "Browse all event services" },
    { id: "cameras", name: "Photography & Videography", icon: Camera, description: "Professional cameras and videography" },
    { id: "halls", name: "Convention Halls", icon: Building2, description: "Event venues and convention centers" },
    { id: "decorators", name: "Event Decorators", icon: Palette, description: "Beautiful event decorations" },
  ]

  return (
    <div className="space-y-6 sticky top-24">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Service Categories</h3>
        <p className="text-sm text-muted-foreground">Choose a category to explore services</p>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = category === cat.id || (!category && cat.id === "all")

          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "w-full justify-start h-auto p-4 transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-background hover:bg-accent hover:text-accent-foreground border-2"
              )}
              asChild
            >
              <Link href={cat.id === "all" ? "/services" : `/services/${cat.id}`}>
                <div className="flex items-center space-x-3 w-full">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{cat.name}</div>
                    <div className={cn(
                      "text-xs mt-1",
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {cat.description}
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
