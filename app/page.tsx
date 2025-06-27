"use client";

import { CityBannerCarousel } from "@/components/city-banner-carousel"
import { MapSearchFinder } from "@/components/map-search-finder"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedServices } from "@/components/featured-services"
import { PopularVenues } from "@/components/popular-venues"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      <CityBannerCarousel />

      <section className="container py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Find Perfect Event Services</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover and book top-rated cameras, venues, and decorators for your special occasions
          </p>
        </div>
      </section>

      <section className="container py-8">
        <MapSearchFinder />
      </section>

      <section className="container py-8">
        <ServiceCategories />
      </section>

      <section className="bg-muted py-12">
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Services</h2>
            <p className="text-muted-foreground">
              Explore our handpicked selection of top-rated event services in Bangalore
            </p>
          </div>
          <FeaturedServices />
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular Venues</h2>
          <p className="text-muted-foreground">Discover the most sought-after event spaces across the city</p>
        </div>
        <PopularVenues />
      </section>

      <AIAssistantButton />
    </div>
  )
}
