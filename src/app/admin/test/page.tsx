export default function AdminTestPage() {
  return (
    <html>
      <body>
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
          <h1>Admin Test Page</h1>
          <p>This page bypasses the admin layout to test basic routing.</p>
          <p>If you can see this, the admin routing works!</p>
          <p>Time: {new Date().toISOString()}</p>
          <a href="/admin/login">Go to Admin Login</a>
        </div>
      </body>
    </html>
  )
}