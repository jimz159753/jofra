import { memo, type ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  glass?: boolean
  hover?: boolean
  className?: string
  as?: 'div' | 'article' | 'section'
}

export const Card = memo(function Card({
  children,
  glass = false,
  hover = true,
  className = '',
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={[styles.card, glass ? styles.glass : '', hover ? styles.hover : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
})
