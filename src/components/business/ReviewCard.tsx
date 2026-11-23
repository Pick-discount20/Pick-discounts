'use client';

import React from 'react';
import Image from 'next/image';
import { Flag, CheckCircle, User } from 'lucide-react';
import { Review } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';

interface ReviewCardProps {
  review: Review;
  onReport: (review: Review) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReport }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs transition-shadow hover:shadow-sm">
      {/* Reviewer Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {review.userAvatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
              <Image
                src={review.userAvatar}
                alt={review.userName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#14213D]">{review.userName}</h4>
              {review.verifiedCustomer && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-[#2A9D8F]" />
                  Verified Customer
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{review.date}</p>
          </div>
        </div>

        {/* Rating Stars */}
        <RatingStars rating={review.rating} size="sm" showScore={true} />
      </div>

      {/* Review Content */}
      <div className="mt-3.5 space-y-1.5">
        <h5 className="font-bold text-sm text-[#14213D]">{review.title}</h5>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {review.comment}
        </p>
      </div>

      {/* Action Bar: Report Inappropriate Content */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end text-xs text-slate-500">
        <button
          type="button"
          onClick={() => onReport(review)}
          className="hover:text-rose-600 inline-flex items-center gap-1.5 transition-colors font-medium text-slate-500 hover:text-rose-600"
          aria-label="Report inappropriate review"
        >
          <Flag className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500" />
          <span>Report Content</span>
        </button>
      </div>
    </article>
  );
};
