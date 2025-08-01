"use client";
import IntroSection from "@/components/content/IntroSection";
import ProgramSection from "@/components/content/ProgramSection";
import ReviewSection from "@/components/content/ReviewSection";
import LocationSection from "@/components/content/LocationSection";
import { HeroSection } from "@/components/common";
import SuccessStories from "@/components/landing/success-stories";
import WhyChooseUs from "@/components/landing/why-choose-us";
import TrainerRecruitment from "@/components/landing/trainer-recruitment";
import sample from "@/data/sample.json";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Calendar, MessageSquare, MapPin, Sparkles, Trophy } from "lucide-react";

export default function Home() {
  const pathname = usePathname();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SuccessStories />
      <WhyChooseUs />
      <IntroSection {...sample.intro} />
      <ProgramSection {...sample.programs} />
      <TrainerRecruitment />
      <ReviewSection {...sample.reviews} />
      <LocationSection {...sample.location} />
      
      {/* 고객 중심 CTA 섹션 */}
      <section className="py-20 bg-gradient-to-br from-fitness-primary/5 to-fitness-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              당신의 <span className="text-fitness-primary">변화</span>를 시작하세요
            </h2>
            <p className="text-lg text-muted-foreground">
              전문가와 함께하는 맞춤형 피트니스 솔루션
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/programs" className="group">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border hover:border-fitness-primary/20">
                <div className="w-12 h-12 bg-fitness-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fitness-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-fitness-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">프로그램 둘러보기</h3>
                <p className="text-muted-foreground mb-4">다양한 프로그램을 확인해보세요</p>
                <div className="flex items-center text-fitness-primary group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">자세히 보기</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            
            <Link href="/consultation" className="group">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border hover:border-fitness-secondary/20">
                <div className="w-12 h-12 bg-fitness-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fitness-secondary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-fitness-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">무료 상담 예약</h3>
                <p className="text-muted-foreground mb-4">전문가와 맞춤 상담을 받아보세요</p>
                <div className="flex items-center text-fitness-secondary group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">상담 예약하기</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            
            <Link href="#success-stories" className="group">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border hover:border-fitness-accent/20">
                <div className="w-12 h-12 bg-fitness-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fitness-accent/20 transition-colors">
                  <Trophy className="w-6 h-6 text-fitness-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">성공 스토리</h3>
                <p className="text-muted-foreground mb-4">실제 회원들의 놀라운 변화</p>
                <div className="flex items-center text-fitness-accent group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">스토리 보기</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            
            <Link href="/contact" className="group">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border hover:border-fitness-warning/20">
                <div className="w-12 h-12 bg-fitness-warning/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fitness-warning/20 transition-colors">
                  <MapPin className="w-6 h-6 text-fitness-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-2">센터 방문</h3>
                <p className="text-muted-foreground mb-4">직접 방문해서 둘러보세요</p>
                <div className="flex items-center text-fitness-warning group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">위치 보기</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            
            <Link href="/reviews" className="group">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border hover:border-fitness-success/20">
                <div className="w-12 h-12 bg-fitness-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fitness-success/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-fitness-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">고객 후기</h3>
                <p className="text-muted-foreground mb-4">실제 회원들의 생생한 후기</p>
                <div className="flex items-center text-fitness-success group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">후기 보기</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            
            <div className="md:col-span-2 lg:col-span-1">
              <div className="p-6 bg-gradient-to-r from-fitness-primary to-fitness-secondary rounded-xl text-white h-full flex flex-col justify-center">
                <Sparkles className="w-8 h-8 mb-3 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">첫 방문 혜택!</h3>
                <p className="mb-4 opacity-90">무료 체성분 분석 + 1:1 맞춤 상담</p>
                <Button 
                  asChild 
                  variant="secondary" 
                  className="bg-white text-fitness-primary hover:bg-gray-50 w-fit"
                >
                  <Link href="/consultation">
                    지금 예약하기
                    <Calendar className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
