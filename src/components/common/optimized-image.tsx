import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'quality' | 'loading' | 'sizes'> {
  className?: string
  containerClassName?: string
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
  containerClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={90}
        className={cn(
          'duration-700 ease-in-out',
          isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm',
          className
        )}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}