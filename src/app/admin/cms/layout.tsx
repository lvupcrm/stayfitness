import { Suspense } from 'react'
import { AdminProtectedRoute } from '@/components/admin/admin-protected-route'
import { CMSSidebar } from '@/components/cms/cms-sidebar'
import { CMSHeader } from '@/components/cms/cms-header'

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <CMSHeader />
        <div className="flex">
          <CMSSidebar />
          <main className="flex-1 lg:ml-64">
            <div className="p-6">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }>
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </AdminProtectedRoute>
  )
}