import type React from "react";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
    </div>
  );
}
