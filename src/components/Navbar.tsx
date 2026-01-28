import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MagneticButton } from './MagneticButton'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: t('nav.propuesta'), href: '#propuesta' },
    { label: t('nav.enfoque'), href: '#enfoque' },
    { label: t('nav.activos'), href: '#activos' },
  ]

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es'

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[rgba(5,5,5,0.9)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.03)]'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="relative z-10 group flex items-center flex-shrink-0">
              <img 
                src="/loto tauler white.png" 
                alt="Tauler Group" 
                className="h-7 sm:h-8 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {/* Navigation links with index numbers */}
              <div className="flex items-center gap-6 lg:gap-10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="relative group/link"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-mono text-[#E65500] opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
                        0{i + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#777] group-hover/link:text-white transition-all duration-300 group-hover/link:tracking-[0.2em]">
                        {link.label}
                      </span>
                    </div>
                    {/* Underline effect */}
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-[1px] bg-[#4169E1]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Language Switcher */}
              <motion.button
                onClick={toggleLanguage}
                className="relative group/lang flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] rounded-sm transition-all duration-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-3.5 h-3.5 text-[#777] group-hover/lang:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#777] group-hover/lang:text-white transition-colors">
                  {currentLang === 'es' ? 'EN' : 'ES'}
                </span>
              </motion.button>

              {/* CTA Button - More refined */}
              <MagneticButton href="#contacto" strength={0.3}>
                <div className="relative group/cta overflow-hidden">
                  <span className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white bg-[#4169E1] border border-[#4169E1] transition-all duration-300 group-hover/cta:bg-[#E65500] group-hover/cta:border-[#E65500]">
                    <span>{t('nav.contacto')}</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </MagneticButton>
            </div>

            {/* Mobile: Language + Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="relative z-10 flex items-center gap-1 px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-sm"
              >
                <svg className="w-3 h-3 text-[#777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#777]">
                  {currentLang === 'es' ? 'EN' : 'ES'}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="relative z-10 w-10 h-10 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <motion.span
                    className="w-full h-0.5 bg-white rounded-full origin-left"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? -1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-white rounded-full"
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1, scaleX: isMobileMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-white rounded-full origin-left"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="h-full flex flex-col items-center justify-center p-8">
              <nav className="flex flex-col items-center gap-8 w-full">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-4xl font-bold text-white hover:text-[#4169E1] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.a
                  href="#contacto"
                  className="mt-8 px-10 py-4 bg-[#4169E1] text-white font-bold text-lg rounded-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.iniciarProyecto')}
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
