import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-200">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-[#2A9D8F] animate-spin" />
      </div>
      <p className="text-xs font-semibold text-slate-500 mt-4 tracking-wide">
        Loading directory...
      </p>
    </div>
  );
}
