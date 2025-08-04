'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Users, Heart } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface MVCBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Users,
  Heart,
}

export function MVCBlockRenderer({ block }: MVCBlockProps) {
  const data = block.data.mvc

  if (!data) return null

  return (
    <section className={`py-20 ${block.styles?.backgroundColor || 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {data.title}
          </motion.h2>
          {data.subtitle && (
            <motion.p 
              className="text-lg text-stone-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {data.subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Target
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-stone-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">{item.title}</h3>
                <h4 className="text-lg font-medium text-stone-600 mb-4">{item.subtitle}</h4>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}