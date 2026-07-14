'use client'

import Image from 'next/image'
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

  const founders = [
    {
      name: 'Mary Nanyomo',
      title: 'Co-Founder & Executive Director',
      bio: 'Visionary leader with 15+ years of experience in career development and organizational leadership. Passionate about empowering the next generation of African leaders.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mary%20Nanyomo-PoORxYhFKblrZAOgFYfMi78WWFEz3D.jpeg',
    },
    {
      name: 'Suzan K. Mutoni',
      title: 'Co-Founder & Programme Director',
      bio: 'Strategic innovator dedicated to developing transformative programmes. Brings energy and expertise in creating pathways for young professionals to discover their potential.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Suzan%20K.%20Mutoni-VXY3qKgHjDpICtVXY4wrfGmrlGO8b7.jpeg',
    },
  ]

  const team = [
    {
      name: 'James Mutonyi',
      title: 'Programme Coordinator',
      bio: 'Experienced career coach specializing in youth empowerment and professional development pathways.',
      image: '/african-team-member-2.png',
    },
    {
      name: 'Rebecca Ouma',
      title: 'Mentorship Coordinator',
      bio: 'Expert in building meaningful mentoring relationships and supporting leadership development.',
      image: '/african-team-member-1.png',
    },
    {
      name: 'David Kipchoge',
      title: 'Partnerships Manager',
      bio: 'Strategic thinker focused on building collaborations with leading organizations and institutions.',
      image: '/african-team-member-4.png',
    },
    {
      name: 'Grace Wairimu',
      title: 'Community Manager',
      bio: 'Passionate about building inclusive communities and ensuring member engagement and success.',
      image: '/african-team-member-3.png',
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
            <div className="space-y-4 text-primary/75 dark:text-muted-foreground">
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
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/african-career-growth.png"
              alt="African professionals in career development"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10" />
          </div>
        </div>
      </Section>

      {/* Our Founders */}
      <Section id="founders" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-4">
            Our Founders
          </Heading>
          <p className="text-lg text-primary/70 dark:text-muted-foreground max-w-2xl mx-auto">
            Visionary leaders dedicated to empowering African professionals and emerging leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          {founders.map((founder, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center">
              {/* Round avatar */}
              <div className="relative mb-6 w-48 h-48 rounded-full overflow-hidden shadow-xl ring-4 ring-accent/30 group-hover:ring-accent/70 transition-all duration-300 flex-shrink-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-1">
                {founder.name}
              </h3>
              <p className="text-lg font-semibold text-accent mb-4">
                {founder.title}
              </p>
              <p className="text-primary/75 dark:text-muted-foreground leading-relaxed max-w-sm">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section bgColor="light" id="mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-primary/75 dark:text-muted-foreground leading-relaxed">
              To empower individuals with the knowledge, skills, and networks
              necessary to build fulfilling careers and become transformational
              leaders in their organizations and communities.
            </p>
          </Card>

          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-primary/75 dark:text-muted-foreground leading-relaxed">
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
              <p className="text-primary/75 dark:text-muted-foreground">{value.description}</p>
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
          <p className="text-lg text-primary/70 dark:text-muted-foreground">
            Dedicated professionals committed to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <Card key={idx} variant="default" className="group flex flex-col items-center text-center">
              {/* Round avatar */}
              <div className="relative mb-4 w-40 h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-accent/30 group-hover:ring-accent/70 transition-all duration-300 flex-shrink-0">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.title}`}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-accent mb-3">
                {member.title}
              </p>
              <p className="text-sm text-primary/75 dark:text-muted-foreground">{member.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section id="why-us" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 lg:order-1">
            <img
              src="/african-team-collaboration.png"
              alt="African professionals collaborating and mentoring"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-accent/10" />
          </div>
          <div className="order-1 lg:order-2">
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
                  <p className="text-primary/75 dark:text-muted-foreground">{item}</p>
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
