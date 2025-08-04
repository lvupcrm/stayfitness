'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function SkipLink() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true)
      }
    }

    const handleMouseMove = () => {
      setIsVisible(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <a
      href="#main-content"
      className={cn(
        'fixed top-0 left-0 z-50 p-3 bg-fitness-primary text-white',
        'transform -translate-y-full focus:translate-y-0 transition-transform',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fitness-primary',
        !isVisible && 'sr-only'
      )}
    >
      메인 콘텐츠로 바로가기
    </a>
  )
}