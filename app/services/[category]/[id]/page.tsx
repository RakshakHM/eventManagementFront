"use client";

import { ServiceGallery } from "@/components/service-gallery"
import { ServiceDetails } from "@/components/service-details"
import { ServiceReviews } from "@/components/service-reviews"
import { RelatedServices } from "@/components/related-services"
import { BookingButton } from "@/components/booking-button"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { useEffect, useState } from "react"
// import { getServiceById } from "@/lib/data"

export default function ServiceDetailPage({
  params,
}: {
  params: { category: string; id: string }
}) {
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3001/api/services/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Service not found")
        return res.json()
      })
      .then((data) => {
        setService({
          ...data,
          images: data.images ? data.images.split(",") : [],
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [params.id])

  const categoryName =
    {
      cameras: "Cameras",
      halls: "Convention Halls",
      decorators: "Decorators",
    }[params.category] || "Service"

  if (loading) {
    return <div className="container py-10 text-center">Loading...</div>
  }

  if (error || !service) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="text-muted-foreground mt-4">
          The service you are looking for does not exist or has been removed.
        </p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/services">Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/services/${params.category}`}>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{service.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
            <p className="text-muted-foreground mt-2">{service.location}</p>
          </div>

          <ServiceGallery images={service.images} />
          <ServiceDetails service={service} />
          {/* You may want to fetch reviews separately from /api/reviews?serviceId=... */}
          {/* <ServiceReviews reviews={service.reviews} /> */}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-bold">Book this service</h2>
            <div className="text-2xl font-bold">₹{service.price}</div>
            <BookingButton serviceId={service.id} />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Services in Bangalore</h2>
        <RelatedServices category={params.category} currentId={params.id} />
      </div>

      <AIAssistantButton />
    </div>
  )
}
