import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Icons - Responsive sizes via className
const CodeChipIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-[#4169E1]">
    <rect x="12" y="12" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 18H12M8 24H12M8 30H12M36 18H40M36 24H40M36 30H40M18 8V12M24 8V12M30 8V12M18 36V40M24 36V40M30 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 20L17 24L20 28M28 20L31 24L28 28M22 28L26 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const NetworkIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-[#A0A0A0]">
    <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 16V18M24 30V32M20 22L14 34M28 22L34 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export function ValueProposition() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  // Split screen magnetization animation - reduced on mobile for better performance
  const leftX = useTransform(scrollYProgress, [0.2, 0.5], [-30, 0])
  const rightX = useTransform(scrollYProgress, [0.2, 0.5], [30, 0])
  const lineWidth = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '100%'])

  const taulerCapabilities = t('valueProposition.tauler.capabilities', { returnObjects: true }) as string[]
  const partnerCapabilities = t('valueProposition.partner.capabilities', { returnObjects: true }) as string[]
  
  return (
    <section 
      id="propuesta" 
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Content container */}
      <div className="relative flex items-center overflow-hidden">
        
        {/* Background split */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 split-left" />
          <div className="w-1/2 split-right" />
        </div>
        
        {/* Center vertical line - Hidden on mobile, only show on md+ when 2-column layout */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10 hidden md:block">
          <motion.div 
            className="w-full h-full bg-gradient-to-b from-transparent via-[#4169E1] to-transparent"
            style={{ scaleY: lineWidth, opacity: 0.5 }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="container-custom">
            
            {/* Section header - above the split */}
            <motion.div
              className="text-center mb-8 sm:mb-10 md:mb-16 px-2 sm:px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="eyebrow mb-3 sm:mb-4 md:mb-6 block text-[0.6rem] sm:text-[0.65rem]">{t('valueProposition.eyebrow')}</span>
              <h1 className="heading-display text-[clamp(1.5rem,4.5vw,3.75rem)] max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-6">
                {t('valueProposition.title')} <span className="text-[#4169E1]">{t('valueProposition.titleHighlight')}</span>
              </h1>
              <h2 className="text-[clamp(0.875rem,2.5vw,1.875rem)] text-[#888] font-light max-w-3xl mx-auto">
                {t('valueProposition.subtitle')} <span className="text-white">{t('valueProposition.subtitleHighlight1')}</span> {t('valueProposition.subtitleConnector')} <span className="text-white">{t('valueProposition.subtitleHighlight2')}</span>.
              </h2>
            </motion.div>
            
            {/* Split content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 md:gap-0 items-start md:items-center relative">
              
              {/* Left: Tauler Group */}
              <motion.div 
                className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-12"
                style={{ x: leftX }}
              >
                <div className="max-w-md mx-auto md:ml-auto md:mr-6 lg:mr-8">
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <CodeChipIcon />
                  </div>
                  
                  <motion.div
                    className="mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[0.6rem] sm:text-[0.65rem] md:text-xs font-sans text-[#666] uppercase tracking-[0.12em] font-semibold">{t('valueProposition.tauler.label')}</span>
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold mb-1 text-white tracking-tight">
                    {t('valueProposition.tauler.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4169E1] font-medium mb-5 sm:mb-6 md:mb-8">
                    {t('valueProposition.tauler.subtitle')}
                  </p>
                  
                  <ul className="bullet-orange space-y-3">
                    {taulerCapabilities.map((item, i) => (
                      <motion.li 
                        key={i}
                        className="text-[#999] leading-relaxed text-[0.8rem] sm:text-[0.875rem]"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              {/* Right: Socio Industrial */}
              <motion.div 
                className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-12 border-t border-[rgba(255,255,255,0.05)] md:border-t-0"
                style={{ x: rightX }}
              >
                <div className="max-w-md mx-auto md:mr-auto md:ml-6 lg:ml-8">
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <NetworkIcon />
                  </div>
                  
                  <motion.div
                    className="mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[0.6rem] sm:text-[0.65rem] md:text-xs font-sans text-[#666] uppercase tracking-[0.12em] font-semibold">{t('valueProposition.partner.label')}</span>
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold mb-1 text-white tracking-tight">
                    {t('valueProposition.partner.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#777] font-medium mb-5 sm:mb-6 md:mb-8">
                    {t('valueProposition.partner.subtitle')}
                  </p>
                  
                  <ul className="bullet-orange space-y-3">
                    {partnerCapabilities.map((item, i) => (
                      <motion.li 
                        key={i}
                        className="text-[#999] leading-relaxed text-[0.8rem] sm:text-[0.875rem]"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Bottom quote - Enhanced with decorative elements */}
            <motion.div
              className="text-center mt-10 sm:mt-14 md:mt-20 relative px-2 sm:px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {/* Decorative quote marks */}
              <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl text-[#4169E1] opacity-10 font-serif leading-none">"</div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#666] max-w-2xl mx-auto italic leading-relaxed relative z-10">
                {t('valueProposition.quote')}{' '}
                <span className="text-white font-medium">{t('valueProposition.quoteHighlight1')}</span>
                {' '}{t('valueProposition.quoteConnector')}{' '}
                <span className="text-white font-medium">{t('valueProposition.quoteHighlight2')}</span>.
              </p>
              
              {/* Attribution line */}
              <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-2 sm:gap-3">
                <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#4169E1]" />
                <span className="text-[10px] sm:text-xs font-mono text-[#444] uppercase tracking-[0.15em] sm:tracking-[0.2em]">{t('valueProposition.quoteAttribution')}</span>
                <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#4169E1]" />
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
