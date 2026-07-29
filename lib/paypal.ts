// Live vs sandbox is chosen by PAYPAL_ENV so the same code path is exercised in
// both; anything other than "live" stays on sandbox to fail safe.
export function paypalBaseUrl(): string {
  return process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
}

export function paypalConfigured(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
}

export async function paypalAccessToken(): Promise<string | null> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const response = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(
        'PayPal token request failed:',
        response.status,
        await response.text(),
      )
      return null
    }

    const data = (await response.json()) as { access_token?: string }
    return data.access_token ?? null
  } catch (error) {
    console.error('Could not reach PayPal for an access token:', error)
    return null
  }
}

interface PayPalLink {
  href: string
  rel: string
}

/**
 * The approval link is `payer-action` when an experience_context is supplied and
 * `approve` on the classic order flow, so both are accepted.
 */
export function approvalLink(links: PayPalLink[] | undefined): string | null {
  if (!links) return null
  const match =
    links.find((link) => link.rel === 'payer-action') ??
    links.find((link) => link.rel === 'approve')
  return match?.href ?? null
}
