import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-64 sm:h-96 flex items-center justify-center overflow-hidden rounded-b-2xl mb-6">
      <Image
        src="/images/hero-main.jpg" // 실제 센터/웰니스 분위기 이미지로 교체 필요
        alt="스테이피트니스 센터 전경"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-3 drop-shadow-lg text-center">StayFitness</h1>
        <p className="text-lg sm:text-2xl text-white font-light mb-6 text-center drop-shadow">프리미엄 웰니스 라이프의 시작</p>
        <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-8 py-3 text-lg shadow-lg transition">상담/문의하기</a>
      </div>
    </section>
  );
} 