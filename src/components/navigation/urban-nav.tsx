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
  { name: '프로그램', href: '/programs' },
  { name: '지점', href: '/locations' },
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
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100' 
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
              className="text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className={cn(
                "transition-colors duration-300",
                isScrolled ? "text-stone-900" : "text-white"
              )}>
                STAY
              </span>
              <span className="text-stone-600">FITNESS</span>
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
                    'text-[15px] font-medium tracking-wide transition-colors duration-300',
                    isScrolled
                      ? isActive 
                        ? 'text-stone-800' 
                        : 'text-stone-700 hover:text-stone-900'
                      : isActive
                        ? 'text-stone-200'
                        : 'text-white/90 hover:text-white'
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-5 right-5 h-0.5 bg-stone-700"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className={cn(
                      "absolute bottom-0 left-5 right-5 h-0.5",
                      isScrolled ? "bg-gray-900" : "bg-white"
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
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className={cn(
                "text-[15px] font-medium px-6 h-11 rounded-full transition-all duration-300",
                isScrolled
                  ? "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                  : "text-white hover:bg-white/10"
              )}
              asChild
            >
              <Link href="/consultation">상담예약</Link>
            </Button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="text-[15px] font-medium px-6 h-11 rounded-full bg-stone-800 hover:bg-stone-900 text-white shadow-lg shadow-stone-800/20 transition-all duration-300"
                asChild
              >
                <Link href="/careers">트레이너 지원</Link>
              </Button>
            </motion.div>
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
                    isScrolled ? "text-stone-900" : "text-white"
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
                  <div className="flex items-center justify-between px-6 py-6 border-b">
                    <div className="text-2xl font-bold tracking-tight">
                      <span className="text-stone-900">STAY</span>
                      <span className="text-stone-600">FITNESS</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={closeSheet}
                      className="rounded-full"
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
                                'block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300',
                                isActive
                                  ? 'bg-stone-100 text-stone-800'
                                  : 'text-stone-700 hover:bg-stone-50'
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
                  <div className="px-6 py-6 border-t space-y-3">
                    <Button 
                      variant="outline"
                      className="w-full h-12 rounded-full text-base font-medium"
                      asChild
                    >
                      <Link href="/consultation" onClick={closeSheet}>
                        상담 예약하기
                      </Link>
                    </Button>
                    <Button 
                      className="w-full h-12 rounded-full bg-stone-800 hover:bg-stone-900 text-white text-base font-medium"
                      asChild
                    >
                      <Link href="/careers" onClick={closeSheet}>
                        트레이너 지원하기
                      </Link>
                    </Button>
                  </div>

                  {/* Contact info */}
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-sm text-stone-600 text-center">
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