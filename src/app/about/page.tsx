"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Heart, Target, Zap, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Heart,
    title: '편안하고 따뜻한 공간',
    description: '기존 헬스장의 위압적인 분위기 대신, 따뜻하고 밝은 공간에서 부담 없이 운동할 수 있습니다.'
  },
  {
    icon: Target,
    title: '초심자 친화적 환경',
    description: '운동이 처음인 분들을 위한 환경. 회원 중 60%가 운동 초심자로, 누구나 쉽게 시작할 수 있습니다.'
  },
  {
    icon: Users,
    title: '다양한 트레이닝 옵션',
    description: 'PT, 필라테스, 웨이트존 등 다양한 운동 방식을 제공하여 본인에게 맞는 스타일을 찾을 수 있습니다.'
  },
  {
    icon: Zap,
    title: '유연한 운영시간',
    description: '바쁜 현대인의 일정에 맞춰 유연한 운영시간을 제공하여 꾸준한 운동 습관을 만들 수 있습니다.'
  }
]

const milestones = [
  {
    year: '2019',
    title: '스테이피트니스 설립',
    description: '"당신의 건강이 머무르는 공간"을 만들기 위해 브랜드 탄생'
  },
  {
    year: '2020',
    title: '초심자 친화적 환경 구축',
    description: '운동 초심자도 편안하게 시작할 수 있는 따뜻하고 밝은 공간 조성'
  },
  {
    year: '2021',
    title: '다양한 트레이닝 프로그램 도입',
    description: 'PT, 필라테스, 웨이트존 등 개인 스타일에 맞는 다양한 운동 옵션 제공'
  },
  {
    year: '2022',
    title: '직영 운영 시스템 확립',
    description: '모든 지점을 직영으로 운영하여 한결같은 서비스와 환경 보장'
  },
  {
    year: '2023',
    title: '초심자 회원 60% 달성',
    description: '운동이 처음인 분들이 가장 많이 찾는 피트니스로 자리매김'
  },
  {
    year: '2024',
    title: '운동 습관화 프로그램 완성',
    description: '운동을 일상으로 만드는 지속 가능한 건강 관리 시스템 구축'
  }
]

const stats = [
  { number: '60%', label: '운동 초심자 회원' },
  { number: '직영', label: '모든 지점 운영' },
  { number: '3', label: '서울 내 지점' },
  { number: '일상', label: '운동을 만드는 공간' }
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
                운동을 일상으로,<br />
                <span className="text-stone-300">건강이 머무는 공간</span>
              </h1>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                운동을 &lsquo;도전&rsquo;이 아니라 &lsquo;일상&rsquo;으로 만드는 곳. 
                누구나 편하게 찾아와 오래 머물 수 있는 피트니스, 
                당신의 건강이 자연스럽게 습관이 되는 공간입니다.
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
              스테이피트니스만의 차별점
            </motion.h2>
            <motion.p 
              className="text-lg text-stone-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              운동을 도전이 아닌 일상으로 만드는 스테이피트니스의 특별함을 소개합니다
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
            &ldquo;운동은 &lsquo;잠깐 하는 것&rsquo;이 아니라, 삶의 일부가 되어야 한다고 믿습니다. 
            누구나 부담 없이 찾아오고, 자연스럽게 운동을 지속할 수 있는 공간을 만듭니다.&rdquo;
          </motion.p>
          <motion.p 
            className="text-lg text-stone-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            운동이 하루하루의 루틴이 되고, 꾸준한 습관이 될 수 있도록. 
            지금, 당신의 건강이 머무를 수 있는 공간에서 시작하세요.
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