'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  MessageSquare
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import type { DashboardStats } from '@/types/admin'

// Sample dashboard stats - will be replaced with real API call
const sampleStats: DashboardStats = {
  consultations: {
    total: 156,
    pending: 12,
    thisWeek: 23,
    conversionRate: 68.5
  },
  trainers: {
    applications: 34,
    pending: 8,
    hired: 15,
    talentPool: 11
  },
  users: {
    totalMembers: 1247,
    newThisMonth: 89,
    activeUsers: 892
  }
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'yellow' | 'red'
  delay?: number
}

function StatCard({ title, value, change, icon: Icon, color, delay = 0 }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    yellow: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className=\"hover:shadow-lg transition-all duration-300 hover:-translate-y-1\">
        <CardContent className=\"p-6\">
          <div className=\"flex items-center justify-between\">
            <div className=\"flex-1\">
              <p className=\"text-sm font-medium text-slate-600 stay-body-medium\">{title}</p>
              <div className=\"flex items-baseline space-x-2 mt-2\">
                <h3 className=\"text-2xl font-bold text-slate-900 stay-heading\">{value}</h3>
                {change && (
                  <span className={`text-sm font-medium ${
                    change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                  } stay-body`}>
                    {change}
                  </span>
                )}
              </div>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
              <Icon className=\"w-6 h-6 text-white\" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface RecentActivityItem {
  id: string
  type: 'consultation' | 'trainer' | 'user'
  message: string
  time: string
  status: 'info' | 'success' | 'warning' | 'error'
}

const recentActivities: RecentActivityItem[] = [
  {
    id: '1',
    type: 'consultation',
    message: '김민수님이 퍼스널 트레이닝 상담을 신청했습니다',
    time: '5분 전',
    status: 'info'
  },
  {
    id: '2',
    type: 'trainer',
    message: '이진수님의 트레이너 지원서가 승인되었습니다',
    time: '1시간 전',
    status: 'success'
  },
  {
    id: '3',
    type: 'consultation',
    message: '박서연님의 상담이 완료되었습니다',
    time: '2시간 전',
    status: 'success'
  },
  {
    id: '4',
    type: 'trainer',
    message: '새로운 트레이너 지원서가 제출되었습니다',
    time: '3시간 전',
    status: 'info'
  },
  {
    id: '5',
    type: 'consultation',
    message: '오늘 예정된 상담 5건이 있습니다',
    time: '4시간 전',
    status: 'warning'
  }
]

export default function AdminDashboard() {
  const { user } = useAdminAuth()
  const [stats, setStats] = useState<DashboardStats>(sampleStats)

  // TODO: Fetch real dashboard data
  useEffect(() => {
    // fetchDashboardStats()
  }, [])

  const getActivityIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'consultation':
        return Calendar
      case 'trainer':
        return UserCheck
      case 'user':
        return Users
      default:
        return MessageSquare
    }
  }

  const getStatusColor = (status: RecentActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'text-emerald-600'
      case 'warning':
        return 'text-amber-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className=\"space-y-6\">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=\"bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white\"
      >
        <h1 className=\"text-2xl font-bold stay-heading mb-2\">
          안녕하세요, {user?.name || 'Admin'}님! 👋
        </h1>
        <p className=\"text-blue-100 stay-body\">
          오늘도 Stay Fitness를 관리해주셔서 감사합니다. 최신 현황을 확인해보세요.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
        <StatCard
          title=\"전체 상담 예약\"
          value={stats.consultations.total}
          change=\"+12%\"
          icon={Calendar}
          color=\"blue\"
          delay={0.1}
        />
        <StatCard
          title=\"대기 중인 상담\"
          value={stats.consultations.pending}
          icon={Clock}
          color=\"yellow\"
          delay={0.2}
        />
        <StatCard
          title=\"트레이너 지원\"
          value={stats.trainers.applications}
          change=\"+5\"
          icon={UserCheck}
          color=\"green\"
          delay={0.3}
        />
        <StatCard
          title=\"총 회원 수\"
          value={`${(stats.users.totalMembers / 1000).toFixed(1)}K`}
          change=\"+89\"
          icon={Users}
          color=\"red\"
          delay={0.4}
        />
      </div>

      {/* Content Grid */}
      <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className=\"lg:col-span-2\"
        >
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center space-x-2 stay-heading\">
                <MessageSquare className=\"w-5 h-5\" />
                <span>최근 활동</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=\"space-y-4\">
                {recentActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className=\"flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors\"
                    >
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)} bg-opacity-10`}>
                        <Icon className={`w-4 h-4 ${getStatusColor(activity.status)}`} />
                      </div>
                      <div className=\"flex-1 min-w-0\">
                        <p className=\"text-sm text-slate-900 stay-body\">{activity.message}</p>
                        <p className=\"text-xs text-slate-500 stay-body mt-1\">{activity.time}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className=\"mt-4 pt-4 border-t border-slate-100\">
                <Button variant=\"ghost\" className=\"w-full stay-body-medium\">
                  모든 활동 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className=\"space-y-6\"
        >
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className=\"stay-heading\">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-3\">
              <Button 
                variant=\"outline\" 
                className=\"w-full justify-start stay-body-medium\"
                onClick={() => window.location.href = '/admin/consultations'}
              >
                <Calendar className=\"w-4 h-4 mr-2\" />
                상담 예약 관리
              </Button>
              <Button 
                variant=\"outline\" 
                className=\"w-full justify-start stay-body-medium\"
                onClick={() => window.location.href = '/admin/trainers'}
              >
                <UserCheck className=\"w-4 h-4 mr-2\" />
                트레이너 지원서
              </Button>
              <Button 
                variant=\"outline\" 
                className=\"w-full justify-start stay-body-medium\"
                onClick={() => window.location.href = '/admin/analytics'}
              >
                <TrendingUp className=\"w-4 h-4 mr-2\" />
                분석 보기
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className=\"stay-heading\">시스템 상태</CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-3\">
              <div className=\"flex items-center justify-between\">
                <span className=\"text-sm text-slate-600 stay-body\">데이터베이스</span>
                <div className=\"flex items-center space-x-1\">
                  <CheckCircle className=\"w-4 h-4 text-emerald-500\" />
                  <span className=\"text-xs text-emerald-600 stay-body\">정상</span>
                </div>
              </div>
              <div className=\"flex items-center justify-between\">
                <span className=\"text-sm text-slate-600 stay-body\">API 서버</span>
                <div className=\"flex items-center space-x-1\">
                  <CheckCircle className=\"w-4 h-4 text-emerald-500\" />
                  <span className=\"text-xs text-emerald-600 stay-body\">정상</span>
                </div>
              </div>
              <div className=\"flex items-center justify-between\">
                <span className=\"text-sm text-slate-600 stay-body\">백업</span>
                <div className=\"flex items-center space-x-1\">
                  <AlertCircle className=\"w-4 h-4 text-amber-500\" />
                  <span className=\"text-xs text-amber-600 stay-body\">2시간 전</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}