import { Suspense } from 'react'
import { CMSSidebar } from '@/components/cms/cms-sidebar'
import { CMSHeader } from '@/components/cms/cms-header'
import { CMSInitializer } from '@/components/cms/cms-initializer'

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CMSInitializer />
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
  )
}