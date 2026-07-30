'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Section,
  Heading,
  Button,
  Card,
  ProgramCard,
} from '@/components/ui-components'
import {
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  ArrowRight,
} from 'lucide-react'

const heroStats = [
  { value: '2,500+', label: 'Members empowered', highlight: false },
  { value: '85%', label: 'Career success rate', highlight: true },
  { value: '1,000+', label: 'Entrepreneurial businesses supported', highlight: false },
  { value: '100+', label: 'Leaders developed', highlight: false },
]

const pillars = [
  {
    number: '01',
    icon: <TrendingUp size={28} />,
    title: 'Leadership',
    href: '/leadership',
    description:
      'Before leading organizations, young people must first learn to lead themselves. We build the mindset, skills, and confidence to influence others and make informed decisions.',
  },
  {
    number: '02',
    icon: <Briefcase size={28} />,
    title: 'Career Development',
    href: '/career',
    description:
      'From choosing the right academic path to securing employment and excelling at work — we help participants align their passions with market opportunities.',
  },
  {
    number: '03',
    icon: <Lightbulb size={28} />,
    title: 'Entrepreneurship',
    href: '/entrepreneurship',
    description:
      'We inspire young people to transform innovative ideas into viable businesses that solve real problems and create lasting value.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section — contained, photographic, with floating proof */}
      <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-navy">
            <Image
              src="/uganda-youth-training.jpg"
              alt="Young people in a skills training session at a youth centre in Kampala, Uganda"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-[center_25%] opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background:
                  'radial-gradient(110% 80% at 92% 0%, rgba(141,198,63,0.65), transparent 58%), radial-gradient(90% 70% at 70% 100%, rgba(240,173,47,0.35), transparent 60%)',
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:py-24">
              <div className="max-w-xl">
                <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-lime-400 mb-4">
                  Career, entrepreneurship &amp; leadership network
                </p>
                <h1 className="font-serif font-extrabold tracking-tight text-balance text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                  Igniting ideas.
                  <br />
                  Inspiring leaders.
                </h1>
                <p className="font-serif text-lg md:text-xl font-semibold text-lime-300 mb-5">
                  Your shoulder on the journey to success.
                </p>
                <p className="text-lg text-white/85 mb-8 max-w-lg leading-relaxed">
                  LeadPath discovers talent, develops skills, and builds the next
                  generation of leaders through guidance on trendy career choices,
                  university placements, mentorship, job shadowing, career
                  guidance, and entrepreneurial support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="lime" href="/get-involved" size="lg">
                    Get started
                    <ArrowRight size={20} />
                  </Button>
                  <Button variant="ghost-light" href="/programmes" size="lg">
                    Explore programmes
                  </Button>
                </div>
              </div>

              {/* Floating glass stats */}
              <div className="grid grid-cols-2 gap-4 lg:w-[400px] lg:pr-2">
                {heroStats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-5 py-4 ${
                      idx % 2 === 1 ? 'lg:translate-y-5' : ''
                    }`}
                  >
                    <div
                      className={`font-serif font-extrabold tracking-tight text-2xl tabular-nums ${
                        stat.highlight ? 'text-lime-400' : 'text-white'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/75 mt-0.5 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Pillars Section — a real sequence, so it stays numbered */}
      <Section id="pillars">
        <div className="max-w-2xl mb-14">
          <Heading level={2} eyebrow="Our pillars">
            Leadership, career, entrepreneurship
          </Heading>
          <p className="text-lg text-muted-foreground mt-4">
            We believe every young person has the potential to become an
            exceptional leader, build a fulfilling career, and create meaningful
            businesses that transform communities. Every participant is
            challenged to think critically, grow confidently, and take purposeful
            action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.number} variant="default" className="group">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 w-fit rounded-2xl bg-lime/15 text-success-ink group-hover:bg-lime group-hover:text-navy-950 transition-colors">
                  {pillar.icon}
                </div>
                <span className="font-serif font-extrabold text-accent-ink/70 tabular-nums">
                  {pillar.number}
                </span>
              </div>
              <h3 className="font-serif font-bold tracking-tight text-2xl text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground mb-5">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 text-accent-ink font-serif font-bold hover:gap-3 transition-all"
              >
                Learn More
                <span aria-hidden="true">→</span>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Programmes Overview Section */}
      <Section id="programmes" bgColor="light">
        <div className="max-w-2xl mb-14">
          <Heading level={2} eyebrow="Programmes">
            Choose your route
          </Heading>
          <p className="text-lg text-muted-foreground mt-4">
            Concrete commitments, not promises — every programme states its
            format, length, and what you leave with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProgramCard
            icon={<Briefcase size={24} />}
            title="Career Development"
            description="Navigate your career path with confidence through assessments, planning, and job search support."
            href="/career"
            status="Open"
            meta={['Self-paced', '1:1 coaching', 'All levels']}
            features={['Career assessments', 'Job search support', 'Resume coaching']}
          />

          <ProgramCard
            icon={<TrendingUp size={24} />}
            title="Leadership Programme"
            description="Develop essential leadership skills and learn from experienced mentors and industry leaders."
            href="/leadership"
            status="Cohort open"
            meta={['8 weeks', 'Cohort of 25', 'Hybrid']}
            features={[
              'Leadership training',
              'Executive mentoring',
              'Strategic thinking',
            ]}
          />

          <ProgramCard
            icon={<Lightbulb size={24} />}
            title="Entrepreneurship Hub"
            description="Transform your business ideas into reality with support from experienced entrepreneurs and investors."
            href="/entrepreneurship"
            status="Open"
            meta={['12 weeks', 'Pitch day', 'Investor network']}
            features={[
              'Business planning',
              'Pitch coaching',
              'Investor connections',
            ]}
          />

          <ProgramCard
            icon={<Users size={24} />}
            title="Mentorship Network"
            description="Connect with experienced professionals who can guide your growth and help you navigate challenges."
            href="/mentorship"
            status="Matching"
            meta={['Ongoing', '1-on-1', '1,000+ mentors']}
            features={['One-on-one mentoring', 'Peer learning', 'Skill building']}
          />
        </div>
      </Section>

      {/* Proof Section — one dark, monochrome moment */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-6 py-14 sm:px-10 md:px-14 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-lime-400 mb-4">
                  Member stories
                </p>
                <blockquote className="font-serif font-bold tracking-tight text-2xl md:text-3xl text-white text-balance leading-snug mb-6">
                  &ldquo;My mentor helped me turn two years of stalled job
                  searching into a leadership role in six months.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <Image
                    src="/african-team-member-1.png"
                    alt="LeadPath member portrait"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-white/30"
                  />
                  <div>
                    <p className="font-serif font-bold text-white">Grace A.</p>
                    <p className="text-sm text-white/70">
                      Leadership Programme, 2025 cohort
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:justify-self-end">
                <p className="text-white/80 max-w-md mb-6 leading-relaxed">
                  Behind every number is a member matched with a mentor, a
                  first pitch, a new role. Explore where our members are now —
                  or become one of them.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="lime" href="/get-involved" size="md">
                    Join the community
                  </Button>
                  <Button variant="ghost-light" href="/about" size="md">
                    Meet the team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Section id="cta" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} className="mb-4">
            Ready to transform your career?
          </Heading>
          <p className="text-lg text-muted-foreground mb-8">
            Take the next step in your career and leadership journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="lime" href="/get-involved" size="lg">
              Join our community
            </Button>
            <Button variant="outline" href="/donate" size="lg">
              Support our mission
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
