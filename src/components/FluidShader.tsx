import { useEffect, useRef, useCallback } from 'react'

interface FluidShaderProps {
  className?: string
  intensity?: number
  speed?: number
  color1?: [number, number, number]
  color2?: [number, number, number]
  color3?: [number, number, number]
}

// Fragment shader for fluid/energy distortion effect
const fragmentShader = `
  precision highp float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    // Mouse influence
    vec2 mouse = u_mouse * 2.0 - 1.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    float mouseInfluence = 1.0 - smoothstep(0.0, 1.5, length(p - mouse));
    
    // Time-based animation
    float t = u_time * 0.15;
    
    // Multiple layers of distortion
    vec2 q = vec2(fbm(p + t * 0.5), fbm(p + vec2(1.0)));
    vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + 0.15 * t), fbm(p + q + vec2(8.3, 2.8) + 0.126 * t));
    
    // Final noise value
    float f = fbm(p + r + mouseInfluence * 0.3);
    
    // Color mixing with three colors
    vec3 color = mix(u_color1, u_color2, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, u_color3, clamp(length(q), 0.0, 1.0) * 0.5);
    
    // Add subtle glow based on noise
    color += vec3(0.15, 0.04, 0.0) * (f * f * f + 0.6 * f * f + 0.5 * f);
    
    // Vignette
    float vignette = smoothstep(1.8, 0.5, length(p));
    color *= vignette;
    
    // Overall intensity control
    color *= u_intensity;
    
    // Output with alpha for blending
    float alpha = clamp(f * f * 2.0 + 0.1, 0.0, 0.5);
    gl_FragColor = vec4(color, alpha * u_intensity);
  }
`

const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

export function FluidShader({
  className = '',
  intensity = 0.6,
  speed = 1,
  color1 = [1.0, 0.4, 0.0],  // Orange
  color2 = [0.54, 0.36, 0.96], // Violet
  color3 = [0.0, 0.82, 1.0],  // Cyan
}: FluidShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())
  
  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    })
    if (!gl) return
    
    // Create shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vs || !fs) return
    
    // Create program
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    
    gl.useProgram(program)
    
    // Create buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW)
    
    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity')
    const color1Location = gl.getUniformLocation(program, 'u_color1')
    const color2Location = gl.getUniformLocation(program, 'u_color2')
    const color3Location = gl.getUniformLocation(program, 'u_color3')
    
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    
    // Enable blending
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    
    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    // Animation loop
    const render = () => {
      const time = (Date.now() - startTimeRef.current) / 1000 * speed
      
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      
      gl.uniform1f(timeLocation, time)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, mouseRef.current.x, 1 - mouseRef.current.y)
      gl.uniform1f(intensityLocation, intensity)
      gl.uniform3f(color1Location, color1[0], color1[1], color1[2])
      gl.uniform3f(color2Location, color2[0], color2[1], color2[2])
      gl.uniform3f(color3Location, color3[0], color3[1], color3[2])
      
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      
      animationRef.current = requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [createShader, intensity, speed, color1, color2, color3])
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}

// Simpler CSS-based fluid gradient as fallback
export function FluidGradientCSS({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Animated gradient layers */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(65, 105, 225, 0.15) 0%, transparent 50%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />
    </div>
  )
}

