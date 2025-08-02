import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'stay-fitness-admin-secret-key-2024'
)

// Admin routes that require authentication
const ADMIN_ROUTES = [
  '/admin',
  '/admin/consultations',
  '/admin/trainers',
  '/admin/users',
  '/admin/analytics',
  '/admin/settings'
]

// Public admin routes (no auth required)
const ADMIN_PUBLIC_ROUTES = [
  '/admin/login'
]

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only handle admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow public admin routes
  if (ADMIN_PUBLIC_ROUTES.some(route => pathname === route)) {
    return NextResponse.next()
  }

  // Check if this is a protected admin route
  const isProtectedRoute = ADMIN_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get the admin token from cookies
  const adminToken = request.cookies.get('admin-token')?.value

  if (!adminToken) {
    // Redirect to admin login if no token
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify the admin token
  const adminUser = await verifyAdminToken(adminToken)

  if (!adminUser) {
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('admin-token')
    return response
  }

  // Check if token is expired
  if (adminUser.exp && typeof adminUser.exp === 'number' && Date.now() >= adminUser.exp * 1000) {
    // Clear expired token and redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('admin-token')
    return response
  }

  // Add admin user info to request headers for API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-admin-user', JSON.stringify({
    id: adminUser.id,
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role
  }))

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    /*
     * Match all admin routes except:
     * - api routes (handled separately)
     * - static files
     * - image optimization files
     */
    '/admin/:path*'
  ]
}