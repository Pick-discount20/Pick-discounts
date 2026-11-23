'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ZoomIn, ZoomOut, Compass, ExternalLink, X } from 'lucide-react';
import { Business } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';

interface MapPlaceholderProps {
  businesses: Business[];
  selectedLocality?: string;
  className?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  businesses,
  selectedLocality = 'Bangalore',
  className = '',
}) => {
  const [activePin, setActivePin] = useState<Business | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Normalizing lat/lng coordinates to visual percentage positions across Bangalore viewport
  // Bounds roughly: Lat 12.90 to 13.01, Lng 77.56 to 77.76
  const minLat = 12.90;
  const maxLat = 13.02;
  const minLng = 77.55;
  const maxLng = 77.76;

  const getPosition = (coords: { lat: number; lng: number }) => {
    const x = Math.min(Math.max(((coords.lng - minLng) / (maxLng - minLng)) * 80 + 10, 8), 92);
    const y = Math.min(Math.max((1 - (coords.lat - minLat) / (maxLat - minLat)) * 80 + 10, 8), 92);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div
      className={`relative w-full h-[550px] lg:h-full min-h-[500px] bg-[#E8EDE8] rounded-2xl border border-slate-200/90 overflow-hidden shadow-inner flex flex-col ${className}`}
    >
      {/* Decorative Mock Map Vector Graphics: Roads, River, Greenery */}
      <svg
        className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3DDD3" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Arterial Road Paths representing Outer Ring Road, Hosur Road, Old Airport Road */}
        <path
          d="M 50 100 Q 200 350 450 300 T 800 200"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="10"
        />
        <path
          d="M 50 100 Q 200 350 450 300 T 800 200"
          fill="none"
          stroke="#FCE3C8"
          strokeWidth="5"
        />

        <path
          d="M 120 500 C 300 450, 400 200, 750 100"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="8"
        />
        <path
          d="M 120 500 C 300 450, 400 200, 750 100"
          fill="none"
          stroke="#FCE3C8"
          strokeWidth="4"
        />

        {/* Lakes / Parks representing Ulsoor Lake, Cubbon Park, Bellandur */}
        <ellipse cx="48%" cy="42%" rx="45" ry="30" fill="#CDE1F0" stroke="#B8D3E6" strokeWidth="2" />
        <ellipse cx="25%" cy="32%" rx="55" ry="40" fill="#D7EBD4" />
        <ellipse cx="78%" cy="58%" rx="60" ry="35" fill="#CDE1F0" stroke="#B8D3E6" strokeWidth="2" />
      </svg>

      {/* Locality labels printed on the map canvas */}
      <div className="absolute top-[28%] left-[22%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        CBD / MG Road
      </div>
      <div className="absolute top-[38%] left-[48%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        Indiranagar
      </div>
      <div className="absolute top-[58%] left-[42%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        Koramangala
      </div>
      <div className="absolute top-[72%] left-[46%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        HSR Layout
      </div>
      <div className="absolute top-[68%] left-[28%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        Jayanagar
      </div>
      <div className="absolute top-[42%] left-[78%] text-[11px] font-bold text-slate-500 tracking-wider pointer-events-none uppercase">
        Whitefield
      </div>

      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-sm flex items-center gap-2 text-xs font-semibold text-[#14213D]">
          <Compass className="w-3.5 h-3.5 text-[#2A9D8F]" />
          <span>Interactive Map ({selectedLocality})</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-sm">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            aria-label="Zoom in on map"
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#14213D] hover:bg-slate-100 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            aria-label="Zoom out on map"
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#14213D] hover:bg-slate-100 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Business Pin Markers */}
      <div
        className="relative w-full h-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {businesses.map((biz) => {
          const pos = getPosition(biz.coordinates);
          const isSelected = activePin?.id === biz.id;

          return (
            <div
              key={biz.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-full transform transition-all duration-200"
              style={pos}
            >
              <button
                type="button"
                onClick={() => setActivePin(isSelected ? null : biz)}
                className={`group flex items-center gap-1 px-2.5 py-1 rounded-full shadow-md font-bold text-xs transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? 'bg-[#14213D] text-white ring-4 ring-[#2A9D8F]/50 scale-110 z-30'
                    : 'bg-white text-[#14213D] hover:bg-[#2A9D8F] hover:text-white hover:scale-105'
                }`}
                title={biz.name}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F4A261]' : 'text-[#2A9D8F] group-hover:text-white'}`} />
                <span className="truncate max-w-[90px]">{biz.priceRange} • {biz.rating}★</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Business Detail Card Popup on Marker Click */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 z-30 max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 flex gap-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
            <Image
              src={activePin.primaryImage}
              alt={activePin.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A9D8F]">
                  {activePin.subcategory}
                </span>
                <h4 className="text-sm font-bold text-[#14213D] truncate mt-0.5">
                  {activePin.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Close pin preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={activePin.rating} showScore={true} size="sm" />
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600">{activePin.locality}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
              <span className="text-xs font-semibold text-[#2A9D8F]">
                {activePin.isOpenNow ? '● Open Now' : '○ Closed Now'}
              </span>

              <Link
                href={`/business/${activePin.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#14213D] hover:text-[#2A9D8F]"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom map information pill */}
      <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] text-slate-500 border border-slate-200/80 pointer-events-none">
        Interactive Map View • Click any pin to inspect listing
      </div>
    </div>
  );
};
