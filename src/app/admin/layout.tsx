import { Metadata } from 'next'
import AdminLayout from '@/components/admin/layout/AdminLayout'

export const metadata: Metadata = {
  title: 'Stay Fitness Admin',
  description: 'Stay Fitness 관리자 페이지',
  robots: 'noindex, nofollow', // Prevent indexing of admin pages
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}