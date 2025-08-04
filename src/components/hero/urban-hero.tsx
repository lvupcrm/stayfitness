'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { VideoBackground } from './video-background'

export default function UrbanHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Background video with optimized loading */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <VideoBackground
          videoSrc={{
            webm: '/videos/hero-bg.webm',
            mp4: '/videos/hero-bg.mp4'
          }}
          posterImage="/images/hero-poster.jpg"
          priority
        />
        
        {/* Video overlay for better text contrast */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/70"
          aria-hidden="true"
        />
      </motion.div>

      {/* Brand Message Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-0">
          {/* Main Brand Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 stay-heading tracking-tight">
              <span className="block mb-2">Not just fitness,</span>
              <span className="stay-text-gradient">It&apos;s transformation</span>
            </h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-6 sm:mb-8 stay-body leading-relaxed max-w-2xl mx-auto"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <StatItem value="95%" label={['통증 개선', '성공률']} />
            <StatItem value="30일" label={['체형 변화', '체감 기간']} />
            <StatItem value="1:1" label={['전담 트레이너', '맞춤 관리']} />
            <StatItem value="3개" label={['강남·홍대·잠실', '편리한 지점']} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider stay-body">Scroll for more</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

// 통계 아이템 컴포넌트
function StatItem({ value, label }: { value: string, label: [string, string] }) {
  return (
    <div className="text-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold stay-text-gradient mb-1 sm:mb-2">{value}</div>
      <div className="text-xs sm:text-sm text-slate-400 stay-body">
        {label[0]}<br />{label[1]}
      </div>
    </div>
  )
}