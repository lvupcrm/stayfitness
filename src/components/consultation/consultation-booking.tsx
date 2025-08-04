'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MessageCircle, Phone, Video } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const consultationSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요'),
  phone: yup.string().required('연락처를 입력해주세요'),
  email: yup.string().email('올바른 이메일을 입력해주세요').required('이메일을 입력해주세요'),
  consultationType: yup.string().required('상담 유형을 선택해주세요'),
  preferredTime: yup.string().required('희망 시간을 선택해주세요'),
  message: yup.string().max(500, '메시지는 500자 이내로 입력해주세요').default('')
}).required()

type ConsultationFormData = yup.InferType<typeof consultationSchema>

const consultationTypes = [
  { id: 'coffee-chat', title: '커피챗', description: '편안한 분위기에서 궁금한 점을 자유롭게 상담', icon: MessageCircle, color: 'bg-fitness-accent' },
  { id: 'phone-call', title: '전화 상담', description: '전화로 빠르고 간편하게 상담', icon: Phone, color: 'bg-fitness-primary' },
  { id: 'video-call', title: '화상 상담', description: '화상통화로 자세한 설명과 함께 상담', icon: Video, color: 'bg-fitness-secondary' },
  { id: 'visit', title: '방문 상담', description: '직접 센터를 방문하여 시설 견학과 함께 상담', icon: Calendar, color: 'bg-fitness-success' }
]

const timeSlots = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
  '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'
]

export function ConsultationBooking() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ConsultationFormData>({
    resolver: yupResolver(consultationSchema)
  })


  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('상담 예약 요청에 실패했습니다.')
      }

      toast.success('상담 예약이 완료되었습니다! 곧 연락드리겠습니다.')
      reset()
      setSelectedType('')
    } catch (error) {
      toast.error('상담 예약 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error('Consultation booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setValue('consultationType', typeId)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          전문 상담 예약
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          스테이피트니스만의 맞춤형 상담을 통해 
          <span className="text-fitness-primary font-semibold"> 당신만의 피트니스 여정</span>을 시작하세요
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 상담 유형 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              상담 유형 선택
            </CardTitle>
            <CardDescription>
              편안한 방식으로 상담받으세요. 어반필드의 Coffee Chat 시스템을 도입했습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultationTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedType === type.id 
                        ? 'ring-2 ring-fitness-primary shadow-lg fitness-glow' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleTypeSelect(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${type.color} text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{type.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            {errors.consultationType && (
              <p className="text-destructive text-sm mt-2">{errors.consultationType.message}</p>
            )}
          </CardContent>
        </Card>

        {/* 개인정보 입력 */}
        <Card>
          <CardHeader>
            <CardTitle>연락처 정보</CardTitle>
            <CardDescription>상담을 위한 기본 정보를 입력해주세요</CardDescription>
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

        {/* 희망 시간 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              희망 상담 시간
            </CardTitle>
            <CardDescription>편한 시간대를 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <label key={time} className="cursor-pointer">
                  <input
                    type="radio"
                    {...register('preferredTime')}
                    value={time}
                    className="sr-only"
                  />
                  <div className={`p-3 text-center rounded-lg border transition-all ${
                    watch('preferredTime') === time
                      ? 'border-fitness-primary bg-fitness-primary/10 text-fitness-primary'
                      : 'border-border hover:border-fitness-primary/50'
                  }`}>
                    {time}
                  </div>
                </label>
              ))}
            </div>
            {errors.preferredTime && (
              <p className="text-destructive text-sm mt-2">{errors.preferredTime.message}</p>
            )}
          </CardContent>
        </Card>

        {/* 추가 메시지 */}
        <Card>
          <CardHeader>
            <CardTitle>추가 문의사항</CardTitle>
            <CardDescription>궁금한 점이나 특별한 요청사항이 있으시면 자유롭게 작성해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register('message')}
              placeholder="상담받고 싶은 내용이나 궁금한 점을 자유롭게 작성해주세요..."
              rows={4}
              className="resize-none"
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
            )}
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="px-8 py-3 text-lg fitness-gradient hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? '예약 중...' : '상담 예약하기'}
          </Button>
        </div>
      </form>
    </div>
  )
}