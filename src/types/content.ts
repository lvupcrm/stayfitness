export interface PageSection {
  id: string
  type: 'hero' | 'features' | 'testimonials' | 'pricing' | 'contact' | 'custom'
  title: string
  subtitle?: string
  content: string
  imageUrl?: string
  backgroundColor?: string
  textColor?: string
  order: number
  isVisible: boolean
  updatedAt: string
}

export interface PageContentBlock {
  id: string
  type: 'text' | 'image' | 'video' | 'button' | 'form'
  content: string
  settings: {
    alignment?: 'left' | 'center' | 'right'
    size?: 'small' | 'medium' | 'large'
    style?: 'default' | 'primary' | 'secondary'
    width?: string
    height?: string
    padding?: string
    margin?: string
    [key: string]: string | number | boolean | undefined
  }
  parentId: string // section or block id
  order: number
  isVisible: boolean
  updatedAt: string
}

export interface PageContent {
  id: string
  title: string
  description?: string
  metaTitle?: string
  metaDescription?: string
  sections: PageSection[]
  blocks: PageContentBlock[]
  isPublished: boolean
  publishedAt?: string
  updatedAt: string
}

export interface ContentUpdate {
  id: string
  changes: Partial<PageSection | PageContentBlock>
}

export interface ContentVersion {
  id: string
  contentId: string
  type: 'section' | 'block'
  data: PageSection | PageContentBlock
  createdAt: string
  createdBy: string
}

export type ContentAction = 
  | { type: 'ADD_SECTION'; section: Omit<PageSection, 'id'> }
  | { type: 'UPDATE_SECTION'; id: string; changes: Partial<PageSection> }
  | { type: 'DELETE_SECTION'; id: string }
  | { type: 'REORDER_SECTIONS'; ids: string[] }
  | { type: 'ADD_BLOCK'; block: Omit<PageContentBlock, 'id'> }
  | { type: 'UPDATE_BLOCK'; id: string; changes: Partial<PageContentBlock> }
  | { type: 'DELETE_BLOCK'; id: string }
  | { type: 'REORDER_BLOCKS'; ids: string[] }