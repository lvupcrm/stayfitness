'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Phone } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface UrgencyBlockProps {
  block: ContentBlock
  isEditing?: boolean
}

export function UrgencyBlockRenderer({ block, isEditing = false }: UrgencyBlockProps) {
  const { section } = block.data as {
    section: {
      title: string
      subtitle: string
      offers: Array<{
        title: string
        description: string
        originalPrice: string
        discountPrice: string
        validUntil: string
        limitation: string
      }>
      urgencyMessages: string[]
      callToAction: {
        title: string
        subtitle: string
        buttonText: string
        buttonUrl: string
        phoneNumber: string
      }
    }
  }

  const backgroundColor = block.styles?.backgroundColor || 'gradient-to-r from-blue-600 to-purple-600'
  const textColor = block.styles?.textColor || '#ffffff'
  const paddingTop = block.styles?.padding?.top || 80
  const paddingBottom = block.styles?.padding?.bottom || 80

  // Handle gradient backgrounds
  const gradientClass = backgroundColor.startsWith('gradient-') 
    ? `bg-${backgroundColor}` 
    : ''
  
  const solidColor = !backgroundColor.startsWith('gradient-') 
    ? backgroundColor 
    : undefined

  return (
    <section 
      className={`relative ${gradientClass}`}
      style={solidColor ? { 
        backgroundColor: solidColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`
      } : {
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={isEditing ? {} : { opacity: 0, y: 20 }}
          whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: textColor }}
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {section.title}
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-6"
              style={{ color: textColor, opacity: 0.9 }}
              initial={isEditing ? {} : { opacity: 0 }}
              whileInView={isEditing ? {} : { opacity: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {section.subtitle}
            </motion.p>

            {/* Offers */}
            {section.offers.map((offer, index) => (
              <motion.div 
                key={index}
                className="mb-6"
                initial={isEditing ? {} : { opacity: 0, y: 20 }}
                whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                  {offer.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: textColor, opacity: 0.9 }}>
                  {offer.description}
                </p>
                <div className="text-2xl font-bold mb-2">
                  <span className="line-through" style={{ color: textColor, opacity: 0.6 }}>
                    {offer.originalPrice}
                  </span>
                  <span className="ml-3 text-yellow-300">{offer.discountPrice}</span>
                </div>
                <div className="text-sm" style={{ color: textColor, opacity: 0.8 }}>
                  {offer.validUntil} | {offer.limitation}
                </div>
              </motion.div>
            ))}

            {/* Urgency Messages */}
            <motion.div 
              className="mb-8"
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {section.urgencyMessages.map((message, index) => (
                <div key={index} className="text-lg mb-2" style={{ color: textColor, opacity: 0.9 }}>
                  {message}
                </div>
              ))}
            </motion.div>
            
            {/* Call to Action */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg"
                className="h-14 px-8 bg-white text-blue-700 hover:bg-gray-50 rounded-full font-bold"
                asChild
              >
                <Link href={section.callToAction.buttonUrl}>
                  <Calendar className="w-5 h-5 mr-2" />
                  {section.callToAction.buttonText}
                </Link>
              </Button>
              
              <div className="flex items-center space-x-4" style={{ color: textColor, opacity: 0.9 }}>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{section.callToAction.phoneNumber}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}