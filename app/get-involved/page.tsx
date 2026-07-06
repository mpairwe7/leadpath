'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'career',
    experience: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', interest: 'career', experience: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const ways = [
    {
      title: 'As a Mentee',
      description: 'Get mentored, develop your career, and join our community',
      cta: 'Join as Mentee',
    },
    {
      title: 'As a Mentor',
      description: 'Share your expertise and guide the next generation of leaders',
      cta: 'Become a Mentor',
    },
    {
      title: 'As a Partner',
      description: 'Partner with us to amplify impact in your community',
      cta: 'Partner With Us',
    },
    {
      title: 'As a Donor',
      description: 'Support our mission through financial contributions',
      cta: 'Make a Donation',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Join Our <span className="text-accent">Community</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Take the first step towards career growth and leadership excellence. Whether you&apos;re looking to be mentored, mentor others, partner with us, or support our mission, there&apos;s a place for you at LeadPath.
          </p>
        </div>
      </Section>

      {/* Ways to Get Involved */}
      <Section id="ways" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary mb-2">
            Ways to Get Involved
          </Heading>
          <p className="text-lg text-muted-foreground">
            Choose how you want to be part of our mission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ways.map((way, idx) => (
            <Card key={idx} variant="elevated" className="group hover:shadow-lg transition-shadow">
              <h3 className="font-serif font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
                {way.title}
              </h3>
              <p className="text-muted-foreground mb-6">{way.description}</p>
              <Button
                variant="primary"
                href="#form"
                className="text-sm"
              >
                {way.cta}
                <ArrowRight size={16} />
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section bgColor="light" id="benefits">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Why Join LeadPath?
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'Access to a vibrant community of professionals and leaders',
            'Expert training and development programmes',
            'Personalized mentorship and career guidance',
            'Networking opportunities with industry leaders',
            'Tools and resources for career growth',
            'Ongoing support on your journey to success',
          ].map((benefit, idx) => (
            <Card key={idx} variant="default" className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-accent flex-shrink-0 mt-1" />
              <p className="text-foreground font-medium">{benefit}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Get Started Form */}
      <Section id="form" className="bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={2} className="text-primary mb-2">
              Get Started Today
            </Heading>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll get in touch with you shortly
            </p>
          </div>

          <Card variant="elevated" className="p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  We&apos;ve received your information. Our team will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      placeholder="+256..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      How would you like to get involved? *
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                    >
                      <option value="career">Career Development</option>
                      <option value="leadership">Leadership Programme</option>
                      <option value="entrepreneurship">Entrepreneurship</option>
                      <option value="mentorship">Mentorship (Mentee)</option>
                      <option value="mentor">Become a Mentor</option>
                      <option value="partner">Partnership</option>
                      <option value="donate">Donation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Professional Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                  >
                    <option value="">Select your experience level</option>
                    <option value="student">Student</option>
                    <option value="0-2">0-2 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us more about yourself (optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground resize-none"
                    placeholder="Share your goals, interests, or any other relevant information..."
                  ></textarea>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Submit
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  We&apos;ll never share your information. Check our privacy policy for more details.
                </p>
              </form>
            )}
          </Card>
        </div>
      </Section>

      {/* Alternative CTA */}
      <Section bgColor="light" className="text-center py-12">
        <p className="text-foreground mb-4">
          Prefer to talk to us first?
        </p>
        <Button variant="outline" href="/contact">
          Contact Us
        </Button>
      </Section>

      <Footer />
    </main>
  )
}
