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
    title: '퍼스널 트레이닝',
    subtitle: '1:1 맞춤 트레이닝',
    description: '개인의 목표와 체력 수준에 맞춘 완벽한 맞춤형 프로그램',
    image: '/images/personal-training.jpg',
    duration: '50분',
    type: '1:1',
    level: '초급-고급',
    price: '회당 80,000원',
    features: [
      '체성분 분석 및 목표 설정',
      '개인별 운동 프로그램 설계',
      '영양 및 라이프스타일 코칭',
      '주기적인 진도 체크 및 프로그램 조정'
    ],
    color: 'from-gray-700 to-gray-800'
  },
  {
    id: 'group',
    title: '그룹 피트니스',
    subtitle: '소규모 그룹 클래스',
    description: '함께하는 에너지로 더 큰 동기부여를 얻는 그룹 트레이닝',
    image: '/images/group-fitness.jpg',
    duration: '60분',
    type: '4-8명',
    level: '초급-중급',
    price: '월 150,000원',
    features: [
      '다양한 프로그램 (요가, 필라테스, 스피닝)',
      '전문 강사의 체계적인 지도',
      '소규모 정원으로 개인 케어',
      '커뮤니티 형성 및 동기부여'
    ],
    color: 'from-gray-600 to-gray-700'
  },
  {
    id: 'premium',
    title: '프리미엄 케어',
    subtitle: '토탈 웰니스 프로그램',
    description: '운동부터 영양, 라이프스타일까지 통합 관리하는 프리미엄 서비스',
    image: '/images/premium-care.jpg',
    duration: '무제한',
    type: '1:1 + 그룹',
    level: '모든 레벨',
    price: '월 500,000원',
    features: [
      '무제한 퍼스널 트레이닝',
      '모든 그룹 클래스 이용',
      '전문 영양사 상담',
      '월간 건강 검진 및 리포트',
      'VIP 라운지 이용'
    ],
    color: 'from-gray-800 to-gray-900'
  }
]

export default function UrbanPrograms() {
  const [selectedProgram, setSelectedProgram] = useState('personal')
  const activeProgram = programs.find(p => p.id === selectedProgram) || programs[0]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header - Urban Field style */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            프로그램
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            당신의 목표에 맞는 최적의 프로그램을 선택하세요
          </motion.p>
        </div>

        {/* Program tabs - Urban Field style */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programs.map((program) => (
            <motion.button
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedProgram === program.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {program.title}
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
                <div className={`absolute inset-0 bg-gradient-to-br ${activeProgram.color} opacity-20`} />
                
                {/* Price badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
                    <p className="text-2xl font-bold text-gray-900">{activeProgram.price}</p>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-gray-600 font-medium mb-2">{activeProgram.subtitle}</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {activeProgram.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {activeProgram.description}
                  </p>
                </div>

                {/* Program info */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{activeProgram.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{activeProgram.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Zap className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{activeProgram.level}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">프로그램 특징</h4>
                  <ul className="space-y-2">
                    {activeProgram.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium"
                    asChild
                  >
                    <Link href="/consultation">
                      상담 신청하기
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 px-8 border-gray-300 rounded-full font-medium"
                    asChild
                  >
                    <Link href="/programs">
                      자세히 보기
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}