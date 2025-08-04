'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ContentBlock } from '@/types/cms'

interface ProblemAwarenessBlockProps {
  block: ContentBlock
  isEditing?: boolean
}

export function ProblemAwarenessBlockRenderer({ block, isEditing = false }: ProblemAwarenessBlockProps) {
  const { section } = block.data as {
    section: {
      title: string
      subtitle: string
      problems: Array<{
        icon: string
        title: string
        description: string
      }>
      callToAction: {
        title: string
        description: string
        buttonText: string
        buttonUrl: string
      }
    }
  }

  const backgroundColor = block.styles?.backgroundColor || '#fafaf9'
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {section.problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={isEditing ? {} : { opacity: 0, y: 20 }}
              whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-lg font-bold mb-3" style={{ color: textColor }}>
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.7 }}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={isEditing ? {} : { opacity: 0, y: 20 }}
          whileInView={isEditing ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              {section.callToAction.title}
            </h3>
            <p className="text-amber-700 mb-6 whitespace-pre-line">
              {section.callToAction.description}
            </p>
            <Button 
              size="lg"
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href={section.callToAction.buttonUrl}>
                {section.callToAction.buttonText}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}