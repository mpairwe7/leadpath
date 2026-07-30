'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DonationForm } from '@/components/donation-form'
import { DonationStatusNotice } from '@/components/donation-status-notice'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { featuredCampaign } from '@/lib/campaigns'
import { Heart, TrendingUp, Users, Award, Sparkles } from 'lucide-react'

export default function DonatePage() {
  const campaign = featuredCampaign()

  // Framed as what a gift funds rather than as checkout buttons — the amounts
  // are chosen in the form below, in either currency.
  const impactLevels = [
    {
      title: 'Supporter',
      guide: 'From $25 / USh 90,000',
      impact: 'Supports one participant through a month of the programme',
    },
    {
      title: 'Partner',
      guide: 'From $100 / USh 370,000',
      impact: 'Funds a full mentorship cycle for five participants',
      highlight: true,
    },
    {
      title: 'Champion',
      guide: 'From $500 / USh 1,850,000',
      impact: 'Underwrites programme delivery for a cohort of twenty',
    },
  ]

  const impacts = [
    { icon: <Users size={32} />, metric: '2,500+', description: 'Members empowered' },
    { icon: <Award size={32} />, metric: '85%', description: 'Career success rate' },
    {
      icon: <TrendingUp size={32} />,
      metric: '1,000+',
      description: 'Entrepreneurial businesses supported',
    },
    { icon: <Heart size={32} />, metric: '100+', description: 'Leaders developed' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — split screen */}
      <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-navy grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 px-6 py-14 sm:px-10 md:px-14 md:py-20">
              <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-lime-400 mb-4">
                Donate
              </p>
              <h1 className="font-serif font-extrabold tracking-tight text-balance text-4xl md:text-5xl text-white mb-5">
                Support our mission
              </h1>
              <p className="text-lg text-white/85 max-w-lg leading-relaxed">
                Your donation helps us empower careers and inspire leaders. Every
                contribution makes a tangible difference in someone&apos;s life.
              </p>
            </div>
            <div className="relative min-h-[220px]">
              <Image
                src="/uganda-classroom.jpg"
                alt="Students in a lecture hall at Makerere University, Kampala, Uganda"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Give */}
      <Section id="give">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={null}>
            <DonationStatusNotice />
          </Suspense>

          {campaign && (
            <div className="rounded-3xl border-2 border-lime bg-lime/10 p-6 mb-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-success-ink" />
                <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-success-ink">
                  Featured campaign
                  {campaign.timing ? ` · ${campaign.timing}` : ''}
                </p>
              </div>
              <h2 className="font-serif font-bold text-2xl text-primary mb-2">
                {campaign.name}
              </h2>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>
          )}

          <div className="text-center mb-10">
            <Heading level={2} className="text-primary mb-2">
              Make a Donation
            </Heading>
            <p className="text-lg text-muted-foreground">
              Give once or monthly, in shillings or dollars.
            </p>
          </div>

          <Card variant="elevated" className="p-6 sm:p-8">
            <DonationForm initialCampaignId={campaign?.id} />
          </Card>
        </div>
      </Section>

      {/* Impact Summary */}
      <Section bgColor="light" id="impact">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Your Impact
          </Heading>
          <p className="text-lg text-muted-foreground">
            See how donations power our programmes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((item, idx) => (
            <Card key={idx} variant="elevated" className="text-center">
              <div className="mb-4 p-3 w-fit rounded-2xl bg-lime/15 mx-auto text-success-ink">
                {item.icon}
              </div>
              <div className="text-3xl font-serif font-extrabold text-primary mb-2 tabular-nums">
                {item.metric}
              </div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* What Your Gift Does */}
      <Section id="levels" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            What Your Gift Does
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A guide to the difference different levels of support make
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactLevels.map((level, idx) => (
            <Card
              key={idx}
              variant="elevated"
              className={
                level.highlight ? 'border-t-4 border-t-lime md:scale-105' : ''
              }
            >
              <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                {level.title}
              </h3>
              <p className="font-serif font-bold text-lg text-success-ink mb-4">
                {level.guide}
              </p>
              <p className="text-muted-foreground mb-6">{level.impact}</p>
              <Button
                variant={level.highlight ? 'lime' : 'outline'}
                href="#give"
                className="w-full justify-center"
              >
                Give this amount
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Where Money Goes */}
      <Section bgColor="light" id="allocation">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            How Your Donation is Used
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              share: '60%',
              title: 'Programme Delivery',
              description:
                'Training materials, mentorship coordination, and direct support to participants',
            },
            {
              share: '25%',
              title: 'Operations',
              description:
                'Staff, technology, office space, and administrative costs',
            },
            {
              share: '15%',
              title: 'Growth & Impact',
              description:
                'Research, monitoring & evaluation, and expansion to reach more communities',
            },
          ].map((item) => (
            <Card key={item.title} variant="elevated">
              <div className="w-full h-40 bg-gradient-to-br from-navy-700 to-navy-950 rounded-2xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-serif font-extrabold text-lime mb-1 tabular-nums">
                    {item.share}
                  </div>
                  <div className="text-sm text-white/80">{item.title}</div>
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section id="faq" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Donation FAQs
          </Heading>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              q: 'What payment methods can I use?',
              a: 'You can give with MTN Mobile Money, Airtel Money, or a Visa/Mastercard through Flutterwave, or with PayPal and international cards through PayPal. Mobile money and shilling payments go through Flutterwave; PayPal is processed in US dollars.',
            },
            {
              q: 'Can I change or cancel a monthly donation?',
              a: 'Yes. Monthly donations can be changed or cancelled at any time — contact us with your donation reference and we will take care of it.',
            },
            {
              q: 'Will I get a receipt?',
              a: 'Yes. The payment provider emails you a receipt as soon as your donation completes, and we record your reference against the campaign you chose.',
            },
            {
              q: 'Can I give to a specific campaign?',
              a: 'Yes. Choose the campaign in the donation form and your gift is recorded against it. If you would rather we direct it wherever the need is greatest, choose “Where it is needed most”.',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
              <details className="cursor-pointer">
                <summary className="font-semibold text-foreground hover:text-success-ink transition-colors">
                  {item.q}
                </summary>
                <p className="text-muted-foreground mt-3">{item.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Make a Difference Today
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Your generosity empowers careers and inspires leaders. Thank you for
          supporting our mission.
        </p>
        <Button variant="lime" href="#give" size="lg">
          Donate Now
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
