import { useEffect, useRef, memo } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { Button } from '@components/ui/Button/Button'
import therapyVideo from '@assets/videos/therapy.mp4'
import styles from './HeroSection.module.css'

const PARTICLE_COUNT = 20

export const HeroSection = memo(function HeroSection() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  /* Floating particles reacting to mouse */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY })

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) { p.x -= dx * 0.007; p.y -= dy * 0.007 }
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  /* GSAP entrance sequence */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })
      tl.from('[data-hero-item]', {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.18,
        ease: 'power3.out',
      }).from('[data-hero-scroll]', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '+=0.6')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const WA_LINK = 'https://wa.me/1234567890'
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" ref={sectionRef} className={styles.hero} aria-label="Hero — Crealidad">
      <video
        className={styles.videoBg}
        src={therapyVideo}
        autoPlay muted loop playsInline
        aria-hidden="true"
      />
      <div className={styles.overlayDark} aria-hidden="true" />
      <div className={styles.overlayVignette} aria-hidden="true" />
      <div className={styles.overlayGrain} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.content} ref={contentRef}>
        <span data-hero-item className={styles.eyebrow}>{t('hero.tagline')}</span>

        <h1 data-hero-item className={styles.title}>Crealidad</h1>

        <p data-hero-item className={styles.subtitle}>{t('hero.subtitle')}</p>

        <p data-hero-item className={styles.description}>{t('hero.description')}</p>

        <div data-hero-item className={styles.ctas}>
          <a href={WA_LINK} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
            {t('hero.cta_primary')}
          </a>
          <Button variant="outline" size="lg" onClick={() => scrollTo('services')}>
            {t('hero.cta_secondary')}
          </Button>
        </div>
      </div>

      <button
        data-hero-scroll
        className={styles.scrollHint}
        onClick={() => scrollTo('about')}
        aria-label={t('hero.scroll_hint')}
      >
        <span className={styles.scrollLine} aria-hidden="true" />
        <span className={styles.scrollText}>{t('hero.scroll_hint')}</span>
      </button>

      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  )
})
