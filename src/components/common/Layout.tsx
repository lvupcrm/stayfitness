import Link from "next/link";
import { ReactNode } from "react";

const NAV_ITEMS = [
  { label: "소개", href: "#intro" },
  { label: "프로그램", href: "#programs" },
  { label: "후기", href: "#reviews" },
  { label: "위치", href: "#location" },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 w-full shadow-none">
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="font-serif text-2xl font-bold text-green-800 tracking-tight select-none">StayFitness</span>
        <ul className="flex gap-3 sm:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={true}
                className="text-gray-700 hover:text-green-700 transition-colors px-3 py-1 rounded text-base font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-200 text-center text-xs text-gray-500 bg-white/90 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-6">
        <span>© {new Date().getFullYear()} StayFitness. All rights reserved.</span>
        <span className="text-[11px]">Designed by StayFitness | Inspired by Urbanfield</span>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-amber-50 to-white text-gray-900 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10 sm:px-10">
        {children}
      </main>
      <Footer />
    </div>
  );
} 