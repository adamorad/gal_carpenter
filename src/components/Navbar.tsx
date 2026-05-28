import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import logoIcon from '../assets/mosko/logo-icon.png'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    const next = i18n.language === 'he' ? 'en' : 'he'
    i18n.changeLanguage(next)
  }

  const links = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.portfolio', href: '#portfolio' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 select-none"
          aria-label="Mosko Wood — home"
        >
          <img src={logoIcon} alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
          <span className="text-charcoal font-heading font-bold text-xl tracking-widest uppercase">
            MOSKO <span className="text-wood">WOOD</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((l) => (
            <a key={l.key} href={l.href} className="nav-link">
              {t(l.key)}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs font-semibold tracking-wider uppercase text-charcoal hover:text-rust transition-colors duration-200 cursor-pointer select-none"
          >
            {i18n.language === 'he' ? 'EN' : 'עב'}
          </button>
          <a
            href="#contact"
            className="bg-rust text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 hover:bg-rust-dark transition-colors duration-200 cursor-pointer"
          >
            {t('nav.cta')}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs font-semibold tracking-wider uppercase text-charcoal cursor-pointer"
          >
            {i18n.language === 'he' ? 'EN' : 'עב'}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-2 text-charcoal cursor-pointer"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-cream-dark px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {t(l.key)}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-rust text-white text-center text-xs font-semibold uppercase tracking-widest px-5 py-3 mt-2"
          >
            {t('nav.cta')}
          </a>
        </div>
      )}
    </header>
  )
}
