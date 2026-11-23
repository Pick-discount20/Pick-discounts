'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, Check } from 'lucide-react';
import { POPULAR_BANGALORE_LOCALITIES } from '@/data/mockData';

interface SearchBarProps {
  initialKeyword?: string;
  initialLocation?: string;
  compact?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeyword = '',
  initialLocation = 'All Bangalore',
  compact = false,
  className = '',
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLFormElement>(null);

  const sampleSuggestions = [
    { label: 'Specialty Coffee', type: 'Category', query: 'Restaurants & Cafes' },
    { label: 'Dental Clinic & Implants', type: 'Category', query: 'Healthcare & Clinics' },
    { label: 'Organic Hair Spa', type: 'Service', query: 'Beauty & Wellness' },
    { label: 'Ceramic Car Detailing', type: 'Service', query: 'Automotive Care' },
    { label: 'Modular Kitchen Interiors', type: 'Category', query: 'Home Services' },
  ];

  const filteredSuggestions = sampleSuggestions.filter((item) =>
    item.label.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionsOpen(false);
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location && location !== 'All Bangalore') params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  const handleSelectSuggestion = (query: string) => {
    setKeyword(query);
    setSuggestionsOpen(false);
    const params = new URLSearchParams();
    params.set('q', query);
    if (location && location !== 'All Bangalore') params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      ref={searchContainerRef}
      className={`relative w-full ${
        compact
          ? 'bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-1.5'
          : 'bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-stretch gap-2.5'
      } ${className}`}
    >
      {/* Keyword input */}
      <div className="relative flex-1 flex items-center min-w-0">
        <Search className={`text-slate-400 shrink-0 ml-3 ${compact ? 'w-4 h-4' : 'w-5 h-5 text-[#2A9D8F]'}`} />
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setSuggestionsOpen(true);
          }}
          onFocus={() => setSuggestionsOpen(true)}
          placeholder="Search cafes, dentists, auto care, salons..."
          aria-label="Search local businesses or services"
          className={`w-full bg-transparent pl-3 pr-4 text-[#14213D] placeholder-slate-400 focus:outline-none font-medium ${
            compact ? 'py-1.5 text-xs sm:text-sm' : 'py-2.5 text-sm sm:text-base'
          }`}
        />

        {/* Suggestion autocomplete popup */}
        {suggestionsOpen && keyword.length > 0 && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Suggested Searches
            </div>
            {filteredSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item.label)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:text-[#14213D]"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-8 bg-slate-200 self-center" />

      {/* Location selector */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
          className={`w-full sm:w-auto flex items-center justify-between gap-2 text-left bg-slate-50 sm:bg-transparent rounded-lg hover:bg-slate-50 transition-colors focus:outline-none ${
            compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700'
          }`}
          aria-expanded={locationDropdownOpen}
          aria-label="Select locality in Bangalore"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F4A261] shrink-0" />
            <span className="truncate max-w-[130px] font-semibold text-[#14213D]">
              {location}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {/* Location Dropdown Menu */}
        {locationDropdownOpen && (
          <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Bangalore Localities
            </div>
            {POPULAR_BANGALORE_LOCALITIES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocation(loc);
                  setLocationDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                  location === loc ? 'text-[#2A9D8F] font-bold bg-[#2A9D8F]/5' : 'text-slate-700'
                }`}
              >
                <span>{loc}</span>
                {location === loc && <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full sm:w-auto inline-flex items-center justify-center font-bold text-white bg-[#14213D] hover:bg-[#1E3159] active:bg-[#0D1629] rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] ${
          compact ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'
        }`}
      >
        <span>Discover</span>
      </button>
    </form>
  );
};
