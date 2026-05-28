import { useTranslation } from 'react-i18next'
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const PHONE = '972501234567'

// WhatsApp SVG icon (Lucide doesn't include it)
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.portfolio', href: '#portfolio' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ]

  return (
    <footer className="bg-charcoal text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#home" className="text-xl font-heading font-bold tracking-widest uppercase">
              MOSKO <span className="text-wood-light">WOOD</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 border border-white/20 text-white/60 hover:text-white hover:border-white transition-colors duration-200"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 border border-white/20 text-white/60 hover:text-white hover:border-white transition-colors duration-200"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              {t('footer.linksTitle')}
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navLinks.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                >
                  {t(l.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
              {t('footer.contactTitle')}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:+${PHONE}`}
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                +{PHONE}
              </a>
              <a
                href="mailto:info@moskowood.co.il"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                info@moskowood.co.il
              </a>
              <p className="text-white/40 text-xs mt-2">
                {t('contact.area')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {year} Mosko Wood. {t('footer.rights')}
          </p>
          <p className="text-white/20 text-xs">{t('footer.madeWith')} ♥</p>
        </div>
      </div>
    </footer>
  )
}
