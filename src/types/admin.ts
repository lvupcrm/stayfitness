// Admin system types for Stay Fitness

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: AdminPermission[]
  profileImageUrl?: string
  lastLogin?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'viewer'

export type AdminPermission = 
  | 'read_consultations' | 'manage_consultations'
  | 'read_trainers' | 'manage_trainers' | 'hire_trainers'
  | 'read_users' | 'manage_users' | 'manage_permissions'
  | 'read_analytics' | 'export_data'
  | 'manage_settings' | 'view_audit_logs'

export interface AdminSession {
  user: AdminUser
  token: string
  expiresAt: string
  permissions: AdminPermission[]
}

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface AdminLoginResponse {
  success: boolean
  data?: {
    user: AdminUser
    token: string
    expiresAt: string
  }
  error?: string
}

// Consultation management types
export interface ConsultationWithAdmin {
  id: string
  name: string
  phone: string
  email: string
  consultationType: string
  preferredTime: string
  message?: string
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
  adminNotes?: string
  assignedTo?: string
  assignedToName?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  followUpDate?: string
  createdAt: string
  updatedAt?: string
  updatedBy?: string
}

// Trainer application management types
export interface TrainerApplicationWithAdmin {
  id: string
  name: string
  phone: string
  email: string
  experienceLevel: string
  specializations: string[]
  certifications?: string
  introduction: string
  motivation: string
  availableTimes: string[]
  portfolioUrl?: string
  workStyle: string
  status: 'pending' | 'reviewing' | 'interview_scheduled' | 'interview_completed' | 'hired' | 'rejected' | 'talent_pool'
  applicationType: 'direct' | 'talent_pool'
  adminNotes?: string
  reviewedBy?: string
  reviewedByName?: string
  interviewDate?: string
  interviewNotes?: string
  rating?: number
  createdAt: string
  updatedAt?: string
  updatedBy?: string
}

// Dashboard statistics
export interface DashboardStats {
  consultations: {
    total: number
    pending: number
    thisWeek: number
    conversionRate: number
  }
  trainers: {
    applications: number
    pending: number
    hired: number
    talentPool: number
  }
  users: {
    totalMembers: number
    newThisMonth: number
    activeUsers: number
  }
  revenue?: {
    thisMonth: number
    lastMonth: number
    growthRate: number
  }
}

// API Response types
export interface AdminApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: PaginationInfo
  meta?: Record<string, unknown>
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Role-Permission Matrix
export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    'read_consultations', 'manage_consultations',
    'read_trainers', 'manage_trainers', 'hire_trainers',
    'read_users', 'manage_users', 'manage_permissions',
    'read_analytics', 'export_data',
    'manage_settings', 'view_audit_logs'
  ],
  admin: [
    'read_consultations', 'manage_consultations',
    'read_trainers', 'manage_trainers', 'hire_trainers',
    'read_users', 'read_analytics', 'export_data'
  ],
  manager: [
    'read_consultations', 'manage_consultations',
    'read_trainers', 'manage_trainers',
    'read_analytics'
  ],
  viewer: [
    'read_consultations', 'read_trainers', 'read_analytics'
  ]
}

// Check if user has specific permission
export function hasPermission(user: AdminUser, permission: AdminPermission): boolean {
  return user.permissions.includes(permission) || user.role === 'super_admin'
}

// Check if user has any of the specified permissions
export function hasAnyPermission(user: AdminUser, permissions: AdminPermission[]): boolean {
  return user.role === 'super_admin' || permissions.some(permission => user.permissions.includes(permission))
}