"use client"
import { useRouter } from "next/navigation"
import { BookingWizard } from "@/components/booking/booking-wizard"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"
import { getServiceById } from "@/lib/data"

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const service = getServiceById(params.id)

  if (!service) {
    router.push("/services")
    return null
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Book {service.name}</h1>
      <BookingWizard service={service} />
      <AIAssistantButton />
    </div>
  )
}
