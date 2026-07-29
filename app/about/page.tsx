'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { CheckCircle2, Heart, Lightbulb, Mountain } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="text-success-ink" />,
      title: 'Empathy',
      description:
        'We walk alongside young people by understanding their experiences, challenges, fears, aspirations, and bold dreams. We listen without judgment, embrace their uniqueness, and create a safe space where they feel seen, valued, and empowered.',
    },
    {
      icon: <Mountain className="text-accent-ink" />,
      title: 'Never Give Up',
      description:
        'We believe that every setback is an opportunity to grow. In a world where opportunities can seem limited, we inspire young people to remain resilient, persevere through challenges, and relentlessly pursue their goals until they succeed.',
    },
    {
      icon: <Lightbulb className="text-success-ink" />,
      title: 'Creativity',
      description:
        'We believe every dream has the potential to become reality. We encourage young people to think boldly, innovate fearlessly, and transform their ideas into meaningful impact through the right guidance, support, and opportunities.',
    },
  ]

  // Order is deliberate: Suzan first, then Mary (client request, 28 July review).
  const founders = [
    {
      name: 'Suzan Mutoni',
      title: 'Founder & Executive Director, Programmes',
      bio: [
        'Suzan Mutoni is a youth development leader, researcher, career coach, entrepreneur, and mentor dedicated to empowering Africa’s next generation of leaders. She is the Founder and Executive Director of LeadPath, where she equips young people with leadership, career, and entrepreneurship skills to thrive in a rapidly changing world.',
        'She holds a Master’s degree in Sexual and Reproductive Health Policy and Programming from the London School of Hygiene & Tropical Medicine, and has extensive experience in leadership development, mentorship, research, and stakeholder engagement. Suzan has worked with organisations including the African Leadership University, Mastercard Foundation programmes, Global Give Back Circle, and the African Careers Network, supporting thousands of young people in their educational and professional journeys.',
      ],
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Suzan%20K.%20Mutoni-VXY3qKgHjDpICtVXY4wrfGmrlGO8b7.jpeg',
    },
    {
      name: 'Mary Nanyomo',
      title: 'Co-Founder & Executive Director',
      bio: [
        'Mary Nanyomo is an educationalist and youth development leader with a passion for working with young people and helping them turn potential into real impact. With over a decade of experience in programme implementation, Mary has supported initiatives that help youth grow into sustainable businesses and meaningful careers.',
        'A teacher by profession, she brings classroom insight together with systems thinking to design programmes that are practical, scalable, and people-centred. Mary holds a Master’s degree in Business Administration in International Business, giving her a unique lens to blend education, leadership development, and entrepreneurship. Her work is rooted in the belief that when young people are given the right tools, networks, and mindset, they don’t just find jobs — they create them.',
      ],
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mary%20Nanyomo-PoORxYhFKblrZAOgFYfMi78WWFEz3D.jpeg',
    },
  ]

  const team = [
    {
      name: 'Scovia Kampire',
      title: 'Partnerships Lead',
      bio: 'An administrative, partnership, and project management professional with over five years supporting health and development programmes in Rwanda. Scovia holds a Global MBA in Business Sustainability and Social Entrepreneurship from the University of Rwanda and a bachelor’s degree in Finance. She is passionate about building partnerships, strengthening organisational effectiveness, and advancing sustainable community development through collaborative leadership and innovation.',
      image: '/placeholder-user.jpg',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Section
        bgColor="primary"
        className="pt-32 pb-16 md:pt-40 md:pb-20"
        id="hero"
      >
        <div>
          <Heading level={1} className="text-white mb-6">
            About <span className="text-lime">LeadPath</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            LeadPath discovers talent, develops skills, and builds the next
            generation of leaders through career guidance, university placements,
            mentorship, job shadowing, leadership training, and entrepreneurial
            support.
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section id="story" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Heading level={2} className="text-primary mb-6">
              Our Story
            </Heading>
            <div className="space-y-4 text-primary/75 dark:text-muted-foreground leading-relaxed">
              <p className="font-serif text-lg font-semibold text-primary dark:text-foreground">
                LeadPath was born from a deeply personal experience.
              </p>
              <p>
                After graduating from university, our founder, Suzan Mutoni,
                encountered the harsh reality that many young graduates face.
                Despite having the education, ambition, and determination to
                succeed, finding meaningful employment proved incredibly
                difficult. For more than a year, even meeting basic personal
                needs was a struggle. It became clear that talent and academic
                qualifications alone were not enough to unlock opportunities.
              </p>
              <p>
                Suzan soon realised that her experience was not unique. Across
                Africa, millions of bright, capable young people graduate every
                year only to face limited employment prospects, inadequate career
                guidance, and few opportunities to develop the practical skills
                employers and markets demand.
              </p>
              <p>
                According to the World Bank, Africa is projected to have the
                world&apos;s youngest population by 2050. Yet today, an estimated
                12 million young people enter the labour market each year to
                compete for only about 3 million formal jobs. This growing gap
                means that many young people must create their own opportunities
                through entrepreneurship, continuously develop new skills to
                remain competitive, or emerge as leaders who can drive innovation
                and create jobs for others.
              </p>
              <p className="font-semibold text-primary dark:text-foreground">
                This challenge inspired the creation of LeadPath.
              </p>
              <p>
                LeadPath was founded on the belief that every young person has
                the potential to achieve greatness when given the right guidance,
                opportunities, and support. We recognised a critical gap in
                accessible, high-quality leadership development, career
                readiness, and entrepreneurship training, particularly for young
                people across East Africa.
              </p>
              <p>
                What began as a small mentoring initiative has grown into a
                dynamic platform connecting students, graduates, young
                professionals, entrepreneurs, and experienced leaders. Through
                mentorship, experiential learning, career coaching, leadership
                development, and entrepreneurial support, we equip young people
                with the skills, confidence, and networks they need to thrive.
              </p>
              <p>
                Today, LeadPath continues its mission to discover potential,
                develop future-ready leaders, and empower young people to build
                meaningful careers, launch successful businesses, and create
                lasting impact in their communities. We believe that when young
                people are empowered to lead, innovate, and succeed, they become
                catalysts for transforming Africa&apos;s future.
              </p>
            </div>
          </div>
          <div className="relative h-96 lg:h-[560px] rounded-3xl overflow-hidden shadow-lg lg:sticky lg:top-28">
            <img
              src="/african-career-growth.png"
              alt="African professionals in career development"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 to-lime/15" />
          </div>
        </div>
      </Section>

      {/* Our Founders */}
      <Section bgColor="light" id="founders">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-4">
            Our Founders
          </Heading>
          <p className="text-lg text-primary/70 dark:text-muted-foreground max-w-2xl mx-auto">
            Visionary leaders dedicated to empowering African professionals and
            emerging leaders
          </p>
        </div>

        <div className="space-y-10">
          {founders.map((founder) => (
            <Card
              key={founder.name}
              variant="elevated"
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto md:mx-0 rounded-full overflow-hidden shadow-xl ring-4 ring-lime/40 group-hover:ring-lime transition-all duration-300 flex-shrink-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif font-bold text-2xl text-primary mb-1">
                  {founder.name}
                </h3>
                <p className="text-lg font-semibold text-success-ink mb-4">
                  {founder.title}
                </p>
                <div className="space-y-3 text-primary/75 dark:text-muted-foreground leading-relaxed">
                  {founder.bio.map((para, pidx) => (
                    <p key={pidx}>{para}</p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section id="mission" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-primary/75 dark:text-muted-foreground leading-relaxed">
              To empower young people with the knowledge, skills, and networks
              necessary to build fulfilling careers, launch successful
              businesses, and become transformational leaders in their
              organisations and communities.
            </p>
          </Card>

          <Card variant="elevated">
            <h3 className="font-serif font-bold text-2xl text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-primary/75 dark:text-muted-foreground leading-relaxed">
              A world where every young person has access to quality career
              guidance, leadership development, and mentorship to reach their
              full potential and create meaningful impact.
            </p>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section bgColor="light" id="values">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Our Core Values
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <Card key={idx} variant="elevated">
              <div className="mb-4 w-fit p-3 rounded-2xl bg-lime/15">
                {value.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-primary/75 dark:text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Team */}
      <Section id="team" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Our Team
          </Heading>
          <p className="text-lg text-primary/70 dark:text-muted-foreground">
            Dedicated professionals committed to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, idx) => (
            <Card
              key={idx}
              variant="elevated"
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-4 w-40 h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-lime/40 group-hover:ring-lime transition-all duration-300 flex-shrink-0">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.title}`}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-success-ink mb-3">
                {member.title}
              </p>
              <p className="text-sm text-primary/75 dark:text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section bgColor="light" id="why-us">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1">
            <img
              src="/african-team-collaboration.png"
              alt="African professionals collaborating and mentoring"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-lime/25 to-accent/10" />
          </div>
          <div className="order-1 lg:order-2">
            <Heading level={2} className="text-primary mb-6">
              Why Choose LeadPath?
            </Heading>
            <div className="space-y-4">
              {[
                'Holistic approach combining leadership, career, and entrepreneurship development',
                'Access to experienced mentors and industry leaders',
                'University application support for undergraduate and postgraduate studies',
                'Practical, experiential learning — case studies, simulations, and job shadowing',
                'Access to employment opportunities through our partner organisations',
                'Commitment to African talent and local solutions',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    size={24}
                    className="text-success-ink flex-shrink-0 mt-1"
                  />
                  <p className="text-primary/75 dark:text-muted-foreground">
                    {item}
                  </p>
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
          Become part of a thriving network of young people dedicated to career
          growth, entrepreneurship, and leadership excellence.
        </p>
        <Button variant="lime" href="/get-involved" size="lg">
          Get Started Now
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
