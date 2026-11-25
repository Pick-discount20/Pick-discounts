'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  ChevronDown,
  Crosshair,
  AlertCircle,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';

export const DEFAULT_SEARCH_RADIUS_KM = 5;

export const POPULAR_LOCATIONS = [
  { city: 'Ahmedabad', label: 'Satellite, Ahmedabad', primary: true },
  { city: 'Ahmedabad', label: 'Vastrapur, Ahmedabad' },
  { city: 'Ahmedabad', label: 'SG Highway, Ahmedabad' },
  { city: 'Ahmedabad', label: 'Prahlad Nagar, Ahmedabad' },
  { city: 'Ahmedabad', label: 'Bodakdev, Ahmedabad' },
  { city: 'Bangalore', label: 'Indiranagar, Bangalore' },
  { city: 'Bangalore', label: 'Koramangala, Bangalore' },
  { city: 'Bangalore', label: 'HSR Layout, Bangalore' },
  { city: 'Bangalore', label: 'Whitefield, Bangalore' },
];

export const POPULAR_SEARCH_SUGGESTIONS = [
  { label: 'Restaurants', category: 'Restaurants & Cafes', icon: '🍽️' },
  { label: 'Dentists', category: 'Healthcare & Clinics', icon: '🦷' },
  { label: 'Car services', category: 'Automotive Care', icon: '🚗' },
  { label: 'Beauty salons', category: 'Beauty & Wellness', icon: '✨' },
  { label: 'Home cleaning', category: 'Home Services', icon: '🧹' },
  { label: 'Healthcare', category: 'Healthcare & Clinics', icon: '🏥' },
];

interface SearchBarProps {
  initialKeyword?: string;
  initialLocation?: string;
  compact?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeyword = '',
  initialLocation = 'Satellite, Ahmedabad',
  compact = false,
  className = '',
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [keywordSuggestionsOpen, setKeywordSuggestionsOpen] = useState(false);

  // Geolocation state
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLFormElement>(null);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLocationDropdownOpen(false);
        setKeywordSuggestionsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLocationDropdownOpen(false);
        setKeywordSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredSuggestions = POPULAR_SEARCH_SUGGESTIONS.filter((item) =>
    item.label.toLowerCase().includes(keyword.toLowerCase())
  );

  // Explicit user action for current location via Browser Geolocation API
  const handleUseCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGeoStatus('error');
      setGeoMessage("We couldn't determine your location. Please enter your area manually.");
      return;
    }

    setGeoStatus('loading');
    setGeoMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(3);
        const lng = position.coords.longitude.toFixed(3);
        const label = `Current Location (${lat}, ${lng})`;
        setLocation(label);
        setGeoStatus('success');
        setGeoMessage(`Location acquired (Searching within ${DEFAULT_SEARCH_RADIUS_KM} km)`);
        setTimeout(() => {
          setLocationDropdownOpen(false);
        }, 500);
      },
      (error) => {
        setGeoStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoMessage('Location permission was denied. Please enter your area manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoMessage("We couldn't determine your location. Please enter your area manually.");
            break;
          case error.TIMEOUT:
            setGeoMessage('Location request timed out. Please enter your area manually.');
            break;
          default:
            setGeoMessage("We couldn't determine your location. Please enter your area manually.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 60000,
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeywordSuggestionsOpen(false);
    setLocationDropdownOpen(false);

    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    params.set('radius', DEFAULT_SEARCH_RADIUS_KM.toString());

    router.push(`/search?${params.toString()}`);
  };

  const handleSelectSuggestion = (suggestedLabel: string) => {
    setKeyword(suggestedLabel);
    setKeywordSuggestionsOpen(false);
    const params = new URLSearchParams();
    params.set('q', suggestedLabel);
    if (location.trim()) params.set('location', location.trim());
    params.set('radius', DEFAULT_SEARCH_RADIUS_KM.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`relative w-full ${
        compact
          ? 'bg-white p-1 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center'
          : 'bg-white p-1 xl:p-1.5 rounded-xl xl:rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-stretch md:items-center'
      } ${className}`}
      role="search"
      aria-label="Local business and location search"
    >
      {/* =======================================================================
          1. KEYWORD SEARCH INPUT (What)
          ======================================================================= */}
      <div className="relative flex-1 flex items-center min-w-0 px-3 py-1.5 md:py-1">
        <label htmlFor="search-keyword-input" className="sr-only">
          What are you looking for?
        </label>
        <div className="flex items-center gap-2 w-full">
          <Search className="w-4 h-4 text-[#64748B] shrink-0" aria-hidden="true" />
          <input
            id="search-keyword-input"
            ref={keywordInputRef}
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setKeywordSuggestionsOpen(true);
            }}
            onFocus={() => {
              setKeywordSuggestionsOpen(true);
              setLocationDropdownOpen(false);
            }}
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            autoComplete="off"
            className="w-full bg-transparent text-[#17243B] placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
          />
        </div>

        {/* Autocomplete Suggestions Dropdown: Anchored directly below keyword input, no document flow impact */}
        {keywordSuggestionsOpen && (
          <div
            className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-[320px] md:w-[360px] bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in duration-150"
            role="listbox"
          >
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#249C91]" />
              <span>Suggested Searches</span>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item.label)}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs sm:text-sm text-[#17243B] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span className="font-medium text-[#17243B]">{item.label}</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-[#64748B] font-semibold px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3.5 py-3 text-xs text-[#64748B]">
                  Press search to discover all results for &ldquo;{keyword}&rdquo;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle Vertical Divider between inputs (Desktop) */}
      <div className="hidden md:block w-px h-6 bg-[#E2E8F0] shrink-0 self-center" aria-hidden="true" />

      {/* =======================================================================
          2. LOCATION SEARCH INPUT (Where)
          ======================================================================= */}
      <div className="relative flex-1 flex items-center min-w-0 px-3 py-1.5 md:py-1 border-t md:border-t-0 border-[#E2E8F0]">
        <label htmlFor="search-location-input" className="sr-only">
          Location: Enter area, locality or pincode
        </label>
        <div className="flex items-center gap-2 w-full">
          <MapPin className="w-4 h-4 text-[#E66B45] shrink-0" aria-hidden="true" />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-xs font-bold text-[#64748B] select-none hidden sm:inline">
              Where?
            </span>
            <input
              id="search-location-input"
              ref={locationInputRef}
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationDropdownOpen(true);
              }}
              onFocus={() => {
                setLocationDropdownOpen(true);
                setKeywordSuggestionsOpen(false);
              }}
              placeholder="Enter area, locality or pincode"
              aria-label="Enter area, locality or pincode"
              autoComplete="off"
              className="w-full bg-transparent text-[#17243B] placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
            />
          </div>

          {/* 5 km Discovery Radius Badge */}
          <span
            className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#249C91]/10 text-[#249C91] whitespace-nowrap cursor-default"
            title="Discovery search radius: 5 km"
          >
            5 km
          </span>

          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="p-1 text-[#64748B] hover:text-[#17243B] focus:outline-none cursor-pointer"
            aria-label="Toggle location choices"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Location Dropdown Menu: Anchored directly below location input, no document flow impact */}
        {locationDropdownOpen && (
          <div
            className="absolute top-[calc(100%+8px)] right-0 w-full sm:w-[320px] bg-white rounded-xl shadow-2xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in duration-150"
          >
            {/* Geolocation Trigger */}
            <div className="p-1 pb-2 border-b border-[#E2E8F0]">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={geoStatus === 'loading'}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-[#249C91] bg-[#249C91]/10 hover:bg-[#249C91]/15 transition-colors text-left cursor-pointer"
              >
                {geoStatus === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#249C91]" />
                ) : (
                  <Crosshair className="w-4 h-4 shrink-0 text-[#249C91]" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="leading-tight">Use my current location</div>
                  <div className="text-[10px] font-medium text-[#64748B]">
                    Find businesses within 5 km of your position
                  </div>
                </div>
              </button>

              {/* Geolocation Feedback Banner */}
              {geoMessage && (
                <div
                  className={`mt-2 p-2 rounded-lg text-[11px] leading-tight flex items-start gap-1.5 ${
                    geoStatus === 'error'
                      ? 'bg-rose-50 text-rose-700 border border-rose-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{geoMessage}</span>
                </div>
              )}
            </div>

            {/* Curated Localities List */}
            <div className="pt-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Suggested Areas & Localities
              </div>
              <div className="max-h-52 overflow-y-auto space-y-0.5">
                {POPULAR_LOCATIONS.map((loc) => {
                  const isSelected = location.toLowerCase() === loc.label.toLowerCase();
                  return (
                    <button
                      key={loc.label}
                      type="button"
                      onClick={() => {
                        setLocation(loc.label);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        isSelected ? 'font-bold text-[#249C91] bg-[#249C91]/5' : 'text-[#17243B]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#249C91]' : 'text-[#64748B]'}`} />
                        <span>{loc.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#249C91]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Radius Indicator */}
            <div className="mt-2 pt-2 border-t border-[#E2E8F0] px-3 py-1 text-[10px] font-medium text-[#64748B] flex items-center justify-between">
              <span>Search Radius:</span>
              <span className="text-[#249C91] font-bold">Within 5 km</span>
            </div>
          </div>
        )}
      </div>

      {/* =======================================================================
          3. SEARCH SUBMIT BUTTON
          ======================================================================= */}
      <div className="p-1 md:pl-0 shrink-0">
        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 font-bold text-white bg-[#E66B45] hover:bg-[#d85d37] active:bg-[#c24f33] px-4 xl:px-5 py-2.5 md:py-2 rounded-lg xl:rounded-xl transition-all shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-[#E66B45]/50 cursor-pointer text-xs sm:text-sm tracking-tight"
          aria-label="Search Pick Discount"
        >
          <Search className="w-4 h-4 text-white" aria-hidden="true" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};
