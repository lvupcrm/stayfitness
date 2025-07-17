import LeadForm from "@/components/lead-form";

export default function ContactPage() {
  return (
    <div>
      <section className="mb-8">
        <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
          <img src="/images/contact-hero.jpg" alt="상담/문의" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">상담/문의</h1>
            <p className="text-base sm:text-lg text-white font-light text-center">궁금한 점이 있으신가요? 언제든 문의해 주세요.</p>
          </div>
        </div>
      </section>
      <div className="px-4 pb-16">
        <LeadForm />
      </div>
    </div>
  );
} 