import { memo, type ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeVariant = 'teal' | 'sand' | 'mist' | 'dark'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge = memo(function Badge({
  children,
  variant = 'teal',
  className = '',
}: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
})
