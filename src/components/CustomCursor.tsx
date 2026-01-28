import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom Cursor - ToyFight/Locomotive inspired
 * Sophisticated cursor that follows mouse with spring physics
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if hovering over interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-wrap')
      ) {
        setIsHovering(true)
        
        // Check for data-cursor-text attribute
        const cursorTextEl = target.closest('[data-cursor-text]') as HTMLElement
        if (cursorTextEl) {
          setCursorText(cursorTextEl.dataset.cursorText || '')
        }
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-wrap, [data-cursor-text]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border-2 border-white flex items-center justify-center"
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          borderWidth: isHovering ? 1 : 2,
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorText && (
          <motion.span
            className="text-white text-xs font-mono whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * Cursor Follower - Delayed cursor trail effect
 */
export function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 30, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 40)
      cursorY.set(e.clientY - 40)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9998] mix-blend-screen hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="w-full h-full rounded-full bg-[#4169E1] opacity-10 blur-2xl" />
    </motion.div>
  )
}

