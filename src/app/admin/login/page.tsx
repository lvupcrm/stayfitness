'use client'

import { useEffect } from 'react'

export default function AdminLoginRedirect() {
  useEffect(() => {
    window.location.href = '/static-login'
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">리다이렉팅 중...</p>
      </div>
    </div>
  )
}