'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Save,
  Eye,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { PriceRange } from '@/types';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { DEMO_BUSINESSES, DEMO_CATEGORIES } from '@/data/mockData';

export default function BusinessProfileEditorPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const initialBiz = DEMO_BUSINESSES[0];

  // Editable Form State
  const [name, setName] = useState(initialBiz.name);
  const [tagline, setTagline] = useState(initialBiz.tagline);
  const [category, setCategory] = useState(initialBiz.category);
  const [subcategory, setSubcategory] = useState(initialBiz.subcategory);
  const [description, setDescription] = useState(initialBiz.description);
  const [locality, setLocality] = useState(initialBiz.locality);
  const [address, setAddress] = useState(initialBiz.address);
  const [pincode, setPincode] = useState(initialBiz.pincode);
  const [phone, setPhone] = useState(initialBiz.phone);
  const [email, setEmail] = useState(initialBiz.email);
  const [website, setWebsite] = useState(initialBiz.website || '');
  const [priceRange, setPriceRange] = useState(initialBiz.priceRange);

  // Photos state with local add/remove capability
  const [photos, setPhotos] = useState<string[]>([
    initialBiz.primaryImage,
    ...initialBiz.galleryImages,
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddLocalPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotos([previewUrl, ...photos]);
      showToast(`Added local photograph: ${file.name}`);
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    if (photos.length <= 1) {
      alert('Your business listing must retain at least one cover photograph.');
      return;
    }
    setPhotos(photos.filter((_, idx) => idx !== indexToRemove));
    showToast('Photograph removed from gallery');
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile changes saved successfully.');
  };

  const handleSubmitForReview = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile revisions submitted to Peak Discount moderation team for review.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />

      <div className="flex-1 flex">
        <DashboardSidebar
          portal="owner"
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            title="Business Profile Editor"
            subtitle="Update your public listing details, operational hours, services, and photo showcase."
            portal="owner"
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            actions={
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3.5 py-2 bg-white text-slate-700 hover:text-[#14213D] border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>
                <Link
                  href={`/business/${initialBiz.slug}`}
                  target="_blank"
                  className="px-3.5 py-2 bg-[#14213D] hover:bg-[#1E3159] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>
              </div>
            }
          />

          {/* Floating Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 right-6 z-50 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-2 duration-200">
              <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
              <span>{toastMessage}</span>
            </div>
          )}

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-8">
            <form onSubmit={handleSubmitForReview} className="space-y-8">
              {/* Section 1: Basic Information */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#14213D]">
                    1. Basic Establishment Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your public establishment name, category classification, and primary brand tagline.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Brand Tagline / Pitch
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Artisanal roastery, botanical greenhouse café & slow-brew bar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Primary Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] bg-white text-[#14213D]"
                    >
                      {DEMO_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Sub-specialty
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Price Range
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value as PriceRange)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] bg-white text-[#14213D]"
                    >
                      <option value="₹">₹ — Budget-friendly</option>
                      <option value="₹₹">₹₹ — Moderate</option>
                      <option value="₹₹₹">₹₹₹ — Premium</option>
                      <option value="₹₹₹₹">₹₹₹₹ — Luxury</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 2: Business Description */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#14213D]">
                    2. Business Overview & Story
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Describe your craftsmanship, heritage, key specializations, and what sets your service apart.
                  </p>
                </div>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] leading-relaxed"
                />
              </section>

              {/* Section 3: Location & Address */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#14213D]">
                    3. Physical Location & Coordinates
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Accurate Bangalore street address ensures customers and delivery navigators can find you easily.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Locality
                    </label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Bangalore"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Contact Information */}
              <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#14213D]">
                    4. Direct Customer Contact Details
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    These contact methods will be publicly accessible on your verified business profile.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Inquiry Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                      Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourbusiness.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                    />
                  </div>
                </div>
              </section>

              {/* Section 5: Media & Photo Management */}
              <section id="photos" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#14213D]">
                      5. Media & Photo Showcase ({photos.length} Photos)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload high-resolution photographs of your interior, storefront, team, and featured products.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2A9D8F] hover:bg-[#21766C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddLocalPhoto}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {photos.map((photoUrl, idx) => (
                    <div
                      key={idx}
                      className="group relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                    >
                      <Image
                        src={photoUrl}
                        alt={`Business photograph ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-[#14213D]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          Cover Photo
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete photo"
                        aria-label="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submit / Actions Bar */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Save as Draft
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/business/${initialBiz.slug}`}
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#14213D] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Public Profile</span>
                  </Link>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2A9D8F] hover:bg-[#21766C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit for Review</span>
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
