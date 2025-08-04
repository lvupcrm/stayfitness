'use client'

export function SectionLoading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto" />
        <p className="text-slate-600 animate-pulse">로딩 중...</p>
      </div>
    </div>
  )
}