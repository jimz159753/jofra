import { useRef, useState, useCallback, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import respirarVideo from '@assets/videos/respirar.mp4'
import entrepreneurVideo from '@assets/videos/entrepreneur.mp4'
import styles from './TikTokSection.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Status bar icons ────────────────────────────────── */
const IcoSignal = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="white" aria-hidden="true">
    <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="0.35"/>
    <rect x="4.5" y="6" width="3" height="6" rx="0.5" opacity="0.55"/>
    <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="0.8"/>
    <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
  </svg>
)

const IcoWifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
    <circle cx="8" cy="11" r="1.2" fill="white"/>
    <path d="M4.5 8.2 Q8 5 11.5 8.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path d="M1.5 5.5 Q8 0.5 14.5 5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
)

const IcoBattery = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.4"/>
    <rect x="2" y="2" width="16" height="8" rx="2" fill="white"/>
    <path d="M23 4.5v3a1.5 1.5 0 000-3z" fill="white" fillOpacity="0.5"/>
  </svg>
)

/* ── Audio / playback icons ──────────────────────────── */
const IcoSpeakerOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
)

const IcoSpeakerOn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  </svg>
)

const IcoHeart = ({ filled }: { filled?: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill={filled ? '#fe2c55' : 'white'} aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const IcoCommentBubble = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
)

const IcoArrowShare = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
)

const IcoMusicNote = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const IcoExpand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>
)

const IcoClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
)

/* ── Video modal ─────────────────────────────────────── */
interface VideoModalProps {
  src: string
  caption: string
  onClose: () => void
}

const VideoModal = memo(function VideoModal({ src, caption, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.muted = false
    v.play().catch(() => { v.muted = true; v.play() })
  }, [src])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(wrapRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }, '<0.05')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div ref={overlayRef} className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={caption}>
      <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar video">
        <IcoClose />
      </button>
      <div ref={wrapRef} className={styles.modalVideoWrap} onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={src}
          className={styles.modalVideo}
          controls
          playsInline
          loop
        />
      </div>
    </div>,
    document.body
  )
})

/* ── Card ────────────────────────────────────────────── */
interface TikTokCardProps {
  src: string
  username: string
  handle: string
  caption: string
  tags: string[]
  song: string
  likes: string
  comments: string
  shares: string
  delay?: number
  onExpand: () => void
}

const TikTokCard = memo(function TikTokCard({
  src,
  username,
  handle,
  caption,
  tags,
  song,
  likes,
  comments,
  shares,
  onExpand,
}: TikTokCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [liked, setLiked] = useState(false)

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((p) => !p)
  }, [])

  return (
    <div className={styles.phone}>
        <div
          className={styles.screen}
          onClick={onExpand}
          role="button"
          aria-label="Ver video completo con sonido"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onExpand()}
        >
          <div className={styles.dynamicIsland} aria-hidden="true" />

          <video
            ref={videoRef}
            className={styles.video}
            src={src}
            muted
            loop
            playsInline
            autoPlay
          />

          <div className={styles.gradTop} aria-hidden="true" />
          <div className={styles.gradBottom} aria-hidden="true" />

          <div className={styles.statusBar} aria-hidden="true">
            <span className={styles.time}>9:41</span>
            <div className={styles.statusIcons}>
              <IcoSignal />
              <IcoWifi />
              <IcoBattery />
            </div>
          </div>

          <div className={styles.topBar}>
            <span className={styles.topLabel}>Para ti</span>
            <span className={styles.topActive}>Siguiendo</span>
            <button
              className={styles.muteBtn}
              onClick={toggleMute}
              aria-label={muted ? 'Activar sonido' : 'Silenciar'}
            >
              {muted ? <IcoSpeakerOff /> : <IcoSpeakerOn />}
            </button>
          </div>

          {/* Expand hint */}
          <div className={styles.expandHint} aria-hidden="true">
            <IcoExpand />
            <span>Ver con sonido</span>
          </div>

          <div className={styles.actions}>
            <div className={styles.avatar} aria-hidden="true">
              <span>{username.charAt(0).toUpperCase()}</span>
            </div>
            <div className={styles.plusBadge} aria-hidden="true">+</div>

            <button
              className={[styles.actionBtn, liked ? styles.liked : ''].filter(Boolean).join(' ')}
              onClick={handleLike}
              aria-label={liked ? 'Quitar like' : 'Dar like'}
              aria-pressed={liked}
            >
              <IcoHeart filled={liked} />
              <span className={styles.actionCount}>
                {liked
                  ? String(parseInt(likes.replace(/[^0-9]/g, '')) + 1) + likes.replace(/[\d]/g, '').trim()
                  : likes}
              </span>
            </button>

            <button className={styles.actionBtn} aria-label="Comentarios" onClick={(e) => e.stopPropagation()}>
              <IcoCommentBubble />
              <span className={styles.actionCount}>{comments}</span>
            </button>

            <button className={styles.actionBtn} aria-label="Compartir" onClick={(e) => e.stopPropagation()}>
              <IcoArrowShare />
              <span className={styles.actionCount}>{shares}</span>
            </button>

            <div className={styles.musicDisc} aria-hidden="true">
              <IcoMusicNote />
            </div>
          </div>

          <div className={styles.bottomInfo}>
            <p className={styles.cardUsername}>@{handle}</p>
            <p className={styles.caption}>{caption}</p>
            <p className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag} </span>
              ))}
            </p>
            <div className={styles.songRow} aria-label={`Canción: ${song}`}>
              <span className={styles.songIcon} aria-hidden="true"><IcoMusicNote /></span>
              <span className={styles.songName}>{song}</span>
            </div>
          </div>

          <div className={styles.homeBar} aria-hidden="true" />
        </div>
      </div>
  )
})

/* ── Section ─────────────────────────────────────────── */
const VIDEOS = [
  {
    src: respirarVideo,
    username: 'Jofra',
    handle: 'jofra.soundbreath',
    caption: 'Así se siente respirar de verdad 🌬️ Técnica de 60 segundos para calmar tu sistema nervioso',
    tags: ['breathwork', 'respiracion', 'bienestar', 'sanar'],
    song: 'Ocean Breath — Healing Frequency 432Hz',
    likes: '24.2K',
    comments: '843',
    shares: '1.1K',
  },
  {
    src: entrepreneurVideo,
    username: 'Jofra',
    handle: 'jofra.soundbreath',
    caption: 'Para emprendedores que nunca descansan 🌬️ 3 respiraciones que cambian tu estado',
    tags: ['entrepreneur', 'breathwork', 'mindset', 'productividad'],
    song: 'Ocean Waves Frequency — 432Hz',
    likes: '18.7K',
    comments: '612',
    shares: '987',
  },
]

export const TikTokSection = memo(function TikTokSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[number] | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-tiktok-header]', {
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('[data-tiktok-card]', {
        opacity: 0,
        y: 70,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: phonesRef.current, start: 'top 85%', once: true },
      })
      gsap.from('[data-tiktok-cta]', {
        opacity: 0,
        y: 22,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: phonesRef.current, start: 'bottom 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="tiktok-heading">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      {activeVideo && (
        <VideoModal
          src={activeVideo.src}
          caption={activeVideo.caption}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <div className={styles.container}>
        <div data-tiktok-header className={styles.header}>
          <span className={styles.eyebrow}>✦ {t('tiktok.eyebrow')}</span>
          <h2 id="tiktok-heading" className={styles.title}>
            {t('tiktok.title_1')}<br />
            <em>{t('tiktok.title_2')}</em>
          </h2>
          <p className={styles.subtitle}>
            {t('tiktok.subtitle')}
          </p>
        </div>

        <div className={styles.phones} ref={phonesRef}>
          {VIDEOS.map((v, i) => (
            <div key={v.src} data-tiktok-card className={i === 0 ? styles.cardWrapperLeft : styles.cardWrapperRight}>
              <TikTokCard {...v} delay={i * 0.15} onExpand={() => setActiveVideo(v)} />
            </div>
          ))}
        </div>

        <div data-tiktok-cta className={styles.cta}>
          <a
            href="https://www.tiktok.com/@sercrealidad"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tiktokBtn}
            aria-label="Ver perfil de Jofra en TikTok"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.78a8.27 8.27 0 004.84 1.55V6.89a4.85 4.85 0 01-1.07-.2z"/>
            </svg>
            {t('tiktok.cta')}
          </a>
        </div>
      </div>
    </section>
  )
})
