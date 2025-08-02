'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PageEditorSidebar } from './page-editor-sidebar'
import { PageCanvas } from './page-canvas'
import { PageEditorToolbar } from './page-editor-toolbar'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { Page } from '@/types/cms'

interface PageEditorProps {
  mode: 'create' | 'edit'
  slug?: string
}

export function PageEditor({ mode, slug }: PageEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  const [pageSlug, setPageSlug] = useState('')
  
  const {
    currentPage,
    setCurrentPage,
    isPreview,
    isDirty,
    resetEditor
  } = useCMSStore()

  useEffect(() => {
    if (mode === 'edit' && slug) {
      loadPage(slug)
    } else if (mode === 'create') {
      createNewPage()
    }

    return () => {
      resetEditor()
    }
  }, [mode, slug, createNewPage, loadPage, resetEditor])

  const loadPage = useCallback(async (pageSlug: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/cms/pages/${pageSlug}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('페이지를 찾을 수 없습니다')
          router.push('/admin/cms/pages')
          return
        }
        throw new Error('Failed to load page')
      }

      const result = await response.json()
      if (result.success) {
        setCurrentPage(result.data)
        setPageTitle(result.data.title)
        setPageSlug(result.data.slug)
      }
    } catch (error) {
      console.error('Error loading page:', error)
      toast.error('페이지를 불러오는데 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }, [router, setCurrentPage, setPageTitle, setPageSlug])

  const createNewPage = useCallback(() => {
    const newPage: Page = {
      id: `temp_${Date.now()}`,
      slug: '',
      title: '새 페이지',
      description: '',
      status: 'draft',
      template: 'default',
      blocks: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: '',
      updated_by: '',
      version_number: 1
    }
    
    setCurrentPage(newPage)
    setPageTitle(newPage.title)
    setPageSlug('')
  }, [setCurrentPage, setPageTitle, setPageSlug])

  const handleSaveAndContinue = async () => {
    if (!currentPage) return

    try {
      if (mode === 'create') {
        // Generate slug from title if not set
        const slugToUse = pageSlug || pageTitle
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim()

        if (!slugToUse) {
          toast.error('페이지 제목을 입력해주세요')
          return
        }

        const response = await fetch('/api/cms/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: slugToUse,
            title: pageTitle,
            description: currentPage.description,
            status: 'draft',
            blocks: currentPage.blocks
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to create page')
        }

        const result = await response.json()
        setCurrentPage(result.data)
        toast.success('페이지가 생성되었습니다')
        
        // Redirect to edit mode
        router.push(`/admin/cms/pages/${slugToUse}/edit`)
      } else {
        // Update existing page
        await useCMSStore.getState().savePage()
        toast.success('페이지가 저장되었습니다')
      }
    } catch (error: unknown) {
      console.error('Error saving page:', error)
      toast.error((error as Error)?.message || '저장에 실패했습니다')
    }
  }

  const handlePublish = async () => {
    try {
      await useCMSStore.getState().publishPage()
      toast.success('페이지가 발행되었습니다')
    } catch (error) {
      console.error('Error publishing page:', error)
      toast.error('발행에 실패했습니다')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">페이지를 불러올 수 없습니다</h3>
          <button 
            onClick={() => router.push('/admin/cms/pages')}
            className="text-blue-600 hover:text-blue-700"
          >
            페이지 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Toolbar */}
        <PageEditorToolbar
          mode={mode}
          pageTitle={pageTitle}
          pageSlug={pageSlug}
          onTitleChange={setPageTitle}
          onSlugChange={setPageSlug}
          onSave={handleSaveAndContinue}
          onPublish={handlePublish}
          canSave={mode === 'create' ? !!pageTitle : isDirty}
        />

        {/* Main Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          {!isPreview && (
            <PageEditorSidebar />
          )}

          {/* Canvas */}
          <div className="flex-1 overflow-auto">
            <PageCanvas />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}