'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface FAQBlockProps {
  block: ContentBlock
  isEditing?: boolean
}

export function FAQBlockRenderer({ block, isEditing = false }: FAQBlockProps) {
  const { section } = block.data as {
    section: {
      title: string
      subtitle: string
      faqs: Array<{
        question: string
        answer: string
      }>
    }
  }

  const backgroundColor = block.styles?.backgroundColor || '#ffffff'
  const textColor = block.styles?.textColor || '#1f2937'
  const paddingTop = block.styles?.padding?.top || 80
  const paddingBottom = block.styles?.padding?.bottom || 80

  return (
    <section 
      className="relative"
      style={{ 
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: textColor }}
            initial={isEditing ? {} : { opacity: 0, y: 20 }}
            whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {section.title}
          </motion.h2>
          <motion.p 
            className="text-lg"
            style={{ color: textColor, opacity: 0.7 }}
            initial={isEditing ? {} : { opacity: 0 }}
            whileInView={isEditing ? {} : { opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {section.subtitle}
          </motion.p>
        </div>

        <div className="space-y-4 mb-12">
          {section.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">Q</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>
                    {faq.question}
                  </h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">A</span>
                    </div>
                    <p className="leading-relaxed" style={{ color: textColor, opacity: 0.7 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center"
          initial={isEditing ? {} : { opacity: 0, y: 20 }}
          whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              💬 더 궁금한 점이 있으신가요?
            </h4>
            <p className="text-gray-600 mb-6">
              전문 상담사가 친절하게 1:1로 답변드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
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
                className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full"
                asChild
              >
                <Link href="tel:1588-0000">
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