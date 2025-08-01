import sample from "@/data/sample.json";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";

export default function ProgramsPage() {
  return (
    <div>
      <PageHeader 
        title="프로그램 안내"
        description="스테이피트니스의 다양한 웰니스/트레이닝 프로그램을 만나보세요."
        imageSrc="/images/programs-hero.jpg"
        imageAlt="프로그램 전체"
      />
      <div className="flex flex-col gap-6 px-4 pb-16">
        {sample.programs.programs.map((program) => (
          <Link href={`/programs/${program.name}`} key={program.name} className="block bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-none">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100">
              <Image src={program.image.src} alt={program.image.alt} fill className="object-cover" />
            </div>
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