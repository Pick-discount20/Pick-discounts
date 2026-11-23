'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BusinessGalleryProps {
  primaryImage: string;
  galleryImages: string[];
  businessName: string;
}

export const BusinessGallery: React.FC<BusinessGalleryProps> = ({
  primaryImage,
  galleryImages,
  businessName,
}) => {
  const allImages = [primaryImage, ...galleryImages];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* 5-Photo Hero Grid Layout (Yelp / Airbnb / Booking style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-[340px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-100">
        {/* Main Hero Photo (Takes 2 cols on md) */}
        <div
          onClick={() => setLightboxIndex(0)}
          className="relative md:col-span-2 h-full cursor-pointer group overflow-hidden"
        >
          <Image
            src={allImages[0]}
            alt={`${businessName} primary photograph`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Supporting Grid Photos */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2.5 h-full">
          {allImages.slice(1, 5).map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx + 1)}
              className="relative h-[202px] cursor-pointer group overflow-hidden bg-slate-200"
            >
              <Image
                src={imgUrl}
                alt={`${businessName} gallery photograph ${idx + 2}`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating "View all photos" button */}
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#14213D] px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 border border-slate-200 transition-all hover:scale-105"
      >
        <Camera className="w-4 h-4 text-[#2A9D8F]" />
        <span>View all {allImages.length} photos</span>
      </button>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full flex items-center justify-between text-white max-w-5xl py-2">
            <span className="text-sm font-semibold">
              {businessName} — Photo {lightboxIndex + 1} of {allImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close photo gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
            <Image
              src={allImages[lightboxIndex]}
              alt={`${businessName} full preview`}
              fill
              className="object-contain"
            />

            {/* Lightbox Nav Prev / Next */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : allImages.length - 1))
                  }
                  className="absolute left-2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-xs"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev! < allImages.length - 1 ? prev! + 1 : 0))
                  }
                  className="absolute right-2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-xs"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails strip at bottom */}
          <div className="flex gap-2 overflow-x-auto py-3 max-w-md">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  lightboxIndex === i ? 'border-[#2A9D8F] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
