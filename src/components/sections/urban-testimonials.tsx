"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: "김민수",
    role: "IT 개발자, 34세",
    image: "/images/testimonial-1.jpg",
    beforeAfter: "3개월 만에 -15kg 성공",
    content: "평생 다이어트 실패만 반복했는데, 트레이너님의 1:1 맞춤 관리로 드디어 성공했습니다! 체성분 분석부터 식단 관리까지, 과학적인 접근이 정말 달랐어요.",
    quote: "이제 거울 보는 게 즐거워요!",
    stats: {
      weight: "-15kg",
      bodyFat: "-8%",
      muscle: "+3kg"
    },
    period: "3개월"
  },
  {
    id: 2,
    name: "이서연",
    role: "마케터, 28세", 
    image: "/images/testimonial-2.jpg",
    beforeAfter: "4개월 만에 완전히 다른 몸",
    content: "운동 초보였던 제가 이렇게 변할 수 있을 줄 몰랐어요. 개인 맞춤 프로그램이라 무리없이 점진적으로 발전할 수 있었고, 트레이너님이 항상 격려해주셔서 포기하지 않았어요.",
    quote: "친구들이 완전 다른 사람이 됐다고 해요!",
    stats: {
      strength: "+180%",
      체지방: "-12%",
      근육량: "+4kg"
    },
    period: "4개월"
  },
  {
    id: 3,
    name: "박준호",
    role: "CEO, 42세",
    image: "/images/testimonial-3.jpg", 
    beforeAfter: "5개월 만에 20대 체력 회복",
    content: "나이 때문에 포기하려던 건강 관리를 다시 시작할 수 있게 해주셨어요. 바쁜 스케줄에 맞춰 효율적인 운동법을 알려주시고, 회사에서도 에너지가 넘쳐요.",
    quote: "20대보다 지금이 더 건강해요!",
    stats: {
      체력: "+200%",
      스트레스: "-70%",
      업무효율: "+50%"
    },
    period: "5개월"
  },
  {
    id: 4,
    name: "정민아",
    role: "주부, 36세",
    image: "/images/testimonial-4.jpg",
    beforeAfter: "6개월 만에 건강한 엄마가 되다",
    content: "출산 후 늘어난 체중과 체력 저하로 고민이 많았는데, 산후 운동 전문 프로그램으로 안전하게 건강을 되찾을 수 있었어요. 아이들과 놀아주는 것도 이제 전혀 힘들지 않아요!",
    quote: "아이들이 엄마가 예뻐졌다고 해요!",
    stats: {
      체중: "-18kg",
      체력: "+150%", 
      자신감: "MAX"
    },
    period: "6개월"
  }
]

export default function UrbanTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            🏆 실제 회원 성공사례
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-stone-700">평균 3개월에</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900">
              -15kg 감량 성공
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            1000명 이상의 회원이 검증한 체계적인 1:1 PT 프로그램
          </motion.p>
        </div>

        {/* Testimonial carousel - Urban Field style */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="border-0 shadow-xl bg-white overflow-hidden">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left: Image */}
                  <div className="md:col-span-2 relative h-96 md:h-auto">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                    
                    {/* Name overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold">{testimonials[currentIndex].name}</h3>
                      <p className="text-white/80">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-3 p-8 md:p-12">
                    {/* Before/After badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      ⚡ {testimonials[currentIndex].beforeAfter}
                    </div>
                    
                    <Quote className="w-10 h-10 text-stone-200 mb-6" />
                    
                    <blockquote className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                      {testimonials[currentIndex].content}
                    </blockquote>

                    {/* Highlight quote */}
                    <div className="bg-stone-50 border-l-4 border-stone-600 p-4 mb-8">
                      <p className="text-stone-800 font-semibold italic">
                        &ldquo;{testimonials[currentIndex].quote}&rdquo;
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200">
                      {Object.entries(testimonials[currentIndex].stats).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-2xl font-bold text-stone-700">{value}</div>
                          <div className="text-sm text-stone-500">{key}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Period badge */}
                    <div className="mt-6 text-center">
                      <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                        📅 달성기간: {testimonials[currentIndex].period}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-stone-300 hover:bg-stone-50"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 bg-stone-700' 
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-stone-300 hover:bg-stone-50"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-stone-800 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              당신도 다음 성공사례가 될 수 있습니다
            </h3>
            <p className="text-stone-300 text-lg mb-8">
              지금 시작하면 첫 달 50% 할인 + 무료 체성분 분석
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="h-14 px-8 bg-stone-600 hover:bg-stone-500 text-white rounded-full font-medium text-lg"
                asChild
              >
                <a href="/consultation">
                  무료 상담 예약하기
                </a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-14 px-8 border-stone-600 text-white hover:bg-stone-700 rounded-full font-medium text-lg"
                asChild
              >
                <a href="/programs">
                  프로그램 자세히 보기
                </a>
              </Button>
            </div>
            <p className="text-stone-400 text-sm mt-6">
              📞 즉시 상담: 02-0000-0000 | 평일 06:00-23:00, 주말 08:00-22:00
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}