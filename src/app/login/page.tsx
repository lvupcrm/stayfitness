'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  // Prevent hydration mismatch by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!password) {
      setError('패스워드를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@stayfitness.com',
          password: password
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Login successful
        alert('로그인 성공!')
        
        // Wait a bit for cookie to be set, then verify auth
        setTimeout(async () => {
          try {
            const verifyResponse = await fetch('/api/admin/auth/verify', {
              method: 'GET',
              credentials: 'include',
            })
            
            if (verifyResponse.ok) {
              // Auth verified, redirect to admin
              window.location.href = '/admin'
            } else {
              // Fallback: force reload
              window.location.href = '/admin'
            }
          } catch (error) {
            console.error('Auth verification failed:', error)
            // Fallback: force reload
            window.location.href = '/admin'
          }
        }, 100)
      } else {
        setError(data.error || '패스워드가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl stay-heading tracking-tight mb-2">
            <span className="stay-text-gradient">STAY</span>
            <span className="text-slate-300">FITNESS</span>
          </div>
          <p className="text-slate-400 stay-body text-sm">관리자 로그인</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl stay-heading text-center text-slate-900">
              CMS 접속
            </CardTitle>
            <p className="text-center text-slate-600 stay-body text-sm">
              홈페이지 콘텐츠를 쉽게 편집하세요
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 stay-body-medium">
                  접속 패스워드
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="패스워드를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white border-slate-200 focus:border-slate-400 stay-body text-lg"
                    disabled={isSubmitting}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm stay-body">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-12 stay-body-medium text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>접속 중...</span>
                  </div>
                ) : (
                  'CMS 접속하기'
                )}
              </Button>
            </form>

            {/* Simple Access Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 stay-body-medium text-center mb-2">
                📝 간편 접속 방법
              </p>
              <div className="text-sm text-blue-700 stay-body text-center space-y-1">
                <div>패스워드: <span className="font-mono bg-blue-100 px-2 py-1 rounded">StayFitness</span></div>
              </div>
              <p className="text-xs text-blue-600 stay-body text-center mt-3">
                💡 누구나 쉽게 홈페이지 콘텐츠를 편집할 수 있습니다
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-400 stay-body">
            © 2024 Stay Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}