import { motion } from "framer-motion";
import Image from "next/image";
import { KakaoButton } from "@/components/ui/kakao-button";
import type { ImageProps } from "@/types";

export interface IntroSectionProps {
  title: string;
  description: string;
  image: ImageProps;
}

const IntroSection = ({ title, description, image }: IntroSectionProps) => {

  return (
    <motion.section
      id="intro"
      className="py-24 min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-white via-amber-50 to-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image 
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority 
        className="mb-10 rounded-2xl object-cover w-full max-w-2xl h-72 sm:h-96 border border-gray-100" 
      />
      <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-4 text-center text-green-900 tracking-tight drop-shadow-sm">{title}</h1>
      <p className="text-xl sm:text-2xl text-center max-w-2xl text-gray-700 mb-8 font-light leading-relaxed">{description}</p>
      <KakaoButton location="intro_section" className="mt-2" />
    </motion.section>
  );
};

export default IntroSection; 