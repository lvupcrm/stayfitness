import { Metadata } from 'next'

const defaultMetadata = {
  title: 'Stay Fitness - 체형교정과 통증개선의 새로운 기준',
  description: '전문 트레이너의 1:1 맞춤 관리로 당신의 건강한 변화를 시작하세요. 강남, 홍대, 잠실 지점에서 체계적인 체형교정 프로그램을 제공합니다.',
  keywords: '체형교정, 통증개선, 피트니스, PT, 퍼스널트레이닝, 강남피트니스, 홍대피트니스, 잠실피트니스',
  authors: [{ name: 'Stay Fitness' }],
  creator: 'Stay Fitness',
  publisher: 'Stay Fitness',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://stayfitness.com',
    siteName: 'Stay Fitness',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stay Fitness - 체형교정과 통증개선의 새로운 기준'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
  }
}

export function generateMetadata({
  title,
  description,
  path = '',
  noIndex = false
}: {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = `https://stayfitness.com${path}`
  const fullTitle = title ? `${title} | Stay Fitness` : defaultMetadata.title

  return {
    ...defaultMetadata,
    title: fullTitle,
    description: description || defaultMetadata.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: fullTitle,
      description: description || defaultMetadata.description,
      url
    },
    robots: noIndex ? {
      index: false,
      follow: false
    } : defaultMetadata.robots
  }
}