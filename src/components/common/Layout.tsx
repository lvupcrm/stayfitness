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
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-foreground/10 w-full">
      <nav className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
        <span className="font-bold text-lg text-primary">StayFitness</span>
        <ul className="flex gap-2 sm:gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={true}
                className="text-foreground hover:text-primary transition-colors px-2 py-1 rounded text-sm sm:text-base"
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
    <footer className="w-full py-4 border-t border-foreground/10 text-center text-xs text-foreground bg-background/80">
      © {new Date().getFullYear()} StayFitness. All rights reserved.
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 sm:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 