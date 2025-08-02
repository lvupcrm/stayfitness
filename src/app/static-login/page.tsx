import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/admin/auth'

export default async function StaticLoginPage() {
  // Check if already authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  
  if (token) {
    try {
      const user = await verifyAdminToken(token)
      if (user) {
        redirect('/admin')
      }
    } catch (error) {
      // Token invalid, continue to login
    }
  }

  // Redirect to static HTML page
  redirect('/admin-login.html')
}