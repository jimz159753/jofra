import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import logoImg from '@assets/images/crealidad.png'
import styles from './Footer.module.css'

function scrollTo(id: string) {
  if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ── Social SVG icons ────────────────────────────────── */
const IcoInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const IcoFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const IcoYouTube = () => (
  <svg width="20" height="14" viewBox="0 0 24 17" fill="currentColor" aria-hidden="true">
    <path d="M23.495 2.205a3.02 3.02 0 00-2.12-2.12C19.566 0 12 0 12 0S4.434 0 2.625.085a3.02 3.02 0 00-2.12 2.12C0 4.013 0 8.5 0 8.5s0 4.487.505 6.295a3.02 3.02 0 002.12 2.12C4.434 17 12 17 12 17s7.566 0 9.375-.085a3.02 3.02 0 002.12-2.12C24 12.987 24 8.5 24 8.5s0-4.487-.505-6.295zM9.545 12.023V4.977L15.818 8.5l-6.273 3.523z"/>
  </svg>
)

const IcoTikTok = () => (
  <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.78a8.27 8.27 0 004.84 1.55V6.89a4.85 4.85 0 01-1.07-.2z"/>
  </svg>
)

/* ── Component ───────────────────────────────────────── */
export const Footer = memo(function Footer() {
  const { t } = useTranslation()

  const links = [
    { id: 'home',       label: t('nav.home') },
    { id: 'about',      label: t('nav.about') },
    { id: 'services',   label: t('nav.services') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'faq',        label: t('nav.faq') },
  ]

  const socials: { href: string; label: string; icon: React.ReactNode }[] = [
    { href: 'https://www.instagram.com/sercrealidad/', label: 'Instagram', icon: <IcoInstagram /> },
    { href: 'https://www.facebook.com/SERCREALIDAD', label: 'Facebook', icon: <IcoFacebook /> },
    { href: 'https://www.youtube.com/@ser-crealidad5314', label: 'YouTube', icon: <IcoYouTube /> },
    { href: 'https://www.tiktok.com/@sercrealidad', label: 'TikTok', icon: <IcoTikTok /> },
  ]

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logoImg} alt="Crealidad" className={styles.logo} />
            <p className={styles.tagline}>{t('footer.tagline')}</p>
            <blockquote className={styles.quote}>{t('footer.quote')}</blockquote>
          </div>

          <nav className={styles.links} aria-label="Links del footer">
            <h3 className={styles.colTitle}>{t('footer.quick_links')}</h3>
            {links.map(({ id, label }) => (
              <button key={id} className={styles.link} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>

          <div className={styles.social}>
            <h3 className={styles.colTitle}>{t('footer.social')}</h3>
            <div className={styles.socialLinks}>
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
})
