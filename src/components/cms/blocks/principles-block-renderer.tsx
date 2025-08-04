'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ContentBlock } from '@/types/cms'

interface PrinciplesBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

export function PrinciplesBlockRenderer({ block }: PrinciplesBlockProps) {
  const data = block.data.principles

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{principle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}