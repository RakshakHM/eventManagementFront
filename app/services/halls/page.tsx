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

export default function HallsPage() {
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
            <BreadcrumbLink href="/services/halls">Halls</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Convention Halls</h1>
          <p className="text-muted-foreground mt-2">Find the perfect venue for your event in Bangalore</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <ServiceFilter category="halls" />
          </div>
          <div className="w-full lg:w-3/4">
            <ServiceGrid category="halls" />
          </div>
        </div>
      </div>
      <AIAssistantButton />
    </div>
  )
}
