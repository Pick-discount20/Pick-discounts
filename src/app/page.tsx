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
  MessageSquare,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryCard } from '@/components/discovery/CategoryCard';
import { BusinessCard } from '@/components/discovery/BusinessCard';
import { RecentActivityCard, RecentActivityItem } from '@/components/discovery/RecentActivityCard';
import { DEMO_CATEGORIES, DEMO_BUSINESSES } from '@/data/mockData';

// Yelp-inspired Recent Activity verified customer feed
const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-001',
    userName: 'Kavita Menon',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    actionText: 'wrote a review',
    date: '18 Nov 2026',
    businessName: 'Brew & Botanica Specialty Coffee',
    businessSlug: 'brew-and-botanica',
    businessImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
    businessCategory: 'Restaurants & Cafes',
    businessLocality: 'Indiranagar',
    rating: 5,
    reviewTitle: 'Prompt service and transparent pricing',
    reviewComment: 'Really glad I discovered this place on Pick Discount. The pour-over coffee was roasted to perfection and handled with complete adherence to scheduled timings.',
  },
  {
    id: 'act-002',
    userName: 'Dr. Aditya Prasad',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    actionText: 'wrote a review',
    date: '15 Nov 2026',
    businessName: 'Apex Dental Studio & Implant Centre',
    businessSlug: 'apex-dental-studio',
    businessImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    businessCategory: 'Healthcare & Clinics',
    businessLocality: 'Jayanagar',
    rating: 5,
    reviewTitle: 'State-of-the-art sterile clinic',
    reviewComment: 'Gentle restorative dental treatment with modern 3D CBCT imaging. Courteous staff and genuinely clean operatory rooms. Strongly recommend!',
  },
  {
    id: 'act-003',
    userName: 'Sneha Kulkarni',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    actionText: 'reviewed a verified service',
    date: '12 Nov 2026',
    businessName: 'Aura Organic Hair & Wellness Studio',
    businessSlug: 'aura-botanical-salon',
    businessImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    businessCategory: 'Beauty & Wellness',
    businessLocality: 'Koramangala',
    rating: 5,
    reviewTitle: 'Botanical and completely chemical-free',
    reviewComment: 'Calm sanctuary in Koramangala. The scalp detox ritual used pure organic herbs with no ammonia smells. Exceptional care from start to finish.',
  },
];

export default function HomePage() {
  // Featured verified businesses
  const featuredBusinesses = DEMO_BUSINESSES.filter((b) => b.featured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative">
      <DemoDisclaimer />
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION WITH PHOTOGRAPHIC SLIDER & UNIFIED SEARCH IN NAVBAR
            ========================================================================= */}
        <HeroSlider />

        {/* =========================================================================
            2. CATEGORY DISCOVERY SECTION
            ========================================================================= */}
        <section id="categories" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#249C91] uppercase tracking-wider">
                Browse by Specialty
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] tracking-tight mt-1">
                Explore Business Categories
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl">
                Curated services verified for quality workmanship, licensing, and consumer satisfaction.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#249C91] hover:text-[#1f7e75] transition-colors self-start sm:self-auto"
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
        <section className="py-12 sm:py-16 bg-white border-y border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E66B45] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Local Spotlight</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] tracking-tight mt-1">
                  Featured Verified Establishments
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Top-rated businesses with audited trade licenses and physical store verifications.
                </p>
              </div>

              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-[#17243B] transition-colors border border-[#E2E8F0] w-fit"
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
            5. RECENT COMMUNITY ACTIVITY (Yelp-Inspired Recent Activity Feed)
            ========================================================================= */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#249C91] uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Community Trust</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] tracking-tight mt-1">
                Recent Activity &amp; Verified Reviews
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl">
                Real experiences shared by verified local customers across Bangalore.
              </p>
            </div>

            <Link
              href="/search?intent=review"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E66B45] hover:text-[#d85d37] transition-colors self-start sm:self-auto"
            >
              <span>Write a review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_ACTIVITIES.map((act) => (
              <RecentActivityCard key={act.id} activity={act} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. EXPLORE BUSINESSES BY POPULAR LOCALITY
            ========================================================================= */}
        <section className="py-12 sm:py-16 bg-white border-y border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-[#249C91] uppercase tracking-wider">
                Hyperlocal Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] tracking-tight mt-1">
                Explore Popular Commercial Corridors
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Quickly find verified services right within your commercial neighbourhood.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Satellite', count: 195, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
                { name: 'Vastrapur', count: 148, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
                { name: 'SG Highway', count: 215, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
                { name: 'Indiranagar', count: 184, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80' },
                { name: 'Koramangala', count: 210, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80' },
                { name: 'Whitefield', count: 165, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80' },
              ].map((loc) => (
                <Link
                  key={loc.name}
                  href={`/search?location=${encodeURIComponent(loc.name)}`}
                  className="group relative h-36 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all"
                >
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17243B]/90 via-[#17243B]/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-sm font-bold tracking-tight">{loc.name}</h4>
                    <p className="text-[11px] text-[#E66B45] font-medium">{loc.count} businesses</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. WHY CHOOSE PICK DISCOUNT? (Trust-First Pillars)
            ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#17243B] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#249C91] uppercase tracking-wider">
                The Trust Standard
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                Why Pick Discount Is Different
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                We believe local discovery must prioritize verified legitimacy over paid ad rankings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#249C91]/20 text-[#249C91] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Rigorous Evidence Verification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike open directories where anyone can submit unverified entries, verified listings require trade licenses, lease deeds, or utility bill confirmation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#E66B45]/20 text-[#E66B45] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Moderated Customer Feedback</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every reported review undergoes administrative moderation. We eliminate smear campaigns, bot spam, and competitor sabotage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#249C91]/20 text-[#249C91] flex items-center justify-center">
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
            8. CALL TO ACTION FOR BUSINESS OWNERS
            ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#17243B] via-[#1E293B] to-[#17243B] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#249C91]/20 to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E66B45] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  <Store className="w-3.5 h-3.5" />
                  <span>Business Partner Program</span>
                </span>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Grow Your Local Presence with Verified Credibility.
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Claim your existing business listing or submit a new establishment to earn the Pick Discount Verified Badge. Showcase your genuine customer reviews and reach discerning local customers.
                </p>

                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <Link
                    href="/owner/claim"
                    className="inline-flex items-center gap-2 bg-[#249C91] hover:bg-[#1f7e75] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg"
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
