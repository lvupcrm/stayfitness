import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/admin/auth'
import type { AdminPermission } from '@/types/admin'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          error: '인증 토큰이 없습니다.' 
        },
        { status: 401 }
      )
    }

    // Verify JWT token
    const tokenUser = await verifyAdminToken(token)
    
    if (!tokenUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: '유효하지 않은 토큰입니다.' 
        },
        { status: 401 }
      )
    }

    // Return mock user data for simple auth (same as login)
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

    // Set response headers for no-cache to prevent stale auth state
    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    })

    return NextResponse.json(
      {
        success: true,
        data: {
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
        }
      },
      { headers }
    )

  } catch (error) {
    console.error('Admin token verification error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '토큰 검증 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}