import { motion } from 'framer-motion'
import { FullWidthCTA } from '../MagneticButton'

export function Result() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background subtle glow - responsive sizes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-[rgba(230,85,0,0.03)] blur-[80px] sm:blur-[120px] md:blur-[150px] rounded-full" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
          
          {/* Eyebrow */}
          <motion.div
            className="mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem]">Tauler Venture Builder</span>
          </motion.div>
          
          {/* Main headline - Serif for contrast - Fluid typography */}
          <motion.h2
            className="heading-serif text-[clamp(1.5rem,4.5vw,3.75rem)] mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Ingeniería aplicada a la creación de{' '}
            <span className="text-gradient-fire">Equity.</span>
          </motion.h2>
          
          {/* Body text */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#777] leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Si su organización posee una posición de mercado dominante y busca materializar 
            activos tecnológicos de alto valor, Tauler Venture Builder proporciona la 
            infraestructura de ejecución necesaria.
          </motion.p>
          
          
        </div>
      </div>
    </section>
  )
}
