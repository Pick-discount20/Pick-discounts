'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, CheckCircle2, ArrowRight } from 'lucide-react';
import { RatingStars } from '@/components/common/RatingStars';

export interface RecentActivityItem {
  id: string;
  userName: string;
  userAvatar?: string;
  actionText: string;
  date: string;
  businessName: string;
  businessSlug: string;
  businessImage: string;
  businessCategory: string;
  businessLocality: string;
  rating: number;
  reviewTitle: string;
  reviewComment: string;
}

interface RecentActivityCardProps {
  activity: RecentActivityItem;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activity }) => {
  return (
    <article className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* =======================================================================
            1. USER HEADER (Avatar, User Name, Action & Time)
            ======================================================================= */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          {activity.userAvatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
              <Image
                src={activity.userAvatar}
                alt={activity.userName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-xs text-[#17243B] truncate">
                {activity.userName}
              </span>
              <span className="text-[11px] text-[#64748B]">
                {activity.actionText}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">{activity.date}</p>
          </div>
        </div>

        {/* =======================================================================
            2. BUSINESS PREVIEW (Thumbnail, Name, Category & Locality)
            ======================================================================= */}
        <div className="pt-3.5 flex items-start gap-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
            <Image
              src={activity.businessImage}
              alt={activity.businessName}
              fill
              sizes="60px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/business/${activity.businessSlug}`}
              className="font-bold text-sm text-[#17243B] hover:text-[#249C91] transition-colors line-clamp-1"
            >
              {activity.businessName}
            </Link>
            <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
              <span>{activity.businessCategory}</span>
              <span>•</span>
              <span className="font-medium">{activity.businessLocality}</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <RatingStars rating={activity.rating} size="sm" showScore={false} />
            </div>
          </div>
        </div>

        {/* =======================================================================
            3. REVIEW SNIPPET / QUOTE
            ======================================================================= */}
        <div className="mt-3.5 space-y-1">
          <h4 className="font-bold text-xs text-[#17243B] line-clamp-1">
            &ldquo;{activity.reviewTitle}&rdquo;
          </h4>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {activity.reviewComment}
          </p>
        </div>
      </div>

      {/* =======================================================================
          4. FOOTER: Verified Customer & Read More
          ======================================================================= */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 text-[#249C91] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Review</span>
        </span>

        <Link
          href={`/business/${activity.businessSlug}`}
          className="font-bold text-[#17243B] hover:text-[#249C91] inline-flex items-center gap-1 transition-colors"
        >
          <span>Read more</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
};
