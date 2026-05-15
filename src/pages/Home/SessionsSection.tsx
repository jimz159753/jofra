import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import { Button } from '@components/ui/Button/Button'
import { sendContactEmail, type ContactFormData } from '@services/emailService'
import styles from './SessionsSection.module.css'

interface SessionsSectionProps {
  compact?: boolean
}

export const SessionsSection = memo(function SessionsSection({ compact = false }: SessionsSectionProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    try {
      await sendContactEmail(data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const SESSION_TYPES = [
    t('services.sound.title'),
    t('services.breath.title'),
    t('services.fusion.title'),
    t('services.group.title'),
  ]

  return (
    <Section id="sessions" compact={compact}>
      <div className={styles.layout}>
        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {!compact && (
            <>
              <Badge variant="teal">{t('sessions.label')}</Badge>
              <h2 className={styles.title}>{t('sessions.title')}</h2>
              <p className={styles.subtitle}>{t('sessions.subtitle')}</p>
            </>
          )}

          <div className={styles.benefits}>
            {[
              { icon: '🎵', text: 'Sound Healing — Tibetan Bowls & Gongs' },
              { icon: '🌬️', text: 'Breathwork — Técnicas de respiración guiada' },
              { icon: '🔄', text: 'Sound Breath Fusion — Experiencia completa' },
              { icon: '🧘', text: 'Sesiones grupales disponibles' },
            ].map(({ icon, text }) => (
              <div key={text} className={styles.benefit}>
                <span aria-hidden="true">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {status === 'success' ? (
            <motion.div
              className={styles.successCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className={styles.successIcon} aria-hidden="true">✦</span>
              <h3>{t('sessions.form.success')}</h3>
            </motion.div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Formulario de contacto para reservar sesión"
            >
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    {t('sessions.form.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={[styles.input, errors.name ? styles.inputError : '']
                      .filter(Boolean)
                      .join(' ')}
                    placeholder="Tu nombre"
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name', { required: t('sessions.form.name_required') })}
                  />
                  {errors.name && (
                    <span id="name-error" className={styles.error} role="alert">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    {t('sessions.form.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={[styles.input, errors.email ? styles.inputError : '']
                      .filter(Boolean)
                      .join(' ')}
                    placeholder="tu@correo.com"
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email', {
                      required: t('sessions.form.email_required'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('sessions.form.email_invalid'),
                      },
                    })}
                  />
                  {errors.email && (
                    <span id="email-error" className={styles.error} role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  {t('sessions.form.phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={styles.input}
                  placeholder="+1 000 000 0000"
                  {...register('phone')}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="sessionType" className={styles.label}>
                  {t('sessions.form.session_type')}
                </label>
                <select
                  id="sessionType"
                  className={[styles.input, errors.sessionType ? styles.inputError : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-required="true"
                  aria-describedby={errors.sessionType ? 'session-error' : undefined}
                  {...register('sessionType', {
                    required: t('sessions.form.session_required'),
                  })}
                >
                  <option value="">— Selecciona —</option>
                  {SESSION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.sessionType && (
                  <span id="session-error" className={styles.error} role="alert">
                    {errors.sessionType.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  {t('sessions.form.message')}
                </label>
                <textarea
                  id="message"
                  className={[styles.input, styles.textarea].join(' ')}
                  placeholder="Cuéntame un poco sobre lo que te gustaría trabajar..."
                  rows={4}
                  {...register('message')}
                />
              </div>

              {status === 'error' && (
                <p className={styles.error} role="alert">
                  {t('sessions.form.error')}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={status === 'sending'}
              >
                {status === 'sending' ? t('sessions.form.sending') : t('sessions.form.submit')}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  )
})
