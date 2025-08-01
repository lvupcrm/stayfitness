"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Users, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const programs = [
  {
    id: 'personal',
    title: '1:1 퍼스널 트레이닝',
    subtitle: '가장 인기 있는 프로그램',
    description: '전문 트레이너의 완전 맞춤 케어로 확실한 변화를 만들어드립니다',
    image: '/images/personal-training.jpg',
    duration: '50분',
    type: '1:1 전담',
    level: '모든 레벨',
    originalPrice: '월 400,000원',
    currentPrice: '월 200,000원',
    discount: '50% 할인',
    sessionPrice: '회당 50,000원',
    popular: true,
    features: [
      '🎯 개인별 맞춤 운동 프로그램 설계',
      '📊 정밀 체성분 분석 (InBody 포함)', 
      '🍎 맞춤 식단 및 영양 코칭',
      '📈 주 1회 진척도 체크 및 프로그램 조정',
      '💬 24시간 카톡 상담 서비스',
      '🏆 목표 달성시 리워드 시스템'
    ],
    color: 'from-stone-700 to-stone-800',
    guarantee: '3개월 목표 미달성시 1개월 무료 연장'
  },
  {
    id: 'group',
    title: '소규모 그룹 클래스',
    subtitle: '경제적인 선택',
    description: '최대 6명까지만! 준개인 레슨 수준의 세심한 케어',
    image: '/images/group-fitness.jpg',
    duration: '60분',
    type: '2-6명',
    level: '초급-중급',
    originalPrice: '월 200,000원',
    currentPrice: '월 120,000원',
    discount: '40% 할인',
    sessionPrice: '회당 15,000원',
    popular: false,
    features: [
      '👥 최대 6명 소규모 그룹 (개인 케어 가능)',
      '🔥 다양한 프로그램 (크로스핏, 필라테스, 요가)',
      '⚡ 고강도 서킷 트레이닝',
      '👯‍♀️ 동기부여 파트너 시스템',
      '📱 그룹 전용 카톡방 운영',
      '🎉 월 1회 그룹 이벤트 및 챌린지'
    ],
    color: 'from-stone-600 to-stone-700',
    guarantee: '첫 달 만족하지 않으면 100% 환불'
  },
  {
    id: 'premium',
    title: '프리미엄 올인원',
    subtitle: 'VIP 토탈 케어',
    description: '성공을 위한 모든 것이 준비된 최고급 프리미엄 서비스',
    image: '/images/premium-care.jpg',
    duration: '무제한',
    type: 'VIP 전용',
    level: '모든 레벨',
    originalPrice: '월 800,000원',  
    currentPrice: '월 500,000원',
    discount: '37% 할인',
    sessionPrice: '무제한 이용',
    popular: false,
    features: [
      '👑 무제한 1:1 퍼스널 트레이닝',
      '🏃‍♂️ 모든 그룹 클래스 무제한 참여',
      '🥗 전문 영양사 1:1 식단 관리',
      '🏥 월 1회 전신 건강 검진 및 상세 리포트',
      '☕ VIP 라운지 및 전용 락커 이용',
      '🚗 발렛 파킹 서비스',
      '📞 24시간 전담 매니저 서비스'
    ],
    color: 'from-stone-800 to-stone-900',
    guarantee: 'VIP 전용 특별 혜택 및 평생 관리'
  }
]

export default function UrbanPrograms() {
  const [selectedProgram, setSelectedProgram] = useState('personal')
  const activeProgram = programs.find(p => p.id === selectedProgram) || programs[0]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            🔥 이번 주 한정 특가
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-stone-700">1:1 PT 첫 달</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900">
              50% 할인
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            전문 트레이너와 함께하는 체계적인 변화 프로그램
          </motion.p>
        </div>

        {/* Program tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programs.map((program) => (
            <motion.button
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={`relative px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedProgram === program.id
                  ? 'bg-stone-800 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {program.popular && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs px-2 py-1 rounded-full font-bold">
                  인기
                </span>
              )}
              <div className="text-center">
                <div className="font-semibold">{program.title}</div>
                <div className="text-xs opacity-75">{program.subtitle}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Program detail - Urban Field style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={activeProgram.image}
                  alt={activeProgram.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${activeProgram.color} opacity-30`} />
                
                {/* Price badges */}
                <div className="absolute top-6 left-6 space-y-3">
                  <div className="bg-amber-400 text-amber-900 rounded-full px-4 py-2">
                    <p className="text-sm font-bold">{activeProgram.discount}</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4">
                    <p className="text-sm text-stone-600 line-through">{activeProgram.originalPrice}</p>
                    <p className="text-2xl font-bold text-stone-900">{activeProgram.currentPrice}</p>
                    <p className="text-xs text-stone-500">{activeProgram.sessionPrice}</p>
                  </div>
                </div>

                {/* Popular badge */}
                {activeProgram.popular && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-amber-400 text-amber-900 rounded-full px-4 py-2">
                      <p className="text-sm font-bold">⭐ 가장 인기</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-stone-600 font-medium">{activeProgram.subtitle}</span>
                    {activeProgram.popular && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-bold">
                        BEST
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                    {activeProgram.title}
                  </h3>
                  <p className="text-lg text-stone-600 leading-relaxed mb-6">
                    {activeProgram.description}
                  </p>

                  {/* Price info */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-stone-600 line-through">{activeProgram.originalPrice}</p>
                        <p className="text-3xl font-bold text-stone-900">{activeProgram.currentPrice}</p>
                        <p className="text-sm text-stone-600">{activeProgram.sessionPrice}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
                          {activeProgram.discount}
                        </span>
                      </div>
                    </div>
                    <div className="bg-stone-100 rounded-lg p-3">
                      <p className="text-sm text-stone-700 font-medium">✅ {activeProgram.guarantee}</p>
                    </div>
                  </div>
                </div>

                {/* Program info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Clock className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-900">{activeProgram.duration}</p>
                    <p className="text-xs text-stone-600">세션 시간</p>
                  </div>
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Users className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-900">{activeProgram.type}</p>
                    <p className="text-xs text-stone-600">수업 형태</p>
                  </div>
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Zap className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-900">{activeProgram.level}</p>
                    <p className="text-xs text-stone-600">난이도</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-stone-900">포함 서비스</h4>
                  <div className="grid gap-3">
                    {activeProgram.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-stone-50 rounded-xl"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-stone-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-4">
                  <Button 
                    size="lg"
                    className="h-14 px-8 bg-stone-800 hover:bg-stone-700 text-white rounded-full font-bold text-lg"
                    asChild
                  >
                    <Link href="/consultation">
                      지금 무료 체험 신청하기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-stone-600">
                    📞 즉시 상담: 02-0000-0000 | 💬 카톡 상담 24시간
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}