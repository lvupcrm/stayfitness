'use client'

import { useEffect, useState } from 'react'
import { BlockRenderer } from '@/components/cms/block-renderer'
import { mockAboutPageData } from '@/lib/mock-cms-data'
import type { Page } from '@/types/cms'

export default function AboutPage() {
  const [pageData, setPageData] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Try to fetch from API first
        const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                           process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'
        
        if (!hasSupabase) {
          // Use mock data when Supabase is not configured
          console.log('🔧 Using mock CMS data for About page')
          setPageData(mockAboutPageData)
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/cms/pages/about')
        if (!response.ok) {
          throw new Error('Failed to fetch page data')
        }
        
        const result = await response.json()
        if (result.success) {
          setPageData(result.data)
        } else {
          throw new Error(result.error || 'Failed to load page')
        }
      } catch (error) {
        console.error('Error fetching about page:', error)
        // Fallback to mock data
        console.log('🔧 Falling back to mock CMS data for About page')
        setPageData(mockAboutPageData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPageData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">페이지를 찾을 수 없습니다</h1>
          <p className="text-gray-600">요청하신 페이지를 로드할 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Page Meta */}
      {pageData.meta_title && (
        <title>{pageData.meta_title}</title>
      )}
      {pageData.meta_description && (
        <meta name="description" content={pageData.meta_description} />
      )}
      
      {/* Render CMS Blocks */}
      <div className="cms-page">
        {pageData.blocks && pageData.blocks.length > 0 ? (
          pageData.blocks
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                isEditing={false}
                isHovered={false}
              />
            ))
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">콘텐츠가 없습니다</h1>
            <p className="text-gray-600">이 페이지에 표시할 콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}