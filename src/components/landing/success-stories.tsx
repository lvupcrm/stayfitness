"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  TrendingUp, 
  Calendar,
  Award,
  Target
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const successStories = [
  {
    id: 1,
    name: "김민수",
    age: 34,
    profession: "IT 개발자",
    period: "6개월",
    achievement: "체중 15kg 감량",
    rating: 5,
    image: "/images/success-1.jpg",
    beforeImage: "/images/before-1.jpg",
    afterImage: "/images/after-1.jpg",
    testimony: "야근이 잦은 개발자로서 건강 관리가 어려웠는데, 스테이피트니스의 데이터 기반 맞춤 프로그램 덕분에 효율적으로 목표를 달성할 수 있었어요. 특히 개발자 특성을 이해한 운동 스케줄링이 정말 도움됐습니다.",
    metrics: [
      { label: "체중", before: "82kg", after: "67kg" },
      { label: "체지방률", before: "28%", after: "15%" },
      { label: "근육량", before: "35kg", after: "42kg" }
    ],
    tags: ["체중감량", "근력증가", "라이프스타일 개선"]
  },
  {
    id: 2,
    name: "박서연",
    age: 28,
    profession: "마케터",
    period: "4개월",
    achievement: "근력 40% 향상",
    rating: 5,
    image: "/images/success-2.jpg",
    beforeImage: "/images/before-2.jpg",
    afterImage: "/images/after-2.jpg",
    testimony: "운동 초보였던 제가 이렇게 변할 수 있을 줄 몰랐어요. 트레이너님의 체계적인 가이드와 커뮤니티의 응원 덕분에 포기하지 않고 목표를 달성했습니다. 이제는 운동이 즐거워졌어요!",
    metrics: [
      { label: "벤치프레스", before: "20kg", after: "45kg" },
      { label: "스쿼트", before: "30kg", after: "70kg" },
      { label: "데드리프트", before: "40kg", after: "80kg" }
    ],
    tags: ["근력강화", "자세교정", "자신감 향상"]
  },
  {
    id: 3,
    name: "이준호",
    age: 42,
    profession: "경영진",
    period: "8개월",
    achievement: "마라톤 완주",
    rating: 5,
    image: "/images/success-3.jpg",
    beforeImage: "/images/before-3.jpg",
    afterImage: "/images/after-3.jpg",
    testimony: "40대 중반 건강에 대한 위기감으로 시작했는데, 체계적인 케어와 정기적인 건강 체크업 덕분에 인생 최고 컨디션을 유지하고 있습니다. 회사 업무 효율성도 크게 향상됐어요.",
    metrics: [
      { label: "심폐지구력", before: "하", after: "상" },
      { label: "체력연령", before: "50세", after: "35세" },
      { label: "혈압", before: "140/90", after: "120/80" }
    ],
    tags: ["심폐강화", "건강개선", "스트레스 해소"]
  }
]

export default function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [showMetrics, setShowMetrics] = useState(false)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const currentData = successStories[currentStory]

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-fitness-primary" />
            <span className="text-fitness-primary font-semibold tracking-wide uppercase">Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            실제 회원들의
            <br className="sm:hidden" />
            <span className="text-fitness-primary"> 놀라운 변화</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            데이터로 증명하는 성공 스토리, 당신도 이런 변화를 경험할 수 있습니다
          </p>
        </div>

        {/* 메인 스토리 카드 */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden bg-white shadow-xl border-0">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* 좌측 - 이미지 & 정보 */}
                    <div className="relative">
                      <div className="relative h-96 lg:h-full">
                        <Image
                          src={currentData.image}
                          alt={`${currentData.name} 성공 스토리`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* 기본 정보 오버레이 */}
                        <div className="absolute bottom-6 left-6 text-white">
                          <div className="flex items-center space-x-2 mb-2">
                            {[...Array(currentData.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-1">{currentData.name}</h3>
                          <p className="text-white/80">{currentData.profession}, {currentData.age}세</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{currentData.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm">{currentData.achievement}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 우측 - 상세 정보 */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-fitness-primary/10 text-fitness-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* 후기 */}
                      <div className="mb-8">
                        <Quote className="w-8 h-8 text-fitness-primary/30 mb-4" />
                        <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                          &ldquo;{currentData.testimony}&rdquo;
                        </blockquote>
                      </div>

                      {/* 메트릭 토글 버튼 */}
                      <div className="space-y-4">
                        <Button
                          onClick={() => setShowMetrics(!showMetrics)}
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <span>상세 변화 지표 보기</span>
                          <Target className={`w-4 h-4 transition-transform ${showMetrics ? 'rotate-90' : ''}`} />
                        </Button>

                        {/* 메트릭 표시 */}
                        <AnimatePresence>
                          {showMetrics && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 gap-4"
                            >
                              {currentData.metrics.map((metric, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-900">{metric.label}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-center">
                                      <div className="text-sm text-gray-500 mb-1">이전</div>
                                      <div className="font-bold text-gray-600">{metric.before}</div>
                                    </div>
                                    <div className="flex-1 mx-4">
                                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-fitness-primary to-fitness-secondary rounded-full w-full" />
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-sm text-gray-500 mb-1">현재</div>
                                      <div className="font-bold text-fitness-primary">{metric.after}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* 네비게이션 */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={prevStory}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>이전</span>
            </Button>

            {/* 인디케이터 */}
            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentStory === index 
                      ? 'bg-fitness-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStory}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <span>다음</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              당신도 이런 변화를 경험해보세요
            </h3>
            <p className="text-gray-600 mb-8">
              첫 상담은 무료입니다. 전문가와 함께 당신만의 성공 스토리를 시작하세요.
            </p>
            <Button asChild size="lg" className="fitness-gradient text-white px-8 py-3">
              <a href="/consultation">
                무료 상담 예약하기
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}