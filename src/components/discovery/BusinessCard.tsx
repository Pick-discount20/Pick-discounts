'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Business } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';
import { PriceIndicator } from '@/components/common/PriceIndicator';

interface BusinessCardProps {
  business: Business;
  layout?: 'grid' | 'list';
  featuredHighlight?: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  layout = 'list',
  featuredHighlight = false,
}) => {
  const isList = layout === 'list';
  const [imgSrc, setImgSrc] = useState(business.primaryImage);

  return (
    <article
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        featuredHighlight
          ? 'border-[#249C91]/40 shadow-xs hover:shadow-md hover:border-[#249C91]'
          : 'border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-slate-300'
      } ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
    >
      {/* =======================================================================
          1. CARD IMAGE / THUMBNAIL (Consistent Aspect Ratio & Graceful Fallback)
          ======================================================================= */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isList
            ? 'w-full sm:w-64 md:w-72 lg:w-80 h-52 sm:h-auto min-h-[200px] shrink-0'
            : 'w-full h-48 sm:h-52 shrink-0'
        }`}
      >
        <Image
          src={imgSrc}
          alt={business.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 360px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => {
            // Graceful fallback to verified business placeholder
            setImgSrc('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80');
          }}
        />

        {/* Top Badges: Subcategory & Verification status */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
          <span className="bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#17243B] px-2.5 py-1 rounded-full shadow-xs border border-slate-200/60 truncate max-w-[170px]">
            {business.subcategory}
          </span>
          {business.verificationStatus === 'verified' && (
            <span className="bg-[#249C91] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Bottom Distance Pill */}
        <div className="absolute bottom-3 left-3 bg-[#17243B]/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
          <MapPin className="w-3 h-3 text-[#E66B45]" />
          <span>{business.distanceKm} km away</span>
        </div>
      </div>

      {/* =======================================================================
          2. CARD CONTENT AREA (Yelp-Inspired Visual Hierarchy)
          ======================================================================= */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          
          {/* Header Row: Category, Verification & Price Indicator */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#249C91] uppercase tracking-wider text-[11px]">
                {business.category}
              </span>
              <span className="text-slate-300">•</span>
              <PriceIndicator price={business.priceRange} />
            </div>

            {business.establishedYear && (
              <span className="text-[11px] text-[#64748B] font-medium">
                Est. {business.establishedYear}
              </span>
            )}
          </div>

          {/* 1. Business Name */}
          <h3 className="text-lg sm:text-xl font-bold text-[#17243B] group-hover:text-[#249C91] transition-colors leading-snug">
            <Link href={`/business/${business.slug}`} className="focus:outline-none focus:underline">
              {business.name}
            </Link>
          </h3>

          {/* 2. Rating & Review Count (Yelp-Inspired Clear Presentation) */}
          <div className="flex items-center gap-2 text-xs">
            <RatingStars
              rating={business.rating}
              showScore={true}
              reviewCount={business.reviewCount}
              size="sm"
            />
          </div>

          {/* 3. Short Business Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {business.description || business.tagline}
          </p>

          {/* 4. Locality & Address */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-bold text-[#17243B]">{business.locality}</span>
            <span className="text-slate-400 truncate">— {business.address}</span>
          </div>

          {/* 5. Relevant Business Attributes / Amenities */}
          {business.services && business.services.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {business.services.slice(0, 3).map((srv, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-[#E2E8F0]"
                >
                  {srv}
                </span>
              ))}
              {business.services.length > 3 && (
                <span className="text-[10px] text-slate-400 font-medium">
                  +{business.services.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* =====================================================================
            3. CARD FOOTER: Operating Hours & View Details Action
            ===================================================================== */}
        <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className={`w-3.5 h-3.5 ${business.isOpenNow ? 'text-[#249C91]' : 'text-slate-400'}`} />
            <span className={`font-semibold ${business.isOpenNow ? 'text-[#249C91]' : 'text-slate-500'}`}>
              {business.isOpenNow ? 'Open Now' : 'Closed Now'}
            </span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              • Closes {business.hours[0]?.close || 'Evening'}
            </span>
          </div>

          <Link
            href={`/business/${business.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17243B] group-hover:text-[#249C91] bg-slate-50 group-hover:bg-[#249C91]/10 px-3.5 py-1.5 rounded-lg transition-colors border border-slate-200 group-hover:border-[#249C91]/30"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
