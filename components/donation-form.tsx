'use client'

import { useState } from 'react'
import { Button } from '@/components/ui-components'
import { activeCampaigns, DEFAULT_CAMPAIGN_ID } from '@/lib/campaigns'
import {
  CURRENCIES,
  CURRENCY_CODES,
  PROVIDER_CURRENCIES,
  formatAmount,
  type CurrencyCode,
  type Frequency,
  type Provider,
} from '@/lib/donations'

const FIELD_CLASSES =
  'w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground'

const PROVIDER_LABELS: Record<Provider, { name: string; detail: string }> = {
  flutterwave: {
    name: 'Mobile Money or Card',
    detail: 'MTN Mobile Money, Airtel Money, Visa & Mastercard — via Flutterwave',
  },
  paypal: {
    name: 'PayPal',
    detail: 'Pay with a PayPal balance or an international card — USD only',
  },
}

interface DonationFormProps {
  initialCampaignId?: string
}

export function DonationForm({ initialCampaignId }: DonationFormProps) {
  const campaigns = activeCampaigns()

  const [frequency, setFrequency] = useState<Frequency>('once')
  const [currency, setCurrency] = useState<CurrencyCode>('UGX')
  const [provider, setProvider] = useState<Provider>('flutterwave')
  const [campaignId, setCampaignId] = useState(
    initialCampaignId ?? DEFAULT_CAMPAIGN_ID,
  )
  const [preset, setPreset] = useState<number | 'custom'>(
    CURRENCIES.UGX.presets[1],
  )
  const [customAmount, setCustomAmount] = useState('')
  const [donor, setDonor] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const [error, setError] = useState('')

  const config = CURRENCIES[currency]
  const amount = preset === 'custom' ? Number(customAmount) : preset
  const paypalAvailable = PROVIDER_CURRENCIES.paypal.includes(currency)

  const handleCurrencyChange = (next: CurrencyCode) => {
    setCurrency(next)
    setPreset(CURRENCIES[next].presets[1])
    setCustomAmount('')
    // PayPal only settles USD here, so fall back rather than fail on submit.
    if (!PROVIDER_CURRENCIES.paypal.includes(next) && provider === 'paypal') {
      setProvider('flutterwave')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!Number.isFinite(amount) || amount < config.min) {
      setError(`The minimum donation is ${formatAmount(config.min, currency)}.`)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`/api/donate/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          frequency,
          campaignId,
          ...donor,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.url) {
        setError(data.error ?? 'We could not start that donation. Please try again.')
        setStatus('idle')
        return
      }

      // Hand off to the provider's hosted checkout.
      window.location.href = data.url
    } catch {
      setError('We could not reach the payment provider. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Frequency */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          How often would you like to give?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(['once', 'monthly'] as Frequency[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFrequency(option)}
              aria-pressed={frequency === option}
              className={`px-4 py-3 rounded-xl border-2 font-serif font-bold transition-colors ${
                frequency === option
                  ? 'border-lime bg-lime/15 text-foreground'
                  : 'border-border text-muted-foreground hover:border-lime/50'
              }`}
            >
              {option === 'once' ? 'One-time' : 'Monthly'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Campaign */}
      <div>
        <label
          htmlFor="donation-campaign"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Where should your gift go?
        </label>
        <select
          id="donation-campaign"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className={FIELD_CLASSES}
        >
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
              {campaign.timing ? ` (${campaign.timing})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Currency */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          Currency
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {CURRENCY_CODES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => handleCurrencyChange(code)}
              aria-pressed={currency === code}
              className={`px-4 py-2.5 rounded-xl border-2 font-semibold transition-colors ${
                currency === code
                  ? 'border-lime bg-lime/15 text-foreground'
                  : 'border-border text-muted-foreground hover:border-lime/50'
              }`}
            >
              {code === 'UGX' ? 'UGX (Shillings)' : 'USD (Dollars)'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Amount */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          Amount
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {config.presets.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPreset(value)}
              aria-pressed={preset === value}
              className={`px-3 py-2.5 rounded-xl border-2 font-serif font-bold tabular-nums transition-colors ${
                preset === value
                  ? 'border-lime bg-lime/15 text-foreground'
                  : 'border-border text-muted-foreground hover:border-lime/50'
              }`}
            >
              {formatAmount(value, currency)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPreset('custom')}
            aria-pressed={preset === 'custom'}
            className={`px-3 py-2.5 rounded-xl border-2 font-serif font-bold transition-colors ${
              preset === 'custom'
                ? 'border-lime bg-lime/15 text-foreground'
                : 'border-border text-muted-foreground hover:border-lime/50'
            }`}
          >
            Other
          </button>
        </div>

        {preset === 'custom' && (
          <div>
            <label htmlFor="donation-amount" className="sr-only">
              Custom amount in {currency}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                {config.symbol}
              </span>
              <input
                id="donation-amount"
                type="number"
                inputMode="decimal"
                min={config.min}
                max={config.max}
                step={currency === 'UGX' ? 1000 : 1}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                required
                className={`${FIELD_CLASSES} pl-12`}
                placeholder={String(config.min)}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Minimum {formatAmount(config.min, currency)}.
            </p>
          </div>
        )}
      </fieldset>

      {/* Donor details */}
      <fieldset className="space-y-6">
        <legend className="block text-sm font-medium text-foreground mb-3">
          Your details
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="donor-name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Full Name *
            </label>
            <input
              id="donor-name"
              type="text"
              value={donor.name}
              onChange={(e) => setDonor({ ...donor, name: e.target.value })}
              required
              maxLength={120}
              className={FIELD_CLASSES}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="donor-email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address *
            </label>
            <input
              id="donor-email"
              type="email"
              value={donor.email}
              onChange={(e) => setDonor({ ...donor, email: e.target.value })}
              required
              maxLength={200}
              className={FIELD_CLASSES}
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="donor-phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Phone Number{' '}
            <span className="text-muted-foreground font-normal">
              (needed for mobile money)
            </span>
          </label>
          <input
            id="donor-phone"
            type="tel"
            value={donor.phone}
            onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
            maxLength={40}
            className={FIELD_CLASSES}
            placeholder="+256..."
          />
        </div>
      </fieldset>

      {/* Payment method */}
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          Payment method
        </legend>
        <div className="space-y-3">
          {(['flutterwave', 'paypal'] as Provider[]).map((option) => {
            const disabled = option === 'paypal' && !paypalAvailable
            return (
              <button
                key={option}
                type="button"
                disabled={disabled}
                onClick={() => setProvider(option)}
                aria-pressed={provider === option}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  provider === option
                    ? 'border-lime bg-lime/15'
                    : 'border-border hover:border-lime/50'
                }`}
              >
                <p className="font-serif font-bold text-foreground">
                  {PROVIDER_LABELS[option].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {disabled
                    ? 'Switch the currency to USD to pay with PayPal'
                    : PROVIDER_LABELS[option].detail}
                </p>
              </button>
            )
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div>
        <Button
          variant="lime"
          size="lg"
          className="w-full justify-center"
          disabled={status === 'sending'}
        >
          {status === 'sending'
            ? 'Redirecting…'
            : `Donate ${Number.isFinite(amount) && amount > 0 ? formatAmount(amount, currency) : ''}${
                frequency === 'monthly' ? ' monthly' : ''
              }`}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          You will be taken to a secure checkout to complete your donation.
          LeadPath never sees your card or mobile money details.
        </p>
      </div>
    </form>
  )
}
