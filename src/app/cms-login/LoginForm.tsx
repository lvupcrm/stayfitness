'use client'

import { useState } from 'react'

export default function LoginForm() {
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string

    if (!password) {
      setError('패스워드를 입력해주세요.')
      return
    }

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
        // Force full page reload to ensure clean state
        window.location.replace('/admin')
      } else {
        setError(data.error || '패스워드가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              STAY
            </span>
            <span style={{ color: '#cbd5e1' }}>FITNESS</span>
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '14px',
            margin: 0
          }}>관리자 로그인</p>
        </div>

        {/* Login Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 8px 0'
            }}>CMS 접속</h2>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              margin: 0
            }}>홈페이지 콘텐츠를 쉽게 편집하세요</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                접속 패스워드
              </label>
              <input
                type="password"
                name="password"
                placeholder="패스워드를 입력하세요"
                autoFocus
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <span style={{ color: '#dc2626', fontSize: '14px' }}>⚠️ {error}</span>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              CMS 접속하기
            </button>
          </form>

          {/* Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            borderRadius: '8px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1e40af',
              textAlign: 'center',
              margin: '0 0 8px 0'
            }}>
              📝 간편 접속 방법
            </p>
            <div style={{
              fontSize: '14px',
              color: '#1e40af',
              textAlign: 'center',
              margin: '0 0 12px 0'
            }}>
              패스워드: <code style={{
                backgroundColor: '#dbeafe',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>StayFitness</code>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#3730a3',
              textAlign: 'center',
              margin: 0
            }}>
              💡 누구나 쉽게 홈페이지 콘텐츠를 편집할 수 있습니다
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#94a3b8',
            margin: 0
          }}>
            © 2024 Stay Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}