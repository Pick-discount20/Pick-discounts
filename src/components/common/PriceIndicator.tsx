import React from 'react';
import { PriceRange } from '@/types';

interface PriceIndicatorProps {
  price: PriceRange;
  className?: string;
}

export const PriceIndicator: React.FC<PriceIndicatorProps> = ({ price, className = '' }) => {
  const allLevels: PriceRange[] = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];
  const currentIndex = allLevels.indexOf(price);

  const labels: Record<PriceRange, string> = {
    '₹': 'Budget-friendly',
    '₹₹': 'Moderate pricing',
    '₹₹₹': 'Upscale / Premium',
    '₹₹₹₹': 'Luxury / Fine dining',
  };

  return (
    <span
      title={labels[price] || 'Price indication'}
      className={`font-semibold tracking-tight text-xs ${className}`}
    >
      <span className="text-[#14213D]">{price}</span>
      <span className="text-slate-300">
        {'₹'.repeat(Math.max(0, 4 - (currentIndex + 1)))}
      </span>
    </span>
  );
};
