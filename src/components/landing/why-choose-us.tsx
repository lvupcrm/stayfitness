"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain,
  Users,
  LineChart,
  Shield,
  Award,
  Zap,
  Heart,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    id: 'science',
    icon: Brain,
    title: '과학적 데이터 분석',
    subtitle: 'Data-Driven Approach',
    description: '체성분 분석, 운동 패턴, 회복 데이터를 종합하여 개인별 최적화된 프로그램을 설계합니다.',
    details: [
      'InBody 체성분 정밀 분석',
      'VO2 max 심폐지구력 측정',
      '근력 밸런스 테스트',
      '수면 & 스트레스 패턴 분석',
      '영양 상태 평가'
    ],
    image: '/images/science-approach.jpg',
    stats: [
      { label: '정확도', value: '98%' },
      { label: '개인화 수준', value: '100%' },
      { label: '데이터 포인트', value: '50+' }
    ]
  },
  {
    id: 'community',
    icon: Users,
    title: '함께하는 성장',
    subtitle: 'Community Growth',
    description: '혼자가 아닌 함께, 전문 트레이너와 동료들과 함께하는 지속 가능한 동기부여 시스템입니다.',
    details: [
      '1:1 전담 트레이너 배정',
      '소그룹 워크샵 & 챌린지',
      '온라인 커뮤니티 활동',
      '정기 성과 공유 세션',
      '멘토-멘티 시스템'
    ],
    image: '/images/community-growth.jpg',
    stats: [
      { label: '지속률', value: '94%' },
      { label: '만족도', value: '4.9/5' },
      { label: '커뮤니티 활성도', value: '92%' }
    ]
  },
  {
    id: 'tracking',
    icon: LineChart,
    title: '실시간 성과 추적',
    subtitle: 'Real-time Progress',
    description: '매일의 변화를 시각화하고, 목표 달성까지의 여정을 투명하게 관리합니다.',
    details: [
      '실시간 운동 데이터 수집',
      '개인별 대시보드 제공',
      '목표 대비 진행률 알림',
      'AI 기반 조언 시스템',
      '성과 리포트 자동 생성'
    ],
    image: '/images/progress-tracking.jpg',
    stats: [
      { label: '목표 달성률', value: '89%' },
      { label: '데이터 정확도', value: '99%' },
      { label: '실시간 업데이트', value: '24/7' }
    ]
  },
  {
    id: 'safety',
    icon: Shield,
    title: '안전한 운동 환경',
    subtitle: 'Safety First',
    description: '부상 방지부터 응급상황 대응까지, 안전을 최우선으로 하는 시설과 시스템을 갖추고 있습니다.',
    details: [
      '운동 전 메디컬 체크',
      '자세 교정 실시간 모니터링',
      '응급의료진 상주',
      '보험 완비 시설',
      '24시간 CCTV 보안'
    ],
    image: '/images/safety-first.jpg',
    stats: [
      { label: '부상률', value: '0.1%' },
      { label: '안전 등급', value: 'A+' },
      { label: '응급 대응', value: '2분' }
    ]
  }
]

const businessStats = [
  { icon: TrendingUp, label: '회원 성장률', value: '300%', period: '연간' },
  { icon: Award, label: '업계 수상', value: '15+', period: '3년간' },
  { icon: Users, label: '전문 트레이너', value: '25+', period: '상시' },
  { icon: Heart, label: '회원 만족도', value: '4.9/5', period: '평균' }
]

export default function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState('science')
  const activeData = features.find(f => f.id === activeFeature) || features[0]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-fitness-primary" />
            <span className="text-fitness-primary font-semibold tracking-wide uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            왜 <span className="text-fitness-primary">스테이피트니스</span>일까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            단순한 헬스장이 아닌, 당신의 라이프스타일을 혁신하는 웰니스 파트너가 되겠습니다
          </p>
        </div>

        {/* 비즈니스 지표 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {businessStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-fitness-primary/5 to-fitness-secondary/5 rounded-2xl border border-fitness-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <stat.icon className="w-8 h-8 text-fitness-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-fitness-primary font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.period}</div>
            </motion.div>
          ))}
        </div>

        {/* 메인 특징 섹션 */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* 좌측 네비게이션 */}
            <div className="lg:col-span-2 space-y-4">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                    activeFeature === feature.id
                      ? 'border-fitness-primary bg-fitness-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-fitness-primary/30 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFeature === feature.id
                        ? 'bg-fitness-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-1 ${
                        activeFeature === feature.id ? 'text-fitness-primary' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{feature.subtitle}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 우측 상세 내용 */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-0 shadow-2xl">
                  <div className="relative h-64">
                    <Image
                      src={activeData.image}
                      alt={activeData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{activeData.title}</h3>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {activeData.subtitle}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    {/* 상세 기능 목록 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">핵심 기능</h4>
                      <div className="space-y-3">
                        {activeData.details.map((detail, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-fitness-primary flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* 성과 지표 */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">성과 지표</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {activeData.stats.map((stat, index) => (
                          <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-fitness-primary mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1 fitness-gradient text-white">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        체험해보기
                      </Button>
                      <Button variant="outline" className="flex-1">
                        자세히 알아보기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              지금 바로 차이를 경험해보세요
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              첫 방문 시 무료 체성분 분석과 전문 상담을 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button asChild size="lg" className="fitness-gradient text-white flex-1">
                <a href="/consultation">
                  무료 상담 예약
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <a href="/contact">
                  센터 둘러보기
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}