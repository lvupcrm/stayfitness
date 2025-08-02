import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

const reviews = [
  { name: "김지은", content: "트레이너가 정말 친절하고, 시설이 깨끗해서 만족합니다!" },
  { name: "박민수", content: "프로그램이 다양해서 지루하지 않고, 효과도 좋아요." },
  { name: "이수진", content: "위치가 좋아서 출퇴근길에 들르기 편해요." }
];

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader 
        title="회원 후기"
        description="실제 회원들의 생생한 후기를 확인하세요."
        imageSrc="/images/reviews-hero.jpg"
        imageAlt="후기 전체"
      />
      <div className="flex flex-col gap-6 px-4 pb-16">
        {reviews.map((review, idx) => (
          <Link href={`/reviews/${idx}`} key={idx} className="block bg-white rounded-xl border border-gray-100 p-5 shadow-none">
            <blockquote className="italic text-gray-700 text-base leading-relaxed mb-2">“{review.content}”</blockquote>
            <footer className="text-xs text-right text-gray-400 font-sans">- {review.name}</footer>
          </Link>
        ))}
      </div>
    </div>
  );
} 