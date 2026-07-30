'use client'

import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Users, Lightbulb, Award, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function LeadershipPage() {
  const focusAreas = [
    'Self-awareness and personal leadership',
    'Ethical and values-based leadership',
    'Communication and public speaking',
    'Critical thinking and data-driven decision-making',
    'Project planning and execution',
    'Teamwork and collaboration',
    'Problem-solving and innovation',
    'Entrepreneurial mindset development',
    'Emotional intelligence and resilience',
    'Leadership in the digital age',
  ]

  const methods = [
    {
      icon: <Award size={32} />,
      title: 'Experiential Learning',
      description:
        'Participants learn by doing — leading real projects and reflecting on what worked and what did not.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Case Studies',
      description:
        'Real decisions faced by real leaders, unpacked so participants can reason through the trade-offs themselves.',
    },
    {
      icon: <Users size={32} />,
      title: 'Simulations',
      description:
        'Low-stakes practice at high-stakes situations — negotiation, crisis response, and team conflict.',
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Mentorship',
      description:
        'Ongoing guidance from experienced leaders who have navigated the same challenges.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Learn to Lead <span className="text-lime">Yourself First</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Leadership is the foundation upon which successful careers,
            businesses, and communities are built. Before leading organisations
            or businesses, young people must first learn to lead themselves.
          </p>
        </div>
      </Section>

      {/* Why Leadership */}
      <Section id="why" className="bg-white">
        <div className="max-w-3xl">
          <Heading level={2} className="text-primary mb-6">
            Why Leadership
          </Heading>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Our leadership programmes equip participants with the mindset,
              skills, and confidence needed to influence others, solve problems,
              and make informed decisions in an increasingly complex world.
            </p>
            <p>
              Through experiential learning, case studies, simulations, and
              mentorship, participants develop practical leadership competencies
              that prepare them for lifelong success.
            </p>
          </div>
        </div>
      </Section>

      {/* Focus Areas */}
      <Section bgColor="light" id="focus">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            What Our Leadership Training Covers
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ten areas that together turn potential into practised capability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {focusAreas.map((area) => (
            <Card
              key={area}
              variant="elevated"
              className="flex items-start gap-3 border-l-4 border-l-lime"
            >
              <CheckCircle2
                size={20}
                className="text-success-ink flex-shrink-0 mt-0.5"
              />
              <span className="font-medium text-foreground">{area}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* How We Teach */}
      <Section id="approach" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            How We Teach It
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical competencies are built through practice, not lectures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methods.map((method) => (
            <Card key={method.title} variant="elevated" className="group">
              <div className="mb-4 p-4 w-fit rounded-2xl bg-lime/15 text-success-ink group-hover:bg-lime group-hover:text-navy-950 transition-colors">
                {method.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                {method.title}
              </h3>
              <p className="text-muted-foreground">{method.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Outcome */}
      <Section bgColor="light" id="outcome">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} className="text-primary mb-6">
            What You Leave With
          </Heading>
          <p className="text-xl text-muted-foreground leading-relaxed">
            By the end of the programme, participants are equipped to lead with
            integrity, inspire others, and create positive impact wherever they
            serve.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Lead with Excellence?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our leadership development programmes and unlock your leadership
          potential.
        </p>
        <Button variant="lime" href="/get-involved" size="lg">
          Start Leading Today
        </Button>
      </Section>
    </>
  )
}
