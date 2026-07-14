'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button, ProgramCard } from '@/components/ui-components'
import {
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  Users2,
  Target,
  BookOpen,
  Zap,
} from 'lucide-react'

export default function ProgrammesPage() {
  const programmes = [
    {
      category: 'Career Development',
      description: 'Navigate your career path with confidence and clarity',
      items: [
        {
          icon: <Target size={24} />,
          title: 'Career Assessments',
          description:
            'Discover your strengths, interests, and values to identify the right career path.',
        },
        {
          icon: <BookOpen size={24} />,
          title: 'Professional Development',
          description:
            'Build essential skills needed for career advancement and success in your field.',
        },
        {
          icon: <Briefcase size={24} />,
          title: 'Job Search Support',
          description:
            'Get guidance on resume writing, interview preparation, and job search strategies.',
        },
      ],
    },
    {
      category: 'Leadership Development',
      description: 'Develop the skills and mindset of effective leaders',
      items: [
        {
          icon: <TrendingUp size={24} />,
          title: 'Leadership Training',
          description:
            'Master essential leadership competencies including decision-making and team management.',
        },
        {
          icon: <Users2 size={24} />,
          title: 'Executive Coaching',
          description:
            'Work one-on-one with experienced coaches to develop your unique leadership style.',
        },
        {
          icon: <Zap size={24} />,
          title: 'Strategic Thinking',
          description:
            'Learn to think strategically and develop vision for organizational growth and success.',
        },
      ],
    },
    {
      category: 'Entrepreneurship',
      description: 'Transform your ideas into successful businesses',
      items: [
        {
          icon: <Lightbulb size={24} />,
          title: 'Business Planning',
          description:
            'Develop comprehensive business plans and strategies for launching your venture.',
        },
        {
          icon: <TrendingUp size={24} />,
          title: 'Pitch Coaching',
          description:
            'Learn to pitch your business effectively to investors and stakeholders.',
        },
        {
          icon: <Users size={24} />,
          title: 'Investor Connections',
          description:
            'Get connected with potential investors and funding opportunities for your startup.',
        },
      ],
    },
    {
      category: 'Mentorship',
      description: 'Learn from experienced professionals and peers',
      items: [
        {
          icon: <Users size={24} />,
          title: 'One-on-One Mentoring',
          description:
            'Get paired with experienced mentors for personalized guidance and career support.',
        },
        {
          icon: <Users2 size={24} />,
          title: 'Peer Learning Groups',
          description:
            'Join communities of professionals at similar career stages for mutual learning.',
        },
        {
          icon: <BookOpen size={24} />,
          title: 'Industry Networks',
          description:
            'Build valuable connections with industry leaders and professionals in your field.',
        },
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
            Comprehensive <span className="text-accent">Career & Leadership</span> Programmes
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Choose from our diverse range of programmes designed to support you at
            every stage of your career journey, from entry-level to executive
            leadership.
          </p>
        </div>
      </Section>

      {/* Overview */}
      <Section id="overview" className="bg-white">
        <div className="text-center mb-12">
          <Heading level={2} className="text-primary mb-4">
            Four Key Programme Categories
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each programme is carefully designed to deliver measurable outcomes and
            meaningful transformation in your career and leadership journey.
          </p>
        </div>
      </Section>

      {/* Programme Categories */}
      {programmes.map((category, categoryIdx) => (
        <Section
          key={categoryIdx}
          bgColor={categoryIdx % 2 === 0 ? 'white' : 'light'}
          id={category.category.toLowerCase().replace(/\s+/g, '-')}
        >
          <div className="mb-16">
            <Heading level={2} className="text-primary mb-2">
              {category.category}
            </Heading>
            <p className="text-lg text-muted-foreground">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {category.items.map((item, itemIdx) => (
              <ProgramCard
                key={itemIdx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={`/${category.category.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* How It Works */}
      <Section id="how-it-works" bgColor="light">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            How Our Programmes Work
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Join', desc: 'Sign up and complete your profile' },
            { step: '2', title: 'Assess', desc: 'Take assessments to identify goals' },
            { step: '3', title: 'Learn', desc: 'Access training and resources' },
            { step: '4', title: 'Grow', desc: 'Achieve your career goals' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <Card variant="default">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute -right-4 top-6 text-accent text-2xl">
                      →
                    </div>
                  )}
                </div>
                <h3 className="font-serif font-bold text-lg text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Programme Features */}
      <Section id="features" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            What You Get
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            'Expert Training & Workshops',
            'Mentorship & Guidance',
            'Networking Opportunities',
            'Career Planning Tools',
            'Job Board Access',
            'Certificate of Completion',
            'Ongoing Support',
            'Community Access',
          ].map((feature, idx) => (
            <Card key={idx} variant="elevated">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="font-medium text-primary dark:text-foreground">{feature}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing/Participation */}
      <Section bgColor="light" id="investment">
        <div className="text-center mb-12">
          <Heading level={2} className="text-primary mb-4">
            Investment in Your Future
          </Heading>
          <p className="text-lg text-primary/75 dark:text-muted-foreground max-w-2xl mx-auto">
            We offer flexible pricing and scholarship opportunities to ensure
            access for all aspiring professionals and leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: 'Free',
              desc: 'Access to community and basic resources',
              features: ['Community Access', 'Basic Resources', 'Monthly Webinars'],
            },
            {
              name: 'Professional',
              price: '$99/month',
              desc: 'Full access to all programmes and mentorship',
              features: [
                'All Starter features',
                'Personal Mentor',
                'Premium Trainings',
                'Priority Support',
              ],
              highlight: true,
            },
            {
              name: 'Leadership',
              price: '$199/month',
              desc: 'Executive coaching and exclusive networks',
              features: [
                'All Professional features',
                'Executive Coaching',
                'Private Networks',
                'Investor Introductions',
              ],
            },
          ].map((tier, idx) => (
            <Card
              key={idx}
              variant={tier.highlight ? 'accent' : 'default'}
              className={tier.highlight ? 'md:scale-105' : ''}
            >
              <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                {tier.name}
              </h3>
              <div className="text-3xl font-bold text-accent mb-2">
                {tier.price}
              </div>
              <p className="text-primary/75 dark:text-muted-foreground text-sm mb-6">{tier.desc}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-primary dark:text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                href="/get-involved"
                className="w-full justify-center"
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="primary" className="text-center py-16">
        <Heading level={2} className="text-white mb-6">
          Ready to Invest in Your Future?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Choose the programme that&apos;s right for you and start your transformation
          journey today.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Explore Programmes
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
