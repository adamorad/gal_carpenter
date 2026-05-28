import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import chessTableImg from '../assets/mosko/chess-table.png'
import chessTableWideImg from '../assets/mosko/chess-table-wide.jpg'
import workshopImg from '../assets/mosko/workshop.png'

const IMAGES = [
  chessTableImg,
  workshopImg,
  chessTableWideImg,
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80',
]

export default function Portfolio() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const items = section.querySelectorAll<HTMLElement>('.reveal-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const items = t('portfolio.items', { returnObjects: true }) as {
    title: string
    category: string
  }[]

  return (
    <section id="portfolio" ref={sectionRef} className="bg-cream-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal-item reveal">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-rust">
              {t('portfolio.badge')}
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-heading font-bold text-charcoal uppercase mt-2 leading-tight">
              {t('portfolio.title')}
            </h2>
            <p className="text-charcoal/60 text-base mt-2">{t('portfolio.sub')}</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 self-start sm:self-end flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border border-charcoal text-charcoal px-5 py-3 hover:bg-charcoal hover:text-cream transition-colors duration-200"
          >
            {t('portfolio.viewAll')}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="reveal-item reveal group relative overflow-hidden aspect-[4/3] cursor-pointer"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={IMAGES[i]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <h3 className="text-white font-heading font-semibold text-xl uppercase">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-white/80 text-xs font-semibold uppercase tracking-wider">
                  <span>{t('portfolio.viewAll')}</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
