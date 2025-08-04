'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Star, Users, Award, Calendar, Dumbbell, Waves, Car, Coffee, Wifi, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ContentBlock } from '@/types/cms'

interface LocationsBlockProps {
  block: ContentBlock
  isEditing?: boolean
  isHovered?: boolean
}

const facilityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Waves,
  Car,
  Coffee,
  Wifi,
  Shield,
  Users,
}

export function LocationsBlockRenderer({ block }: LocationsBlockProps) {
  const data = block.data.locations
  const [selectedLocation, setSelectedLocation] = useState(data?.locations[0]?.id || '')
  
  if (!data) return null

  const activeLocation = data.locations.find(l => l.id === selectedLocation) || data.locations[0]

  return (
    <div className={`${block.styles?.backgroundColor || 'bg-stone-50'}`}>
      {/* Header */}
      {(data.title || data.subtitle) && (
        <section className="py-16 bg-gradient-to-br from-stone-900 to-stone-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              {data.title && (
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {data.title}
                </motion.h1>
              )}
              {data.subtitle && (
                <motion.p 
                  className="text-xl text-stone-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {data.subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Location Tabs */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {data.locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${
                  selectedLocation === location.id
                    ? 'bg-stone-900 text-white shadow-lg'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {location.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Location Details */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedLocation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Location Info */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={activeLocation.image}
                  alt={activeLocation.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{activeLocation.name}</h2>
                  <p className="text-gray-200">{activeLocation.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-6">지점 정보</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-stone-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900">주소</p>
                        <p className="text-stone-600">{activeLocation.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-stone-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900">전화번호</p>
                        <p className="text-stone-600">{activeLocation.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-stone-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-900">운영시간</p>
                        <p className="text-stone-600">{activeLocation.hours}</p>
                        <p className="text-sm text-stone-500">연중무휴</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-stone-900 mb-4">시설 특징</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeLocation.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-stone-600 rounded-full" />
                        <span className="text-stone-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="h-12 px-6 bg-stone-900 hover:bg-gray-800 text-white rounded-full"
                    asChild
                  >
                    <Link href="/consultation">
                      <Calendar className="w-4 h-4 mr-2" />
                      상담 예약하기
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 px-6 border-stone-300 text-stone-700 hover:bg-stone-50 rounded-full"
                    asChild
                  >
                    <Link href={`https://maps.google.com/?q=${encodeURIComponent(activeLocation.address)}`} target="_blank">
                      <MapPin className="w-4 h-4 mr-2" />
                      오시는 길
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">
                  {activeLocation.name} 시설 안내
                </h3>
                <p className="text-lg text-stone-600">
                  최고의 서비스를 위한 프리미엄 시설을 만나보세요
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeLocation.facilities.map((facility, index) => {
                  const IconComponent = facilityIconMap[facility.icon] || Dumbbell
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100"
                    >
                      <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-stone-700" />
                      </div>
                      <h4 className="text-lg font-bold text-stone-900 mb-2">
                        {facility.name}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {facility.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Trainers Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">
                  {activeLocation.name} 전문 트레이너
                </h3>
                <p className="text-lg text-stone-600">
                  검증된 자격증과 풍부한 경험을 바탕으로 최고의 서비스를 제공합니다
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeLocation.trainers.map((trainer, index) => (
                  <motion.div
                    key={trainer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100"
                  >
                    {/* Trainer Image */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        className="object-cover rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Trainer Info */}
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-stone-900 mb-1">{trainer.name}</h4>
                      <p className="text-stone-600 mb-2">{trainer.specialty}</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-stone-500 mb-3">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {trainer.experience}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {trainer.rating}
                        </span>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-stone-900 mb-2">자격증</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, certIndex) => (
                          <span
                            key={certIndex}
                            className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-stone-900 mb-1">주요 경력</p>
                      <p className="text-sm text-stone-600">{trainer.achievements}</p>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full h-10 bg-stone-900 hover:bg-gray-800 text-white rounded-full text-sm"
                      asChild
                    >
                      <Link href={`/consultation?trainer=${trainer.id}`}>
                        상담 신청하기
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  )
}