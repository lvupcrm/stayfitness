import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function PageHeader({ title, description, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <section className="mb-8">
      <div className="w-full h-48 sm:h-64 relative overflow-hidden rounded-b-2xl mb-4">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 text-center">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white font-light text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}