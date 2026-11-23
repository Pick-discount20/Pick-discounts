'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ArrowRight,
  Award,
  Store,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryCard } from '@/components/discovery/CategoryCard';
import { BusinessCard } from '@/components/discovery/BusinessCard';
import { DEMO_CATEGORIES, DEMO_BUSINESSES } from '@/data/mockData';

export default function HomePage() {
  // Featured verified businesses
  const featuredBusinesses = DEMO_BUSINESSES.filter((b) => b.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION WITH AUTOMATIC BACKGROUND IMAGE SLIDER
            ========================================================================= */}
        <HeroSlider />

        {/* =========================================================================
            2. TRUST METRICS STRIP (Directly Beneath Hero)
            ========================================================================= */}
        <section className="bg-white border-b border-slate-200/80 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="text-center py-2 px-3">
                <div className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">Physical Verification</div>
              </div>
              <div className="text-center py-2 px-3">
                <div className="text-2xl sm:text-3xl font-black text-[#2A9D8F] tracking-tight">4.8★</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">Average Rated Quality</div>
              </div>
              <div className="text-center py-2 px-3">
                <div className="text-2xl sm:text-3xl font-black text-[#F4A261] tracking-tight">1,200+</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">Local Businesses</div>
              </div>
              <div className="text-center py-2 px-3">
                <div className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight">Zero</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">Unmoderated Fake Reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CATEGORY DISCOVERY SECTION
            ========================================================================= */}
        <section id="categories" className="py-12 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
                Browse by Specialty
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight mt-1">
                Explore Business Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Curated services verified for quality workmanship, licensing, and consumer satisfaction.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] hover:text-[#21766C] transition-colors self-start sm:self-auto"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. FEATURED VERIFIED BUSINESSES (Curated Sample Cards)
            ========================================================================= */}
        <section className="py-12 sm:py-14 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Local Spotlight</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight mt-1">
                  Featured Verified Establishments
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Top-rated businesses with audited trade licenses and physical store verifications.
                </p>
              </div>

              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/80 text-[#14213D] transition-colors border border-slate-200 w-fit"
              >
                <span>Explore All Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {featuredBusinesses.map((biz) => (
                <BusinessCard key={biz.id} business={biz} layout="list" featuredHighlight={true} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. EXPLORE BUSINESSES BY BANGALORE LOCATION
            ========================================================================= */}
        <section className="py-12 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
              Hyperlocal Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight mt-1">
              Explore Bangalore By Locality
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Quickly find verified services right within your commercial neighbourhood.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Indiranagar', count: 184, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
              { name: 'Koramangala', count: 210, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
              { name: 'HSR Layout', count: 142, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
              { name: 'Jayanagar', count: 128, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80' },
              { name: 'Whitefield', count: 165, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80' },
              { name: 'Lavelle Road', count: 76, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80' },
            ].map((loc) => (
              <Link
                key={loc.name}
                href={`/search?location=${encodeURIComponent(loc.name)}`}
                className="group relative h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/90 via-[#14213D]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-sm font-bold tracking-tight">{loc.name}</h4>
                  <p className="text-[11px] text-[#F4A261] font-medium">{loc.count} businesses</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. WHY CHOOSE PEAK DISCOUNT? (Trust-First Pillars)
            ========================================================================= */}
        <section className="py-12 sm:py-14 bg-[#14213D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
                The Trust Standard
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                Why Peak Discount Is Different
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                We believe local discovery must prioritize verified legitimacy over paid ad rankings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/20 text-[#2A9D8F] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Rigorous Evidence Verification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike open directories where anyone can submit unverified entries, verified listings require trade licenses, lease deeds, or utility bill confirmation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#F4A261]/20 text-[#F4A261] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Moderated Customer Feedback</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every reported review undergoes administrative moderation. We eliminate smear campaigns, bot spam, and competitor sabotage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/20 text-[#2A9D8F] flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Direct Business Owner Ownership</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Business owners maintain their own high-resolution portfolios, service menus, operating hours, and official contact information directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CALL TO ACTION FOR BUSINESS OWNERS
            ========================================================================= */}
        <section className="py-12 sm:py-14 bg-[#F8F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#14213D] via-[#1E3159] to-[#14213D] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
              {/* Decorative accent element */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2A9D8F]/20 to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  <Store className="w-3.5 h-3.5" />
                  <span>Business Partner Program</span>
                </span>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Grow Your Local Presence with Verified Credibility.
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Claim your existing business listing or submit a new establishment to earn the Peak Discount Verified Badge. Showcase your genuine customer reviews and reach discerning local customers across Bangalore.
                </p>

                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <Link
                    href="/owner/claim"
                    className="inline-flex items-center gap-2 bg-[#2A9D8F] hover:bg-[#21766C] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claim Your Existing Listing</span>
                  </Link>

                  <Link
                    href="/owner/profile"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
                  >
                    <span>Submit New Business Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
