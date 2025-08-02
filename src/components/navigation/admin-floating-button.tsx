'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Settings, Lock } from 'lucide-react'

export default function AdminFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Only show in development or on deployment domains
  const shouldShow = process.env.NODE_ENV === 'development' || 
    (typeof window !== 'undefined' && 
     (window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('netlify.app')))

  if (!shouldShow) return null

  return (
    <div className="fixed bottom-20 left-4 z-40">
      <AnimatePresence>
        {/* Main Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            title="관리자 메뉴"
          >
            <motion.div
              animate={{ rotate: isVisible ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>

        {/* Admin Menu */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[200px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-800 text-sm stay-body-medium">
                  관리자 메뉴
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/admin/login"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                onClick={() => setIsVisible(false)}
              >
                <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm stay-body-medium">
                    관리자 로그인
                  </div>
                  <div className="text-xs text-gray-500 stay-body">
                    어드민 시스템 접속
                  </div>
                </div>
              </Link>

              <Link
                href="/admin"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                onClick={() => setIsVisible(false)}
              >
                <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm stay-body-medium">
                    관리자 대시보드
                  </div>
                  <div className="text-xs text-gray-500 stay-body">
                    직접 접속 (로그인 필요)
                  </div>
                </div>
              </Link>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
              <div className="text-xs text-gray-500 stay-body text-center">
                {process.env.NODE_ENV === 'development' ? '개발 환경' : '배포 환경'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-transparent -z-10"
          onClick={() => setIsVisible(false)}
        />
      )}
    </div>
  )
}