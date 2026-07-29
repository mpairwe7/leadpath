import { NextResponse } from 'next/server'
import { campaigns, DEFAULT_CAMPAIGN_ID } from '@/lib/campaigns'
import { notifyDonation } from '@/lib/donation-email'
import { siteUrl, type CurrencyCode, type Frequency } from '@/lib/donations'
import { paypalAccessToken, paypalBaseUrl } from '@/lib/paypal'

function campaignName(id: string): string {
  return campaigns.find((campaign) => campaign.id === id)?.name ?? 'General fund'
}

function fullName(name?: { given_name?: string; surname?: string }): string {
  return [name?.given_name, name?.surname].filter(Boolean).join(' ') || 'Unknown donor'
}

function back(path: string): NextResponse {
  return NextResponse.redirect(`${siteUrl()}${path}`, { status: 303 })
}

/**
 * PayPal returns the donor here after approval. Nothing is trusted from the
 * query string except the identifier — the amount, status and payer are read
 * back from PayPal itself before we record anything.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const mode = url.searchParams.get('mode')

  const token = await paypalAccessToken()
  if (!token) return back('/donate?status=failed')

  const base = paypalBaseUrl()

  try {
    if (mode === 'subscription') {
      const subscriptionId = url.searchParams.get('subscription_id')
      if (!subscriptionId) return back('/donate?status=failed')

      const response = await fetch(
        `${base}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}?fields=plan`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        },
      )
      const data = await response.json()

      if (!response.ok || !['ACTIVE', 'APPROVED'].includes(data.status)) {
        console.error('PayPal subscription not active:', response.status, data)
        return back('/donate?status=failed')
      }

      const price =
        data.billing_info?.last_payment?.amount ??
        data.plan?.billing_cycles?.[0]?.pricing_scheme?.fixed_price

      const campaignId = data.custom_id ?? DEFAULT_CAMPAIGN_ID

      await notifyDonation(
        {
          amount: Number(price?.value ?? 0),
          currency: (price?.currency_code ?? 'USD') as CurrencyCode,
          frequency: 'monthly' as Frequency,
          campaignId,
          campaignName: campaignName(campaignId),
          name: fullName(data.subscriber?.name),
          email: data.subscriber?.email_address ?? '',
          phone: '',
        },
        {
          provider: 'PayPal',
          reference: data.id ?? subscriptionId,
          status: data.status,
        },
      )

      return back(`/donate/thank-you?ref=${encodeURIComponent(data.id ?? subscriptionId)}`)
    }

    // Default: one-time order capture.
    const orderId = url.searchParams.get('token')
    if (!orderId) return back('/donate?status=failed')

    const response = await fetch(
      `${base}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()

    if (!response.ok || data.status !== 'COMPLETED') {
      console.error('PayPal capture failed:', response.status, data)
      return back('/donate?status=failed')
    }

    const unit = data.purchase_units?.[0]
    const capture = unit?.payments?.captures?.[0]
    const campaignId = unit?.custom_id ?? DEFAULT_CAMPAIGN_ID

    await notifyDonation(
      {
        amount: Number(capture?.amount?.value ?? 0),
        currency: (capture?.amount?.currency_code ?? 'USD') as CurrencyCode,
        frequency: 'once' as Frequency,
        campaignId,
        campaignName: campaignName(campaignId),
        name: fullName(data.payer?.name),
        email: data.payer?.email_address ?? '',
        phone: '',
      },
      {
        provider: 'PayPal',
        reference: capture?.id ?? data.id ?? orderId,
        status: capture?.status ?? data.status,
      },
    )

    return back(`/donate/thank-you?ref=${encodeURIComponent(capture?.id ?? orderId)}`)
  } catch (error) {
    console.error('PayPal return handling failed:', error)
    return back('/donate?status=failed')
  }
}
