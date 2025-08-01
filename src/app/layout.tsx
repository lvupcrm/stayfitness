import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KakaoFloatingButton from "@/components/kakao-banner/KakaoFloatingButton";
import { ReactNode } from 'react';
import { 
  BusinessStructuredData, 
  WebsiteStructuredData, 
  OrganizationStructuredData 
} from '@/components/seo/structured-data';
import { UrbanNav } from '@/components/navigation/urban-nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stayfitness.com'),
  title: {
    default: '스테이피트니스 - 피트니스의 새 기준',
    template: '%s | 스테이피트니스'
  },
  description: '전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터. 당신만의 피트니스 여정을 시작하세요.',
  keywords: ['피트니스', '헬스장', '퍼스널 트레이닝', 'PT', '그룹 클래스', '운동', '다이어트', '근력 운동', '스테이피트니스'],
  authors: [{ name: '스테이피트니스' }],
  creator: '스테이피트니스',
  publisher: '스테이피트니스',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://stayfitness.com',
    siteName: '스테이피트니스',
    title: '스테이피트니스 - 피트니스의 새 기준',
    description: '전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '스테이피트니스 - 피트니스의 새 기준',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '스테이피트니스 - 피트니스의 새 기준',
    description: '전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Urban Field 스타일 성능 최적화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* GA4 스크립트 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { 
                    page_path: window.location.pathname,
                    custom_map: {
                      'custom_parameter_consultation': 'consultation_type',
                      'custom_parameter_trainer_application': 'application_type'
                    }
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Urban Field 스타일 구조화 데이터 */}
        <BusinessStructuredData />
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        
        {/* 메인 네비게이션 */}
        <UrbanNav />
        
        {/* 메인 콘텐츠 */}
        <main>
          {children}
        </main>
        
        {/* 플로팅 요소들 */}
        <KakaoFloatingButton />
        
        {/* 토스트 알림 */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
