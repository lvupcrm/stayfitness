import Link from "next/link";
import sample from "@/data/sample.json";

export default function ReviewsPage() {
  return (
    <div>
      <section className="mb-8">
        <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
          <img src="/images/reviews-hero.jpg" alt="후기 전체" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">회원 후기</h1>
            <p className="text-base sm:text-lg text-white font-light text-center">실제 회원들의 생생한 후기를 확인하세요.</p>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-6 px-4 pb-16">
        {sample.reviews.reviews.map((review, idx) => (
          <Link href={`/reviews/${idx}`} key={idx} className="block bg-white rounded-xl border border-gray-100 p-5 shadow-none">
            <blockquote className="italic text-gray-700 text-base leading-relaxed mb-2">“{review.content}”</blockquote>
            <footer className="text-xs text-right text-gray-400 font-sans">- {review.name}</footer>
          </Link>
        ))}
      </div>
    </div>
  );
} 