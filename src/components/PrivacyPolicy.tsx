export function PrivacyPolicyContent() {
  return (
    <div className="space-y-8 text-[#999] text-sm leading-relaxed">
      <p className="text-xs text-[#555] font-mono">
        Última actualización: 15/09/2025
      </p>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">01</span>
          Responsable del Tratamiento
        </h3>
        <div className="space-y-2 pl-6 border-l border-[rgba(65,105,225,0.2)]">
          <p className="font-medium text-[#ccc]">TAULER GROUP VENTURES S.L.</p>
          <p><span className="text-[#666]">Dirección:</span> Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
          <p><span className="text-[#666]">Email:</span> <a href="mailto:info@taulergroup.com" className="text-[#4169E1] hover:underline">info@taulergroup.com</a></p>
          <p><span className="text-[#666]">CIF:</span> B21742259</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">02</span>
          Finalidad del Tratamiento
        </h3>
        <p>Sus datos serán tratados con las siguientes finalidades:</p>
        <ul className="space-y-2 pl-6">
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>Gestionar la relación comercial y prestación de servicios</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>Envío de comunicaciones comerciales sobre nuestros servicios</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>Responder a sus consultas y solicitudes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>Mejorar nuestros servicios y la experiencia del usuario</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">03</span>
          Legitimación
        </h3>
        <p>El tratamiento de sus datos está basado en:</p>
        <ul className="space-y-2 pl-6">
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>La ejecución de un contrato o relación comercial</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>El consentimiento del usuario</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#E65500] mt-1">→</span>
            <span>El interés legítimo del responsable</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">04</span>
          Conservación de los Datos
        </h3>
        <p>
          Los datos personales se conservarán mientras se mantenga la relación comercial y no se solicite 
          su supresión, y en su caso, durante los años necesarios para cumplir con las obligaciones legales.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">05</span>
          Destinatarios
        </h3>
        <p>
          Sus datos no serán cedidos a terceros salvo obligación legal o cuando sea necesario para la 
          prestación de los servicios solicitados.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">06</span>
          Derechos
        </h3>
        <p>
          Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y 
          oposición escribiendo a{' '}
          <a href="mailto:info@taulergroup.com" className="text-[#4169E1] hover:underline">
            info@taulergroup.com
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-white text-base font-semibold flex items-center gap-2">
          <span className="text-[#4169E1] font-mono text-xs">07</span>
          Autoridad de Control
        </h3>
        <p>
          Puede presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a 
            href="https://www.aepd.es" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#4169E1] hover:underline"
          >
            www.aepd.es
          </a>
          ) si considera que el tratamiento no se ajusta a la normativa vigente.
        </p>
      </section>
    </div>
  )
}
