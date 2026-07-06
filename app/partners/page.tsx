'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Building2, Handshake, Award, Users, CheckCircle2 } from 'lucide-react'

export default function PartnersPage() {
  const partnerships = [
    {
      icon: <Building2 size={32} />,
      title: 'Corporate Partners',
      description: 'Develop talent pipeline and engage in employee development',
      benefits: ['Employee training programmes', 'Recruitment access', 'CSR alignment', 'Brand visibility'],
    },
    {
      icon: <Award size={32} />,
      title: 'Educational Partners',
      description: 'Integrate career development into academic curriculum',
      benefits: ['Student engagement', 'Career guidance', 'Internship opportunities', 'Alumni network'],
    },
    {
      icon: <Users size={32} />,
      title: 'NGO & Community Partners',
      description: 'Expand impact through collaborative community initiatives',
      benefits: ['Reach underserved communities', 'Resource sharing', 'Joint programmes', 'Mission alignment'],
    },
    {
      icon: <Handshake size={32} />,
      title: 'Individual Mentors',
      description: 'Share your expertise and impact lives directly',
      benefits: ['Flexible mentoring', 'Professional growth', 'Community impact', 'Networking'],
    },
  ]

  const currentPartners = [
    'TechHub Africa',
    'East Africa Tech Alliance',
    'Makerere University',
    'Uganda National Youth Council',
    'KLA',
    'Kabira Hub',
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Partner With <span className="text-accent">LeadPath</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Join us in our mission to empower careers and inspire leaders. Together, we can create greater impact in the community.
          </p>
        </div>
      </Section>

      {/* Partnership Models */}
      <Section id="models" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Partnership Opportunities
          </Heading>
          <p className="text-lg text-muted-foreground">
            Multiple ways to partner based on your organization&apos;s mission and capacity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerships.map((partner, idx) => (
            <Card key={idx} variant="elevated" className="group">
              <div className="mb-4 p-4 w-fit rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-white transition-colors">
                {partner.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-accent transition-colors">
                {partner.title}
              </h3>
              <p className="text-muted-foreground mb-6">{partner.description}</p>
              <div className="space-y-2">
                {partner.benefits.map((benefit, bidx) => (
                  <div key={bidx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Partner */}
      <Section bgColor="light" id="why">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Why Partner With LeadPath?
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Shared Mission',
              description: 'Align with an organization dedicated to youth empowerment and community development',
            },
            {
              title: 'Proven Track Record',
              description: 'Access a network of 2,500+ engaged members with tangible impact metrics',
            },
            {
              title: 'Strategic Alignment',
              description: 'Customizable partnerships that align with your corporate or organizational goals',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
              <h3 className="font-serif font-bold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Current Partners */}
      <Section id="current" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Our Current Partners
          </Heading>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {currentPartners.map((partner, idx) => (
            <Card key={idx} variant="elevated" className="flex items-center justify-center min-h-32">
              <p className="font-semibold text-center text-foreground">{partner}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Partnership Process */}
      <Section bgColor="light" id="process">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Partnership Process
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Discuss', desc: 'Explore partnership opportunities' },
            { step: '2', title: 'Design', desc: 'Co-create partnership model' },
            { step: '3', title: 'Execute', desc: 'Launch partnership initiatives' },
            { step: '4', title: 'Measure', desc: 'Track impact and outcomes' },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mb-3">
                {item.step}
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Let&apos;s Create Impact Together
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Ready to partner with LeadPath? Contact us to discuss how we can work together.
        </p>
        <Button variant="primary" href="/contact" size="lg">
          Get in Touch
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
