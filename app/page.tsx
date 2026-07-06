'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Section,
  Heading,
  Button,
  Card,
  ProgramCard,
  Testimonial,
} from '@/components/ui-components'
import {
  Briefcase,
  TrendingUp,
  Lightbulb,
  Users,
  ArrowRight,
  Star,
} from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Section
        bgColor="primary"
        className="pt-32 pb-20 md:pt-40 md:pb-24"
        id="hero"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading level={1} className="text-white mb-4">
              Empowering Careers
              <br />
              <span className="text-accent">Inspiring Leaders</span>
            </Heading>
            <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
              LeadPath is a career and leadership network dedicated to discovering
              talent, developing skills, and building the next generation of leaders
              through mentorship, career guidance, and entrepreneurial support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" href="/get-involved" size="lg">
                Get Started
                <ArrowRight size={20} />
              </Button>
              <Button variant="outline" href="/programmes" size="lg">
                Explore Programmes
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg"
              alt="LeadPath Logo"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </Section>

      {/* Three Pillars Section */}
      <Section id="pillars" className="bg-white">
        <div className="text-center mb-16">
          <Heading
            level={2}
            className="text-primary mb-4"
            subtitle="Our Three Core Pillars"
          >
            Discover, Develop, Lead
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="elevated">
            <div className="mb-4 p-4 w-fit bg-accent/10 rounded-lg">
              <Briefcase size={32} className="text-accent" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-primary mb-3">
              Discover
            </h3>
            <p className="text-muted-foreground mb-4">
              Uncover your unique talents, interests, and career potential through
              guided exploration and assessment programs.
            </p>
            <Link href="/career" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Learn More →
            </Link>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 p-4 w-fit bg-secondary/10 rounded-lg">
              <TrendingUp size={32} className="text-secondary" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-primary mb-3">
              Develop
            </h3>
            <p className="text-muted-foreground mb-4">
              Build essential skills through hands-on training, mentorship, and
              professional development programs tailored to your goals.
            </p>
            <Link href="/leadership" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Learn More →
            </Link>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 p-4 w-fit bg-primary/10 rounded-lg">
              <Lightbulb size={32} className="text-primary" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-primary mb-3">
              Lead
            </h3>
            <p className="text-muted-foreground mb-4">
              Step into leadership roles and make a meaningful impact in your
              organization and community with confidence and vision.
            </p>
            <Link href="/entrepreneurship" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Learn More →
            </Link>
          </Card>
        </div>
      </Section>

      {/* Programmes Overview Section */}
      <Section id="programmes" bgColor="light">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Our Key Programmes
          </Heading>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose from our comprehensive range of career and leadership development
            programmes designed for every stage of your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProgramCard
            icon={<Briefcase size={24} />}
            title="Career Development"
            description="Navigate your career path with confidence through assessments, planning, and job search support."
            href="/career"
            features={['Career assessments', 'Job search support', 'Resume coaching']}
          />

          <ProgramCard
            icon={<TrendingUp size={24} />}
            title="Leadership Programme"
            description="Develop essential leadership skills and learn from experienced mentors and industry leaders."
            href="/leadership"
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
            features={['One-on-one mentoring', 'Peer learning', 'Skill building']}
          />
        </div>
      </Section>

      {/* Impact Section */}
      <Section bgColor="primary" className="bg-gradient-to-br from-primary to-primary/80">
        <div className="text-center mb-12">
          <Heading level={2} className="text-white">
            Our Impact
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { number: '2,500+', label: 'Members Empowered' },
            { number: '85%', label: 'Career Success Rate' },
            { number: '500+', label: 'Mentors Connected' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" className="bg-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Heading
            level={2}
            className="text-primary mb-6"
            subtitle="Take the next step in your career and leadership journey"
          >
            Ready to Transform Your Career?
          </Heading>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="primary"
              href="/get-involved"
              size="lg"
              className="border-2 border-accent"
            >
              Join Our Community
            </Button>
            <Button variant="outline" href="/donate" size="lg">
              Support Our Mission
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
