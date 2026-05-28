import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

import workshopImg from '../assets/mosko/workshop.png'

const HERO_IMAGE = workshopImg

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="home" className="bg-cream overflow-hidden">
      {/* Upper content area */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left: badge + big headline */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-wood border border-wood px-3 py-1 mb-6"
            >
              {t('hero.badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(3rem,10vw,7.5rem)] font-heading font-bold leading-[0.9] tracking-tight text-charcoal uppercase m-0"
            >
              {t('hero.line1')}
              <br />
              {t('hero.line2')}
            </motion.h1>
          </div>

          {/* Right: subtext + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:max-w-xs flex flex-col gap-5 pb-2"
          >
            <p className="text-charcoal/70 text-base leading-relaxed">
              {t('hero.sub')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#portfolio"
                className="bg-rust text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 hover:bg-rust-dark transition-colors duration-200"
              >
                {t('hero.cta')}
              </a>
              <a
                href="#contact"
                className="border border-charcoal text-charcoal text-xs font-semibold uppercase tracking-widest px-6 py-3 hover:bg-charcoal hover:text-cream transition-colors duration-200"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-2 mt-10 text-charcoal/50"
        >
          <ArrowDown size={14} />
          <span className="text-xs tracking-[0.2em] uppercase font-medium">
            {t('hero.scrollHint')}
          </span>
        </motion.div>
      </div>

      {/* Full-bleed hero image */}
      <div className="relative w-full h-[55vw] min-h-[320px] max-h-[680px]">
        <motion.img
          src={HERO_IMAGE}
          alt="Mosko Wood — custom wood furniture in a modern living room"
          className="w-full h-full object-cover"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          width={1600}
          height={900}
        />

        {/* Floating trust card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-6 end-6 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-lg max-w-[200px]"
        >
          <p className="text-[11px] text-charcoal/70 leading-snug">
            {t('hero.trust')}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-400 text-xs">★★★★★</span>
            <span className="text-xs font-bold text-charcoal">{t('hero.rating')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
