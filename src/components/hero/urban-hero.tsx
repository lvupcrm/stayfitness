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
            className="flex justify-center items-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-stone-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm">1:1 전담 시스템</span>
            </div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="flex items-center gap-2 text-stone-300">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-sm">맞춤형 프로그램</span>
            </div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="flex items-center gap-2 text-stone-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm">확실한 결과</span>
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
              나만을 위한 완전 맞춤 솔루션
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-300">
              1:1 퍼스널 트레이닝
            </span>
            <br />
            <span className="text-white">
              확실한 변화, 지속가능한 결과
            </span>
          </motion.h1>

          {/* Value proposition */}
          <motion.div 
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-stone-200 mb-6 font-medium">
              전담 트레이너 × 맞춤 프로그램 × 지속적 관리
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-2xl mb-2">📊</div>
                <h3 className="text-white font-semibold mb-2">과학적 분석</h3>
                <p className="text-stone-400 text-sm">체성분 분석 기반<br />개인 맞춤 설계</p>
              </div>
              <div className="p-4 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-2xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-2">1:1 전담 관리</h3>
                <p className="text-stone-400 text-sm">전문 트레이너<br />완전 개인 집중</p>
              </div>
              <div className="p-4 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-2xl mb-2">🔄</div>
                <h3 className="text-white font-semibold mb-2">지속적 케어</h3>
                <p className="text-stone-400 text-sm">운동+영양+라이프스타일<br />토탈 관리</p>
              </div>
            </div>
          </motion.div>


          {/* Primary CTA */}
          <motion.div 
            className="flex flex-col items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-600/50 group"
              asChild
            >
              <Link href="/consultation">
                <Calendar className="w-6 h-6 mr-3" />
                1:1 맞춤 상담 신청하기
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <p className="text-stone-400 text-sm">
              📞 전화상담: 02-0000-0000 | 💬 카톡상담 24시간 가능
            </p>
          </motion.div>

          {/* Social proof stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-sm text-stone-400 leading-tight">
                1:1 전담<br />트레이너
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-sm text-stone-400 leading-tight">
                언제든지<br />상담 가능
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">맞춤형</div>
              <div className="text-sm text-stone-400 leading-tight">
                개인별<br />프로그램
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">지속</div>
              <div className="text-sm text-stone-400 leading-tight">
                평생<br />건강 관리
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