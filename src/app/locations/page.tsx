"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Clock, Star, Users, Award, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const locations = [
  {
    id: 'gangnam',
    name: '강남점',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    hours: '06:00-23:00',
    image: '/images/locations/gangnam.jpg',
    description: '최신 시설과 프리미엄 서비스를 제공하는 플래그십 지점',
    features: ['최신 장비', 'VIP 라운지', '사우나', '주차 가능'],
    trainers: [
      {
        id: 1,
        name: '김민수',
        specialty: '체중 감량 & 근력 강화',
        experience: '8년',
        rating: 4.9,
        image: '/images/trainers/kim-minsu.jpg',
        certifications: ['NSCA-CPT', 'ACSM', '영양사 2급'],
        achievements: '200+ 회원 PT 경력'
      },
      {
        id: 2,
        name: '박지연',
        specialty: '필라테스 & 체형 교정',
        experience: '6년',
        rating: 4.8,
        image: '/images/trainers/park-jiyeon.jpg',
        certifications: ['PMA-CPT', '재활 운동 전문가'],
        achievements: '체형 교정 전문'
      },
      {
        id: 3,
        name: '이승호',
        specialty: '운동 선수 훈련',
        experience: '10년',
        rating: 5.0,
        image: '/images/trainers/lee-seungho.jpg',
        certifications: ['CSCS', '스포츠 영양학'],
        achievements: '올림픽 선수 담당 경력'
      }
    ]
  },
  {
    id: 'hongdae',
    name: '홍대점',
    address: '서울특별시 마포구 홍익로 456',
    phone: '02-2345-6789',
    hours: '07:00-22:00',
    image: '/images/locations/hongdae.jpg',
    description: '젊고 활기찬 분위기의 트레이닝 공간',
    features: ['그룹 클래스', '요가 스튜디오', '라운지', '샤워실'],
    trainers: [
      {
        id: 4,
        name: '최은영',
        specialty: '다이어트 & 바디 리컴프',
        experience: '5년',
        rating: 4.7,
        image: '/images/trainers/choi-eunyoung.jpg',
        certifications: ['NASM-CPT', '영양 코치'],
        achievements: '여성 전문 트레이너'
      },
      {
        id: 5,
        name: '정태현',
        specialty: '크로스핏 & 기능성 운동',
        experience: '7년',
        rating: 4.9,
        image: '/images/trainers/jung-taehyun.jpg',
        certifications: ['CrossFit Level 2', 'FMS'],
        achievements: '크로스핏 박스 운영 경력'
      }
    ]
  },
  {
    id: 'jamsil',
    name: '잠실점',
    address: '서울특별시 송파구 올림픽로 789',
    phone: '02-3456-7890',
    hours: '06:00-23:00',
    image: '/images/locations/jamsil.jpg',
    description: '가족 단위 이용객을 위한 편리한 시설',
    features: ['키즈존', '패밀리 라운지', '넓은 주차장', '카페'],
    trainers: [
      {
        id: 6,
        name: '강다혜',
        specialty: '시니어 & 재활 운동',
        experience: '4년',
        rating: 4.8,
        image: '/images/trainers/kang-dahye.jpg',
        certifications: ['재활 운동 전문가', 'ACSM'],
        achievements: '시니어 건강 관리 전문'
      },
      {
        id: 7,
        name: '윤성민',
        specialty: '근력 운동 & 벌크업',
        experience: '9년',
        rating: 4.9,
        image: '/images/trainers/yoon-seongmin.jpg',
        certifications: ['NSCA-CSCS', '보디빌딩 코치'],
        achievements: '보디빌딩 대회 수상 경력'
      }
    ]
  }
]

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState('gangnam')
  const activeLocation = locations.find(l => l.id === selectedLocation) || locations[0]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              지점 안내
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              전 지점에서 동일한 프리미엄 서비스와 전문 트레이너를 만나보세요
            </motion.p>
          </div>
        </div>
      </section>

      {/* Location Tabs */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${
                  selectedLocation === location.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">지점 정보</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">주소</p>
                        <p className="text-gray-600">{activeLocation.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">전화번호</p>
                        <p className="text-gray-600">{activeLocation.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">운영시간</p>
                        <p className="text-gray-600">{activeLocation.hours}</p>
                        <p className="text-sm text-gray-500">연중무휴</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">시설 특징</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeLocation.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                    asChild
                  >
                    <Link href="/consultation">
                      <Calendar className="w-4 h-4 mr-2" />
                      상담 예약하기
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 px-8 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
                    asChild
                  >
                    <Link href="/contact">
                      <MapPin className="w-4 h-4 mr-2" />
                      오시는 길
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Trainers Section */}
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeLocation.name} 전문 트레이너
                </h3>
                <p className="text-lg text-gray-600">
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
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Trainer Image */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        className="object-cover rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Trainer Info */}
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{trainer.name}</h4>
                      <p className="text-gray-600 mb-2">{trainer.specialty}</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-3">
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
                      <p className="text-sm font-medium text-gray-900 mb-2">자격증</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, certIndex) => (
                          <span
                            key={certIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-900 mb-1">주요 경력</p>
                      <p className="text-sm text-gray-600">{trainer.achievements}</p>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm"
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

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            가장 가까운 지점에서 시작하세요
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            전 지점 동일한 프리미엄 서비스로 당신의 피트니스 목표를 달성해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="h-14 px-8 bg-white text-gray-900 hover:bg-gray-100 rounded-full"
              asChild
            >
              <Link href="/consultation">
                무료 상담 예약하기
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="h-14 px-8 border-gray-600 text-white hover:bg-gray-800 rounded-full"
              asChild
            >
              <Link href="/programs">
                프로그램 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}