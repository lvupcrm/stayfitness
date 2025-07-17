import { motion } from "framer-motion";
import Image from "next/image";
import { trackKakaoClick } from "@/lib/analytics";

export interface LocationSectionProps {
  title: string;
  address: string;
  parking: string;
  subway: string;
  image: { src: string; alt: string; width: number; height: number };
}

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

const LocationSection = ({ title, address, parking, subway, image }: LocationSectionProps) => {
  const handleKakaoClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick("location_section");
  };

  return (
    <motion.section
      id="location"
      className="py-24 min-h-[40vh] flex flex-col items-center bg-gradient-to-b from-white via-green-50 to-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-serif font-bold mb-12 text-center text-green-900">{title}</h2>
      <Image {...image} className="mb-8 rounded-2xl object-cover w-full max-w-2xl h-72 sm:h-96 border border-gray-100" />
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl mb-8 border border-gray-100 shadow-none">
        <p className="text-center mb-2 text-lg font-semibold text-green-800">{address}</p>
        <p className="text-center text-sm text-gray-600 mb-1">{parking}</p>
        <p className="text-center text-sm text-gray-600">{subway}</p>
      </div>
      <button
        className="mt-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full px-12 py-4 shadow-none text-lg transition-colors duration-200"
        onClick={handleKakaoClick}
      >
        카카오톡 상담하기
      </button>
    </motion.section>
  );
};

export default LocationSection; 