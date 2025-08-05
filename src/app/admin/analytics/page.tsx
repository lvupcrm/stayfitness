'use client'

import { Card } from '@/components/ui/card'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">분석</h1>
        <p className="text-gray-500 mt-2">비즈니스 분석 및 통계</p>
      </div>
      
      <Card className="p-8">
        <div className="text-center text-gray-500">
          <p className="text-lg">분석 기능은 현재 개발 중입니다.</p>
          <p className="text-sm mt-2">곧 제공될 예정입니다.</p>
        </div>
      </Card>
    </div>
  )
}