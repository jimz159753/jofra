import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  sessionType: string
  message: string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone ?? '',
      session_type: data.sessionType,
      message: data.message,
    },
    PUBLIC_KEY
  )
}
