'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const submitted = status === 'sent'
  const successRef = useRef<HTMLDivElement>(null)

  // The confirmation replaces the form, so move focus to it and announce it --
  // otherwise focus falls back to <body> with nothing spoken.
  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Get Involved' }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
      setFormData({ name: '', email: '', phone: '', interest: 'career', experience: '', message: '' })
    } catch {
      setError('We could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  const ways = [
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
    <>
      {/* Hero — split screen */}
      <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-navy grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 px-6 py-14 sm:px-10 md:px-14 md:py-20">
              <p className="font-serif text-xs font-bold uppercase tracking-[0.14em] text-lime-400 mb-4">
                Get involved
              </p>
              <h1 className="font-serif font-extrabold tracking-tight text-balance text-4xl md:text-5xl text-white mb-5">
                Join our community
              </h1>
              <p className="text-lg text-white/85 max-w-lg leading-relaxed">
                Take the first step towards career growth and leadership
                excellence. Whether you&apos;re looking to mentor others, partner
                with us, or support our mission, there&apos;s a place for you at
                LeadPath.
              </p>
            </div>
            <div className="relative min-h-[220px]">
              <Image
                src="/uganda-digital-skills.jpg"
                alt="Young Ugandans learning digital skills together in Kampala"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

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
              <h3 className="font-serif font-bold text-2xl text-primary mb-3 group-hover:text-accent-ink transition-colors">
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
              <CheckCircle2 size={24} className="text-accent-ink flex-shrink-0 mt-1" />
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
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="text-center py-8 focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-secondary" aria-hidden="true" />
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
                    <label htmlFor="involve-name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      id="involve-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="involve-email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      id="involve-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="involve-phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      id="involve-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="+256..."
                    />
                  </div>
                  <div>
                    <label htmlFor="involve-interest" className="block text-sm font-medium text-foreground mb-2">
                      How would you like to get involved? *
                    </label>
                    <select
                      id="involve-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    >
                      <option value="career">Career Development</option>
                      <option value="leadership">Leadership Programme</option>
                      <option value="entrepreneurship">Entrepreneurship</option>
                      <option value="mentor">Become a Mentor</option>
                      <option value="partner">Partnership</option>
                      <option value="donate">Donation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="involve-experience" className="block text-sm font-medium text-foreground mb-2">
                    Professional Experience
                  </label>
                  <select
                    id="involve-experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
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
                  <label htmlFor="involve-message" className="block text-sm font-medium text-foreground mb-2">
                    Tell us more about yourself (optional)
                  </label>
                  <textarea
                    id="involve-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                    placeholder="Share your goals, interests, or any other relevant information..."
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}

                <Button
                  variant="lime"
                  size="lg"
                  className="w-full justify-center"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Submit'}
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
    </>
  )
}
