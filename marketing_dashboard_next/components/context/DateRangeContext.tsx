"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { format } from "date-fns"

export interface DateRangeContextType {
  from: string
  to: string
  fromDate: Date | undefined
  toDate: Date | undefined
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date("2025-12-16"))
  const [toDate, setToDate] = useState<Date | undefined>(new Date("2025-12-29"))

  const from = fromDate ? format(fromDate, "yyyy-MM-dd") : ""
  const to = toDate ? format(toDate, "yyyy-MM-dd") : ""

  return (
    <DateRangeContext.Provider value={{ from, to, fromDate, toDate, setFromDate, setToDate }}>
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider")
  }
  return context
}

