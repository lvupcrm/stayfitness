import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { invalidateAdminSession } from '@/lib/admin/auth'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (token) {
      // Invalidate session in database
      await invalidateAdminSession(token)
    }

    // Clear the cookie
    cookieStore.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/admin'
    })

    return NextResponse.json({
      success: true,
      message: '로그아웃 되었습니다.'
    })

  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '로그아웃 처리 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}