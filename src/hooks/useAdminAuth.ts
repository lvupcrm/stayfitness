'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AdminUser, AdminLoginRequest, AdminPermission } from '@/types/admin'
import { apiClient, getErrorMessage } from '@/lib/api-client'
import { showToast } from '@/lib/toast'

interface UseAdminAuthReturn {
  user: AdminUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: AdminLoginRequest) => Promise<boolean>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
  hasPermission: (permission: string) => boolean
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false
    return user.role === 'super_admin' || user.permissions.includes(permission as AdminPermission)
  }, [user])

  const refreshAuth = useCallback(async () => {
    try {
      const response = await apiClient.get<AdminUser>('/api/admin/auth/verify')
      
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth refresh failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials: AdminLoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.post<{ user: AdminUser }>('/api/admin/auth/login', credentials)

      if (response.success && response.data) {
        setUser(response.data.user)
        showToast.success('로그인되었습니다.')
        return true
      } else {
        setUser(null)
        showToast.error('로그인에 실패했습니다.')
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      showToast.error(getErrorMessage(error))
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/api/admin/auth/logout')
      showToast.success('로그아웃되었습니다.')
    } catch (error) {
      console.error('Logout request failed:', error)
      showToast.error('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setUser(null)
      window.location.href = '/static-login'
    }
  }, [])

  // Initialize auth state on mount
  useEffect(() => {
    refreshAuth()
  }, [refreshAuth])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshAuth,
    hasPermission,
  }
}