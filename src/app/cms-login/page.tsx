import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken } from '@/lib/admin/auth'
import LoginForm from './LoginForm'

export default async function CmsLoginPage() {
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

  return <LoginForm />
}