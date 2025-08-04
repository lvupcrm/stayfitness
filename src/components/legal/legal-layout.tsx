'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface LegalLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  lastUpdated: string
  className?: string
}

export function LegalLayout({
  children,
  title,
  subtitle,
  lastUpdated,
  className
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">홈</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-foreground">{title}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className={cn("max-w-3xl mx-auto px-6 py-12", className)}>
        <div className="prose prose-slate max-w-none">
          {children}
        </div>

        {/* Last updated */}
        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          마지막 업데이트: {lastUpdated}
        </div>
      </div>
    </div>
  )
}