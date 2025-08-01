"use client";
import UrbanHero from "@/components/hero/urban-hero";
import { 
  ProblemAwarenessSection,
  SolutionSection,
  SocialProofSection,
  UrgencySection,
  FAQSection
} from "@/components/sections/conversion-sections";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

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
