'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'
import { BlockRenderer } from '@/components/cms/block-renderer'
import { SectionLoading } from '@/components/loading/section-loading'
import { mockPageData } from '@/lib/mock-cms-data'
import type { Page } from '@/types/cms'
import './home-page.css'

export function HomePage() {
  const pathname = usePathname()
  const [pageData, setPageData] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  useEffect(() => {
    const loadPageData = async () => {
      try {
        // Check if Supabase is available
        const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'

        if (hasSupabase) {
          // Use real API
          const response = await fetch('/api/cms/pages/home')
          if (response.ok) {
            const result = await response.json()
            if (result.success) {
              setPageData(result.data)
            } else {
              // Fallback to mock data
              setPageData(mockPageData)
            }
          } else {
            // Fallback to mock data
            setPageData(mockPageData)
          }
        } else {
          // Use mock data for development
          setPageData(mockPageData)
          console.log('✅ Using mock CMS data for homepage')
        }
      } catch (error) {
        console.error('Error loading page data:', error)
        // Fallback to mock data
        setPageData(mockPageData)
      } finally {
        setIsLoading(false)
      }
    }

    loadPageData()
  }, [])

  
  if (isLoading) {
    return (
      <div className="modern-home-loading">
        <SectionLoading />
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="modern-home-error">
        <div className="error-content">
          <h2>페이지를 불러올 수 없습니다</h2>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="modern-home-container">
      {/* Render blocks from CMS data */}
      {pageData.blocks
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing={false}
            isHovered={false}
            onUpdate={() => {}} // No editing allowed on homepage
          />
        ))}
    </div>
  )
}