import React from 'react';
import { ShieldCheck, Clock, ShieldAlert, Shield } from 'lucide-react';
import { VerificationStatus } from '@/types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const configs = {
    verified: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      icon: ShieldCheck,
      iconColor: 'text-[#2A9D8F]',
      label: 'Verified Business',
      tooltip: 'Verified establishment with audited credentials and physical address check.',
    },
    pending: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Clock,
      iconColor: 'text-amber-600',
      label: 'Verification Pending',
      tooltip: 'Evidence submitted, pending manual administrative review',
    },
    unclaimed: {
      bg: 'bg-slate-50 text-slate-600 border-slate-200',
      icon: Shield,
      iconColor: 'text-slate-400',
      label: 'Unclaimed Listing',
      tooltip: 'Listing generated from public directory records. Eligible for owner claim.',
    },
    rejected: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: ShieldAlert,
      iconColor: 'text-rose-600',
      label: 'Verification Rejected',
      tooltip: 'Submitted evidence did not meet verification criteria',
    },
  };

  const current = configs[status] || configs.unclaimed;
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span
      title={current.tooltip}
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${current.bg} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} ${current.iconColor} shrink-0`} />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
};
