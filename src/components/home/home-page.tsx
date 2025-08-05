'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'
import { BlockRenderer } from '@/components/cms/block-renderer'
import { SectionLoading } from '@/components/loading/section-loading'
import { LiveEditToggle } from '@/components/cms/live-edit-toggle'
import { useCMSAutoSave } from '@/hooks/useCMSAutoSave'
import { mockPageData } from '@/lib/mock-cms-data'
import type { Page, ContentBlock } from '@/types/cms'

export function HomePage() {
  const pathname = usePathname()
  const [pageData, setPageData] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Auto-save functionality for live editing
  const { saveNow, isSaving, hasUnsavedChanges } = useCMSAutoSave({
    page: pageData,
    enabled: isEditing && !!pageData,
    onSaveSuccess: (savedPage) => {
      setPageData(savedPage)
    },
    onSaveError: (error) => {
      console.error('Live editing auto-save error:', error)
    }
  })
  
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

  // Handle block updates for live editing
  const handleBlockUpdate = (blockId: string, updates: Partial<ContentBlock>) => {
    if (!pageData) return

    const updatedBlocks = pageData.blocks.map(block => 
      block.id === blockId 
        ? { ...block, ...updates, updated_at: new Date().toISOString() }
        : block
    )

    const updatedPage = {
      ...pageData,
      blocks: updatedBlocks,
      updated_at: new Date().toISOString()
    }

    setPageData(updatedPage)
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SectionLoading />
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h2>
          <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Render blocks from CMS data */}
      {pageData.blocks
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing={isEditing}
            isHovered={false}
            onUpdate={(updates) => handleBlockUpdate(block.id, updates)}
          />
        ))}

      {/* Live Edit Toggle */}
      <LiveEditToggle
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onSave={saveNow}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
      />
    </div>
  )
}