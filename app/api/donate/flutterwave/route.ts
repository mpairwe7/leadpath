import { NextResponse } from 'next/server'
import { parseDonation, siteUrl } from '@/lib/donations'

const FLW_BASE = 'https://api.flutterwave.com/v3'

function authHeaders(secret: string) {
  return {
    Authorization: `Bearer ${secret}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Flutterwave recurring billing is driven by a payment plan, and a plan carries
 * a fixed amount — so a plan is minted per monthly donation rather than forcing
 * donors onto preset tiers.
 */
async function createPaymentPlan(
  secret: string,
  amount: number,
  currency: string,
  campaignName: string,
): Promise<string | null> {
  const response = await fetch(`${FLW_BASE}/payment-plans`, {
    method: 'POST',
    headers: authHeaders(secret),
    body: JSON.stringify({
      amount,
      currency,
      name: `LeadPath monthly — ${campaignName}`.slice(0, 100),
      interval: 'monthly',
    }),
  })

  const data = await response.json()
  if (!response.ok || data.status !== 'success') {
    console.error('Flutterwave payment plan creation failed:', response.status, data)
    return null
  }
  return String(data.data?.id ?? '')
}

export async function POST(request: Request) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secret) {
    return NextResponse.json(
      { error: 'Mobile money and card donations are not available right now.' },
      { status: 503 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = parseDonation(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }
  const donation = parsed.data

  const site = siteUrl()
  const txRef = `leadpath-${donation.campaignId}-${crypto.randomUUID()}`

  try {
    let paymentPlan: string | null = null
    if (donation.frequency === 'monthly') {
      paymentPlan = await createPaymentPlan(
        secret,
        donation.amount,
        donation.currency,
        donation.campaignName,
      )
      if (!paymentPlan) {
        return NextResponse.json(
          { error: 'We could not set up that monthly donation. Please try again.' },
          { status: 502 },
        )
      }
    }

    const response = await fetch(`${FLW_BASE}/payments`, {
      method: 'POST',
      headers: authHeaders(secret),
      body: JSON.stringify({
        tx_ref: txRef,
        amount: String(donation.amount),
        currency: donation.currency,
        redirect_url: `${site}/api/donate/flutterwave/verify`,
        ...(paymentPlan ? { payment_plan: paymentPlan } : {}),
        customer: {
          email: donation.email,
          name: donation.name,
          ...(donation.phone ? { phonenumber: donation.phone } : {}),
        },
        customizations: {
          title: 'LeadPath',
          description: `Donation — ${donation.campaignName}`.slice(0, 100),
        },
        meta: {
          campaign_id: donation.campaignId,
          campaign_name: donation.campaignName,
          donor_name: donation.name,
          donor_phone: donation.phone,
          frequency: donation.frequency,
        },
      }),
    })

    const data = await response.json()
    if (!response.ok || data.status !== 'success' || !data.data?.link) {
      console.error('Flutterwave payment initiation failed:', response.status, data)
      return NextResponse.json(
        { error: 'We could not start that donation. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: data.data.link })
  } catch (error) {
    console.error('Could not reach Flutterwave:', error)
    return NextResponse.json(
      { error: 'We could not reach the payment provider. Please try again shortly.' },
      { status: 502 },
    )
  }
}
