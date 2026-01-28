import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { KineticHeading, FadeUp } from '../KineticText'

// Custom icons for each lever
const IdeationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 22V24C12 25.1046 12.8954 26 14 26H18C19.1046 26 20 25.1046 20 24V22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 22V20M18 22V20" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 4V6M8 12H6M26 12H24M9.5 6.5L11 8M22.5 6.5L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const DemandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 24L12 16L18 22L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 8H28V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="16" r="2" fill="currentColor"/>
    <circle cx="18" cy="22" r="2" fill="currentColor"/>
  </svg>
)

const DistributionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="26" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="24" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="26" cy="24" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8.5 10L13 14M18.5 14L23.5 10M13 18L8.5 22M18.5 18L23.5 22" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const OperationsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M16 16L28 10M16 16L4 10M16 16V28" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const levers = [
  {
    id: '01',
    title: 'Ideación',
    description: 'Resultado de un análisis racional del mercado.',
    icon: IdeationIcon,
    color: '#4169E1',
  },
  {
    id: '02',
    title: 'Demanda latente',
    description: 'Validación de la necesidad del producto.',
    icon: DemandIcon,
    color: '#6495ED',
  },
  {
    id: '03',
    title: 'Canal de distribución',
    description: 'Despliegue automático en una red validada.',
    icon: DistributionIcon,
    color: '#E65500',
  },
  {
    id: '04',
    title: 'Operativa de élite',
    description: 'Equipo multidisciplinar con expertise comercial, técnico y estratégico.',
    icon: OperationsIcon,
    color: '#F87171',
  },
]

export function Thesis() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  
  return (
    <section 
      id="thesis"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle background gradient - responsive sizes */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-[#4169E1]/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-[#E65500]/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]" />
      </motion.div>
      
      {/* Decorative grid lines - hidden on mobile */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none hidden sm:block">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white" />
      </div>
      
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-20 lg:mb-28 px-0 sm:px-4">
          
          {/* Eyebrow */}
          <motion.div
            className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#4169E1]" />
            <span className="eyebrow tracking-[0.15em] sm:tracking-[0.25em] text-[0.55rem] sm:text-[0.6rem]">Thesis Statement</span>
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#4169E1]" />
          </motion.div>
          
          {/* Main Title - Fluid typography */}
          <h2 className="heading-display text-[clamp(1.5rem,4vw,3.75rem)] mb-4 sm:mb-6 md:mb-8 leading-[1.1] tracking-[-0.03em]">
            <KineticHeading 
              text="Las palancas del éxito tecnológico"
              highlightWords={['palancas']}
            />
          </h2>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-[2px] mx-auto mb-10 bg-gradient-to-r from-[#4169E1] via-[#E65500] to-[#4169E1]"
            style={{ scaleX: lineScale }}
          />
          
          {/* Body Text */}
          <FadeUp delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#888] leading-[1.7] sm:leading-[1.8] max-w-3xl mx-auto px-2 sm:px-0">
              En la economía digital actual, la ventaja competitiva no reside únicamente en la idea, 
              sino en la <span className="text-white font-medium">capacidad de despliegue técnico</span> y 
              la <span className="text-white font-medium">velocidad de iteración</span>.
            </p>
          </FadeUp>
          
          {/* Catalyst statement */}
          <FadeUp delay={0.5}>
            <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 border-t border-[rgba(255,255,255,0.05)]">
              <p className="text-xs sm:text-sm md:text-base text-[#666] italic">
                <span className="text-[#4169E1] font-semibold not-italic">Tauler Group</span> actúa como catalizador, 
                aprovechando <span className="text-white">4 palancas</span> fundamentales:
              </p>
            </div>
          </FadeUp>
        </div>
        
        {/* Levers Grid - Responsive with better mobile spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-0">
          {levers.map((lever, index) => (
            <motion.div
              key={lever.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.7, 
                delay: 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Card */}
              <div className="relative h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] backdrop-blur-sm transition-all duration-500 group-hover:border-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.02)]">
                
                {/* Number badge */}
                <div 
                  className="absolute -top-2.5 sm:-top-3 left-4 sm:left-6 md:left-8 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider"
                  style={{ 
                    backgroundColor: `${lever.color}15`,
                    color: lever.color,
                    border: `1px solid ${lever.color}30`
                  }}
                >
                  {lever.id}
                </div>
                
                {/* Icon */}
                <div 
                  className="mb-4 sm:mb-5 md:mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: lever.color }}
                >
                  <lever.icon />
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 tracking-tight">
                  {lever.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed group-hover:text-[#888] transition-colors duration-300">
                  {lever.description}
                </p>
                
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${lever.color}08 0%, transparent 70%)`
                  }}
                />
              </div>
              
              {/* Connector line (except last) */}
              {index < levers.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        
      </div>
    </section>
  )
}

