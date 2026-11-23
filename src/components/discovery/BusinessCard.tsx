import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Business } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';
import { VerificationBadge } from '@/components/common/VerificationBadge';
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

  return (
    <article
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        featuredHighlight
          ? 'border-[#2A9D8F]/40 shadow-md hover:shadow-xl ring-1 ring-[#2A9D8F]/20'
          : 'border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300'
      } ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
    >
      {/* Thumbnail Area */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isList
            ? 'w-full sm:w-64 md:w-72 h-52 sm:h-auto shrink-0'
            : 'w-full h-48 shrink-0'
        }`}
      >
        <Image
          src={business.primaryImage}
          alt={business.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 350px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#14213D] px-2.5 py-1 rounded-full shadow-xs">
            {business.subcategory}
          </span>
          <VerificationBadge status={business.verificationStatus} size="sm" showLabel={false} />
        </div>

        {/* Bottom Distance pill */}
        <div className="absolute bottom-3 left-3 bg-[#14213D]/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
          <MapPin className="w-3 h-3 text-[#F4A261]" />
          <span>{business.distanceKm} km away</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Category, Verification & Price */}
          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#2A9D8F] uppercase tracking-wider">
                {business.category}
              </span>
              <span className="text-slate-300">•</span>
              <PriceIndicator price={business.priceRange} />
            </div>

            <VerificationBadge status={business.verificationStatus} size="sm" />
          </div>

          {/* Business Name Link */}
          <h3 className="text-lg font-bold text-[#14213D] group-hover:text-[#2A9D8F] transition-colors leading-snug">
            <Link href={`/business/${business.slug}`} className="focus:outline-none focus:underline">
              {business.name}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
            {business.tagline}
          </p>

          {/* Rating and Reviews */}
          <div className="mt-2.5 flex items-center gap-3">
            <RatingStars
              rating={business.rating}
              showScore={true}
              reviewCount={business.reviewCount}
              size="sm"
            />
          </div>

          {/* Locality & Address */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-800">{business.locality}</span>
            <span className="text-slate-400">— {business.address}</span>
          </div>

          {/* Amenities / Top Services Pills */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {business.services.slice(0, 2).map((srv, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200/60"
              >
                {srv}
              </span>
            ))}
            {business.services.length > 2 && (
              <span className="text-[10px] text-slate-400 font-medium">
                +{business.services.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Footer actions & Open Status */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className={`w-3.5 h-3.5 ${business.isOpenNow ? 'text-[#2A9D8F]' : 'text-slate-400'}`} />
            <span className={`font-semibold ${business.isOpenNow ? 'text-[#2A9D8F]' : 'text-slate-500'}`}>
              {business.isOpenNow ? 'Open Now' : 'Closed Now'}
            </span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              • Closes {business.hours[0]?.close || 'Evening'}
            </span>
          </div>

          <Link
            href={`/business/${business.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14213D] group-hover:text-[#2A9D8F] bg-slate-50 group-hover:bg-[#2A9D8F]/10 px-3.5 py-1.5 rounded-lg transition-colors border border-slate-200 group-hover:border-[#2A9D8F]/30"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
