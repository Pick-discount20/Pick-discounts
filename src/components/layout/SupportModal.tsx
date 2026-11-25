'use client';

import React from 'react';
import { X, Mail, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { WHATSAPP_SUPPORT_CONFIG, getWhatsAppSupportUrl } from '@/config/support';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const whatsappUrl = getWhatsAppSupportUrl();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-dialog-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-[#14213D]"
      >
        {/* Header Banner */}
        <div className="bg-[#17243B] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close support dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
              <WhatsAppIcon className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 id="support-dialog-title" className="text-base font-bold text-white leading-tight">
                Pick Discount Support
              </h2>
              <p className="text-xs text-slate-300">
                Direct assistance for consumers & business owners
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {whatsappUrl ? (
            /* Live WhatsApp Connection Enabled */
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our customer care representatives via WhatsApp for rapid answers regarding verified listings, claims, or feedback.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors shadow-md text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          ) : (
            /* Pending Number Configuration State */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Official Support Channel Notice</span>
                </div>
                <p>
                  Pick Discount&apos;s verified WhatsApp customer service channel is currently being provisioned for commercial operations.
                </p>
                <p className="text-[11px] text-amber-800">
                  Once platform administrators connect the business number, you will be able to initiate direct WhatsApp messaging with one click.
                </p>
              </div>

              {/* Direct Alternative Contacts */}
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Email</span>
                    <a href={`mailto:${WHATSAPP_SUPPORT_CONFIG.supportEmail}`} className="font-semibold text-[#14213D] hover:underline">
                      {WHATSAPP_SUPPORT_CONFIG.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-[#F4A261] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating Hours</span>
                    <span className="font-medium text-slate-700">
                      {WHATSAPP_SUPPORT_CONFIG.operatingHours}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
