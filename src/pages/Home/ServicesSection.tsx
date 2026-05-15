import { useEffect, useRef, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import styles from './ServicesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const WA_LINK = 'https://wa.me/1234567890'

const SERVICES: { key: 'sound' | 'breath' | 'fusion' | 'group'; icon: string; featured?: boolean }[] = [
  { key: 'sound',  icon: '🎵' },
  { key: 'breath', icon: '🌬️' },
  { key: 'fusion', icon: '🔄', featured: true },
  { key: 'group',  icon: '🧘' },
]

interface ServicesSectionProps {
  compact?: boolean
}

export const ServicesSection = memo(function ServicesSection({ compact = false }: ServicesSectionProps) {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-service-card]', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="services" dark compact={compact}>
      {!compact && (
        <div className={styles.header}>
          <Badge variant="mist">{t('services.label')}</Badge>
          <h2 className={styles.title}>{t('services.title')}</h2>
          <p className={styles.subtitle}>{t('services.subtitle')}</p>
        </div>
      )}

      <div className={styles.grid} ref={gridRef}>
        {SERVICES.map(({ key, icon, featured }) => (
          <article
            key={key}
            data-service-card
            className={[styles.card, featured ? styles.featured : ''].filter(Boolean).join(' ')}
          >
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            {featured && <span className={styles.featuredBadge}>Más popular</span>}
            <h3 className={styles.cardTitle}>{t(`services.${key}.title`)}</h3>
            <p className={styles.cardDesc}>{t(`services.${key}.desc`)}</p>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t('services.duration')}</span>
                <span className={styles.metaVal}>{t(`services.${key}.duration`)}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t('services.price')}</span>
                <span className={styles.metaVal}>{t(`services.${key}.price`)}</span>
              </div>
            </div>
            <a
              href={WA_LINK}
              className={[styles.bookLink, featured ? styles.bookLinkFeatured : ''].filter(Boolean).join(' ')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('services.book')}
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
})
