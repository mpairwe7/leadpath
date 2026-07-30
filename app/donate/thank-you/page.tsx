import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { Section, Heading, Card, Button } from '@/components/ui-components'

export const metadata: Metadata = {
  title: 'Thank you for your donation | LeadPath',
  description:
    'Your donation to LeadPath has been received. Thank you for supporting young leaders across East Africa.',
  robots: { index: false },
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams

  return (
    <>
      <Section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-success-ink" />
          </div>

          <Heading level={1} className="text-primary mb-4">
            Thank you
          </Heading>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Your donation has been received. A receipt is on its way to your
            email, and your gift goes straight into the programmes that help
            young people build careers, businesses, and the confidence to lead.
          </p>

          {ref && (
            <Card variant="elevated" className="mb-8 inline-block">
              <p className="text-sm text-muted-foreground mb-1">
                Your reference
              </p>
              <p className="font-serif font-bold text-lg text-foreground break-all">
                {ref}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Keep this if you need to contact us about your donation.
              </p>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="lime" href="/" size="lg">
              Back to home
            </Button>
            <Button variant="outline" href="/contact" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
