import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'

import home1Img from '../assets/mosko/home-1.png'
import home2Img from '../assets/mosko/home-2.jpg'
import special1Img from '../assets/mosko/special-1.jpg'
import special2Img from '../assets/mosko/special-2.jpg'
import montessori1Img from '../assets/mosko/montessori-1.jpg'
import montessori2Img from '../assets/mosko/montessori-2.jpg'

const IMAGES = [home1Img, home2Img, special1Img, special2Img, montessori1Img, montessori2Img]

type PortfolioItem = { title: string; category: string; categoryLabel: string }
type Category = { key: string; label: string }

export default function Portfolio() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    // Re-run on every tab change so newly rendered grid items get observed
    const items = section.querySelectorAll<HTMLElement>('.reveal-item')
    items.forEach((el) => {
      const rect = el.getBoundingClientRect()
      // If already in viewport (e.g. tab switch while scrolled to section), show immediately
      if (rect.top < window.innerHeight) el.classList.add('visible')
    })
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
  }, [activeTab])

  const categories = t('portfolio.categories', { returnObjects: true }) as Category[]
  const allItems = t('portfolio.items', { returnObjects: true }) as PortfolioItem[]

  const displayItems = (activeTab === 'all' ? allItems : allItems.filter(item => item.category === activeTab))
    .map(item => ({ item, i: allItems.indexOf(item) }))

  return (
    <section id="portfolio" ref={sectionRef} className="bg-cream-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal-item reveal">
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

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10 reveal-item reveal">
          {[{ key: 'all', label: t('portfolio.all') } as Category, ...categories].map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors duration-200 cursor-pointer ${
                activeTab === cat.key
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'border-charcoal/30 text-charcoal hover:border-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayItems.map(({ item, i }) => (
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
              <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                  {item.categoryLabel}
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
