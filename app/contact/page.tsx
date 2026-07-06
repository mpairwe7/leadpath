'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Section, Heading, Card, Button } from '@/components/ui-components'
import { Mail, MessageCircle, MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Section bgColor="primary" className="pt-32 pb-16 md:pt-40 md:pb-20" id="hero">
        <div>
          <Heading level={1} className="text-white mb-6">
            Get in <span className="text-accent">Touch</span>
          </Heading>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Have questions? We&apos;d love to hear from you. Reach out to us through any of the channels below.
          </p>
        </div>
      </Section>

      {/* Contact Info Cards */}
      <Section id="contact-info" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card variant="elevated">
            <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10">
              <Mail size={24} className="text-accent" />
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">Email</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Reach out to us via email for detailed inquiries
            </p>
            <a href="mailto:info@leadpath.org" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              info@leadpath.org
            </a>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 p-3 w-fit rounded-lg bg-secondary/10">
              <Phone size={24} className="text-secondary" />
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">Phone</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Call us during business hours
            </p>
            <a href="tel:+256700000000" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              +256 700 000 000
            </a>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 p-3 w-fit rounded-lg bg-primary/10">
              <MessageCircle size={24} className="text-primary" />
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Quick chat on WhatsApp
            </p>
            <a href="https://wa.me/256700000000" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Message us
            </a>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 p-3 w-fit rounded-lg bg-accent/10">
              <MapPin size={24} className="text-accent" />
            </div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">Location</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Visit us in Kampala
            </p>
            <p className="text-accent font-semibold">Kampala, Uganda</p>
          </Card>
        </div>
      </Section>

      {/* Contact Form & Hours */}
      <Section bgColor="light" id="form-section" className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Heading level={3} className="text-primary mb-6">
              Send us a Message
            </Heading>
            <Card variant="elevated" className="p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-secondary" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-primary mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Business Hours & FAQ */}
          <div className="space-y-8">
            <Card variant="elevated">
              <div className="mb-4 p-3 w-fit rounded-lg bg-primary/10">
                <Clock size={24} className="text-primary" />
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-4">
                Business Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 5:00 PM EAT</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Saturday</p>
                  <p className="text-muted-foreground">10:00 AM - 2:00 PM EAT</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <h3 className="font-serif font-bold text-xl text-primary mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/get-involved" className="text-accent hover:text-accent/80 transition-colors">
                    Get Involved →
                  </a>
                </li>
                <li>
                  <a href="/programmes" className="text-accent hover:text-accent/80 transition-colors">
                    Our Programmes →
                  </a>
                </li>
                <li>
                  <a href="/partners" className="text-accent hover:text-accent/80 transition-colors">
                    Partnerships →
                  </a>
                </li>
                <li>
                  <a href="/donate" className="text-accent hover:text-accent/80 transition-colors">
                    Donate →
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <div className="text-center mb-16">
          <Heading level={2} className="text-primary">
            Frequently Asked Questions
          </Heading>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              q: 'How quickly can I expect a response?',
              a: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call us during business hours.',
            },
            {
              q: 'Can I schedule a call with someone from the team?',
              a: 'Yes! Please mention in your message if you&apos;d like to schedule a call, and we&apos;ll arrange a time that works for both of us.',
            },
            {
              q: 'What timezone are you in?',
              a: 'We operate in East African Time (EAT). This is UTC+3.',
            },
          ].map((item, idx) => (
            <Card key={idx} variant="default">
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

      <Footer />
    </main>
  )
}
