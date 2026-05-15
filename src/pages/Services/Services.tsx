import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ServicesSection } from '@pages/Home/ServicesSection'

export default function Services() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.services')} | Jofra Sound Breath`
  }, [t])

  return (
    <main>
      <ServicesSection compact />
    </main>
  )
}
