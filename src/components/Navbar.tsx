import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const navLinks = [
  { label: 'Propuesta', href: '#propuesta' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Activos', href: '#activos' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            <div className="hidden md:flex items-center gap-12">
              {/* Navigation links with index numbers */}
              <div className="flex items-center gap-10">
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

              {/* CTA Button - More refined */}
              <MagneticButton href="#contacto" strength={0.3}>
                <div className="relative group/cta overflow-hidden">
                  <span className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white bg-[#4169E1] border border-[#4169E1] transition-all duration-300 group-hover/cta:bg-[#E65500] group-hover/cta:border-[#E65500]">
                    <span>Contacto</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="relative z-10 md:hidden w-10 h-10 flex items-center justify-center"
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
                  Iniciar proyecto
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
