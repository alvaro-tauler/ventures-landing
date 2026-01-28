import { Suspense, lazy, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineDropdownProps {
  sceneUrl?: string
  className?: string
}

export function SplineDropdown({ 
  sceneUrl = '/3_d_dropdown.spline',
  className = '',
}: SplineDropdownProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-visible ${className}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Spline 
          scene={sceneUrl}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        />
      </Suspense>
      {!isLoaded && <LoadingSpinner />}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-12 h-12 rounded-full border-2 border-[#4169E1]/20 border-t-[#4169E1] animate-spin" />
    </div>
  )
}

export default SplineDropdown
