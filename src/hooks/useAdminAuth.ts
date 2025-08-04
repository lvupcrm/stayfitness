'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AdminUser, AdminLoginRequest, AdminPermission } from '@/types/admin'

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
      const response = await fetch('/api/admin/auth/verify', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setUser(data.data)
        } else {
          setUser(null)
        }
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
      
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (data.success && data.data) {
        setUser(data.data.user)
        return true
      } else {
        setUser(null)
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout request failed:', error)
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