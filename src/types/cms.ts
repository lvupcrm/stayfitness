// CMS 콘텐츠 관리 시스템 타입 정의

export interface ContentBlock {
  id: string
  type: 'text' | 'image' | 'video' | 'button' | 'section' | 'hero' | 'card' | 'testimonial'
  order: number
  data: ContentBlockData
  styles?: ContentBlockStyles
  created_at: string
  updated_at: string
}

export interface ContentBlockData {
  // Text Block
  text?: {
    content: string
    heading?: string
    subheading?: string
    alignment?: 'left' | 'center' | 'right'
  }
  
  // Image Block
  image?: {
    url: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }
  
  // Video Block
  video?: {
    url: string
    thumbnail?: string
    autoplay?: boolean
    controls?: boolean
  }
  
  // Button Block
  button?: {
    text: string
    url: string
    variant: 'primary' | 'secondary' | 'outline'
    size: 'sm' | 'md' | 'lg'
    external?: boolean
  }
  
  // Hero Section
  hero?: {
    title: string
    subtitle?: string
    backgroundImage?: string
    backgroundVideo?: string
    ctaButton?: {
      text: string
      url: string
    }
  }
  
  // Card Block
  card?: {
    title: string
    description: string
    image?: string
    link?: string
    icon?: string
  }
  
  // Testimonial Block
  testimonial?: {
    content: string
    author: string
    position?: string
    avatar?: string
    rating?: number
  }
}

export interface ContentBlockStyles {
  backgroundColor?: string
  textColor?: string
  padding?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  margin?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  borderRadius?: number
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

export interface Page {
  id: string
  slug: string
  title: string
  description?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  status: 'draft' | 'published' | 'archived'
  template?: 'default' | 'landing' | 'blog' | 'about'
  blocks: ContentBlock[]
  published_at?: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}

export interface MediaFile {
  id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  url: string
  alt_text?: string
  caption?: string
  width?: number
  height?: number
  folder?: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface ContentTemplate {
  id: string
  name: string
  description?: string
  preview_image?: string
  category: 'landing' | 'about' | 'service' | 'contact' | 'blog'
  blocks: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>[]
  is_system: boolean
  created_at: string
  updated_at: string
}

export interface ContentVersion {
  id: string
  page_id: string
  version_number: number
  title: string
  blocks: ContentBlock[]
  created_by: string
  created_at: string
  notes?: string
}

// CMS 설정 및 글로벌 콘텐츠
export interface SiteSettings {
  id: string
  site_name: string
  site_description: string
  logo_url?: string
  favicon_url?: string
  primary_color: string
  secondary_color: string
  font_family: string
  contact_info: {
    phone?: string
    email?: string
    address?: string
    social_links?: {
      facebook?: string
      instagram?: string
      youtube?: string
      kakao?: string
    }
  }
  seo: {
    google_analytics_id?: string
    google_tag_manager_id?: string
    meta_title: string
    meta_description: string
    meta_keywords: string[]
    og_image?: string
  }
  updated_at: string
  updated_by: string
}

// API 응답 타입
export interface ContentAPIResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// CMS 편집기 상태
export interface EditorState {
  selectedBlock?: string
  selectedPage?: string
  isEditing: boolean
  isPreview: boolean
  isDirty: boolean
  clipboard?: ContentBlock
}

export interface BlockDragItem {
  id: string
  type: ContentBlock['type']
  data: ContentBlockData
  styles?: ContentBlockStyles
}

// 콘텐츠 편집 권한
export interface ContentPermission {
  user_id: string
  page_id?: string
  role: 'viewer' | 'editor' | 'admin'
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    publish: boolean
    manage_media: boolean
    manage_users: boolean
  }
  granted_by: string
  granted_at: string
}