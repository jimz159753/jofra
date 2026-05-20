import { useRef, useEffect, useState, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import jofraImg from '@assets/images/jofra.png'
import styles from './AboutSection.module.css'

gsap.registerPlugin(ScrollTrigger)

interface StatProps {
  end: number
  label: string
  suffix?: string
}

const AnimatedStat = memo(function AnimatedStat({ end, label, suffix = '' }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let val = 0
        const step = end / (2000 / 16)
        const timer = setInterval(() => {
          val += step
          if (val >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(val))
        }, 16)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNum}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
})

interface AboutSectionProps {
  compact?: boolean
}

export const AboutSection = memo(function AboutSection({ compact = false }: AboutSectionProps) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)

  const certifications = [
    t('about.cert_1'),
    t('about.cert_2'),
    t('about.cert_3'),
    t('about.cert_4'),
    t('about.cert_5'),
    t('about.cert_6'),
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-about-item]', {
        y: 44,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="about" compact={compact}>
      <div className={styles.grid} ref={sectionRef}>
        <div data-about-item className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <img
              src={jofraImg}
              alt="Jofra — guía de sonido y respiración"
              className={styles.image}
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
            <div className={styles.imageDecor} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.textCol}>
          {!compact && (
            <div data-about-item>
              <Badge variant="teal">{t('about.label')}</Badge>
              <h2 className={styles.title}>{t('about.title')}</h2>
              <p className={styles.subtitle}>{t('about.subtitle')}</p>
            </div>
          )}

          <div data-about-item>
            <p className={styles.bio}>{t('about.bio_1')}</p>
            <p className={styles.bio}>{t('about.bio_2')}</p>
          </div>

          <blockquote data-about-item className={styles.quote}>
            {t('about.quote')}
          </blockquote>

          <div data-about-item>
            <h3 className={styles.certsTitle}>{t('about.certifications')}</h3>
            <ul className={styles.certs}>
              {certifications.map((cert) => (
                <li key={cert} className={styles.cert}>
                  <span className={styles.certDot} aria-hidden="true">✦</span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div data-about-item className={styles.stats}>
        <AnimatedStat end={15} suffix="+" label={t('about.stats.experience')} />
        <div className={styles.statDivider} aria-hidden="true" />
        <AnimatedStat end={500} suffix="+" label={t('about.stats.sessions')} />
        <div className={styles.statDivider} aria-hidden="true" />
        <AnimatedStat end={3000} suffix="+" label={t('about.stats.clients')} />
      </div>
    </Section>
  )
})
