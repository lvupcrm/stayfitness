'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Award, 
  Clock, 
  Briefcase, 
  GraduationCap,
  Coffee,
  MessageSquare,
  CheckCircle
} from 'lucide-react'
import { useForm, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const trainerApplicationSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요'),
  phone: yup.string().required('연락처를 입력해주세요'),
  email: yup.string().email('올바른 이메일을 입력해주세요').required('이메일을 입력해주세요'),
  experience: yup.string().required('경력을 선택해주세요'),
  specialization: yup.array().min(1, '전문분야를 최소 1개 선택해주세요'),
  certification: yup.string(),
  introduction: yup.string().required('자기소개를 작성해주세요').min(50, '자기소개는 50자 이상 작성해주세요'),
  motivation: yup.string().required('지원동기를 작성해주세요').min(30, '지원동기는 30자 이상 작성해주세요'),
  availableTime: yup.array().min(1, '가능한 시간대를 최소 1개 선택해주세요'),
  portfolio: yup.string().url('올바른 URL을 입력해주세요').nullable(),
  workStyle: yup.string().required('선호하는 근무 방식을 선택해주세요')
})

type TrainerApplicationData = yup.InferType<typeof trainerApplicationSchema>

const experienceLevels = [
  { value: 'beginner', label: '신입 (1년 미만)', icon: GraduationCap },
  { value: 'junior', label: '주니어 (1-3년)', icon: Briefcase },
  { value: 'senior', label: '시니어 (3-7년)', icon: Award },
  { value: 'expert', label: '전문가 (7년 이상)', icon: Star }
]

const specializations = [
  { id: 'weight-training', label: '웨이트 트레이닝', color: 'bg-fitness-primary' },
  { id: 'cardio', label: '유산소 운동', color: 'bg-fitness-secondary' },
  { id: 'functional', label: '펑셔널 트레이닝', color: 'bg-fitness-accent' },
  { id: 'yoga', label: '요가/필라테스', color: 'bg-fitness-success' },
  { id: 'rehabilitation', label: '재활 운동', color: 'bg-fitness-warning' },
  { id: 'sports', label: '스포츠 특화', color: 'bg-chart-1' },
  { id: 'nutrition', label: '영양 관리', color: 'bg-chart-2' },
  { id: 'group-class', label: '그룹 클래스', color: 'bg-chart-3' }
]

const timeSlots = [
  '06:00-09:00 (새벽)', '09:00-12:00 (오전)', '12:00-15:00 (점심)',
  '15:00-18:00 (오후)', '18:00-21:00 (저녁)', '21:00-24:00 (야간)'
]

const workStyles = [
  { value: 'full-time', label: '정규직', description: '안정적인 풀타임 근무' },
  { value: 'part-time', label: '파트타임', description: '유연한 시간 근무' },
  { value: 'freelance', label: '프리랜서', description: '자유로운 계약 근무' },
  { value: 'consulting', label: '컨설팅', description: '전문성 기반 자문 역할' }
]

export function TrainerApplication() {
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTalentPool, setShowTalentPool] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<TrainerApplicationData>({
    resolver: yupResolver(trainerApplicationSchema) as Resolver<TrainerApplicationData>
  })

  const onSubmit = async (data: TrainerApplicationData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/trainer-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          specialization: selectedSpecializations,
          availableTime: selectedTimes,
          createdAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('트레이너 지원서 제출에 실패했습니다.')
      }

      toast.success('지원서가 성공적으로 제출되었습니다! 검토 후 연락드리겠습니다.')
      reset()
      setSelectedSpecializations([])
      setSelectedTimes([])
    } catch (error) {
      toast.error('지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error('Trainer application error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSpecializationToggle = (id: string) => {
    const updated = selectedSpecializations.includes(id)
      ? selectedSpecializations.filter(s => s !== id)
      : [...selectedSpecializations, id]
    
    setSelectedSpecializations(updated)
    setValue('specialization', updated)
  }

  const handleTimeToggle = (time: string) => {
    const updated = selectedTimes.includes(time)
      ? selectedTimes.filter(t => t !== time)
      : [...selectedTimes, time]
    
    setSelectedTimes(updated)
    setValue('availableTime', updated)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-fitness-primary/10 text-fitness-primary rounded-full">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">스테이피트니스 트레이너 지원</span>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground">
          함께 성장할 전문 트레이너를 찾습니다
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          스테이피트니스에서 <span className="text-fitness-primary font-semibold">당신의 전문성</span>을 발휘하고, 
          <span className="text-fitness-secondary font-semibold"> 고객들과 함께 건강한 변화</span>를 만들어가세요
        </p>

        {/* Urban Field 스타일 Talent Pool 안내 */}
        <Card className="bg-gradient-to-r from-fitness-primary/5 to-fitness-secondary/5 border-fitness-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-6 h-6 text-fitness-primary" />
              <h3 className="text-lg font-semibold">💼 Talent Pool 시스템</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-fitness-success mt-0.5" />
                <div>
                  <p className="font-medium">지금 당장 이직을 생각하지 않으신가요?</p>
                  <p className="text-muted-foreground">언제든 지원하여 인재풀에 등록하세요</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-fitness-secondary mt-0.5" />
                <div>
                  <p className="font-medium">궁금한 점이 있으신가요?</p>
                  <p className="text-muted-foreground">커피챗으로 편하게 대화해요</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setShowTalentPool(!showTalentPool)}
            >
              {showTalentPool ? '일반 지원서로 돌아가기' : 'Talent Pool 지원하기'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>트레이너 지원을 위한 기본 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <Input
                  {...register('name')}
                  placeholder="이름을 입력하세요"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">연락처</label>
                <Input
                  {...register('phone')}
                  placeholder="010-0000-0000"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="example@email.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 경력 및 전문성 */}
        <Card>
          <CardHeader>
            <CardTitle>경력 및 전문성</CardTitle>
            <CardDescription>트레이너로서의 경력과 전문 분야를 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 경력 레벨 */}
            <div>
              <label className="block text-sm font-medium mb-4">경력 레벨</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {experienceLevels.map((level) => {
                  const Icon = level.icon
                  return (
                    <label key={level.value} className="cursor-pointer">
                      <input
                        type="radio"
                        {...register('experience')}
                        value={level.value}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border transition-all flex items-center gap-3 ${
                        watch('experience') === level.value
                          ? 'border-fitness-primary bg-fitness-primary/10 text-fitness-primary'
                          : 'border-border hover:border-fitness-primary/50'
                      }`}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{level.label}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
              {errors.experience && (
                <p className="text-destructive text-sm mt-2">{errors.experience.message}</p>
              )}
            </div>

            {/* 전문 분야 */}
            <div>
              <label className="block text-sm font-medium mb-4">전문 분야 (복수 선택 가능)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {specializations.map((spec) => (
                  <Badge
                    key={spec.id}
                    variant={selectedSpecializations.includes(spec.id) ? "default" : "outline"}
                    className={`cursor-pointer p-3 justify-center transition-all ${
                      selectedSpecializations.includes(spec.id) 
                        ? `${spec.color} text-white hover:opacity-80` 
                        : 'hover:bg-fitness-primary/10'
                    }`}
                    onClick={() => handleSpecializationToggle(spec.id)}
                  >
                    {spec.label}
                  </Badge>
                ))}
              </div>
              {errors.specialization && (
                <p className="text-destructive text-sm mt-2">{errors.specialization.message}</p>
              )}
            </div>

            {/* 자격증 */}
            <div>
              <label className="block text-sm font-medium mb-2">보유 자격증</label>
              <Input
                {...register('certification')}
                placeholder="예: 생활스포츠지도사, NSCA-CPT, ACSM 등"
              />
            </div>
          </CardContent>
        </Card>

        {/* 근무 선호도 */}
        <Card>
          <CardHeader>
            <CardTitle>근무 선호도</CardTitle>
            <CardDescription>선호하는 근무 방식과 가능한 시간대를 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 근무 방식 */}
            <div>
              <label className="block text-sm font-medium mb-4">선호하는 근무 방식</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workStyles.map((style) => (
                  <label key={style.value} className="cursor-pointer">
                    <input
                      type="radio"
                      {...register('workStyle')}
                      value={style.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-lg border transition-all ${
                      watch('workStyle') === style.value
                        ? 'border-fitness-primary bg-fitness-primary/10 text-fitness-primary'
                        : 'border-border hover:border-fitness-primary/50'
                    }`}>
                      <div className="font-medium">{style.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{style.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.workStyle && (
                <p className="text-destructive text-sm mt-2">{errors.workStyle.message}</p>
              )}
            </div>

            {/* 가능한 시간대 */}
            <div>
              <label className="block text-sm font-medium mb-4">가능한 시간대 (복수 선택 가능)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Badge
                    key={time}
                    variant={selectedTimes.includes(time) ? "default" : "outline"}
                    className={`cursor-pointer p-3 justify-center transition-all ${
                      selectedTimes.includes(time) 
                        ? 'bg-fitness-secondary text-white hover:opacity-80' 
                        : 'hover:bg-fitness-secondary/10'
                    }`}
                    onClick={() => handleTimeToggle(time)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </Badge>
                ))}
              </div>
              {errors.availableTime && (
                <p className="text-destructive text-sm mt-2">{errors.availableTime.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 자기소개 및 지원동기 */}
        <Card>
          <CardHeader>
            <CardTitle>자기소개 및 지원동기</CardTitle>
            <CardDescription>당신만의 강점과 스테이피트니스에 지원하는 이유를 들려주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">자기소개</label>
              <Textarea
                {...register('introduction')}
                placeholder="트레이너로서의 경험, 철학, 강점 등을 자유롭게 작성해주세요..."
                rows={5}
                className={`resize-none ${errors.introduction ? 'border-destructive' : ''}`}
              />
              {errors.introduction && (
                <p className="text-destructive text-sm mt-1">{errors.introduction.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">지원동기</label>
              <Textarea
                {...register('motivation')}
                placeholder="스테이피트니스에 지원하는 이유와 함께하고 싶은 이유를 작성해주세요..."
                rows={4}
                className={`resize-none ${errors.motivation ? 'border-destructive' : ''}`}
              />
              {errors.motivation && (
                <p className="text-destructive text-sm mt-1">{errors.motivation.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">포트폴리오 URL (선택사항)</label>
              <Input
                {...register('portfolio')}
                placeholder="https://... (인스타그램, 블로그, 유튜브 등)"
                className={errors.portfolio ? 'border-destructive' : ''}
              />
              {errors.portfolio && (
                <p className="text-destructive text-sm mt-1">{errors.portfolio.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="flex justify-center space-x-4">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="px-8 py-3 text-lg fitness-gradient hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? '지원서 제출 중...' : '트레이너 지원하기'}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            size="lg"
            className="px-6 py-3"
            onClick={() => window.open('/consultation', '_blank')}
          >
            <Coffee className="w-4 h-4 mr-2" />
            커피챗 신청
          </Button>
        </div>
      </form>
    </div>
  )
}