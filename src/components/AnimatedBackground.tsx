import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  
  const springConfig = { damping: 25, stiffness: 120 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Deep black base */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      
      {/* 3D Perspective Grid */}
      <div className="grid-3d">
        <div className="grid-3d-inner" />
      </div>
      
      {/* Subtle radial vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
        }}
      />

      {/* Floating orange glow that follows mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(65, 105, 225, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: useTransform(mouseX, (v) => v - 300),
          y: useTransform(mouseY, (v) => v - 300),
        }}
      />

      {/* Static ambient glow spots */}
      <motion.div
        className="absolute top-[20%] right-[20%] w-[500px] h-[500px] rounded-full aurora-glow-orange"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(100px)' }}
      />
      
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-[400px] h-[400px] rounded-full aurora-glow-violet"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ filter: 'blur(80px)' }}
      />
    </div>
  )
}

// Need to import React for useState
import React from 'react'

// Network Visualization (kept for compatibility)
export function NetworkVisualization({ className = '' }: { className?: string }) {
  const nodes = [
    { id: 'center', x: 200, y: 150, r: 28, label: 'VB' },
    { id: 'node1', x: 80, y: 55, r: 16, label: 'AI' },
    { id: 'node2', x: 320, y: 55, r: 16, label: 'SaaS' },
    { id: 'node3', x: 360, y: 180, r: 16, label: 'MVP' },
    { id: 'node4', x: 290, y: 270, r: 16, label: 'Scale' },
    { id: 'node5', x: 110, y: 270, r: 16, label: 'Data' },
    { id: 'node6', x: 40, y: 180, r: 16, label: 'API' },
  ]

  const connections = [
    { from: 'center', to: 'node1' },
    { from: 'center', to: 'node2' },
    { from: 'center', to: 'node3' },
    { from: 'center', to: 'node4' },
    { from: 'center', to: 'node5' },
    { from: 'center', to: 'node6' },
    { from: 'node1', to: 'node2' },
    { from: 'node2', to: 'node3' },
    { from: 'node3', to: 'node4' },
    { from: 'node4', to: 'node5' },
    { from: 'node5', to: 'node6' },
    { from: 'node6', to: 'node1' },
  ]

  const getNode = (id: string) => nodes.find(n => n.id === id)!

  return (
    <svg className={`${className}`} viewBox="0 0 400 320" fill="none">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
          <stop offset="100%" stopColor="rgba(65, 105, 225, 0.35)" />
        </linearGradient>
      </defs>

      {connections.map((conn, i) => {
        const from = getNode(conn.from)
        const to = getNode(conn.to)
        return (
          <g key={i}>
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.08 }}
            />
            <motion.circle
              r="2.5"
              cx={from.x}
              cy={from.y}
              fill="rgba(65, 105, 225, 1)"
              filter="url(#glow)"
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'linear',
              }}
            />
          </g>
        )
      })}

      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r + 6}
            fill="transparent"
            stroke={node.id === 'center' ? 'rgba(65, 105, 225, 0.4)' : 'rgba(255, 255, 255, 0.06)'}
            strokeWidth="1"
            animate={{ 
              scale: [0.8, 1.4, 0.8], 
              opacity: [0.4, 0.7, 0.4] 
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              delay: i * 0.15 
            }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.id === 'center' ? 'rgba(65, 105, 225, 0.15)' : 'rgba(255, 255, 255, 0.02)'}
            stroke={node.id === 'center' ? 'rgba(65, 105, 225, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
            strokeWidth="1.5"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
          />
          <motion.text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill={node.id === 'center' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'}
            fontSize={node.id === 'center' ? '11' : '9'}
            fontFamily="JetBrains Mono"
            fontWeight="700"
            letterSpacing="0.05em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}

// Spotlight border hook
export function useSpotlightBorder() {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }, [])
  
  return { cardRef, handleMouseMove }
}

export function ProcessFlow() {
  return null // Replaced by horizontal scroll
}
