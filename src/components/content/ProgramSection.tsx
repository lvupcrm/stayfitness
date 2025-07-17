import { motion } from "framer-motion";
import Image from "next/image";
import { trackKakaoClick } from "@/lib/analytics";

export interface Program {
  name: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  price: string;
}

export interface ProgramSectionProps {
  title: string;
  programs: Program[];
}

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

const ProgramSection = ({ title, programs }: ProgramSectionProps) => {
  const handleKakaoClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick("program_section");
  };

  return (
    <motion.section
      id="programs"
      className="py-16 min-h-[40vh] flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {programs.map((program, idx) => (
          <div key={program.name} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
            <Image {...program.image} className="mb-4 rounded" />
            <h3 className="font-bold text-lg mb-2">{program.name}</h3>
            <p className="text-sm text-gray-600 mb-2 text-center">{program.description}</p>
            <span className="text-primary font-semibold">{program.price}</span>
          </div>
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

export default ProgramSection; 