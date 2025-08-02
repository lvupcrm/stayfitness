import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken } from '@/lib/admin/auth'

export default async function CmsAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  // Check if already authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  
  if (token) {
    try {
      const user = await verifyAdminToken(token)
      if (user) {
        redirect('/admin')
      }
    } catch (error) {
      // Token invalid, continue to login
    }
  }

  const resolvedSearchParams = await searchParams
  const errorMessage = resolvedSearchParams.error

  return (
    <html>
      <head>
        <title>Stay Fitness CMS - 로그인</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .container {
            width: 100%;
            max-width: 400px;
          }
          .logo {
            text-align: center;
            margin-bottom: 32px;
          }
          .logo h1 {
            font-size: 36px;
            font-weight: bold;
            color: white;
            margin: 0 0 8px 0;
          }
          .logo .stay {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .logo .fitness {
            color: #cbd5e1;
          }
          .logo p {
            color: #94a3b8;
            font-size: 14px;
          }
          .form-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          .form-header {
            text-align: center;
            margin-bottom: 24px;
          }
          .form-header h2 {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin: 0 0 8px 0;
          }
          .form-header p {
            color: #64748b;
            font-size: 14px;
            margin: 0;
          }
          .form-group {
            margin-bottom: 16px;
          }
          .form-group label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 8px;
          }
          .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            background-color: white;
          }
          .form-group input:focus {
            outline: none;
            border-color: #3b82f6;
          }
          .error {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            margin-bottom: 16px;
            color: #dc2626;
            font-size: 14px;
          }
          .submit-btn {
            width: 100%;
            padding: 12px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
          }
          .submit-btn:hover {
            background-color: #2563eb;
          }
          .info {
            margin-top: 24px;
            padding: 16px;
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
            border-radius: 8px;
            border: 1px solid #bfdbfe;
          }
          .info-title {
            font-size: 14px;
            font-weight: 500;
            color: #1e40af;
            text-align: center;
            margin: 0 0 8px 0;
          }
          .info-password {
            font-size: 14px;
            color: #1e40af;
            text-align: center;
            margin: 0 0 12px 0;
          }
          .info-password code {
            background-color: #dbeafe;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
          }
          .info-note {
            font-size: 12px;
            color: #3730a3;
            text-align: center;
            margin: 0;
          }
          .footer {
            text-align: center;
            margin-top: 24px;
            color: #94a3b8;
            font-size: 12px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="logo">
            <h1>
              <span className="stay">STAY</span>
              <span className="fitness">FITNESS</span>
            </h1>
            <p>관리자 로그인</p>
          </div>

          <div className="form-container">
            <div className="form-header">
              <h2>CMS 접속</h2>
              <p>홈페이지 콘텐츠를 쉽게 편집하세요</p>
            </div>

            {errorMessage && (
              <div className="error">
                ⚠️ {errorMessage}
              </div>
            )}

            <form action="/api/cms-auth/login" method="POST">
              <div className="form-group">
                <label htmlFor="password">접속 패스워드</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="패스워드를 입력하세요"
                  autoFocus
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                CMS 접속하기
              </button>
            </form>

            <div className="info">
              <p className="info-title">📝 간편 접속 방법</p>
              <div className="info-password">
                패스워드: <code>StayFitness</code>
              </div>
              <p className="info-note">
                💡 누구나 쉽게 홈페이지 콘텐츠를 편집할 수 있습니다
              </p>
            </div>
          </div>

          <div className="footer">
            © 2024 Stay Fitness. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  )
}