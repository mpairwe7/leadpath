'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { CheckCircle2, Award, Target } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="text-accent" />,
      title: 'Intentional Growth',
      description:
        'We create focused, meaningful experiences that lead to lasting professional development and personal transformation.',
    },
    {
      icon: <Award className="text-secondary" />,
      title: 'Excellence',
      description:
        'We maintain high standards in all our programmes, mentorship, and support services to ensure the best outcomes.',
    },
    {
      icon: <CheckCircle2 className="text-primary" />,
      title: 'Inclusivity',
      description:
        'We believe everyone deserves access to quality career development and leadership opportunities regardless of background.',
    },
  ]

  const team = [
    {
      name: 'Dr. Sarah Kamanja',
      title: 'Founder & Executive Director',
      bio: 'Visionary leader with 15+ years of experience in career development and organizational leadership.',
    },
    {
      name: 'James Mutonyi',
      title: 'Programme Director',
      bio: 'Experienced career coach specializing in youth empowerment and professional development pathways.',
    },
    {
      name: 'Rebecca Ouma',
      title: 'Mentorship Coordinator',
      bio: 'Expert in building meaningful mentoring relationships and supporting leadership development.',
    },
    {
      name: 'David Kipchoge',
      title: 'Partnerships Manager',
      bio: 'Strategic thinker focused on building collaborations with leading organizations and institutions.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Section
        bgColor="primary"
        className="pt-32 pb-16 md:pt-40 md:pb-20"
        id="hero"
      >
        <div>
          <Heading level={1} className="text-white mb-6">
            About <span className="text-accent">LeadPath</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            We are a community-driven organization committed to empowering young
            professionals and emerging leaders through comprehensive career development,
            leadership training, and entrepreneurship support programmes.
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section id="story" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading level={2} className="text-primary mb-6">
              Our Story
            </Heading>
            <div className="space-y-4 text-muted-foreground">
              <p>
                LeadPath was founded on the belief that every individual has the
                potential to achieve greatness. We recognized a critical gap in
                accessible, quality career development and leadership training
                resources, particularly for young professionals in East Africa.
              </p>
              <p>
                What started as a small mentoring initiative has grown into a
                comprehensive network connecting thousands of professionals,
                entrepreneurs, and leaders across multiple sectors and industries.
              </p>
              <p>
                Today, we continue our mission to discover emerging talent, develop
                essential skills, and inspire the next generation of leaders who
                will drive positive change in their organizations and communities.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-lg h-96"></div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section bgColor="light" id="mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower individuals with the knowledge, skills, and networks
              necessary to build fulfilling careers and become transformational
              leaders in their organizations and communities.
            </p>
          </Card>

          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every person has access to quality career guidance,
              leadership development, and mentorship to reach their full potential
              and create meaningful impact.
            </p>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section id="values" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Our Core Values
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <Card key={idx} variant="default">
              <div className="mb-4 w-fit p-3 rounded-lg bg-muted">
                {value.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Team */}
      <Section bgColor="light" id="team">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Our Team
          </Heading>
          <p className="text-lg text-muted-foreground">
            Dedicated professionals committed to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <Card key={idx} variant="default">
              <div className="w-full h-48 bg-gradient-to-br from-primary to-primary/50 rounded-lg mb-4"></div>
              <h3 className="font-serif font-bold text-lg text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-accent mb-3">
                {member.title}
              </p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section id="why-us" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-muted rounded-lg h-96"></div>
          <div>
            <Heading level={2} className="text-primary mb-6">
              Why Choose LeadPath?
            </Heading>
            <div className="space-y-4">
              {[
                'Holistic approach combining career, leadership, and entrepreneurship development',
                'Access to experienced mentors and industry leaders',
                'Proven track record with thousands of successful members',
                'Flexible programmes designed for working professionals',
                'Community-driven culture fostering peer learning and support',
                'Commitment to African talent and local solutions',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    size={24}
                    className="text-accent flex-shrink-0 mt-1"
                  />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Join Our Community Today
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Become part of a thriving network of professionals dedicated to career
          growth and leadership excellence.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Get Started Now
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
