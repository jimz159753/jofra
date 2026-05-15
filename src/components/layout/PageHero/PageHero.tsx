import { memo } from 'react'
import styles from './PageHero.module.css'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
}

export const PageHero = memo(function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <div className={styles.hero} aria-label={`Encabezado — ${title}`}>
      <p className={styles.label}>{label}</p>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
})
