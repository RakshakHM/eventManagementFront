"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CityBannerCarousel() {
  const [banners, setBanners] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:3001/api/services")
      .then((res) => res.json())
      .then((data) => {
        // Use top 4 featured or high-rated services as banners
        const sorted = data
          .filter((s: any) => s.featured || s.rating >= 4.5)
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 4)
          .map((s: any) => ({
            id: s.id,
            title: s.name,
            description: s.description,
            image: s.image,
          }))
        setBanners(sorted)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load banners")
        setLoading(false)
      })
  }, [])

  const next = () => {
    setCurrent((current + 1) % banners.length)
  }

  const prev = () => {
    setCurrent((current - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    if (!banners.length) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, banners.length])

  if (loading) return <div className="h-[50vh] flex items-center justify-center">Loading...</div>
  if (error) return <div className="h-[50vh] flex items-center justify-center text-red-500">{error}</div>
  if (!banners.length) return <div className="h-[50vh] flex items-center justify-center">No banners available</div>

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === current ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={banner.image || "/placeholder.svg"} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 text-white p-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{banner.title}</h2>
            <p className="text-lg md:text-xl max-w-2xl">{banner.description}</p>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/20 hover:bg-background/40 text-white border-white/20"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/20 hover:bg-background/40 text-white border-white/20"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn("w-2 h-2 rounded-full transition-all", index === current ? "bg-white w-4" : "bg-white/50")}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
