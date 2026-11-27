'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  LogIn,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Star,
  PlusCircle,
  HelpCircle,
  Tag,
  ShieldCheck,
  Headset,
} from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';
import { SupportModal } from '@/components/layout/SupportModal';
import { getWhatsAppSupportUrl } from '@/config/support';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  // The navigation bar belongs strictly to the homepage hero section
  const isHome = pathname === '/' || pathname === '' || pathname === '/Pick-discounts' || pathname === '/Pick-discounts/';
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setBusinessDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBusinessDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset dropdowns when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setBusinessDropdownOpen(false);
    setMobileMenuOpen(false);
  }

  // Support click handler: opens WhatsApp URL if configured, or opens SupportModal
  const handleSupportClick = () => {
    const whatsappUrl = getWhatsAppSupportUrl();
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSupportModalOpen(true);
    }
  };

  // The navigation bar must appear only on the homepage hero section. It must not appear on other pages.
  if (!isHome) {
    return null;
  }

  // Anchored to the top of the homepage hero section, scrolling away naturally with page content.
  // Not position: fixed, not position: sticky.
  const isTransparentOverHero = true;
  const headerClass = 'absolute top-0 left-0 right-0 z-30 bg-transparent text-white';

  return (
    <>
      <header className={headerClass} ref={navContainerRef}>
        {/* =======================================================================
            SINGLE HORIZONTAL NAVIGATION ROW (Yelp Structure)
            Order: Wordmark | Search bar | Pick Discount for Business | Rate & Reviews | Deal Alerts | Support | Log In | Sign Up
            ======================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-2 lg:gap-3 xl:gap-5">
            
            {/* 1. PICK DISCOUNT WORDMARK */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#249C91] rounded-lg py-1 pr-2"
                aria-label="Pick Discount Homepage"
              >
                <span className="text-2xl sm:text-[26px] xl:text-[28px] font-black tracking-tight font-sans transition-colors">
                  <span className={isTransparentOverHero ? 'text-white' : 'text-[#17243B]'}>PICK</span>
                  <span className="text-[#249C91] ml-1">DISCOUNT</span>
                </span>
              </Link>
            </div>

            {/* 2. SINGLE PROMINENT SEARCH BAR ("Hidden gem locals love") */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-2 min-w-0">
              <SearchBar />
            </div>

            {/* 3–8. ACTIONS & NAVIGATION IN REQUIRED ORDER */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 text-[13px] xl:text-sm font-semibold whitespace-nowrap">
              
              {/* 3. Pick Discount for Business (Dropdown) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                  className={`px-2 xl:px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    businessDropdownOpen
                      ? isTransparentOverHero
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-[#17243B]'
                      : isTransparentOverHero
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-50'
                  }`}
                  aria-expanded={businessDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Pick Discount for Business Menu"
                >
                  <span>Pick Discount for Business</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${businessDropdownOpen ? 'rotate-180 text-[#249C91]' : ''}`} />
                </button>

                {/* Dropdown Panel */}
                {businessDropdownOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] right-0 w-64 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-2 z-50 text-[#17243B] animate-in fade-in zoom-in-95 duration-150"
                    role="menu"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] mb-1">
                      Business Solutions
                    </div>

                    <Link
                      href="/owner/claim"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      role="menuitem"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#249C91]/10 text-[#249C91] group-hover:bg-[#249C91] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                        <PlusCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#17243B] group-hover:text-[#249C91] transition-colors">
                          Add a Business
                        </div>
                        <div className="text-[11px] text-[#64748B] font-normal leading-tight mt-0.5">
                          List or claim your existing storefront
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/login"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      role="menuitem"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#17243B] group-hover:bg-[#17243B] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#17243B] group-hover:text-[#249C91] transition-colors">
                          Log In to Business Account
                        </div>
                        <div className="text-[11px] text-[#64748B] font-normal leading-tight mt-0.5">
                          Access your owner dashboard
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/owner/help"
                      onClick={() => setBusinessDropdownOpen(false)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                      role="menuitem"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#17243B] group-hover:text-[#249C91] transition-colors">
                          Explore Help for Business
                        </div>
                        <div className="text-[11px] text-[#64748B] font-normal leading-tight mt-0.5">
                          Verification guidelines &amp; support documentation
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. Rate & Reviews */}
              <Link
                href="/search?intent=review"
                className={`px-2 xl:px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isTransparentOverHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-50'
                }`}
                aria-label="Rate & Reviews"
              >
                <Star className="w-3.5 h-3.5 text-[#E66B45]" />
                <span>Rate &amp; Reviews</span>
              </Link>

              {/* 5. Deal Alerts */}
              <Link
                href="/search?deals=true"
                className={`px-2 xl:px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isTransparentOverHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-50'
                }`}
                aria-label="Explore Deal Alerts"
              >
                <Tag className="w-3.5 h-3.5 text-[#249C91]" />
                <span>Deal Alerts</span>
              </Link>

              {/* 6. Support */}
              <button
                type="button"
                onClick={handleSupportClick}
                className={`px-2 xl:px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isTransparentOverHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-50'
                }`}
                aria-label="Customer Support"
              >
                <Headset className="w-3.5 h-3.5 text-[#249C91]" />
                <span>Support</span>
              </button>

              {/* 7. Log In */}
              <Link
                href="/login"
                className={`px-2 xl:px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isTransparentOverHero
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-50'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Log In</span>
              </Link>

              {/* 8. Sign Up */}
              <Link
                href="/register"
                className="px-3 xl:px-3.5 py-2 rounded-xl font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] transition-all shadow-xs hover:shadow focus:ring-2 focus:ring-[#249C91]/50 flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </Link>
            </nav>

            {/* MOBILE HEADER SHORTCUTS (Support + Hamburger) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleSupportClick}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Customer Support"
              >
                <Headset className="w-5 h-5 text-[#249C91]" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className={`p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#249C91] ${
                  isTransparentOverHero
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#17243B] hover:bg-slate-100'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR */}
          <div className="block md:hidden pb-3">
            <SearchBar />
          </div>
        </div>

        {/* MOBILE DRAWER NAVIGATION */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-4 pb-8 space-y-4 shadow-2xl text-[#17243B] max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            {/* Primary Action Buttons */}
            <div className="space-y-1 pb-3 border-b border-[#E2E8F0]">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] shadow-xs"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-[#17243B] hover:bg-slate-200"
              >
                <LogIn className="w-4 h-4 text-[#64748B]" />
                <span>Log In</span>
              </Link>
            </div>

            {/* Quick Links in Required Order */}
            <div className="space-y-1 pb-3 border-b border-[#E2E8F0]">
              <Link
                href="/search?intent=review"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <Star className="w-4 h-4 text-[#E66B45]" />
                <span>Rate &amp; Reviews</span>
              </Link>

              <Link
                href="/search?deals=true"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <Tag className="w-4 h-4 text-[#249C91]" />
                <span>Deal Alerts</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSupportClick();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[#17243B] hover:bg-slate-50 text-left cursor-pointer"
              >
                <Headset className="w-4 h-4 text-[#249C91]" />
                <span>Support</span>
              </button>
            </div>

            {/* Pick Discount for Business Accordion */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Pick Discount for Business
              </div>
              <Link
                href="/owner/claim"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[#17243B] hover:bg-slate-50"
              >
                <ShieldCheck className="w-4 h-4 text-[#249C91]" />
                <span>Add a Business</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[#17243B] hover:bg-slate-50"
              >
                <Building2 className="w-4 h-4 text-[#64748B]" />
                <span>Log In to Business Account</span>
              </Link>
              <Link
                href="/owner/help"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[#17243B] hover:bg-slate-50"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Explore Help for Business</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* WhatsApp Support Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
};
