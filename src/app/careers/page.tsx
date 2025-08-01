import { Metadata } from 'next'
import { TrainerApplication } from '@/components/careers/trainer-application'

export const metadata: Metadata = {
  title: '트레이너 채용 | 스테이피트니스 커리어',
  description: '스테이피트니스와 함께 성장할 전문 트레이너를 모집합니다. 정규직, 파트타임, 프리랜서 등 다양한 근무 형태로 지원하세요.',
  keywords: ['트레이너 채용', '피트니스 취업', '퍼스널 트레이너', '그룹 강사', '스테이피트니스 채용'],
  openGraph: {
    title: '트레이너 채용 | 스테이피트니스',
    description: '전문성을 발휘하고 고객과 함께 성장할 수 있는 트레이너를 찾습니다',
    images: ['/images/careers-og.jpg']
  }
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <TrainerApplication />
      </div>
    </main>
  )
}