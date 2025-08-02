'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserCheck, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface TrainerApplication {
  id: string
  name: string
  email: string
  phone: string
  age: number
  gender: 'male' | 'female'
  experience_years: number
  certifications: string[]
  specialization: string[]
  education: string
  previous_gym?: string
  motivation: string
  availability: string[]
  preferred_hours?: string
  resume_url?: string
  status: 'pending' | 'reviewing' | 'interview_scheduled' | 'hired' | 'rejected'
  admin_notes?: string
  interview_date?: string
  feedback?: string
  created_at: string
  updated_at: string
}

interface TrainerApplicationResponse {
  applications: TrainerApplication[]
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
  reviewing: {
    label: '검토중',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Eye
  },
  interview_scheduled: {
    label: '면접예정',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Calendar
  },
  hired: {
    label: '채용',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
  rejected: {
    label: '거절',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle
  }
}

const genderTranslation = {
  male: '남성',
  female: '여성'
}

const specializationTranslation = {
  weight_training: '웨이트 트레이닝',
  cardio: '유산소 운동',
  yoga: '요가',
  pilates: '필라테스',
  crossfit: '크로스핏',
  functional: '기능성 운동',
  rehabilitation: '재활 운동',
  senior_fitness: '시니어 피트니스',
  sports_conditioning: '스포츠 컨디셔닝',
  nutrition: '영양 상담'
}

export default function TrainersPage() {
  const { hasPermission } = useAdminAuth()
  const [applications, setApplications] = useState<TrainerApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<TrainerApplication | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  
  // Filters and pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')

  // Fetch trainer applications
  const fetchApplications = async () => {
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

      const response = await fetch(`/api/admin/trainers?${params}`)
      if (!response.ok) throw new Error('Failed to fetch trainer applications')
      
      const data: TrainerApplicationResponse = await response.json()
      setApplications(data.applications)
      setTotalPages(data.pagination.totalPages)
      setTotalCount(data.pagination.total)
    } catch (error) {
      console.error('Error fetching trainer applications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [currentPage, statusFilter, searchQuery, sortBy, sortOrder])

  // Update application status
  const updateApplicationStatus = async (id: string, status: string, notes?: string, interviewDate?: string) => {
    try {
      const body: Record<string, string> = { status }
      if (notes !== undefined) body.notes = notes
      if (interviewDate) body.interview_date = interviewDate

      const response = await fetch(`/api/admin/trainers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) throw new Error('Failed to update application')
      
      // Refresh data
      fetchApplications()
      setShowDetailModal(false)
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  // Get stats
  const stats = {
    total: totalCount,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    hired: applications.filter(a => a.status === 'hired').length
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

  if (!hasPermission('read_trainers')) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 stay-heading mb-2">접근 권한이 없습니다</h2>
        <p className="text-slate-600 stay-body">트레이너 지원서를 조회할 권한이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 stay-heading">트레이너 지원서 관리</h1>
          <p className="text-slate-600 stay-body mt-1">트레이너 지원서를 검토하고 채용 프로세스를 관리하세요</p>
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
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">전체 지원서</p>
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
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">검토중</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.reviewing}</p>
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
                  <p className="text-sm font-medium text-slate-600 stay-body-medium">채용</p>
                  <p className="text-2xl font-bold text-slate-900 stay-heading">{stats.hired}</p>
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
                placeholder="이름, 이메일, 전문분야로 검색..."
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
              <option value="reviewing">검토중</option>
              <option value="interview_scheduled">면접예정</option>
              <option value="hired">채용</option>
              <option value="rejected">거절</option>
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
              <option value="experience_years-desc">경력순</option>
              <option value="name-asc">이름순</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="stay-heading">트레이너 지원서 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 stay-body">로딩 중...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 stay-heading mb-2">지원서가 없습니다</h3>
              <p className="text-slate-600 stay-body">아직 등록된 트레이너 지원서가 없습니다.</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-4 border-b border-slate-200 text-sm font-medium text-slate-600 stay-body-medium">
                <div className="col-span-3">지원자 정보</div>
                <div className="col-span-2">경력/전문분야</div>
                <div className="col-span-2">자격증</div>
                <div className="col-span-2">상태</div>
                <div className="col-span-2">지원일</div>
                <div className="col-span-1">작업</div>
              </div>

              {/* Table Body */}
              <div className="space-y-2">
                {applications.map((application, index) => {
                  const StatusIcon = statusConfig[application.status].icon
                  
                  return (
                    <motion.div
                      key={application.id}
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
                              {application.name}
                            </h3>
                            <p className="text-sm text-slate-600 stay-body">
                              {application.email}
                            </p>
                          </div>
                          <Badge className={`${statusConfig[application.status].color} border stay-body`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[application.status].label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500 stay-body">경력:</span>
                            <p className="text-slate-900 stay-body">{application.experience_years}년</p>
                          </div>
                          <div>
                            <span className="text-slate-500 stay-body">전문분야:</span>
                            <p className="text-slate-900 stay-body">
                              {application.specialization.slice(0, 2).map(s => 
                                specializationTranslation[s] || s
                              ).join(', ')}
                              {application.specialization.length > 2 && ` 외 ${application.specialization.length - 2}개`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-500 stay-body">
                            {formatDate(application.created_at)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application)
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
                            {application.name}
                          </div>
                          <div className="text-sm text-slate-600 stay-body">
                            {application.email}
                          </div>
                          <div className="text-sm text-slate-600 stay-body">
                            {genderTranslation[application.gender]}, {application.age}세
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="font-medium text-slate-900 stay-body-medium">
                            {application.experience_years}년 경력
                          </div>
                          <div className="text-sm text-slate-600 stay-body">
                            {application.specialization.slice(0, 2).map(s => 
                              specializationTranslation[s] || s
                            ).join(', ')}
                            {application.specialization.length > 2 && ` 외 ${application.specialization.length - 2}개`}
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-sm text-slate-600 stay-body">
                          {application.certifications.slice(0, 2).join(', ')}
                          {application.certifications.length > 2 && ` 외 ${application.certifications.length - 2}개`}
                        </div>
                        
                        <div className="col-span-2">
                          <Badge className={`${statusConfig[application.status].color} border stay-body`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[application.status].label}
                          </Badge>
                        </div>
                        
                        <div className="col-span-2 text-sm text-slate-600 stay-body">
                          {formatDate(application.created_at)}
                        </div>
                        
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application)
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
        {showDetailModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 stay-heading">트레이너 지원서 상세</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetailModal(false)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">개인 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 stay-body">이름</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedApplication.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 stay-body">성별/나이</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {genderTranslation[selectedApplication.gender]}, {selectedApplication.age}세
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 stay-body">연락처</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedApplication.phone}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600 stay-body">이메일</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedApplication.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">전문 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 stay-body">경력</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedApplication.experience_years}년
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 stay-body">학력</label>
                        <p className="font-medium text-slate-900 stay-body-medium">
                          {selectedApplication.education}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600 stay-body">전문 분야</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedApplication.specialization.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="stay-body">
                              {specializationTranslation[spec] || spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-slate-600 stay-body">자격증</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedApplication.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="stay-body">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedApplication.previous_gym && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-slate-600 stay-body">이전 근무지</label>
                          <p className="font-medium text-slate-900 stay-body-medium">
                            {selectedApplication.previous_gym}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">근무 가능 시간</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 stay-body">가능한 요일</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedApplication.availability.map((day, index) => (
                            <Badge key={index} variant="outline" className="stay-body">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedApplication.preferred_hours && (
                        <div>
                          <label className="text-sm text-slate-600 stay-body">선호 시간대</label>
                          <p className="font-medium text-slate-900 stay-body-medium">
                            {selectedApplication.preferred_hours}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">지원 동기</h3>
                    <p className="text-slate-700 stay-body leading-relaxed">
                      {selectedApplication.motivation}
                    </p>
                  </div>

                  {/* Resume */}
                  {selectedApplication.resume_url && (
                    <div className="border-b border-slate-200 pb-4">
                      <h3 className="font-medium text-slate-900 stay-body-medium mb-3">이력서</h3>
                      <Button
                        variant="outline"
                        onClick={() => window.open(selectedApplication.resume_url, '_blank')}
                        className="stay-body"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        이력서 다운로드
                      </Button>
                    </div>
                  )}

                  {/* Status Management */}
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-medium text-slate-900 stay-body-medium mb-3">상태 관리</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={selectedApplication.status === status ? "default" : "outline"}
                          onClick={() => updateApplicationStatus(selectedApplication.id, status)}
                          disabled={!hasPermission('manage_trainers')}
                          className="stay-body"
                        >
                          <config.icon className="w-4 h-4 mr-1" />
                          {config.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {selectedApplication.admin_notes && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-900 stay-body-medium mb-2">관리자 메모</h4>
                      <p className="text-slate-700 stay-body">{selectedApplication.admin_notes}</p>
                    </div>
                  )}

                  {/* Interview Date */}
                  {selectedApplication.interview_date && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-900 stay-body-medium mb-2">면접 일정</h4>
                      <p className="text-slate-700 stay-body">
                        {formatDate(selectedApplication.interview_date)}
                      </p>
                    </div>
                  )}

                  {/* Feedback */}
                  {selectedApplication.feedback && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-900 stay-body-medium mb-2">피드백</h4>
                      <p className="text-slate-700 stay-body">{selectedApplication.feedback}</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="text-xs text-slate-500 stay-body space-y-1">
                    <p>지원일: {formatDate(selectedApplication.created_at)}</p>
                    <p>수정일: {formatDate(selectedApplication.updated_at)}</p>
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