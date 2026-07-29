import { formatAmount, type DonationRequest } from '@/lib/donations'
import { escapeHtml, renderRows, sendEmail } from '@/lib/email'

interface DonationMeta {
  provider: 'PayPal' | 'Flutterwave'
  reference: string
  status: string
}

/**
 * Notifies the organisation that money arrived, and who sent it — the
 * "identify who paid" half of the donate-page requirement. Failures are logged
 * rather than thrown: a donor must never see an error because our own
 * notification could not be delivered after their card was already charged.
 */
export async function notifyDonation(
  donation: DonationRequest,
  meta: DonationMeta,
): Promise<void> {
  const amount = formatAmount(donation.amount, donation.currency)
  const cadence = donation.frequency === 'monthly' ? 'Monthly' : 'One-time'

  const rows: Array<[string, string]> = [
    ['Amount', `${amount} ${donation.currency}`],
    ['Frequency', cadence],
    ['Campaign', donation.campaignName],
    ['Donor', donation.name],
    ['Email', donation.email],
    ['Phone', donation.phone],
    ['Provider', meta.provider],
    ['Reference', meta.reference],
    ['Status', meta.status],
  ]

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px">
  <h2 style="font-size:18px;color:#0b1f4b;margin:0 0 4px">${cadence} donation received — ${escapeHtml(amount)}</h2>
  <p style="margin:0 0 16px;color:#4e5a75;font-size:13px">Campaign: ${escapeHtml(donation.campaignName)}</p>
  <table style="border-collapse:collapse;font-size:14px;width:100%">${renderRows(rows)}</table>
</div>`

  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')

  const result = await sendEmail({
    to: process.env.DONATIONS_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL,
    subject: `[Donation] ${amount} ${cadence.toLowerCase()} — ${donation.campaignName}`,
    html,
    text,
    replyTo: donation.email,
  })

  if (!result.ok) {
    // The payment itself succeeded; surface this loudly so it can be reconciled.
    console.error(
      `Donation ${meta.reference} succeeded but the notification email failed (${result.reason}).`,
      JSON.stringify({ ...donation, reference: meta.reference }),
    )
  }
}
