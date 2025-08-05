'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import type { Page } from '@/types/cms'
import { apiClient } from '@/lib/api-client'
import { showToast } from '@/lib/toast'

interface UseCMSAutoSaveOptions {
  page: Page | null
  enabled?: boolean
  delay?: number
  onSaveSuccess?: (savedPage: Page) => void
  onSaveError?: (error: string) => void
}

export function useCMSAutoSave({
  page,
  enabled = true,
  delay = 2000,
  onSaveSuccess,
  onSaveError
}: UseCMSAutoSaveOptions) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastSavedRef = useRef<string>('')
  const isSavingRef = useRef(false)

  // Debounced page data
  const debouncedPage = useDebounce(page, delay)

  // Custom hook for debouncing values
  function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  const savePage = useCallback(async (pageToSave: Page) => {
    if (isSavingRef.current || !pageToSave) return

    try {
      isSavingRef.current = true
      
      // Check if Supabase is available
      const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                          process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'

      if (hasSupabase) {
        // Use real API
        const response = await apiClient.put(`/api/cms/pages/${pageToSave.slug}`, pageToSave)
        
        if (response.success && response.data) {
          lastSavedRef.current = JSON.stringify(response.data)
          onSaveSuccess?.(response.data)
          showToast.success('변경사항이 저장되었습니다')
        } else {
          throw new Error(response.error || '저장에 실패했습니다')
        }
      } else {
        // Mock save for development
        await new Promise(resolve => setTimeout(resolve, 500))
        const savedPage = {
          ...pageToSave,
          updated_at: new Date().toISOString(),
          version_number: pageToSave.version_number + 1
        }
        lastSavedRef.current = JSON.stringify(savedPage)
        onSaveSuccess?.(savedPage)
        console.log('✅ Mock CMS auto-save completed:', savedPage.title)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '저장 중 오류가 발생했습니다'
      onSaveError?.(errorMessage)
      showToast.error(errorMessage)
      console.error('CMS auto-save error:', error)
    } finally {
      isSavingRef.current = false
    }
  }, [onSaveSuccess, onSaveError])

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !debouncedPage) return

    const currentPageString = JSON.stringify(debouncedPage)
    
    // Skip if data hasn't changed
    if (currentPageString === lastSavedRef.current) return

    // Skip initial load
    if (lastSavedRef.current === '') {
      lastSavedRef.current = currentPageString
      return
    }

    savePage(debouncedPage)
  }, [debouncedPage, enabled, savePage])

  // Manual save function
  const saveNow = useCallback(async () => {
    if (page) {
      await savePage(page)
    }
  }, [page, savePage])

  // Check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    if (!page) return false
    return JSON.stringify(page) !== lastSavedRef.current
  }, [page])

  return {
    saveNow,
    isSaving: isSavingRef.current,
    hasUnsavedChanges: hasUnsavedChanges()
  }
}

