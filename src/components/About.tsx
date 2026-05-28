import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import teamImg from '../assets/mosko/team.png'
import logoIcon from '../assets/mosko/logo-icon.png'

const ABOUT_IMAGE = teamImg

export default function About() {
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

  return (
    <section id="about" ref={sectionRef} className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="reveal-item reveal relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={ABOUT_IMAGE}
                alt="Mosko Wood craftsman at work"
                className="w-full h-full object-cover"
                loading="lazy"
                width={900}
                height={1125}
              />
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 end-6 bg-charcoal text-white px-6 py-5 text-center">
              <p className="text-4xl font-heading font-bold leading-none">400+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider mt-1">
                {t('about.yearsLabel')}
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-item reveal flex flex-col gap-6" style={{ transitionDelay: '150ms' }}>
            <img src={logoIcon} alt="" aria-hidden="true" className="w-14 h-14 object-contain opacity-80 dark:invert" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-rust">
              {t('about.badge')}
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-heading font-bold text-charcoal uppercase leading-tight m-0">
              {t('about.title')}
            </h2>
            <p className="text-charcoal/70 text-base leading-relaxed">
              {t('about.body1')}
            </p>
            <p className="text-charcoal/70 text-base leading-relaxed">
              {t('about.body2')}
            </p>
            <a
              href="#portfolio"
              className="self-start flex items-center gap-2 bg-rust text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 hover:bg-rust-dark transition-colors duration-200 mt-2"
            >
              {t('about.cta')}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
