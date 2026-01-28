import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll Progress Indicator - Locomotive/Awwwards style
 * Shows reading progress with smooth spring animation
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#4169E1] origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

/**
 * Scroll Percentage Display - Shows numeric progress
 */
export function ScrollPercentage() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollPercent(Math.round(progress))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-3 bg-[rgba(0,0,0,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: scrollPercent > 5 ? 1 : 0, y: scrollPercent > 5 ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="font-mono text-xs text-[#4169E1] font-bold tracking-wider">
        {scrollPercent}%
      </div>
      <div className="w-12 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#4169E1]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </motion.div>
  )
}

/**
 * Back to Top Button - Appears after scrolling
 * Positioned to avoid overlap with content on mobile
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-50 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-[#4169E1] text-white rounded-full hover:bg-[#E65500] transition-colors group shadow-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <svg 
        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  )
}

interface SectionIndicatorProps {
  sections: string[]
}

/**
 * Section Navigation Indicator - Shows current section
 * Only visible on larger screens to avoid clutter on mobile
 */
export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sectionElements.forEach((element, index) => {
        if (element) {
          const top = element.offsetTop
          const bottom = top + element.offsetHeight

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="fixed right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 lg:gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={section}
          className="group relative"
          onClick={() => {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
          }}
          whileHover={{ scale: 1.2 }}
          aria-label={`Ir a ${section}`}
        >
          <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300 ${
            activeSection === index 
              ? 'bg-[#4169E1] scale-125' 
              : 'bg-[#333] hover:bg-[#555]'
          }`} />
          
          {/* Tooltip */}
          <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-[rgba(0,0,0,0.9)] backdrop-blur-xl px-2 lg:px-3 py-1 lg:py-1.5 rounded text-[10px] lg:text-xs font-mono text-white whitespace-nowrap capitalize">
              {section}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

