import { DEFAULT_CAMPAIGN_ID, findCampaign } from '@/lib/campaigns'

export const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    // PayPal and Flutterwave both settle USD; presets mirror the old tier copy.
    presets: [10, 25, 50, 100, 250, 500],
    min: 1,
    max: 100_000,
    decimals: 2,
  },
  UGX: {
    code: 'UGX',
    symbol: 'USh',
    presets: [20_000, 50_000, 100_000, 250_000, 500_000, 1_000_000],
    min: 1_000,
    max: 400_000_000,
    decimals: 0,
  },
} as const

export type CurrencyCode = keyof typeof CURRENCIES
export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[]

export type Frequency = 'once' | 'monthly'
export type Provider = 'paypal' | 'flutterwave'

// PayPal is USD-only here; Flutterwave carries local currency and mobile money.
export const PROVIDER_CURRENCIES: Record<Provider, CurrencyCode[]> = {
  paypal: ['USD'],
  flutterwave: ['USD', 'UGX'],
}

export interface DonationRequest {
  amount: number
  currency: CurrencyCode
  frequency: Frequency
  campaignId: string
  campaignName: string
  name: string
  email: string
  phone: string
}

export function formatAmount(amount: number, currency: CurrencyCode): string {
  const { symbol, decimals } = CURRENCIES[currency]
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export type ParseResult =
  | { ok: true; data: DonationRequest }
  | { ok: false; error: string }

/**
 * Validates an untrusted donation payload. Amount bounds are enforced here as
 * well as in the UI — the client-side control is a convenience, not a guard.
 */
export function parseDonation(body: Record<string, unknown>): ParseResult {
  const currency = String(body.currency ?? '') as CurrencyCode
  if (!CURRENCY_CODES.includes(currency)) {
    return { ok: false, error: 'Unsupported currency.' }
  }

  const config = CURRENCIES[currency]
  const amount = Number(body.amount)
  if (!Number.isFinite(amount)) {
    return { ok: false, error: 'Please enter a valid amount.' }
  }

  const rounded = Number(amount.toFixed(config.decimals))
  if (rounded < config.min) {
    return {
      ok: false,
      error: `The minimum donation is ${formatAmount(config.min, currency)}.`,
    }
  }
  if (rounded > config.max) {
    return {
      ok: false,
      error: `The maximum online donation is ${formatAmount(config.max, currency)}. Please contact us to arrange a larger gift.`,
    }
  }

  const frequency = String(body.frequency ?? 'once')
  if (frequency !== 'once' && frequency !== 'monthly') {
    return { ok: false, error: 'Unsupported donation frequency.' }
  }

  const name = String(body.name ?? '').trim()
  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: 'Please enter your name.' }
  }

  const email = String(body.email ?? '').trim()
  if (!isValidEmail(email) || email.length > 200) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const phone = String(body.phone ?? '').trim().slice(0, 40)

  const campaignId = String(body.campaignId ?? DEFAULT_CAMPAIGN_ID)
  const campaign = findCampaign(campaignId)
  if (!campaign) {
    return { ok: false, error: 'That campaign is no longer accepting donations.' }
  }

  return {
    ok: true,
    data: {
      amount: rounded,
      currency,
      frequency,
      campaignId: campaign.id,
      campaignName: campaign.name,
      name,
      email,
      phone,
    },
  }
}

export function siteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined)

  return (configured ?? 'http://localhost:3000').replace(/\/$/, '')
}
