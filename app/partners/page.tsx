'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { Section, Heading, Card } from '@/components/ui-components'
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

  const currentPartners = ['Junior Achievement', 'Kampala International University']

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Partner With <span className="text-lime">LeadPath</span>
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
              <div className="mb-4 p-4 w-fit rounded-2xl bg-lime/15 text-success-ink group-hover:bg-lime group-hover:text-navy-950 transition-colors">
                {partner.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-success-ink transition-colors">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {currentPartners.map((partner, idx) => (
            <Card
              key={idx}
              variant="elevated"
              className="flex items-center justify-center min-h-32 border-t-4 border-t-lime"
            >
              <p className="font-serif font-bold text-lg text-center text-foreground">
                {partner}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Get in Touch — partners can enquire without leaving this page */}
      <Section bgColor="light" id="get-in-touch">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <Heading level={2} className="text-primary mb-4">
              Get in Touch
            </Heading>
            <p className="text-lg text-muted-foreground mb-6">
              Tell us about your organisation and what you would like to achieve
              together. We will get back to you within two business days.
            </p>
            <div className="space-y-3">
              {[
                'No commitment — start with a conversation',
                'Partnership models tailored to your goals',
                'Direct line to our partnerships team',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-success-ink flex-shrink-0 mt-0.5"
                  />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card variant="elevated" className="p-8">
            <ContactForm
              source="Partners"
              includeOrganisation
              subjectPlaceholder="Partnership enquiry"
              messagePlaceholder="Tell us about your organisation and the partnership you have in mind..."
              submitLabel="Send Partnership Enquiry"
              successMessage="Thank you for your interest in partnering with LeadPath. Our partnerships team will be in touch shortly."
            />
          </Card>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
