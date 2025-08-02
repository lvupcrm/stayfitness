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
  Tablet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCMSStore } from '@/hooks/useCMSStore'

export function CMSHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const router = useRouter()
  
  const { 
    isPreviewMode, 
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

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push('/admin/login')
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
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{isPreviewMode ? '편집' : '미리보기'}</span>
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

        {/* Settings */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/cms/settings">
            <Settings className="w-4 h-4" />
          </Link>
        </Button>

        {/* User Menu */}
        <div className="relative">
          <Button variant="ghost" size="sm">
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