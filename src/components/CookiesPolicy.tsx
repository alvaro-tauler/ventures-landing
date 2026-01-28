export function CookiesPolicyContent() {
  return (
    <div className="space-y-8 text-[#999] text-sm leading-relaxed">
      <p className="text-xs text-[#555] font-mono">
        Última actualización: 15/09/2025
      </p>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold">¿Qué son las cookies?</h3>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita 
          nuestra web. Estas cookies nos permiten reconocer su navegador y, si tiene una cuenta registrada, 
          vincularla a su cuenta registrada para proporcionarle una experiencia personalizada.
        </p>
      </section>

      <section className="space-y-6">
        <h3 className="text-white text-base font-semibold">Tipos de cookies que utilizamos</h3>
        
        <div className="space-y-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(65,105,225,0.15)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-[#ccc] font-medium">Cookies técnicas (necesarias)</h4>
          </div>
          <ul className="space-y-2 pl-11">
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Permiten la navegación y el uso de funcionalidades básicas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Son imprescindibles para el funcionamiento de la web</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(65,105,225,0.15)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-[#ccc] font-medium">Cookies analíticas</h4>
          </div>
          <ul className="space-y-2 pl-11">
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Nos permiten analizar el uso de la web para mejorar nuestros servicios</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Utilizamos Google Analytics y otras herramientas</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(65,105,225,0.15)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#4169E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-[#ccc] font-medium">Cookies de preferencias</h4>
          </div>
          <ul className="space-y-2 pl-11">
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Permiten recordar información para mejorar su experiencia</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#E65500] mt-1">→</span>
              <span>Como el idioma preferido o la región en la que se encuentra</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold">¿Cómo gestionar las cookies?</h3>
        <p>
          Puede configurar su navegador para rechazar todas las cookies o para recibir un aviso cuando se 
          envíe una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro 
          sitio web no funcionen correctamente.
        </p>
        <p>
          La mayoría de los navegadores aceptan cookies automáticamente, pero puede modificar la configuración 
          de su navegador para rechazarlas si lo prefiere.
        </p>
      </section>

      <section className="space-y-4 p-4 rounded-xl bg-[rgba(65,105,225,0.05)] border border-[rgba(65,105,225,0.15)]">
        <h3 className="text-white text-base font-semibold">Más información</h3>
        <p>
          Para más información sobre el uso de cookies y sus derechos, puede contactar con nosotros en{' '}
          <a href="mailto:info@taulergroup.com" className="text-[#4169E1] hover:underline">
            info@taulergroup.com
          </a>
        </p>
      </section>
    </div>
  )
}
