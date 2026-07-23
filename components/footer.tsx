import Link from 'next/link'
import Image from 'next/image'
import { Mail, MessageCircle, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    About: [
      { label: 'Our Mission', href: '/about' },
      { label: 'Our Team', href: '/about' },
      { label: 'Programmes', href: '/programmes' },
    ],
    Programmes: [
      { label: 'Career Development', href: '/career' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Entrepreneurship', href: '/entrepreneurship' },
      { label: 'Mentorship', href: '/mentorship' },
    ],
    Community: [
      { label: 'Get Involved', href: '/get-involved' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Donate', href: '/donate' },
    ],
  }

  return (
    <footer className="bg-navy dark:bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-white/25 group-hover:ring-accent transition-colors flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg"
                  alt="LeadPath Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif font-bold tracking-tight text-xl">LeadPath</h3>
            </Link>
            <p className="text-white/80 text-sm mb-6 max-w-sm leading-relaxed">
              Empowering careers. Inspiring leaders. Building the future through career development, leadership training, and entrepreneurship support.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail size={16} className="text-accent" />
                <a href="mailto:info@leadpath.org">info@leadpath.org</a>
              </div>
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <MessageCircle size={16} className="text-accent" />
                <a href="https://wa.me/256700000000">+256 700 000 000</a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin size={16} className="text-accent" />
                <span>Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-serif font-bold text-accent mb-6 text-xs uppercase tracking-[0.14em]">
                {category}
              </h4>
              <ul className="space-y-3 text-sm">
                {links.map((link) => (
                  <li key={`${category}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-4"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/70">
            © {currentYear} LeadPath. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
