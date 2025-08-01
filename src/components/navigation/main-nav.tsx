'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Dumbbell, Calendar, Users, Phone, Home, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '프로그램', href: '/programs', icon: Dumbbell },
  { name: '기업 웰니스', href: '/corporate', icon: Building2 },
  { name: '상담예약', href: '/consultation', icon: Calendar },
  { name: '트레이너 지원', href: '/careers', icon: Users },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeSheet = () => setIsOpen(false)

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    )}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* 로고 */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 font-bold text-xl text-foreground hover:text-fitness-primary transition-colors"
        >
          <div className="w-8 h-8 bg-fitness-gradient rounded-lg flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <span>스테이피트니스</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'text-fitness-primary bg-fitness-primary/10'
                    : 'text-muted-foreground hover:text-fitness-primary hover:bg-fitness-primary/5'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* CTA 버튼 */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/consultation">
              <Calendar className="w-4 h-4 mr-2" />
              상담예약
            </Link>
          </Button>
          <Button size="sm" className="fitness-gradient text-white" asChild>
            <Link href="/careers">
              <Users className="w-4 h-4 mr-2" />
              트레이너 지원
            </Link>
          </Button>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col h-full">
                {/* 모바일 헤더 */}
                <div className="flex items-center justify-between pb-6 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-fitness-gradient rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">스테이피트니스</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeSheet}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* 모바일 네비게이션 */}
                <div className="flex-1 py-6">
                  <div className="space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeSheet}
                          className={cn(
                            'flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                            pathname === item.href
                              ? 'text-fitness-primary bg-fitness-primary/10 border-l-4 border-fitness-primary'
                              : 'text-foreground hover:text-fitness-primary hover:bg-fitness-primary/5'
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* 모바일 CTA */}
                <div className="border-t pt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    asChild
                  >
                    <Link href="/consultation" onClick={closeSheet}>
                      <Calendar className="w-4 h-4 mr-2" />
                      상담 예약하기
                    </Link>
                  </Button>
                  <Button 
                    className="w-full justify-start fitness-gradient text-white" 
                    asChild
                  >
                    <Link href="/careers" onClick={closeSheet}>
                      <Users className="w-4 h-4 mr-2" />
                      트레이너 지원하기
                    </Link>
                  </Button>
                </div>

                {/* 연락처 정보 */}
                <div className="border-t pt-4 mt-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>02-0000-0000</span>
                    </div>
                    <div className="text-xs">
                      평일 06:00-23:00 | 주말 08:00-22:00
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}