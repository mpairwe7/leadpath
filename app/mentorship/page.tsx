'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Users, Heart, TrendingUp, BookOpen, CheckCircle2, Award } from 'lucide-react'

export default function MentorshipPage() {
  const benefits = [
    {
      icon: <TrendingUp size={28} />,
      title: 'Accelerated Growth',
      description: 'Benefit from years of experience condensed into actionable guidance',
    },
    {
      icon: <Heart size={28} />,
      title: 'Personal Support',
      description: 'Get personalized advice tailored to your specific goals and challenges',
    },
    {
      icon: <Users size={28} />,
      title: 'Network Expansion',
      description: 'Access to your mentor&apos;s network and valuable professional connections',
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Knowledge Transfer',
      description: 'Learn industry insights, best practices, and lessons from experience',
    },
  ]

  const mentorshipFormats = [
    {
      title: 'One-on-One Mentoring',
      description: 'Personalized guidance from an experienced mentor matched to your needs',
      format: 'Monthly meetings, 60-90 minutes each',
    },
    {
      title: 'Group Mentoring',
      description: 'Learn from multiple mentors in a cohort-based learning environment',
      format: 'Bi-weekly sessions with peer learning',
    },
    {
      title: 'Peer Mentoring',
      description: 'Learn from peers at similar career stages going through similar challenges',
      format: 'Monthly peer group meetings',
    },
    {
      title: 'Executive Mentoring',
      description: 'Work with C-suite executives for strategic career and leadership guidance',
      format: 'Quarterly strategic sessions',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Grow With <span className="text-accent">Expert Mentorship</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Connect with experienced mentors who have walked the path you&apos;re on and can help you navigate challenges and seize opportunities.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section id="benefits" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Benefits of Mentorship
          </Heading>
          <p className="text-lg text-muted-foreground">
            What mentees gain from our mentorship programme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <Card key={idx} variant="elevated">
              <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10">
                <div className="text-accent">{benefit.icon}</div>
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Mentorship Formats */}
      <Section bgColor="light" id="formats">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Mentorship Formats
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the mentorship format that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mentorshipFormats.map((format, idx) => (
            <Card key={idx} variant="elevated" className="group">
              <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-accent transition-colors">
                {format.title}
              </h3>
              <p className="text-muted-foreground mb-4">{format.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Award size={16} className="text-secondary" />
                {format.format}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Mentors */}
      <Section id="mentors" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Meet Our Mentor Network
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Jane Mutua', title: 'Tech Entrepreneur', bio: '20+ years in tech leadership' },
            { name: 'Samuel Kipchoge', title: 'Financial Services', bio: 'CFO with banking expertise' },
            { name: 'Grace Nyambura', title: 'HR Leader', bio: 'Talent development specialist' },
            { name: 'Michael Okoro', title: 'Strategy Consultant', bio: 'Business growth advisor' },
          ].map((mentor, idx) => (
            <Card key={idx} variant="default">
              <div className="w-full h-32 bg-gradient-to-br from-primary to-primary/50 rounded-lg mb-4"></div>
              <h3 className="font-serif font-bold text-lg text-primary mb-1">
                {mentor.name}
              </h3>
              <p className="text-sm font-semibold text-accent mb-3">{mentor.title}</p>
              <p className="text-sm text-muted-foreground">{mentor.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section bgColor="light" id="how-it-works">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            How It Works
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Apply', desc: 'Tell us about your goals' },
            { step: '2', title: 'Match', desc: 'Get matched with a mentor' },
            { step: '3', title: 'Meet', desc: 'Start regular mentoring sessions' },
            { step: '4', title: 'Grow', desc: 'Achieve your goals' },
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
          Ready to Find Your Mentor?
        </Heading>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Join our mentorship programme and accelerate your career growth with guidance from experienced professionals.
        </p>
        <Button variant="primary" href="/get-involved" size="lg">
          Find a Mentor Today
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
