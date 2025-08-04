'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedCmsImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide'
  priority?: boolean
}

const aspectRatioClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[2/1]'
}

export function OptimizedCmsImage({
  src,
  alt,
  className,
  aspectRatio = 'video',
  priority = false
}: OptimizedCmsImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle relative and absolute URLs
  const imageSrc = src.startsWith('http') ? src : `/${src}`

  return (
    <div className={cn(
      'overflow-hidden',
      aspectRatioClasses[aspectRatio],
      className
    )}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}