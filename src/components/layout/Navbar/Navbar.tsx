import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { useScrollProgress } from '@hooks/useScrollProgress'
import { useLanguage } from '@context/LanguageContext'
import logoImg from '@assets/images/crealidad.png'
import styles from './Navbar.module.css'

const WA_LINK = 'https://wa.me/523310707648'

const SECTION_IDS = ['home', 'about', 'services', 'experience', 'faq'] as const
type SectionId = (typeof SECTION_IDS)[number]

function scrollToSection(id: SectionId) {
  if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const Navbar = memo(function Navbar() {
  const { t } = useTranslation()
  const { scrollY } = useScrollProgress()
  const { language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  const isScrolled = scrollY > 60

  /* Mobile menu GSAP slide */
  useEffect(() => {
    const menu = menuRef.current
    const backdrop = backdropRef.current
    if (!menu || !backdrop) return

    if (menuOpen) {
      menu.style.visibility = 'visible'
      menu.style.pointerEvents = 'auto'
      backdrop.style.visibility = 'visible'
      backdrop.style.pointerEvents = 'auto'
      gsap.fromTo(menu, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    } else {
      gsap.to(menu, {
        x: '100%', opacity: 0, duration: 0.28, ease: 'power2.in',
        onComplete: () => { menu.style.visibility = 'hidden'; menu.style.pointerEvents = 'none' },
      })
      gsap.to(backdrop, {
        opacity: 0, duration: 0.28,
        onComplete: () => { backdrop.style.visibility = 'hidden'; backdrop.style.pointerEvents = 'none' },
      })
    }
  }, [menuOpen])

  /* Active section tracking */
  useEffect(() => {
    const onScroll = () => {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80')
      const threshold = navH + 40
      let current: SectionId = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  const links: { sectionId: SectionId; label: string }[] = [
    { sectionId: 'home',       label: t('nav.home') },
    { sectionId: 'about',      label: t('nav.about') },
    { sectionId: 'services',   label: t('nav.services') },
    { sectionId: 'experience', label: t('nav.experience') },
    { sectionId: 'faq',        label: t('nav.faq') },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={[styles.navbar, styles.scrolled].join(' ')}
        role="banner"
      >
        <div className={styles.inner}>
          <button
            className={styles.logoBtn}
            onClick={() => scrollToSection('home')}
            aria-label="Crealidad — Ir al inicio"
          >
            <img
              src={logoImg}
              alt="Crealidad"
              className={[styles.logoImg, styles.logoImgScrolled].join(' ')}
            />
            <span className={styles.logoSub}>Sound Breath</span>
          </button>

          <nav className={styles.desktopNav} aria-label="Navegación principal">
            {links.map(({ sectionId, label }) => (
              <button
                key={label}
                className={[styles.navLink, activeSection === sectionId ? styles.active : ''].filter(Boolean).join(' ')}
                onClick={() => scrollToSection(sectionId)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.langToggle}
              onClick={toggleLanguage}
              aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <a href={WA_LINK} className={styles.ctaLink} target="_blank" rel="noopener noreferrer">
              {t('nav.bookSession')}
            </a>
            <button
              className={[styles.menuToggle, menuOpen ? styles.open : ''].filter(Boolean).join(' ')}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Abrir menú"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — always in DOM, GSAP handles visibility */}
      <div
        ref={menuRef}
        className={styles.mobileMenu}
        role="dialog"
        aria-label="Menú de navegación"
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
      >
        <nav aria-label="Menú móvil">
          {links.map(({ sectionId, label }) => (
            <button
              key={label}
              className={[styles.mobileLink, activeSection === sectionId ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => { scrollToSection(sectionId); close() }}
            >
              {label}
            </button>
          ))}
          <a
            href={WA_LINK}
            className={styles.mobileLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            {t('nav.bookSession')}
          </a>
        </nav>
        <button className={styles.langToggleMobile} onClick={() => { toggleLanguage(); close() }}>
          {language === 'es' ? '🇺🇸 English' : '🇪🇸 Español'}
        </button>
      </div>

      <div
        ref={backdropRef}
        className={styles.backdrop}
        onClick={close}
        aria-hidden="true"
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
      />
    </>
  )
})
