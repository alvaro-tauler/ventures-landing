import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
}

export function MagneticButton({ 
  children, 
  href, 
  onClick, 
  className = '',
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`magnetic-wrap ${className}`}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} onClick={onClick}>{content}</a>
  }

  // Render as div wrapper when no href - allows wrapping other interactive elements
  // without creating invalid nested buttons
  return <div onClick={onClick} className="inline-block">{content}</div>
}

export function MagneticOutlineButton({ 
  children, 
  href, 
  onClick, 
  className = '',
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`magnetic-wrap ${className}`}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} onClick={onClick}>{content}</a>
  }

  // Render as div wrapper when no href - allows wrapping other interactive elements
  // without creating invalid nested buttons
  return <div onClick={onClick} className="inline-block">{content}</div>
}

// Full width CTA button for footer
interface FullWidthCTAProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

export function FullWidthCTA({ children, href, onClick }: FullWidthCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const content = (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Radial glow follow cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
      
      <div className="btn-full-cta relative">
        {children}
      </div>
    </motion.div>
  )

  if (href) {
    return <a href={href} onClick={onClick} className="block">{content}</a>
  }

  return <button type="button" onClick={onClick} className="w-full">{content}</button>
}
