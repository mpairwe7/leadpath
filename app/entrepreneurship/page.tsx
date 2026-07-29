'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { CheckCircle2 } from 'lucide-react'

export default function EntrepreneurshipPage() {
  const support = [
    'Identifying business opportunities',
    'Idea validation and refinement',
    'Design thinking and innovation',
    'Market research and customer discovery',
    'Business model development',
    'Business planning',
    'Financial literacy and budgeting',
    'Marketing and sales strategy',
    'Branding and customer acquisition',
    'Business operations and growth planning',
    'Pitch preparation and investor readiness',
    'Networking with successful entrepreneurs',
    'One-on-one mentorship and coaching',
  ]

  const qualities = [
    {
      title: 'Resilience',
      description: 'Staying with the problem long after the first plan fails.',
    },
    {
      title: 'Creativity',
      description: 'Seeing an opportunity where others see an obstacle.',
    },
    {
      title: 'Adaptability',
      description: 'Changing the approach when the market says something new.',
    },
    {
      title: 'Discipline',
      description: 'Doing the unglamorous work that compounds over time.',
    },
    {
      title: 'Strategic Thinking',
      description: 'Choosing deliberately what to build, and what to leave.',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Turn Ideas Into <span className="text-lime">Viable Businesses</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Entrepreneurship is one of the most powerful pathways to economic
            empowerment and sustainable development. We inspire young people to
            transform innovative ideas into viable businesses that solve real
            problems and create lasting value.
          </p>
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" className="bg-white">
        <div className="max-w-3xl">
          <Heading level={2} className="text-primary mb-6">
            Our Approach
          </Heading>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our entrepreneurship programmes combine practical business education
            with personalised mentorship, enabling aspiring entrepreneurs to
            confidently launch, manage, and grow successful ventures.
          </p>
        </div>
      </Section>

      {/* What Participants Receive */}
      <Section bgColor="light" id="support">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            What Participants Receive Support In
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From first idea to investor-ready venture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {support.map((item) => (
            <Card
              key={item}
              variant="elevated"
              className="flex items-start gap-3 border-l-4 border-l-lime"
            >
              <CheckCircle2
                size={20}
                className="text-success-ink flex-shrink-0 mt-0.5"
              />
              <span className="font-medium text-foreground">{item}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Entrepreneurial Qualities */}
      <Section id="qualities" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Beyond Business Skills
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We cultivate the qualities that carry a founder through the years no
            curriculum covers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualities.map((quality) => (
            <Card key={quality.title} variant="elevated">
              <div className="mb-4 w-10 h-1.5 rounded-full bg-lime" />
              <h3 className="font-serif font-bold text-xl text-primary mb-2">
                {quality.title}
              </h3>
              <p className="text-muted-foreground">{quality.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Outcome */}
      <Section bgColor="light" id="outcome">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} className="text-primary mb-6">
            The Result
          </Heading>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Through access to experienced mentors, industry experts, and
            entrepreneurial networks, participants gain the confidence and
            support needed to build sustainable ventures that create employment,
            solve community challenges, and drive economic growth.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Build Your Venture?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our entrepreneurship programmes and turn your idea into a business
          that lasts.
        </p>
        <Button variant="lime" href="/get-involved" size="lg">
          Start Building Today
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
