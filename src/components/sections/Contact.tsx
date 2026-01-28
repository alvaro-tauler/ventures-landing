import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '../MagneticButton'

// HubSpot Forms API Configuration
const HUBSPOT_PORTAL_ID = '146295013'
const HUBSPOT_FORM_GUID = 'e3c23dc7-21b0-48b2-99b1-e574824b6d49'

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    idea: ''
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      // HubSpot Forms API v3 endpoint
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`
      
      const hubspotData = {
        fields: [
          {
            objectTypeId: '0-1',
            name: 'firstname',
            value: formData.name.split(' ')[0] || formData.name
          },
          {
            objectTypeId: '0-1',
            name: 'lastname',
            value: formData.name.split(' ').slice(1).join(' ') || ''
          },
          {
            objectTypeId: '0-1',
            name: 'email',
            value: formData.email
          },
          {
            objectTypeId: '0-1',
            name: 'company',
            value: formData.company
          },
          {
            objectTypeId: '0-1',
            name: 'message',
            value: formData.idea
          }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      }

      const response = await fetch(hubspotUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hubspotData)
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', company: '', idea: '' })
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('HubSpot submission error:', errorData)
        setFormState('error')
      }
    } catch (error) {
      console.error('Error submitting to HubSpot:', error)
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contacto" className="section-padding bg-[#050505] relative overflow-visible" style={{ paddingTop: 'clamp(3rem, 8vw, 10rem)', paddingBottom: 'clamp(3rem, 8vw, 10rem)' }}>
      {/* Background grid - hidden on small mobile for performance */}
      <div className="absolute inset-0 opacity-30 hidden sm:block overflow-hidden">
        <div className="grid-3d">
          <div className="grid-3d-inner" />
        </div>
      </div>
      
      <div className="container-custom relative z-10 overflow-visible">
        <div className="max-w-6xl mx-auto overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-24 items-start overflow-visible">

            {/* Left side: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="eyebrow mb-4 sm:mb-6 md:mb-8 block text-[0.6rem] sm:text-[0.65rem]">Contacto</span>
              
              <h2 className="heading-serif text-[clamp(1.75rem,5vw,3rem)] mb-4 sm:mb-6 md:mb-8">
                Construyamos el<br/>
                <span className="text-gradient-fire">futuro</span> juntos.
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-[#777] mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-md">
                ¿Tienes una oportunidad de mercado y necesitas un socio tecnológico 
                de primer nivel? Estamos listos para ejecutar.
              </p>

              {/* Contact info */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[rgba(230,85,0,0.1)] flex items-center justify-center shrink-0 border border-[rgba(230,85,0,0.2)]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] mb-0.5 sm:mb-1 font-medium">Email</p>
                    <a href="mailto:info@taulergroup.com" className="text-[#4169E1] hover:underline font-medium text-sm sm:text-base">
                      info@taulergroup.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[rgba(230,85,0,0.1)] flex items-center justify-center shrink-0 border border-[rgba(230,85,0,0.2)]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] mb-0.5 sm:mb-1 font-medium">Ubicación</p>
                    <p className="text-[#A0A0A0] text-sm sm:text-base">España</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Form */}
            <motion.div
              className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 overflow-visible"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              style={{ willChange: 'transform' }}
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    className="text-center py-8 sm:py-10 md:py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#4169E1] text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">¡Recibido!</h3>
                    <p className="text-[#777] mb-6 sm:mb-8 text-sm sm:text-base">
                      Nuestro equipo te contactará en menos de 24 horas.
                    </p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="text-[#4169E1] font-medium hover:underline text-sm sm:text-base"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* 2 columns on sm+ screens, 1 column on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="name" className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] block font-medium">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label htmlFor="email" className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] block font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className="text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="company" className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] block font-medium">
                        Empresa / Proyecto
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="idea" className="text-[10px] sm:text-xs font-sans text-[#888] uppercase tracking-[0.1em] block font-medium">
                        Tu visión
                      </label>
                      <textarea
                        id="idea"
                        name="idea"
                        required
                        rows={4}
                        value={formData.idea}
                        onChange={handleChange}
                        placeholder="Cuéntanos brevemente qué tienes en mente..."
                        className="resize-none text-sm sm:text-base"
                      />
                    </div>

                    {formState === 'error' && (
                      <p className="text-red-500 text-xs sm:text-sm text-center">
                        Hubo un error al enviar. Por favor, inténtalo de nuevo.
                      </p>
                    )}

                    <MagneticButton strength={0.2}>
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="btn-primary w-full py-3 sm:py-3.5 md:py-4 text-center disabled:opacity-70 text-xs sm:text-sm"
                      >
                        {formState === 'submitting' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Enviando...
                          </span>
                        ) : 'Enviar propuesta'}
                      </button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
