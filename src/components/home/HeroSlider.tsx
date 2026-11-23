'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
  LucideIcon,
} from 'lucide-react';
import { SearchBar } from '@/components/discovery/SearchBar';

interface HeroSlide {
  id: string;
  category: string;
  icon: LucideIcon;
  image: string;
  headlineRegular: string;
  headlineAccent: string;
  accentColor: string;
  supportingText: string;
  queryParam: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'dining',
    category: 'Restaurants & Cafes',
    icon: UtensilsCrossed,
    image: '/images/hero/dining.jpg',
    headlineRegular: 'Discover Places ',
    headlineAccent: 'Worth Experiencing.',
    accentColor: '#F4A261',
    supportingText: 'Find exceptional restaurants, cafes and local dining experiences around you.',
    queryParam: 'Restaurants & Cafes',
  },
  {
    id: 'healthcare',
    category: 'Healthcare',
    icon: Stethoscope,
    image: '/images/hero/healthcare.jpg',
    headlineRegular: 'Find Care ',
    headlineAccent: 'You Can Trust.',
    accentColor: '#36B4A5',
    supportingText: 'Explore verified healthcare professionals and clinics in your neighbourhood.',
    queryParam: 'Healthcare & Clinics',
  },
  {
    id: 'beauty',
    category: 'Beauty & Wellness',
    icon: Sparkles,
    image: '/images/hero/beauty.jpg',
    headlineRegular: 'Make Time for a ',
    headlineAccent: 'Better You.',
    accentColor: '#F4A261',
    supportingText: 'Discover top-rated beauty salons, wellness spas and personal care specialists.',
    queryParam: 'Beauty & Wellness',
  },
  {
    id: 'home',
    category: 'Home Services',
    icon: Home,
    image: '/images/hero/home.jpg',
    headlineRegular: 'Find the Right Experts ',
    headlineAccent: 'for Your Home.',
    accentColor: '#36B4A5',
    supportingText: 'Explore verified professionals for repairs, modular interiors and home services.',
    queryParam: 'Home Services',
  },
  {
    id: 'automotive',
    category: 'Automotive Care',
    icon: Car,
    image: '/images/hero/automotive.jpg',
    headlineRegular: 'Keep Moving ',
    headlineAccent: 'with Confidence.',
    accentColor: '#F4A261',
    supportingText: 'Find reliable mechanics, detailing studios and automotive care specialists.',
    queryParam: 'Automotive Care',
  },
];

const AUTOPLAY_INTERVAL = 3500; // 3.5 seconds as requested

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Advance to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Directly select a slide and reset countdown
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Autoplay management: runs every 3.5s, pauses on hover, resets on slide change
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentSlide, isHovered, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[660px] sm:min-h-[700px] lg:min-h-[760px] flex flex-col justify-between overflow-hidden isolate text-white select-none"
      aria-roledescription="carousel"
      aria-label="Local Business Category Highlights"
    >
      {/* =========================================================================
          FULL-WIDTH EDGE-TO-EDGE PHOTOGRAPHIC BACKGROUND (Yelp Immersive Style)
          Smooth 800ms crossfade with subtle scale effect and next-image preloading
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 transform-gpu">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const isNext = index === (currentSlide + 1) % slideCount;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-800 ease-in-out will-change-[opacity] motion-reduce:transition-none ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.category}
                fill
                priority={index === 0 || isNext}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out will-change-transform motion-reduce:transition-none ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Yelp-style Asymmetric Gradient Overlay:
            Rich dark navy vignette on the left where text and search form sit,
            leaving the center-right of the photograph clearly visible */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#14213D]/95 via-[#14213D]/75 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#14213D]/85 via-transparent to-[#14213D]/40 pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO MAIN CONTENT (Clean, Open Yelp Composition - Prominent Search)
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl text-left space-y-4">
          
          {/* Synchronized Dynamic Header Content with smooth 500ms transition */}
          <div
            key={activeSlide.id}
            className="animate-in fade-in duration-500 ease-out space-y-3.5 motion-reduce:animate-none"
          >
            {/* Left-Aligned Category Label Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-white/25 shadow-xs">
              <activeSlide.icon className="w-3.5 h-3.5 text-[#F4A261]" />
              <span>Featured: {activeSlide.category}</span>
            </div>

            {/* Large Confident Left-Aligned Headline with Display Font Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
              <span>{activeSlide.headlineRegular}</span>
              <span
                className="font-display italic ml-1 sm:ml-2 block sm:inline transition-colors duration-500"
                style={{ color: activeSlide.accentColor }}
              >
                {activeSlide.headlineAccent}
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-xs">
              {activeSlide.supportingText}
            </p>
          </div>

          {/* Prominent White Search Bar Component (Preserves focus during slide changes) */}
          <div className="pt-2 max-w-2xl w-full cursor-default select-text">
            <SearchBar initialLocation="All Bangalore" />

            {/* Popular search suggestions */}
            <div className="mt-3.5 flex items-center gap-2 flex-wrap text-xs text-slate-200">
              <span className="font-semibold text-white">Popular:</span>
              {[
                { label: 'Specialty Coffee', cat: 'Restaurants & Cafes' },
                { label: 'Dental Implants', cat: 'Healthcare' },
                { label: 'Ceramic Detailing', cat: 'Automotive Care' },
                { label: 'Organic Hair Spa', cat: 'Beauty & Wellness' },
                { label: 'Modular Interiors', cat: 'Home Services' },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={`/search?q=${encodeURIComponent(tag.label)}&category=${encodeURIComponent(tag.cat)}`}
                  className="bg-black/35 hover:bg-white/20 text-slate-100 hover:text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Compact Carousel Progress Bar Indicators */}
            <div
              className="mt-4 flex items-center gap-2"
              role="tablist"
              aria-label="Slide Indicator Progress"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                    onClick={() => goToSlide(idx)}
                    className="group py-1 focus:outline-none cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-8 h-1.5 bg-white shadow-xs'
                          : 'w-3.5 h-1.5 bg-white/40 group-hover:bg-white/70 group-hover:w-5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SLIDE CONTROLS (Compact Category Selector Pills & Arrow Controls)
          Direct click navigation available for all viewports (Mobile & Desktop)
          ========================================================================= */}
      <div className="relative z-20 border-t border-white/15 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Compact Category slide selector pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
              role="tablist"
              aria-label="Category Slides"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                const Icon = slide.icon;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goToSlide(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#14213D] shadow-md ring-2 ring-[#2A9D8F]'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#2A9D8F]' : 'text-slate-400'}`} />
                    <span>{slide.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Slide Counter & Manual Arrow Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-xs font-semibold text-slate-300">
                0{currentSlide + 1} / 0{slideCount}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#2A9D8F] text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#2A9D8F] text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
