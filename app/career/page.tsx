'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Compass, GraduationCap, FileText, Handshake, CheckCircle2 } from 'lucide-react'

export default function CareerPage() {
  // Grouped so the list reads as a journey rather than an undifferentiated
  // block of thirteen bullets.
  const supportGroups = [
    {
      icon: <Compass size={28} />,
      title: 'Direction',
      items: [
        'Career discovery and planning',
        'Guidance on selecting market-relevant courses and career pathways',
        'Career coaching and mentorship',
      ],
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Study',
      items: [
        'University application support for undergraduate studies',
        'University application support for postgraduate studies',
        'Internship and graduate opportunity preparation',
      ],
    },
    {
      icon: <FileText size={28} />,
      title: 'Applying',
      items: [
        'CV and résumé writing',
        'Cover letter development',
        'LinkedIn profile optimisation',
        'Interview preparation and mock interviews',
        'Job search strategies',
      ],
    },
    {
      icon: <Handshake size={28} />,
      title: 'At Work',
      items: [
        'Workplace readiness and professional etiquette',
        'Personal branding and networking',
        'Access to employment opportunities through our partner organisations',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            More Than <span className="text-lime">Qualifications</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Navigating today&apos;s job market requires more than academic
            qualifications. It demands clarity, preparation, adaptability, and
            continuous professional growth.
          </p>
        </div>
      </Section>

      {/* What We Do */}
      <Section id="what-we-do" className="bg-white">
        <div className="max-w-3xl">
          <Heading level={2} className="text-primary mb-6">
            Support at Every Stage
          </Heading>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Our Career Development pillar supports young people at every stage
              of their professional journey — from choosing the right academic
              path to securing employment and excelling in the workplace.
            </p>
            <p>
              We help participants discover their strengths, align their passions
              with market opportunities, and build the competencies employers
              value most.
            </p>
          </div>
        </div>
      </Section>

      {/* Career Support */}
      <Section bgColor="light" id="support">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            What Our Career Support Includes
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical help from first course choice to first promotion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportGroups.map((group) => (
            <Card key={group.title} variant="elevated" className="group">
              <div className="mb-4 p-4 w-fit rounded-2xl bg-lime/15 text-success-ink group-hover:bg-lime group-hover:text-navy-950 transition-colors">
                {group.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-4">
                {group.title}
              </h3>
              <div className="space-y-2.5">
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-success-ink flex-shrink-0 mt-0.5"
                    />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Goal */}
      <Section id="goal" className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} className="text-primary mb-6">
            Our Goal
          </Heading>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Not only to help young people secure jobs, but to empower them to
            become high-performing professionals, trusted leaders, and employees
            whom organisations are proud to retain and develop.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Take the Next Step?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our career development programmes and build a career you are proud
          of.
        </p>
        <Button variant="lime" href="/get-involved" size="lg">
          Start Your Career Journey
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
