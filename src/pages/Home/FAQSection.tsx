import { useState, useRef, useEffect, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import styles from './FAQSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const

export const FAQSection = memo(function FAQSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | null>(null)
  const listRef = useRef<HTMLDListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-faq-item]', {
        y: 24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key))

  return (
    <Section id="faq" narrow>
      <div className={styles.header}>
        <Badge variant="teal">{t('faq.label')}</Badge>
        <h2 className={styles.title}>{t('faq.title')}</h2>
        <p className={styles.subtitle}>{t('faq.subtitle')}</p>
      </div>

      <dl className={styles.list} ref={listRef}>
        {FAQ_KEYS.map((key) => {
          const isOpen = open === key
          return (
            <div
              key={key}
              data-faq-item
              className={[styles.item, isOpen ? styles.itemOpen : ''].filter(Boolean).join(' ')}
            >
              <dt>
                <button
                  className={styles.question}
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${key}`}
                >
                  <span>{t(`faq.${key}`)}</span>
                  <span className={[styles.icon, isOpen ? styles.iconOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="6" y1="0" x2="6" y2="12" className={styles.iconV} />
                      <line x1="0" y1="6" x2="12" y2="6" />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd id={`faq-${key}`} className={styles.answer}>
                <p>{t(`faq.${key.replace('q', 'a')}`)}</p>
              </dd>
            </div>
          )
        })}
      </dl>
    </Section>
  )
})
