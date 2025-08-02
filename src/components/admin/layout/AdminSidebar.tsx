'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
  badge?: number
}

const sidebarItems: SidebarItem[] = [
  {
    name: '대시보드',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: '상담 예약',
    href: '/admin/consultations',
    icon: Calendar,
    permission: 'read_consultations'
  },
  {
    name: '트레이너 지원',
    href: '/admin/trainers',
    icon: UserCheck,
    permission: 'read_trainers'
  },
  {
    name: '사용자 관리',
    href: '/admin/users',
    icon: Users,
    permission: 'read_users'
  },
  {
    name: '분석',
    href: '/admin/analytics',
    icon: BarChart3,
    permission: 'read_analytics'
  },
  {
    name: '설정',
    href: '/admin/settings',
    icon: Settings,
    permission: 'manage_settings'
  }
]

interface AdminSidebarProps {
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export default function AdminSidebar({ 
  collapsed = false, 
  onCollapsedChange 
}: AdminSidebarProps) {
  const pathname = usePathname()
  const { hasPermission } = useAdminAuth()

  const toggleCollapsed = () => {
    onCollapsedChange?.(!collapsed)
  }

  // Filter items based on permissions
  const visibleItems = sidebarItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  )

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 flex flex-col',
        'shadow-lg'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-2xl stay-heading tracking-tight"
            >
              <span className="stay-text-gradient">STAY</span>
              <span className="text-slate-600">FITNESS</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={toggleCollapsed}
          className={cn(
            'p-2 rounded-lg hover:bg-slate-100 transition-colors',
            collapsed && 'mx-auto'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 overflow-y-auto">
        <nav className="space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative',
                  'hover:bg-slate-50',
                  isActive 
                    ? 'bg-slate-100 text-slate-900 shadow-sm' 
                    : 'text-slate-700 hover:text-slate-900'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}

                <Icon className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'
                )} />

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'ml-3 stay-body-medium text-sm',
                        isActive ? 'text-slate-900' : 'text-slate-700'
                      )}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {item.badge && item.badge > 0 && !collapsed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center stay-body"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </motion.div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200">
        <div className={cn(
          'text-xs text-slate-500 stay-body text-center',
          collapsed && 'hidden'
        )}>
          Stay Fitness Admin
        </div>
        <div className={cn(
          'text-xs text-slate-400 stay-body text-center mt-1',
          collapsed && 'hidden'
        )}>
          v1.0.0
        </div>
      </div>
    </motion.div>
  )
}