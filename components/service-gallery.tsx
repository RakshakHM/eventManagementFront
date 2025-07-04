"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceGalleryProps {
  images: string[]
}

export function ServiceGallery({ images }: ServiceGalleryProps) {
  const [open, setOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // If no images are provided, use placeholders
  const displayImages =
    images.length > 0
      ? images
      : [
          "/placeholder.svg?height=600&width=800&text=Bangalore+Event+Venue+1",
          "/placeholder.svg?height=600&width=800&text=Bangalore+Event+Venue+2",
          "/placeholder.svg?height=600&width=800&text=Bangalore+Event+Venue+3",
          "/placeholder.svg?height=600&width=800&text=Bangalore+Event+Venue+4",
        ]

  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-lg cursor-pointer" onClick={() => setOpen(true)}>
        <img
          src={displayImages[0] || "/placeholder.svg"}
          alt="Main service image"
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {displayImages.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={`aspect-video overflow-hidden rounded-lg cursor-pointer ${index === 0 ? "ring-2 ring-primary" : ""}`}
            onClick={() => {
              setCurrentImage(index)
              setOpen(true)
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Service image ${index + 1}`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">Service Image Gallery</DialogTitle>
          <div className="relative">
            <img
              src={displayImages[currentImage] || "/placeholder.svg"}
              alt={`Service image ${currentImage + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
