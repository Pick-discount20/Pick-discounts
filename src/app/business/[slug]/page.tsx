'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { BusinessGallery } from '@/components/business/BusinessGallery';
import { BusinessHeader } from '@/components/business/BusinessHeader';
import { BusinessInfo } from '@/components/business/BusinessInfo';
import { ReviewCard } from '@/components/business/ReviewCard';
import { ReviewFormModal } from '@/components/business/ReviewFormModal';
import { ReportModal } from '@/components/business/ReportModal';
import { RatingStars } from '@/components/common/RatingStars';
import { DEMO_BUSINESSES, DEMO_REVIEWS } from '@/data/mockData';
import { Review } from '@/types';

export default function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  const business = DEMO_BUSINESSES.find((b) => b.slug === slug) || DEMO_BUSINESSES[0];

  // Reviews state
  const initialReviews = DEMO_REVIEWS[business.slug] || [
    {
      id: 'rev-default-1',
      businessId: business.slug,
      userName: 'Kavita Menon',
      rating: 5,
      date: '18 Nov 2026',
      title: 'Prompt service and transparent pricing',
      comment: 'Really glad I discovered this place on Peak Discount. Everything was handled professionally with complete adherence to scheduled timings.',
      helpfulCount: 6,
      verifiedCustomer: true,
      status: 'active' as const,
    },
    {
      id: 'rev-default-2',
      businessId: business.slug,
      userName: 'Aditya Prasad',
      rating: 4,
      date: '05 Nov 2026',
      title: 'Reliable experience overall',
      comment: 'Courteous staff and clean premises. Would definitely recommend to neighbors looking for genuine local providers in the area.',
      helpfulCount: 3,
      verifiedCustomer: true,
      status: 'active' as const,
    },
  ];

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReviewToReport, setSelectedReviewToReport] = useState<Review | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleNewReview = (newRev: {
    title: string;
    comment: string;
    rating: number;
    userName: string;
  }) => {
    const created: Review = {
      id: `rev-${Date.now()}`,
      businessId: business.slug,
      userName: newRev.userName,
      rating: newRev.rating,
      date: 'Today',
      title: newRev.title,
      comment: newRev.comment,
      helpfulCount: 0,
      verifiedCustomer: true,
      status: 'active',
    };
    setReviews([created, ...reviews]);
    showNotification('Thank you! Your customer review was submitted successfully.');
  };

  const handleReport = (review: Review) => {
    setSelectedReviewToReport(review);
    setReportModalOpen(true);
  };

  // Calculate rating breakdown distribution
  const totalReviewsCount = reviews.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const rounded = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
    if (ratingCounts[rounded] !== undefined) ratingCounts[rounded]++;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />
      <Navbar />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-24 right-5 z-50 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#14213D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/search" className="hover:text-[#14213D] transition-colors">
              {business.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate max-w-[200px]">
              {business.name}
            </span>
          </nav>

          <Link
            href="/search"
            className="inline-flex items-center gap-1 font-semibold text-[#2A9D8F] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Results</span>
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Photo Gallery Hero */}
        <BusinessGallery
          primaryImage={business.primaryImage}
          galleryImages={business.galleryImages}
          businessName={business.name}
        />

        {/* Business Header Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <BusinessHeader
            business={business}
            onWriteReview={() => setReviewModalOpen(true)}
            onShare={() => showNotification('Business profile link copied to clipboard')}
          />
        </div>

        {/* Main Content Grid: Business Info (left) + Sticky Contact / Claim (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): About, Services, Operating Hours, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <BusinessInfo business={business} />

            {/* Customer Reviews Section */}
            <section id="reviews" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#14213D]">
                    Customer Ratings & Reviews
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authentic customer experiences moderated by Peak Discount standards.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2A9D8F] text-white text-xs font-bold shadow-xs hover:bg-[#21766C] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Rating Distribution Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 items-center">
                {/* Average Score */}
                <div className="sm:col-span-5 text-center sm:text-left space-y-1">
                  <div className="text-4xl font-extrabold text-[#14213D]">
                    {business.rating.toFixed(1)}
                  </div>
                  <RatingStars rating={business.rating} size="lg" />
                  <p className="text-xs text-slate-500 font-medium">
                    Based on {business.reviewCount} customer evaluations
                  </p>
                </div>

                {/* Star Breakdown Bars */}
                <div className="sm:col-span-7 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingCounts[stars as 1 | 2 | 3 | 4 | 5] || 0;
                    const pct = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;

                    return (
                      <div key={stars} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-12 font-medium shrink-0">{stars} Stars</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F4A261] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-slate-400 text-[11px] font-semibold">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Review Cards */}
              <div className="space-y-4 pt-2">
                {reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} onReport={handleReport} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (1 Col): Sticky Business Overview Card & Claim Callout */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Quick Contact & Directions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#14213D] uppercase tracking-wider">
                Direct Contact
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-[#2A9D8F]/10 hover:text-[#2A9D8F] transition-colors border border-slate-100"
                >
                  <Phone className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span className="font-semibold">{business.phone}</span>
                </a>

                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 truncate"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium truncate">{business.email}</span>
                </a>

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
                  >
                    <Globe className="w-4 h-4 text-[#F4A261] shrink-0" />
                    <span className="font-medium truncate">Visit Official Website</span>
                  </a>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-[#F4A261] shrink-0 mt-0.5" />
                  <span>
                    {business.address}, {business.locality}, {business.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Is this your business? Claim Card */}
            <div className="bg-gradient-to-br from-[#14213D] to-[#1E3159] text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#2A9D8F]/20 text-[#2A9D8F] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Own or Manage this Business?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Claim this profile to verify your credentials, respond to reviews, update business hours, and manage photo galleries.
              </p>
              <Link
                href={`/owner/claim?businessId=${encodeURIComponent(business.id)}`}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#2A9D8F] hover:bg-[#21766C] text-white transition-colors shadow-xs"
              >
                Claim This Business Listing
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Review and Report Modals */}
      <ReviewFormModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        businessName={business.name}
        onSubmitSuccess={handleNewReview}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetReview={selectedReviewToReport}
        businessName={business.name}
      />

      <Footer />
    </div>
  );
}
