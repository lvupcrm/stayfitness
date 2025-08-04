'use client'

import { motion } from 'framer-motion'
import type { ContentBlock } from '@/types/cms'

interface SolutionBlockProps {
  block: ContentBlock
  isEditing?: boolean
}

export function SolutionBlockRenderer({ block, isEditing = false }: SolutionBlockProps) {
  const { section } = block.data as {
    section: {
      title: string
      subtitle: string
      solutions: Array<{
        icon: string
        title: string
        description: string
      }>
    }
  }

  const backgroundColor = block.styles?.backgroundColor || '#ffffff'
  const textColor = block.styles?.textColor || '#1c1917'
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {section.solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <div className="text-4xl mb-4">{solution.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>
                  {solution.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.7 }}>
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}