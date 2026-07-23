'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'

const programmeLinks = [
  { href: '/programmes', label: 'All Programmes' },
  { href: '/career', label: 'Career Development' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/entrepreneurship', label: 'Entrepreneurship' },
  { href: '/mentorship', label: 'Mentorship' },
]

const topLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/partners', label: 'Partners' },
  { href: '/get-involved', label: 'Get Involved' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [programmesOpen, setProgrammesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!programmesOpen) return
    const close = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setProgrammesOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [programmesOpen])

  const linkClasses =
    'px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-border group-hover:ring-accent transition-colors">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg"
                alt="LeadPath Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="hidden sm:inline font-serif font-bold tracking-tight text-lg text-primary">
              LeadPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className={linkClasses}>
              Home
            </Link>
            <Link href="/about" className={linkClasses}>
              About
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProgrammesOpen(!programmesOpen)}
                aria-expanded={programmesOpen}
                aria-haspopup="true"
                className={`${linkClasses} inline-flex items-center gap-1`}
              >
                Programmes
                <ChevronDown
                  size={14}
                  className={`transition-transform ${programmesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {programmesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-border bg-popover shadow-lg p-2 animate-in fade-in slide-in-from-top-2">
                  {programmeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setProgrammesOpen(false)}
                      className="block px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/partners" className={linkClasses}>
              Partners
            </Link>
            <Link href="/get-involved" className={linkClasses}>
              Get Involved
            </Link>
          </div>

          {/* CTA - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/donate"
              className="px-6 py-2.5 text-sm font-serif font-bold text-accent-foreground bg-accent hover:bg-accent/90 rounded-full transition-colors"
            >
              Donate
            </Link>
            <div className="pl-3 border-l border-border">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Theme & Menu Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:bg-primary/5 dark:hover:bg-primary/10 rounded-full transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-6 space-y-1">
            {topLinks.slice(0, 2).map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className="block px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <p className="px-4 pt-4 pb-1 font-serif text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent-ink">
              Programmes
            </p>
            {programmeLinks.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className="block px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2">
              {topLinks.slice(2).map((link) => (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-border">
              <Link
                href="/donate"
                className="block px-4 py-2.5 text-sm font-serif font-bold text-center text-accent-foreground bg-accent hover:bg-accent/90 rounded-full transition-colors"
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
