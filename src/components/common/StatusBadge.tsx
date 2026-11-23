import React from 'react';
import { BusinessStatus } from '@/types';

interface StatusBadgeProps {
  status: BusinessStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const configs: Record<BusinessStatus, { bg: string; text: string; label: string; dot: string }> = {
    approved: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      label: 'Approved',
      dot: 'bg-emerald-500',
    },
    pending: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      label: 'Pending Review',
      dot: 'bg-amber-500',
    },
    draft: {
      bg: 'bg-slate-50 border-slate-200',
      text: 'text-slate-700',
      label: 'Draft',
      dot: 'bg-slate-400',
    },
    rejected: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-800',
      label: 'Rejected',
      dot: 'bg-rose-500',
    },
    suspended: {
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-800',
      label: 'Suspended',
      dot: 'bg-purple-500',
    },
  };

  const config = configs[status] || configs.draft;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};
