'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  LogIn,
  UserCheck,
  Menu,
  X,
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  LucideIcon,
} from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { SupportModal } from '@/components/layout/SupportModal';
import { getWhatsAppSupportUrl } from '@/config/support';
import { DEMO_CATEGORIES } from '@/data/mockData';

// Icon map for approved categories from mockData
const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Briefcase,
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams.get('category') || '';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When on homepage at the top, integrate with the photographic hero
  const isDarkNav = isHome && !scrolled;

  // Handle Support click: opens WhatsApp if configured, or displays support modal
  const handleSupportClick = () => {
    const whatsappUrl = getWhatsAppSupportUrl();
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSupportModalOpen(true);
    }
  };

  const headerClass = isHome
    ? scrolled
      ? 'fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] text-[#17243B] shadow-xs transition-all duration-200'
      : 'absolute top-0 left-0 right-0 z-40 bg-slate-950/40 backdrop-blur-md border-b border-white/10 text-white transition-all duration-200'
    : 'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] text-[#17243B] shadow-xs transition-all duration-200';

  return (
    <>
      <header className={headerClass}>
        {/* =======================================================================
            1. MAIN HEADER ROW (Wordmark Left, Search Center, Actions Right)
            ======================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 xl:h-[68px] gap-3 xl:gap-6">
            
            {/* LEFT: PEAK DISCOUNT WORDMARK (NO LOGO ICON, NO TAGLINE) */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#249C91] rounded-lg py-1 pr-2"
                aria-label="Peak Discount Homepage"
              >
                <span className="text-xl sm:text-2xl font-black tracking-tight font-sans transition-colors">
                  <span className={isDarkNav ? 'text-white' : 'text-[#17243B]'}>PEAK</span>
                  <span className="text-[#249C91] ml-1">DISCOUNT</span>
                </span>
              </Link>
            </div>

            {/* CENTRE: PROMINENT UNIFIED TWO-PART SEARCH BAR (DESKTOP) */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-2 xl:mx-4 min-w-0">
              <SearchBar compact={false} />
            </div>

            {/* RIGHT: NAVIGATION & ACTIONS (DESKTOP) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 text-xs font-medium">
              
              {/* WhatsApp Support */}
              <button
                type="button"
                onClick={handleSupportClick}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isDarkNav
                    ? 'text-slate-200 hover:text-white hover:bg-white/10'
                    : 'text-[#64748B] hover:text-[#17243B] hover:bg-slate-100'
                }`}
                aria-label="Contact Customer Support on WhatsApp"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <WhatsAppIcon className="w-3 h-3 fill-white" />
                </div>
                <span>Support</span>
              </button>

              {/* Claim Listing */}
              <Link
                href="/owner/claim"
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  pathname === '/owner/claim'
                    ? isDarkNav
                      ? 'bg-white/15 text-white font-bold'
                      : 'bg-slate-100 text-[#17243B] font-bold'
                    : isDarkNav
                    ? 'text-slate-200 hover:text-white hover:bg-white/10'
                    : 'text-[#64748B] hover:text-[#17243B] hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#249C91]" />
                <span>Claim Listing</span>
              </Link>

              {/* Owner Portal */}
              <Link
                href="/owner/dashboard"
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  pathname.startsWith('/owner/dashboard')
                    ? isDarkNav
                      ? 'bg-white/15 text-white font-bold'
                      : 'bg-slate-100 text-[#17243B] font-bold'
                    : isDarkNav
                    ? 'text-slate-200 hover:text-white hover:bg-white/10'
                    : 'text-[#64748B] hover:text-[#17243B] hover:bg-slate-100'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isDarkNav ? 'text-slate-300' : 'text-[#64748B]'}`} />
                <span>Owner Portal</span>
              </Link>

              <div className={`h-4 w-px mx-1 ${isDarkNav ? 'bg-white/20' : 'bg-slate-200'}`} aria-hidden="true" />

              {/* Log In */}
              <Link
                href="/login"
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isDarkNav
                    ? 'text-slate-200 hover:text-white'
                    : 'text-[#64748B] hover:text-[#17243B]'
                }`}
              >
                <LogIn className={`w-3.5 h-3.5 ${isDarkNav ? 'text-slate-300' : 'text-[#64748B]'}`} />
                <span>Log In</span>
              </Link>

              {/* Sign Up */}
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-lg font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] transition-all shadow-xs hover:shadow focus:ring-2 focus:ring-[#249C91]/50 flex items-center gap-1.5 whitespace-nowrap text-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </Link>
            </nav>

            {/* MOBILE HEADER CONTROLS (Support Shortcut & Hamburger Toggle) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleSupportClick}
                className="p-2 rounded-xl bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors cursor-pointer"
                aria-label="Support on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className={`p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#249C91] ${
                  isDarkNav ? 'text-white hover:bg-white/10' : 'text-[#17243B] hover:bg-slate-100'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR (Stacked neatly below header) */}
          <div className="block lg:hidden pb-3">
            <SearchBar compact={true} />
          </div>
        </div>

        {/* =======================================================================
            2. SECONDARY CATEGORY NAVIGATION ROW (Top Category Strip)
            Sourced directly from approved DEMO_CATEGORIES with horizontal scroll
            ======================================================================= */}
        <div
          className={`border-t transition-colors ${
            isDarkNav
              ? 'border-white/10 bg-black/20 backdrop-blur-xs text-white/90'
              : 'border-[#E2E8F0] bg-white/95 text-[#17243B] shadow-2xs'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 text-xs font-medium whitespace-nowrap">
              {DEMO_CATEGORIES.map((cat) => {
                const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || UtensilsCrossed;
                const isActive = activeCategoryParam.toLowerCase() === cat.name.toLowerCase();

                return (
                  <Link
                    key={cat.id}
                    href={`/search?category=${encodeURIComponent(cat.name)}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                      isActive
                        ? isDarkNav
                          ? 'bg-white/20 text-white font-bold ring-1 ring-white/40'
                          : 'bg-[#249C91]/10 text-[#249C91] font-bold'
                        : isDarkNav
                        ? 'text-slate-200 hover:text-white hover:bg-white/10'
                        : 'text-[#64748B] hover:text-[#17243B] hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? 'text-[#E66B45]'
                          : isDarkNav
                          ? 'text-slate-300'
                          : 'text-[#249C91]'
                      }`}
                    />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE DRAWER NAVIGATION
            ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-4 pb-6 space-y-4 shadow-2xl text-[#17243B] animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {/* Support */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSupportClick();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50 text-left cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                </div>
                <span>Customer Support (WhatsApp)</span>
              </button>

              {/* Claim Listing */}
              <Link
                href="/owner/claim"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <ShieldCheck className="w-5 h-5 text-[#249C91]" />
                <span>Claim Listing</span>
              </Link>

              {/* Owner Portal */}
              <Link
                href="/owner/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <Building2 className="w-5 h-5 text-[#64748B]" />
                <span>Owner Dashboard</span>
              </Link>

              {/* Divider */}
              <div className="border-t border-[#E2E8F0] my-2" />

              {/* Log In */}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <LogIn className="w-5 h-5 text-[#64748B]" />
                <span>Log In to Account</span>
              </Link>

              {/* Sign Up */}
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] shadow-xs"
              >
                <UserCheck className="w-4 h-4" />
                <span>Create Free Account</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Support Status Dialog Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
};
