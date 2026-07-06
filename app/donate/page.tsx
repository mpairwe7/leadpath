'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Heart, TrendingUp, Users, Award, DollarSign, CheckCircle2 } from 'lucide-react'

export default function DonatePage() {
  const donationTiers = [
    {
      amount: '$25',
      period: 'per month',
      title: 'Supporter',
      description: 'Help us provide scholarships to deserving mentees',
      impact: 'Supports 1 mentee for a month',
      features: [
        'Donor recognition on website',
        'Monthly impact report',
        'Certificate of appreciation',
      ],
    },
    {
      amount: '$100',
      period: 'per month',
      title: 'Partner',
      description: 'Fund comprehensive mentorship programmes',
      impact: 'Supports 5 mentees for a month',
      features: [
        'All Supporter benefits',
        'Quarterly impact calls',
        'Listed as Partner on website',
        'Tax receipt',
      ],
      highlight: true,
    },
    {
      amount: '$500',
      period: 'per month',
      title: 'Champion',
      description: 'Enable entire programme delivery',
      impact: 'Supports 20+ mentees for a month',
      features: [
        'All Partner benefits',
        'Priority impact updates',
        'Named programme sponsor',
        'Annual recognition event',
      ],
    },
  ]

  const impacts = [
    {
      icon: <Users size={32} />,
      metric: '50',
      description: 'Mentees trained & supported',
    },
    {
      icon: <Award size={32} />,
      metric: '85%',
      description: 'Career advancement rate',
    },
    {
      icon: <TrendingUp size={32} />,
      metric: '6 months',
      description: 'Average time to career goal',
    },
    {
      icon: <Heart size={32} />,
      metric: '$10K',
      description: 'Typical salary increase',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Support Our <span className="text-accent">Mission</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Your donation helps us empower careers and inspire leaders. Every contribution makes a tangible difference in someone&apos;s life.
          </p>
        </div>
      </Section>

      {/* Impact Summary */}
      <Section id="impact" className="bg-white">
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
              <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10 mx-auto">
                <div className="text-accent">{item.icon}</div>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">{item.metric}</div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Donation Tiers */}
      <Section bgColor="light" id="tiers">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Choose Your Support Level
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All donations are tax-deductible. Choose a recurring donation or make a one-time contribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {donationTiers.map((tier, idx) => (
            <Card
              key={idx}
              variant={tier.highlight ? 'accent' : 'default'}
              className={tier.highlight ? 'md:scale-105 shadow-lg' : ''}
            >
              <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                {tier.title}
              </h3>
              <div className="mb-4">
                <div className="text-4xl font-bold text-accent">{tier.amount}</div>
                <div className="text-muted-foreground text-sm">{tier.period}</div>
              </div>
              <p className="text-muted-foreground mb-4">{tier.description}</p>
              <div className="p-3 bg-accent/5 rounded-lg mb-6">
                <p className="text-sm font-medium text-foreground">
                  <span className="text-accent font-bold">Impact:</span> {tier.impact}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" href="#" className="w-full justify-center">
                Donate {tier.amount}/month
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* One-Time Donation */}
      <Section id="one-time" className="bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={2} className="text-primary mb-2">
              Or Make a One-Time Donation
            </Heading>
            <p className="text-lg text-muted-foreground">
              Every amount helps. Choose an amount or enter your own:
            </p>
          </div>

          <Card variant="elevated" className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['$10', '$25', '$50', '$100', '$250', '$500', '$1,000', 'Custom'].map((amount, idx) => (
                <Button
                  key={idx}
                  variant={idx === 0 ? 'primary' : 'outline'}
                  className="w-full justify-center"
                >
                  {amount}
                </Button>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="font-serif font-bold text-xl text-primary mb-4">
                Payment Methods
              </h3>
              <div className="space-y-3">
                {[
                  { method: 'Mobile Money', desc: 'MTN Mobile Money, Airtel Money' },
                  { method: 'Bank Transfer', desc: 'Direct bank account transfer' },
                  { method: 'Online', desc: 'Credit/debit card via secure payment' },
                ].map((item, idx) => (
                  <Card key={idx} variant="default">
                    <p className="font-semibold text-foreground">{item.method}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="w-full justify-center mt-8"
            >
              Complete Donation
            </Button>
          </Card>
        </div>
      </Section>

      {/* Where Money Goes */}
      <Section bgColor="light" id="allocation">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            How Your Donation is Used
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card variant="elevated">
            <div className="w-full h-64 bg-gradient-to-br from-accent to-primary rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-sm">Programme Delivery</div>
              </div>
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">
              Programme Delivery
            </h3>
            <p className="text-muted-foreground text-sm">
              Training materials, mentorship coordination, and direct support to participants
            </p>
          </Card>

          <Card variant="elevated">
            <div className="w-full h-64 bg-gradient-to-br from-secondary to-primary rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-sm">Operations</div>
              </div>
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">
              Operations
            </h3>
            <p className="text-muted-foreground text-sm">
              Staff, technology, office space, and administrative costs
            </p>
          </Card>
        </div>

        <Card variant="elevated">
          <div className="w-full h-64 bg-gradient-to-br from-muted to-accent rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center text-foreground">
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-sm">Growth & Impact</div>
            </div>
          </div>
          <h3 className="font-serif font-bold text-lg text-primary mb-2">
            Growth & Impact Expansion
          </h3>
          <p className="text-muted-foreground text-sm">
            Research, monitoring & evaluation, and expansion to reach more communities
          </p>
        </Card>
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
              q: 'Is my donation tax-deductible?',
              a: 'Yes, LeadPath is a registered NGO. All donations are tax-deductible. You&apos;ll receive a tax receipt upon donation.',
            },
            {
              q: 'Can I change my donation amount?',
              a: 'Yes, you can modify or cancel your recurring donation at any time by contacting us.',
            },
            {
              q: 'How can I get updates on my donation impact?',
              a: 'All donors receive regular impact reports. Recurring donors get personalized updates on the programmes they support.',
            },
            {
              q: 'Can I donate in memory of someone?',
              a: 'Yes! We offer memorial donations. Please contact us for details.',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
              <details className="cursor-pointer">
                <summary className="font-semibold text-foreground hover:text-accent transition-colors">
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
          Your generosity empowers careers and inspires leaders. Thank you for supporting our mission.
        </p>
        <Button variant="primary" href="#tiers" size="lg">
          Choose Donation Amount
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
