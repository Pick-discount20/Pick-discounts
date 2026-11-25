'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';

export const POPULAR_SEARCH_SUGGESTIONS = [
  { label: 'Restaurants & Cafes', category: 'Dining', icon: '🍽️' },
  { label: 'Home Cleaners', category: 'Home Care', icon: '🧹' },
  { label: 'Dentists & Clinics', category: 'Healthcare', icon: '🦷' },
  { label: 'Beauty Salons & Spas', category: 'Wellness', icon: '✨' },
  { label: 'Auto Detailing & Mechanics', category: 'Automotive', icon: '🚗' },
  { label: 'Plumbers & Electricians', category: 'Home Services', icon: '🔧' },
];

interface SearchBarProps {
  initialKeyword?: string;
  compact?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeyword = '',
  className = '',
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [keywordSuggestionsOpen, setKeywordSuggestionsOpen] = useState(false);

  const containerRef = useRef<HTMLFormElement>(null);
  const keywordInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setKeywordSuggestionsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeywordSuggestionsOpen(false);

    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    params.set('radius', '5');

    router.push(`/search?${params.toString()}`);
  };

  const handleSelectSuggestion = (suggestedLabel: string) => {
    setKeyword(suggestedLabel);
    setKeywordSuggestionsOpen(false);
    const params = new URLSearchParams();
    params.set('q', suggestedLabel);
    params.set('radius', '5');
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`relative w-full bg-white h-11 md:h-[50px] rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex items-center px-4 cursor-text ${className}`}
      role="search"
      aria-label="Local business search"
      onClick={() => keywordInputRef.current?.focus()}
    >
      {/* Search icon at the extreme left */}
      <Search className="w-4 h-4 text-[#64748B] shrink-0 mr-3 select-none pointer-events-none" aria-hidden="true" />

      {/* Single text input with exact placeholder: "Hidden gem locals love" */}
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
        }}
        placeholder="Hidden gem locals love"
        aria-label="Search businesses"
        autoComplete="off"
        className="w-full h-full bg-transparent text-[#17243B] placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
      />

      {/* Autocomplete Suggestions Dropdown: Anchored directly below search field */}
      {keywordSuggestionsOpen && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in duration-150"
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
                Press Enter to discover all results for &ldquo;{keyword}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
