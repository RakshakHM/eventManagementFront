import { ServiceFilter } from "@/components/service-filter"
import { ServiceGrid } from "@/components/service-grid"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { capitalizeFirstLetter } from "@/lib/utils"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category
  const categoryTitle = capitalizeFirstLetter(category)

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{categoryTitle} Services</h1>
          <p className="text-muted-foreground mt-2">Browse and book {category} services for your next event</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <ServiceFilter selectedCategory={category} />
          </div>
          <div className="md:w-3/4">
            <ServiceGrid category={category} />
          </div>
        </div>
      </div>
      <AIAssistantButton />
    </div>
  )
}
