"use client"
import { useRouter } from "next/navigation"
import { BookingWizard } from "@/components/booking/booking-wizard"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"
import { getServiceById } from "@/lib/data"
import * as React from "react"
import { use, useEffect, useState } from "react"
import { getApiUrl } from "@/lib/utils"

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(getApiUrl(`/api/services/${id}`))
      .then(res => {
        if (!res.ok) throw new Error('Service not found')
        return res.json()
      })
      .then(data => setService(data))
      .catch(() => setService(null))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!loading && !service) {
      router.push("/services")
    }
  }, [service, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!service) {
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
