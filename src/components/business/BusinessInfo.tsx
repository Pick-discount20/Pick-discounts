import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  Building,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Business } from '@/types';

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#14213D] mb-3">About the Business</h2>
        <p className="text-sm text-slate-700 leading-relaxed font-normal">
          {business.description}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-600 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2A9D8F]" />
            <span>Established in {business.establishedYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#14213D]" />
            <span>Category: {business.category}</span>
          </div>
          {business.claimedBy && (
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
              <span>Verified Owner Managed ({business.claimedBy})</span>
            </div>
          )}
        </div>
      </section>

      {/* Services & Offerings */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#14213D] mb-4">Services & Key Offerings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {business.services.map((service, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <CheckCircle className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities & Facility Highlights */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#14213D] mb-4">Amenities & Features</h2>
        <div className="flex flex-wrap gap-2">
          {business.amenities.map((amenity, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2A9D8F]/10 text-[#14213D] border border-[#2A9D8F]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]" />
              {amenity}
            </span>
          ))}
        </div>
      </section>

      {/* Operating Hours Table */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#2A9D8F]" />
          <h2 className="text-lg font-bold text-[#14213D]">Operating Hours</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {business.hours.map((h, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">{h.day}</span>
              <span className={`font-medium ${h.isClosed ? 'text-rose-600' : 'text-slate-800'}`}>
                {h.isClosed ? 'Closed' : `${h.open} — ${h.close}`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Verified Address */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#14213D] mb-3">Address & Direct Contact</h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#F4A261] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#14213D]">{business.address}</p>
              <p className="text-slate-500 mt-0.5">
                {business.locality}, {business.city} — {business.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#2A9D8F] shrink-0" />
            <span className="font-medium">{business.phone}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{business.email}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
