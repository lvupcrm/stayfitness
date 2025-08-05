/**
 * 로딩 상태 관리를 위한 통합 훅
 * 여러 로딩 상태를 효율적으로 관리합니다.
 */

import { useState, useCallback, useRef, useEffect } from 'react'

export interface LoadingState {
  [key: string]: boolean
}

export interface UseLoadingReturn {
  /** 개별 로딩 상태 */
  loading: LoadingState
  /** 전체 로딩 여부 */
  isLoading: boolean
  /** 특정 키의 로딩 상태 확인 */
  isLoadingKey: (key: string) => boolean
  /** 로딩 시작 */
  startLoading: (key: string) => void
  /** 로딩 종료 */
  stopLoading: (key: string) => void
  /** 모든 로딩 종료 */
  stopAllLoading: () => void
  /** 로딩 상태 토글 */
  toggleLoading: (key: string) => void
  /** 비동기 작업과 함께 로딩 관리 */
  withLoading: <T>(key: string, asyncFn: () => Promise<T>) => Promise<T>
}

/**
 * 로딩 상태 관리 훅
 */
export function useLoading(initialState: LoadingState = {}): UseLoadingReturn {
  const [loading, setLoading] = useState<LoadingState>(initialState)
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current.clear()
    }
  }, [])

  const startLoading = useCallback((key: string) => {
    // 기존 타이머가 있다면 취소
    const existingTimeout = timeoutsRef.current.get(key)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
      timeoutsRef.current.delete(key)
    }

    setLoading(prev => ({ ...prev, [key]: true }))
  }, [])

  const stopLoading = useCallback((key: string) => {
    // 기존 타이머가 있다면 취소
    const existingTimeout = timeoutsRef.current.get(key)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
      timeoutsRef.current.delete(key)
    }

    setLoading(prev => ({ ...prev, [key]: false }))
  }, [])

  const stopAllLoading = useCallback(() => {
    // 모든 타이머 취소
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current.clear()

    setLoading({})
  }, [])

  const toggleLoading = useCallback((key: string) => {
    setLoading(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const isLoadingKey = useCallback((key: string): boolean => {
    return Boolean(loading[key])
  }, [loading])

  const isLoading = Object.values(loading).some(Boolean)

  const withLoading = useCallback(async <T>(
    key: string,
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading(key)
      const result = await asyncFn()
      return result
    } finally {
      stopLoading(key)
    }
  }, [startLoading, stopLoading])

  return {
    loading,
    isLoading,
    isLoadingKey,
    startLoading,
    stopLoading,
    stopAllLoading,
    toggleLoading,
    withLoading,
  }
}

/**
 * 단일 로딩 상태 관리 훅 (간단한 경우)
 */
export function useSimpleLoading(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])
  const toggleLoading = useCallback(() => setIsLoading(prev => !prev), [])

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true)
      const result = await asyncFn()
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    withLoading,
  }
}

/**
 * 디바운스된 로딩 상태 관리 훅
 * 짧은 로딩은 무시하고 일정 시간 이상 걸리는 작업만 로딩 표시
 */
export function useDebouncedLoading(delay = 300) {
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const startLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true)
    }, delay)
  }, [delay])

  const stopLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    setIsLoading(false)
  }, [])

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  // 클린업
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  }
}

/**
 * 최소 로딩 시간을 보장하는 훅
 * 사용자 경험을 위해 너무 빠른 로딩을 방지
 */
export function useMinimumLoading(minimumTime = 500) {
  const [isLoading, setIsLoading] = useState(false)

  const withLoading = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    setIsLoading(true)
    
    const startTime = Date.now()
    
    try {
      const result = await asyncFn()
      const elapsed = Date.now() - startTime
      
      if (elapsed < minimumTime) {
        await new Promise(resolve => setTimeout(resolve, minimumTime - elapsed))
      }
      
      return result
    } finally {
      setIsLoading(false)
    }
  }, [minimumTime])

  return {
    isLoading,
    withLoading,
  }
}