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
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { SearchBar } from '@/components/discovery/SearchBar';
import { BusinessCard } from '@/components/discovery/BusinessCard';
import { FilterSidebar, FilterState } from '@/components/discovery/FilterSidebar';
import { MapPlaceholder } from '@/components/discovery/MapPlaceholder';
import { DEMO_BUSINESSES } from '@/data/mockData';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('location') || 'All Bangalore';
  const categoryParam = searchParams.get('category') || '';

  // Layout mode: 'list' | 'map'
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'distance'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter State
  const initialFilters: FilterState = {
    categories: categoryParam ? [categoryParam] : [],
    minRating: 0,
    prices: [],
    maxDistance: 20,
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
      if (locationParam && locationParam !== 'All Bangalore') {
        if (!biz.locality.toLowerCase().includes(locationParam.toLowerCase())) {
          return false;
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
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />
      <Navbar />

      {/* Sleek Photographic Search Banner (Yelp / Booking style) */}
      <div className="relative bg-[#14213D] border-b border-slate-200/80 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Image
            src="/images/banners/search-banner.jpg"
            alt="Search background texture"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#14213D]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {queryParam
                ? `Results for “${queryParam}”`
                : categoryParam
                ? `${categoryParam} in Bangalore`
                : 'Explore Verified Local Businesses'}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Discover audited services and verified customer reviews across {locationParam || 'Bangalore'}
            </p>
          </div>
          <div className="w-full md:max-w-xl">
            <SearchBar
              initialKeyword={queryParam}
              initialLocation={locationParam}
              compact={true}
            />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header: Query heading, result count & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#14213D] tracking-tight">
                {queryParam
                  ? `Results for “${queryParam}”`
                  : categoryParam
                  ? `${categoryParam} in Bangalore`
                  : 'All Verified Local Businesses'}
              </h1>
              <span className="text-xs bg-[#2A9D8F]/10 text-[#2A9D8F] font-bold px-2.5 py-0.5 rounded-full">
                {filteredBusinesses.length} found
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing verified businesses across {locationParam || 'Bangalore, Karnataka'}
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger, Sort by, View Mode Toggle */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>Filters</span>
              {(filters.categories.length > 0 || filters.minRating > 0 || filters.verifiedOnly) && (
                <span className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs text-xs text-slate-600">
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recommended' | 'rating' | 'reviews' | 'distance')}
                className="bg-transparent font-bold text-[#14213D] focus:outline-none cursor-pointer"
                aria-label="Sort listings"
              >
                <option value="recommended">Recommended & Verified</option>
                <option value="rating">Highest Rated (4.8+)</option>
                <option value="reviews">Most Reviewed</option>
                <option value="distance">Nearest Distance</option>
              </select>
            </div>

            {/* View Mode Toggle: List vs Map */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#14213D] shadow-xs'
                    : 'text-slate-500 hover:text-[#14213D]'
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
                    ? 'bg-white text-[#14213D] shadow-xs'
                    : 'text-slate-500 hover:text-[#14213D]'
                }`}
                title="Map & Split View"
              >
                <MapIcon className="w-4 h-4 text-[#2A9D8F]" />
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
          <div className={`col-span-1 ${viewMode === 'map' ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
            {viewMode === 'map' ? (
              /* Map View (Split screen style) */
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Scrollable list on xl screens */}
                <div className="xl:col-span-5 space-y-4 max-h-[800px] overflow-y-auto pr-1">
                  <div className="text-xs text-slate-500 font-semibold px-1">
                    Showing {filteredBusinesses.length} businesses on map
                  </div>
                  {filteredBusinesses.map((biz) => (
                    <BusinessCard key={biz.id} business={biz} layout="list" />
                  ))}
                </div>

                {/* Interactive Map Visual */}
                <div className="xl:col-span-7 sticky top-24">
                  <MapPlaceholder
                    businesses={filteredBusinesses}
                    selectedLocality={locationParam || 'Bangalore'}
                  />
                </div>
              </div>
            ) : (
              /* Standard List View */
              <div className="space-y-4">
                {filteredBusinesses.length === 0 ? (
                  /* Empty state */
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4 shadow-xs">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                      <SearchIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#14213D]">No businesses matched your filters</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Try expanding your distance radius, removing minimum rating requirements, or resetting your category selections.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A9D8F] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#21766C] transition-colors"
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
                    <div className="pt-8 pb-4 flex items-center justify-between border-t border-slate-200/80">
                      <span className="text-xs text-slate-500">
                        Showing 1–{filteredBusinesses.length} of {filteredBusinesses.length} businesses
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-40"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage(1)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                            currentPage === 1
                              ? 'bg-[#14213D] text-white'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          1
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage(2)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                            currentPage === 2
                              ? 'bg-[#14213D] text-white'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          2
                        </button>
                        <button
                          type="button"
                          disabled={currentPage === 2}
                          onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
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
              <h3 className="font-extrabold text-base text-[#14213D]">Discovery Filters</h3>
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
                className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#2A9D8F] rounded-xl shadow-xs"
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
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
