"use client"

import { useEffect, useState, useMemo } from "react"
import { Mail, Eye, MousePointer, Target, Euro, AlertCircle, UserMinus } from "lucide-react"
import { getEmailCampaigns, getEmailCampaignDailyKpis, type EmailCampaign, type EmailDailyKpi } from "@/lib/api"
import { useDateRange } from "@/components/context/DateRangeContext"
import { KpiCard } from "@/components/analytics/KpiCard"
import { DataTable, type Column } from "@/components/analytics/DataTable"
import { CampaignSelector } from "@/components/analytics/CampaignSelector"
import { Alert, AlertDescription } from "@/components/ui/alert"

const columns: Column<EmailDailyKpi>[] = [
  { key: "date", label: "Date", format: "date" },
  { key: "sent", label: "Sent", format: "number", align: "right" },
  { key: "opens", label: "Opens", format: "number", align: "right" },
  { key: "clicks", label: "Clicks", format: "number", align: "right" },
  { key: "conversions", label: "Conv.", format: "number", align: "right" },
  { key: "revenue", label: "Revenue", format: "currency", align: "right" },
  { key: "unsubscribes", label: "Unsubscribes", format: "number", align: "right" },
]

export function EmailPageClient() {
  const { from, to } = useDateRange()
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [daily, setDaily] = useState<EmailDailyKpi[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEmailCampaigns()
      .then((data) => {
        setCampaigns(data)
        if (data.length > 0) {
          setSelectedId(String(data[0].id))
        }
      })
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!selectedId || !from || !to) return
    setIsLoading(true)
    getEmailCampaignDailyKpis(Number(selectedId), from, to)
      .then(setDaily)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [selectedId, from, to])

  const totals = useMemo(() => {
    return daily.reduce(
      (acc, d) => ({
        sent: acc.sent + (d.sent || 0),
        opens: acc.opens + (d.opens || 0),
        clicks: acc.clicks + (d.clicks || 0),
        conversions: acc.conversions + (d.conversions || 0),
        revenue: acc.revenue + (d.revenue || 0),
        unsubscribes: acc.unsubscribes + (d.unsubscribes || 0),
      }),
      { sent: 0, opens: 0, clicks: 0, conversions: 0, revenue: 0, unsubscribes: 0 },
    )
  }, [daily])

  const openRate = totals.sent > 0 ? (totals.opens / totals.sent) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Email Campaigns</h1>
          <CampaignSelector
            campaigns={campaigns}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderLabel={(c) => `${c.name} (${c.segment})`}
          />
        </div>
        <p className="text-sm text-muted-foreground">Monitor your email marketing performance</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedId && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <KpiCard title="Emails Sent" value={totals.sent} icon={Mail} />
          <KpiCard title="Open Rate" value={openRate} format="percentage" icon={Eye} />
          <KpiCard title="Clicks" value={totals.clicks} icon={MousePointer} />
          <KpiCard title="Conversions" value={totals.conversions} icon={Target} />
          <KpiCard title="Revenue" value={totals.revenue} format="currency" icon={Euro} />
          <KpiCard title="Unsubscribes" value={totals.unsubscribes} icon={UserMinus} />
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-medium text-foreground">Daily Performance</h2>
        <DataTable
          columns={columns}
          data={daily}
          isLoading={isLoading}
          emptyMessage="No email campaign data for selected period"
        />
      </div>
    </div>
  )
}
