'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FileText, 
  Image, 
  Layout, 
  Settings, 
  Plus,
  FolderOpen,
  Home,
  Users,
  BarChart3,
  Layers,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: '대시보드',
    href: '/admin/cms',
    icon: Home,
    exact: true
  },
  {
    title: '페이지 관리',
    href: '/admin/cms/pages',
    icon: FileText
  },
  {
    title: '미디어 라이브러리',
    href: '/admin/cms/media',
    icon: Image
  },
  {
    title: '템플릿',
    href: '/admin/cms/templates',
    icon: Layout
  },
  {
    title: '블록 라이브러리',
    href: '/admin/cms/blocks',
    icon: Layers
  },
  {
    title: '디자인 시스템',
    href: '/admin/cms/design',
    icon: Palette
  },
  {
    title: '사용자 관리',
    href: '/admin/cms/users',
    icon: Users
  },
  {
    title: '통계',
    href: '/admin/cms/analytics',
    icon: BarChart3
  },
  {
    title: '설정',
    href: '/admin/cms/settings',
    icon: Settings
  }
]

const quickActions = [
  {
    title: '새 페이지 생성',
    href: '/admin/cms/pages/new',
    icon: Plus,
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    title: '미디어 업로드',
    href: '/admin/cms/media/upload',
    icon: Plus,
    color: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: '템플릿 만들기',
    href: '/admin/cms/templates/new',
    icon: Plus,
    color: 'bg-purple-600 hover:bg-purple-700'
  }
]

export function CMSSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 pt-16 z-30 transition-all duration-300",
        isCollapsed && "lg:w-16"
      )}>
        <div className="flex-1 flex flex-col min-h-0">
          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <h3 className={cn(
              "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3",
              isCollapsed && "sr-only"
            )}>
              빠른 작업
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.href}
                  asChild
                  size="sm"
                  className={cn(
                    "w-full justify-start text-white",
                    action.color,
                    isCollapsed && "px-2"
                  )}
                >
                  <Link href={action.href}>
                    <action.icon className={cn("w-4 h-4", !isCollapsed && "mr-2")} />
                    {!isCollapsed && <span className="truncate">{action.title}</span>}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <h3 className={cn(
              "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3",
              isCollapsed && "sr-only"
            )}>
              메뉴
            </h3>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(item.href, item.exact)
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 flex-shrink-0",
                      !isCollapsed && "mr-3",
                      isActive(item.href, item.exact) ? "text-blue-700" : "text-gray-400"
                    )} />
                    {!isCollapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <FolderOpen className={cn("w-4 h-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>사이드바 접기</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - will be shown with mobile menu toggle */}
      <div className="lg:hidden">
        {/* Mobile sidebar content would go here */}
      </div>
    </>
  )
}