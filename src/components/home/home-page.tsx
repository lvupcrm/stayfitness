'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'
import dynamic from 'next/dynamic'
import { SectionLoading } from '@/components/loading/section-loading'
import UrbanHero from '@/components/hero/urban-hero'

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

export function HomePage() {
  const pathname = usePathname()
  
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])
  
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
  )
}