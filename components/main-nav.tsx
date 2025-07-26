"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()
  const { user, isAdmin } = useAuth()

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">EventPro</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Home
        </Link>
        <Link
          href="/services"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname.startsWith("/services") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Services
        </Link>
        <Link
          href="/about"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/about" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          About
        </Link>

      </nav>

      <div className="hidden md:flex items-center ml-auto space-x-4">
        <ModeToggle />
        {user ? (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href={isAdmin ? "/admin" : "/dashboard/bookings"}>{isAdmin ? "Admin Dashboard" : "Bookings"}</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
