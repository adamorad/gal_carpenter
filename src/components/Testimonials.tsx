import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

export default function Testimonials() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const items = section.querySelectorAll<HTMLElement>('.reveal-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const items = t('testimonials.items', { returnObjects: true }) as {
    name: string
    location: string
    text: string
    rating: number
  }[]

  return (
    <section id="testimonials" ref={sectionRef} className="bg-charcoal py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 reveal-item reveal text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-wood-light">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-heading font-bold text-white uppercase mt-2 leading-tight">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="reveal-item reveal bg-charcoal-light border border-white/10 p-8 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <div className="text-yellow-400 text-base tracking-wide" aria-label={`${item.rating} stars`}>
                {'★'.repeat(item.rating)}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-base leading-relaxed flex-1">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
