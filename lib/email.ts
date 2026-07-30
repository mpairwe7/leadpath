import nodemailer from 'nodemailer'

// Resend is called over its REST API so the project carries no SDK dependency.
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

// LeadPath's public enquiries inbox, also shown in the footer and on /contact.
// Used when CONTACT_TO_EMAIL is not set so a missing env var cannot silently
// send enquiries to the wrong place.
const DEFAULT_RECIPIENT = 'leadpath360@gmail.com'

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

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  // Resend is preferred when configured; it is a transactional-mail API
  // rather than a personal inbox, so it does not risk Gmail's sending
  // limits or spam heuristics. Falls back to the Gmail SMTP account already
  // in use for the site (SMTP_HOST/PORT/USER/PASS) when no Resend key is set.
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(options)
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendViaSmtp(options)
  }
  console.error(
    'Email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL, or SMTP_HOST/SMTP_USER/SMTP_PASS.',
  )
  return { ok: false, reason: 'unconfigured' }
}

async function sendViaResend({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const recipient = to ?? process.env.CONTACT_TO_EMAIL ?? DEFAULT_RECIPIENT

  if (!apiKey || !from) {
    console.error('Email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.')
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

let smtpTransport: ReturnType<typeof nodemailer.createTransport> | null = null

function getSmtpTransport() {
  if (!smtpTransport) {
    smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      // 465 is implicit TLS; every other port (587, 25) starts plain and upgrades via STARTTLS.
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return smtpTransport
}

async function sendViaSmtp({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<SendEmailResult> {
  // Gmail rejects a From address that is not the authenticated account (or a
  // verified alias of it), so CONTACT_FROM_EMAIL is ignored on this path.
  const from = process.env.SMTP_USER as string
  const recipient = to ?? process.env.CONTACT_TO_EMAIL ?? DEFAULT_RECIPIENT

  try {
    await getSmtpTransport().sendMail({
      from: `LeadPath <${from}>`,
      to: recipient,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    })
    return { ok: true }
  } catch (error) {
    console.error('Failed to send via SMTP:', error)
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
