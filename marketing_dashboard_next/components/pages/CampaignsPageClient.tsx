"use client"

import { useEffect, useState, useMemo } from "react"
import { BarChart3, MousePointer, Euro, AlertCircle, Users, TrendingUp, Wallet, Gift, TrendingDown } from "lucide-react"
import { getCampaigns, getCampaignDailyKpis, type Campaign, type CampaignDailyKpi } from "@/lib/api"
import { useDateRange } from "@/components/context/DateRangeContext"
import { KpiCard } from "@/components/analytics/KpiCard"
import { DataTable, type Column } from "@/components/analytics/DataTable"
import { CampaignSelector } from "@/components/analytics/CampaignSelector"
import { Alert, AlertDescription } from "@/components/ui/alert"

const columns: Column<CampaignDailyKpi>[] = [
  { key: "date", label: "Date", format: "date" },
  { key: "impressions", label: "Impressions", format: "number", align: "right" },
  { key: "clicks", label: "Clicks", format: "number", align: "right" },
  { key: "spend", label: "Spend", format: "currency", align: "right" },
  { key: "registrations", label: "Registrations", format: "number", align: "right" },
  { key: "ftds", label: "FTDs", format: "number", align: "right" },
  { key: "depositsAmount", label: "Deposits", format: "currency", align: "right" },
  { key: "withdrawalsAmount", label: "Withdrawals", format: "currency", align: "right" },
  { key: "bonusCost", label: "Bonus Cost", format: "currency", align: "right" },
  { key: "ggr", label: "GGR", format: "currency", align: "right" },
  { key: "ngr", label: "NGR", format: "currency", align: "right" },
]

export function CampaignsPageClient() {
  const { from, to } = useDateRange()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [daily, setDaily] = useState<CampaignDailyKpi[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCampaigns()
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
    getCampaignDailyKpis(Number(selectedId), from, to)
      .then(setDaily)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [selectedId, from, to])

  const totals = useMemo(() => {
    return daily.reduce(
      (acc, d) => ({
        impressions: acc.impressions + (d.impressions || 0),
        clicks: acc.clicks + (d.clicks || 0),
        spend: acc.spend + (d.spend || 0),
        registrations: acc.registrations + (d.registrations || 0),
        ftds: acc.ftds + (d.ftds || 0),
        depositsAmount: acc.depositsAmount + (d.depositsAmount || 0),
        withdrawalsAmount: acc.withdrawalsAmount + (d.withdrawalsAmount || 0),
        bonusCost: acc.bonusCost + (d.bonusCost || 0),
        ggr: acc.ggr + (d.ggr || 0),
        ngr: acc.ngr + (d.ngr || 0),
      }),
      {
        impressions: 0,
        clicks: 0,
        spend: 0,
        registrations: 0,
        ftds: 0,
        depositsAmount: 0,
        withdrawalsAmount: 0,
        bonusCost: 0,
        ggr: 0,
        ngr: 0,
      },
    )
  }, [daily])

  const selectedCampaign = campaigns.find((c) => String(c.id) === selectedId)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Campaigns</h1>
          <CampaignSelector
            campaigns={campaigns}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderLabel={(c) => `${c.name} (${c.platform})`}
          />
        </div>
        <p className="text-sm text-muted-foreground">Track your ad campaign performance</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedCampaign && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KpiCard title="Impressions" value={totals.impressions} icon={BarChart3} />
          <KpiCard title="Clicks" value={totals.clicks} icon={MousePointer} />
          <KpiCard title="Registrations" value={totals.registrations} icon={Users} />
          <KpiCard title="FTDs" value={totals.ftds} icon={TrendingUp} />
          <KpiCard title="Spend" value={totals.spend} format="currency" icon={Euro} />
        </div>
      )}

      {selectedCampaign && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KpiCard title="Deposits" value={totals.depositsAmount} format="currency" icon={Wallet} />
          <KpiCard title="Withdrawals" value={totals.withdrawalsAmount} format="currency" icon={TrendingDown} />
          <KpiCard title="Bonus Cost" value={totals.bonusCost} format="currency" icon={Gift} />
          <KpiCard title="GGR" value={totals.ggr} format="currency" icon={BarChart3} />
          <KpiCard title="NGR" value={totals.ngr} format="currency" icon={TrendingUp} />
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-medium text-foreground">Daily Performance</h2>
        <DataTable
          columns={columns}
          data={daily}
          isLoading={isLoading}
          emptyMessage="No campaign data for selected period"
        />
      </div>
    </div>
  )
}
