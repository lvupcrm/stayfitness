"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function UrbanHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-main.jpg"
          alt="스테이피트니스 메인"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Small tagline */}
          <motion.p 
            className="text-green-400 text-sm font-medium tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Premium Fitness Experience
          </motion.p>

          {/* Main headline - Urban Field style */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            지속 가능한
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              건강한 변화
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            과학적 데이터와 전문 코칭이 만나는 곳,<br />
            당신만의 피트니스 여정을 시작하세요
          </motion.p>

          {/* CTA Buttons - Urban Field style */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-medium bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 shadow-2xl shadow-green-600/30 hover:shadow-green-600/40 group"
              asChild
            >
              <Link href="/consultation">
                무료 상담 시작하기
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline" 
              className="h-14 px-8 text-base font-medium border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300"
              asChild
            >
              <Link href="/programs">
                프로그램 살펴보기
              </Link>
            </Button>
          </motion.div>

          {/* Stats - Urban Field style */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Active Members</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Expert Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - Urban Field style */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-white/60 uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/60" />
        </div>
      </motion.div>
    </section>
  )
}