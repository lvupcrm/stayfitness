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
      className="py-24 min-h-[50vh] flex flex-col items-center bg-gradient-to-b from-white via-green-50 to-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-green-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-5xl">
        {programs.map((program, idx) => (
          <div key={program.name} className="flex flex-col items-center bg-white rounded-2xl p-8 border border-gray-100 shadow-none">
            <Image {...program.image} className="mb-6 rounded-xl object-cover w-full h-56 border border-gray-100" />
            <h3 className="font-serif font-bold text-2xl mb-2 text-center text-green-800">{program.name}</h3>
            <p className="text-base text-gray-600 mb-2 text-center font-light">{program.description}</p>
            <span className="text-lg text-green-700 font-semibold mb-2">{program.price}</span>
          </div>
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

export default ProgramSection; 