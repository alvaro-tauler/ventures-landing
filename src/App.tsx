import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import {
  Navbar,
  Footer,
  Hero,
  Thesis,
  ValueProposition,
  Pillars,
  Assets,
  Result,
  Contact,
  AnimatedBackground,
  ScrollProgress,
  BackToTop,
  SectionIndicator,
  LegalModal,
  PrivacyPolicyContent,
  CookiesPolicyContent,
  LegalNoticeContent,
  CookieBanner,
} from './components'

type ModalType = 'privacy' | 'cookies' | 'legal' | null

function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (target && target.hash) {
        const element = document.querySelector(target.hash)
        if (element) {
          e.preventDefault()
          lenisRef.current?.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.2
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      lenisRef.current?.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  const openModal = (type: ModalType) => setActiveModal(type)
  const closeModal = () => setActiveModal(null)

  return (
    <div className="min-h-screen bg-[#050505] relative">
      
      {/* Scroll Progress Bar - Locomotive style */}
      <ScrollProgress />
      
      {/* Animated Background Layer */}
      <AnimatedBackground />
      
      {/* Film Grain Noise Overlay */}
      <div className="noise-overlay noise-animated" />

      {/* Content Layer - overflow-visible to allow 3D elements to extend */}
      <div className="relative z-10 overflow-visible">
        <Navbar />

        <main>
          <Hero />
          <Thesis />
          <ValueProposition />
          <Pillars />
          <Assets />
          <Result />
          <Contact />
        </main>

        <Footer 
          onOpenPrivacy={() => openModal('privacy')}
          onOpenCookies={() => openModal('cookies')}
          onOpenLegal={() => openModal('legal')}
        />
      </div>
      
      {/* Navigation Aids - Awwwards style */}
      <BackToTop />
      <SectionIndicator 
        sections={['propuesta', 'enfoque', 'activos', 'contacto']} 
      />

      {/* Cookie Banner */}
      <CookieBanner onOpenCookiesPolicy={() => openModal('cookies')} />

      {/* Legal Modals */}
      <LegalModal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Política de Privacidad y Protección de Datos"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={activeModal === 'cookies'}
        onClose={closeModal}
        title="Política de Cookies"
      >
        <CookiesPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={activeModal === 'legal'}
        onClose={closeModal}
        title="Aviso Legal"
      >
        <LegalNoticeContent />
      </LegalModal>
    </div>
  )
}

export default App
