'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Grid,
  ShieldCheck,
  Building2,
  PlusCircle,
  LogIn,
  UserCheck,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // When on homepage at the top, use dark translucent styling over the hero
  const isDarkNav = isHome && !scrolled;

  // Navigation positioning & styling based on page and scroll position
  const headerClass = isHome
    ? scrolled
      ? 'fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-[#14213D] shadow-sm animate-in slide-in-from-top-1 duration-200'
      : 'absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#14213D]/90 via-[#14213D]/50 to-transparent border-b border-white/10 text-white transition-all duration-300'
    : 'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-[#14213D] shadow-xs transition-all duration-200';

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          {/* =========================================================================
              LEFT: CLEAN TEXT-BASED WORDMARK (PEAK in Navy/White, DISCOUNT in Teal)
              ========================================================================= */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] rounded-lg py-1 pr-2"
            aria-label="Peak Discount Homepage"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight font-sans transition-colors">
              <span className={isDarkNav ? 'text-white' : 'text-[#14213D]'}>PEAK</span>
              <span className="text-[#2A9D8F] ml-1">DISCOUNT</span>
            </span>
          </Link>

          {/* =========================================================================
              CENTRE: PRIMARY DESKTOP NAVIGATION
              ========================================================================= */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/search"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/search')
                  ? isDarkNav
                    ? 'bg-white/15 text-white font-semibold'
                    : 'bg-slate-100 text-[#14213D] font-semibold'
                  : isDarkNav
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-[#14213D] hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-[#2A9D8F]" />
              <span>Explore Businesses</span>
            </Link>

            <Link
              href="/#categories"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isDarkNav
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-[#14213D] hover:bg-slate-50'
              }`}
            >
              <Grid className={`w-4 h-4 ${isDarkNav ? 'text-slate-300' : 'text-slate-500'}`} />
              <span>Categories</span>
            </Link>

            <Link
              href="/owner/claim"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/owner/claim')
                  ? isDarkNav
                    ? 'bg-white/15 text-white font-semibold'
                    : 'bg-slate-100 text-[#14213D] font-semibold'
                  : isDarkNav
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-[#14213D] hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
              <span>Claim Listing</span>
            </Link>

            <Link
              href="/owner/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/owner/dashboard')
                  ? isDarkNav
                    ? 'bg-white/15 text-white font-semibold'
                    : 'bg-slate-100 text-[#14213D] font-semibold'
                  : isDarkNav
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-[#14213D] hover:bg-slate-50'
              }`}
            >
              <Building2 className={`w-4 h-4 ${isDarkNav ? 'text-slate-300' : 'text-slate-600'}`} />
              <span>Owner Portal</span>
            </Link>
          </nav>

          {/* =========================================================================
              RIGHT: CALL TO ACTIONS (List Your Business, Log In, Sign Up)
              ========================================================================= */}
          <div className="hidden lg:flex items-center gap-3">
            {/* List Your Business - Clear Visual Emphasis */}
            <Link
              href="/owner/profile"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isDarkNav
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-slate-100 hover:bg-slate-200/90 text-[#14213D] border border-slate-200 shadow-2xs'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#2A9D8F]" />
              <span>List Your Business</span>
            </Link>

            <div className={`h-4 w-px ${isDarkNav ? 'bg-white/20' : 'bg-slate-200'}`} />

            {/* Log In */}
            <Link
              href="/login"
              className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isDarkNav
                  ? 'text-slate-200 hover:text-white'
                  : 'text-slate-700 hover:text-[#14213D]'
              }`}
            >
              <LogIn className={`w-4 h-4 ${isDarkNav ? 'text-slate-300' : 'text-slate-500'}`} />
              <span>Log In</span>
            </Link>

            {/* Sign Up - Trust Teal */}
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-sm font-bold bg-[#2A9D8F] text-white hover:bg-[#21766C] transition-all shadow-xs hover:shadow focus:ring-2 focus:ring-[#2A9D8F]/50 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* =========================================================================
              MOBILE MENU TOGGLE
              ========================================================================= */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            <Link
              href="/search"
              className={`p-2 rounded-lg ${
                isDarkNav ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Search directory"
            >
              <Compass className="w-5 h-5 text-[#2A9D8F]" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] ${
                isDarkNav ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE DRAWER NAVIGATION
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-xl text-[#14213D] animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Compass className="w-5 h-5 text-[#2A9D8F]" />
              <span>Explore Businesses</span>
            </Link>

            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Grid className="w-5 h-5 text-slate-500" />
              <span>Categories</span>
            </Link>

            <Link
              href="/owner/claim"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ShieldCheck className="w-5 h-5 text-[#2A9D8F]" />
              <span>Claim Listing</span>
            </Link>

            <Link
              href="/owner/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Building2 className="w-5 h-5 text-[#14213D]" />
              <span>Owner Portal</span>
            </Link>

            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ShieldCheck className="w-5 h-5 text-[#F4A261]" />
              <span>Admin Console</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/owner/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#14213D] border border-slate-200"
            >
              + List Your Business
            </Link>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-3 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-3 rounded-xl text-sm font-bold bg-[#2A9D8F] text-white hover:bg-[#21766C]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
