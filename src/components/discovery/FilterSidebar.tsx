'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Star, ShieldCheck } from 'lucide-react';
import { DEMO_CATEGORIES } from '@/data/mockData';
import { PriceRange } from '@/types';

export interface FilterState {
  categories: string[];
  minRating: number;
  prices: PriceRange[];
  maxDistance: number; // in km (e.g. 2, 5, 10, 20)
  openNowOnly: boolean;
  verifiedOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalMatches,
  className = '',
}) => {
  const handleCategoryToggle = (categoryName: string) => {
    const exists = filters.categories.includes(categoryName);
    const updated = exists
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];
    onChange({ ...filters, categories: updated });
  };

  const handlePriceToggle = (price: PriceRange) => {
    const exists = filters.prices.includes(price);
    const updated = exists
      ? filters.prices.filter((p) => p !== price)
      : [...filters.prices, price];
    onChange({ ...filters, prices: updated });
  };

  return (
    <aside
      aria-label="Search discovery filters"
      className={`bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-6 ${className}`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2A9D8F]" />
          <h3 className="font-bold text-sm text-[#14213D]">Filters</h3>
          <span className="text-xs bg-[#2A9D8F]/10 text-[#2A9D8F] font-semibold px-2 py-0.5 rounded-full">
            {totalMatches} results
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-[#14213D] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Trust & Verification quick switch */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
            <span className="text-xs font-semibold text-slate-700 group-hover:text-[#14213D]">
              Verified Businesses Only
            </span>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#2A9D8F] focus:ring-[#2A9D8F] border-slate-300 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-semibold text-slate-700 group-hover:text-[#14213D]">
            Open Now
          </span>
          <input
            type="checkbox"
            checked={filters.openNowOnly}
            onChange={(e) => onChange({ ...filters, openNowOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#2A9D8F] focus:ring-[#2A9D8F] border-slate-300 cursor-pointer"
          />
        </label>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100">
        <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {DEMO_CATEGORIES.map((cat) => {
            const isChecked = filters.categories.includes(cat.name);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1 group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat.name)}
                    className="w-3.5 h-3.5 rounded text-[#2A9D8F] focus:ring-[#2A9D8F] border-slate-300"
                  />
                  <span className={isChecked ? 'font-semibold text-[#14213D]' : ''}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">({cat.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100">
        <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[
            { label: 'Any rating', val: 0 },
            { label: '4.5 & above', val: 4.5 },
            { label: '4.0 & above', val: 4.0 },
            { label: '3.5 & above', val: 3.5 },
          ].map((tier) => (
            <button
              key={tier.val}
              type="button"
              onClick={() => onChange({ ...filters, minRating: tier.val })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                filters.minRating === tier.val
                  ? 'bg-[#2A9D8F]/10 text-[#2A9D8F] font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {tier.val > 0 && <Star className="w-3.5 h-3.5 fill-[#F4A261] text-[#F4A261]" />}
                <span>{tier.label}</span>
              </div>
              {filters.minRating === tier.val && <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100">
        <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
          Price Range
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {(['₹', '₹₹', '₹₹₹', '₹₹₹₹'] as PriceRange[]).map((price) => {
            const isSelected = filters.prices.includes(price);
            return (
              <button
                key={price}
                type="button"
                onClick={() => handlePriceToggle(price)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-[#14213D] text-white border-[#14213D] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {price}
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Distance */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Distance Radius
          </h4>
          <span className="text-xs font-bold text-[#2A9D8F]">
            {filters.maxDistance >= 20 ? 'All areas' : `Within ${filters.maxDistance} km`}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="20"
          step="2"
          value={filters.maxDistance}
          onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
          className="w-full accent-[#2A9D8F] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>2 km</span>
          <span>5 km</span>
          <span>10 km</span>
          <span>20+ km</span>
        </div>
      </div>
    </aside>
  );
};
