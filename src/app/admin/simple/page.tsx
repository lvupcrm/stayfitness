export default function SimpleAdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Page Test</h1>
        <p>This is a simple admin page to test routing.</p>
        <p>Current time: {new Date().toISOString()}</p>
      </div>
    </div>
  )
}