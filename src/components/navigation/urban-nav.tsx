'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Shield, Lock, Key } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: '홈', href: '/' },
  { name: '소개', href: '/about' },
  { name: '지점', href: '/locations' },
  { name: '프로그램', href: '/programs' },
  { name: '후기', href: '/reviews' },
]

export function UrbanNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAdminAccess, setShowAdminAccess] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  // Pages with light/white hero sections that need dark navigation text
  const lightHeroPages = ['/about', '/programs', '/reviews', '/locations']
  const hasLightHero = lightHeroPages.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Reset click count after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (Date.now() - lastClickTime > 3000) {
        setClickCount(0)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [lastClickTime])

  const closeSheet = () => setIsOpen(false)

  const handleLogoClick = (e: React.MouseEvent) => {
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
      e.preventDefault() // Only prevent navigation when triggering admin access
      e.stopPropagation()
      setShowAdminAccess(true)
      setClickCount(0)
    }
    // For normal clicks (less than 5), let the event bubble up for normal navigation
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
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 stay-glow-soft' 
        : hasLightHero
          ? 'bg-transparent' // Light pages still have transparent nav
          : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Admin Access */}
          <div className="relative">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              onClick={handleLogoClick}
            >
              <motion.div
                className="text-2xl stay-heading tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className={cn(
                  "transition-colors duration-300",
                  isScrolled 
                    ? "stay-text-gradient" 
                    : hasLightHero && !isScrolled 
                      ? "stay-text-gradient" // Dark color on light pages
                      : "text-white"
                )}>
                  STAY
                </span>
                <span className={cn(
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-slate-600" 
                    : hasLightHero && !isScrolled
                      ? "text-slate-600" // Dark color on light pages
                      : "text-slate-300"
                )}>FITNESS</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 group"
                >
                  <span className={cn(
                    'stay-body-medium text-[15px] tracking-wide transition-colors duration-300',
                    isScrolled
                      ? isActive 
                        ? 'text-slate-900' 
                        : 'text-slate-700 hover:text-slate-900'
                      : hasLightHero && !isScrolled
                        ? isActive
                          ? 'text-slate-900' // Dark text on light pages
                          : 'text-slate-700 hover:text-slate-900'
                        : isActive
                          ? 'text-white'
                          : 'text-white/90 hover:text-white'
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-5 right-5 h-0.5 stay-gradient-accent rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className={cn(
                      "absolute bottom-0 left-5 right-5 h-0.5 rounded-full",
                      isScrolled 
                        ? "bg-slate-300" 
                        : hasLightHero && !isScrolled
                          ? "bg-slate-300" // Dark hover line on light pages
                          : "bg-white/50"
                    )}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5 }}
                  />
                </Link>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center">
            <Button 
              variant="default"
              size="lg"
              className="stay-body-medium text-[15px] px-6 h-11 rounded-full hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/consultation">상담예약</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "rounded-full transition-colors duration-300",
                    isScrolled 
                      ? "text-slate-900 hover:bg-slate-100" 
                      : hasLightHero && !isScrolled
                        ? "text-slate-900 hover:bg-slate-100" // Dark button on light pages
                        : "text-white hover:bg-white/10"
                  )}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-full sm:w-96 bg-white p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200">
                    <div className="text-2xl stay-heading tracking-tight">
                      <span className="stay-text-gradient">STAY</span>
                      <span className="text-slate-600">FITNESS</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={closeSheet}
                      className="rounded-full text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Mobile navigation */}
                  <div className="flex-1 px-6 py-8">
                    <div className="space-y-2">
                      {navigation.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              onClick={closeSheet}
                              className={cn(
                                'block px-4 py-3 text-lg stay-body-medium rounded-xl transition-all duration-300',
                                isActive
                                  ? 'bg-slate-100 text-slate-900 stay-glow-soft'
                                  : 'text-slate-700 hover:bg-slate-50'
                              )}
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="px-6 py-6 border-t border-slate-200">
                    <Button 
                      variant="default"
                      size="lg"
                      className="w-full h-12 rounded-full text-base stay-body-medium"
                      asChild
                    >
                      <Link href="/consultation" onClick={closeSheet}>
                        상담 예약하기
                      </Link>
                    </Button>
                  </div>

                  {/* Contact info */}
                  <div className="px-6 py-4 bg-slate-50">
                    <p className="text-sm text-slate-600 text-center stay-body">
                      문의: 02-0000-0000<br />
                      평일 06:00-23:00 | 주말 08:00-22:00
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Admin Access Modal */}
      <AnimatePresence mode="wait">
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
    </nav>
  )
}