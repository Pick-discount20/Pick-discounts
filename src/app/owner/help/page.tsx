'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  Store,
  Mail,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';

export default function BusinessHelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoDisclaimer />
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#249C91] uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" />
            <span>Pick Discount for Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17243B] tracking-tight">
            Business Partner Help &amp; Verification Guide
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-2xl">
            Everything you need to know about claiming your listing, earning the verified badge, and engaging local customers across your commercial corridor.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#249C91]/10 text-[#249C91] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#17243B]">Claim an Existing Business</h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                Found your establishment in our local directory? Submit your trade license or commercial utility bill to take ownership of your profile.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/owner/claim"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#249C91] hover:bg-[#1f7e75] px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <span>Start Business Claim</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E66B45]/10 text-[#E66B45] flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#17243B]">Register a New Establishment</h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                New store, clinic, salon or firm? Submit your business details, photos, and operating hours to request an onboarding physical audit.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/owner/profile"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#17243B] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                <span>Submit Business Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* The Verification Standard Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 mb-12 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#17243B] tracking-tight mb-2">
            How Pick Discount Verification Works
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mb-6">
            Unlike unmoderated public directories, Pick Discount awards verification badges based on strict documentation standards:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#17243B] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-sm font-bold text-[#17243B]">Trade License Audit</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Verification requires an active Shop &amp; Establishment license, GSTIN filing, or municipal trade registration.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#17243B] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-sm font-bold text-[#17243B]">Premises Confirmation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our field team confirms physical storefront occupancy via commercial electricity bill, lease deed, or geo-tagged signage.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#17243B] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-sm font-bold text-[#17243B]">Owner Authorisation</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Direct phone and OTP confirmation with the designated authorized proprietor ensures only genuine owners manage listings.
              </p>
            </div>
          </div>
        </div>

        {/* Business Owner FAQ */}
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-extrabold text-[#17243B] tracking-tight mb-4">
            Frequently Asked Questions for Business Owners
          </h2>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#17243B]">Does listing or claiming a business require upfront payment?</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              No. Claiming an existing listing and basic verified presence on Pick Discount is completely free under MVP 1.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#17243B]">How do I report fake or defamatory customer reviews?</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              Every review on Pick Discount features a dedicated &ldquo;Report Review&rdquo; flag. Our administrative moderation team inspects reported feedback against our anti-smear and bot-prevention rules within 24 business hours.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#17243B]">Can I update my portfolio photos, services, and operating hours?</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              Yes. Once your claim is approved, log in to your Owner Portal to update menus, services, seasonal holiday hours, and high-resolution gallery images.
            </p>
          </div>
        </div>

        {/* Support Contact Box */}
        <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#E2E8F0]">
          <div>
            <h3 className="text-base font-bold text-[#17243B]">Need personal assistance with your verification?</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Our merchant onboarding team is available Monday through Saturday, 9:00 AM &ndash; 8:00 PM IST.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:support@pickdiscount.com"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17243B] bg-white px-4 py-2.5 rounded-xl border border-[#E2E8F0] shadow-xs hover:bg-slate-50 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#249C91]" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
