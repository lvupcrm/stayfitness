import { HeroSection } from "@/components/common";
import sample from "@/data/sample.json";
import Link from "next/link";

export default function ProgramsPage() {
  return (
    <div>
      <section className="mb-8">
        <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
          <img src="/images/programs-hero.jpg" alt="프로그램 전체" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">프로그램 안내</h1>
            <p className="text-base sm:text-lg text-white font-light text-center">스테이피트니스의 다양한 웰니스/트레이닝 프로그램을 만나보세요.</p>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-6 px-4 pb-16">
        {sample.programs.programs.map((program) => (
          <Link href={`/programs/${program.name}`} key={program.name} className="block bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-none">
            <img src={program.image.src} alt={program.image.alt} className="w-20 h-20 rounded-lg object-cover border border-gray-100" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-green-800 mb-1">{program.name}</h2>
              <p className="text-sm text-gray-600 mb-1 line-clamp-2">{program.description}</p>
              <span className="text-base text-green-700 font-semibold">{program.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 