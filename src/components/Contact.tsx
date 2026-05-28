import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const PHONE_DOR = '972546214485'
const EMAIL = 'MOSKOWOOD1@GMAIL.COM'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const text = encodeURIComponent(
      `Hi, I'm ${form.name}!\n\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`
    )
    const waUrl = `https://api.whatsapp.com/send?phone=${PHONE_DOR}&text=${text}`

    setTimeout(() => {
      setStatus('sent')
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }, 600)
  }

  return (
    <section id="contact" className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: form */}
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-rust">
              {t('contact.badge')}
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-heading font-bold text-charcoal uppercase mt-2 mb-2 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-charcoal/60 text-base mb-8 leading-relaxed">
              {t('contact.sub')}
            </p>

            {status === 'sent' ? (
              <div className="bg-charcoal text-white p-8 text-center">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-heading font-bold uppercase tracking-wide">
                  {t('contact.sent')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="sr-only">{t('contact.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={`${t('contact.name')} *`}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-cream-dark px-4 py-3 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">{t('contact.phone')}</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('contact.phone')}
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-cream-dark px-4 py-3 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{t('contact.email')}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={`${t('contact.email')} *`}
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-cream-dark px-4 py-3 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={`${t('contact.message')} *`}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-cream-dark px-4 py-3 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:border-charcoal transition-colors resize-none"
                  />
                </div>
                <p className="text-charcoal/40 text-xs">{t('contact.required')}</p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-rust text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 hover:bg-rust-dark transition-colors duration-200 disabled:opacity-60 cursor-pointer"
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
          </div>

          {/* Right: contact info */}
          <div className="flex flex-col gap-8 md:pt-20">
            <a
              href={`https://api.whatsapp.com/send?phone=${PHONE_DOR}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <div className="bg-charcoal p-3 shrink-0 group-hover:bg-rust transition-colors duration-200">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="font-semibold text-charcoal group-hover:text-rust transition-colors duration-200">
                  {t('contact.whatsapp')}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="bg-charcoal p-3 shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                  {t('contact.callUs')}
                </p>
                <a href="tel:+972546214485" className="block font-semibold text-charcoal hover:text-rust transition-colors duration-200">
                  דור: 054-621-4485
                </a>
                <a href="tel:+972536668863" className="block font-semibold text-charcoal hover:text-rust transition-colors duration-200">
                  גל: 053-666-8863
                </a>
              </div>
            </div>

            <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
              <div className="bg-charcoal p-3 shrink-0 group-hover:bg-rust transition-colors duration-200">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                  {t('contact.emailUs')}
                </p>
                <p className="font-semibold text-charcoal group-hover:text-rust transition-colors duration-200 lowercase">
                  {EMAIL}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="bg-charcoal p-3 shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                  {t('contact.area')}
                </p>
              </div>
            </div>

            {/* Decorative wood grain line */}
            <div className="mt-4 h-1 bg-gradient-to-r from-wood via-wood-light to-wood rounded-full opacity-40" />
          </div>
        </div>
      </div>
    </section>
  )
}
