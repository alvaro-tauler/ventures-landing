import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const differentials = [
  {
    number: '01',
    title: 'Tauler Group',
    subtitle: 'Tecnología y Ejecución',
    description: 'Aportamos el stack tecnológico, la arquitectura de producto, el uso intensivo de IA para acelerar el desarrollo y la experiencia operativa gestionando activos digitales.',
    color: 'rgba(230, 85, 0, 0.8)'
  },
  {
    number: '02',
    title: 'Socio Industrial',
    subtitle: 'Mercado y Contexto',
    description: 'Aporta el conocimiento sectorial profundo, el acceso directo a clientes reales para validación y la capacidad comercial y de distribución necesaria para escalar.',
    color: 'rgba(65, 105, 225, 0.8)'
  }
]

export function Differentials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <section 
      id="diferenciales" 
      ref={containerRef}
      className="relative"
      style={{ position: 'relative' }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0])
          }}
        >
          <span className="eyebrow mb-6 block">RELACIÓN DE COMPLEMENTARIEDAD</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-hero">
            Lo que cada parte aporta
          </h2>
        </motion.div>
      </div>

      {/* Cards container */}
      <div className="relative z-20">
        {differentials.map((diff, i) => (
          <DifferentialCard
            key={diff.number}
            differential={diff}
            index={i}
            progress={scrollYProgress}
            total={differentials.length}
          />
        ))}
      </div>
    </section>
  )
}

function DifferentialCard({
  differential,
  index,
  progress,
  total
}: {
  differential: typeof differentials[0]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  total: number
}) {
  const start = index / total
  const end = (index + 1) / total

  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, index === total - 1 ? 1 : 0]
  )

  const y = useTransform(
    progress,
    [start, start + 0.1],
    [100, 0]
  )

  const scale = useTransform(
    progress,
    [start, start + 0.1],
    [0.9, 1]
  )

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        className="w-full max-w-4xl mx-auto px-6"
        style={{ opacity, y, scale }}
      >
        <article className="tech-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Large number background */}
          <div 
            className="absolute -right-8 -top-8 text-[12rem] md:text-[16rem] font-bold font-mono leading-none pointer-events-none select-none"
            style={{ color: `${differential.color}10` }}
          >
            {differential.number}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Number badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span 
                className="font-mono text-sm px-3 py-1 rounded-sm"
                style={{ 
                  background: `${differential.color}20`,
                  color: differential.color,
                  border: `1px solid ${differential.color}40`
                }}
              >
                {differential.number}
              </span>
              <div className="w-8 h-px" style={{ background: differential.color }} />
            </motion.div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-100 mb-4">
              {differential.title}
            </h3>

            {/* Subtitle */}
            <p 
              className="text-xl md:text-2xl font-medium mb-6"
              style={{ color: differential.color }}
            >
              {differential.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-60 leading-relaxed">
              {differential.description}
            </p>
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1"
            style={{ background: differential.color }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Corner glows */}
          <div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl"
            style={{ background: `${differential.color}10` }}
          />
          <div 
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl"
            style={{ background: `${differential.color}05` }}
          />
        </article>
      </motion.div>
    </div>
  )
}

