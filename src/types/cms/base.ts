/**
 * CMS 기본 타입 정의
 */

import type { BaseEntity, ID, MediaFile } from '../common'

// ========================================
// 기본 CMS 엔티티
// ========================================

export interface CMSEntity extends BaseEntity {
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  author_id?: ID
  published_at?: string
}

// ========================================
// 페이지 타입
// ========================================

export interface Page extends CMSEntity {
  type: 'page' | 'landing' | 'blog' | 'product'
  content: ContentBlock[]
  meta: PageMeta
  settings: PageSettings
}

export interface PageMeta {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
}

export interface PageSettings {
  template?: string
  headerVisible?: boolean
  footerVisible?: boolean
  sidebarVisible?: boolean
  fullWidth?: boolean
  customCSS?: string
  customJS?: string
}

// ========================================
// 콘텐츠 블록 기본 타입
// ========================================

export type BlockType = 
  | 'text' 
  | 'image' 
  | 'video' 
  | 'button' 
  | 'hero' 
  | 'card' 
  | 'testimonial'
  | 'section'
  | 'gallery'
  | 'form'
  | 'spacer'
  | 'divider'
  | 'embed'

export interface ContentBlock extends BaseEntity {
  type: BlockType
  order: number
  data: Record<string, any>
  styles?: BlockStyles
  settings?: BlockSettings
  parent_id?: ID
  page_id: ID
}

export interface BlockStyles {
  backgroundColor?: string
  textColor?: string
  padding?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  margin?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  borderRadius?: number
  border?: {
    width?: number
    style?: 'solid' | 'dashed' | 'dotted'
    color?: string
  }
  shadow?: {
    x?: number
    y?: number
    blur?: number
    spread?: number
    color?: string
  }
  customClass?: string
}

export interface BlockSettings {
  isVisible?: boolean
  animationDelay?: number
  animationType?: 'fade' | 'slide' | 'scale' | 'none'
  breakpoints?: {
    mobile?: boolean
    tablet?: boolean
    desktop?: boolean
  }
}

// ========================================
// 에디터 상태 타입
// ========================================

export interface EditorState {
  selectedBlock?: ID
  selectedPage?: ID
  isEditing: boolean
  isPreview: boolean
  isDirty: boolean
  clipboard?: ContentBlock
}

export interface EditorHistory {
  past: Page[]
  present: Page
  future: Page[]
}

// ========================================
// 템플릿 타입
// ========================================

export interface Template extends BaseEntity {
  name: string
  description?: string
  category: string
  thumbnail?: string
  blocks: Omit<ContentBlock, 'id' | 'page_id' | 'created_at' | 'updated_at'>[]
  isPublic: boolean
  usage_count: number
}

// ========================================
// 미디어 라이브러리 타입
// ========================================

export interface MediaLibraryItem extends MediaFile {
  folder_id?: ID
  tags: string[]
  usage_count: number
}

export interface MediaFolder extends BaseEntity {
  name: string
  parent_id?: ID
  color?: string
  items_count: number
}