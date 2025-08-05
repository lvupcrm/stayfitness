'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type ImageVariant = 'default' | 'cms' | 'hero' | 'avatar'
export type AspectRatio = 'video' | 'square' | 'wide' | 'portrait' | 'auto'

interface OptimizedImageProps extends Omit<ImageProps, 'loading' | 'onLoad'> {
  /** 이미지 변형 타입 */
  variant?: ImageVariant
  /** 종횡비 설정 */
  aspectRatio?: AspectRatio
  /** 컨테이너 클래스네임 */
  containerClassName?: string
  /** 로딩 완료 콜백 */
  onLoadComplete?: () => void
  /** 로딩 상태 표시 여부 */
  showLoadingState?: boolean
  /** 블러 효과 사용 여부 */
  useBlurEffect?: boolean
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  video: 'aspect-video',
  square: 'aspect-square', 
  wide: 'aspect-[2/1]',
  portrait: 'aspect-[3/4]',
  auto: ''
}

const variantDefaults: Record<ImageVariant, Partial<OptimizedImageProps>> = {
  default: {
    quality: 90,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    useBlurEffect: true,
    showLoadingState: true
  },
  cms: {
    quality: 85,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    useBlurEffect: false,
    showLoadingState: true,
    aspectRatio: 'video'
  },
  hero: {
    quality: 95,
    priority: true,
    sizes: '100vw',
    useBlurEffect: true,
    showLoadingState: false
  },
  avatar: {
    quality: 80,
    sizes: '(max-width: 768px) 48px, 64px',
    aspectRatio: 'square',
    useBlurEffect: false,
    showLoadingState: false
  }
}

export function OptimizedImage({
  src,
  alt,
  variant = 'default',
  aspectRatio,
  className,
  containerClassName,
  onLoadComplete,
  showLoadingState,
  useBlurEffect,
  fill,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // variant 기본값 적용
  const variantConfig = variantDefaults[variant]
  const finalAspectRatio = aspectRatio ?? variantConfig.aspectRatio ?? 'auto'
  const finalShowLoadingState = showLoadingState ?? variantConfig.showLoadingState ?? true
  const finalUseBlurEffect = useBlurEffect ?? variantConfig.useBlurEffect ?? false

  // 이미지 소스 처리 (CMS 이미지의 경우 상대 경로 처리)
  const processedSrc = typeof src === 'string' && !src.startsWith('http') && !src.startsWith('/') 
    ? `/${src}` 
    : src

  const handleLoad = () => {
    setIsLoaded(true)
    onLoadComplete?.()
  }

  const handleError = () => {
    setHasError(true)
    console.warn(`Failed to load image: ${src}`)
  }

  // 에러 상태 렌더링
  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-gray-100 text-gray-400',
        finalAspectRatio !== 'auto' && aspectRatioClasses[finalAspectRatio],
        containerClassName
      )}>
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  const imageElement = (
    <Image
      src={processedSrc}
      alt={alt}
      fill={fill ?? (finalAspectRatio !== 'auto')}
      className={cn(
        'object-cover',
        
        // 로딩 상태 스타일
        finalShowLoadingState && !isLoaded && 'opacity-0',
        finalShowLoadingState && isLoaded && 'opacity-100 transition-opacity duration-300',
        
        // 블러 효과
        finalUseBlurEffect && !isLoaded && 'scale-110 blur-sm',
        finalUseBlurEffect && isLoaded && 'scale-100 blur-0',
        finalUseBlurEffect && 'transition-all duration-700 ease-in-out',
        
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
      {...variantConfig}
      {...props}
    />
  )

  // aspect ratio가 auto가 아닌 경우 컨테이너로 감싸기
  if (finalAspectRatio !== 'auto') {
    return (
      <div className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[finalAspectRatio],
        containerClassName
      )}>
        {imageElement}
      </div>
    )
  }

  // aspect ratio가 auto인 경우 컨테이너 사용 여부에 따라 처리
  if (containerClassName) {
    return (
      <div className={cn('relative overflow-hidden', containerClassName)}>
        {imageElement}
      </div>
    )
  }

  return imageElement
}