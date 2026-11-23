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
  { city: 'Ahmedabad', state: 'Gujarat', label: 'Ahmedabad, Gujarat', primary: true },
  { city: 'Ahmedabad', state: 'Gujarat', label: 'SG Highway, Ahmedabad' },
  { city: 'Ahmedabad', state: 'Gujarat', label: 'Prahlad Nagar, Ahmedabad' },
  { city: 'Ahmedabad', state: 'Gujarat', label: 'Navrangpura, Ahmedabad' },
  { city: 'Ahmedabad', state: 'Gujarat', label: 'Bodakdev, Ahmedabad' },
  { city: 'Bangalore', state: 'Karnataka', label: 'Indiranagar, Bangalore' },
  { city: 'Bangalore', state: 'Karnataka', label: 'Koramangala, Bangalore' },
  { city: 'Bangalore', state: 'Karnataka', label: 'HSR Layout, Bangalore' },
  { city: 'Bangalore', state: 'Karnataka', label: 'Whitefield, Bangalore' },
];

export const POPULAR_SEARCH_SUGGESTIONS = [
  { label: 'Restaurants & Cafes', type: 'Category', icon: '🍽️' },
  { label: 'Dentists & Dental Clinics', type: 'Healthcare', icon: '🦷' },
  { label: 'Beauty Salons & Day Spas', type: 'Beauty', icon: '✨' },
  { label: 'Car Repair & Detailing', type: 'Automotive', icon: '🚗' },
  { label: 'Home Services & Electricians', type: 'Home', icon: '🏠' },
  { label: 'Interior Designers & Decor', type: 'Home', icon: '🛋️' },
];

interface SearchBarProps {
  initialKeyword?: string;
  initialLocation?: string;
  compact?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeyword = '',
  initialLocation = 'Ahmedabad, Gujarat',
  compact = false,
  className = '',
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [keywordSuggestionsOpen, setKeywordSuggestionsOpen] = useState(false);

  // Geolocation handling state
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLFormElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLocationDropdownOpen(false);
        setKeywordSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter keyword suggestions based on user input
  const filteredSuggestions = POPULAR_SEARCH_SUGGESTIONS.filter((item) =>
    item.label.toLowerCase().includes(keyword.toLowerCase())
  );

  // Explicit user action for current location via Browser Geolocation API
  const handleUseCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGeoStatus('error');
      setGeoMessage('Geolocation is not supported by your browser.');
      return;
    }

    setGeoStatus('loading');
    setGeoMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // High accuracy coordinates retrieved
        const lat = position.coords.latitude.toFixed(3);
        const lng = position.coords.longitude.toFixed(3);
        const label = `Current Location (${lat}, ${lng})`;
        setLocation(label);
        setGeoStatus('success');
        setGeoMessage(`Location acquired (${DEFAULT_SEARCH_RADIUS_KM} km radius applied)`);
        setTimeout(() => {
          setLocationDropdownOpen(false);
        }, 600);
      },
      (error) => {
        setGeoStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoMessage('Location permission denied. Please select your locality manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoMessage('Location information is currently unavailable.');
            break;
          case error.TIMEOUT:
            setGeoMessage('Location request timed out. Please try again.');
            break;
          default:
            setGeoMessage('Could not retrieve current location.');
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

  // Search submission with keyword, location and default 5 km radius
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
          ? 'bg-white p-1 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center'
          : 'bg-white p-1 sm:p-1.5 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row items-stretch md:items-center'
      } ${className}`}
      role="search"
      aria-label="Local business and location search"
    >
      {/* =======================================================================
          INPUT 1: WHAT ARE YOU LOOKING FOR? (Yelp Keyword Search)
          ======================================================================= */}
      <div className="relative flex-1 flex items-center min-w-0 px-3 py-1.5 md:py-2">
        <label htmlFor="search-keyword-input" className="sr-only">
          What are you looking for?
        </label>
        <div className="flex items-center gap-2 w-full">
          <Search className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            id="search-keyword-input"
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setKeywordSuggestionsOpen(true);
            }}
            onFocus={() => setKeywordSuggestionsOpen(true)}
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            autoComplete="off"
            className="w-full bg-transparent text-[#14213D] placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none"
          />
        </div>

        {/* Keyword Suggestions Dropdown */}
        {keywordSuggestionsOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150"
            role="listbox"
          >
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2A9D8F]" />
              <span>Popular Searches</span>
            </div>
            {filteredSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item.label)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:text-[#14213D] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full">
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Vertical Divider (Desktop) */}
      <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0 self-center" aria-hidden="true" />

      {/* =======================================================================
          INPUT 2: WHERE? (Yelp Location Search + 5 km Radius Indicator)
          ======================================================================= */}
      <div className="relative flex-1 flex items-center min-w-0 px-3 py-1.5 md:py-2 border-t md:border-t-0 border-slate-100">
        <label htmlFor="search-location-input" className="sr-only">
          Location: Where?
        </label>
        <div className="flex items-center gap-2 w-full">
          <MapPin className="w-4 h-4 text-[#F4A261] shrink-0" aria-hidden="true" />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-xs font-bold text-slate-400 select-none hidden sm:inline">
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
              onFocus={() => setLocationDropdownOpen(true)}
              placeholder="City, locality or address"
              aria-label="Location (City, locality or address)"
              autoComplete="off"
              className="w-full bg-transparent text-[#14213D] placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* 5 km Radius Badge */}
          <span
            className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] whitespace-nowrap cursor-default"
            title="Business discovery default radius: 5 km"
          >
            5 km
          </span>

          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            aria-label="Toggle location choices"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Location Dropdown Menu with Geolocation & Popular Localities */}
        {locationDropdownOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in duration-150 min-w-[280px]"
          >
            {/* Geolocation Button */}
            <div className="p-1 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={geoStatus === 'loading'}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 hover:bg-[#2A9D8F]/20 transition-colors text-left cursor-pointer"
              >
                {geoStatus === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#2A9D8F]" />
                ) : (
                  <Crosshair className="w-4 h-4 shrink-0 text-[#2A9D8F]" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="leading-tight">Use my current location</div>
                  <div className="text-[10px] font-medium text-slate-500">
                    Find verified businesses within 5 km
                  </div>
                </div>
              </button>

              {/* Geolocation Message / Error banner */}
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

            {/* Popular Localities List */}
            <div className="pt-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suggested Locations
              </div>
              <div className="max-h-52 overflow-y-auto no-scrollbar space-y-0.5">
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
                        isSelected ? 'font-bold text-[#2A9D8F] bg-[#2A9D8F]/5' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2A9D8F]' : 'text-slate-400'}`} />
                        <span>{loc.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radius reminder */}
            <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Default Radius:</span>
              <span className="text-[#2A9D8F] font-bold">Searching within 5 km</span>
            </div>
          </div>
        )}
      </div>

      {/* =======================================================================
          SEARCH BUTTON (Yelp High-Emphasis Action with Peak Discount Branding)
          ======================================================================= */}
      <div className="p-1 md:pl-0 shrink-0">
        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 font-bold text-white bg-[#E76F51] hover:bg-[#d65f42] active:bg-[#c24f33] px-4 md:px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#E76F51]/50 cursor-pointer text-xs sm:text-sm tracking-tight"
          aria-label="Search Peak Discount"
        >
          <Search className="w-4 h-4 text-white" aria-hidden="true" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};
