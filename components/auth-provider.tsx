"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { getApiUrl } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Check for protected routes
  useEffect(() => {
    if (!isLoading) {
      // Admin routes protection
      if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        })
        router.push("/login")
      }
      // User dashboard protection
      if (pathname?.startsWith("/dashboard") && !user) {
        toast({
          title: "Login required",
          description: "Please login to access your dashboard.",
        })
        router.push("/login")
      }
    }
  }, [pathname, user, isLoading, router, toast])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(getApiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
      localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }))
      localStorage.setItem("token", data.token)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(getApiUrl("/api/users"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role })
      localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }))
      localStorage.setItem("token", data.token)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
