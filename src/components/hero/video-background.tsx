'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VideoBackgroundProps {
  videoSrc: {
    webm: string
    mp4: string
  }
  posterImage: string
  className?: string
  priority?: boolean
}

export function VideoBackground({
  videoSrc,
  posterImage,
  className,
  priority = false
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Poster Image */}
      <Image
        src={posterImage}
        alt="Stay Fitness Center"
        fill
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        priority={priority}
        sizes="100vw"
      />

      {/* Video (Only shown on desktop) */}
      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          poster={posterImage}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={videoSrc.webm} type="video/webm" />
          <source src={videoSrc.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  )
}