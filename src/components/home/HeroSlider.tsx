'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Pause,
  Play,
  LucideIcon,
  UtensilsCrossed,
  Stethoscope,
  Sparkles,
  Home,
  Car,
} from 'lucide-react';
import { getAssetPath } from '@/utils/assetPath';

interface HeroSlide {
  id: string;
  category: string;
  heading: string;
  supportingText: string;
  ctaText: string;
  queryParam: string;
  image: string;
  icon: LucideIcon;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'home',
    category: 'Home Services',
    heading: 'The gift of a clean home',
    supportingText: 'Verified cleaners, electricians and bespoke home specialists.',
    ctaText: 'Home Cleaner',
    queryParam: 'Home Services',
    image: getAssetPath('/images/hero/home.jpg'),
    icon: Home,
  },
  {
    id: 'dining',
    category: 'Restaurants & Cafes',
    heading: 'A night out to remember',
    supportingText: 'Top-rated authentic dining, curated cafes and culinary destinations.',
    ctaText: 'Fine Dining',
    queryParam: 'Restaurants & Cafes',
    image: getAssetPath('/images/hero/dining.jpg'),
    icon: UtensilsCrossed,
  },
  {
    id: 'healthcare',
    category: 'Healthcare & Clinics',
    heading: 'Find care you can trust',
    supportingText: 'Certified doctors, sterile clinics and licensed dental specialists.',
    ctaText: 'Dentists & Clinics',
    queryParam: 'Healthcare & Clinics',
    image: getAssetPath('/images/hero/healthcare.jpg'),
    icon: Stethoscope,
  },
  {
    id: 'beauty',
    category: 'Beauty & Wellness',
    heading: 'Make time for a better you',
    supportingText: 'Explore luxury spas, modern hair salons and holistic wellness therapists.',
    ctaText: 'Spas & Salons',
    queryParam: 'Beauty & Wellness',
    image: getAssetPath('/images/hero/beauty.jpg'),
    icon: Sparkles,
  },
  {
    id: 'automotive',
    category: 'Automotive Care',
    heading: 'Keep moving with confidence',
    supportingText: 'Precision diagnostic garages, trusted mechanics and ceramic studios.',
    ctaText: 'Auto Service',
    queryParam: 'Automotive Care',
    image: getAssetPath('/images/hero/automotive.jpg'),
    icon: Car,
  },
];

const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds per slide (Yelp timing)

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Advance to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  // Jump to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Autoplay management
  useEffect(() => {
    if (!isPlaying || isHovered) {
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
  }, [currentSlide, isPlaying, isHovered, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-screen min-h-[640px] flex items-end overflow-hidden isolate text-white select-none"
      aria-roledescription="carousel"
      aria-label="Featured Local Businesses"
    >
      {/* =========================================================================
          FULL-SCREEN 100VH PHOTOGRAPHIC BACKGROUND
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
                className={`object-cover object-center transition-transform duration-[8000ms] ease-out will-change-transform motion-reduce:transition-none ${
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
        <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO CONTENT ROW: VERTICAL SLIDE INDICATORS + YELP CAPTION & CTA
          Positioned with balanced vertical spacing below the homepage navigation bar
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-28 sm:pb-36 lg:pb-48">
        <div className="flex items-center gap-6 sm:gap-8 max-w-3xl">
          
          {/* =====================================================================
              YELP-INSPIRED VERTICAL SLIDE INDICATORS (Left-aligned)
              ===================================================================== */}
          <div
            className="flex flex-col items-center gap-2.5 shrink-0"
            role="tablist"
            aria-label="Slideshow progress indicators"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
                  onClick={() => goToSlide(idx)}
                  className="group py-1 focus:outline-none cursor-pointer"
                >
                  <span
                    className={`block w-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'h-9 sm:h-11 bg-white shadow-lg'
                        : 'h-6 sm:h-7 bg-white/35 group-hover:bg-white/70 group-hover:h-8'
                    }`}
                  />
                </button>
              );
            })}

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="mt-2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 focus:outline-none"
              title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 text-white/90" />
              ) : (
                <Play className="w-3 h-3 text-white/90 ml-0.5" />
              )}
            </button>
          </div>

          {/* =====================================================================
              HERO CAPTION & COMPACT RED/CORAL CTA (Yelp Visual Hierarchy)
              ===================================================================== */}
          <div
            key={activeSlide.id}
            className="space-y-4 animate-in fade-in duration-500 ease-out motion-reduce:animate-none min-w-0"
          >
            {/* 1. Large, Bold, White Sans-Serif Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
              {activeSlide.heading}
            </h1>

            {/* 2. Short Supporting Caption */}
            <p className="text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl drop-shadow-sm">
              {activeSlide.supportingText}
            </p>

            {/* 3. One Compact Red/Coral CTA Button */}
            <div className="pt-2">
              <Link
                href={`/search?category=${encodeURIComponent(activeSlide.queryParam)}`}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#E66B45] hover:bg-[#d85d37] text-white transition-all shadow-lg hover:shadow-xl focus:ring-2 focus:ring-[#E66B45]/50 group"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
