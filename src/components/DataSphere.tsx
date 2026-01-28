import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface DataSphereProps {
  className?: string
  size?: number
  particleCount?: number
  rotationSpeed?: number
}

export function DataSphere({ 
  className = '', 
  size = 400,
  particleCount = 200,
  rotationSpeed = 0.0006
}: DataSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const rotationRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const scrollRef = useRef({ scale: 1, opacity: 1 })
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      // Progress from 0 to 1 over the first viewport height
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1)
      setScrollProgress(progress)
      
      // Scale grows from 1 to 2
      scrollRef.current.scale = 1 + progress * 1
      // Opacity fades from 1 to 0
      scrollRef.current.opacity = 1 - progress
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)
    
    // Generate sphere points using Fibonacci sphere distribution
    const points: { x: number; y: number; z: number; size: number; alpha: number }[] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const radius = size * 0.35
    
    for (let i = 0; i < particleCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount)
      
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5
      })
    }
    
    // Generate globe wireframe - Meridians (longitude lines)
    const meridianCount = 12
    const meridianPoints = 60
    const meridians: { x: number; y: number; z: number }[][] = []
    
    for (let m = 0; m < meridianCount; m++) {
      const meridian: { x: number; y: number; z: number }[] = []
      const longitude = (m / meridianCount) * Math.PI * 2
      
      for (let i = 0; i <= meridianPoints; i++) {
        const latitude = (i / meridianPoints) * Math.PI - Math.PI / 2
        meridian.push({
          x: radius * Math.cos(latitude) * Math.cos(longitude),
          y: radius * Math.sin(latitude),
          z: radius * Math.cos(latitude) * Math.sin(longitude)
        })
      }
      meridians.push(meridian)
    }
    
    // Generate globe wireframe - Parallels (latitude lines)
    const parallelCount = 8
    const parallelPoints = 60
    const parallels: { x: number; y: number; z: number }[][] = []
    
    for (let p = 1; p < parallelCount; p++) {
      const parallel: { x: number; y: number; z: number }[] = []
      const latitude = (p / parallelCount) * Math.PI - Math.PI / 2
      const parallelRadius = radius * Math.cos(latitude)
      
      for (let i = 0; i <= parallelPoints; i++) {
        const longitude = (i / parallelPoints) * Math.PI * 2
        parallel.push({
          x: parallelRadius * Math.cos(longitude),
          y: radius * Math.sin(latitude),
          z: parallelRadius * Math.sin(longitude)
        })
      }
      parallels.push(parallel)
    }
    
    // Add connection lines between nearby points
    const connections: { from: number; to: number }[] = []
    const maxDist = radius * 0.5
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        const dz = points[i].z - points[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (dist < maxDist && connections.length < 300) {
          connections.push({ from: i, to: j })
        }
      }
    }
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = (e.clientX - rect.left - rect.width / 2) / rect.width
      mouseRef.current.targetY = (e.clientY - rect.top - rect.height / 2) / rect.height
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Rotation matrices
    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos
      }
    }
    
    const rotateY = (point: { x: number; y: number; z: number }, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos
      }
    }
    
    // Helper function to transform and project a point
    const transformPoint = (point: { x: number; y: number; z: number }) => {
      let p = rotateY(point, rotationRef.current.y)
      p = rotateX(p, rotationRef.current.x)
      
      const scale = 300 / (300 + p.z)
      const screenX = size / 2 + p.x * scale
      const screenY = size / 2 + p.y * scale
      
      return { screenX, screenY, z: p.z, scale }
    }
    
    // Draw a wireframe line with depth-based visibility
    const drawWireframeLine = (
      linePoints: { x: number; y: number; z: number }[],
      baseOpacity: number = 0.3,
      globalOpacity: number = 1
    ) => {
      const transformed = linePoints.map(transformPoint)
      
      ctx.beginPath()
      for (let i = 0; i < transformed.length - 1; i++) {
        const from = transformed[i]
        const to = transformed[i + 1]
        
        // Calculate opacity based on depth (fade back-facing lines)
        const avgZ = (from.z + to.z) / 2
        const depthFactor = (avgZ / radius + 1) / 2
        const opacity = baseOpacity * (0.15 + depthFactor * 0.85) * globalOpacity
        
        // Only draw if facing front (z > -radius * 0.3)
        if (avgZ > -radius * 0.6) {
          ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`
          ctx.lineWidth = 0.8 + depthFactor * 0.5
          ctx.beginPath()
          ctx.moveTo(from.screenX, from.screenY)
          ctx.lineTo(to.screenX, to.screenY)
          ctx.stroke()
        }
      }
    }
    
    // Animation loop
    const render = () => {
      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05
      
      // Update rotation
      rotationRef.current.y += rotationSpeed + mouseRef.current.x * 0.01
      rotationRef.current.x = mouseRef.current.y * 0.5
      
      // Get scroll-based opacity
      const globalOpacity = scrollRef.current.opacity
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size)
      
      // Draw globe wireframe - Meridians
      meridians.forEach(meridian => {
        drawWireframeLine(meridian, 0.35, globalOpacity)
      })
      
      // Draw globe wireframe - Parallels
      parallels.forEach(parallel => {
        drawWireframeLine(parallel, 0.35, globalOpacity)
      })
      
      // Transform and sort points by z for depth ordering
      const transformedPoints = points.map((point, i) => {
        let p = rotateY(point, rotationRef.current.y)
        p = rotateX(p, rotationRef.current.x)
        
        // Simple perspective projection
        const scale = 300 / (300 + p.z)
        const screenX = size / 2 + p.x * scale
        const screenY = size / 2 + p.y * scale
        
        return {
          ...point,
          screenX,
          screenY,
          z: p.z,
          scale,
          index: i
        }
      })
      
      // Sort by z-depth (furthest first)
      transformedPoints.sort((a, b) => a.z - b.z)
      
      // Draw connections first (behind points)
      ctx.strokeStyle = 'rgba(65, 105, 225, 0.1)'
      ctx.lineWidth = 0.5
      
      connections.forEach(conn => {
        const from = transformedPoints.find(p => p.index === conn.from)!
        const to = transformedPoints.find(p => p.index === conn.to)!
        
        // Calculate opacity based on depth
        const avgZ = (from.z + to.z) / 2
        const opacity = (0.05 + (avgZ / radius + 1) * 0.1) * globalOpacity
        
        ctx.beginPath()
        ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`
        ctx.moveTo(from.screenX, from.screenY)
        ctx.lineTo(to.screenX, to.screenY)
        ctx.stroke()
      })
      
      // Draw points
      transformedPoints.forEach(point => {
        const depthFactor = (point.z / radius + 1) / 2
        const alpha = (0.3 + depthFactor * 0.7) * globalOpacity
        const pointSize = point.size * point.scale * (0.5 + depthFactor * 0.5)
        
        // Glow
        const gradient = ctx.createRadialGradient(
          point.screenX, point.screenY, 0,
          point.screenX, point.screenY, pointSize * 3
        )
        gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha * 0.8})`)
        gradient.addColorStop(0.5, `rgba(65, 105, 225, ${alpha * 0.3})`)
        gradient.addColorStop(1, 'rgba(65, 105, 225, 0)')
        
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(point.screenX, point.screenY, pointSize * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Core point
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.arc(point.screenX, point.screenY, pointSize, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, particleCount, rotationSpeed])
  
  // Calculate transform based on scroll
  const scale = 1 + scrollProgress * 1
  const containerOpacity = 1 - scrollProgress
  
  return (
    <motion.div 
      ref={containerRef}
      className={`data-sphere-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity: containerOpacity,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          className="mx-auto"
        />
      </div>
    </motion.div>
  )
}

// Marquee component for infinite scrolling text
interface MarqueeProps {
  children: string
  speed?: number
  className?: string
}

export function Marquee({ children, speed = 30, className = '' }: MarqueeProps) {
  return (
    <div className={`marquee-container ${className}`}>
      <div 
        className="marquee-content"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="marquee-text">{children}</span>
        <span className="marquee-text ml-8">{children}</span>
      </div>
    </div>
  )
}

// HUD-style floating stat
interface HudStatProps {
  value: string
  label: string
  delay?: number
  className?: string
}

export function HudStat({ value, label, delay = 0, className = '' }: HudStatProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Decorative corner brackets */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#4169E1]/30" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#4169E1]/30" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#4169E1]/30" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#4169E1]/30" />
      
      <div className="px-6 py-4 bg-[rgba(230,85,0,0.05)] backdrop-blur-sm border border-[#4169E1]/20 rounded">
        <div className="hud-number">{value}</div>
        <div className="hud-label">{label}</div>
      </div>
    </motion.div>
  )
}
