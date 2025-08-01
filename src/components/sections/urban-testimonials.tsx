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
    content: "스테이피트니스를 만나고 제 삶이 완전히 바뀌었어요. 6개월 만에 15kg 감량은 물론, 매일 아침 활력 넘치는 하루를 시작할 수 있게 되었습니다.",
    stats: {
      weight: "-15kg",
      bodyFat: "-13%",
      muscle: "+7kg"
    }
  },
  {
    id: 2,
    name: "이서연",
    role: "마케터, 28세",
    image: "/images/testimonial-2.jpg",
    content: "처음엔 운동이 너무 어려웠는데, 트레이너님의 세심한 케어와 동료들의 응원 덕분에 이제는 운동 없는 하루를 상상할 수 없어요.",
    stats: {
      strength: "+150%",
      endurance: "+200%",
      confidence: "∞"
    }
  },
  {
    id: 3,
    name: "박준호",
    role: "CEO, 42세",
    image: "/images/testimonial-3.jpg",
    content: "바쁜 일정 속에서도 건강을 지킬 수 있게 해준 스테이피트니스. 체계적인 프로그램과 유연한 스케줄 덕분에 일과 건강 모두 잡을 수 있었습니다.",
    stats: {
      energy: "+80%",
      stress: "-60%",
      productivity: "+45%"
    }
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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            성공 스토리
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            스테이피트니스와 함께 변화를 만들어낸 회원들의 이야기
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
                    <Quote className="w-10 h-10 text-gray-200 mb-6" />
                    
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                      {testimonials[currentIndex].content}
                    </blockquote>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t">
                      {Object.entries(testimonials[currentIndex].stats).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-2xl font-bold text-green-600">{value}</div>
                          <div className="text-sm text-gray-500 capitalize">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons - Urban Field style */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300"
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
                      ? 'w-8 bg-gray-900' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            당신도 성공 스토리의 주인공이 될 수 있습니다
          </p>
          <Button 
            className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium"
            asChild
          >
            <a href="/consultation">
              지금 시작하기
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}