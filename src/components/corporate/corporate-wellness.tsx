'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react'
import { useForm, Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const corporateInquirySchema = yup.object({
  companyName: yup.string().required('회사명을 입력해주세요'),
  contactName: yup.string().required('담당자명을 입력해주세요'),
  phone: yup.string().required('연락처를 입력해주세요'),
  email: yup.string().email('올바른 이메일을 입력해주세요').required('이메일을 입력해주세요'),
  employeeCount: yup.string().required('직원 수를 선택해주세요'),
  serviceType: yup.array().min(1, '관심 서비스를 선택해주세요'),
  budget: yup.string(),
  message: yup.string().required('문의사항을 작성해주세요')
})

type CorporateInquiryData = yup.InferType<typeof corporateInquirySchema>

const employeeRanges = [
  { value: '10-50', label: '10-50명' },
  { value: '50-100', label: '50-100명' },
  { value: '100-300', label: '100-300명' },
  { value: '300-500', label: '300-500명' },
  { value: '500+', label: '500명 이상' }
]

const serviceTypes = [
  { id: 'onsite-fitness', label: '사내 피트니스 센터 운영', description: '전문 트레이너가 회사에 직접 방문' },
  { id: 'wellness-program', label: '웰니스 프로그램', description: '맞춤형 건강관리 프로그램 제공' },
  { id: 'health-seminars', label: '건강 세미나', description: '건강한 라이프스타일 교육' },
  { id: 'fitness-consultation', label: '피트니스 컨설팅', description: '기업 맞춤형 운동 솔루션' },
  { id: 'team-building', label: '팀빌딩 운동', description: '협업력 강화를 위한 그룹 운동' },
  { id: 'stress-management', label: '스트레스 관리', description: '직장 스트레스 해소 프로그램' }
]

const benefits = [
  {
    icon: TrendingUp,
    title: '생산성 향상',
    description: '건강한 직원이 더 높은 업무 성과를 냅니다',
    stat: '평균 23% 향상'
  },
  {
    icon: Shield,
    title: '의료비 절감',
    description: '예방 중심의 건강관리로 의료비를 줄입니다',
    stat: '연간 15-30% 절감'
  },
  {
    icon: Users,
    title: '직원 만족도',
    description: '복리후생 만족도와 직원 유지율이 증가합니다',
    stat: '만족도 40% 증가'
  },
  {
    icon: Clock,
    title: '결근율 감소',
    description: '건강한 직원들의 출근율이 높아집니다',
    stat: '결근율 25% 감소'
  }
]

const successStories = [
  {
    company: 'A 대기업',
    industry: 'IT',
    employees: '1,200명',
    program: '사내 피트니스 센터',
    results: ['생산성 28% 향상', '스트레스 지수 35% 감소', '직원 만족도 95%']
  },
  {
    company: 'B 스타트업',
    industry: '핀테크',
    employees: '150명',
    program: '웰니스 프로그램',
    results: ['병가 사용률 40% 감소', '팀워크 점수 향상', '이직률 50% 감소']
  },
  {
    company: 'C 제조업',
    industry: '제조',
    employees: '800명',
    program: '종합 건강관리',
    results: ['작업 효율성 22% 증가', '안전사고 60% 감소', 'ROI 300% 달성']
  }
]

export function CorporateWellness() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CorporateInquiryData>({
    resolver: yupResolver(corporateInquirySchema) as Resolver<CorporateInquiryData>
  })

  const onSubmit = async (data: CorporateInquiryData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/corporate-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          serviceType: selectedServices,
          createdAt: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('기업 웰니스 문의 전송에 실패했습니다.')
      }

      toast.success('문의가 성공적으로 전송되었습니다! 2-3일 내에 연락드리겠습니다.')
      reset()
      setSelectedServices([])
    } catch (error) {
      toast.error('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error('Corporate inquiry error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    const updated = selectedServices.includes(serviceId)
      ? selectedServices.filter(s => s !== serviceId)
      : [...selectedServices, serviceId]
    
    setSelectedServices(updated)
    setValue('serviceType', updated)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 히어로 섹션 */}
      <section className="relative py-20 bg-gradient-to-br from-fitness-primary/10 via-fitness-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-fitness-primary/10 text-fitness-primary hover:bg-fitness-primary/20">
              <Building2 className="w-4 h-4 mr-2" />
              기업 전용 서비스
            </Badge>
            
            <h1 className="text-5xl font-bold text-foreground mb-6">
              직원의 건강이 
              <span className="text-fitness-primary"> 기업의 경쟁력</span>입니다
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              스테이피트니스의 <strong>기업 웰니스 솔루션</strong>으로 
              직원들의 건강을 관리하고 생산성을 높이세요. 
              맞춤형 프로그램으로 건강한 조직문화를 만들어갑니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="fitness-gradient text-white px-8 py-3">
                <Calendar className="w-5 h-5 mr-2" />
                무료 컨설팅 신청
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                전화 상담: 02-0000-0000
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 효과 및 이점 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              기업 웰니스의 <span className="text-fitness-primary">실질적 효과</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              데이터로 입증된 기업 웰니스 프로그램의 ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-fitness-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    <div className="text-2xl font-bold text-fitness-primary">{benefit.stat}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 서비스 종류 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              <span className="text-fitness-primary">맞춤형</span> 기업 웰니스 서비스
            </h2>
            <p className="text-lg text-muted-foreground">
              기업의 규모와 업종에 맞는 최적의 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-fitness-primary/10 rounded-lg flex items-center justify-center group-hover:bg-fitness-primary/20 transition-colors">
                      <Target className="w-6 h-6 text-fitness-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-fitness-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.label}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              <span className="text-fitness-primary">검증된</span> 성공 사례
            </h2>
            <p className="text-lg text-muted-foreground">
              다양한 업종의 기업들이 이미 경험한 변화
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{story.industry}</Badge>
                    <span className="text-sm text-muted-foreground">{story.employees}</span>
                  </div>
                  <CardTitle className="text-xl">{story.company}</CardTitle>
                  <CardDescription className="text-fitness-primary font-medium">
                    {story.program}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {story.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-fitness-success" />
                        <span className="text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 폼 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                기업 웰니스 <span className="text-fitness-primary">무료 컨설팅</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                전문 컨설턴트가 귀하의 기업에 최적화된 솔루션을 제안해드립니다
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* 기업 정보 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">회사명</label>
                      <Input
                        {...register('companyName')}
                        placeholder="회사명을 입력하세요"
                        className={errors.companyName ? 'border-destructive' : ''}
                      />
                      {errors.companyName && (
                        <p className="text-destructive text-sm mt-1">{errors.companyName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">담당자명</label>
                      <Input
                        {...register('contactName')}
                        placeholder="담당자명을 입력하세요"
                        className={errors.contactName ? 'border-destructive' : ''}
                      />
                      {errors.contactName && (
                        <p className="text-destructive text-sm mt-1">{errors.contactName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div>
                      <label className="block text-sm font-medium mb-2">이메일</label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="example@company.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 직원 수 */}
                  <div>
                    <label className="block text-sm font-medium mb-4">직원 수</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {employeeRanges.map((range) => (
                        <label key={range.value} className="cursor-pointer">
                          <input
                            type="radio"
                            {...register('employeeCount')}
                            value={range.value}
                            className="sr-only"
                          />
                          <div className={`p-3 text-center rounded-lg border transition-all ${
                            // watch('employeeCount') === range.value
                              false
                              ? 'border-fitness-primary bg-fitness-primary/10 text-fitness-primary'
                              : 'border-border hover:border-fitness-primary/50'
                          }`}>
                            {range.label}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.employeeCount && (
                      <p className="text-destructive text-sm mt-2">{errors.employeeCount.message}</p>
                    )}
                  </div>

                  {/* 관심 서비스 */}
                  <div>
                    <label className="block text-sm font-medium mb-4">관심 서비스 (복수 선택 가능)</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {serviceTypes.map((service) => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            selectedServices.includes(service.id)
                              ? 'ring-2 ring-fitness-primary bg-fitness-primary/5'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => handleServiceToggle(service.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                selectedServices.includes(service.id)
                                  ? 'border-fitness-primary bg-fitness-primary'
                                  : 'border-border'
                              }`}>
                                {selectedServices.includes(service.id) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{service.label}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {errors.serviceType && (
                      <p className="text-destructive text-sm mt-2">{errors.serviceType.message}</p>
                    )}
                  </div>

                  {/* 예산 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">예상 예산 (선택사항)</label>
                    <Input
                      {...register('budget')}
                      placeholder="월 예산을 입력하세요 (예: 500만원)"
                    />
                  </div>

                  {/* 문의사항 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">문의사항</label>
                    <Textarea
                      {...register('message')}
                      placeholder="기업 웰니스 프로그램에 대해 궁금한 점이나 특별한 요구사항을 자유롭게 작성해주세요..."
                      rows={5}
                      className={`resize-none ${errors.message ? 'border-destructive' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* 제출 버튼 */}
                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="px-12 py-3 text-lg fitness-gradient text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? '문의 전송 중...' : '무료 컨설팅 신청하기'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className="py-16 bg-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              기업 웰니스 전담팀과 직접 상담하세요
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-fitness-primary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium">전화 상담</div>
                  <div className="text-sm text-muted-foreground">02-0000-0000</div>
                  <div className="text-xs text-muted-foreground">평일 09:00-18:00</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-fitness-secondary rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium">이메일 문의</div>
                  <div className="text-sm text-muted-foreground">corporate@stayfitness.com</div>
                  <div className="text-xs text-muted-foreground">24시간 접수</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-fitness-accent rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium">방문 상담</div>
                  <div className="text-sm text-muted-foreground">서울시 강남구 테헤란로 123</div>
                  <div className="text-xs text-muted-foreground">사전 예약 필수</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}