import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

// Mask Reveal Text - Words slide up with clip
interface MaskRevealTextProps {
  children: string
  className?: string
  delay?: number
}

export function MaskRevealText({ children, className = '', delay = 0 }: MaskRevealTextProps) {
  const words = children.split(' ')
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  }
  
  const wordVariants: Variants = {
    hidden: { 
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
  
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Fade Up animation wrapper
interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeUp({ children, className = '', delay = 0, duration = 0.8 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Staggered heading with highlight words (on scroll)
interface KineticHeadingProps {
  text: string
  highlightWords?: string[]
  className?: string
  delay?: number
}

export function KineticHeading({ 
  text, 
  highlightWords = [], 
  className = '',
  delay = 0 
}: KineticHeadingProps) {
  const words = text.split(' ')
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }
  
  const wordVariants: Variants = {
    hidden: { 
      y: '120%',
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
  
  return (
    <motion.span
      className={className}
      style={{ display: 'inline', perspective: '1000px' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word.replace(/[.,!?]/g, ''))
        
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span 
              className={`inline-block ${isHighlight ? 'highlight-pill' : ''}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

// Character by character reveal
interface CharRevealProps {
  text: string
  className?: string
  delay?: number
}

export function CharReveal({ text, className = '', delay = 0 }: CharRevealProps) {
  const chars = text.split('')
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  }
  
  const charVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }
  
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {chars.map((char, i) => (
        <motion.span 
          key={i} 
          className="inline-block"
          variants={charVariants}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Split Reveal for left-to-right wipe
interface SplitRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SplitReveal({ children, className = '', delay = 0 }: SplitRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.01, delay }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
