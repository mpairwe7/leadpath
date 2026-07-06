'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Briefcase, Target, BookOpen, Users, CheckCircle2, TrendingUp } from 'lucide-react'

export default function CareerPage() {
  const stages = [
    {
      title: 'Discovery',
      description: 'Understand your strengths, interests, and values',
      icon: Target,
      content:
        'Start your journey by exploring your passions and understanding your unique strengths through guided assessments and reflections.',
    },
    {
      title: 'Exploration',
      description: 'Research career paths and opportunities',
      icon: BookOpen,
      content:
        'Learn about different career options, industries, and roles that align with your interests and goals.',
    },
    {
      title: 'Planning',
      description: 'Create your career roadmap',
      icon: TrendingUp,
      content:
        'Develop a clear plan for achieving your career goals with specific milestones and timelines.',
    },
    {
      title: 'Development',
      description: 'Build skills and gain experience',
      icon: Briefcase,
      content:
        'Access training, mentorship, and opportunities to develop the skills needed for your target role.',
    },
  ]

  const services = [
    {
      icon: <Target size={32} />,
      title: 'Career Assessments',
      description:
        'Comprehensive assessments to identify your strengths, interests, values, and personality type.',
      features: [
        'Skills inventory analysis',
        'Personality assessments',
        'Values clarification',
        'Strengths identification',
      ],
    },
    {
      icon: <Users size={32} />,
      title: 'Career Coaching',
      description:
        'One-on-one coaching to help you navigate your career path and overcome challenges.',
      features: [
        'Personalized career guidance',
        'Goal setting support',
        'Decision-making assistance',
        'Ongoing accountability',
      ],
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Skills Development',
      description:
        'Training programmes to develop in-demand skills for career success.',
      features: [
        'Technical skills training',
        'Soft skills workshops',
        'Industry certifications',
        'Hands-on projects',
      ],
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Job Search Support',
      description:
        'Comprehensive support for finding and securing your ideal job.',
      features: [
        'Resume optimization',
        'Interview preparation',
        'Job search strategy',
        'Salary negotiation',
      ],
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
            Build Your <span className="text-accent">Dream Career</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Navigate your career path with confidence. From discovering your
            passion to landing your dream job, we&apos;re here to guide you every step
            of the way.
          </p>
        </div>
      </Section>

      {/* The Career Journey */}
      <Section id="journey" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Your Career Journey
          </Heading>
          <p className="text-lg text-muted-foreground">
            A structured pathway to career success in four key stages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <Card key={idx} variant="elevated">
                <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10">
                  <Icon size={28} className="text-accent" />
                </div>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {stage.description}
                </p>
                <p className="text-sm text-foreground">{stage.content}</p>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* Services */}
      <Section bgColor="light" id="services">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Our Career Development Services
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support across all aspects of career development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} variant="elevated" className="group">
              <div className="mb-4 p-4 w-fit rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-secondary flex-shrink-0"
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                href="/get-involved"
                className="text-sm"
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Success Stories */}
      <Section id="success" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Career Success Stories
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Amina Hassan',
              role: 'From Graduate to Tech Lead',
              story:
                'LeadPath helped me transition from uncertain graduate to confident tech professional. The mentorship and training were invaluable.',
            },
            {
              name: 'John Kipchoge',
              role: 'Career Pivot Success',
              story:
                'I successfully transitioned from finance to product management with support from LeadPath coaches and mentors.',
            },
            {
              name: 'Rebecca Ouma',
              role: 'Executive Advancement',
              story:
                'The leadership development programme prepared me for my director role. I recommend LeadPath to everyone serious about career growth.',
            },
          ].map((story, idx) => (
            <Card key={idx} variant="default">
              <div className="mb-4 text-accent text-3xl">"</div>
              <p className="text-foreground mb-6 italic">{story.story}</p>
              <div>
                <p className="font-semibold text-foreground">{story.name}</p>
                <p className="text-sm text-accent font-medium">{story.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section bgColor="light" id="faq">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Frequently Asked Questions
          </Heading>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              q: 'How long does the career development programme take?',
              a: 'Most programmes range from 3-6 months depending on your pace and goals. You have flexibility to progress at your own speed.',
            },
            {
              q: 'Do I need prior experience to join?',
              a: 'No! Our programmes are designed for all career levels, from students to experienced professionals.',
            },
            {
              q: 'Can I get mentorship while in the programme?',
              a: 'Yes, all participants get access to our mentorship network with experienced professionals in various fields.',
            },
            {
              q: 'What career fields do you cover?',
              a: 'We support careers across all major sectors including tech, finance, healthcare, education, and more.',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="elevated">
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

      {/* CTA Section */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Start Your Career Transformation
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join hundreds of professionals who have achieved their career goals with
          LeadPath. Your journey starts here.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Begin Your Journey
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
