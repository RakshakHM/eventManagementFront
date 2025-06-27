"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BookingStep2Props {
  service: any
  bookingData: any
  updateBookingData: (data: any) => void
}

export function BookingStep2({ service, bookingData, updateBookingData }: BookingStep2Props) {
  // Sample add-ons based on service category
  const addons = getAddonsByCategory(service.category)

  const toggleAddon = (addon: string) => {
    const currentAddons = [...bookingData.addons]
    if (currentAddons.includes(addon)) {
      updateBookingData({
        addons: currentAddons.filter((item) => item !== addon),
      })
    } else {
      updateBookingData({
        addons: [...currentAddons, addon],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Options & Add-ons</h2>
        <p className="text-muted-foreground">Customize your booking with additional services</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base mb-2 block">Available Add-ons</Label>
          <div className="space-y-3">
            {addons.map((addon) => (
              <div key={addon.id} className="flex items-start space-x-3 border rounded-md p-3">
                <Checkbox
                  id={addon.id}
                  checked={bookingData.addons.includes(addon.id)}
                  onCheckedChange={() => toggleAddon(addon.id)}
                />
                <div>
                  <Label htmlFor={addon.id} className="font-medium">
                    {addon.name} - ₹{addon.price}
                  </Label>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="special-requests" className="text-base">
            Special Requests
          </Label>
          <Textarea
            id="special-requests"
            placeholder="Any special requirements or requests..."
            className="mt-2"
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Please note that special requests are subject to availability
          </p>
        </div>
      </div>
    </div>
  )
}

function getAddonsByCategory(category: string) {
  const addonsByCategory = {
    cameras: [
      {
        id: "drone",
        name: "Drone Photography",
        price: 5000,
        description: "Aerial photography and videography using professional drones",
      },
      {
        id: "album",
        name: "Premium Photo Album",
        price: 3000,
        description: "High-quality printed photo album with 50 selected photos",
      },
      {
        id: "same-day",
        name: "Same-Day Edit",
        price: 2500,
        description: "Get a highlight reel on the same day of your event",
      },
    ],
    halls: [
      {
        id: "catering",
        name: "Catering Service",
        price: 15000,
        description: "Full catering service with customizable menu options",
      },
      {
        id: "decoration",
        name: "Basic Decoration",
        price: 8000,
        description: "Standard decoration package for the venue",
      },
      {
        id: "sound",
        name: "Professional Sound System",
        price: 5000,
        description: "High-quality sound system with technician",
      },
    ],
    decorators: [
      {
        id: "flowers",
        name: "Premium Flower Package",
        price: 10000,
        description: "Upgraded flower arrangements with exotic varieties",
      },
      {
        id: "lighting",
        name: "Special Lighting Effects",
        price: 7000,
        description: "Custom lighting design to enhance your event atmosphere",
      },
      {
        id: "stage",
        name: "Custom Stage Design",
        price: 12000,
        description: "Personalized stage backdrop and decoration",
      },
    ],
  }

  return addonsByCategory[category as keyof typeof addonsByCategory] || []
}
