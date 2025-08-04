import { createHash } from 'crypto'
import { SignJWT, jwtVerify } from 'jose'
import { supabase } from '@/lib/supabaseClient'
import type { AdminUser, AdminLoginRequest } from '@/types/admin'
import { ROLE_PERMISSIONS } from '@/types/admin'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'stay-fitness-admin-secret-key-change-in-production'
)

const JWT_EXPIRES_IN = '15m' // 15 minutes for access token
// const REFRESH_EXPIRES_IN = '7d' // 7 days for refresh token (future use)

/**
 * Hash password for admin user
 */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password + process.env.ADMIN_SALT || 'stayfitness-salt').digest('hex')
}

/**
 * Generate JWT token for admin user
 */
export async function generateAdminToken(user: AdminUser): Promise<string> {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    iat: Math.floor(Date.now() / 1000),
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)
}

/**
 * Verify and decode admin JWT token
 */
export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as AdminUser['role'],
      permissions: payload.permissions as AdminUser['permissions'],
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

/**
 * Authenticate admin user with email and password
 */
export async function authenticateAdmin(credentials: AdminLoginRequest): Promise<AdminUser | null> {
  try {
    // If no Supabase connection, skip database authentication
    if (!supabase) {
      console.log('ℹ️ Supabase not available - skipping database authentication')
      return null
    }

    const passwordHash = hashPassword(credentials.password)
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', credentials.email.toLowerCase().trim())
      .eq('password_hash', passwordHash)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      console.error('Admin authentication failed:', error)
      return null
    }

    // Get permissions based on role
    const permissions = ROLE_PERMISSIONS[data.role as AdminUser['role']] || []

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      permissions,
      profileImageUrl: data.profile_image_url,
      lastLogin: data.last_login,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

/**
 * Update admin user's last login timestamp
 */
export async function updateLastLogin(userId: string): Promise<void> {
  try {
    if (!supabase) return
    
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId)
  } catch (error) {
    console.error('Failed to update last login:', error)
  }
}

/**
 * Create admin session record for tracking
 */
export async function createAdminSession(
  userId: string, 
  token: string, 
  ipAddress?: string, 
  userAgent?: string
): Promise<void> {
  try {
    if (!supabase) return
    
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    
    await supabase
      .from('admin_sessions')
      .insert({
        admin_user_id: userId,
        token_hash: tokenHash,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString(),
        is_active: true
      })
  } catch (error) {
    console.error('Failed to create admin session:', error)
  }
}

/**
 * Invalidate admin session
 */
export async function invalidateAdminSession(token: string): Promise<void> {
  try {
    if (!supabase) return
    
    const tokenHash = createHash('sha256').update(token).digest('hex')
    
    await supabase
      .from('admin_sessions')
      .update({ is_active: false })
      .eq('token_hash', tokenHash)
  } catch (error) {
    console.error('Failed to invalidate admin session:', error)
  }
}

/**
 * Check if admin session is valid
 */
export async function isAdminSessionValid(token: string): Promise<boolean> {
  try {
    if (!supabase) return false
    
    const tokenHash = createHash('sha256').update(token).digest('hex')
    
    const { data, error } = await supabase
      .from('admin_sessions')
      .select('expires_at')
      .eq('token_hash', tokenHash)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return false
    }

    const expiresAt = new Date(data.expires_at)
    return expiresAt > new Date()
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

/**
 * Get admin user by ID
 */
export async function getAdminUser(userId: string): Promise<AdminUser | null> {
  try {
    if (!supabase) return null
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return null
    }

    const permissions = ROLE_PERMISSIONS[data.role as AdminUser['role']] || []

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      permissions,
      profileImageUrl: data.profile_image_url,
      lastLogin: data.last_login,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  } catch (error) {
    console.error('Failed to get admin user:', error)
    return null
  }
}

/**
 * Create default admin user (for initial setup)
 */
export async function createDefaultAdmin(): Promise<void> {
  try {
    if (!supabase) {
      console.log('ℹ️ Supabase not available - skipping default admin creation')
      return
    }
    
    const defaultEmail = 'admin@stayfitness.com'
    const defaultPassword = 'StayFitness2024!'
    const passwordHash = hashPassword(defaultPassword)

    // Check if admin already exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', defaultEmail)
      .single()

    if (existing) {
      console.log('Default admin already exists')
      return
    }

    // Create default admin
    const { error } = await supabase
      .from('admin_users')
      .insert({
        email: defaultEmail,
        name: 'Stay Fitness Admin',
        role: 'super_admin',
        password_hash: passwordHash,
        is_active: true
      })

    if (error) {
      console.error('Failed to create default admin:', error)
    } else {
      console.log('Default admin created successfully')
      console.log('Email:', defaultEmail)
      console.log('Password:', defaultPassword)
      console.log('⚠️  Change this password immediately after first login!')
    }
  } catch (error) {
    console.error('Error creating default admin:', error)
  }
}