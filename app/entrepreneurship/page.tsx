'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Lightbulb, Zap, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react'

export default function EntrepreneurshipPage() {
  const stages = [
    {
      icon: <Lightbulb size={28} />,
      title: 'Ideation',
      desc: 'Validate and refine your business idea with expert feedback',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Planning',
      desc: 'Develop a comprehensive business plan and financial projections',
    },
    {
      icon: <Zap size={28} />,
      title: 'Launch',
      desc: 'Execute your business launch with strategic support and resources',
    },
    {
      icon: <DollarSign size={28} />,
      title: 'Growth',
      desc: 'Scale your business and connect with investors for expansion',
    },
  ]

  const services = [
    {
      title: 'Business Validation',
      description: 'Validate your idea and test assumptions in the market',
      features: ['Market research', 'Customer interviews', 'Feasibility analysis'],
    },
    {
      title: 'Business Planning',
      description: 'Create a detailed business plan and financial model',
      features: ['Business plan development', 'Financial projections', 'Go-to-market strategy'],
    },
    {
      title: 'Pitch Development',
      description: 'Master the art of pitching your business to investors',
      features: ['Pitch deck creation', 'Elevator pitches', 'Investor presentation'],
    },
    {
      title: 'Funding & Investors',
      description: 'Connect with investors and explore funding options',
      features: ['Investor introductions', 'Fundraising strategy', 'Grant opportunities'],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Turn Your Idea Into a <span className="text-accent">Thriving Business</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            From concept to scaling, we provide the mentorship, resources, and network you need to launch and grow your successful venture.
          </p>
        </div>
      </Section>

      {/* Entrepreneurship Journey */}
      <Section id="journey" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            The Entrepreneurship Journey
          </Heading>
          <p className="text-lg text-muted-foreground">
            Four critical stages from idea to thriving business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stages.map((stage, idx) => (
            <Card key={idx} variant="elevated">
              <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10">
                <div className="text-accent">{stage.icon}</div>
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-2">
                {stage.title}
              </h3>
              <p className="text-muted-foreground text-sm">{stage.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section bgColor="light" id="services">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Entrepreneurship Services
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support across the entire entrepreneurial journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} variant="elevated" className="group">
              <h3 className="font-serif font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Success Metrics */}
      <Section id="impact" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Startup Success Rates
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { metric: '78%', label: 'Businesses Launched' },
            { metric: '65%', label: 'Still Operating After 3 Years' },
            { metric: '$45M+', label: 'Total Funding Raised' },
          ].map((item, idx) => (
            <Card key={idx} variant="elevated" className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{item.metric}</div>
              <p className="text-foreground font-medium">{item.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Launch Your Business?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our entrepreneurship programme and connect with mentors, investors, and fellow founders.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Start Your Startup Journey
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
