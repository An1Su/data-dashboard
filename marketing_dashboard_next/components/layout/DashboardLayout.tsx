"use client"

import type React from "react"
import { format } from "date-fns"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { useDateRange } from "@/components/context/DateRangeContext"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { fromDate, toDate, setFromDate, setToDate } = useDateRange()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar from={fromDate} to={toDate} onFromChange={setFromDate} onToChange={setToDate} />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <span className="text-sm text-muted-foreground">
              {fromDate && toDate ? `${format(fromDate, "MMM d")} - ${format(toDate, "MMM d, yyyy")}` : "Select date range"}
            </span>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
