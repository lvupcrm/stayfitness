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
      <section className="mb-8">
        <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
          <img src="/images/space-hero.jpg" alt="공간/시설 안내" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">공간/시설 안내</h1>
            <p className="text-base sm:text-lg text-white font-light text-center">스테이피트니스의 쾌적하고 고급스러운 공간을 둘러보세요.</p>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-6 px-4 pb-16">
        {spaces.map((space, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center shadow-none">
            <img src={space.src} alt={space.alt} className="w-full h-48 object-cover rounded-lg border border-gray-100 mb-3" />
            <p className="text-base text-gray-700 text-center font-light">{space.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 