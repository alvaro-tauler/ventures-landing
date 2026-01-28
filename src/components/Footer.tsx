import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface FooterProps {
  onOpenPrivacy: () => void
  onOpenCookies: () => void
  onOpenLegal: () => void
}

export function Footer({ onOpenPrivacy, onOpenCookies, onOpenLegal }: FooterProps) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: t('nav.propuesta'), href: '#propuesta' },
    { label: t('nav.enfoque'), href: '#enfoque' },
    { label: t('nav.activos'), href: '#activos' },
    { label: t('nav.contacto'), href: '#contacto' },
  ]

  return (
    <footer className="bg-[#050505] border-t border-[rgba(255,255,255,0.05)] relative overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4169E1] to-transparent opacity-30" />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 left-[25%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-white" />
      </div>
      
      <div className="container-custom py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-6">
          
          {/* Logo with tagline */}
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a 
              href="#"
              className="group"
            >
              <img 
                src="/loto tauler white.png" 
                alt="Tauler Group" 
                className="h-8 w-auto object-contain opacity-40 hover:opacity-60 transition-opacity duration-300"
              />
            </a>
            <p className="text-xs font-semibold text-[#333] tracking-[0.1em] uppercase">
              {t('footer.ventureBuilder')}
            </p>
          </motion.div>
          
          {/* Links - Vertical on mobile, horizontal on desktop */}
          <motion.nav 
            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {footerLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-link text-xs font-semibold uppercase tracking-[0.15em] group relative"
              >
                <span className="text-[10px] text-[#4169E1] opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                  0{i + 1}
                </span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4169E1] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.nav>
          
          {/* Legal & Copyright */}
          <motion.div 
            className="flex flex-col md:items-end gap-3 text-xs font-mono text-[#333]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <span>© {currentYear}</span>
              <span className="text-[#222]">·</span>
              <span>Tauler Group</span>
            </div>
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button 
                onClick={onOpenPrivacy}
                className="hover:text-[#555] transition-colors text-left"
              >
                {t('footer.privacy')}
              </button>
              <span className="text-[#222]">·</span>
              <button 
                onClick={onOpenCookies}
                className="hover:text-[#555] transition-colors text-left"
              >
                {t('footer.cookies')}
              </button>
              <span className="text-[#222]">·</span>
              <button 
                onClick={onOpenLegal}
                className="hover:text-[#555] transition-colors text-left"
              >
                {t('footer.legal')}
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom decorative line */}
        <motion.div 
          className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.03)] flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-[10px] font-mono text-[#222] tracking-[0.15em] uppercase">
            {t('footer.builtWith')}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
            <span className="text-[10px] font-mono text-[#333]">{t('footer.online')}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
