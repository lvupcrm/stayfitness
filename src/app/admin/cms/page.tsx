import { Suspense } from 'react'
import { CMSDashboard } from '@/components/cms/cms-dashboard'

export default function CMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CMS 대시보드</h1>
        <p className="text-gray-600">
          스테이피트니스 웹사이트를 쉽게 관리하고 편집하세요
        </p>
      </div>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      }>
        <CMSDashboard />
      </Suspense>
    </div>
  )
}