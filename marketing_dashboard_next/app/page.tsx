import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { CampaignsPageClient } from "@/components/pages/CampaignsPageClient"

export default function Page() {
  return (
    <DashboardLayout>
      <CampaignsPageClient />
    </DashboardLayout>
  )
}
