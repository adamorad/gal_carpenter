import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { Sofa, ChefHat, DoorOpen, Layers } from 'lucide-react'

const ICONS = [Sofa, ChefHat, DoorOpen, Layers]

export default function Services() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const items = section.querySelectorAll<HTMLElement>('.reveal-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const items = t('services.items', { returnObjects: true }) as {
    title: string
    desc: string
  }[]

  return (
    <section id="services" ref={sectionRef} className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 reveal-item reveal">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-rust">
            {t('services.badge')}
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-heading font-bold text-charcoal uppercase mt-2 mb-4 leading-tight">
            {t('services.title')}
          </h2>
          <p className="text-charcoal/60 max-w-xl text-base leading-relaxed">
            {t('services.sub')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={i}
                className="reveal-item reveal group bg-white border border-cream-dark p-8 hover:bg-charcoal transition-colors duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-6">
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-wood group-hover:text-wood-light transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold text-charcoal group-hover:text-white uppercase tracking-wide mb-3 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-300">
                  {item.desc}
                </p>
                <div className="mt-6 h-px w-8 bg-rust group-hover:w-full transition-all duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
