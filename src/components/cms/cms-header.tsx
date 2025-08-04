'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Menu, 
  X, 
  Settings, 
  User, 
  LogOut, 
  Save, 
  Eye, 
  Monitor,
  Smartphone,
  Tablet,
  Bell,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCMSStore } from '@/hooks/useCMSStore'

export function CMSHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()
  
  const { 
    isPreview, 
    isDirty, 
    togglePreview, 
    savePage,
    isSaving 
  } = useCMSStore()

  const handleSave = async () => {
    try {
      await savePage()
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const handleLogout = async () => {
    try {
      // Check if Supabase is available
      const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                          process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'

      if (hasSupabase) {
        // Use real logout API
        await fetch('/api/admin/auth/logout', {
          method: 'POST',
          credentials: 'include',
        })
      }
      
      // Clear local storage and redirect
      localStorage.removeItem('admin_token')
      sessionStorage.clear()
      
      // Reset CMS store
      const { resetEditor } = useCMSStore.getState()
      resetEditor()
      
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect even if logout fails
      router.push('/admin/login')
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        <Link href="/admin/cms" className="text-xl font-bold text-gray-900">
          STAY FITNESS CMS
        </Link>
      </div>

      {/* Center Section - Editor Controls */}
      <div className="hidden md:flex items-center space-x-2">
        {/* Device Preview Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setDevicePreview('desktop')}
            className={`p-2 rounded ${devicePreview === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Desktop Preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevicePreview('tablet')}
            className={`p-2 rounded ${devicePreview === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Tablet Preview"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevicePreview('mobile')}
            className={`p-2 rounded ${devicePreview === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Mobile Preview"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Toggle */}
        <Button
          onClick={togglePreview}
          variant={isPreview ? "default" : "outline"}
          size="sm"
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{isPreview ? '편집' : '미리보기'}</span>
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          size="sm"
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isSaving ? '저장 중...' : '저장'}
          </span>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="w-4 h-4" />
            {isDirty && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="h-2 w-2 bg-white rounded-full"></span>
              </span>
            )}
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">알림</h3>
              </div>
              <div className="p-4 space-y-3">
                {isDirty ? (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">저장되지 않은 변경사항이 있습니다</p>
                      <p className="text-xs text-gray-500 mt-1">변경사항을 저장하세요</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">모든 변경사항이 저장되었습니다</p>
                      <p className="text-xs text-gray-500 mt-1">마지막 저장: 방금 전</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/cms/settings">
            <Settings className="w-4 h-4" />
          </Link>
        </Button>

        {/* User Menu */}
        <div className="relative">
          <Button variant="ghost" size="sm" title="사용자 메뉴">
            <User className="w-4 h-4" />
          </Button>
        </div>

        {/* Logout */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  )
}