export interface Campaign {
  id: string
  name: string
  /** Shown under the campaign name on the donate page. */
  description: string
  /** Only active campaigns are selectable; set false to retire one. */
  active: boolean
  /** At most one campaign should be featured — it gets the banner treatment. */
  featured?: boolean
  /** Optional fundraising target, in USD, used to render a progress meter. */
  goalUsd?: number
  /** Optional plain-language timing, e.g. "September – December 2026". */
  timing?: string
}

// Editing this array is the whole workflow for launching a new appeal — no other
// file needs to change. `id` is what gets stored against the payment, so keep it
// stable once a campaign has taken its first donation.
export const campaigns: Campaign[] = [
  {
    id: 'general',
    name: 'Where it is needed most',
    description:
      'Support LeadPath’s leadership, career, and entrepreneurship programmes across all three pillars.',
    active: true,
  },
  {
    id: 'secondary-school-bootcamp',
    name: 'Secondary School Bootcamp',
    description:
      'Fund a leadership and career-readiness bootcamp for secondary school students, running from launch through the December event.',
    timing: 'September – December',
    active: true,
    featured: true,
  },
]

export const DEFAULT_CAMPAIGN_ID = 'general'

export function activeCampaigns(): Campaign[] {
  return campaigns.filter((campaign) => campaign.active)
}

export function findCampaign(id: string): Campaign | undefined {
  return campaigns.find((campaign) => campaign.id === id && campaign.active)
}

export function featuredCampaign(): Campaign | undefined {
  return campaigns.find((campaign) => campaign.active && campaign.featured)
}
