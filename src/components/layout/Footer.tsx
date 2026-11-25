import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Mail, Award } from 'lucide-react';
import { DEMO_CATEGORIES, POPULAR_BANGALORE_LOCALITIES } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17243B] text-slate-300 border-t border-slate-800 mt-auto">
      {/* Trust Banner Section */}
      <div className="border-b border-slate-800/80 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#249C91]/15 text-[#249C91] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Verified Credentials</h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every verified business badge on Peak Discount requires strict proof of trade registration, premises utility bills, and contact authenticity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#E66B45]/15 text-[#E66B45] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Hyperlocal Accuracy</h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Explore businesses mapped precisely across commercial corridors — from Indiranagar and Koramangala to Whitefield.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#249C91]/15 text-[#249C91] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Moderated Customer Feedback</h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Transparent review reporting and administrative moderation ensure fair, unbiased, spam-free community evaluations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight font-sans">
                <span className="text-white">PICK</span>
                <span className="text-[#249C91] ml-1">DISCOUNT</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The trust-first marketplace for discovering, evaluating, and connecting with high-quality local businesses and services. Built for customer transparency and business credibility.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#249C91] shrink-0" />
                Bangalore Commercial Corridors, Karnataka, India
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E66B45] shrink-0" />
                contact@peakdiscount.com
              </p>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Categories
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              {DEMO_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/search?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-[#249C91] hover:underline font-medium">
                  View all categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Localities */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Top Localities
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              {POPULAR_BANGALORE_LOCALITIES.slice(1, 6).map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/search?location=${encodeURIComponent(loc)}`}
                    className="hover:text-white transition-colors"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-[#249C91] hover:underline font-medium">
                  All locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Solutions */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Business Solutions
            </h6>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/owner/claim" className="hover:text-white transition-colors">
                  Claim Your Listing
                </Link>
              </li>
              <li>
                <Link href="/owner/profile" className="hover:text-white transition-colors">
                  Submit New Listing
                </Link>
              </li>
              <li>
                <Link href="/owner/dashboard" className="hover:text-white transition-colors">
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-white transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Pick Discount. Local Business Discovery &amp; Verification Platform. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Verified Local Discovery</span>
            <span>•</span>
            <span>Bengaluru, Karnataka</span>
            <span>•</span>
            <Link href="/search" className="hover:text-white">Directory</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
