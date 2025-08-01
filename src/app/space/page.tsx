import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";

const spaces = [
  {
    src: "/images/space-1.jpg",
    alt: "센터 내부 전경",
    desc: "밝고 쾌적한 트레이닝 공간"
  },
  {
    src: "/images/space-2.jpg",
    alt: "필라테스 존",
    desc: "최신 필라테스 기구 완비"
  },
  {
    src: "/images/space-3.jpg",
    alt: "라운지/휴게 공간",
    desc: "고급스러운 라운지와 휴게 공간"
  },
];

export default function SpacePage() {
  return (
    <div>
      <PageHeader 
        title="공간/시설 안내"
        description="스테이피트니스의 쾌적하고 고급스러운 공간을 둘러보세요."
        imageSrc="/images/space-hero.jpg"
        imageAlt="공간/시설 안내"
      />
      <div className="flex flex-col gap-6 px-4 pb-16">
        {spaces.map((space, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center shadow-none">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-100 mb-3">
              <Image src={space.src} alt={space.alt} fill className="object-cover" />
            </div>
            <p className="text-base text-gray-700 text-center font-light">{space.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 