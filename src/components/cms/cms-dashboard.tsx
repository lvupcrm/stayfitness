'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Page } from '@/types/cms'
import { 
  FileText, 
  Image, 
  Users, 
  BarChart3,
  Plus,
  Edit,
  Eye,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardStats {
  totalPages: number
  publishedPages: number
  draftPages: number
  totalMedia: number
  totalUsers: number
  todayViews: number
}

interface RecentPage {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  updated_at: string
  updated_by: string
}

export function CMSDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentPages, setRecentPages] = useState<RecentPage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch basic stats
      const pagesResponse = await fetch('/api/cms/pages?limit=100')
      const mediaResponse = await fetch('/api/cms/media?limit=100')
      
      const pagesData = await pagesResponse.json()
      const mediaData = await mediaResponse.json()
      
      if (pagesData.success && mediaData.success) {
        const pages = pagesData.data || []
        const publishedPages = pages.filter((p: Page) => p.status === 'published').length
        const draftPages = pages.filter((p: Page) => p.status === 'draft').length
        
        setStats({
          totalPages: pages.length,
          publishedPages,
          draftPages,
          totalMedia: mediaData.data?.length || 0,
          totalUsers: 1, // TODO: Implement user counting
          todayViews: 150 // TODO: Implement analytics
        })
        
        // Set recent pages (last 5)
        setRecentPages(pages.slice(0, 5))
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-dashed border-2 hover:border-blue-300 transition-colors">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Button asChild size="lg" className="mb-2">
              <Link href="/admin/cms/pages/new">
                <Plus className="w-5 h-5 mr-2" />
                새 페이지 만들기
              </Link>
            </Button>
            <p className="text-sm text-gray-600 text-center">
              빈 페이지에서 시작하거나 템플릿을 선택하세요
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 hover:border-green-300 transition-colors">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Button asChild size="lg" variant="outline" className="mb-2">
              <Link href="/admin/cms/media/upload">
                <Plus className="w-5 h-5 mr-2" />
                미디어 업로드
              </Link>
            </Button>
            <p className="text-sm text-gray-600 text-center">
              이미지, 동영상 등의 미디어 파일을 업로드하세요
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 hover:border-purple-300 transition-colors">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Button asChild size="lg" variant="outline" className="mb-2">
              <Link href="/admin/cms/templates">
                <Plus className="w-5 h-5 mr-2" />
                템플릿 둘러보기
              </Link>
            </Button>
            <p className="text-sm text-gray-600 text-center">
              미리 만들어진 템플릿으로 빠르게 시작하세요
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 페이지</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">
              발행: {stats?.publishedPages}, 초안: {stats?.draftPages}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">미디어 파일</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" aria-hidden alt="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMedia || 0}</div>
            <p className="text-xs text-muted-foreground">
              이미지, 동영상 등
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">관리자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              활성 사용자
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 조회수</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.todayViews || 0}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              전일 대비 +12%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              최근 수정된 페이지
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/cms/pages">
                모든 페이지 보기
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentPages.length > 0 ? (
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{page.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(page.status)}`}>
                        {page.status === 'published' ? '발행됨' : 
                         page.status === 'draft' ? '초안' : '보관됨'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(page.updated_at)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/cms/pages/${page.slug}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/${page.slug}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">아직 페이지가 없습니다</h3>
              <p className="text-gray-600 mb-4">첫 번째 페이지를 만들어보세요!</p>
              <Button asChild>
                <Link href="/admin/cms/pages/new">
                  <Plus className="w-4 h-4 mr-2" />
                  페이지 만들기
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}