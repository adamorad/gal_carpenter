import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

export default function Stats() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible')
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stats = t('stats', { returnObjects: true }) as { value: string; label: string }[]

  return (
    <section
      ref={ref}
      className="bg-charcoal text-white reveal"
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center md:text-start ${
                i < stats.length - 1
                  ? 'md:border-e md:border-white/10 md:pe-8'
                  : ''
              }`}
            >
              <p className="text-5xl md:text-6xl font-heading font-bold text-white leading-none">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm mt-2 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
