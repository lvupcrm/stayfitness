import { motion } from "framer-motion";
import Image from "next/image";
import { trackKakaoClick } from "@/lib/analytics";

export interface IntroSectionProps {
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
}

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

const IntroSection = ({ title, description, image }: IntroSectionProps) => {
  const handleKakaoClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick("intro_section");
  };

  return (
    <motion.section
      id="intro"
      className="py-16 min-h-[60vh] flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image {...image} priority className="mb-6" />
      <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-base text-center max-w-md">{description}</p>
      <button
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6 py-3 shadow transition-colors duration-200"
        onClick={handleKakaoClick}
      >
        카카오톡 상담하기
      </button>
    </motion.section>
  );
};

export default IntroSection; 