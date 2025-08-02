import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { generateAdminToken } from '@/lib/admin/auth'
import type { AdminPermission } from '@/types/admin'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const password = formData.get('password') as string

    if (!password) {
      return NextResponse.redirect(
        new URL('/cms-auth?error=패스워드를 입력해주세요.', request.url)
      )
    }

    // Simple password validation
    const validPasswords = ['StayFitness', 'StayFitness2024!']
    
    if (!validPasswords.includes(password)) {
      return NextResponse.redirect(
        new URL('/cms-auth?error=패스워드가 올바르지 않습니다.', request.url)
      )
    }

    // Create mock user data for CMS access
    const userData = {
      id: 'cms-user',
      email: 'admin@stayfitness.com',
      name: 'CMS 사용자',
      role: 'admin' as const,
      permissions: ['read_consultations', 'manage_consultations', 'read_trainers', 'manage_trainers', 'hire_trainers', 'read_users', 'read_analytics', 'export_data'] as AdminPermission[],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Generate JWT token
    const token = await generateAdminToken(userData)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    // Redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url))

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.redirect(
      new URL('/cms-auth?error=로그인 처리 중 오류가 발생했습니다.', request.url)
    )
  }
}