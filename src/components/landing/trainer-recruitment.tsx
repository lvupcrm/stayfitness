"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users,
  TrendingUp,
  Award,
  Heart,
  DollarSign,
  Clock,
  Briefcase,
  GraduationCap,
  Coffee,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: DollarSign,
    title: '경쟁력 있는 급여',
    description: '업계 최고 수준의 급여와 성과급',
    details: ['기본급 + 인센티브', '연봉 협상 가능', '정기 급여 조정'],
    highlight: '연 3,500만원~'
  },
  {
    icon: TrendingUp,
    title: '전문성 개발',
    description: '지속적인 교육과 성장 기회',
    details: ['해외 연수 기회', '자격증 취득 지원', '컨퍼런스 참석'],
    highlight: '교육비 100% 지원'
  },
  {
    icon: Users,
    title: '팀워크 문화',
    description: '함께 성장하는 협업 환경',
    details: ['멘토링 시스템', '팀 빌딩 활동', '소통 중심 문화'],
    highlight: '만족도 4.8/5'
  },
  {
    icon: Clock,
    title: '워라밸',
    description: '건강한 일과 삶의 균형',
    details: ['유연 근무제', '월 휴가 보장', '복지 시설 이용'],
    highlight: '주 40시간'
  }
]

const positions = [
  {
    title: '퍼스널 트레이너',
    type: '정규직',
    experience: '1년 이상',
    location: '강남센터',
    urgent: true,
    requirements: [
      '생활스포츠지도사 2급 이상',
      '퍼스널 트레이닝 경력 1년 이상',
      '고객 응대 및 상담 능력',
      '운동처방 및 프로그램 설계'
    ],
    preferred: [
      '체육 관련 학과 졸업',
      'NSCA, ACSM 등 국제 자격증',
      '기업 웰니스 프로그램 경험',
      '영어 회화 가능자'
    ],
    salary: '3,000만원 ~ 5,000만원'
  },
  {
    title: '그룹 피트니스 강사',
    type: '계약직',
    experience: '경력무관',
    location: '강남센터',
    urgent: false,
    requirements: [
      '요가, 필라테스, 스피닝 등 전문 자격증',
      '그룹 수업 진행 경험',
      '안전한 수업 진행 능력',
      '회원 관리 및 동기부여'
    ],
    preferred: [
      '다양한 장르 수업 가능',
      '온라인 수업 경험',
      '음악 및 안무 편집 가능',
      '밝고 긍정적인 성격'
    ],
    salary: '시급 5만원 ~ 8만원'
  },
  {
    title: '재활 트레이너',
    type: '정규직',
    experience: '3년 이상',
    location: '강남센터',
    urgent: true,
    requirements: [
      '물리치료사 면허 또는 관련 자격증',
      '재활 트레이닝 경력 3년 이상',
      '의료진과의 협업 경험',
      '개인별 맞춤 재활 프로그램 설계'
    ],
    preferred: [
      '스포츠 재활 전문 과정 이수',
      '도수치료 경험',
      '재활 기구 활용 능력',
      '환자 상담 및 교육 능력'
    ],
    salary: '3,500만원 ~ 6,000만원'
  }
]

const cultureHighlights = [
  {
    icon: Coffee,
    title: 'Coffee Chat 문화',
    description: '자유로운 소통과 아이디어 공유'
  },
  {
    icon: Award,
    title: '성과 인정 시스템',
    description: '공정한 평가와 적극적인 보상'
  },
  {
    icon: Heart,
    title: '웰니스 복지',
    description: '직원 건강을 위한 다양한 혜택'
  },
  {
    icon: GraduationCap,
    title: '교육 지원',
    description: '전문성 향상을 위한 교육비 지원'
  }
]

export default function TrainerRecruitment() {
  const [selectedPosition, setSelectedPosition] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-fitness-primary/5 via-white to-fitness-secondary/5">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="w-6 h-6 text-fitness-primary" />
            <span className="text-fitness-primary font-semibold tracking-wide uppercase">Join Our Team</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            함께 성장할 <span className="text-fitness-primary">전문가</span>를 찾습니다
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            스테이피트니스와 함께 피트니스 업계의 새로운 기준을 만들어갈 파트너를 기다립니다
          </p>
        </div>

        {/* 혜택 및 복지 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            왜 <span className="text-fitness-primary">스테이피트니스</span>에서 일해야 할까요?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-fitness-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-fitness-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    <div className="text-2xl font-bold text-fitness-primary">
                      {benefit.highlight}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-center mb-4">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-fitness-primary mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 채용 포지션 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">현재 채용중인 포지션</h3>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      selectedPosition === index 
                        ? 'border-fitness-primary shadow-lg bg-fitness-primary/5' 
                        : 'border-gray-200 hover:border-fitness-primary/50'
                    }`}
                    onClick={() => setSelectedPosition(index)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{position.title}</CardTitle>
                        {position.urgent && (
                          <Badge className="bg-red-500 text-white">급구</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{position.type}</Badge>
                        <Badge variant="outline">{position.experience}</Badge>
                        <Badge variant="outline">{position.location}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold text-fitness-primary mb-2">
                        {position.salary}
                      </div>
                      <p className="text-sm text-gray-600">
                        {position.requirements.slice(0, 2).join(', ')}...
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* 선택된 포지션 상세 정보 */}
            <motion.div
              key={selectedPosition}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <h4 className="text-xl font-bold">{positions[selectedPosition].title}</h4>
                        {positions[selectedPosition].urgent && (
                          <Badge className="bg-red-500 text-white">급구</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Target className="w-5 h-5 text-fitness-primary mr-2" />
                            필수 자격요건
                          </h5>
                          <ul className="space-y-2">
                            {positions[selectedPosition].requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <CheckCircle className="w-4 h-4 text-fitness-primary mr-2 flex-shrink-0 mt-0.5" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Star className="w-5 h-5 text-fitness-secondary mr-2" />
                            우대사항
                          </h5>
                          <ul className="space-y-2">
                            {positions[selectedPosition].preferred.map((pref, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <Star className="w-4 h-4 text-fitness-secondary mr-2 flex-shrink-0 mt-0.5" />
                                {pref}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="lg:border-l lg:pl-8">
                      <div className="bg-gradient-to-br from-fitness-primary/10 to-fitness-secondary/10 rounded-2xl p-6 mb-6">
                        <h5 className="font-semibold text-gray-900 mb-4">급여 정보</h5>
                        <div className="text-2xl font-bold text-fitness-primary mb-2">
                          {positions[selectedPosition].salary}
                        </div>
                        <p className="text-sm text-gray-600">
                          * 경력 및 역량에 따라 협의 가능
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button asChild className="w-full fitness-gradient text-white">
                          <Link href="/careers">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            지원하기
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/consultation">
                            <Coffee className="w-4 h-4 mr-2" />
                            Coffee Chat 신청
                          </Link>
                        </Button>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600 text-center">
                          궁금한 점이 있으시면 언제든 편하게 연락주세요!
                          <br />
                          <span className="font-medium">📞 02-1234-5678</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* 회사 문화 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">우리의 문화</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureHighlights.map((culture, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-fitness-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <culture.icon className="w-8 h-8 text-fitness-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{culture.title}</h4>
                <p className="text-sm text-gray-600">{culture.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 최종 CTA */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-fitness-primary to-fitness-secondary rounded-3xl p-8 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">
              당신의 꿈을 현실로 만들어보세요
            </h3>
            <p className="text-lg mb-6 opacity-90">
              스테이피트니스와 함께 성장하며, 더 많은 사람들의 건강한 변화를 이끌어주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-fitness-primary hover:bg-gray-50">
                <Link href="/careers">
                  지금 지원하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/consultation">
                  Coffee Chat 예약
                  <Coffee className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}