import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '@components/layout/PageHero/PageHero'
import { SessionsSection } from '@pages/Home/SessionsSection'
import { FAQSection } from '@pages/Home/FAQSection'

export default function Contact() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.contact')} | Jofra Sound Breath`
  }, [t])

  return (
    <main>
      <SessionsSection compact />
      <FAQSection />
    </main>
  )
}
