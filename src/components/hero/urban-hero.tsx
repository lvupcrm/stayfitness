"use client"

// import Image from "next/image" // TODO: 센터 영상으로 교체 시 사용
import { motion } from "framer-motion"

export default function UrbanHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-stone-900">
      {/* Background video placeholder - 센터 영상이 들어갈 자리 */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* TODO: 센터 영상으로 교체 예정 */}
        <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <svg className="w-12 h-12 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-stone-500 text-sm">센터 소개 영상</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}