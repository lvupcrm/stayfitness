'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  sidebarCollapsed: boolean
  onMenuClick?: () => void
  className?: string
}

export default function AdminHeader({ 
  sidebarCollapsed, 
  onMenuClick,
  className 
}: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, logout } = useAdminAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className={cn(
      'fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-6',
      'transition-all duration-300',
      sidebarCollapsed ? 'left-20' : 'left-80',
      className
    )}>
      {/* Left Section */}
      <div className=\"flex items-center space-x-4\">
        {/* Mobile Menu Button */}
        <Button
          variant=\"ghost\"
          size=\"icon\"
          onClick={onMenuClick}
          className=\"lg:hidden\"
        >
          <Menu className=\"w-5 h-5\" />
        </Button>

        {/* Search */}
        <div className=\"relative hidden md:block\">
          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4\" />
          <Input
            placeholder=\"검색...\"
            className=\"pl-10 w-64 h-9 bg-slate-50 border-slate-200 focus:bg-white stay-body\"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className=\"flex items-center space-x-4\">
        {/* Notifications */}
        <div className=\"relative\">
          <Button
            variant=\"ghost\"
            size=\"icon\"
            onClick={() => setShowNotifications(!showNotifications)}
            className=\"relative\"
          >
            <Bell className=\"w-5 h-5 text-slate-600\" />
            {/* Notification Badge */}
            <div className=\"absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center\">
              <span className=\"text-xs text-white stay-body\">3</span>
            </div>
          </Button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className=\"absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50\"
              >
                <div className=\"px-4 py-2 border-b border-slate-100\">
                  <h3 className=\"font-semibold text-slate-900 stay-body-medium\">알림</h3>
                </div>
                
                <div className=\"max-h-64 overflow-y-auto\">
                  {/* Sample notifications */}
                  <div className=\"px-4 py-3 hover:bg-slate-50 cursor-pointer\">
                    <div className=\"flex items-start space-x-3\">
                      <div className=\"w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0\"></div>
                      <div className=\"flex-1\">
                        <p className=\"text-sm text-slate-900 stay-body\">새로운 상담 예약이 있습니다</p>
                        <p className=\"text-xs text-slate-500 stay-body mt-1\">5분 전</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className=\"px-4 py-3 hover:bg-slate-50 cursor-pointer\">
                    <div className=\"flex items-start space-x-3\">
                      <div className=\"w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0\"></div>
                      <div className=\"flex-1\">
                        <p className=\"text-sm text-slate-900 stay-body\">트레이너 지원서가 제출되었습니다</p>
                        <p className=\"text-xs text-slate-500 stay-body mt-1\">1시간 전</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className=\"px-4 py-3 hover:bg-slate-50 cursor-pointer\">
                    <div className=\"flex items-start space-x-3\">
                      <div className=\"w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0\"></div>
                      <div className=\"flex-1\">
                        <p className=\"text-sm text-slate-900 stay-body\">시스템 업데이트가 완료되었습니다</p>
                        <p className=\"text-xs text-slate-500 stay-body mt-1\">2시간 전</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className=\"px-4 py-2 border-t border-slate-100\">
                  <Button variant=\"ghost\" size=\"sm\" className=\"w-full text-xs stay-body\">
                    모든 알림 보기
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className=\"relative\">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className=\"flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors\"
          >
            <div className=\"w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center\">
              <User className=\"w-4 h-4 text-white\" />
            </div>
            <div className=\"hidden md:block text-left\">
              <div className=\"text-sm font-medium text-slate-900 stay-body-medium\">
                {user?.name || 'Admin'}
              </div>
              <div className=\"text-xs text-slate-500 stay-body\">
                {user?.role === 'super_admin' ? '최고 관리자' : 
                 user?.role === 'admin' ? '관리자' : 
                 user?.role === 'manager' ? '매니저' : '사용자'}
              </div>
            </div>
            <ChevronDown className=\"w-4 h-4 text-slate-400\" />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className=\"absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50\"
              >
                <div className=\"px-4 py-3 border-b border-slate-100\">
                  <div className=\"font-medium text-slate-900 stay-body-medium\">{user?.name}</div>
                  <div className=\"text-sm text-slate-500 stay-body\">{user?.email}</div>
                </div>
                
                <div className=\"py-2\">
                  <button className=\"flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors\">
                    <User className=\"w-4 h-4 text-slate-500\" />
                    <span className=\"text-sm text-slate-700 stay-body\">프로필</span>
                  </button>
                  
                  <button className=\"flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors\">
                    <Settings className=\"w-4 h-4 text-slate-500\" />
                    <span className=\"text-sm text-slate-700 stay-body\">설정</span>
                  </button>
                </div>
                
                <div className=\"border-t border-slate-100 py-2\">
                  <button
                    onClick={handleLogout}
                    className=\"flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600\"
                  >
                    <LogOut className=\"w-4 h-4\" />
                    <span className=\"text-sm stay-body\">로그아웃</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className=\"fixed inset-0 z-40\"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}