import { type Metadata } from 'next'
import { generateMetadata as baseGenerateMetadata } from '@/lib/metadata'
import UrbanHero from '@/components/hero/urban-hero';
import dynamic from 'next/dynamic'
import { SectionLoading } from '@/components/loading/section-loading'

// Dynamic imports for conversion sections
const ProblemAwarenessSection = dynamic(
  () => import('@/components/sections/conversion-sections').then(mod => mod.ProblemAwarenessSection),
  { loading: () => <SectionLoading /> }
)

const SolutionSection = dynamic(
  () => import('@/components/sections/conversion-sections').then(mod => mod.SolutionSection),
  { loading: () => <SectionLoading /> }
)

const SocialProofSection = dynamic(
  () => import('@/components/sections/conversion-sections').then(mod => mod.SocialProofSection),
  { loading: () => <SectionLoading /> }
)

const UrgencySection = dynamic(
  () => import('@/components/sections/conversion-sections').then(mod => mod.UrgencySection),
  { loading: () => <SectionLoading /> }
)

const FAQSection = dynamic(
  () => import('@/components/sections/conversion-sections').then(mod => mod.FAQSection),
  { loading: () => <SectionLoading /> }
)
// Dynamic imports for client-side features
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export const metadata: Metadata = baseGenerateMetadata({
  description: '스테이피트니스는 체형교정과 통증개선에 특화된 프리미엄 피트니스입니다. 강남, 홍대, 잠실 지점에서 전문 트레이너의 1:1 맞춤 관리로 당신의 건강한 변화를 시작하세요.',
  path: '/'
});

export default function Home() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  
  return (
    <div className="min-h-screen bg-background">
      {/* 히어로 섹션 - 센터 영상이 들어갈 예정 */}
      <UrbanHero />
      
      {/* 문제점 인식 섹션 */}
      <ProblemAwarenessSection />
      
      {/* 솔루션 제시 섹션 */}
      <SolutionSection />
      
      {/* 사회적 증명 섹션 */}
      <SocialProofSection />
      
      {/* 긴급성/한정성 섹션 */}
      <UrgencySection />
      
      {/* FAQ 섹션 */}
      <FAQSection />
    </div>
  );
}
