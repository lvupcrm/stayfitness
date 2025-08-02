'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface UserProfile {
  name: string
  email: string
  phone: string
}

interface Consultation {
  id: string
  user_id: string
  preferred_time: string
  goal: string
  fitness_level: string
  experience: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  admin_notes?: string
  created_at: string
  updated_at: string
  user_profiles: UserProfile
}

interface ConsultationResponse {
  consultations: Consultation[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const statusConfig = {
  pending: {
    label: '대기중',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock
  },
  confirmed: {
    label: '확정',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: CheckCircle
  },
  completed: {
    label: '완료',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
  cancelled: {
    label: '취소',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle
  }
}

const goalTranslation = {
  weight_loss: '체중 감량',
  muscle_gain: '근육 증가',
  strength: '근력 향상',
  endurance: '지구력 향상',
  flexibility: '유연성 개선',
  general_fitness: '전반적인 건강',
  rehabilitation: '재활',
  other: '기타'
}

const fitnessLevelTranslation = {
  beginner: '초급자',
  intermediate: '중급자',
  advanced: '고급자'
}

export default function ConsultationsPage() {
  const { hasPermission } = useAdminAuth()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  
  // Filters and pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')

  // Fetch consultations
  const fetchConsultations = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter,
        search: searchQuery,
        sortBy,
        sortOrder
      })

      const response = await fetch(`/api/admin/consultations?${params}`)
      if (!response.ok) throw new Error('Failed to fetch consultations')
      
      const data: ConsultationResponse = await response.json()
      setConsultations(data.consultations)
      setTotalPages(data.pagination.totalPages)
      setTotalCount(data.pagination.total)
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter, searchQuery, sortBy, sortOrder])

  useEffect(() => {
    fetchConsultations()
  }, [fetchConsultations])

  // Update consultation status
  const updateConsultationStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      })

      if (!response.ok) throw new Error('Failed to update consultation')
      
      // Refresh data
      fetchConsultations()
      setShowDetailModal(false)
    } catch (error) {
      console.error('Error updating consultation:', error)
    }
  }

  // Get stats
  const stats = {
    total: totalCount,
    pending: consultations.filter(c => c.status === 'pending').length,
    confirmed: consultations.filter(c => c.status === 'confirmed').length,
    completed: consultations.filter(c => c.status === 'completed').length
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!hasPermission('read_consultations')) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 stay-heading mb-2">접근 권한이 없습니다</h2>
        <p className="text-slate-600 stay-body">상담 예약을 조회할 권한이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 stay-heading">상담 예약 관리</h1>
          <p className="text-slate-600 stay-body mt-1">고객 상담 예약을 확인하고 관리하세요</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">전체 예약</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">대기중</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">확정</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">완료</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="이름, 이메일, 전화번호로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 stay-body"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 stay-body"
            >
              <option value="all">모든 상태</option>
              <option value="pending">대기중</option>
              <option value="confirmed">확정</option>
              <option value="completed">완료</option>
              <option value="cancelled">취소</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-')
                setSortBy(field)
                setSortOrder(order)
              }}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 stay-body"
            >
              <option value="created_at-desc">최신순</option>
              <option value="created_at-asc">오래된순</option>
              <option value="preferred_time-asc">선호 시간순</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Consultations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="stay-heading">상담 예약 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 stay-body">로딩 중...</p>
            </div>
          ) : consultations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 stay-heading mb-2">상담 예약이 없습니다</h3>
              <p className="text-slate-600 stay-body">아직 등록된 상담 예약이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-4 border-b border-slate-200 text-sm font-medium text-slate-600 stay-body-medium">
                <div className="col-span-3">고객 정보</div>
                <div className="col-span-2">선호 시간</div>
                <div className="col-span-2">목표</div>
                <div className="col-span-2">상태</div>
                <div className="col-span-2">신청일</div>
                <div className="col-span-1">작업</div>
              </div>

              {/* Table Body */}
              <div className="space-y-2">
                {consultations.map((consultation, index) => {
                  const StatusIcon = statusConfig[consultation.status].icon
                  
                  return (
                    <motion.div
                      key={consultation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900 stay-body-medium">
                              {consultation.user_profiles.name}
                            </h3>
                            <p className="text-sm text-slate-600 stay-body">
                              {consultation.user_profiles.email}
                            </p>
                          </div>
                          <Badge className={`${statusConfig[consultation.status].color} border stay-body`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[consultation.status].label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500 stay-body">선호 시간:</span>
                            <p className="text-slate-900 stay-body">{consultation.preferred_time}</p>
                          </div>
                          <div>
                            <span className="text-slate-500 stay-body">목표:</span>
                            <p className="text-slate-900 stay-body">{goalTranslation[consultation.goal as keyof typeof goalTranslation] || consultation.goal}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-500 stay-body">
                            {formatDate(consultation.created_at)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedConsultation(consultation)
                              setShowDetailModal(true)
                            }}
                            className="stay-body"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            상세보기
                          </Button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <div className="font-medium text-slate-900 stay-body-medium">
                            {consultation.user_profiles.name}
                          </div>
                          <div className="text-sm text-slate-600 stay-body">
                            {consultation.user_profiles.email}
                          </div>
                        </div>
                        
                        <div className="col-span-2 stay-body">
                          {consultation.preferred_time}
                        </div>
                        
                        <div className="col-span-2 stay-body">
                          {goalTranslation[consultation.goal as keyof typeof goalTranslation] || consultation.goal}
                        </div>
                        
                        <div className="col-span-2">
                          <Badge className={`${statusConfig[consultation.status].color} border stay-body`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[consultation.status].label}
                          </Badge>
                        </div>
                        
                        <div className="col-span-2 text-sm text-slate-600 stay-body">
                          {formatDate(consultation.created_at)}
                        </div>
                        
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedConsultation(consultation)
                              setShowDetailModal(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                  <div className="text-sm text-slate-600 stay-body">
                    {totalCount}개 중 {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)}개 표시
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <span className="text-sm text-slate-600 stay-body">
                      {currentPage} / {totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedConsultation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 stay-heading">상담 예약 상세</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetailModal(false)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">고객 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 stay-body-medium">
                            {selectedConsultation.user_profiles.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 stay-body-medium">
                            {selectedConsultation.user_profiles.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600 stay-body">
                        <Mail className="w-4 h-4" />
                        <span>{selectedConsultation.user_profiles.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600 stay-body">
                        <Phone className="w-4 h-4" />
                        <span>{selectedConsultation.user_profiles.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600 stay-body">
                        <Clock className="w-4 h-4" />
                        <span>{selectedConsultation.preferred_time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">상담 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 stay-body">목표</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {goalTranslation[selectedConsultation.goal as keyof typeof goalTranslation] || selectedConsultation.goal}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 stay-body">운동 수준</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {fitnessLevelTranslation[selectedConsultation.fitness_level as keyof typeof fitnessLevelTranslation] || selectedConsultation.fitness_level}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600 stay-body">운동 경험</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedConsultation.experience}
                        </p>
                      </div>
                      {selectedConsultation.message && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-slate-600 stay-body">추가 메시지</label>
                          <p className="font-medium text-slate-900 stay-body-medium">
                            {selectedConsultation.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div>
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">상태 관리</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={selectedConsultation.status === status ? "default" : "outline"}
                          onClick={() => updateConsultationStatus(selectedConsultation.id, status)}
                          disabled={!hasPermission('manage_consultations')}
                          className="stay-body"
                        >
                          <config.icon className="w-4 h-4 mr-1" />
                          {config.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {selectedConsultation.admin_notes && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-900 stay-body-medium mb-2">관리자 메모</h4>
                      <p className="text-slate-700 stay-body">{selectedConsultation.admin_notes}</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="text-xs text-slate-500 stay-body space-y-1">
                    <p>신청일: {formatDate(selectedConsultation.created_at)}</p>
                    <p>수정일: {formatDate(selectedConsultation.updated_at)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}