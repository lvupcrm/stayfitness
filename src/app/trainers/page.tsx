import Link from "next/link";

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
      <section className="mb-8">
        <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
          <img src="/images/trainers-hero.jpg" alt="트레이너 전체" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">트레이너 소개</h1>
            <p className="text-base sm:text-lg text-white font-light text-center">전문성과 열정을 갖춘 스테이피트니스 트레이너를 만나보세요.</p>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-6 px-4 pb-16">
        {trainers.map((trainer) => (
          <Link href={`/trainers/${trainer.id}`} key={trainer.id} className="block bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-none">
            <img src={trainer.image} alt={trainer.name} className="w-20 h-20 rounded-full object-cover border border-gray-100" />
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