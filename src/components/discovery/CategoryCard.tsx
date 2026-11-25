import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Briefcase,
};

interface CategoryCardProps {
  category: Category;
  compact?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, compact = false }) => {
  const IconComponent = iconMap[category.iconName] || Briefcase;

  if (compact) {
    return (
      <Link
        href={`/search?category=${encodeURIComponent(category.name)}`}
        className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#249C91]/50 shadow-xs hover:shadow-md transition-all"
      >
        <div className="w-10 h-10 rounded-lg bg-[#17243B]/5 text-[#17243B] group-hover:bg-[#249C91] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-[#17243B] group-hover:text-[#249C91] truncate transition-colors">
            {category.name}
          </h4>
          <p className="text-[11px] text-[#64748B]">{category.count} listings</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/search?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-[#249C91]/40 transition-all duration-200"
    >
      {/* Category Image Header */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17243B]/80 via-[#17243B]/30 to-transparent" />

        {/* Floating Icon badge */}
        <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white shadow-md text-[#17243B] flex items-center justify-center group-hover:bg-[#249C91] group-hover:text-white transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>

        <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#17243B] shadow-xs">
          {category.count} verified spots
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-bold text-[#17243B] group-hover:text-[#249C91] transition-colors leading-tight">
            {category.name}
          </h3>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span className="truncate max-w-[180px]">
            {category.popularLocalities.slice(0, 2).join(', ')}
          </span>
          <span className="inline-flex items-center text-[#249C91] font-semibold group-hover:translate-x-0.5 transition-transform">
            Browse
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
