import { ServiceFilter } from "@/components/service-filter"
import { ServiceGrid } from "@/components/service-grid"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function ServicesPage() {
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
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Services</h1>
          <p className="text-muted-foreground mt-2">Browse and book event services in Bangalore</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <ServiceFilter />
          </div>
          <div className="w-full lg:w-3/4">
            <ServiceGrid />
          </div>
        </div>
      </div>
      <AIAssistantButton />
    </div>
  )
}
