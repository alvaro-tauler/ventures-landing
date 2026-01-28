import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'Validación de Tesis',
    subtitle: 'Alpha Stage',
    description: 'Análisis riguroso de la viabilidad económica y técnica. Auditamos la profundidad del mercado y la capacidad de distribución antes de comprometer recursos de ingeniería. Solo avanzan los proyectos con una ruta clara hacia el ROI.',
    metrics: ['Market Depth', 'Technical Feasibility', 'ROI Path'],
  },
  {
    number: '02',
    title: 'Ingeniería de Alta Velocidad',
    subtitle: 'Build',
    description: 'Despliegue de nuestro stack tecnológico propietario potenciado por IA. El objetivo es alcanzar la funcionalidad crítica en ciclos cortos, priorizando la robustez arquitectónica y la escalabilidad futura.',
    metrics: ['AI-Powered Stack', '4-Week Cycles', 'Scalable Architecture'],
  },
  {
    number: '03',
    title: 'Integración y Despliegue',
    subtitle: 'Deploy',
    description: 'Implantación operativa del activo en los canales de distribución. Monitorización de métricas de uso real y optimización basada en datos para asegurar la adopción y la retención.',
    metrics: ['Channel Integration', 'Real-time Metrics', 'PMF Optimization'],
  },
  {
    number: '04',
    title: 'Estructuración del Activo',
    subtitle: 'Liquidity / Scale',
    description: 'Consolidación del producto como unidad de negocio independiente. Definición de la estrategia de salida o recurrencia: Spin-off tecnológica, licencia de IP o generación de flujos de caja recurrentes.',
    metrics: ['Spin-off Ready', 'IP Licensing', 'Recurring Revenue'],
  },
]

export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })
  
  // Transform scroll Y to horizontal X movement - only on desktop
  // Title + 4 cards + end spacer all scroll together
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-58%'])
  
  return (
    <section 
      id="enfoque" 
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: 'auto' }} // Auto on mobile, controlled by CSS
    >
      {/* Mobile: Vertical stacked layout */}
      <div className="lg:hidden py-16 md:py-24">
        <div className="container-custom">
          {/* Section header for mobile */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="eyebrow mb-2 block">Execution Framework</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Sistemática de Generación de Valor.
            </h2>
          </motion.div>
          
          {/* Mobile cards - vertical stack */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <motion.article
                key={pillar.number}
                className="glass-card p-6 md:p-8 relative overflow-hidden bg-[rgba(8,8,8,0.85)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4169E1] to-transparent opacity-30" />
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">
                    <span className="text-[#4169E1]">{pillar.number}.</span> {pillar.title}
                  </h3>
                  
                  <div className="border-l-[2px] border-[#4169E1]/30 pl-4 mb-6">
                    <p className="text-[#A0A0A0] leading-relaxed text-sm md:text-[15px]">
                      {pillar.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {pillar.metrics.map((metric, j) => (
                      <span 
                        key={j}
                        className="text-[10px] md:text-[11px] font-mono text-[#666] bg-[rgba(255,255,255,0.02)] px-2 py-1.5 border border-[rgba(255,255,255,0.06)]"
                      >
                        → {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal scroll layout */}
      <div className="hidden lg:block" style={{ height: '350vh' }}>
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Horizontal scroll track */}
        <motion.div 
          ref={containerRef}
          className="flex items-center h-full gap-[3vw] pl-[4vw]"
          style={{ x }}
        >
          {/* Section title - scrolls with content */}
          <motion.div
            className="w-[min(28vw,380px)] min-w-[280px] shrink-0 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#4169E1] to-transparent" />
              <span className="eyebrow tracking-[0.25em]">Execution Framework</span>
            </div>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-[1.1] mb-6">
              Sistemática de<br/>Generación de Valor.
            </h2>
            <p className="text-[#555] text-sm font-mono mb-3">// SCROLL →</p>
            <p className="text-[#777] text-sm lg:text-base leading-relaxed">
              Un protocolo estricto diseñado para transformar tesis de inversión en software operativo.
            </p>
          </motion.div>
          
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.number}
              className="glass-card corner-brackets w-[min(28vw,450px)] h-[min(60vh,480px)] shrink-0 p-[clamp(1.5rem,2vw,2.5rem)] relative overflow-hidden group bg-[rgba(8,8,8,0.85)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Giant translucent number background - Stencil style */}
              <div className="absolute top-0 right-0 text-[14rem] font-bold leading-none text-[rgba(255,255,255,0.015)] select-none pointer-events-none font-mono tracking-tighter">
                {pillar.number}
              </div>
              
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4169E1] to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Title with number */}
                <h3 className="text-[clamp(1.25rem,2vw,2rem)] font-bold text-white mb-[clamp(0.75rem,1.5vw,1.5rem)] leading-[1.1] tracking-tight group-hover:text-gradient-fire transition-all duration-500">
                  <span className="text-[#4169E1]">{pillar.number}.</span> {pillar.title}
                </h3>
                
                {/* Description with editorial styling */}
                <div className="border-l-[2px] border-[#4169E1]/30 pl-[clamp(0.75rem,1vw,1.25rem)] mb-[clamp(1rem,2vw,2rem)] flex-1">
                  <p className="text-[#A0A0A0] leading-[1.75] text-[clamp(1rem,1.2vw,1.25rem)]">
                    {pillar.description}
                  </p>
                </div>
                
                {/* Metrics tags - Enhanced */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  {pillar.metrics.map((metric, j) => (
                    <motion.span 
                      key={j}
                      className="text-[11px] font-mono text-[#666] bg-[rgba(255,255,255,0.02)] px-3 py-2 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(230,85,0,0.3)] hover:text-[#999] transition-all duration-300 cursor-default"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      → {metric}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(230,85,0,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.article>
          ))}
          
          {/* End spacer */}
          <div className="w-[20vw] min-w-[200px] shrink-0 flex flex-col justify-center items-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4169E1] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bold text-lg">Activo Listo</p>
              <p className="text-[#555] text-sm mt-2">Para escalar o liquidez</p>
            </motion.div>
          </div>
        </motion.div>
        
          {/* Scroll progress indicator */}
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="flex items-center justify-between text-xs font-mono text-[#555]">
              <span>01</span>
              <div className="flex-1 mx-4 h-px bg-[rgba(255,255,255,0.1)] relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#4169E1]"
                  style={{ width: useTransform(scrollYProgress, (v) => `${v * 100}%`) }}
                />
              </div>
              <span>04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
