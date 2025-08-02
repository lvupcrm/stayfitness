'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, X, ExternalLink } from 'lucide-react'

interface DomainBannerProps {
  mainDomain?: string
  deploymentDomain?: string
  showBanner?: boolean
}

export default function DomainBanner({ 
  mainDomain = 'https://stayfitness.com',
  deploymentDomain = 'stayfitness-ywbc.vercel.app',
  showBanner = true 
}: DomainBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if we're on a deployment domain (Vercel, Netlify, etc.)
    const currentDomain = window.location.hostname
    const isDeploymentDomain = currentDomain.includes('vercel.app') || 
                              currentDomain.includes('netlify.app') || 
                              currentDomain.includes(deploymentDomain) ||
                              currentDomain === 'localhost'

    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem('domain-banner-dismissed')
    
    if (isDeploymentDomain && showBanner && !dismissed) {
      setIsVisible(true)
    }
  }, [deploymentDomain, showBanner])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem('domain-banner-dismissed', 'true')
  }

  const handleMainSiteClick = () => {
    window.open(mainDomain, '_blank', 'noopener,noreferrer')
  }

  if (!isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Banner Content */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-200" />
                <span className="font-medium text-sm sm:text-base">
                  개발 버전을 보고 계십니다
                </span>
              </div>
              
              {/* Main Site Button */}
              <button
                onClick={handleMainSiteClick}
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium backdrop-blur-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">공식 사이트 바로가기</span>
                <span className="sm:hidden">공식 사이트</span>
              </button>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
              aria-label="배너 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Optional: Export a hook for programmatic control
export function useDomainRedirect(mainDomain: string) {
  const redirectToMainDomain = () => {
    window.open(mainDomain, '_blank', 'noopener,noreferrer')
  }

  const isDeploymentEnvironment = () => {
    if (typeof window === 'undefined') return false
    
    const hostname = window.location.hostname
    return hostname.includes('vercel.app') || 
           hostname.includes('netlify.app') || 
           hostname === 'localhost'
  }

  return {
    redirectToMainDomain,
    isDeploymentEnvironment: isDeploymentEnvironment()
  }
}