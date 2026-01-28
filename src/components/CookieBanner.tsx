import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void
}

const COOKIE_CONSENT_KEY = 'tauler_cookie_consent'

export function CookieBanner({ onOpenCookiesPolicy }: CookieBannerProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Small delay to let the page load first
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[150] p-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-2xl">
              {/* Main Banner - Compact */}
              <div className="px-4 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {/* Content */}
                  <p className="flex-1 text-[#999] text-xs leading-relaxed">
                    {t('cookieBanner.message')}{' '}
                    <button
                      onClick={onOpenCookiesPolicy}
                      className="text-[#4169E1] hover:underline"
                    >
                      {t('cookieBanner.moreInfo')}
                    </button>
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowPreferences(!showPreferences)}
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#666] hover:text-white transition-colors"
                    >
                      {t('cookieBanner.settings')}
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#666] hover:text-white border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] rounded transition-all"
                    >
                      {t('cookieBanner.reject')}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#4169E1] hover:bg-[#5179F1] rounded transition-all"
                    >
                      {t('cookieBanner.accept')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Preferences Panel - Compact */}
              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 border-t border-[rgba(255,255,255,0.06)]">
                      <div className="pt-3 flex flex-wrap items-center gap-4">
                        {/* Necessary Cookies */}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-4 rounded-full bg-[#4169E1]/30 flex items-center justify-end px-0.5 cursor-not-allowed">
                            <div className="w-3 h-3 rounded-full bg-[#4169E1]" />
                          </div>
                          <span className="text-[#888] text-[11px]">{t('cookieBanner.necessary')}</span>
                        </div>
                        
                        {/* Analytics Cookies */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                            className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${
                              preferences.analytics 
                                ? 'bg-[#4169E1]/30 justify-end' 
                                : 'bg-[rgba(255,255,255,0.1)] justify-start'
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full transition-colors ${
                              preferences.analytics ? 'bg-[#4169E1]' : 'bg-[#444]'
                            }`} />
                          </button>
                          <span className="text-[#888] text-[11px]">{t('cookieBanner.analytics')}</span>
                        </div>
                        
                        {/* Preference Cookies */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreferences(p => ({ ...p, preferences: !p.preferences }))}
                            className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${
                              preferences.preferences 
                                ? 'bg-[#4169E1]/30 justify-end' 
                                : 'bg-[rgba(255,255,255,0.1)] justify-start'
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full transition-colors ${
                              preferences.preferences ? 'bg-[#4169E1]' : 'bg-[#444]'
                            }`} />
                          </button>
                          <span className="text-[#888] text-[11px]">{t('cookieBanner.preferences')}</span>
                        </div>
                        
                        {/* Save Button */}
                        <button
                          onClick={handleSavePreferences}
                          className="ml-auto px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#4169E1] hover:bg-[#5179F1] rounded transition-all"
                        >
                          {t('cookieBanner.save')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
