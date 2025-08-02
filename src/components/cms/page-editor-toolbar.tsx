'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Globe, 
  Settings,
  Undo,
  Redo,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCMSStore } from '@/hooks/useCMSStore'

interface PageEditorToolbarProps {
  mode: 'create' | 'edit'
  pageTitle: string
  pageSlug: string
  onTitleChange: (title: string) => void
  onSlugChange: (slug: string) => void
  onSave: () => Promise<void>
  onPublish: () => Promise<void>
  canSave: boolean
}

export function PageEditorToolbar({
  mode,
  pageTitle,
  pageSlug,
  onTitleChange,
  onSlugChange,
  onSave,
  onPublish,
  canSave
}: PageEditorToolbarProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const {
    currentPage,
    isPreview,
    togglePreview,
    undo,
    redo,
    canUndo,
    canRedo
  } = useCMSStore()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave()
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      await onPublish()
    } finally {
      setIsPublishing(false)
    }
  }

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    onTitleChange(value)
    // Auto-generate slug for new pages
    if (mode === 'create' && !pageSlug) {
      onSlugChange(generateSlugFromTitle(value))
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/cms/pages')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>

          <div className="h-6 w-px bg-gray-300" />

          {/* Page Info */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <Input
                value={pageTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="페이지 제목"
                className="font-medium text-lg border-none p-0 h-auto focus:ring-0 shadow-none"
              />
              {mode === 'create' && (
                <Input
                  value={pageSlug}
                  onChange={(e) => onSlugChange(e.target.value)}
                  placeholder="페이지 URL (예: about-us)"
                  className="text-sm text-gray-600 border-none p-0 h-auto focus:ring-0 shadow-none mt-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* Center Section - Editor Controls */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo()}
              className="p-2"
              title="실행 취소 (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo()}
              className="p-2"
              title="다시 실행 (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          {/* Device Preview */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="p-2" title="데스크톱 미리보기">
              <Monitor className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" title="태블릿 미리보기">
              <Tablet className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2" title="모바일 미리보기">
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview Toggle */}
          <Button
            onClick={togglePreview}
            variant={isPreview ? "default" : "outline"}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? '편집' : '미리보기'}</span>
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Page Settings */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!canSave || isSaving}
            size="sm"
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? '저장 중...' : '저장'}</span>
          </Button>

          {/* Publish Button */}
          {mode === 'edit' && currentPage && (
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>
                {isPublishing ? '발행 중...' : 
                 currentPage.status === 'published' ? '업데이트' : '발행'}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Page Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-medium text-gray-900 mb-3">페이지 설정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메타 제목
              </label>
              <Input
                placeholder="SEO용 페이지 제목"
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메타 설명
              </label>
              <Input
                placeholder="검색 결과에 표시될 설명"
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                템플릿
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="default">기본 템플릿</option>
                <option value="landing">랜딩 페이지</option>
                <option value="blog">블로그 포스트</option>
                <option value="about">소개 페이지</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="draft">초안</option>
                <option value="published">발행됨</option>
                <option value="archived">보관됨</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}