'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react'

type FooterLink = {
  href: string
  label: string
}

const legalLinks: FooterLink[] = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold stay-heading">
              <span className="stay-text-gradient">STAY</span>
              <span className="text-slate-300">FITNESS</span>
            </div>
            <p className="text-slate-400 stay-body text-sm leading-relaxed">
              전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg stay-heading text-white">연락처</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>02-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <span>info@stayfitness.com</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span>월-금 06:00-22:00, 주말 08:00-20:00</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg stay-heading text-white">지점</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="font-medium text-white">강남점</div>
                  <div>강남구 테헤란로 123</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="font-medium text-white">홍대점</div>
                  <div>마포구 홍익로 456</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="font-medium text-white">잠실점</div>
                  <div>송파구 올림픽로 789</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg stay-heading text-white">바로가기</h3>
            <div className="space-y-3 text-sm">
              <Link href="/about" className="block text-slate-400 hover:text-white transition-colors">
                회사소개
              </Link>
              <Link href="/programs" className="block text-slate-400 hover:text-white transition-colors">
                프로그램
              </Link>
              <Link href="/consultation" className="block text-slate-400 hover:text-white transition-colors">
                상담예약
              </Link>
              <Link href="/reviews" className="block text-slate-400 hover:text-white transition-colors">
                이용후기
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm stay-body">
              © {currentYear} STAY FITNESS. All rights reserved.
          <div className="flex gap-4 mt-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
            </div>

            {/* Admin Access - Subtle */}
            <div className="flex items-center space-x-4">
              <div className="text-slate-500 text-xs">
                <Link 
                  href="/static-login"
                  className="flex items-center space-x-1 hover:text-slate-300 transition-colors opacity-60 hover:opacity-100"
                >
                  <Shield className="w-3 h-3" />
                  <span>관리자</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}