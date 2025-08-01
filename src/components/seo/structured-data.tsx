import Script from 'next/script'

interface BusinessStructuredDataProps {
  name?: string
  description?: string
  url?: string
  telephone?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  openingHours?: string[]
  priceRange?: string
}

interface ServiceStructuredDataProps {
  name: string
  description: string
  provider: string
  serviceType: string
  areaServed: string
  offers?: {
    priceCurrency: string
    price?: string
    priceRange?: string
  }
}

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  worksFor: string
  description: string
  image?: string
  url?: string
}

export function BusinessStructuredData({
  name = "스테이피트니스",
  description = "전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터",
  url = "https://stayfitness.com",
  telephone = "+82-2-0000-0000",
  address = {
    streetAddress: "서울시 강남구 테헤란로 123",
    addressLocality: "강남구",
    addressRegion: "서울시",
    postalCode: "06142",
    addressCountry: "KR"
  },
  openingHours = [
    "Mo-Fr 06:00-23:00",
    "Sa-Su 08:00-22:00"
  ],
  priceRange = "₩₩₩"
}: BusinessStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Gym",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "openingHoursSpecification": openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(' ')[0],
      "opens": hours.split(' ')[1]?.split('-')[0],
      "closes": hours.split(' ')[1]?.split('-')[1]
    })),
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Personal Training" },
      { "@type": "LocationFeatureSpecification", "name": "Group Classes" },
      { "@type": "LocationFeatureSpecification", "name": "Weight Training Area" },
      { "@type": "LocationFeatureSpecification", "name": "Cardio Equipment" },
      { "@type": "LocationFeatureSpecification", "name": "Locker Rooms" },
      { "@type": "LocationFeatureSpecification", "name": "Shower Facilities" }
    ],
    "sameAs": [
      "https://www.instagram.com/stayfitness_official",
      "https://www.facebook.com/stayfitness",
      "https://blog.naver.com/stayfitness"
    ]
  }

  return (
    <Script
      id="business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ServiceStructuredData({
  name,
  description,
  provider = "스테이피트니스",
  serviceType,
  areaServed = "서울, 대한민국",
  offers
}: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": offers.priceCurrency,
        ...(offers.price && { "price": offers.price }),
        ...(offers.priceRange && { "priceRange": offers.priceRange })
      }
    })
  }

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function PersonStructuredData({
  name,
  jobTitle,
  worksFor = "스테이피트니스",
  description,
  image,
  url
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "description": description,
    "worksFor": {
      "@type": "Organization",
      "name": worksFor
    },
    ...(image && { "image": image }),
    ...(url && { "url": url })
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "스테이피트니스",
    "description": "전문 퍼스널 트레이닝과 피트니스 서비스를 제공하는 프리미엄 헬스장",
    "url": "https://stayfitness.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://stayfitness.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.instagram.com/stayfitness_official",
      "https://www.facebook.com/stayfitness",
      "https://blog.naver.com/stayfitness"
    ]
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "스테이피트니스",
    "alternateName": "Stay Fitness",
    "description": "피트니스의 새 기준을 제시하는 프리미엄 헬스장",
    "url": "https://stayfitness.com",
    "logo": "https://stayfitness.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-2-0000-0000",
      "contactType": "customer service",
      "availableLanguage": ["Korean", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "서울시 강남구 테헤란로 123",
      "addressLocality": "강남구",
      "addressRegion": "서울시",
      "postalCode": "06142",
      "addressCountry": "KR"
    },
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "스테이피트니스 창립진"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10-50"
    },
    "sameAs": [
      "https://www.instagram.com/stayfitness_official",
      "https://www.facebook.com/stayfitness",
      "https://blog.naver.com/stayfitness"
    ]
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// FAQ 구조화 데이터
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// 리뷰/평점 구조화 데이터
export function ReviewStructuredData({ 
  reviews 
}: { 
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }> 
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "스테이피트니스",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      "reviewCount": reviews.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  }

  return (
    <Script
      id="review-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}