'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Building2,
  Edit3,
  Camera,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  ClipboardList,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { RatingStars } from '@/components/common/RatingStars';
import { DEMO_BUSINESSES } from '@/data/mockData';

export default function OwnerDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const myBusiness = DEMO_BUSINESSES[0]; // Brew & Botanica

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />

      <div className="flex-1 flex">
        {/* Persistent Dashboard Sidebar */}
        <DashboardSidebar
          portal="owner"
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Dashboard Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            title="Business Owner Dashboard"
            subtitle="Manage your claimed business listing, verification credentials & profile presence."
            portal="owner"
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            actions={
              <Link
                href="/owner/profile"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2A9D8F] hover:bg-[#21766C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Link>
            }
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
            {/* Overview Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Profile Completion"
                value="85%"
                subtext="Add 2 more gallery photos for 100%"
                icon={ClipboardList}
                accentColor="teal"
              />
              <StatCard
                label="Listing Status"
                value="Approved"
                subtext="Visible on Bangalore public search"
                icon={Building2}
                accentColor="navy"
              />
              <StatCard
                label="Verification Progress"
                value="Verified Badge"
                subtext="Trade license audit passed"
                icon={ShieldCheck}
                accentColor="teal"
              />
              <StatCard
                label="Claim Status"
                value="Verified Owner"
                subtext="Authorized primary claimant"
                icon={FileCheck}
                accentColor="orange"
              />
            </div>

            {/* Profile Completion Checklist Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#14213D]">
                    Listing Profile Checklist
                  </h3>
                  <span className="text-xs bg-[#2A9D8F]/10 text-[#2A9D8F] font-bold px-2 py-0.5 rounded-full">
                    85% Completed
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Keep your operational hours, business address, and photo showcase updated for ongoing administrative compliance.
                </p>
                <div className="w-full sm:w-80 h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className="w-[85%] h-full bg-[#2A9D8F] rounded-full" />
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href="/owner/profile"
                  className="w-full sm:w-auto text-center px-4 py-2 text-xs font-bold text-[#14213D] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                >
                  Upload More Photos
                </Link>
                <Link
                  href={`/business/${myBusiness.slug}`}
                  target="_blank"
                  className="w-full sm:w-auto text-center px-4 py-2 text-xs font-bold text-white bg-[#14213D] hover:bg-[#1E3159] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Main Listing Management Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-extrabold text-[#14213D]">
                    My Business Listings
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage your active and claimed establishment records.
                  </p>
                </div>

                <Link
                  href="/owner/claim"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] hover:underline"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Claim Another Business</span>
                </Link>
              </div>

              {/* Business Listing Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <Image
                      src={myBusiness.primaryImage}
                      alt={myBusiness.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-[#14213D]">
                        {myBusiness.name}
                      </h4>
                      <StatusBadge status={myBusiness.listingStatus} size="sm" />
                      <VerificationBadge status={myBusiness.verificationStatus} size="sm" />
                    </div>
                    <p className="text-xs text-slate-500">
                      {myBusiness.category} • {myBusiness.locality}, Bangalore
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <RatingStars rating={myBusiness.rating} size="sm" showScore={true} reviewCount={myBusiness.reviewCount} />
                    </div>
                  </div>
                </div>

                {/* Listing Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <Link
                    href="/owner/profile"
                    className="flex-1 md:flex-none text-center px-3.5 py-2 text-xs font-bold bg-white text-slate-700 hover:text-[#14213D] border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Edit Details
                  </Link>
                  <Link
                    href={`/business/${myBusiness.slug}`}
                    className="flex-1 md:flex-none text-center px-3.5 py-2 text-xs font-bold bg-[#14213D] text-white rounded-lg hover:bg-[#1E3159] transition-colors"
                  >
                    Public View
                  </Link>
                </div>
              </div>

              {/* Status Contract Legend */}
              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-[#14213D] uppercase tracking-wider text-[11px]">
                  Listing Status System
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span><strong>Approved:</strong> Publicly live</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span><strong>Pending:</strong> Under review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span><strong>Draft:</strong> Incomplete</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span><strong>Rejected:</strong> Policy issue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span><strong>Suspended:</strong> Paused</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Verification Actions & Compliance Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance & Verification Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#14213D]">
                    Verification Status & Pending Actions
                  </h3>
                  <span className="text-[11px] font-semibold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded-full">
                    Active Verification
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: 'Physical Establishment Verification',
                      desc: 'Registered premises confirmed at 12th Main Road, Indiranagar.',
                      status: 'Completed',
                      isDone: true,
                    },
                    {
                      title: 'Trade Establishment Evidence',
                      desc: 'Board authorization and trade license document validated on file.',
                      status: 'Approved',
                      isDone: true,
                    },
                    {
                      title: 'Annual Document Re-validation',
                      desc: 'Next scheduled compliance review in Q4 2027.',
                      status: 'Scheduled',
                      isDone: false,
                    },
                  ].map((act, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${act.isDone ? 'text-[#2A9D8F]' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#14213D]">{act.title}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{act.status}</span>
                        </div>
                        <p className="text-slate-500 mt-0.5">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Showcase Quick-Access */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#14213D]">
                    Business Photo Gallery (4 Photos)
                  </h3>
                  <Link
                    href="/owner/profile#photos"
                    className="text-xs font-bold text-[#2A9D8F] hover:underline"
                  >
                    Manage Photos →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {myBusiness.galleryImages.slice(0, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                    >
                      <Image
                        src={img}
                        alt={`Business photo ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>

                <Link
                  href="/owner/profile"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#14213D] rounded-xl text-xs font-bold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 mr-2 text-[#2A9D8F]" />
                  <span>Upload More Photographs</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
