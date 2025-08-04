'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ContentBlock } from '@/types/cms'

interface StatsBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

export function StatsBlockRenderer({ block }: StatsBlockProps) {
  const data = block.data.stats

  if (!data) return null

  return (
    <section className={`py-16 ${block.styles?.backgroundColor || 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-12">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(data.items.length, 4)} gap-8`}>
          {data.items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-stone-900 mb-2">
                {stat.number}
              </div>
              <div className="text-stone-600 font-medium">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-stone-500 mt-1">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}