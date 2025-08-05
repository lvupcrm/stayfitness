/**
 * CMS 블록별 데이터 타입 정의
 */

import type { MediaFile } from '../common'

// ========================================
// 텍스트 블록
// ========================================

export interface TextBlockData {
  content: string
  heading?: string
  subheading?: string
  alignment?: 'left' | 'center' | 'right' | 'justify'
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  textColor?: string
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose'
}

// ========================================
// 이미지 블록
// ========================================

export interface ImageBlockData {
  image: MediaFile
  alt: string
  caption?: string
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide' | 'portrait'
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  link?: {
    url: string
    target?: '_blank' | '_self'
  }
  overlay?: {
    enabled: boolean
    color?: string
    opacity?: number
    text?: string
  }
}

// ========================================
// 비디오 블록
// ========================================

export interface VideoBlockData {
  source: 'upload' | 'youtube' | 'vimeo' | 'url'
  video?: MediaFile // 업로드된 비디오
  url?: string // 외부 URL 또는 임베드 URL
  thumbnail?: MediaFile
  autoplay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  aspectRatio?: 'auto' | 'video' | 'square' | 'wide'
}

// ========================================
// 버튼 블록
// ========================================

export interface ButtonBlockData {
  text: string
  url: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  icon?: {
    name: string
    position: 'left' | 'right'
  }
  target?: '_blank' | '_self'
  tracking?: {
    event?: string
    category?: string
    label?: string
  }
}

// ========================================
// 히어로 블록
// ========================================

export interface HeroBlockData {
  title: string
  subtitle?: string
  description?: string
  backgroundType: 'color' | 'image' | 'video' | 'gradient'
  backgroundColor?: string
  backgroundImage?: MediaFile
  backgroundVideo?: MediaFile
  gradient?: {
    from: string
    to: string
    direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  }
  overlay?: {
    enabled: boolean
    color: string
    opacity: number
  }
  textAlignment?: 'left' | 'center' | 'right'
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'screen' | 'auto'
  primaryButton?: ButtonBlockData
  secondaryButton?: ButtonBlockData
}

// ========================================
// 카드 블록
// ========================================

export interface CardBlockData {
  title: string
  description?: string
  image?: MediaFile
  imagePosition?: 'top' | 'left' | 'right' | 'background'
  link?: {
    url: string
    target?: '_blank' | '_self'
  }
  button?: ButtonBlockData
  tags?: string[]
  metadata?: {
    author?: string
    date?: string
    readTime?: string
    category?: string
  }
}

// ========================================
// 증언/리뷰 블록
// ========================================

export interface TestimonialBlockData {
  quote: string
  author: {
    name: string
    title?: string
    company?: string
    avatar?: MediaFile
  }
  rating?: number // 1-5
  featured?: boolean
  source?: string // 리뷰 출처
  date?: string
}

// ========================================
// 섹션 블록 (컨테이너)
// ========================================

export interface SectionBlockData {
  title?: string
  subtitle?: string
  description?: string
  layout: 'single' | 'two-column' | 'three-column' | 'four-column' | 'grid'
  backgroundType?: 'none' | 'color' | 'image' | 'gradient'
  backgroundColor?: string
  backgroundImage?: MediaFile
  gradient?: {
    from: string
    to: string
    direction: string
  }
  spacing?: {
    paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centerContent?: boolean
}

// ========================================
// 갤러리 블록
// ========================================

export interface GalleryBlockData {
  images: Array<{
    image: MediaFile
    alt: string
    caption?: string
  }>
  layout: 'grid' | 'masonry' | 'carousel' | 'slider'
  columns?: 2 | 3 | 4 | 5 | 6
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  showCaptions?: boolean
  lightbox?: boolean
  autoplay?: boolean // carousel/slider용
  controls?: boolean // carousel/slider용
}

// ========================================
// 폼 블록
// ========================================

export interface FormBlockData {
  title?: string
  description?: string
  fields: Array<{
    id: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file'
    label: string
    placeholder?: string
    required?: boolean
    options?: Array<{ value: string; label: string }> // select, radio용
    validation?: {
      pattern?: string
      minLength?: number
      maxLength?: number
    }
  }>
  submitButton: {
    text: string
    variant?: 'primary' | 'secondary'
  }
  action: {
    type: 'email' | 'webhook' | 'database'
    email?: string
    webhook?: string
  }
  successMessage?: string
  errorMessage?: string
}

// ========================================
// 임베드 블록
// ========================================

export interface EmbedBlockData {
  type: 'html' | 'iframe' | 'script'
  content: string
  width?: string
  height?: string
  responsive?: boolean
  sandbox?: string[] // iframe용 sandbox 속성
}

// ========================================
// 스페이서 블록
// ========================================

export interface SpacerBlockData {
  height: {
    mobile: number
    tablet?: number
    desktop?: number
  }
  unit: 'px' | 'rem' | 'vh'
}

// ========================================
// 디바이더 블록
// ========================================

export interface DividerBlockData {
  style: 'solid' | 'dashed' | 'dotted' | 'double'
  width: 'full' | 'half' | 'quarter'
  thickness: number
  color?: string
  spacing?: {
    top: number
    bottom: number
  }
}

// ========================================
// 통합 블록 데이터 타입
// ========================================

export type BlockData = 
  | { type: 'text'; data: TextBlockData }
  | { type: 'image'; data: ImageBlockData }
  | { type: 'video'; data: VideoBlockData }
  | { type: 'button'; data: ButtonBlockData }
  | { type: 'hero'; data: HeroBlockData }
  | { type: 'card'; data: CardBlockData }
  | { type: 'testimonial'; data: TestimonialBlockData }
  | { type: 'section'; data: SectionBlockData }
  | { type: 'gallery'; data: GalleryBlockData }
  | { type: 'form'; data: FormBlockData }
  | { type: 'embed'; data: EmbedBlockData }
  | { type: 'spacer'; data: SpacerBlockData }
  | { type: 'divider'; data: DividerBlockData }