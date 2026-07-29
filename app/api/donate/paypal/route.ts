import { NextResponse } from 'next/server'
import { parseDonation, siteUrl } from '@/lib/donations'
import { approvalLink, paypalAccessToken, paypalBaseUrl } from '@/lib/paypal'

function splitName(name: string): { given_name: string; surname: string } {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return { given_name: parts[0], surname: parts[0] }
  return {
    given_name: parts.slice(0, -1).join(' '),
    surname: parts[parts.length - 1],
  }
}

export async function POST(request: Request) {
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

  if (donation.currency !== 'USD') {
    return NextResponse.json(
      { error: 'PayPal donations are processed in USD. Choose USD or pay with Flutterwave.' },
      { status: 400 },
    )
  }

  const token = await paypalAccessToken()
  if (!token) {
    return NextResponse.json(
      { error: 'Card and PayPal donations are not available right now. Please try Flutterwave.' },
      { status: 503 },
    )
  }

  const base = paypalBaseUrl()
  const site = siteUrl()
  const value = donation.amount.toFixed(2)
  const description = `LeadPath donation — ${donation.campaignName}`.slice(0, 127)

  try {
    if (donation.frequency === 'monthly') {
      // One base plan carries the schedule; the amount is overridden per
      // subscription so donors are not limited to preset tiers.
      const planId = process.env.PAYPAL_MONTHLY_PLAN_ID
      if (!planId) {
        return NextResponse.json(
          {
            error:
              'Monthly PayPal donations are not set up yet. Please choose a one-time donation, or give monthly via Flutterwave.',
          },
          { status: 503 },
        )
      }

      const response = await fetch(`${base}/v1/billing/subscriptions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          custom_id: donation.campaignId,
          subscriber: {
            name: splitName(donation.name),
            email_address: donation.email,
          },
          plan: {
            billing_cycles: [
              {
                sequence: 1,
                total_cycles: 0,
                pricing_scheme: {
                  fixed_price: { currency_code: 'USD', value },
                },
              },
            ],
          },
          application_context: {
            brand_name: 'LeadPath',
            user_action: 'SUBSCRIBE_NOW',
            return_url: `${site}/api/donate/paypal/capture?mode=subscription`,
            cancel_url: `${site}/donate?status=cancelled`,
          },
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error('PayPal subscription creation failed:', response.status, data)
        return NextResponse.json(
          { error: 'We could not start that donation. Please try again.' },
          { status: 502 },
        )
      }

      const url = approvalLink(data.links)
      if (!url) {
        console.error('PayPal subscription returned no approval link:', data)
        return NextResponse.json(
          { error: 'We could not start that donation. Please try again.' },
          { status: 502 },
        )
      }
      return NextResponse.json({ url })
    }

    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: 'USD', value },
            description,
            custom_id: donation.campaignId,
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: 'LeadPath',
              user_action: 'PAY_NOW',
              shipping_preference: 'NO_SHIPPING',
              return_url: `${site}/api/donate/paypal/capture?mode=order`,
              cancel_url: `${site}/donate?status=cancelled`,
            },
          },
        },
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      console.error('PayPal order creation failed:', response.status, data)
      return NextResponse.json(
        { error: 'We could not start that donation. Please try again.' },
        { status: 502 },
      )
    }

    const url = approvalLink(data.links)
    if (!url) {
      console.error('PayPal order returned no approval link:', data)
      return NextResponse.json(
        { error: 'We could not start that donation. Please try again.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Could not reach PayPal:', error)
    return NextResponse.json(
      { error: 'We could not reach PayPal. Please try again shortly.' },
      { status: 502 },
    )
  }
}
