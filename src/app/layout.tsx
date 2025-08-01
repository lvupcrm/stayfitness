import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KakaoFloatingButton from "@/components/kakao-banner/KakaoFloatingButton";
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '스테이피트니스 - 모바일 PT센터 랜딩',
  description: '스테이피트니스에서 프로그램, 후기, 상담을 한눈에! 모바일 최적화 랜딩페이지',
  openGraph: {
    title: '스테이피트니스 - 모바일 PT센터 랜딩',
    description: '스테이피트니스에서 프로그램, 후기, 상담을 한눈에! 모바일 최적화 랜딩페이지',
    url: 'https://stayfitness.com',
    siteName: '스테이피트니스',
    images: [
      {
        url: 'https://stayfitness.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '스테이피트니스 OG 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>스테이피트니스 - 모바일 PT센터 랜딩</title>
        <meta name="description" content="스테이피트니스에서 프로그램, 후기, 상담을 한눈에! 모바일 최적화 랜딩페이지" />
        <meta property="og:title" content="스테이피트니스 - 모바일 PT센터 랜딩" />
        <meta property="og:description" content="스테이피트니스에서 프로그램, 후기, 상담을 한눈에! 모바일 최적화 랜딩페이지" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stayfitness.com" />
        <meta property="og:site_name" content="스테이피트니스" />
        <meta property="og:image" content="https://stayfitness.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="스테이피트니스 - 모바일 PT센터 랜딩" />
        <meta name="twitter:description" content="스테이피트니스에서 프로그램, 후기, 상담을 한눈에! 모바일 최적화 랜딩페이지" />
        <meta name="twitter:image" content="https://stayfitness.com/og-image.png" />
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
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <KakaoFloatingButton />
      </body>
    </html>
  );
}
