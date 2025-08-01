"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Phone,
  MessageCircle,
  Star
} from 'lucide-react'
import { motion } from 'framer-motion'

// 문제점 인식 섹션
export function ProblemAwarenessSection() {
  const problems = [
    {
      icon: "😫",
      title: "운동해도 변하지 않는 몸",
      description: "헬스장에서 열심히 운동해도 원하는 체형 변화가 없어서 포기하셨나요?"
    },
    {
      icon: "🏥",
      title: "만성 통증에 시달림",
      description: "어깨, 목, 허리 통증이 심해져도 어떻게 해야 할지 모르겠나요?"
    },
    {
      icon: "⚖️",
      title: "틀어진 체형과 자세",
      description: "골반 틀어짐, 굽은 어깨로 인해 옷 맵시도 살지 않나요?"
    },
    {
      icon: "😰",
      title: "잘못된 운동이 걱정",
      description: "혼자 운동하다 다칠까봐 무서워서 제대로 못하고 계신가요?"
    }
  ]

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            혹시 이런 고민이 있으신가요?
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            30-50대 여성 10명 중 8명이 겪는 공통 고민들입니다
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">{problem.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              💡 이 모든 문제, 해결할 수 있습니다!
            </h3>
            <p className="text-amber-700 mb-6">
              스테이피트니스의 전문 체형교정·통증개선 프로그램으로<br />
              <span className="font-semibold">&lsquo;진짜 내 몸&rsquo;의 변화를 경험해보세요</span>
            </p>
            <Button 
              size="lg"
              className="h-14 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-full"
              asChild
            >
              <Link href="/consultation">
                해결책 알아보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 솔루션 제시 섹션
export function SolutionSection() {
  const solutions = [
    {
      step: "1단계",
      title: "정밀 분석",
      subtitle: "내 몸 상태 완벽 파악",
      description: "체성분 분석 + 자세 평가 + 움직임 분석으로 문제점을 정확히 찾아냅니다",
      features: ["인바디 체성분 분석", "3D 자세 평가", "기능적 움직임 검사", "통증 부위 정밀 진단"],
      icon: Target,
      color: "amber"
    },
    {
      step: "2단계", 
      title: "맞춤 설계",
      subtitle: "나만의 운동 처방전",
      description: "분석 결과를 바탕으로 체형교정과 통증개선에 특화된 개인별 프로그램을 설계합니다",
      features: ["개인별 맞춤 프로그램", "체형교정 운동법", "통증 완화 루틴", "생활습관 개선 가이드"],
      icon: Users,
      color: "blue"
    },
    {
      step: "3단계",
      title: "전문 관리",
      subtitle: "1:1 전담 트레이너",
      description: "재활운동 전문가가 안전하고 효과적인 운동을 직접 지도하며 지속 관리합니다",
      features: ["1:1 전담 관리", "안전한 운동 지도", "실시간 폼 교정", "진행상황 모니터링"],
      icon: Award,
      color: "green"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            스테이피트니스만의 <span className="text-amber-600">3단계 솔루션</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            과학적 분석부터 전문 관리까지, 체계적인 시스템으로 확실한 변화를 만들어냅니다
          </motion.p>
        </div>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* 텍스트 콘텐츠 */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-6">
                  <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                    {solution.step}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-stone-900 mb-2">{solution.title}</h3>
                <p className="text-xl text-stone-600 mb-4">{solution.subtitle}</p>
                <p className="text-stone-600 mb-6 leading-relaxed">{solution.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-stone-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 시각적 요소 */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl p-12 text-center">
                    <solution.icon className="w-24 h-24 text-stone-600 mx-auto mb-4" />
                    <div className="text-6xl font-bold text-stone-300">{solution.step}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            className="h-16 px-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full text-lg font-bold shadow-xl"
            asChild
          >
            <Link href="/consultation">
              <Calendar className="w-6 h-6 mr-3" />
              무료 체험 신청하기
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// 사회적 증명 섹션 (전환율 향상용)
export function SocialProofSection() {
  const stats = [
    { number: "95%", label: "통증 개선 성공률", sublabel: "30일 내 체감" },
    { number: "92%", label: "체형 변화 만족도", sublabel: "3개월 과정 완료" },
    { number: "1,200+", label: "성공 케이스", sublabel: "누적 회원 수" },
    { number: "4.9/5", label: "고객 만족도", sublabel: "실제 후기 평균" }
  ]

  const testimonials = [
    {
      name: "김○○ (42세)",
      problem: "만성 어깨 통증",
      result: "3개월 만에 통증 90% 개선",
      quote: "10년 넘게 어깨가 아팠는데, 정말 신기하게 좋아졌어요. 자세교정의 힘을 실감했습니다.",
      rating: 5,
      before: "어깨 통증 8/10",
      after: "어깨 통증 1/10"
    },
    {
      name: "박○○ (38세)",
      problem: "출산 후 체형 변화",
      result: "6개월 만에 몸무게 -12kg",
      quote: "출산 후 4년간 빠지지 않던 살이 드디어! 무엇보다 건강해진 느낌이 최고예요.",
      rating: 5,
      before: "체지방률 32%",
      after: "체지방률 24%"
    },
    {
      name: "이○○ (45세)",
      problem: "골반 틀어짐",
      result: "2개월 만에 자세 교정",
      quote: "오랫동안 틀어졌던 골반이 정말 바뀌었어요. 걸을 때도 훨씬 편하고 옷태도 달라졌습니다.",
      rating: 5,
      before: "골반 기울기 심함",
      after: "정상 범위 회복"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 통계 섹션 */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600">숫자로 증명하는</span> 확실한 결과
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            실제 데이터로 검증된 스테이피트니스의 성과입니다
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-stone-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-stone-500">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 실제 후기 섹션 */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            실제 회원들의 <span className="text-amber-600">생생한 변화</span>
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border"
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-stone-500">실제 후기</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-stone-600 mb-2">
                    <span className="font-semibold">{testimonial.name}</span> | {testimonial.problem}
                  </div>
                  <div className="text-lg font-bold text-amber-600 mb-3">
                    {testimonial.result}
                  </div>
                </div>

                <blockquote className="text-stone-700 italic mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex justify-between text-xs text-stone-500 pt-4 border-t border-stone-100">
                  <div>
                    <div className="text-red-600">BEFORE</div>
                    <div>{testimonial.before}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600">AFTER</div>
                    <div>{testimonial.after}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-amber-800 mb-4">
              🎯 당신도 이런 변화를 경험할 수 있습니다!
            </h4>
            <p className="text-amber-700 mb-6">
              지금 무료 체험을 신청하고 첫 번째 변화를 시작하세요
            </p>
            <Button 
              size="lg"
              className="h-14 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-full"
              asChild
            >
              <Link href="/consultation">
                나도 변화 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 긴급성/한정성 섹션
export function UrgencySection() {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-white/90 text-sm font-semibold mb-2">🔥 특별 혜택</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              첫 방문 고객 한정!
            </h3>
            <div className="text-white/90 mb-6">
              <div className="text-lg mb-2">✅ 무료 인바디 체성분 분석 (통상 3만원)</div>
              <div className="text-lg mb-2">✅ 무료 자세 평가 및 상담 (통상 5만원)</div>
              <div className="text-lg mb-4">✅ 1:1 맞춤 운동 체험 (통상 10만원)</div>
              <div className="text-2xl font-bold">
                <span className="line-through text-white/60">18만원</span>
                <span className="ml-3 text-yellow-300">완전 무료!</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="h-14 px-8 bg-white text-amber-700 hover:bg-stone-50 rounded-full font-bold"
                asChild
              >
                <Link href="/consultation">
                  <Calendar className="w-5 h-5 mr-2" />
                  지금 바로 신청하기
                </Link>
              </Button>
              
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">031-339-9905</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">카톡 상담</span>
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-sm mt-4">
              ※ 1일 선착순 3명 한정 (예약 필수)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// FAQ 섹션 (고객 우려사항 해결)
export function FAQSection() {
  const faqs = [
    {
      question: "운동 초보자도 괜찮나요?",
      answer: "네, 전혀 문제없습니다! 저희 회원의 60%가 운동 초심자입니다. 개인의 체력과 상황에 맞춰 단계별로 시작하니까 부담 없이 시작하실 수 있어요."
    },
    {
      question: "정말 통증이 개선될까요?",
      answer: "95%의 회원분들이 30일 내에 통증 개선을 체감하셨습니다. 재활운동 전문가가 개인별 통증 원인을 정확히 파악하고 맞춤 운동으로 관리해드립니다."
    },
    {
      question: "비용이 부담스러워요...",
      answer: "무료 체험을 통해 먼저 효과를 확인해보세요. 또한 개인 상황에 맞는 다양한 프로그램과 할부 옵션도 준비되어 있어 부담 없이 시작하실 수 있습니다."
    },
    {
      question: "시간이 부족한데 가능할까요?",
      answer: "1회 50분, 주 2-3회로도 충분합니다. 3개 지점 모두 주차장이 완비되어 있고, 개인 일정에 맞춰 유연하게 예약 가능합니다."
    },
    {
      question: "나이가 많아도 할 수 있나요?",
      answer: "40-50대 회원분들이 가장 많고, 60대 회원분들도 많이 계십니다. 나이와 체력에 맞는 안전한 운동으로 시작하니 걱정하지 마세요."
    },
    {
      question: "정말 몸이 변할까요?",
      answer: "92%의 회원이 3개월 과정 후 체형 변화에 만족하셨습니다. 단순 체중 감량이 아닌 근본적인 체형 교정과 건강 개선에 집중합니다."
    }
  ]

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            아직도 <span className="text-amber-600">고민</span>이세요?
          </motion.h2>
          <motion.p 
            className="text-lg text-stone-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            많은 분들이 궁금해하시는 질문들을 정리했어요
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold text-sm">Q</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-stone-900 mb-3">
                    {faq.question}
                  </h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">A</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-stone-900 mb-4">
              💬 더 궁금한 점이 있으신가요?
            </h4>
            <p className="text-stone-600 mb-6">
              전문 상담사가 친절하게 1:1로 답변드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="h-12 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                asChild
              >
                <Link href="/consultation">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  카톡으로 문의하기
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-12 px-6 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-full"
                asChild
              >
                <Link href="tel:031-339-9905">
                  <Phone className="w-5 h-5 mr-2" />
                  전화로 문의하기
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}