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
      className="py-16 min-h-[40vh] flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {reviews.map((review, idx) => (
          <blockquote key={idx} className="italic text-gray-600 bg-gray-50 rounded-lg p-4 shadow">
            <p className="mb-2">“{review.content}”</p>
            <footer className="text-xs text-right text-gray-400">- {review.name}</footer>
          </blockquote>
        ))}
      </div>
      <button
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6 py-3 shadow transition-colors duration-200"
        onClick={handleKakaoClick}
      >
        카카오톡 상담하기
      </button>
    </motion.section>
  );
};

export default ReviewSection; 