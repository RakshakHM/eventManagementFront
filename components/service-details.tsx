import { Clock, DollarSign, MapPin, Users, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ServiceDetailsProps {
  service: any
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  const amenities = [
    "Air Conditioning",
    "Free Parking",
    "WiFi",
    "Catering Available",
    "Wheelchair Accessible",
    "Sound System",
    "Projector",
    "Stage",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">About this service</h2>
        <p className="text-muted-foreground">{service.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Starting from ₹{service.price}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Suitable for {service.capacity} guests</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Amenities & Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Availability</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Mon-Fri: 9 AM - 9 PM</Badge>
          <Badge variant="outline">Sat-Sun: 10 AM - 11 PM</Badge>
          <Badge variant="outline">Advance booking required</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Cancellation Policy</h3>
        <p className="text-muted-foreground">
          Free cancellation up to 48 hours before the event. Cancellations made within 48 hours of the event are subject
          to a 50% cancellation fee.
        </p>
      </div>
    </div>
  )
}
