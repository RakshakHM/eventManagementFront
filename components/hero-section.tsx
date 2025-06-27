import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Plan Your Perfect Event with Ease
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Find and book the best services for your event. From photography to venues and decorations, we've got
                you covered.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/services">
                  Browse Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Event Planning"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              src="/placeholder.svg?height=550&width=700"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
