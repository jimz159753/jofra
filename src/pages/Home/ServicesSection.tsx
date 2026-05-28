import { useEffect, useRef, memo, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import breathworkVideo from '@assets/videos/Breathwork.mp4'
import medicinaVideo from '@assets/videos/Medicina ancestral.mp4'
import reprogramacionVideo from '@assets/videos/Reprogramacion mental.mp4'
import adaptogenosVideo from '@assets/videos/Tratamientos adaptogenos.mp4'
import styles from './ServicesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const WA_LINK = 'https://wa.me/523310707648'

const VIDEO_MAP: Record<string, string> = {
  sound: breathworkVideo,
  breath: medicinaVideo,
  fusion: reprogramacionVideo,
  group: adaptogenosVideo,
}

/* ── Video Modal ─────────────────────────────────── */
const IcoClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IcoPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

interface VideoModalProps { src: string; title: string; onClose: () => void }

const VideoModal = memo(function VideoModal({ src, title, onClose }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.fromTo(wrapRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' })
    const v = videoRef.current
    if (v) { v.muted = false; v.play().catch(() => { v.muted = true; v.play() }) }
  }, [])

  const close = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return createPortal(
    <div ref={overlayRef} className={styles.modalOverlay} onClick={close} role="dialog" aria-modal="true" aria-label={title}>
      <button className={styles.modalClose} onClick={close} aria-label="Cerrar video"><IcoClose /></button>
      <div ref={wrapRef} className={styles.modalVideoWrap} onClick={e => e.stopPropagation()}>
        <video ref={videoRef} src={src} className={styles.modalVideo} controls playsInline />
      </div>
    </div>,
    document.body
  )
})

/* ── Service icons ───────────────────────────────── */
const IcoSound = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="18" r="2.5" fill="currentColor" stroke="none" />
    <path d="M13 13 Q9 18 13 23" />
    <path d="M23 13 Q27 18 23 23" />
    <path d="M8 8 Q2 18 8 28" strokeOpacity="0.4" />
    <path d="M28 8 Q34 18 28 28" strokeOpacity="0.4" />
  </svg>
)

const IcoBreath = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M3 12 C7 5 11 19 15 12 C19 5 23 19 27 12 C29 9 31 10 33 12" />
    <path d="M3 18 C7 11 11 25 15 18 C19 11 23 25 27 18 C29 15 31 16 33 18" strokeOpacity="0.5" />
    <path d="M3 24 C7 17 11 31 15 24 C19 17 23 31 27 24 C29 21 31 22 33 24" strokeOpacity="0.22" />
  </svg>
)

const IcoFusion = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="14" cy="18" r="9" />
    <circle cx="22" cy="18" r="9" />
    <path d="M18 9.4 Q23.5 13.5 23.5 18 Q23.5 22.5 18 26.6 Q12.5 22.5 12.5 18 Q12.5 13.5 18 9.4Z" fill="currentColor" fillOpacity="0.18" stroke="none" />
  </svg>
)

const IcoGroup = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="11" r="4" />
    <path d="M10 30 C10 23 26 23 26 30" />
    <circle cx="7" cy="15" r="3" />
    <path d="M1 28 C1 23 7 22 10 23.5" />
    <circle cx="29" cy="15" r="3" />
    <path d="M35 28 C35 23 29 22 26 23.5" />
  </svg>
)

const SERVICES: { key: 'sound' | 'breath' | 'fusion' | 'group'; icon: ReactNode; featured?: boolean }[] = [
  { key: 'sound', icon: <IcoSound /> },
  { key: 'breath', icon: <IcoBreath /> },
  { key: 'fusion', icon: <IcoFusion />, featured: true },
  { key: 'group', icon: <IcoGroup /> },
]

interface ServicesSectionProps {
  compact?: boolean
}

export const ServicesSection = memo(function ServicesSection({ compact = false }: ServicesSectionProps) {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null)

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
      {activeVideo && (
        <VideoModal
          src={activeVideo.src}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

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
            <button
              className={styles.videoBtn}
              onClick={() => setActiveVideo({ src: VIDEO_MAP[key], title: t(`services.${key}.title`) })}
            >
              <IcoPlay />
              {t('services.watch_video')}
            </button>
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
