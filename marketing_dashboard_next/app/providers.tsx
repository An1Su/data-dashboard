"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DateRangeProvider } from "@/components/context/DateRangeContext"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <DateRangeProvider>
        {children}
      </DateRangeProvider>
    </QueryClientProvider>
  )
}
