'use client'

import { useState, useEffect } from 'react'
import { Edit3, Eye, Save, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'

interface LiveEditToggleProps {
  isEditing: boolean
  onToggleEdit: () => void
  onSave?: () => void
  hasUnsavedChanges?: boolean
  isSaving?: boolean
}

export function LiveEditToggle({ 
  isEditing, 
  onToggleEdit, 
  onSave,
  hasUnsavedChanges = false,
  isSaving = false
}: LiveEditToggleProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show toggle when user is admin or in development
    const checkAdmin = () => {
      // Check for admin cookie or development environment
      const isDev = process.env.NODE_ENV === 'development'
      const hasAdminAccess = document.cookie.includes('cms-admin=true')
      setIsVisible(isDev || hasAdminAccess)
    }

    checkAdmin()
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center space-x-2">
        {/* Edit Mode Toggle */}
        <Button
          onClick={onToggleEdit}
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <>
              <Eye className="w-4 h-4" />
              <span>미리보기</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span>편집</span>
            </>
          )}
        </Button>

        {/* Save Button (only show when editing and there are changes) */}
        {isEditing && hasUnsavedChanges && onSave && (
          <Button
            onClick={onSave}
            disabled={isSaving}
            size="sm"
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>저장</span>
              </>
            )}
          </Button>
        )}

        {/* Admin Panel Link */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="p-2"
          title="CMS 관리자 패널"
        >
          <a href="/admin/cms" target="_blank" rel="noopener noreferrer">
            <Settings className="w-4 h-4" />
          </a>
        </Button>

        {/* Status Indicator */}
        {isEditing && (
          <div className="flex items-center space-x-2 text-xs text-gray-600 ml-2">
            {isSaving ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>저장 중</span>
              </div>
            ) : hasUnsavedChanges ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>미저장</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>저장됨</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}