import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SplineDropdown } from '../SplineDropdown'
import { MagneticButton, MagneticOutlineButton } from '../MagneticButton'
import { MaskRevealText, FadeUp } from '../KineticText'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pt-20 sm:pt-22 md:pt-24 pb-6 overflow-visible"
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none hidden sm:block">
        <div className="absolute left-[15%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[85%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-white" />
      </div>

      {/* 3D Spline - Mobile: background decoration */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-[1] md:hidden pointer-events-none"
      >
        <div 
          className="opacity-20 scale-[0.6]"
          style={{ width: '512px', height: '512px' }}
        >
          <SplineDropdown 
            sceneUrl="/3_d_dropdown.spline"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 3D Spline - Desktop: interactive */}
      <div 
        className="hidden md:block absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[20] origin-right md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100"
        style={{
          width: '512px',
          height: '512px',
        }}
      >
        <SplineDropdown 
          sceneUrl="/3_d_dropdown.spline"
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 flex-1 flex items-center py-4 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center w-full">
          
          {/* Left: Text Content */}
          <motion.div 
            className="col-span-1 md:col-span-7 lg:col-span-7 xl:col-span-6 max-w-4xl relative z-10 pointer-events-auto"
            style={{ y: textY, opacity }}
          >
            {/* Eyebrow */}
            <motion.div
              className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            >
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-[#E65500] to-transparent" />
              <span className="eyebrow tracking-[0.15em] sm:tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem]">Venture Builder AI-First</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-display text-[clamp(1.75rem,5vw,4.25rem)] mb-4 sm:mb-5 md:mb-6 text-left leading-[1.05] tracking-[-0.04em]">
              <span className="block">
                <MaskRevealText delay={0.2}>Convertimos</MaskRevealText>
              </span>
              <span className="block">
                <MaskRevealText delay={0.3}>oportunidades</MaskRevealText>
              </span>
              <span className="block">
                <span className="text-white">en </span>
                <motion.span 
                  className="inline-block relative"
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span 
                    className="relative z-10 bg-gradient-to-r from-[#4169E1] via-[#E65500] to-[#6495ED] bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    activos digitales
                  </span>
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#4169E1] via-[#E65500] to-transparent opacity-40" />
                </motion.span>
              </span>
              <span className="block">
                <MaskRevealText delay={0.7}>rentables.</MaskRevealText>
              </span>
            </h1>

            {/* Subtitle */}
            <FadeUp delay={0.8}>
              <div className="border-l-2 border-[#4169E1] pl-3 sm:pl-4 md:pl-5 mb-5 sm:mb-6 md:mb-8 max-w-[560px]">
                <p className="text-[0.8rem] sm:text-sm md:text-base text-[#999] leading-[1.6] font-light">
                  Operativizamos oportunidades de mercado mediante{' '}
                  <span className="text-white font-medium">ingeniería de software</span> e{' '}
                  <span className="text-white font-medium">IA de alto rendimiento</span>.
                </p>
              </div>
            </FadeUp>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <MagneticButton href="#propuesta" strength={0.4}>
                <span className="btn-primary inline-block w-full sm:w-auto text-center">
                  Explorar modelo
                </span>
              </MagneticButton>
              <MagneticOutlineButton href="#contacto">
                <span className="btn-outline inline-block w-full sm:w-auto text-center">
                  Iniciar proyecto
                </span>
              </MagneticOutlineButton>
            </motion.div>

          </motion.div>

          {/* Right: Empty space for 3D element */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5 xl:col-span-6" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ opacity }}
      >
        <a 
          href="#propuesta" 
          className="group flex flex-col items-center gap-1 sm:gap-1.5"
          aria-label="Scroll hacia abajo"
        >
          <span className="text-[9px] sm:text-[10px] font-mono text-[#555] uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-[#333] flex items-start justify-center pt-1 sm:pt-1.5"
            animate={{ borderColor: ['#333', '#4169E1', '#333'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-0.5 h-1 sm:h-1.5 bg-[#4169E1] rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
