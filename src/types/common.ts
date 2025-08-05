/**
 * 공통 타입 정의
 * 전체 애플리케이션에서 공통으로 사용되는 기본 타입들을 정의합니다.
 */

// ========================================
// 기본 데이터 타입
// ========================================

export type ID = string | number

export interface Timestamps {
  created_at: string
  updated_at: string
}

export interface BaseEntity extends Timestamps {
  id: ID
}

// ========================================
// API 응답 타입
// ========================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
    hasNext?: boolean
    hasPrev?: boolean
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// ========================================
// 폼 관련 타입
// ========================================

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file'
  required?: boolean
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

export interface FormState<T = Record<string, any>> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
}

// ========================================
// 상태 관리 타입
// ========================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T = any> {
  status: LoadingState
  data: T | null
  error: string | null
}

export interface ListState<T = any> extends AsyncState<T[]> {
  isLoading: boolean
  isEmpty: boolean
  hasMore: boolean
  total: number
}

// ========================================
// 이벤트 타입
// ========================================

export type EventHandler<T = any> = (data: T) => void | Promise<void>

export interface EventMap {
  [key: string]: any
}

// ========================================
// 유틸리티 타입
// ========================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

// ========================================
// 컴포넌트 props 타입
// ========================================

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// ========================================
// 미디어 타입
// ========================================

export interface MediaFile {
  id: ID
  name: string
  url: string
  type: 'image' | 'video' | 'audio' | 'document'
  mimeType: string
  size: number
  alt?: string
  caption?: string
}

export interface ImageAsset extends MediaFile {
  type: 'image'
  width: number
  height: number
  aspectRatio: number
  thumbnailUrl?: string
}

// ========================================
// 검색 및 필터링 타입
// ========================================

export interface SearchParams {
  q?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  [key: string]: any
}

export interface FilterOption {
  key: string
  label: string
  value: any
  count?: number
}

export interface SortOption {
  key: string
  label: string
  field: string
  order: 'asc' | 'desc'
}

// ========================================
// 권한 및 역할 타입
// ========================================

export type Permission = string

export interface Role {
  id: ID
  name: string
  label: string
  permissions: Permission[]
}

export interface User {
  id: ID
  email: string
  name: string
  avatar?: string
  role: string
  permissions: Permission[]
  isActive: boolean
  lastLoginAt?: string
}

// ========================================
// 설정 타입  
// ========================================

export interface AppSettings {
  siteName: string
  siteDescription: string
  logoUrl?: string
  faviconUrl?: string
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
  dateFormat: string
  [key: string]: any
}

// ========================================
// 지리적 정보 타입
// ========================================

export interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
  country?: string
  postalCode?: string
}

// ========================================
// 연락처 정보 타입
// ========================================

export interface ContactInfo {
  name: string
  email?: string
  phone?: string
  message?: string
  subject?: string
  createdAt?: string
}