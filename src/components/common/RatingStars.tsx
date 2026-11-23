'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 'md',
  showScore = false,
  reviewCount,
  interactive = false,
  onRatingChange,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(rating);
          const isHalf = !isFilled && starValue - 0.5 <= rating;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange?.(starValue)}
              aria-label={`Rate ${starValue} stars`}
              className={`${
                interactive
                  ? 'cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/40 rounded'
                  : 'cursor-default'
              }`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-[#F4A261] text-[#F4A261]'
                    : isHalf
                    ? 'fill-[#F4A261]/50 text-[#F4A261]'
                    : 'fill-slate-100 text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className={`font-semibold text-[#14213D] ${textClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={`text-slate-500 font-normal ${textClasses[size]}`}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};
