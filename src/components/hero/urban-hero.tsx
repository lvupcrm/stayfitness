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
          {/* Problem statement */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-2xl p-6 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-amber-400 font-bold text-center mb-2">
                &ldquo;운동은 했는데, 왜 내 몸은 그대로일까?&rdquo;
              </p>
              <p className="text-lg text-stone-200 text-center">
                제대로 분석하고, 제대로 가르쳐야 <span className="text-white font-semibold">몸이 변합니다.</span>
              </p>
            </div>
          </motion.div>

          {/* Main headline - 체형교정·통증개선 중심 */}
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-stone-300 text-lg md:text-xl font-medium mb-4">
              30~50대 여성의
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              체형교정·통증개선
            </span>
            <span className="block text-stone-200 text-xl md:text-2xl font-medium mt-2 mb-3">
              에 특화된
            </span>
            <span className="text-white">
              스테이피트니스의 1:1 맞춤 트레이닝
            </span>
            <span className="block text-stone-300 text-lg md:text-xl font-medium mt-3">
              으로 &lsquo;진짜 내 몸&rsquo;의 변화를 경험해보세요.
            </span>
          </motion.h1>

          {/* Target audience section */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-stone-800/40 backdrop-blur-sm border border-stone-700 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-amber-400 text-center mb-6">
                이런 분이라면 꼭 오세요
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">운동해도 체형이 변하지 않는 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">어깨, 목, 허리 통증으로 고생하는 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">골반 틀어짐, 다리 부종이 심한 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">출산 후 체형 변화로 고민인 분</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">잘못된 운동으로 부상이 걱정되는 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">체계적인 운동법을 배우고 싶은 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">혼자서는 운동이 어려운 분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-200">건강한 몸매를 오래 유지하고 싶은 분</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Differentiation points */}
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-3xl mb-3">🎯</div>
                <h3 className="text-white font-bold mb-3">1:1 맞춤 분석</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  체성분 분석 + 자세 평가 + 움직임 분석으로<br />
                  <span className="text-amber-400 font-semibold">내 몸에 꼭 맞는</span> 운동 처방
                </p>
              </div>
              <div className="p-6 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-3xl mb-3">🏥</div>
                <h3 className="text-white font-bold mb-3">통증 해결 전문</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  재활 운동 전문가가 직접 관리하는<br />
                  <span className="text-amber-400 font-semibold">체형교정 + 통증개선</span> 프로그램
                </p>
              </div>
              <div className="p-6 bg-stone-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-amber-400 text-3xl mb-3">💪</div>
                <h3 className="text-white font-bold mb-3">지속 가능한 변화</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  단순 다이어트가 아닌<br />
                  <span className="text-amber-400 font-semibold">평생 건강한 몸</span> 만들기
                </p>
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
            <div className="text-center mb-4">
              <p className="text-amber-400 font-bold text-lg mb-2">
                🎁 무료 체험 이벤트
              </p>
              <p className="text-stone-300 text-sm">
                체성분 분석 + 자세 평가 + 1:1 맞춤 운동 체험
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-600/50 group"
              asChild
            >
              <Link href="/consultation">
                <Target className="w-6 h-6 mr-3" />
                무료체험 지금 신청하기
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <p className="text-stone-400 text-sm text-center">
              📞 전화상담: 031-339-9905<br />
              💬 카톡상담 24시간 가능 | 📍 강남·홍대·잠실 3개 지점
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
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">95%</div>
              <div className="text-sm text-stone-400 leading-tight">
                통증 개선<br />성공률
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">30일</div>
              <div className="text-sm text-stone-400 leading-tight">
                체형 변화<br />체감 기간
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">1:1</div>
              <div className="text-sm text-stone-400 leading-tight">
                전담 트레이너<br />맞춤 관리
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">3개</div>
              <div className="text-sm text-stone-400 leading-tight">
                강남·홍대·잠실<br />편리한 지점
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
          <span className="text-xs text-stone-400 uppercase tracking-wider">체형교정 후기 보기</span>
          <ChevronDown className="w-5 h-5 text-stone-400" />
        </div>
      </motion.div>
    </section>
  )
}