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
  heading: string;
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
    heading: 'Discover Places Worth Experiencing',
    supportingText: 'Find authentic local dining, curated cafes and culinary destinations verified for quality.',
    queryParam: 'Restaurants & Cafes',
  },
  {
    id: 'healthcare',
    category: 'Healthcare & Clinics',
    shortLabel: 'Healthcare',
    icon: Stethoscope,
    image: getAssetPath('/images/hero/healthcare.jpg'),
    heading: 'Find Care You Can Trust',
    supportingText: 'Connect with certified doctors, diagnostic centres and licensed medical specialists with verified credentials.',
    queryParam: 'Healthcare & Clinics',
  },
  {
    id: 'beauty',
    category: 'Beauty & Wellness',
    shortLabel: 'Wellness',
    icon: Sparkles,
    image: getAssetPath('/images/hero/beauty.jpg'),
    heading: 'Make Time for a Better You',
    supportingText: 'Explore top-rated luxury spas, modern hair salons and holistic wellness therapists.',
    queryParam: 'Beauty & Wellness',
  },
  {
    id: 'home',
    category: 'Home Services',
    shortLabel: 'Home Care',
    icon: Home,
    image: getAssetPath('/images/hero/home.jpg'),
    heading: 'Find the Right Experts for Your Home',
    supportingText: 'Book verified electricians, licensed contractors, plumbers and bespoke interior specialists.',
    queryParam: 'Home Services',
  },
  {
    id: 'automotive',
    category: 'Automotive Care',
    shortLabel: 'Automotive',
    icon: Car,
    image: getAssetPath('/images/hero/automotive.jpg'),
    heading: 'Keep Moving with Confidence',
    supportingText: 'Discover trusted mechanics, precision diagnostic garages and verified ceramic detailing studios.',
    queryParam: 'Automotive Care',
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide for natural reading pace

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

  // Autoplay management: transitions every 4s, pauses on hover, respects reduced motion
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
      className="relative w-full min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center overflow-hidden isolate text-white select-none"
      aria-roledescription="carousel"
      aria-label="Featured Local Business Highlights"
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
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out will-change-transform motion-reduce:transition-none ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* =======================================================================
            RESTRAINED BALANCED OVERLAY (YELP-INSPIRED)
            Subtle balanced overlay allowing the photograph to shine through edge-to-edge.
            No heavy one-sided blue gradients; provides clean contrast for white text.
            ======================================================================= */}
        <div className="absolute inset-0 z-10 bg-slate-950/25 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20 pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO MAIN CONTENT (Left-Aligned, Simple & Concise)
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-36 pb-20 flex items-center justify-between gap-8">
        
        {/* Left-Aligned Content Column */}
        <div className="max-w-2xl text-left space-y-5">
          
          {/* Synchronized Dynamic Header Content with smooth 500ms fade */}
          <div
            key={activeSlide.id}
            className="animate-in fade-in duration-500 ease-out space-y-4 motion-reduce:animate-none"
          >
            {/* 1. Small Category Label Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-white backdrop-blur-md text-xs font-semibold uppercase tracking-wider border border-white/20 shadow-xs">
              <activeSlide.icon className="w-3.5 h-3.5 text-[#E66B45]" />
              <span>Featured: {activeSlide.category}</span>
            </div>

            {/* 2. Concise Heading (Single Sans-Serif Font, Bold Hierarchy) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
              {activeSlide.heading}
            </h1>

            {/* 3. Short Supporting Description */}
            <p className="text-sm sm:text-base lg:text-lg text-white/95 font-normal leading-relaxed max-w-xl drop-shadow-sm">
              {activeSlide.supportingText}
            </p>

            {/* 4. One Primary Action Button (No competing second button) */}
            <div className="pt-2">
              <Link
                href={`/search?category=${encodeURIComponent(activeSlide.queryParam)}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#E66B45] hover:bg-[#d85d37] text-white transition-all shadow-md hover:shadow-xl focus:ring-2 focus:ring-[#E66B45]/50 group"
              >
                <span>Explore {activeSlide.category}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Slide Progress Indicators & Subtle Arrow Controls */}
          <div className="pt-3 flex items-center gap-4">
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
                className="w-7 h-7 rounded-lg bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-7 h-7 rounded-lg bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Area: Intentionally spacious so the photograph shines through cleanly */}
        <div className="hidden lg:block flex-1 max-w-sm pointer-events-none" />
      </div>
    </section>
  );
};
