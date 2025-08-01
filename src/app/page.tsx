"use client";
import Layout from "@/components/common/Layout";
import IntroSection from "@/components/content/IntroSection";
import ProgramSection from "@/components/content/ProgramSection";
import ReviewSection from "@/components/content/ReviewSection";
import LocationSection from "@/components/content/LocationSection";
import { HeroSection } from "@/components/common";
import sample from "@/data/sample.json";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function Home() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return (
    <Layout>
      <HeroSection />
      <IntroSection {...sample.intro} />
      <ProgramSection {...sample.programs} />
      <ReviewSection {...sample.reviews} />
      <LocationSection {...sample.location} />
      {/* 하위페이지 이동 CTA */}
      <div className="flex flex-col gap-4 mt-10 mb-16 px-4">
        <a href="/programs" className="w-full bg-green-700 text-white rounded-full py-4 text-lg font-bold text-center">프로그램 전체 보기</a>
        <a href="/trainers" className="w-full bg-green-700 text-white rounded-full py-4 text-lg font-bold text-center">트레이너 전체 보기</a>
        <a href="/space" className="w-full bg-green-700 text-white rounded-full py-4 text-lg font-bold text-center">공간/시설 둘러보기</a>
        <a href="/reviews" className="w-full bg-green-700 text-white rounded-full py-4 text-lg font-bold text-center">후기 전체 보기</a>
        <a href="/contact" className="w-full bg-green-700 text-white rounded-full py-4 text-lg font-bold text-center">상담/문의하기</a>
      </div>
    </Layout>
  );
}
