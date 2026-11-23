'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Edit3,
  Camera,
  FileCheck,
  Settings,
  ShieldAlert,
  History,
  ArrowLeft,
  X,
} from 'lucide-react';

interface SidebarProps {
  portal: 'owner' | 'admin';
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  portal,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();

  const ownerLinks = [
    { href: '/owner/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/owner/claim', label: 'Claim a Business', icon: ShieldCheck, badge: 'Step Wizard' },
    { href: '/owner/profile', label: 'Edit Profile & Media', icon: Edit3 },
    { href: '/owner/dashboard#verification', label: 'Verification Status', icon: FileCheck },
    { href: '/owner/dashboard#photos', label: 'Business Photos', icon: Camera },
    { href: '/owner/dashboard#settings', label: 'Account Settings', icon: Settings },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { href: '/admin/dashboard#claims', label: 'Business Claims', icon: ShieldCheck, badge: '3 Pending' },
    { href: '/admin/dashboard#listings', label: 'Business Listings', icon: Building2 },
    { href: '/admin/dashboard#moderation', label: 'Moderation Queue', icon: ShieldAlert, badge: '2 Reports' },
    { href: '/admin/dashboard#audit', label: 'Audit History', icon: History },
    { href: '/admin/dashboard#settings', label: 'Platform Policy', icon: Settings },
  ];

  const links = portal === 'owner' ? ownerLinks : adminLinks;

  const content = (
    <div className="flex flex-col h-full bg-[#14213D] text-slate-300 w-64 p-4 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-6 pt-2 border-b border-slate-800">
        <Link href="/" className="flex flex-col py-1">
          <span className="text-lg font-black tracking-tight text-white font-sans">
            PEAK<span className="text-[#2A9D8F] ml-1">DISCOUNT</span>
          </span>
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#F4A261] -mt-0.5">
            {portal === 'owner' ? 'Owner Portal' : 'Admin Console'}
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 space-y-1">
        {links.map((item, idx) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? 'bg-[#2A9D8F] text-white shadow-xs'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-800 text-[#F4A261]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Switch Portal & Back to Marketplace */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#F4A261]" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] space-y-1">
          <p className="font-semibold text-slate-300">
            {portal === 'owner' ? 'Logged in as Business Owner' : 'Logged in as Platform Admin'}
          </p>
          <p className="text-slate-400">Bangalore Commercial Zone</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 min-h-screen">
        {content}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 h-full animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
