import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, getAdminUser } from '@/lib/admin/auth'

export async function GET(_request: NextRequest) {
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

    // Get fresh user data from database
    const user = await getAdminUser(tokenUser.id)
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          error: '사용자를 찾을 수 없거나 비활성화된 계정입니다.' 
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        profileImageUrl: user.profileImageUrl,
        lastLogin: user.lastLogin,
        isActive: user.isActive
      }
    })

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