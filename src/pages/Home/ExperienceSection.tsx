import { memo, useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { Section } from '@components/layout/Section/Section'
import { Badge } from '@components/ui/Badge/Badge'
import styles from './ExperienceSection.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── WhatsApp SVG icons ──────────────────────────────── */
const IcoBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
  </svg>
)
const IcoVideo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="currentColor"/>
  </svg>
)
const IcoPhone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
  </svg>
)
const IcoMore = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
  </svg>
)
const IcoEmoji = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
  </svg>
)
const IcoAttach = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" fill="currentColor"/>
  </svg>
)
const IcoMic = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="currentColor"/>
  </svg>
)

const IcoChecks = ({ read }: { read?: boolean }) => {
  const c = read ? '#53bdeb' : '#8696a0'
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
      <polyline points="1,5.5 3.5,8.5 9.5,1.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="5.5,5.5 8,8.5 14.5,1.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const STEPS = ['arrival', 'breathwork', 'soundbath', 'integration'] as const

/* ── Conversation data ───────────────────────────────── */
interface Message { from: 'client' | 'jofra'; text: string; time: string; read?: boolean }
interface Conversation { name: string; avatarLetter: string; avatarColor: string; lastSeen: string; messages: Message[] }

const CONVERSATIONS: Conversation[] = [
  {
    name: 'María G.', avatarLetter: 'M', avatarColor: '#7b9e8a', lastSeen: 'en línea',
    messages: [
      { from: 'client', text: 'Hola Jofra, llevo meses con mucho estrés en el trabajo. ¿Crees que una sesión de Breathwork me puede ayudar?', time: '10:14' },
      { from: 'jofra', text: 'Sin duda te ayudará, María. La bioquímica que se genera durante la sesión, combinada con las vibraciones de las frecuencias, mueve tu sistema nervioso y libera esa tensión acumulada. ¿Estás lista para darte esa oportunidad? 🌬️', time: '10:16', read: true },
      { from: 'client', text: 'Las terapias de respiración me han ayudado mucho y quiero seguir avanzando. Me gustaría tomar una sesión de Breathwork por lo menos cada mes ✨', time: '10:58' },
    ],
  },
  {
    name: 'Carlos M.', avatarLetter: 'C', avatarColor: '#8a7b9e', lastSeen: 'última vez hoy a las 11:30',
    messages: [
      { from: 'client', text: 'Tengo ansiedad crónica desde hace tiempo. ¿Realmente funciona el Breathwork para eso?', time: '11:02' },
      { from: 'jofra', text: 'El Breathwork activa tu sistema nervioso en su capacidad de resolución, disolviendo la ansiedad desde la raíz. Para resultados duraderos, te recomiendo complementarlo con terapia personalizada para trabajar la causa específica 🌬️ ¿Te animas?', time: '11:05', read: true },
      { from: 'client', text: 'Me encanta saber que hay un proceso real y no solo una experiencia pasajera. Que me guíen y acompañen hasta resolver la ansiedad es exactamente lo que necesitaba. Muchas gracias 🙌', time: '11:48' },
    ],
  },
  {
    name: 'Laura P.', avatarLetter: 'L', avatarColor: '#9e8a7b', lastSeen: 'en línea',
    messages: [
      { from: 'client', text: 'Nunca he meditado antes y me da un poco de miedo. ¿Está bien ir sin experiencia?', time: '16:20' },
      { from: 'jofra', text: '¡Claro que sí Laura! No se necesita ninguna experiencia previa. Solo llega con disposición y confianza de que serás guiada de manera segura, divertida y consciente en cada paso 🌿', time: '16:23', read: true },
      { from: 'client', text: 'Fue mucho más cómodo de lo que imaginaba. Me sentí completamente segura y guiada en todo momento. La experiencia fue hermosa y transformadora 💛', time: '17:10' },
    ],
  },
  {
    name: 'Sofía R.', avatarLetter: 'S', avatarColor: '#9e7b8a', lastSeen: 'última vez ayer',
    messages: [
      { from: 'client', text: '¡Qué tal Jofra! ¿Tienes disponibilidad esta semana? Me recomendaron muchísimo tus sesiones.', time: '09:30' },
      { from: 'jofra', text: 'Tengo espacios disponibles para terapia de sanación de memorias, que te prepara para llegar más ligera y liberada a la sesión de Breathwork y aprovecharla al máximo ✨', time: '09:33', read: true },
      { from: 'client', text: 'Me encantaría ese nivel de acompañamiento antes y después del Breathwork. ¡Quiero anotarme a todas las sesiones que tengas disponibles en mi ciudad! 🌸', time: '19:45' },
    ],
  },
  {
    name: 'Andrés V.', avatarLetter: 'A', avatarColor: '#7b8a9e', lastSeen: 'en línea',
    messages: [
      { from: 'client', text: 'Fui muy escéptico al principio pero mi pareja me convenció. ¿Realmente vale la pena intentar mejorar mi vida con Breathwork?', time: '14:05' },
      { from: 'jofra', text: 'Entiendo el escepticismo, Andrés. Llevo más de 15 años en esto y los más escépticos suelen ser mis clientes más satisfechos. Asiste sin expectativas, solo con apertura. El cuerpo responde aunque la mente dude 😊', time: '14:09', read: true },
      { from: 'client', text: 'Tenías razón. En algún momento me quedé dormido y desperté con un llanto de alivio. Algo que me angustiaba se soltó por dentro. Muy liberado y agradecido 🙏🏼', time: '18:22' },
    ],
  },
  {
    name: 'Valeria T.', avatarLetter: 'V', avatarColor: '#8a9e7b', lastSeen: 'última vez hoy a las 08:15',
    messages: [
      { from: 'client', text: '¿Se puede hacer Breathwork si tengo ansiedad severa? No quiero que me afecte.', time: '08:10' },
      { from: 'jofra', text: 'Te recomiendo comenzar con sesiones de sanación de memorias para trabajar la raíz de la ansiedad. Después el Breathwork será con respiraciones suaves y progresivas, siempre cuidando cada momento del proceso 💙', time: '08:14', read: true },
      { from: 'client', text: 'Hacer las sesiones de sanación antes fue clave. En el Breathwork pude soltar la tensión que me había acompañado durante años. Quiero seguir con este proceso que complementa todo de manera magistral 🌸', time: '21:03' },
    ],
  },
]

/* ── Chat card ───────────────────────────────────────── */
const WhatsAppChat = memo(function WhatsAppChat({ convo }: { convo: Conversation }) {
  return (
    <div className={styles.chatCard} role="article" aria-label={`Conversación con ${convo.name}`}>
      <div className={styles.chatHeader}>
        <div className={styles.chatBackBtn} aria-hidden="true"><IcoBack /></div>
        <div className={styles.chatAvatar} style={{ background: convo.avatarColor }} aria-hidden="true">
          {convo.avatarLetter}
        </div>
        <div className={styles.chatHeaderInfo}>
          <span className={styles.chatName}>{convo.name}</span>
          <span className={styles.chatStatus}>{convo.lastSeen}</span>
        </div>
        <div className={styles.chatHeaderActions} aria-hidden="true">
          <IcoVideo /><IcoPhone /><IcoMore />
        </div>
      </div>

      <div className={styles.chatBody} role="log" aria-label="Mensajes">
        <div className={styles.chatWallpaper} aria-hidden="true" />
        <div className={styles.dateChip} aria-hidden="true">Hoy</div>
        {convo.messages.map((msg, i) => (
          <div
            key={i}
            className={[styles.bubbleRow, msg.from === 'jofra' ? styles.bubbleRowOut : styles.bubbleRowIn].join(' ')}
          >
            {msg.from === 'client' && (
              <div className={styles.bubbleAvatar} style={{ background: convo.avatarColor }} aria-hidden="true">
                {convo.avatarLetter}
              </div>
            )}
            <div className={[styles.bubble, msg.from === 'jofra' ? styles.bubbleOut : styles.bubbleIn].join(' ')}>
              {msg.from === 'jofra' && <span className={styles.bubbleSender}>Jofra</span>}
              <p className={styles.bubbleText}>{msg.text}</p>
              <div className={styles.bubbleMeta}>
                <time className={styles.bubbleTime}>{msg.time}</time>
                {msg.from === 'jofra' && <IcoChecks read={msg.read} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatInputBar} aria-hidden="true">
        <div className={styles.chatInputEmoji}><IcoEmoji /></div>
        <div className={styles.chatInputField}>
          <span className={styles.chatInputPlaceholder}>Mensaje</span>
          <div className={styles.chatInputAttach}><IcoAttach /></div>
        </div>
        <div className={styles.chatMicBtn}><IcoMic /></div>
      </div>
    </div>
  )
})

/* ── Infinite marquee carousel ───────────────────────── */
const doubled = [...CONVERSATIONS, ...CONVERSATIONS]

const Carousel = memo(function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let killed = false

    const raf = requestAnimationFrame(() => {
      if (killed) return

      /* offsetLeft of the 7th slide (index 6) is the exact pixel where
         the duplicate set starts — the precise seamless loop point */
      const firstDup = track.children[CONVERSATIONS.length] as HTMLElement | undefined
      if (!firstDup) return
      const loopPoint = firstDup.offsetLeft

      function animate() {
        if (killed) return
        gsap.set(track, { x: 0 })
        tweenRef.current = gsap.to(track, {
          x: -loopPoint,
          duration: 30,
          ease: 'none',
          onComplete: animate,
        })
      }
      animate()
    })

    return () => {
      killed = true
      cancelAnimationFrame(raf)
      tweenRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (paused) tweenRef.current?.pause()
    else tweenRef.current?.resume()
  }, [paused])

  const handlePause  = useCallback(() => setPaused(true), [])
  const handleResume = useCallback(() => setPaused(false), [])

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <div className={styles.carouselViewport}>
        <div className={styles.carouselTrack} ref={trackRef}>
          {doubled.map((convo, i) => (
            <div key={`${convo.name}-${i}`} className={styles.carouselSlide}>
              <WhatsAppChat convo={convo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

/* ── Full section ────────────────────────────────────── */
export const ExperienceSection = memo(function ExperienceSection() {
  const { t } = useTranslation()
  const timelineRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Timeline steps stagger in */
      gsap.from('[data-step]', {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -30 : 30),
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
      })
      /* Testimonials header fade */
      gsap.from('[data-testimonials-header]', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 82%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Section id="experience">
        <div className={styles.header}>
          <Badge variant="teal">{t('experience.label')}</Badge>
          <h2 className={styles.title}>{t('experience.title')}</h2>
          <p className={styles.subtitle}>{t('experience.subtitle')}</p>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          {STEPS.map((step, i) => (
            <div key={step} data-step className={styles.step}>
              <div className={styles.stepNum} aria-hidden="true">0{i + 1}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t(`experience.steps.${step}.title`)}</h3>
                <p className={styles.stepDesc}>{t(`experience.steps.${step}.desc`)}</p>
              </div>
              {i < STEPS.length - 1 && <div className={styles.connector} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <div data-testimonials-header className={styles.testimonialsHeader} ref={testimonialsRef}>
          <Badge variant="mist">{t('experience.testimonials.label')}</Badge>
          <h2 className={styles.testimonialsTitle}>{t('experience.testimonials.title')}</h2>
          <p className={styles.testimonialsSubtitle}>
            Conversaciones reales de clientes después de sus sesiones
          </p>
        </div>
        <Carousel />
      </Section>
    </>
  )
})
