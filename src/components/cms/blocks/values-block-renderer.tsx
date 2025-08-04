'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, Users, Zap } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface ValuesBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Target,
  Users,
  Zap,
}

export function ValuesBlockRenderer({ block }: ValuesBlockProps) {
  const data = block.data.values

  if (!data) return null

  return (
    <section className={`py-20 ${block.styles?.backgroundColor || 'bg-stone-50'}`}>
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

        <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(data.items.length, 4)} gap-8`}>
          {data.items.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Target
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-stone-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}