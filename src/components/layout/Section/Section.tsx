import { memo, type ReactNode, type ElementType } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  dark?: boolean
  as?: ElementType
  narrow?: boolean
  compact?: boolean
}

export const Section = memo(function Section({
  children,
  id,
  className = '',
  dark = false,
  as: Tag = 'section',
  narrow = false,
  compact = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[
        styles.section,
        dark ? styles.dark : '',
        compact ? styles.compact : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={[styles.container, narrow ? styles.narrow : ''].filter(Boolean).join(' ')}>
        {children}
      </div>
    </Tag>
  )
})
