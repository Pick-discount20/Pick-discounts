import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  accentColor?: 'teal' | 'navy' | 'orange' | 'slate';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  accentColor = 'navy',
  className = '',
}) => {
  const accentClasses = {
    teal: 'bg-[#2A9D8F]/10 text-[#2A9D8F]',
    navy: 'bg-[#14213D]/10 text-[#14213D]',
    orange: 'bg-[#F4A261]/15 text-[#F4A261]',
    slate: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs transition-shadow hover:shadow-sm ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <h4 className="text-2xl font-bold text-[#14213D] mt-1">{value}</h4>
        </div>
        <div className={`p-2.5 rounded-xl ${accentClasses[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtext || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`font-semibold ${
                trend.positive ? 'text-[#2A9D8F]' : 'text-rose-600'
              }`}
            >
              {trend.positive ? '↑' : '↓'} {trend.value}
            </span>
          )}
          {subtext && <span className="text-slate-500">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
