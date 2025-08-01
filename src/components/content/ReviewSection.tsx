import { motion } from "framer-motion";
import { trackKakaoClick } from "@/lib/analytics";

export interface Review {
  name: string;
  content: string;
}

export interface ReviewSectionProps {
  title: string;
  reviews: Review[];
}

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

const ReviewSection = ({ title, reviews }: ReviewSectionProps) => {
  const handleKakaoClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick("review_section");
  };

  return (
    <motion.section
      id="reviews"
      className="py-24 min-h-[40vh] flex flex-col items-center bg-gradient-to-b from-white via-amber-50 to-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-green-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-5xl">
        {reviews.map((review, idx) => (
          <blockquote key={idx} className="italic text-gray-700 bg-white rounded-2xl p-8 border border-gray-100 shadow-none">
            <p className="mb-6 text-xl leading-relaxed">“{review.content}”</p>
            <footer className="text-xs text-right text-gray-400 font-sans">- {review.name}</footer>
          </blockquote>
        ))}
      </div>
      <button
        className="mt-12 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full px-12 py-4 shadow-none text-lg transition-colors duration-200"
        onClick={handleKakaoClick}
      >
        카카오톡 상담하기
      </button>
    </motion.section>
  );
};

export default ReviewSection; 