import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '@components/layout/PageHero/PageHero'
import { AboutSection } from '@pages/Home/AboutSection'

export default function About() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.about')} | Crealidad`
  }, [t])

  return (
    <main>
      <AboutSection compact />
    </main>
  )
}
