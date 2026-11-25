'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  ArrowRight,
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  LucideIcon,
  ShieldCheck,
} from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { SupportModal } from '@/components/layout/SupportModal';
import { getWhatsAppSupportUrl } from '@/config/support';
import { CATEGORY_NAVIGATION_DATA } from '@/config/categories';

// Icon map for approved categories
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
  const router = useRouter();

  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setBusinessDropdownOpen(false);
        setActiveCategoryDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBusinessDropdownOpen(false);
        setActiveCategoryDropdown(null);
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
    setActiveCategoryDropdown(null);
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

  // Toggle category dropdown on click (does NOT navigate immediately)
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryDropdown((prev) => (prev === categoryId ? null : categoryId));
    setBusinessDropdownOpen(false);
  };

  // Select subcategory and navigate to search
  const handleSubcategorySelect = (categoryName: string, subcategoryName: string) => {
    setActiveCategoryDropdown(null);
    router.push(`/search?category=${encodeURIComponent(categoryName)}&q=${encodeURIComponent(subcategoryName)}`);
  };

  // Restrained, lightweight glassmorphism header styling
  const headerClass = isHome
    ? scrolled
      ? 'fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] text-[#17243B] shadow-xs transition-all duration-200'
      : 'absolute top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-white/40 text-[#17243B] shadow-xs transition-all duration-200'
    : 'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] text-[#17243B] shadow-xs transition-all duration-200';

  return (
    <>
      <header className={headerClass} ref={navContainerRef}>
        {/* =======================================================================
            1. PRIMARY MAIN HEADER ROW (Yelp Architecture & Glassmorphism)
            Order: LEFT: Wordmark | CENTRE: Search Bar | RIGHT: Actions
            ======================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 xl:h-[68px] gap-2 lg:gap-4 xl:gap-6">
            
            {/* LEFT: PICK DISCOUNT WORDMARK (Compact, clean font-sans) */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#249C91] rounded-lg py-1 pr-2"
                aria-label="Pick Discount Homepage"
              >
                <span className="text-xl sm:text-2xl font-black tracking-tight font-sans transition-colors">
                  <span className="text-[#17243B]">PICK</span>
                  <span className="text-[#249C91] ml-1">DISCOUNT</span>
                </span>
              </Link>
            </div>

            {/* CENTRE: UNIFIED SEARCH BAR (What, Where, 5km, Search) */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-2 xl:mx-4 min-w-0">
              <SearchBar compact={false} />
            </div>

            {/* RIGHT: ACTIONS & NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 text-xs font-semibold whitespace-nowrap">
              
              {/* Option 1: Pick Discount for Business (Dropdown) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setBusinessDropdownOpen(!businessDropdownOpen);
                    setActiveCategoryDropdown(null);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    businessDropdownOpen
                      ? 'bg-slate-100 text-[#17243B]'
                      : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={businessDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Pick Discount for Business Menu"
                >
                  <span>Pick Discount for Business</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${businessDropdownOpen ? 'rotate-180 text-[#249C91]' : 'text-[#64748B]'}`} />
                </button>

                {/* Pick Discount for Business Dropdown Panel */}
                {businessDropdownOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] right-0 w-64 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 text-[#17243B] animate-in fade-in zoom-in-95 duration-150"
                    role="menu"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] mb-1">
                      Business Solutions
                    </div>

                    {/* 1. Add a Business */}
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
                          List or claim your existing commercial storefront
                        </div>
                      </div>
                    </Link>

                    {/* 2. Log In to Business Account */}
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
                          Access your owner dashboard and customer inquiries
                        </div>
                      </div>
                    </Link>

                    {/* 3. Explore Help for Business */}
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
                          Verification guidelines, FAQ &amp; support documentation
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Option 2: Write a Review */}
              <Link
                href="/search?intent=review"
                className="px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-[#17243B] hover:text-[#249C91] hover:bg-slate-100/70"
                aria-label="Write a Customer Review"
              >
                <Star className="w-3.5 h-3.5 text-[#E66B45]" />
                <span>Write a Review</span>
              </Link>

              {/* Option 3: Log In */}
              <Link
                href="/login"
                className="px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-[#17243B] hover:text-[#249C91] hover:bg-slate-100/70"
              >
                <LogIn className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Log In</span>
              </Link>

              {/* Option 4: Sign Up */}
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-lg font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] transition-all shadow-xs hover:shadow focus:ring-2 focus:ring-[#249C91]/50 flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </Link>

              {/* Option 5: Support (WhatsApp Channel) */}
              <button
                type="button"
                onClick={handleSupportClick}
                className="px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-[#17243B] hover:text-[#249C91] hover:bg-slate-100/70 ml-0.5"
                aria-label="Contact Customer Support on WhatsApp"
              >
                <div className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-2.5 h-2.5 fill-white" />
                </div>
                <span>Support</span>
              </button>
            </nav>

            {/* MOBILE HEADER SHORTCUTS (WhatsApp + Hamburger) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleSupportClick}
                className="p-2 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-colors cursor-pointer"
                aria-label="Support on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 rounded-xl text-[#17243B] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#249C91]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE PROMINENT SEARCH BAR (Stacked neatly below header) */}
          <div className="block lg:hidden pb-3">
            <SearchBar compact={true} />
          </div>
        </div>

        {/* =======================================================================
            2. SECONDARY CATEGORY NAVIGATION ROW (Lightweight Glassmorphism)
            Clicking a category opens its corresponding subcategory menu.
            ======================================================================= */}
        <div
          className={`border-t transition-colors relative ${
            isHome && !scrolled
              ? 'border-white/35 bg-white/75 backdrop-blur-md text-[#17243B] shadow-2xs'
              : 'border-[#E2E8F0] bg-white/90 backdrop-blur-md text-[#17243B] shadow-2xs'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 text-xs font-semibold whitespace-nowrap">
              {CATEGORY_NAVIGATION_DATA.map((cat, idx) => {
                const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || UtensilsCrossed;
                const isDropdownOpen = activeCategoryDropdown === cat.id;
                // Align rightmost category dropdowns toward left to avoid viewport overflow
                const alignRight = idx >= 5;

                return (
                  <div key={cat.id} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        isDropdownOpen
                          ? 'bg-[#249C91] text-white shadow-xs font-bold'
                          : 'text-[#17243B] hover:text-[#249C91] hover:bg-slate-100/70'
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <IconComponent
                        className={`w-3.5 h-3.5 ${
                          isDropdownOpen
                            ? 'text-white'
                            : 'text-[#249C91]'
                        }`}
                      />
                      <span>{cat.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-white' : 'text-[#64748B]'
                        }`}
                      />
                    </button>

                    {/* Desktop Subcategories Dropdown Panel */}
                    {isDropdownOpen && (
                      <div
                        className={`absolute top-[calc(100%+8px)] ${
                          alignRight ? 'right-0' : 'left-0'
                        } ${
                          cat.id === 'restaurants-cafes' ? 'w-80 sm:w-96' : 'w-72'
                        } bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-3 z-50 text-[#17243B] animate-in fade-in zoom-in-95 duration-150`}
                        role="menu"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] mb-2 px-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            {cat.name} Categories
                          </span>
                          <span className="text-[10px] text-[#249C91] font-semibold">
                            {cat.subcategories.length} Options
                          </span>
                        </div>

                        {/* Subcategory Items */}
                        <div
                          className={`grid ${
                            cat.id === 'restaurants-cafes' ? 'grid-cols-2 gap-1' : 'grid-cols-1 gap-0.5'
                          } max-h-72 overflow-y-auto no-scrollbar`}
                        >
                          {cat.subcategories.map((subcat) => (
                            <button
                              key={subcat}
                              type="button"
                              onClick={() => handleSubcategorySelect(cat.name, subcat)}
                              className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17243B] hover:bg-[#F8FAFC] hover:text-[#249C91] transition-colors cursor-pointer flex items-center justify-between group"
                              role="menuitem"
                            >
                              <span>{subcat}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#249C91] transition-opacity" />
                            </button>
                          ))}
                        </div>

                        {/* Footer: View All in Category */}
                        <div className="pt-2 mt-2 border-t border-[#E2E8F0] px-1">
                          <Link
                            href={`/search?category=${encodeURIComponent(cat.name)}`}
                            onClick={() => setActiveCategoryDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#249C91] hover:text-[#1f7e75] transition-colors"
                          >
                            <span>Explore all in {cat.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE DRAWER NAVIGATION (Accessible & Comprehensive)
            ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-4 pb-8 space-y-4 shadow-xl text-[#17243B] max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            {/* Primary Action Buttons */}
            <div className="space-y-1 pb-3 border-b border-[#E2E8F0]">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-[#249C91] text-white hover:bg-[#1f7e75] shadow-xs"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-[#17243B] hover:bg-slate-200"
              >
                <LogIn className="w-4 h-4 text-[#64748B]" />
                <span>Log In</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="space-y-1 pb-3 border-b border-[#E2E8F0]">
              <Link
                href="/search?intent=review"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#17243B] hover:bg-slate-50"
              >
                <Star className="w-4 h-4 text-[#E66B45]" />
                <span>Write a Review</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSupportClick();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#17243B] hover:bg-slate-50 text-left cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-3 h-3 fill-white" />
                </div>
                <span>WhatsApp Customer Support</span>
              </button>
            </div>

            {/* Pick Discount for Business Accordion */}
            <div className="space-y-1 pb-3 border-b border-[#E2E8F0]">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Pick Discount for Business
              </div>
              <Link
                href="/owner/claim"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <ShieldCheck className="w-4 h-4 text-[#249C91]" />
                <span>Add / Claim a Business</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <Building2 className="w-4 h-4 text-[#64748B]" />
                <span>Business Account Login</span>
              </Link>
              <Link
                href="/owner/help"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#17243B] hover:bg-slate-50"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Explore Help for Business</span>
              </Link>
            </div>

            {/* Categories & Subcategories Accordion */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Browse Categories
              </div>

              {CATEGORY_NAVIGATION_DATA.map((cat) => {
                const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || UtensilsCrossed;
                const isExpanded = mobileExpandedCategory === cat.id;

                return (
                  <div key={cat.id} className="rounded-xl border border-slate-100 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMobileExpandedCategory(isExpanded ? null : cat.id)}
                      className="w-full flex items-center justify-between p-2.5 text-xs font-bold text-[#17243B] bg-slate-50/70 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-[#249C91]" />
                        <span>{cat.name}</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#249C91]' : 'text-slate-400'}`} />
                    </button>

                    {isExpanded && (
                      <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                        {cat.subcategories.map((subcat) => (
                          <button
                            key={subcat}
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              handleSubcategorySelect(cat.name, subcat);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 hover:text-[#249C91] transition-colors"
                          >
                            {subcat}
                          </button>
                        ))}
                        <div className="pt-1.5 border-t border-slate-100">
                          <Link
                            href={`/search?category=${encodeURIComponent(cat.name)}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#249C91] px-3 py-1"
                          >
                            <span>Explore all in {cat.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* WhatsApp Support Onboarding / Connection Status Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
};
