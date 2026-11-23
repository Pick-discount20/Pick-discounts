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
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { getAssetPath } from '@/utils/assetPath';

interface HeroSlide {
  id: string;
  category: string;
  shortLabel: string;
  icon: LucideIcon;
  image: string;
  headlineRegular: string;
  headlineAccent: string;
  supportingText: string;
  queryParam: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'dining',
    category: 'Restaurants & Cafes',
    shortLabel: 'Dining',
    icon: UtensilsCrossed,
    image: getAssetPath('/images/hero/dining.jpg'),
    headlineRegular: 'Discover Places ',
    headlineAccent: 'Worth Experiencing.',
    supportingText: 'Find exceptional restaurants, curated cafes and authentic culinary destinations verified for quality.',
    queryParam: 'Restaurants & Cafes',
  },
  {
    id: 'healthcare',
    category: 'Healthcare & Clinics',
    shortLabel: 'Healthcare',
    icon: Stethoscope,
    image: getAssetPath('/images/hero/healthcare.jpg'),
    headlineRegular: 'Find Care ',
    headlineAccent: 'You Can Trust.',
    supportingText: 'Connect with certified doctors, diagnostic centres and licensed medical specialists with verified credentials.',
    queryParam: 'Healthcare & Clinics',
  },
  {
    id: 'beauty',
    category: 'Beauty & Wellness',
    shortLabel: 'Wellness',
    icon: Sparkles,
    image: getAssetPath('/images/hero/beauty.jpg'),
    headlineRegular: 'Make Time for a ',
    headlineAccent: 'Better You.',
    supportingText: 'Explore top-rated luxury spas, modern salons and wellness therapists rated for hygiene and service.',
    queryParam: 'Beauty & Wellness',
  },
  {
    id: 'home',
    category: 'Home Services',
    shortLabel: 'Home Care',
    icon: Home,
    image: getAssetPath('/images/hero/home.jpg'),
    headlineRegular: 'Find the Right Experts ',
    headlineAccent: 'for Your Home.',
    supportingText: 'Book background-checked electricians, licensed contractors and verified interior specialists.',
    queryParam: 'Home Services',
  },
  {
    id: 'automotive',
    category: 'Automotive Care',
    shortLabel: 'Automotive',
    icon: Car,
    image: getAssetPath('/images/hero/automotive.jpg'),
    headlineRegular: 'Keep Moving ',
    headlineAccent: 'with Confidence.',
    supportingText: 'Discover trusted mechanics, precision diagnostic garages and verified ceramic detailing studios.',
    queryParam: 'Automotive Care',
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

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

  // Jump to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Autoplay management: transitions every 5s, pauses on hover, respects reduced motion
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
      className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-center overflow-hidden isolate text-white select-none"
      aria-roledescription="carousel"
      aria-label="Featured Local Business Highlights"
    >
      {/* =========================================================================
          FULL-WIDTH EDGE-TO-EDGE PHOTOGRAPHIC BACKGROUND (Yelp Immersive Style)
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
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out will-change-transform motion-reduce:transition-none ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Controlled Asymmetric Dark Gradient: Left dark for text contrast, right open for photographic clarity */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#17243B]/92 via-[#17243B]/65 via-50% to-[#17243B]/25 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#17243B]/75 via-transparent to-[#17243B]/40 pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO MAIN CONTENT CONTAINER (Yelp Balanced International Layout)
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-32 pb-16 flex items-center justify-between gap-8">
        
        {/* Left Column: Heading, Description, CTA, and Slide Indicators */}
        <div className="max-w-2xl text-left space-y-6">
          
          {/* Synchronized Dynamic Header Content with smooth 500ms fade */}
          <div
            key={activeSlide.id}
            className="animate-in fade-in duration-500 ease-out space-y-4 motion-reduce:animate-none"
          >
            {/* Small Featured Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-md text-xs font-semibold uppercase tracking-wider border border-white/20 shadow-xs">
              <activeSlide.icon className="w-3.5 h-3.5 text-[#E66B45]" />
              <span>Featured: {activeSlide.category}</span>
            </div>

            {/* Campaign Heading: Sans-serif bold with editorial serif italic accent word */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14] drop-shadow-sm">
              <span>{activeSlide.headlineRegular}</span>
              <span className="font-display italic text-[#E66B45] ml-1 sm:ml-2 inline transition-colors duration-500">
                {activeSlide.headlineAccent}
              </span>
            </h1>

            {/* Category Supporting Description */}
            <p className="text-base sm:text-lg text-slate-100/90 font-normal leading-relaxed max-w-xl">
              {activeSlide.supportingText}
            </p>

            {/* One Prominent CTA Button (No competing second button) */}
            <div className="pt-2">
              <Link
                href={`/search?category=${encodeURIComponent(activeSlide.queryParam)}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#E66B45] hover:bg-[#d85d37] text-white transition-all shadow-md hover:shadow-xl focus:ring-2 focus:ring-[#E66B45]/50 group"
              >
                <span>Browse {activeSlide.category}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Vertical/Horizontal Slide Progress Indicators: Clean, clickable, restrained */}
          <div className="pt-4 flex items-center gap-4">
            <div
              className="flex items-center gap-2"
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
                    className="group py-2 focus:outline-none cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-8 h-1.5 bg-[#E66B45] shadow-xs'
                          : 'w-3 h-1.5 bg-white/40 group-hover:bg-white/70 group-hover:w-5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Subtle Slide Prev/Next Arrow Controls */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Area: Intentionally spacious and uncluttered so the photograph shines through */}
        <div className="hidden lg:block flex-1 max-w-sm pointer-events-none" />
      </div>
    </section>
  );
};
