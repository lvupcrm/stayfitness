"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Heart, Target, Zap, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Heart,
    title: '건강한 라이프스타일',
    description: '단순한 운동이 아닌, 평생 지속 가능한 건강한 생활 습관을 만들어갑니다.'
  },
  {
    icon: Target,
    title: '개인 맞춤 접근',
    description: '각자의 목표와 체력 수준에 맞는 완전히 개인화된 프로그램을 제공합니다.'
  },
  {
    icon: Users,
    title: '전문가 팀',
    description: '검증된 자격증과 풍부한 경험을 가진 전문 트레이너들이 함께합니다.'
  },
  {
    icon: Zap,
    title: '지속적인 동기부여',
    description: '꾸준한 관리와 격려를 통해 목표 달성까지 끝까지 함께 동행합니다.'
  }
]

const milestones = [
  {
    year: '2019',
    title: '스테이피트니스 설립',
    description: '건강한 삶을 추구하는 사람들을 위한 프리미엄 피트니스 센터로 시작'
  },
  {
    year: '2020',
    title: '홍대점 오픈',
    description: '젊고 활기찬 홍대 지역에 두 번째 지점 개설'
  },
  {
    year: '2021',
    title: '디지털 헬스케어 도입',
    description: '최신 기술을 활용한 체성분 분석 및 운동 트래킹 시스템 구축'
  },
  {
    year: '2022',
    title: '잠실점 확장',
    description: '가족 단위 고객을 위한 프리미엄 시설로 서비스 영역 확대'
  },
  {
    year: '2023',
    title: '1000명 회원 돌파',
    description: '누적 1000명의 회원들과 함께 건강한 변화를 만들어가며 성장'
  },
  {
    year: '2024',
    title: '종합 웰니스 서비스',
    description: '운동, 영양, 라이프스타일 코칭을 통합한 토탈 웰니스 서비스 제공'
  }
]

const stats = [
  { number: '1000+', label: '총 회원 수' },
  { number: '15+', label: '전문 트레이너' },
  { number: '3', label: '지점 운영' },
  { number: '95%', label: '고객 만족도' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-stone-900 to-stone-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                건강한 변화,<br />
                <span className="text-stone-300">함께 만들어가요</span>
              </h1>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                스테이피트니스는 단순한 운동 공간이 아닙니다. 
                개인의 목표와 라이프스타일에 맞는 맞춤형 솔루션으로 
                평생 건강한 삶을 만들어가는 파트너입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="h-14 px-8 bg-white text-stone-900 hover:bg-stone-100 rounded-full"
                  asChild
                >
                  <Link href="/consultation">
                    <Calendar className="w-5 h-5 mr-2" />
                    무료 상담 받기
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-stone-600 text-white hover:bg-stone-800 rounded-full"
                  asChild
                >
                  <Link href="/locations">
                    <MapPin className="w-5 h-5 mr-2" />
                    지점 보기
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/about-hero.jpg"
                alt="스테이피트니스 소개"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-stone-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-stone-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              우리의 가치
            </motion.h2>
            <motion.p 
              className="text-lg text-stone-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              스테이피트니스가 추구하는 핵심 가치와 철학을 소개합니다
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-stone-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              우리의 성장 스토리
            </motion.h2>
            <motion.p 
              className="text-lg text-stone-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              2019년부터 지금까지 스테이피트니스의 발걸음
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold text-sm mr-8 relative z-10">
                    {milestone.year}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-stone-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-stone-800 to-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            우리의 미션
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            &ldquo;모든 사람이 자신만의 속도로 건강한 변화를 경험하고, 
            그 변화가 삶의 모든 영역에서 긍정적인 영향을 미칠 수 있도록 돕는 것&rdquo;
          </motion.p>
          <motion.p 
            className="text-lg text-stone-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            이것이 바로 스테이피트니스가 존재하는 이유입니다.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="h-14 px-8 bg-white text-stone-900 hover:bg-stone-100 rounded-full"
              asChild
            >
              <Link href="/programs">
                프로그램 보기
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="h-14 px-8 border-stone-600 text-white hover:bg-stone-800 rounded-full"
              asChild
            >
              <Link href="/contact">
                문의하기
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}