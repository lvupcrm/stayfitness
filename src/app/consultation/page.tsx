import { Metadata } from 'next'
import { ConsultationBooking } from '@/components/consultation/consultation-booking'

export const metadata: Metadata = {
  title: '전문 상담 예약 | 스테이피트니스',
  description: '스테이피트니스 전문 트레이너와의 1:1 맞춤 상담을 예약하세요. 커피챗, 전화상담, 화상상담, 방문상담 등 다양한 방식으로 만나보세요.',
  keywords: ['피트니스 상담', '개인 트레이닝', '커피챗', '전문 상담', '스테이피트니스'],
  openGraph: {
    title: '전문 상담 예약 | 스테이피트니스',
    description: '전문 트레이너와의 맞춤 상담으로 당신만의 피트니스 여정을 시작하세요',
    images: ['/images/consultation-og.jpg']
  }
}

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <ConsultationBooking />
      </div>
    </main>
  )
}