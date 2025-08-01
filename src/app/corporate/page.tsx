import { Metadata } from 'next'
import { CorporateWellness } from '@/components/corporate/corporate-wellness'
import { ServiceStructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: '기업 웰니스 프로그램',
  description: '직원의 건강이 기업의 경쟁력입니다. 스테이피트니스의 기업 웰니스 솔루션으로 생산성을 높이고 의료비를 절감하세요.',
  keywords: ['기업 웰니스', '사내 피트니스', '직원 건강관리', '기업 복리후생', '생산성 향상', '의료비 절감'],
  openGraph: {
    title: '기업 웰니스 프로그램 | 스테이피트니스',
    description: '직원의 건강 관리로 기업의 경쟁력을 높이는 맞춤형 웰니스 솔루션',
    images: ['/images/corporate-wellness-og.jpg']
  }
}

export default function CorporatePage() {
  return (
    <>
      <ServiceStructuredData 
        name="기업 웰니스 프로그램"
        description="직원 건강관리를 통한 기업 생산성 향상 서비스"
        provider="스테이피트니스"
        serviceType="Corporate Wellness"
        areaServed="서울, 대한민국"
        offers={{
          priceCurrency: "KRW",
          priceRange: "₩₩₩"
        }}
      />
      <CorporateWellness />
    </>
  )
}