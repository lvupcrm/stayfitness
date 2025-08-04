'use client'

import { useState } from 'react'
import { useEffect } from 'react'

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setError(null)
    setIsLoading(false)
  }, [])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string

    if (!password) {
      setError('패스워드를 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      setError(null)
      console.log('Attempting login...')
      
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password
        }),
        credentials: 'include'
      })

      const data = await response.json()
      console.log('Login response:', {
        ok: response.ok,
        status: response.status,
        data: data
      })

      if (!response.ok || !data.success) {
        const errorMessage = data.error || '로그인에 실패했습니다.'
        console.error('Login failed:', errorMessage)
        throw new Error(errorMessage)
      }

      // Verify authentication before redirect
      try {
        const verifyResponse = await fetch('/api/admin/auth/verify', {
          credentials: 'include'
        })
        
        const verifyData = await verifyResponse.json()
        console.log('Verify response:', verifyData)
        
        if (!verifyData.success) {
          throw new Error('인증에 실패했습니다.')
        }

        console.log('Login successful, redirecting to /admin')
        const urlParams = new URLSearchParams(window.location.search)
        const redirectUrl = urlParams.get('redirect')
        // Ensure the token is properly set before redirect
        await new Promise(resolve => setTimeout(resolve, 100))
        const nextUrl = redirectUrl || '/admin'
        window.location.replace(nextUrl)
      } catch (verifyError) {
        console.error('Verification error:', verifyError)
        throw new Error('인증 확인 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-400">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" id="login-title">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">STAY</span>
            <span className="text-slate-300">FITNESS</span>
          </h1>
          <p className="text-slate-400 text-sm">관리자 로그인</p>
        </div>

        <div className="bg-white/95 rounded-xl p-8 shadow-2xl" role="dialog" aria-labelledby="login-title" aria-modal="true">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">CMS 접속</h2>
            <p className="text-slate-500 text-sm" id="login-description">홈페이지 콘텐츠를 쉽게 편집하세요</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-red-600 text-sm" role="alert">
              <span aria-hidden="true">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="sr-only">
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                defaultValue="admin@stayfitness.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                접속 패스워드
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="패스워드를 입력하세요"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                autoComplete="current-password"
                autoFocus
                required
                aria-describedby="password-description"
              />
              <div id="password-description" className="sr-only">
                관리자 계정 접속을 위한 패스워드를 입력하세요
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium rounded-lg flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  <span>접속 중...</span>
                </>
              ) : (
                'CMS 접속하기'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 text-center mb-2">📝 간편 접속 방법</p>
            <div className="text-sm text-blue-900 text-center mb-3">
              패스워드: <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">StayFitness</code>
            </div>
            <p className="text-xs text-indigo-800 text-center">
              💡 누구나 쉽게 홈페이지 콘텐츠를 편집할 수 있습니다
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-slate-400 text-xs">
          © 2024 Stay Fitness. All rights reserved.
        </div>
      </div>
    </main>
  )
}