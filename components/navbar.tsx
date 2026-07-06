'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programmes', label: 'Programmes' },
    { href: '/career', label: 'Career' },
    { href: '/leadership', label: 'Leadership' },
    { href: '/entrepreneurship', label: 'Entrepreneurship' },
    { href: '/mentorship', label: 'Mentorship' },
    { href: '/partners', label: 'Partners' },
  ]

  const ctaLinks = [
    { href: '/get-involved', label: 'Get Involved', variant: 'secondary' },
    { href: '/donate', label: 'Donate', variant: 'primary' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg"
              alt="LeadPath Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
              priority
            />
            <span className="hidden sm:inline font-serif font-bold text-xl text-primary">
              LeadPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={`desktop-${link.href}`}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/get-involved"
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/donate"
              className="px-6 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Link
                href="/get-involved"
                className="block px-3 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                href="/donate"
                className="block px-3 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
