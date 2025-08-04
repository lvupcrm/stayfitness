'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {
  Grid2X2,
  Monitor,
  Settings,
  BarChart3,
  FileText,
  LogOut
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/admin/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-baseline">
              <h1 className="text-3xl font-bold text-gray-900">STAY FITNESS</h1>
              <span className="ml-3 text-lg text-gray-500">관리자 대시보드</span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">관리 메뉴</h2>
            <p className="text-gray-600">STAY FITNESS 웹사이트를 관리하고 편집하세요.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* CMS */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/cms">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="w-6 h-6 mr-3 text-blue-600" />
                    콘텐츠 관리 (CMS)
                  </CardTitle>
                  <CardDescription>
                    웹사이트 페이지와 콘텐츠를 편집하고 관리합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-blue-600">
                    <span>페이지 편집하기</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Settings */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/settings">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-gray-600" />
                    시스템 설정
                  </CardTitle>
                  <CardDescription>
                    사이트 설정과 관리자 계정을 관리합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>설정 관리하기</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Analytics */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/analytics">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-green-600" />
                    사이트 분석
                  </CardTitle>
                  <CardDescription>
                    웹사이트 방문 통계와 성과를 확인합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <span>분석 보기</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Quick Access */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/admin/cms/pages/new">
                    <FileText className="w-4 h-4 mr-2" />
                    새 페이지 만들기
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/cms/pages">
                    <Monitor className="w-4 h-4 mr-2" />
                    페이지 목록 보기
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/" target="_blank">
                    <Grid2X2 className="w-4 h-4 mr-2" />
                    사이트 미리보기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}