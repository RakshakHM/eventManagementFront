"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { BookingStep1 } from "@/components/booking/booking-step1"
import { BookingStep2 } from "@/components/booking/booking-step2"
import { BookingStep3 } from "@/components/booking/booking-step3"
import { BookingStep4 } from "@/components/booking/booking-step4"
import { BookingLoginPrompt } from "@/components/booking/booking-login-prompt"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { getApiUrl } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

interface BookingWizardProps {
  service: any
}

export function BookingWizard({ service }: BookingWizardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isDateAvailable, setIsDateAvailable] = useState(true)
  const [bookingData, setBookingData] = useState({
    date: null as Date | null,
    time: "",
    guests: 1,
    addons: [] as string[],
    specialRequests: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  })

  // Check if user is logged in
  useEffect(() => {
    if (user) {
      // Pre-fill contact information if user is logged in
      setBookingData(prev => ({
        ...prev,
        contactName: user.name || "",
        contactEmail: user.email || "",
        contactPhone: "",
      }))
    }
  }, [user])

  const updateBookingData = (data: Partial<typeof bookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    // If we're at step 3 and not logged in, show login prompt
    if (currentStep === 3 && !user) {
      setCurrentStep(99) // Special step for login prompt
      return
    }

    // Otherwise proceed to next step
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    // If we're at login prompt, go back to step 3
    if (currentStep === 99) {
      setCurrentStep(3)
      return
    }

    setCurrentStep((prev) => prev - 1)
  }

  const handleLoginSuccess = () => {
    setCurrentStep(4) // Move to next step after login
  }

  // Periodically check availability when on review step
  useEffect(() => {
    if (currentStep === 4 && bookingData.date) {
      const checkAvailability = async () => {
        try {
          const formattedDate = bookingData.date?.toISOString().split('T')[0]
          const response = await fetch(getApiUrl(`/api/availability/${service.id}/${formattedDate}`))
          const data = await response.json()
          setIsDateAvailable(data.available)
        } catch (error) {
          setIsDateAvailable(false)
        }
      }

      // Check immediately
      checkAvailability()

      // Check every 30 seconds
      const interval = setInterval(checkAvailability, 30000)
      return () => clearInterval(interval)
    }
  }, [currentStep, bookingData.date, service.id])

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to complete your booking.",
        variant: "destructive",
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("You must be logged in to book.")

      // Final availability check before submitting
      const formattedDate = bookingData.date?.toISOString().split('T')[0]
      const availabilityCheck = await fetch(getApiUrl(`/api/availability/${service.id}/${formattedDate}`))
      const availabilityData = await availabilityCheck.json()

      if (!availabilityData.available) {
        toast({
          title: "Date No Longer Available",
          description: "This date was booked by someone else while you were completing your booking. Please select a different date.",
          variant: "destructive",
        })
        setCurrentStep(1) // Go back to date selection
        return
      }

      const res = await fetch(getApiUrl("/api/bookings"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          serviceId: service.id,
          date: bookingData.date,
          time: bookingData.time,
          guests: bookingData.guests,
          addons: bookingData.addons,
          specialRequests: bookingData.specialRequests,
          contactName: bookingData.contactName,
          contactEmail: bookingData.contactEmail,
          contactPhone: bookingData.contactPhone,
          price: service.price,
          status: "confirmed",
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.error && data.error.includes("already booked")) {
          toast({
            title: "Date Already Booked",
            description: "This date is no longer available. Please go back and select a different date.",
            variant: "destructive",
          })
          // Go back to step 1 to select a new date
          setCurrentStep(1)
          return
        }
        throw new Error(data.error || "Booking failed")
      }

      toast({
        title: "Booking Successful!",
        description: "Your booking has been confirmed.",
      })
      setCurrentStep(5) // Show confirmation
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="p-6">
      {/* Progress indicator */}
      {currentStep < 5 && currentStep !== 99 && (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep} of 4</span>
            <span className="text-sm text-muted-foreground">{getStepTitle(currentStep)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <BookingStep1 
            service={service} 
            bookingData={bookingData} 
            updateBookingData={updateBookingData}
            onAvailabilityChange={setIsDateAvailable}
          />
        )}

        {currentStep === 2 && (
          <BookingStep2 service={service} bookingData={bookingData} updateBookingData={updateBookingData} />
        )}

        {currentStep === 3 && (
          <BookingStep3 service={service} bookingData={bookingData} updateBookingData={updateBookingData} />
        )}

        {currentStep === 4 && <BookingStep4 service={service} bookingData={bookingData} isDateAvailable={isDateAvailable} />}

        {currentStep === 99 && (
          <BookingLoginPrompt onLoginSuccess={handleLoginSuccess} redirectTo={`/booking/${service.id}`} />
        )}

        {currentStep === 5 && <BookingConfirmation service={service} bookingData={bookingData} />}
      </div>

      {/* Navigation buttons */}
      {currentStep < 5 && currentStep !== 99 && (
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={currentStep === 1 ? () => router.back() : handleBack}>
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>

          <Button
            onClick={currentStep === 4 ? handleSubmit : handleNext}
            disabled={!isStepValid(currentStep, bookingData, isDateAvailable) || (currentStep === 4 && !isDateAvailable)}
          >
            {currentStep === 4 ? "Confirm Booking" : "Continue"}
          </Button>
        </div>
      )}
    </Card>
  )
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Date Selection"
    case 2:
      return "Options & Add-ons"
    case 3:
      return "Contact Information"
    case 4:
      return "Review & Confirm"
    default:
      return ""
  }
}

function isStepValid(step: number, data: any, isDateAvailable: boolean): boolean {
  switch (step) {
    case 1:
      return !!data.date && data.time === 'Full Day' && isDateAvailable; // Must have date, be full day, and be available
    case 2:
      return true // Always valid as add-ons are optional
    case 3:
      return !!data.contactName && !!data.contactEmail && !!data.contactPhone
    case 4:
      return true // Review step is always valid
    default:
      return false
  }
}
