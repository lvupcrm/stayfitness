'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navigation = [
  { name: '소개', href: '/about' },
  { name: '지점', href: '/locations' },
  { name: '프로그램', href: '/programs' },
  { name: '후기', href: '/reviews' },
]

export function UrbanNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeSheet = () => setIsOpen(false)

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 stay-glow-soft' 
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.div
              className="text-2xl stay-heading tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className={cn(
                "transition-colors duration-300",
                isScrolled ? "stay-text-gradient" : "text-white"
              )}>
                STAY
              </span>
              <span className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-slate-600" : "text-slate-300"
              )}>FITNESS</span>
            </motion.div>
          </Link>

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
                      isScrolled ? "bg-slate-300" : "bg-white/50"
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
              variant="primary"
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
                    "rounded-full transition-colors duration-300 hover:bg-white/10",
                    isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white"
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
                      variant="primary"
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
    </nav>
  )
}