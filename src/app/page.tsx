import { type Metadata } from 'next'
import { generateMetadata as baseGenerateMetadata } from '@/lib/metadata'
import { HomePage } from '@/components/home/home-page'

export const metadata: Metadata = baseGenerateMetadata({
  description: '스테이피트니스는 체형교정과 통증개선에 특화된 프리미엄 피트니스입니다. 강남, 홍대, 잠실 지점에서 전문 트레이너의 1:1 맞춤 관리로 당신의 건강한 변화를 시작하세요.',
  path: '/'
})

export default function Page() {
  return <HomePage />
}