import { motion } from 'framer-motion'

interface StencilTextProps {
  children: string
  className?: string
  gradient?: boolean
  delay?: number
}

/**
 * Stencil Text Component - Locomotive/ToyFight inspired
 * Creates outlined text effect with optional gradient fill
 */
export function StencilText({ 
  children, 
  className = '', 
  gradient = false,
  delay = 0 
}: StencilTextProps) {
  return (
    <motion.span
      className={`${gradient ? 'heading-stencil-gradient' : 'heading-stencil'} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay,
        ease: [0.19, 1, 0.22, 1] 
      }}
    >
      {children}
    </motion.span>
  )
}

interface LargeNumberProps {
  number: string
  label?: string
  className?: string
  animated?: boolean
}

/**
 * Large decorative number - for stats, indices, etc.
 */
export function LargeNumber({ 
  number, 
  label, 
  className = '',
  animated = true 
}: LargeNumberProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      whileInView={animated ? { opacity: 1, scale: 1 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="font-mono font-bold text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white/5 to-white/[0.02] select-none">
        {number}
      </div>
      {label && (
        <div className="absolute bottom-0 right-0 text-xs md:text-sm font-mono text-[#666] uppercase tracking-[0.2em]">
          {label}
        </div>
      )}
    </motion.div>
  )
}

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Split text animation - reveals character by character
 */
export function SplitText({ 
  children, 
  className = '',
  delay = 0,
  stagger = 0.03
}: SplitTextProps) {
  const characters = children.split('')
  
  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + (i * stagger),
            ease: [0.19, 1, 0.22, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

interface HighlightTextProps {
  children: string
  highlightColor?: string
  className?: string
}

/**
 * Text with animated underline highlight
 */
export function HighlightText({ 
  children, 
  highlightColor = '#4169E1',
  className = '' 
}: HighlightTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ backgroundColor: highlightColor }}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      />
    </span>
  )
}

interface GlitchTextProps {
  children: string
  className?: string
  trigger?: boolean
}

/**
 * Glitch text effect - use sparingly for impact
 */
export function GlitchText({ 
  children, 
  className = '',
  trigger = false 
}: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className={trigger ? 'text-glitch' : ''}>{children}</span>
    </span>
  )
}

