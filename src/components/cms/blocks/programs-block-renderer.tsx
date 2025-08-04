'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Users, Target, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ContentBlock } from '@/types/cms'

interface ProgramsBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

export function ProgramsBlockRenderer({ block }: ProgramsBlockProps) {
  const data = block.data.programs

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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={program.image.src} 
                    alt={program.image.alt} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-fitness-primary text-white">
                      추천 프로그램
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-fitness-primary transition-colors">
                    {program.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration || '60분'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{program.participants || '1:1 개인'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>{program.level || '초급~고급'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-fitness-primary">
                      {program.price}
                    </div>
                    <Button asChild size="sm" className="group-hover:bg-fitness-primary group-hover:text-white transition-colors">
                      <Link href={`/programs/${program.name}`}>
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}