'use client'

/**
 * 글로벌 로딩 상태 관리 프로바이더
 * 애플리케이션 전체의 로딩 상태를 중앙에서 관리합니다.
 */

import { createContext, useContext, type ReactNode } from 'react'
import { useLoading, type UseLoadingReturn } from '@/hooks/useLoading'

interface LoadingContextType extends UseLoadingReturn {
  /** 전역 로딩 오버레이 표시 */
  showGlobalLoading: (message?: string) => void
  /** 전역 로딩 오버레이 숨김 */
  hideGlobalLoading: () => void
  /** 현재 글로벌 로딩 메시지 */
  globalLoadingMessage?: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const loading = useLoading()

  const showGlobalLoading = (message = '처리 중...') => {
    loading.startLoading('__global__')
    // 메시지는 추후 상태로 관리 가능
  }

  const hideGlobalLoading = () => {
    loading.stopLoading('__global__')
  }

  const value: LoadingContextType = {
    ...loading,
    showGlobalLoading,
    hideGlobalLoading,
    globalLoadingMessage: loading.isLoadingKey('__global__') ? '처리 중...' : undefined,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {/* 글로벌 로딩 오버레이 */}
      {loading.isLoadingKey('__global__') && <GlobalLoadingOverlay />}
    </LoadingContext.Provider>
  )
}

/**
 * 로딩 컨텍스트 사용 훅
 */
export function useGlobalLoading(): LoadingContextType {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a LoadingProvider')
  }
  return context
}

/**
 * 글로벌 로딩 오버레이 컴포넌트
 */
function GlobalLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="loading-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          <span className="text-gray-700 dark:text-gray-300">처리 중...</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 로딩 상태를 위한 편의 훅들
 */

// API 호출 로딩 관리
export function useApiLoading() {
  const { withLoading, isLoadingKey } = useGlobalLoading()
  
  return {
    withApiLoading: function<T>(key: string, apiFn: () => Promise<T>) {
      return withLoading(`api_${key}`, apiFn)
    },
    isApiLoading: (key: string) => isLoadingKey(`api_${key}`),
  }
}

// 폼 제출 로딩 관리
export function useFormLoading() {
  const { withLoading, isLoadingKey } = useGlobalLoading()
  
  return {
    withFormLoading: function<T>(formId: string, submitFn: () => Promise<T>) {
      return withLoading(`form_${formId}`, submitFn)
    },
    isFormLoading: (formId: string) => isLoadingKey(`form_${formId}`),
  }
}

// 페이지 로딩 관리
export function usePageLoading() {
  const { startLoading, stopLoading, isLoadingKey } = useGlobalLoading()
  
  return {
    startPageLoading: (page: string) => startLoading(`page_${page}`),
    stopPageLoading: (page: string) => stopLoading(`page_${page}`),
    isPageLoading: (page: string) => isLoadingKey(`page_${page}`),
  }
}