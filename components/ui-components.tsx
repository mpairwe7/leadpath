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
    light: 'bg-muted',
    dark: 'bg-primary text-white',
    primary: 'bg-primary text-white',
    white: 'bg-white',
  }

  return (
    <section
      id={id}
      className={`py-12 md:py-20 lg:py-24 ${bgClasses[bgColor]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
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
    default: 'bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow',
    accent:
      'bg-white border border-accent border-opacity-30 rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all',
    elevated:
      'bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer',
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
  variant?: 'primary' | 'secondary' | 'outline'
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
    primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const baseClasses =
    'font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

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
}

export function Heading({
  level = 1,
  className = '',
  children,
  subtitle,
}: HeadingProps) {
  const baseClasses = 'font-serif font-bold text-balance'

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
}

export function ProgramCard({
  icon,
  title,
  description,
  href,
  features,
}: ProgramCardProps) {
  return (
    <Card variant="elevated" className="group">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-serif font-bold text-xl text-foreground">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      {features && (
        <ul className="space-y-2 mb-6 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <a
        href={href}
        className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
      >
        Learn More
        <span>→</span>
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
      <div className="mb-4 text-accent text-2xl">"</div>
      <p className="text-foreground mb-6 italic">{quote}</p>
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </Card>
  )
}
