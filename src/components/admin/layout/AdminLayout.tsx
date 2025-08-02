'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  
  const { isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/static-login'
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 stay-body">로딩 중...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          onCollapsedChange={setSidebarCollapsed} 
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowMobileSidebar(false)}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-full z-50 lg:hidden"
          >
            <AdminSidebar 
              collapsed={false} 
              onCollapsedChange={() => setShowMobileSidebar(false)} 
            />
          </motion.div>
        </>
      )}

      {/* Header */}
      <AdminHeader 
        sidebarCollapsed={sidebarCollapsed || isMobile}
        onMenuClick={() => setShowMobileSidebar(!showMobileSidebar)}
      />

      {/* Main Content */}
      <main className={cn(
        'transition-all duration-300 pt-16',
        sidebarCollapsed || isMobile ? 'lg:pl-20' : 'lg:pl-80',
        className
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}