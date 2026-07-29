import { NextResponse } from 'next/server'
import { DEFAULT_CAMPAIGN_ID } from '@/lib/campaigns'
import { notifyDonation } from '@/lib/donation-email'
import { siteUrl, type CurrencyCode, type Frequency } from '@/lib/donations'

const FLW_BASE = 'https://api.flutterwave.com/v3'

function back(path: string): NextResponse {
  return NextResponse.redirect(`${siteUrl()}${path}`, { status: 303 })
}

/**
 * Flutterwave sends the donor back here with a status in the query string. That
 * status is only a hint — the transaction is re-read from Flutterwave over the
 * server-to-server API before anything is treated as paid.
 */
export async function GET(request: Request) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secret) return back('/donate?status=failed')

  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const transactionId = url.searchParams.get('transaction_id')

  if (status === 'cancelled') return back('/donate?status=cancelled')
  if (!transactionId) return back('/donate?status=failed')

  try {
    const response = await fetch(
      `${FLW_BASE}/transactions/${encodeURIComponent(transactionId)}/verify`,
      {
        headers: { Authorization: `Bearer ${secret}` },
        cache: 'no-store',
      },
    )
    const payload = await response.json()

    if (!response.ok || payload.status !== 'success') {
      console.error('Flutterwave verification failed:', response.status, payload)
      return back('/donate?status=failed')
    }

    const tx = payload.data
    if (tx?.status !== 'successful') {
      console.error('Flutterwave transaction not successful:', tx?.status, tx?.id)
      return back('/donate?status=failed')
    }

    const meta = tx.meta ?? {}
    const campaignId = meta.campaign_id ?? DEFAULT_CAMPAIGN_ID

    await notifyDonation(
      {
        amount: Number(tx.amount ?? 0),
        currency: (tx.currency ?? 'UGX') as CurrencyCode,
        frequency: (meta.frequency === 'monthly' ? 'monthly' : 'once') as Frequency,
        campaignId,
        campaignName: meta.campaign_name ?? 'General fund',
        name: tx.customer?.name ?? meta.donor_name ?? 'Unknown donor',
        email: tx.customer?.email ?? '',
        phone: tx.customer?.phone_number ?? meta.donor_phone ?? '',
      },
      {
        provider: 'Flutterwave',
        reference: tx.tx_ref ?? String(tx.id ?? transactionId),
        status: tx.status,
      },
    )

    return back(
      `/donate/thank-you?ref=${encodeURIComponent(tx.tx_ref ?? String(tx.id ?? transactionId))}`,
    )
  } catch (error) {
    console.error('Flutterwave return handling failed:', error)
    return back('/donate?status=failed')
  }
}
