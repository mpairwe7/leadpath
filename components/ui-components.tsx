import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
  bgColor?: 'light' | 'dark' | 'primary' | 'white'
}

export function Section({
  id,
  className = '',
  children,
  bgColor = 'white',
}: SectionProps) {
  const bgClasses = {
    light: 'bg-muted dark:bg-navy-800 text-foreground',
    dark: 'bg-navy dark:bg-navy-900 text-white',
    primary: 'bg-navy dark:bg-navy-900 text-white',
    white: 'bg-white dark:bg-navy-900 text-foreground transition-colors',
  }

  return (
    <section
      id={id}
      className={`py-12 md:py-20 lg:py-24 transition-colors ${bgClasses[bgColor]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

interface EyebrowProps {
  className?: string
  children: ReactNode
}

export function Eyebrow({ className = '', children }: EyebrowProps) {
  return (
    <p
      className={`font-serif text-xs font-bold uppercase tracking-[0.14em] text-accent-ink ${className}`}
    >
      {children}
    </p>
  )
}

interface StatProps {
  value: string
  label: string
  highlight?: boolean
  className?: string
}

export function Stat({ value, label, highlight = false, className = '' }: StatProps) {
  return (
    <div className={className}>
      <div
        className={`font-serif font-extrabold text-4xl md:text-5xl tracking-tight tabular-nums ${
          highlight ? 'text-accent' : ''
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm opacity-75">{label}</div>
    </div>
  )
}

interface CardProps {
  className?: string
  children: ReactNode
  variant?: 'default' | 'accent' | 'elevated'
  onClick?: () => void
}

export function Card({
  className = '',
  children,
  variant = 'default',
  onClick,
}: CardProps) {
  const variantClasses = {
    default:
      'bg-card text-card-foreground border border-border rounded-2xl p-6 transition-colors',
    accent:
      'bg-card text-card-foreground border border-accent/40 rounded-2xl p-6 hover:border-accent transition-colors',
    elevated:
      'bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300',
  }

  return (
    <div
      className={`${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost-light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  href,
  disabled = false,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    gold: 'bg-accent text-accent-foreground hover:bg-accent/90',
    secondary: 'bg-success-ink text-white hover:bg-success-ink/90 dark:text-navy-900',
    outline:
      'border border-primary/40 text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
    'ghost-light': 'border border-white/45 text-white hover:bg-white/10',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  const baseClasses =
    'font-serif font-bold rounded-full transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children: ReactNode
  subtitle?: string
  eyebrow?: string
}

export function Heading({
  level = 1,
  className = '',
  children,
  subtitle,
  eyebrow,
}: HeadingProps) {
  const baseClasses =
    'font-serif font-extrabold tracking-tight text-balance text-primary transition-colors'

  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  }

  const HeadingTag = `h${level}` as any

  return (
    <div>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <HeadingTag
        className={`${baseClasses} ${sizeClasses[level]} ${className}`}
      >
        {children}
      </HeadingTag>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground mt-4">
          {subtitle}
        </p>
      )}
    </div>
  )
}

interface ProgramCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  features?: string[]
  meta?: string[]
  status?: string
}

export function ProgramCard({
  icon,
  title,
  description,
  href,
  features,
  meta,
  status,
}: ProgramCardProps) {
  return (
    <Card variant="elevated" className="group flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/5 text-primary dark:bg-primary/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            {icon}
          </div>
          <h3 className="font-serif font-bold tracking-tight text-xl text-primary">
            {title}
          </h3>
        </div>
        {status && (
          <span className="shrink-0 rounded-full bg-success-ink/10 text-success-ink font-serif font-bold text-[0.68rem] uppercase tracking-wider px-3 py-1">
            {status}
          </span>
        )}
      </div>
      {meta && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground border-b border-border pb-4 mb-4">
          {meta.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">·</span>}
              {item}
            </span>
          ))}
        </div>
      )}
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      {features && (
        <ul className="space-y-2 mb-6 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-success-ink flex-shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <a
        href={href}
        className="mt-auto inline-flex items-center gap-2 text-accent-ink font-serif font-bold hover:gap-3 transition-all"
      >
        Learn More
        <span aria-hidden="true">→</span>
      </a>
    </Card>
  )
}

interface TestimonialProps {
  quote: string
  author: string
  title: string
  image?: string
}

export function Testimonial({
  quote,
  author,
  title,
  image,
}: TestimonialProps) {
  return (
    <Card variant="default">
      <div className="mb-4 text-accent-ink font-serif text-3xl leading-none" aria-hidden="true">
        &ldquo;
      </div>
      <p className="text-foreground mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover ring-1 ring-border"
          />
        )}
        <div>
          <p className="font-serif font-bold text-primary">{author}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </Card>
  )
}
