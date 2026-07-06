'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Users, Lightbulb, Award, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function LeadershipPage() {
  const competencies = [
    { title: 'Vision Setting', description: 'Define inspiring goals and direction for your team' },
    { title: 'People Development', description: 'Coach and mentor your team to reach their potential' },
    { title: 'Decision Making', description: 'Make strategic decisions with confidence and clarity' },
    { title: 'Change Management', description: 'Lead organizational change effectively' },
    { title: 'Communication', description: 'Influence and inspire through powerful communication' },
    { title: 'Emotional Intelligence', description: 'Understand and manage emotions in yourself and others' },
  ]

  const programmes = [
    {
      icon: <Award size={32} />,
      title: 'Leadership Essentials',
      description: 'Foundation programme for emerging and developing leaders',
      modules: ['Leadership fundamentals', 'Emotional intelligence', 'Team dynamics', 'Ethics & integrity'],
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Executive Presence',
      description: 'Develop the presence and impact of a senior leader',
      modules: ['Strategic thinking', 'Executive communication', 'Presence & influence', 'Stakeholder management'],
    },
    {
      icon: <Users size={32} />,
      title: 'Transformational Leadership',
      description: 'Learn to inspire change and drive organizational transformation',
      modules: ['Change leadership', 'Innovation management', 'Culture building', 'Organizational development'],
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Executive Coaching',
      description: 'One-on-one coaching with experienced executive coaches',
      modules: ['360 feedback', 'Personalized coaching', 'Leadership plan', 'Progress tracking'],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Develop Your <span className="text-accent">Leadership Excellence</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Transform yourself into an inspiring and effective leader who drives results and develops others.
          </p>
        </div>
      </Section>

      {/* Leadership Competencies */}
      <Section id="competencies" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Core Leadership Competencies
          </Heading>
          <p className="text-lg text-muted-foreground">
            Six essential skills that define modern leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map((comp, idx) => (
            <Card key={idx} variant="elevated">
              <div className="mb-4 w-1.5 h-1.5 rounded-full bg-accent"></div>
              <h3 className="font-serif font-bold text-xl text-primary mb-2">{comp.title}</h3>
              <p className="text-muted-foreground">{comp.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Programmes */}
      <Section bgColor="light" id="programmes">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Leadership Development Programmes
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the programme that matches your current level and career aspirations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programmes.map((prog, idx) => (
            <Card key={idx} variant="elevated" className="group">
              <div className="mb-4 p-4 w-fit rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-white transition-colors">
                {prog.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-accent transition-colors">
                {prog.title}
              </h3>
              <p className="text-muted-foreground mb-6">{prog.description}</p>
              <div className="space-y-2 mb-6">
                {prog.modules.map((module, midx) => (
                  <div key={midx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                    <span className="text-foreground">{module}</span>
                  </div>
                ))}
              </div>
              <Button variant="primary" href="/get-involved" className="text-sm">
                Explore
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Learning Approach */}
      <Section id="approach" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Our Learning Approach
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Self-Assessment', desc: '360 feedback and personality assessments' },
            { title: 'Learning', desc: 'Interactive workshops and e-learning modules' },
            { title: 'Application', desc: 'Real-world projects and case studies' },
            { title: 'Accountability', desc: 'Coaching and peer accountability groups' },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
              <h3 className="font-serif font-bold text-lg text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Lead with Excellence?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our leadership development programmes and unlock your leadership potential.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Start Leading Today
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
