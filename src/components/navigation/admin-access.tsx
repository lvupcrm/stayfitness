'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, Key } from 'lucide-react'

export default function AdminAccess() {
  const [showAdminAccess, setShowAdminAccess] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Reset click count after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (Date.now() - lastClickTime > 3000) {
        setClickCount(0)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [lastClickTime])

  const handleLogoClick = () => {
    const now = Date.now()
    
    // Reset if too much time has passed
    if (now - lastClickTime > 2000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }
    
    setLastClickTime(now)

    // Show admin access after 5 rapid clicks
    if (clickCount >= 4) {
      setShowAdminAccess(true)
      setClickCount(0)
    }
  }

  const handleAdminLogin = () => {
    router.push('/admin/login')
    setShowAdminAccess(false)
  }

  const handleKeyboardShortcut = (event: KeyboardEvent) => {
    // Ctrl/Cmd + Shift + A for admin access
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'A') {
      event.preventDefault()
      setShowAdminAccess(true)
    }
    
    // Escape to close
    if (event.key === 'Escape') {
      setShowAdminAccess(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut)
    return () => window.removeEventListener('keydown', handleKeyboardShortcut)
  }, [])

  return (
    <>
      {/* Hidden admin trigger - attach to logo */}
      <div 
        onClick={handleLogoClick}
        className="absolute inset-0 z-10 cursor-pointer"
        title="관리자 접근: 로고 5회 클릭 또는 Ctrl+Shift+A"
      />

      {/* Admin Access Modal */}
      <AnimatePresence>
        {showAdminAccess && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowAdminAccess(false)}
            />

            {/* Admin Access Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px]">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 stay-heading">
                    관리자 접근
                  </h2>
                  <p className="text-gray-600 stay-body text-sm mt-2">
                    스테이피트니스 관리자 시스템
                  </p>
                </div>

                {/* Access Options */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdminLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 px-4 font-medium stay-body transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>관리자 로그인</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAdminAccess(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 px-4 font-medium stay-body transition-colors duration-200"
                  >
                    취소
                  </motion.button>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 stay-body">
                    <Key className="w-3 h-3 inline mr-1" />
                    단축키: <kbd className="bg-gray-100 px-1 rounded text-xs">Ctrl+Shift+A</kbd>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Development hint (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity z-40">
          Admin: 로고 5클릭 또는 Ctrl+Shift+A
        </div>
      )}
    </>
  )
}