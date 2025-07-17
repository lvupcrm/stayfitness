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
      className="py-16 min-h-[40vh] flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold mb-8">{title}</h2>
      <Image {...image} className="mb-4 rounded" />
      <p className="text-center mb-2">{address}</p>
      <p className="text-center text-sm text-gray-600 mb-1">{parking}</p>
      <p className="text-center text-sm text-gray-600">{subway}</p>
      <button
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6 py-3 shadow transition-colors duration-200"
        onClick={handleKakaoClick}
      >
        카카오톡 상담하기
      </button>
    </motion.section>
  );
};

export default LocationSection; 