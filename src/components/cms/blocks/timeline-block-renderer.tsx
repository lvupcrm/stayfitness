'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ContentBlock } from '@/types/cms'

interface TimelineBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

export function TimelineBlockRenderer({ block }: TimelineBlockProps) {
  const data = block.data.timeline

  if (!data) return null

  return (
    <section className={`py-20 ${block.styles?.backgroundColor || 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
              className="text-lg text-stone-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {data.subtitle}
            </motion.p>
          )}
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-200"></div>

          <div className="space-y-12">
            {data.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold text-sm mr-8 relative z-10">
                  {milestone.year}
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-stone-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}