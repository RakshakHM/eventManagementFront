"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

interface BookingButtonProps {
  serviceId: string
}

export function BookingButton({ serviceId }: BookingButtonProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book this service.",
        variant: "destructive",
      })
      router.push(`/login?redirectTo=/booking/${serviceId}`)
      return
    }
    
    router.push(`/booking/${serviceId}`)
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleBookNow} className="w-full">
        Book Now
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        No payment required now. You'll pay when your booking is confirmed.
      </p>
    </div>
  )
}
