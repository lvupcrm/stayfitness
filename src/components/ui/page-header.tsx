import Image from 'next/image'

interface PageHeaderProps {
  title: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function PageHeader({ 
  title, 
  description, 
  imageSrc, 
  imageAlt, 
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`relative h-64 md:h-80 lg:h-96 flex items-center justify-center ${className}`}>
      {/* Background Image */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl opacity-90">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}