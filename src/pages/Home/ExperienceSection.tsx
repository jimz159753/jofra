import { memo, useRef, useState, useCallback, useEffect } from 'react'
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
      { from: 'client', text: 'Hola Jofra, llevo meses con mucho estrés del trabajo. ¿Crees que el sound healing me puede ayudar?', time: '10:14' },
      { from: 'jofra', text: '¡Hola María! Totalmente. Las vibraciones de los cuencos actúan directo sobre el sistema nervioso y liberan esa tensión acumulada 🎵 ¿Te animas a probar una sesión?', time: '10:16', read: true },
      { from: 'client', text: 'La sesión fue una de las experiencias más profundas de mi vida. El sonido de los cuencos me llevó a un estado de paz que nunca había sentido. ¡Mil gracias! ✨', time: '10:58' },
    ],
  },
  {
    name: 'Carlos M.', avatarLetter: 'C', avatarColor: '#8a7b9e', lastSeen: 'última vez hoy a las 11:30',
    messages: [
      { from: 'client', text: 'Tengo ansiedad crónica desde hace tiempo. ¿Realmente funciona el breathwork para eso?', time: '11:02' },
      { from: 'jofra', text: 'Carlos, comprendo perfectamente. El breathwork activa el sistema nervioso parasimpático y disuelve la ansiedad desde la raíz 🌬️ Muchos clientes ven cambios desde la primera sesión.', time: '11:05', read: true },
      { from: 'client', text: 'Llegué con ansiedad y salí sintiéndome como nuevo. La combinación de respiración y sonido es simplemente mágica. Ya reservé mi siguiente sesión 🙌', time: '11:48' },
    ],
  },
  {
    name: 'Laura P.', avatarLetter: 'L', avatarColor: '#9e8a7b', lastSeen: 'en línea',
    messages: [
      { from: 'client', text: 'Nunca he meditado antes y me da un poco de miedo... ¿está bien ir sin experiencia?', time: '16:20' },
      { from: 'jofra', text: '¡Claro que sí Laura! No se necesita ninguna experiencia previa. Solo llegas, te recuestas y dejas que el sonido haga su trabajo 🌿 Yo te guío en todo momento.', time: '16:23', read: true },
      { from: 'client', text: 'Jofra crea un espacio de total confianza y seguridad. Su presencia es sanadora en sí misma. La terapia cambió mi relación con mi propio cuerpo 💛', time: '17:10' },
    ],
  },
  {
    name: 'Sofía R.', avatarLetter: 'S', avatarColor: '#9e7b8a', lastSeen: 'última vez ayer',
    messages: [
      { from: 'client', text: 'Oye Jofra, ¿tienes disponibilidad esta semana? Me recomendaron muchísimo tus sesiones.', time: '09:30' },
      { from: 'jofra', text: '¡Hola Sofía! Sí tengo espacios. ¿Qué buscas trabajar? Podemos elegir entre sound healing, breathwork o la sesión fusión 🌀', time: '09:33', read: true },
      { from: 'client', text: 'Salí completamente renovada. Nunca pensé que el sonido pudiera mover tantas cosas dentro de mí. Fue una experiencia transformadora de verdad 🌸', time: '19:45' },
    ],
  },
  {
    name: 'Andrés V.', avatarLetter: 'A', avatarColor: '#7b8a9e', lastSeen: 'en línea',
    messages: [
      { from: 'client', text: 'Jofra, fui muy escéptico al principio pero mi pareja me convenció. ¿Vale la pena intentarlo?', time: '14:05' },
      { from: 'jofra', text: 'Entiendo el escepticismo, Andrés 😊 Solo te pido que llegues con mente abierta. El cuerpo responde aunque la mente dude. Muchos escépticos son ahora mis clientes más fieles.', time: '14:09', read: true },
      { from: 'client', text: 'Tienes razón. Fue increíble. Me quedé dormido durante la sesión y desperté llorando de alivio. No sé cómo explicarlo pero algo se soltó dentro de mí 🙏', time: '18:22' },
    ],
  },
  {
    name: 'Valeria T.', avatarLetter: 'V', avatarColor: '#8a9e7b', lastSeen: 'última vez hoy a las 08:15',
    messages: [
      { from: 'client', text: '¿Se puede hacer breathwork si tengo problemas de ansiedad severa? No quiero que me afecte.', time: '08:10' },
      { from: 'jofra', text: 'Valeria, siempre adapto las técnicas a cada persona. Con ansiedad severa usamos respiraciones suaves y progresivas. Tu seguridad es lo primero 💙 ¿Conversamos antes de la sesión?', time: '08:14', read: true },
      { from: 'client', text: 'Gracias por la charla previa, me dio mucha confianza. La sesión fue gentil y profunda. Por primera vez en meses pude soltar la tensión del cuerpo completamente ✨', time: '21:03' },
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

/* ── Carousel (auto-play, drag, edge fade, no controls) ─ */
const Carousel = memo(function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const total = CONVERSATIONS.length

  const scrollToIdx = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (card) {
      const offset = card.offsetLeft - (track.parentElement!.clientWidth - card.offsetWidth) / 2
      track.parentElement!.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' })
    }
  }, [])

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, total - 1))
    setCurrent(clamped)
    scrollToIdx(clamped)
  }, [total, scrollToIdx])

  /* Auto-play every 4 s, pause on hover */
  useEffect(() => {
    if (isHovered) return
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % total
        scrollToIdx(next)
        return next
      })
    }, 4000)
    return () => clearInterval(id)
  }, [isHovered, total, scrollToIdx])

  /* Drag to scroll */
  const dragStart = useRef(0)
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    const delta = dragStart.current - e.clientX
    if (Math.abs(delta) > 40) goTo(delta > 0 ? current + 1 : current - 1)
  }

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.carouselViewport}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className={styles.carouselTrack} ref={trackRef}>
          {CONVERSATIONS.map((convo, i) => (
            <div
              key={convo.name}
              className={[styles.carouselSlide, i === current ? styles.slideActive : ''].filter(Boolean).join(' ')}
            >
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
