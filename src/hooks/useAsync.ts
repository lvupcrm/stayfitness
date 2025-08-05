/**
 * 비동기 작업을 위한 공통 훅
 * 로딩, 에러, 데이터 상태를 일관되게 관리합니다.
 */

import { useState, useCallback, useRef, useEffect } from 'react'

export interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  isError: boolean
  isSuccess: boolean
}

export interface UseAsyncOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

export function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: false,
  })

  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const execute = useCallback(
    async (...args: Parameters<typeof asyncFunction>) => {
      setState({
        data: null,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
      })

      try {
        const result = await asyncFunction(...args)
        
        if (isMountedRef.current) {
          setState({
            data: result,
            isLoading: false,
            error: null,
            isError: false,
            isSuccess: true,
          })
          options.onSuccess?.(result)
        }
        
        return result
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error))
        
        if (isMountedRef.current) {
          setState({
            data: null,
            isLoading: false,
            error: errorObj,
            isError: true,
            isSuccess: false,
          })
          options.onError?.(errorObj)
        }
        
        throw error
      } finally {
        if (isMountedRef.current) {
          options.onSettled?.()
        }
      }
    },
    [asyncFunction, options]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
    })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

/**
 * 즉시 실행되는 비동기 작업을 위한 훅
 */
export function useAsyncEffect<T = any>(
  asyncFunction: () => Promise<T>,
  deps: React.DependencyList = [],
  options: UseAsyncOptions = {}
) {
  const async = useAsync(asyncFunction, options)

  useEffect(() => {
    async.execute()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return async
}