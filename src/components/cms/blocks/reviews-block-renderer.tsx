'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Calendar } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface ReviewsBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

export function ReviewsBlockRenderer({ block }: ReviewsBlockProps) {
  const data = block.data.reviews

  if (!data) return null

  return (
    <section className={`py-16 ${block.styles?.backgroundColor || 'bg-background'}`}>
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-12">
            {data.title && (
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {data.title}
              </motion.h2>
            )}
            {data.subtitle && (
              <motion.p 
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {data.subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                {/* Review Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {review.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      {review.program && (
                        <p className="text-sm text-gray-500">{review.program}</p>
                      )}
                    </div>
                  </div>
                  
                  {review.rating && (
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating!
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <blockquote className="text-gray-700 text-base leading-relaxed mb-4 flex-1">
                  &ldquo;{review.content}&rdquo;
                </blockquote>

                {/* Review Footer */}
                {review.date && (
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{review.date}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}