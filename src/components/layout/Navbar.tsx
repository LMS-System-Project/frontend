"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, Home, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3" : "bg-transparent py-5"
      }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Universal Controls & Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-accent p-1.5 rounded group-hover:scale-105 transition-transform">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary-text">GradeFlow</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">How It Works</Link>
            <Link href="/#lifecycle" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">Lifecycle</Link>
            <Link href="/#reviews" className="text-sm font-medium text-slate-600 hover:text-accent transition-colors">Success Stories</Link>
          </div>
        </div>

        {/* Universal Controls - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-accent transition-colors px-3 py-1 border border-slate-200 rounded hover:border-slate-300 transition-all bg-white/50"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-accent transition-colors px-3 py-1 border border-slate-200 rounded hover:border-slate-300 transition-all bg-white/50"
          >
            <Home size={14} />
            Home
          </Link>
          <div className="h-4 w-px bg-slate-200 mx-2" />
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-accent">Sign In</Link>
          <Link
            href="/register"
            className="bg-accent text-white px-5 py-2.5 rounded-md text-sm font-bold hover:bg-slate-800 transition-all shadow-sm border border-slate-700 flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-slate-900">How It Works</Link>
            <Link href="/#lifecycle" onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-slate-900">Lifecycle</Link>
            <Link href="/#reviews" onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-slate-900">Success Stories</Link>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex gap-4">
            <button onClick={() => { window.history.back(); setMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-600">
              <ChevronLeft size={16} /> Back
            </button>
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-600">
              <Home size={16} /> Home
            </Link>
          </div>
          <Link href="/register" onClick={() => setMenuOpen(false)} className="w-full bg-accent text-white py-4 rounded-lg text-center font-bold">
            Get Started Now
          </Link>
        </div>
      )}
    </nav>
  );
}
