"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Users, Target, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-fitness-primary/95 via-fitness-secondary/90 to-fitness-accent/85">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-main.jpg"
          alt="스테이피트니스 - 현대적인 피트니스 센터"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-fitness-primary/90 via-fitness-secondary/80 to-fitness-accent/90" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 콘텐츠 */}
          <motion.div 
            className="text-white space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 브랜드 태그라인 */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-0.5 bg-white/60"></div>
              <span className="text-white/80 font-medium tracking-wide">STAY STRONG, STAY TOGETHER</span>
            </div>

            {/* 메인 헤드라인 */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                지속 가능한
                <br />
                <span className="text-fitness-light bg-gradient-to-r from-fitness-light to-white bg-clip-text text-transparent">
                  건강한 변화
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-2xl">
                과학적 데이터와 전문 코칭이 만나는 곳,
                <br />
                당신의 피트니스 여정을 함께 설계합니다
              </p>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/70 text-sm">성공한 회원</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/70 text-sm">목표 달성률</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/70 text-sm">전문 케어</div>
              </motion.div>
            </div>

            {/* CTA 버튼들 */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-fitness-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all group"
              >
                <Link href="/consultation">
                  무료 상담 받기
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-lg px-8 py-6 rounded-full group"
              >
                <Link href="#success-stories">
                  <Play className="w-5 h-5 mr-2" />
                  성공 스토리 보기
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* 우측 특징 카드들 */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 과학적 접근 카드 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-fitness-light/20 rounded-xl flex items-center justify-center group-hover:bg-fitness-light/30 transition-colors">
                  <Target className="w-6 h-6 text-fitness-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">과학적 맞춤 설계</h3>
                  <p className="text-white/80">체성분 분석부터 운동 패턴까지, 데이터로 증명하는 개인별 최적 프로그램</p>
                </div>
              </div>
            </motion.div>

            {/* 커뮤니티 카드 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-fitness-light/20 rounded-xl flex items-center justify-center group-hover:bg-fitness-light/30 transition-colors">
                  <Users className="w-6 h-6 text-fitness-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">함께하는 성장</h3>
                  <p className="text-white/80">전문 트레이너와 동료 회원들이 함께하는 지속 가능한 동기부여 시스템</p>
                </div>
              </div>
            </motion.div>

            {/* 성과 추적 카드 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-fitness-light/20 rounded-xl flex items-center justify-center group-hover:bg-fitness-light/30 transition-colors">
                  <TrendingUp className="w-6 h-6 text-fitness-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">실시간 성과 관리</h3>
                  <p className="text-white/80">매일의 변화를 시각화하고, 목표 달성까지의 여정을 투명하게 공유</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 하단 신뢰도 지표 */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-white/60 mb-4">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">TRUSTED BY PROFESSIONALS</span>
          </div>
          <p className="text-white/80 text-lg">
            강남구 프리미엄 피트니스 | 500+ 회원이 선택한 건강한 변화의 시작
          </p>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}