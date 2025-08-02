'use client'

import { useEffect } from 'react'

export default function CmsLoginRedirect() {
  useEffect(() => {
    window.location.href = '/cms-auth'
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '2px solid white',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p>로그인 페이지로 이동 중...</p>
      </div>
    </div>
  )
}