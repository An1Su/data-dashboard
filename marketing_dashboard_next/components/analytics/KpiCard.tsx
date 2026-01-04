"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  change?: number
  icon?: LucideIcon
  format?: "number" | "currency" | "percentage"
}

export function KpiCard({ title, value, change, icon: Icon, format = "number" }: KpiCardProps) {
  const formattedValue = () => {
    if (typeof value === "string") return value
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
        }).format(value)
      case "percentage":
        return `${value.toFixed(1)}%`
      default:
        return new Intl.NumberFormat("en-US").format(value)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold tracking-tight text-card-foreground">{formattedValue()}</p>
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          <span className={cn("text-sm font-medium", change >= 0 ? "text-metric-positive" : "text-metric-negative")}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-xs text-muted-foreground">vs previous period</span>
        </div>
      )}
    </div>
  )
}
