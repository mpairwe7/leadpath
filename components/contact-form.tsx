'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui-components'

const FIELD_CLASSES =
  'w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground'

interface ContactFormProps {
  /** Tags the email subject so enquiries can be told apart by page. */
  source: string
  includeOrganisation?: boolean
  subjectPlaceholder?: string
  messagePlaceholder?: string
  submitLabel?: string
  successTitle?: string
  successMessage?: string
}

export function ContactForm({
  source,
  includeOrganisation = false,
  subjectPlaceholder = 'How can we help?',
  messagePlaceholder = 'Your message...',
  submitLabel = 'Send Message',
  successTitle = 'Message Sent!',
  successMessage = 'Thank you for reaching out. We’ll get back to you as soon as possible.',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    subject: '',
    message: '',
    company: '', // honeypot — must stay empty
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
      setFormData({
        name: '',
        email: '',
        organisation: '',
        subject: '',
        message: '',
        company: '',
      })
    } catch {
      setError('We could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-success-ink" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-primary mb-2">
          {successTitle}
        </h3>
        <p className="text-muted-foreground">{successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-success-ink hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot: hidden from users, harvested by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${source}-company`}>Company</label>
        <input
          id={`${source}-company`}
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={`${source}-name`}
            className="block text-sm font-medium text-foreground mb-2"
          >
            Full Name *
          </label>
          <input
            id={`${source}-name`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={120}
            className={FIELD_CLASSES}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor={`${source}-email`}
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email Address *
          </label>
          <input
            id={`${source}-email`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={200}
            className={FIELD_CLASSES}
            placeholder="your@email.com"
          />
        </div>
      </div>

      {includeOrganisation && (
        <div>
          <label
            htmlFor={`${source}-organisation`}
            className="block text-sm font-medium text-foreground mb-2"
          >
            Organisation
          </label>
          <input
            id={`${source}-organisation`}
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            maxLength={160}
            className={FIELD_CLASSES}
            placeholder="Your organisation"
          />
        </div>
      )}

      <div>
        <label
          htmlFor={`${source}-subject`}
          className="block text-sm font-medium text-foreground mb-2"
        >
          Subject *
        </label>
        <input
          id={`${source}-subject`}
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          maxLength={200}
          className={FIELD_CLASSES}
          placeholder={subjectPlaceholder}
        />
      </div>

      <div>
        <label
          htmlFor={`${source}-message`}
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message *
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          maxLength={5000}
          className={`${FIELD_CLASSES} resize-none`}
          placeholder={messagePlaceholder}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <Button
        variant="lime"
        size="lg"
        className="w-full justify-center"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}
