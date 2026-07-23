'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme')
    if (stored) {
      setIsDark(stored === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    // The explicit .light class opts out of the prefers-color-scheme fallback
    html.classList.toggle('dark', isDark)
    html.classList.toggle('light', !isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full transition-colors hover:bg-muted dark:hover:bg-navy-700 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-navy-500" />
      )}
    </button>
  )
}
