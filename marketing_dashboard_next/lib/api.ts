const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8084"

export interface Campaign {
  id: number
  name: string
  platform: string
  status: string
}

export interface CampaignDailyKpi {
  date: string
  impressions: number
  clicks: number
  spend: number
  registrations: number
  ftds: number
  depositsAmount: number
  withdrawalsAmount: number
  bonusCost: number
  ggr: number
  ngr: number
}

export interface EmailCampaign {
  id: number
  name: string
  segment: string
}

export interface EmailDailyKpi {
  date: string
  sent: number
  opens: number
  clicks: number
  conversions: number
  revenue: number
  unsubscribes: number
}

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${BASE_URL}/api/campaigns`)
  if (!res.ok) throw new Error("Failed to load campaigns")
  return res.json()
}

export async function getCampaignDailyKpis(id: number, from: string, to: string): Promise<CampaignDailyKpi[]> {
  const res = await fetch(`${BASE_URL}/api/campaigns/${id}/daily?from=${from}&to=${to}`)
  if (!res.ok) throw new Error("Failed to load daily KPIs")
  return res.json()
}

export async function getEmailCampaigns(): Promise<EmailCampaign[]> {
  const res = await fetch(`${BASE_URL}/api/email-campaigns`)
  if (!res.ok) throw new Error("Failed to load email campaigns")
  return res.json()
}

export async function getEmailCampaignDailyKpis(id: number, from: string, to: string): Promise<EmailDailyKpi[]> {
  const res = await fetch(`${BASE_URL}/api/email-campaigns/${id}/daily?from=${from}&to=${to}`)
  if (!res.ok) throw new Error("Failed to load email daily KPIs")
  return res.json()
}
