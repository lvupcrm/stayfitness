"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Calendar, Trophy, Target } from "lucide-react"
import { motion } from "framer-motion"

export default function UrbanHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-main.jpg"
          alt="스테이피트니스 1:1 퍼스널 트레이닝"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/60 to-stone-900/80" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Trust indicators */}
          <motion.div 
            className="flex justify-center items-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-stone-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm">1000+ 성공사례</span>
            </div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="flex items-center gap-2 text-stone-300">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-sm">95% 목표달성</span>
            </div>
          </motion.div>

          {/* Main headline - 1:1 PT 중심 */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-stone-300 text-lg md:text-xl font-medium mb-4">
              단 3개월만에 몸이 바뀝니다
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-300">
              1:1 맞춤 PT
            </span>
            <br />
            <span className="text-white">
              체계적 변화
            </span>
          </motion.h1>

          {/* Value proposition */}
          <motion.div 
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-stone-200 mb-4 font-medium">
              체성분 분석부터 식단 관리까지
            </p>
            <p className="text-lg text-stone-300 leading-relaxed">
              전문 트레이너가 당신만을 위한 완전 맞춤 프로그램으로<br />
              확실한 변화를 만들어드립니다
            </p>
          </motion.div>

          {/* Urgency & offer */}
          <motion.div 
            className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-2xl p-6 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-amber-400 font-bold text-lg mb-2">
              🔥 지금 시작하면 특별 혜택
            </div>
            <div className="text-white font-semibold text-xl mb-3">
              첫 달 50% 할인 + 무료 체성분 분석
            </div>
            <div className="text-stone-300 text-sm">
              ⏰ 이번 주 한정 • 선착순 20명
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div 
            className="flex flex-col items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg font-bold bg-stone-700 hover:bg-stone-600 text-white rounded-full transition-all duration-300 shadow-2xl shadow-stone-700/40 hover:shadow-stone-600/50 group"
              asChild
            >
              <Link href="/consultation">
                <Calendar className="w-6 h-6 mr-3" />
                무료 체험 + 상담 예약하기
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <p className="text-stone-400 text-sm">
              📞 전화상담: 02-0000-0000 | 💬 카톡상담 24시간 가능
            </p>
          </motion.div>

          {/* Social proof stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-sm text-stone-400 leading-tight">
                성공적인<br />변화 사례
              </div>
            </div>
            <div className="text-center border-x border-stone-700">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">-15kg</div>
              <div className="text-sm text-stone-400 leading-tight">
                평균 체중<br />감량 효과
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-sm text-stone-400 leading-tight">
                고객 만족도<br />평점
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-stone-400 uppercase tracking-wider">성공사례 보기</span>
          <ChevronDown className="w-5 h-5 text-stone-400" />
        </div>
      </motion.div>
    </section>
  )
}