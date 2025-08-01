"use client"

// import Image from "next/image" // TODO: 센터 영상으로 교체 시 사용
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function UrbanHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Background video placeholder - 센터 영상이 들어갈 자리 */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* TODO: 센터 영상으로 교체 예정 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center opacity-30">
            <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-slate-500 text-sm">센터 소개 영상</p>
          </div>
        </div>
        
        {/* Video overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/60" />
      </motion.div>

      {/* Brand Message Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Main Brand Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="stay-heading-xl text-white mb-6">
              <span className="block mb-2">Not just fitness,</span>
              <span className="stay-text-gradient">It&apos;s transformation</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-200 mb-8 stay-body leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              체형교정과 통증개선의 새로운 기준<br />
              <span className="text-slate-300">스테이피트니스에서 시작하세요</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button 
                variant="accent" 
                size="xl"
                asChild
                className="group"
              >
                <Link href="/consultation">
                  무료 체험 신청하기
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                asChild
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/about">
                  센터 둘러보기
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Brand Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold stay-text-gradient mb-2">95%</div>
              <div className="text-sm text-slate-400 stay-body">
                통증 개선<br />성공률
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold stay-text-gradient mb-2">30일</div>
              <div className="text-sm text-slate-400 stay-body">
                체형 변화<br />체감 기간
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold stay-text-gradient mb-2">1:1</div>
              <div className="text-sm text-slate-400 stay-body">
                전담 트레이너<br />맞춤 관리
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold stay-text-gradient mb-2">3개</div>
              <div className="text-sm text-slate-400 stay-body">
                강남·홍대·잠실<br />편리한 지점
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider stay-body">Scroll for more</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}