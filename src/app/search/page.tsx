'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  List,
  Map as MapIcon,
  SlidersHorizontal,
  X,
  Search as SearchIcon,
  RotateCcw,
  Star,
  MapPin,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { BusinessCard } from '@/components/discovery/BusinessCard';
import { FilterSidebar, FilterState } from '@/components/discovery/FilterSidebar';
import { MapPlaceholder } from '@/components/discovery/MapPlaceholder';
import { DEMO_BUSINESSES } from '@/data/mockData';
import { getAssetPath } from '@/utils/assetPath';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('location') || 'Satellite, Ahmedabad';
  const categoryParam = searchParams.get('category') || '';
  const radiusParam = searchParams.get('radius') || '5';
  const intentParam = searchParams.get('intent') || '';
  const isReviewIntent = intentParam === 'review';

  // Extract clean locality or city name for dynamic location-aware headlines
  const displayLocation = locationParam.split(',')[0].trim() || 'Your Area';

  // Layout mode: 'list' | 'map'
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'distance'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter State (defaults to 5 km search radius)
  const initialFilters: FilterState = {
    categories: categoryParam ? [categoryParam] : [],
    minRating: 0,
    prices: [],
    maxDistance: Number(radiusParam) || 5,
    openNowOnly: false,
    verifiedOnly: false,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Filter logic
  const filteredBusinesses = useMemo(() => {
    return DEMO_BUSINESSES.filter((biz) => {
      // Keyword search
      if (queryParam) {
        const q = queryParam.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesCategory = biz.category.toLowerCase().includes(q);
        const matchesSubcategory = biz.subcategory.toLowerCase().includes(q);
        const matchesService = biz.services.some((s) => s.toLowerCase().includes(q));
        const matchesTagline = biz.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesSubcategory && !matchesService && !matchesTagline) {
          return false;
        }
      }

      // Location match
      if (locationParam) {
        const loc = locationParam.toLowerCase();
        const hasSpecificLocalityMatch = DEMO_BUSINESSES.some(
          (b) => b.locality.toLowerCase().includes(loc) || b.city.toLowerCase().includes(loc)
        );
        if (hasSpecificLocalityMatch) {
          if (!biz.locality.toLowerCase().includes(loc) && !biz.city.toLowerCase().includes(loc)) {
            return false;
          }
        }
      }

      // Categories filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(biz.category)) {
          return false;
        }
      }

      // Min rating
      if (filters.minRating > 0 && biz.rating < filters.minRating) {
        return false;
      }

      // Prices
      if (filters.prices.length > 0 && !filters.prices.includes(biz.priceRange)) {
        return false;
      }

      // Max Distance
      if (filters.maxDistance < 20 && biz.distanceKm > filters.maxDistance) {
        return false;
      }

      // Open now
      if (filters.openNowOnly && !biz.isOpenNow) {
        return false;
      }

      // Verified only
      if (filters.verifiedOnly && biz.verificationStatus !== 'verified') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      // Recommended default: verified first, then highest rating
      if (a.verificationStatus === 'verified' && b.verificationStatus !== 'verified') return -1;
      if (b.verificationStatus === 'verified' && a.verificationStatus !== 'verified') return 1;
      return b.rating - a.rating;
    });
  }, [queryParam, locationParam, filters, sortBy]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      minRating: 0,
      prices: [],
      maxDistance: 20,
      openNowOnly: false,
      verifiedOnly: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <DemoDisclaimer />
      <Navbar />

      {/* Write a Review Intent Notification Banner */}
      {isReviewIntent && (
        <div className="bg-[#17243B] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E66B45]/20 text-[#E66B45] flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">
                  Write a Customer Review
                </h2>
                <p className="text-xs text-slate-300">
                  Select your verified establishment below to share your authentic customer experience.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#249C91] bg-white/10 px-3 py-1 rounded-full">
              Authentic Feedback Protected
            </span>
          </div>
        </div>
      )}

      {/* Streamlined Search Context Banner (No redundant desktop search bar, single source in Header) */}
      <div className="relative bg-[#17243B] border-b border-[#E2E8F0] py-6 sm:py-7 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <Image
            src={getAssetPath('/images/banners/search-banner.jpg')}
            alt="Search background texture"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#17243B]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 font-bold text-[#249C91] bg-[#249C91]/15 px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3 h-3" />
                <span>Searching within {radiusParam} km of {locationParam}</span>
              </span>
              <span>•</span>
              <span>{filteredBusinesses.length} verified listings found</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {queryParam
                ? `Results for “${queryParam}” in ${displayLocation}`
                : categoryParam
                ? `${categoryParam} in ${displayLocation}`
                : `Verified Businesses in ${displayLocation}`}
            </h1>
          </div>

          {/* Quick Filter Reset if active */}
          {(filters.categories.length > 0 || filters.minRating > 0 || queryParam) && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors w-fit border border-white/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset active filters</span>
            </button>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header: Query heading, result count & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#17243B] tracking-tight">
                {queryParam
                  ? `Results for “${queryParam}”`
                  : categoryParam
                  ? `${categoryParam} in ${displayLocation}`
                  : `All Verified Businesses in ${displayLocation}`}
              </h2>
              <span className="text-xs bg-[#249C91]/10 text-[#249C91] font-bold px-2.5 py-0.5 rounded-full">
                {filteredBusinesses.length} found
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Showing verified local providers across {locationParam}
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger, Sort by, View Mode Toggle */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E2E8F0] text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#249C91]" />
              <span>Filters</span>
              {(filters.categories.length > 0 || filters.minRating > 0 || filters.verifiedOnly) && (
                <span className="w-2 h-2 rounded-full bg-[#249C91]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 shadow-2xs text-xs text-slate-600">
              <span className="text-[#64748B] font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recommended' | 'rating' | 'reviews' | 'distance')}
                className="bg-transparent font-bold text-[#17243B] focus:outline-none cursor-pointer"
                aria-label="Sort listings"
              >
                <option value="recommended">Recommended &amp; Verified</option>
                <option value="rating">Highest Rated (4.8+)</option>
                <option value="reviews">Most Reviewed</option>
                <option value="distance">Nearest Distance</option>
              </select>
            </div>

            {/* View Mode Toggle: List vs Map */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#17243B] shadow-xs'
                    : 'text-slate-500 hover:text-[#17243B]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-[#17243B] shadow-xs'
                    : 'text-slate-500 hover:text-[#17243B]'
                }`}
                title="Map & Split View"
              >
                <MapIcon className="w-4 h-4 text-[#249C91]" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area: Sidebar + Results / Map */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              totalMatches={filteredBusinesses.length}
            />
          </div>

          {/* Results Column */}
          <div className="col-span-1 lg:col-span-3">
            {viewMode === 'map' ? (
              /* Map View (Split screen style) */
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-5 space-y-4 max-h-[800px] overflow-y-auto pr-1">
                  <div className="text-xs text-[#64748B] font-semibold px-1">
                    Showing {filteredBusinesses.length} businesses on map
                  </div>
                  {filteredBusinesses.map((biz) => (
                    <BusinessCard key={biz.id} business={biz} layout="list" />
                  ))}
                </div>

                <div className="xl:col-span-7 sticky top-24">
                  <MapPlaceholder
                    businesses={filteredBusinesses}
                    selectedLocality={displayLocation}
                  />
                </div>
              </div>
            ) : (
              /* Standard List View */
              <div className="space-y-4">
                {filteredBusinesses.length === 0 ? (
                  /* Empty state */
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center space-y-4 shadow-xs">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                      <SearchIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17243B]">No businesses found within 5 km of this location.</h3>
                      <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                        We couldn&apos;t determine your location or found no matches nearby. Please enter your area manually or reset your category filters.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#249C91] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#1f7e75] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All Filters</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {filteredBusinesses.map((biz) => (
                      <BusinessCard key={biz.id} business={biz} layout="list" />
                    ))}

                    {/* Pagination demonstration */}
                    <div className="pt-8 pb-4 flex items-center justify-between border-t border-[#E2E8F0]">
                      <span className="text-xs text-[#64748B]">
                        Showing 1–{filteredBusinesses.length} of {filteredBusinesses.length} businesses
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] disabled:opacity-40"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage(1)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                            currentPage === 1
                              ? 'bg-[#17243B] text-white'
                              : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50'
                          }`}
                        >
                          1
                        </button>
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-base text-[#17243B]">Discovery Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
                aria-label="Close filters drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              totalMatches={filteredBusinesses.length}
              className="border-0 shadow-none p-0"
            />

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 py-2.5 text-xs font-bold text-[#64748B] bg-slate-100 rounded-xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#249C91] rounded-xl shadow-xs"
              >
                Apply ({filteredBusinesses.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-[#64748B]">Finding businesses near you...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
