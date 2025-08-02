import { Metadata } from 'next'
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Target, ArrowRight } from "lucide-react";

const programs = [
  {
    name: "PT 1:1 맞춤 트레이닝",
    description: "개인별 목표에 맞춘 1:1 트레이닝 프로그램",
    image: { src: "/images/pt-training.jpg", alt: "PT 이미지" },
    price: "월 30만원~"
  },
  {
    name: "그룹 요가/필라테스",
    description: "소규모 그룹으로 진행되는 요가 및 필라테스 수업",
    image: { src: "/images/yoga-pilates.jpg", alt: "요가 이미지" },
    price: "월 15만원~"
  },
  {
    name: "다이어트·체형교정",
    description: "전문가와 함께하는 체형 분석 및 다이어트 프로그램",
    image: { src: "/images/diet-correction.jpg", alt: "다이어트 이미지" },
    price: "월 20만원~"
  }
];

export const metadata: Metadata = {
  title: '프로그램 안내',
  description: '스테이피트니스의 다양한 웰니스/트레이닝 프로그램을 만나보세요. 퍼스널 트레이닝부터 그룹 클래스까지.',
  keywords: ['피트니스 프로그램', '퍼스널 트레이닝', 'PT', '그룹 클래스', '운동 프로그램'],
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="프로그램 안내"
        description="스테이피트니스의 다양한 웰니스/트레이닝 프로그램을 만나보세요."
        imageSrc="/images/programs-hero.jpg"
        imageAlt="프로그램 전체"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.name} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={program.image.src} 
                    alt={program.image.alt} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-fitness-primary text-white">
                      추천 프로그램
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-fitness-primary transition-colors">
                    {program.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>60분</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>1:1 개인</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>초급~고급</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-fitness-primary">
                      {program.price}
                    </div>
                    <Button asChild size="sm" className="group-hover:bg-fitness-primary group-hover:text-white transition-colors">
                      <Link href={`/programs/${program.name}`}>
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA 섹션 */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                어떤 프로그램이 맞는지 고민되시나요?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                전문 컨설턴트가 당신에게 맞는 최적의 프로그램을 추천해드립니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="fitness-gradient text-white">
                  <Link href="/consultation">
                    무료 상담 받기
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    센터 둘러보기
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