'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface SocialProofBlockProps {
  block: ContentBlock
  isEditing?: boolean
}

export function SocialProofBlockRenderer({ block, isEditing = false }: SocialProofBlockProps) {
  const { section } = block.data as {
    section: {
      title: string
      subtitle: string
      testimonials: Array<{
        name: string
        content: string
        rating: number
        program: string
        beforeAfter: {
          before: string
          after: string
        }
      }>
      achievements: {
        title: string
        stats: Array<{
          number: string
          label: string
        }>
      }
    }
  }

  const backgroundColor = block.styles?.backgroundColor || '#f8fafc'
  const textColor = block.styles?.textColor || '#1e293b'
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            className="text-lg max-w-2xl mx-auto"
            style={{ color: textColor, opacity: 0.7 }}
            initial={isEditing ? {} : { opacity: 0 }}
            whileInView={isEditing ? {} : { opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {section.subtitle}
          </motion.p>
        </div>

        {/* Achievement Stats */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-bold text-center mb-8"
            style={{ color: textColor }}
            initial={isEditing ? {} : { opacity: 0, y: 20 }}
            whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {section.achievements.title}
          </motion.h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {section.achievements.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={isEditing ? {} : { opacity: 0, y: 20 }}
                whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold" style={{ color: textColor }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {section.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
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
                <span className="ml-2 text-sm text-gray-500">{testimonial.program}</span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2 font-semibold">
                  {testimonial.name}
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              <div className="flex justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-red-600">BEFORE</div>
                  <div>{testimonial.beforeAfter.before}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-600">AFTER</div>
                  <div>{testimonial.beforeAfter.after}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}