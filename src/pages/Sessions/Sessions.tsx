import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SessionsSection } from '@pages/Home/SessionsSection'

export default function Sessions() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('nav.sessions')} | Crealidad`
  }, [t])

  return (
    <main>
      <SessionsSection compact />
    </main>
  )
}
