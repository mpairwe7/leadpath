import Link from 'next/link'
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
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary text-lg font-bold">L</span>
              </div>
              <h3 className="font-serif font-bold text-xl">LeadPath</h3>
            </div>
            <p className="text-white/80 text-sm mb-6 max-w-sm">
              Empowering careers. Inspiring leaders. Building the future through career development, leadership training, and entrepreneurship support.
            </p>
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail size={16} />
                <a href="mailto:info@leadpath.org">info@leadpath.org</a>
              </div>
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <MessageCircle size={16} />
                <a href="https://wa.me/256700000000">+256 700 000 000</a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin size={16} />
                <span>Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 text-sm">{category}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
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
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {currentYear} LeadPath. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
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
