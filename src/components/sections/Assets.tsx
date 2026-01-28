import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { KineticHeading } from '../KineticText'

const assets = [
  {
    id: 'automation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="6" />
        <path d="M16 4V8M16 24V28M28 16H24M8 16H4M24.5 7.5L21.5 10.5M10.5 21.5L7.5 24.5M24.5 24.5L21.5 21.5M10.5 10.5L7.5 7.5" strokeLinecap="round" />
      </svg>
    ),
    tag: 'AI Operations',
    title: 'AI Automation',
    description: 'Automatización de procesos mediante modelos de lenguaje e IA generativa. Reducción de costes operativos y aumento de throughput.',
  },
  {
    id: 'saas',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <path d="M4 12H28M12 12V24M8 16H10M8 19H10" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Product',
    title: 'Vertical SaaS',
    description: 'Plataformas de software especializadas para nichos industriales. Soluciones end-to-end con alta retención y unit economics sólidos.',
  },
  {
    id: 'data',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 24L12 16L18 22L28 8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="8" r="2" fill="currentColor" />
        <path d="M4 8V24H28" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Intelligence',
    title: 'Data Engines',
    description: 'Pipelines de datos y sistemas de inteligencia empresarial. Transformación de datos brutos en ventajas competitivas accionables.',
  },
  {
    id: 'process',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="10" height="10" rx="2" />
        <rect x="18" y="4" width="10" height="10" rx="2" />
        <rect x="4" y="18" width="10" height="10" rx="2" />
        <rect x="18" y="18" width="10" height="10" rx="2" />
        <path d="M14 9H18M14 23H18M9 14V18M23 14V18" strokeLinecap="round" />
      </svg>
    ),
    tag: 'IP',
    title: 'Process IP',
    description: 'Digitalización y protección de metodologías propietarias. Conversión de conocimiento tácito en propiedad intelectual escalable.',
  },
  {
    id: 'consumer',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="10" r="6" />
        <path d="M6 28C6 22.5 10.5 18 16 18C21.5 18 26 22.5 26 28" strokeLinecap="round" />
      </svg>
    ),
    tag: 'B2C',
    title: 'Consumer LTV',
    description: 'Productos digitales B2C con modelos de monetización recurrente. Maximización del valor de vida del cliente mediante personalización.',
  },
]

export function Assets() {
  const [vibrateKey, setVibrateKey] = useState(0)
  const vibrateRef = useRef<HTMLDivElement>(null)
  
  // Vibrate button every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVibrateKey(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  // Track mouse for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, cardRef: HTMLElement) => {
    const rect = cardRef.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.style.setProperty('--mouse-x', `${x}%`)
    cardRef.style.setProperty('--mouse-y', `${y}%`)
  }
  
  return (
    <section id="activos" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* Decorative background elements - Editorial grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-[20%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[40%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[60%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[80%] w-px h-full bg-white" />
      </div>
      
      {/* Gradient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[rgba(230,85,0,0.08)] to-transparent blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section header - More dramatic */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-14 md:mb-20">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-[#4169E1] to-transparent" />
                <span className="eyebrow tracking-[0.15em] sm:tracking-[0.25em] text-[0.55rem] sm:text-[0.65rem]">Asset Typology</span>
              </div>
              <h2 className="heading-display text-[clamp(1.75rem,5vw,3.75rem)] mb-4 sm:mb-6 leading-[1]">
                <KineticHeading 
                  text="Tipología de"
                  highlightWords={[]}
                />
                <br />
                <KineticHeading 
                  text="Activos Tecnológicos."
                  highlightWords={['Activos']}
                />
              </h2>
              <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-gradient-to-r from-[#4169E1] to-transparent" />
            </motion.div>

            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <p className="text-sm sm:text-base md:text-lg text-[#666] leading-[1.7] sm:leading-[1.8] border-l-2 border-[#4169E1]/30 pl-4 sm:pl-6">
                Desarrollamos soluciones diseñadas con{' '}
                <span className="text-white font-medium">lógica industrial</span> y{' '}
                <span className="text-white font-medium">financiera</span>.
              </p>
            </motion.div>
          </div>

          {/* Bento Grid - responsive with fluid min-heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {assets.map((asset, i) => (
              <motion.article
                key={asset.id}
                className="bento-card group p-5 sm:p-6 md:p-8 lg:p-10 relative min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              >
                {/* Index number - top left */}
                <div className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 text-[10px] sm:text-xs font-mono text-[#333] group-hover:text-[#4169E1] transition-colors">
                  0{i + 1}
                </div>
                
                {/* Icon - Enhanced with background */}
                <div className="mb-5 sm:mb-6 md:mb-8 relative">
                  <div className="absolute inset-0 bg-[#4169E1] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg sm:rounded-xl border border-[#4169E1]/20 bg-[rgba(230,85,0,0.05)] group-hover:border-[#4169E1]/50 group-hover:bg-[rgba(230,85,0,0.1)] transition-all duration-500">
                    <div className="text-[#4169E1] group-hover:scale-110 transition-transform duration-300 scale-75 sm:scale-90 md:scale-100">
                      {asset.icon}
                    </div>
                  </div>
                </div>

                {/* Tag */}
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <span className="badge text-[9px] sm:text-[10px] py-1 sm:py-1.5 px-2 sm:px-3">{asset.tag}</span>
                </div>

                {/* Title - More prominent */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight group-hover:text-[#4169E1] transition-colors duration-300 tracking-tight">
                  {asset.title}
                </h3>

                {/* Description with better typography */}
                <p className="text-[#777] leading-[1.6] sm:leading-[1.7] text-[13px] sm:text-[14px] flex-1 group-hover:text-[#999] transition-colors duration-300">
                  {asset.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-r-2 border-t-2 border-[#4169E1] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-tr-lg sm:rounded-tr-xl" />
              </motion.article>
            ))}

            {/* Special CTA Card - Orange - Enhanced and dramatic */}
            <motion.div
              ref={vibrateRef}
              className="bento-card-cta p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ scale: 1.02 }}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Decorative corner brackets */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-l-2 border-t-2 border-white opacity-20" />
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-r-2 border-b-2 border-white opacity-20" />
              
              <div className="relative z-10">
                {/* Icon with pulsing effect */}
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center mb-5 sm:mb-6 md:mb-8 group-hover:bg-white/30 transition-all duration-500 border border-white/10"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.1)",
                      "0 0 0 8px rgba(255,255,255,0)",
                      "0 0 0 0 rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.svg 
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </motion.svg>
                </motion.div>
                
                <div className="mb-5 sm:mb-6 md:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight">
                    Tu proyecto
                    <br />
                    <span className="relative">
                      aquí
                      <motion.div 
                        className="absolute -bottom-0.5 sm:-bottom-1 left-0 h-[2px] sm:h-[3px] bg-white"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1 }}
                      />
                    </span>
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                    Construyamos tu próximo activo digital juntos.
                  </p>
                </div>
              </div>
              
              {/* Vibrating CTA button - Enhanced */}
              <motion.div
                key={vibrateKey}
                className="relative z-10"
                animate={vibrateKey > 0 ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-7 py-3 sm:py-3.5 md:py-4 bg-black text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] sm:tracking-[0.1em] group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10 font-bold">Empecemos</span>
                  <motion.svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                  
                  {/* Shine effect on button */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
