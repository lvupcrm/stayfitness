import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { 
  generateAdminToken
} from '@/lib/admin/auth'
import type { AdminLoginRequest, AdminPermission } from '@/types/admin'

export async function POST(request: NextRequest) {
  try {
    const body: AdminLoginRequest = await request.json()
    
    // Validate input
    if (!body.password) {
      return NextResponse.json(
        { 
          success: false, 
          error: '패스워드를 입력해주세요.' 
        },
        { status: 400 }
      )
    }

    // Simple password authentication
    const validPasswords = ['StayFitness', 'StayFitness2024!']
    
    if (!validPasswords.includes(body.password)) {
      return NextResponse.json(
        { 
          success: false, 
          error: '패스워드가 올바르지 않습니다.' 
        },
        { status: 401 }
      )
    }

    // Create a mock user for simple auth
    const user = {
      id: 'cms-user',
      email: 'admin@stayfitness.com',
      name: 'CMS 사용자',
      role: 'admin' as const,
      permissions: ['read_consultations', 'manage_consultations', 'read_trainers', 'manage_trainers', 'hire_trainers', 'read_users', 'read_analytics', 'export_data'] as AdminPermission[],
      profileImageUrl: undefined,
      lastLogin: new Date().toISOString(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Generate JWT token
    const token = await generateAdminToken(user)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours for convenience

    // Skip database operations for simple auth
    // await updateLastLogin(user.id)
    // await createAdminSession(user.id, token, ipAddress, userAgent)

    // Set HTTP-only cookie with extended session
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return NextResponse.json({
      success: true,
      message: '로그인 성공',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions,
          profileImageUrl: user.profileImageUrl,
          lastLogin: user.lastLogin,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        expiresAt: expiresAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '로그인 처리 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}