'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

type ThemePref = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

const OPTIONS: ReadonlyArray<{
  value: ThemePref
  label: string
  Icon: typeof Sun
}> = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
]

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Writes the *resolved* theme to the root element as an explicit class.
 *
 * The Tailwind dark variant is declared as `&:is(.dark *)`, so it keys off the
 * class and nothing else — leaving the class off and letting the
 * prefers-color-scheme media query in globals.css handle System would swap the
 * CSS custom properties but leave every `dark:` utility inert, which is how you
 * get half-dark pages. So System resolves to a real class here too.
 */
function applyTheme(pref: ThemePref): void {
  const dark = pref === 'system' ? prefersDark() : pref === 'dark'
  const classes = document.documentElement.classList
  classes.toggle('dark', dark)
  classes.toggle('light', !dark)
}

function readStored(): ThemePref {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') return value
  } catch {
    // Private-mode Safari and similar throw on access; System is a safe default.
  }
  return 'system'
}

export function ThemeSwitcher() {
  // Stays false through the server render *and* the first client render, so
  // hydration matches. The selected segment is painted once the stored
  // preference is known, which avoids both a mismatch and a layout shift —
  // the control occupies its final size from the very first paint.
  const [mounted, setMounted] = useState(false)
  const [pref, setPref] = useState<ThemePref>('system')
  const buttons = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    setPref(readStored())
    setMounted(true)
  }, [])

  // Follow the OS while System is selected, so the page flips live when the
  // user changes their system appearance.
  useEffect(() => {
    if (pref !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [pref])

  const select = useCallback((next: ThemePref) => {
    setPref(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Preference will not persist, but the current page still switches.
    }
    applyTheme(next)
  }, [])

  // WAI-ARIA radio group: arrow keys move between options and select as they go.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0
    if (step === 0) return
    event.preventDefault()
    const next = (index + step + OPTIONS.length) % OPTIONS.length
    select(OPTIONS[next].value)
    buttons.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-muted/70 p-0.5"
    >
      {OPTIONS.map((option, index) => {
        const { Icon } = option
        const selected = mounted && pref === option.value
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttons.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} theme`}
            title={`${option.label} theme`}
            // Roving tabindex — the group is a single tab stop.
            tabIndex={selected || (!mounted && index === 0) ? 0 : -1}
            onClick={() => select(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`grid h-9 w-9 place-items-center rounded-full transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              selected
                ? 'bg-background text-accent-ink shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={14} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
