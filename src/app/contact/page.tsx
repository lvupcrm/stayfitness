import LeadForm from "@/components/lead-form/LeadForm";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactPage() {
  return (
    <div>
      <PageHeader 
        title="상담/문의"
        description="궁금한 점이 있으신가요? 언제든 문의해 주세요."
        imageSrc="/images/contact-hero.jpg"
        imageAlt="상담/문의"
      />
      <div className="px-4 pb-16">
        <LeadForm />
      </div>
    </div>
  );
} 