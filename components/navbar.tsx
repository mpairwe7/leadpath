'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-border dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group hover:opacity-80 transition-all duration-300">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 dark:ring-accent/20 group-hover:ring-primary/40 dark:group-hover:ring-accent/40 transition-all duration-300 shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg"
                alt="LeadPath Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="hidden sm:inline font-serif font-bold text-lg text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300">
              LeadPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={`desktop-${link.href}`}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-primary dark:text-accent hover:text-primary dark:hover:text-accent rounded-md hover:bg-primary/5 dark:hover:bg-accent/10 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link
              href="/get-involved"
              className="px-4 py-2 text-sm font-semibold text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 hover:bg-primary/5 dark:hover:bg-accent/10 rounded-md transition-all duration-300"
            >
              Get Involved
            </Link>
            <Link
              href="/donate"
              className="px-6 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent/90 dark:hover:bg-amber-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Donate
            </Link>
            <div className="pl-3 border-l border-border dark:border-slate-700">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Theme & Menu Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/10 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-6 space-y-1">
            {links.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className="block px-4 py-2 text-sm font-semibold text-primary dark:text-accent hover:bg-primary/5 dark:hover:bg-accent/10 hover:text-primary dark:hover:text-accent rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border dark:border-slate-700 space-y-2">
              <Link
                href="/get-involved"
                className="block px-4 py-2 text-sm font-semibold text-primary dark:text-accent hover:bg-primary/5 dark:hover:bg-accent/10 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                href="/donate"
                className="block px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent/90 dark:hover:bg-amber-500 rounded-lg shadow-md transition-all duration-300"
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
