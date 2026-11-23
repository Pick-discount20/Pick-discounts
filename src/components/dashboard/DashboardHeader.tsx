'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ExternalLink } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  portal: 'owner' | 'admin';
  onToggleMobileMenu?: () => void;
  actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  portal,
  onToggleMobileMenu,
  actions,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#14213D] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 font-normal">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {actions}

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg text-slate-500 hover:text-[#14213D] hover:bg-slate-100 transition-colors"
              title="Open Public Marketplace in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/80">
              <div className="w-7 h-7 rounded-full bg-[#14213D] text-[#F4A261] flex items-center justify-center font-bold text-xs">
                {portal === 'owner' ? 'BO' : 'AD'}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-[#14213D] leading-tight">
                  {portal === 'owner' ? 'Varun Nair' : 'Admin Console'}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {portal === 'owner' ? 'Brew & Botanica' : 'Bangalore Region'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
