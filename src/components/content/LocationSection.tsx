import { motion } from "framer-motion";
import Image from "next/image";
import { KakaoButton } from "@/components/ui/kakao-button";
import type { ImageProps } from "@/types";

export interface LocationSectionProps {
  title: string;
  address: string;
  parking: string;
  subway: string;
  image: ImageProps;
}

const LocationSection = ({ title, address, parking, subway, image }: LocationSectionProps) => {

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
      <Image 
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="mb-8 rounded-2xl object-cover w-full max-w-2xl h-72 sm:h-96 border border-gray-100" 
      />
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl mb-8 border border-gray-100 shadow-none">
        <p className="text-center mb-2 text-lg font-semibold text-green-800">{address}</p>
        <p className="text-center text-sm text-gray-600 mb-1">{parking}</p>
        <p className="text-center text-sm text-gray-600">{subway}</p>
      </div>
      <KakaoButton location="location_section" className="mt-2" />
    </motion.section>
  );
};

export default LocationSection; 