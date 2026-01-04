"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CampaignSelectorProps<T extends { id: number; name: string }> {
  campaigns: T[]
  selectedId: string
  onSelect: (id: string) => void
  placeholder?: string
  renderLabel?: (campaign: T) => string
}

export function CampaignSelector<T extends { id: number; name: string }>({
  campaigns,
  selectedId,
  onSelect,
  placeholder = "Select a campaign",
  renderLabel,
}: CampaignSelectorProps<T>) {
  return (
    <Select value={selectedId} onValueChange={onSelect}>
      <SelectTrigger className="w-auto min-w-[200px] bg-card">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {campaigns.map((campaign) => (
          <SelectItem key={campaign.id} value={String(campaign.id)}>
            {renderLabel ? renderLabel(campaign) : campaign.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
