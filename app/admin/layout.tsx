'use client'

import type React from "react"
import { AdminNav } from "@/components/admin-nav"
import { AdminHeader } from "@/components/admin-header"
import { AuthProvider } from "@/components/auth-provider" // Import your context provider

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <AdminNav />
          </aside>
          <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
        </div>
      </div>
    
  )
}
