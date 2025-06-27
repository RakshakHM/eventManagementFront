import { formatDate } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface BookingStep4Props {
  service: any
  bookingData: any
}

export function BookingStep4({ service, bookingData }: BookingStep4Props) {
  // Calculate total price
  const basePrice = service.price

  // Get add-on prices based on service category
  const addons = getAddonsByCategory(service.category)
  const selectedAddons = addons.filter((addon) => bookingData.addons.includes(addon.id))
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0)

  const total = basePrice + addonsTotal

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Review Your Booking</h2>
        <p className="text-muted-foreground">Please review the details of your booking before confirming</p>
      </div>

      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium">Service Details</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span>{service.location}, Bangalore</span>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium">Booking Details</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{bookingData.date ? formatDate(bookingData.date) : "Not selected"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Number of Guests:</span>
              <span>{bookingData.guests}</span>
            </div>
          </div>
        </div>

        {selectedAddons.length > 0 && (
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium">Selected Add-ons</h3>
            <div className="mt-2 space-y-2">
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between">
                  <span className="text-muted-foreground">{addon.name}:</span>
                  <span>₹{addon.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingData.specialRequests && (
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium">Special Requests</h3>
            <p className="mt-2 text-muted-foreground">{bookingData.specialRequests}</p>
          </div>
        )}

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium">Contact Information</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>{bookingData.contactName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{bookingData.contactEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span>{bookingData.contactPhone}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="bg-primary/5 p-4 rounded-md">
          <h3 className="font-medium">Price Summary</h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Price:</span>
              <span>₹{basePrice.toLocaleString()}</span>
            </div>
            {addonsTotal > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Add-ons:</span>
                <span>₹{addonsTotal.toLocaleString()}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>By confirming this booking, you agree to our Terms of Service and Cancellation Policy.</p>
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
