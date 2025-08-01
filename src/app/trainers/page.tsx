import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";

const trainers = [
  {
    id: "kim",
    name: "김트레이너",
    specialty: "근력/체형교정",
    image: "/images/trainer-kim.jpg",
  },
  {
    id: "lee",
    name: "이트레이너",
    specialty: "필라테스/재활",
    image: "/images/trainer-lee.jpg",
  },
  {
    id: "park",
    name: "박트레이너",
    specialty: "다이어트/PT",
    image: "/images/trainer-park.jpg",
  },
];

export default function TrainersPage() {
  return (
    <div>
      <PageHeader 
        title="트레이너 소개"
        description="전문성과 열정을 갖춘 스테이피트니스 트레이너를 만나보세요."
        imageSrc="/images/trainers-hero.jpg"
        imageAlt="트레이너 전체"
      />
      <div className="flex flex-col gap-6 px-4 pb-16">
        {trainers.map((trainer) => (
          <Link href={`/trainers/${trainer.id}`} key={trainer.id} className="block bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-none">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-100">
              <Image src={trainer.image} alt={trainer.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-green-800 mb-1">{trainer.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{trainer.specialty}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 