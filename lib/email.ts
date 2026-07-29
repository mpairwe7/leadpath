// Resend is called over its REST API so the project carries no SDK dependency.
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char] as string,
  )
}

interface SendEmailOptions {
  /** Defaults to CONTACT_TO_EMAIL. */
  to?: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

export type SendEmailResult =
  | { ok: true }
  | { ok: false; reason: 'unconfigured' | 'failed' }

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const recipient = to ?? process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !recipient) {
    console.error(
      'Email is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.',
    )
    return { ok: false, reason: 'unconfigured' }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!response.ok) {
      console.error(
        'Resend rejected the message:',
        response.status,
        await response.text(),
      )
      return { ok: false, reason: 'failed' }
    }

    return { ok: true }
  } catch (error) {
    console.error('Failed to reach Resend:', error)
    return { ok: false, reason: 'failed' }
  }
}

/** Renders a label/value table matching the styling used across notifications. */
export function renderRows(rows: Array<[string, string]>): string {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#4e5a75;font-weight:600;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;color:#14213e;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
}
