'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { toast } from 'react-toastify'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { login, isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const success = await login({ email, password })
      
      if (success) {
        toast.success('로그인 성공!')
        router.push('/admin')
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl stay-heading tracking-tight mb-2"
          >
            <span className="stay-text-gradient">STAY</span>
            <span className="text-slate-300">FITNESS</span>
          </motion.div>
          <p className="text-slate-400 stay-body text-sm">관리자 로그인</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl stay-heading text-center text-slate-900">
              어드민 로그인
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 stay-body-medium">
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@stayfitness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-white border-slate-200 focus:border-slate-400 stay-body"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 stay-body-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-white border-slate-200 focus:border-slate-400 stay-body"
                    disabled={isSubmitting}
                    required
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm stay-body">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-11 stay-body-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>로그인 중...</span>
                  </div>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 stay-body text-center mb-2">
                데모 관리자 계정
              </p>
              <div className="text-xs text-slate-700 stay-body space-y-1">
                <div>이메일: admin@stayfitness.com</div>
                <div>비밀번호: StayFitness2024!</div>
              </div>
              <p className="text-xs text-slate-500 stay-body text-center mt-2">
                ⚠️ 실제 운영 시 비밀번호를 변경하세요
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
      </motion.div>
    </div>
  )
}