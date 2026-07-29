'use client'

import { useSearchParams } from 'next/navigation'
import { AlertCircle, Info } from 'lucide-react'

const MESSAGES: Record<string, { title: string; body: string; tone: 'warn' | 'info' }> = {
  cancelled: {
    title: 'Donation cancelled',
    body: 'No payment was taken. You can start again whenever you are ready.',
    tone: 'info',
  },
  failed: {
    title: 'That donation did not go through',
    body: 'No payment was taken. Please try again, or get in touch and we will help you give another way.',
    tone: 'warn',
  },
}

export function DonationStatusNotice() {
  const status = useSearchParams().get('status')
  const message = status ? MESSAGES[status] : undefined
  if (!message) return null

  const isWarning = message.tone === 'warn'

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-2xl border p-4 mb-10 ${
        isWarning
          ? 'border-destructive/40 bg-destructive/5'
          : 'border-border bg-muted'
      }`}
    >
      {isWarning ? (
        <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
      ) : (
        <Info size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
      )}
      <div>
        <p className="font-serif font-bold text-foreground">{message.title}</p>
        <p className="text-sm text-muted-foreground">{message.body}</p>
      </div>
    </div>
  )
}
