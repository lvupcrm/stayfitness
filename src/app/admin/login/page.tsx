'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
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
      console.log('Attempting login with password:', password)
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password
        })
      })

      const data = await response.json()
      console.log('Login response:', data)
      console.log('Response status:', response.status)
      console.log('Cookies:', document.cookie)

      if (data.success) {
        const urlParams = new URLSearchParams(window.location.search)
        const redirectUrl = urlParams.get('redirect')
        window.location.href = redirectUrl || '/admin'
      } else {
        setError(data.error || '패스워드가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">STAY</span>
            <span className="text-slate-300">FITNESS</span>
          </h1>
          <p className="text-slate-400 text-sm">관리자 로그인</p>
        </div>

        <div className="bg-white/95 rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">CMS 접속</h2>
            <p className="text-slate-500 text-sm">홈페이지 콘텐츠를 쉽게 편집하세요</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                autoFocus
                required
              />
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
    </div>
  )
}