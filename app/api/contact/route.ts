import { NextResponse } from 'next/server'
import { escapeHtml, renderRows, sendEmail } from '@/lib/email'

const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  organisation: 'Organisation',
  subject: 'Subject',
  interest: 'Interest',
  experience: 'Experience',
  message: 'Message',
}

// Anything not listed here is dropped rather than relayed, so a tampered
// payload cannot inject arbitrary content into the email we send ourselves.
const ALLOWED_FIELDS = Object.keys(FIELD_LABELS)

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  organisation: 160,
  subject: 200,
  interest: 80,
  experience: 40,
  message: 5000,
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real users never see this field, bots fill everything. Return 200
  // so the bot believes it succeeded and does not retry with a different shape.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const fields: Record<string, string> = {}
  for (const key of ALLOWED_FIELDS) {
    const raw = body[key]
    if (typeof raw !== 'string') continue
    const trimmed = raw.trim()
    if (trimmed === '') continue
    if (trimmed.length > MAX_LENGTHS[key]) {
      return NextResponse.json(
        { error: `${FIELD_LABELS[key]} is too long.` },
        { status: 400 },
      )
    }
    fields[key] = trimmed
  }

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json(
      { error: 'Name, email and message are required.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(fields.email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const source =
    typeof body.source === 'string' && body.source.trim() !== ''
      ? body.source.trim().slice(0, 80)
      : 'Website'

  const rows = ALLOWED_FIELDS.filter((key) => fields[key]).map(
    (key) => [FIELD_LABELS[key], fields[key]] as [string, string],
  )

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px">
  <h2 style="font-size:18px;color:#0b1f4b;margin:0 0 4px">New ${escapeHtml(source)} enquiry</h2>
  <p style="margin:0 0 16px;color:#4e5a75;font-size:13px">Submitted via the LeadPath website.</p>
  <table style="border-collapse:collapse;font-size:14px;width:100%">${renderRows(rows)}</table>
</div>`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  const result = await sendEmail({
    subject: fields.subject
      ? `[${source}] ${fields.subject}`
      : `[${source}] New enquiry from ${fields.name}`,
    html,
    text,
    replyTo: fields.email,
  })

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          result.reason === 'unconfigured'
            ? 'The contact form is not configured yet. Please email us directly.'
            : 'We could not send your message. Please try again shortly.',
      },
      { status: result.reason === 'unconfigured' ? 503 : 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
