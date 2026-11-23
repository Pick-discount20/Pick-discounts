'use client';

import React from 'react';
import { Phone, Globe, MapPin, MessageSquarePlus, Share2 } from 'lucide-react';
import { Business } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { PriceIndicator } from '@/components/common/PriceIndicator';

interface BusinessHeaderProps {
  business: Business;
  onWriteReview: () => void;
  onShare: () => void;
}

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({
  business,
  onWriteReview,
  onShare,
}) => {
  return (
    <div className="space-y-4">
      {/* Category, Verification & Price Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-[#2A9D8F] uppercase tracking-wider">{business.category}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">{business.subcategory}</span>
          <span className="text-slate-300">•</span>
          <PriceIndicator price={business.priceRange} />
        </div>

        <VerificationBadge status={business.verificationStatus} size="md" />
      </div>

      {/* Main Business Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14213D] tracking-tight leading-tight">
          {business.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-normal max-w-3xl leading-relaxed">
          {business.tagline}
        </p>
      </div>

      {/* Rating, Reviews & Open Indicator */}
      <div className="flex items-center gap-4 flex-wrap pt-1 text-sm">
        <div className="flex items-center gap-2">
          <RatingStars
            rating={business.rating}
            showScore={true}
            reviewCount={business.reviewCount}
            size="md"
          />
        </div>

        <span className="text-slate-300">•</span>

        <div className="flex items-center gap-1.5 font-medium">
          <span
            className={`w-2 h-2 rounded-full ${
              business.isOpenNow ? 'bg-[#2A9D8F]' : 'bg-slate-400'
            }`}
          />
          <span className={business.isOpenNow ? 'text-[#2A9D8F] font-bold' : 'text-slate-500'}>
            {business.isOpenNow ? 'Open Now' : 'Closed'}
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">
            (Hours: {business.hours[0]?.open || '09:00 AM'} - {business.hours[0]?.close || '09:00 PM'})
          </span>
        </div>

        <span className="text-slate-300 hidden sm:inline">•</span>

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-[#F4A261]" />
          <span>{business.locality}, Bangalore</span>
        </div>
      </div>

      {/* Contact & Primary Action Buttons */}
      <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={onWriteReview}
          className="inline-flex items-center gap-2 bg-[#2A9D8F] hover:bg-[#21766C] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all hover:shadow"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>

        <a
          href={`tel:${business.phone}`}
          className="inline-flex items-center gap-2 bg-[#14213D] hover:bg-[#1E3159] text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
        >
          <Phone className="w-4 h-4 text-[#F4A261]" />
          <span>Call Business</span>
        </a>

        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#14213D] border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
          >
            <Globe className="w-4 h-4 text-[#2A9D8F]" />
            <span>Visit Website</span>
          </a>
        )}

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
          title="Share profile"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
};
