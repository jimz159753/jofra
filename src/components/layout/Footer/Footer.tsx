import { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

function scrollTo(id: string) {
  if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const Footer = memo(function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  const links = [
    { id: 'home',     label: t('nav.home') },
    { id: 'about',    label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
  ]

  const socials = [
    { href: 'https://instagram.com', label: 'Instagram', icon: '◉' },
    { href: 'https://facebook.com',  label: 'Facebook',  icon: '◈' },
    { href: 'https://youtube.com',   label: 'YouTube',   icon: '▶' },
  ]

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>Jofra</span>
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
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.newsletter}>
            <h3 className={styles.colTitle}>{t('footer.newsletter.title')}</h3>
            <p className={styles.newsletterSub}>{t('footer.newsletter.subtitle')}</p>
            {subscribed ? (
              <p className={styles.successMsg}>{t('footer.newsletter.success')}</p>
            ) : (
              <form className={styles.form} onSubmit={handleNewsletter}>
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('footer.newsletter.placeholder')}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.submitBtn}>
                  {t('footer.newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
})
