'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Instagram, Globe } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface ContactInfoBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Mail,
  Globe,
  Instagram,
  MessageCircle,
}

export function ContactInfoBlockRenderer({ block }: ContactInfoBlockProps) {
  const data = block.data.contact_info

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.contacts.map((contact, index) => {
            const IconComponent = iconMap[contact.icon] || Phone
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : '_self'}
                  className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-stone-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-stone-900 mb-1">{contact.label}</h3>
                      <p className="text-stone-600 text-sm">{contact.value}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Brand Tagline */}
        {data.tagline && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-gradient-to-r from-stone-800 to-stone-900 text-white px-8 py-4 rounded-full">
              <h3 className="text-xl font-bold mb-2">{data.tagline.title}</h3>
              <p className="text-stone-200 text-lg">{data.tagline.subtitle}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}