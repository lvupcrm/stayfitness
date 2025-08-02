import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { 
  authenticateAdmin, 
  generateAdminToken, 
  updateLastLogin, 
  createAdminSession 
} from '@/lib/admin/auth'
import type { AdminLoginRequest } from '@/types/admin'

export async function POST(request: NextRequest) {
  try {
    const body: AdminLoginRequest = await request.json()
    
    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false, 
          error: '이메일과 비밀번호를 입력해주세요.' 
        },
        { status: 400 }
      )
    }

    // Authenticate admin user
    const user = await authenticateAdmin(body)
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: '이메일 또는 비밀번호가 올바르지 않습니다.' 
        },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await generateAdminToken(user)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Update last login
    await updateLastLogin(user.id)

    // Create session record
    const ipAddress = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    await createAdminSession(user.id, token, ipAddress, userAgent)

    // Set HTTP-only cookie
    const cookieStore = cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/admin'
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
          isActive: user.isActive
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