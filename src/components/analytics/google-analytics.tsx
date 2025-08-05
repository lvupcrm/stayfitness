'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      const gtag = (window as any).gtag
      if (gtag) {
        gtag('config', gaId, {
          page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
        })
      }
    }
  }, [pathname, searchParams, gaId])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              custom_map: {
                'custom_parameter_consultation': 'consultation_type',
                'custom_parameter_trainer_application': 'application_type'
              }
            });
          `,
        }}
      />
    </>
  )
}