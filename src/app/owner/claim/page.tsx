'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  FileCheck,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { DEMO_BUSINESSES } from '@/data/mockData';

export default function ClaimBusinessPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 5 Steps: 1: Find Biz, 2: Owner Info, 3: Biz Details, 4: Evidence Docs, 5: Review & Submit
  const [step, setStep] = useState(1);

  // Form State
  const [selectedBizId, setSelectedBizId] = useState('biz-010'); // Default to Lavelle Physio (unclaimed)
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerName, setOwnerName] = useState('Dr. Anand Ramanathan');
  const [ownerEmail, setOwnerEmail] = useState('anand.physio@example.com');
  const [ownerPhone, setOwnerPhone] = useState('+91 98450 12890');
  const [designation, setDesignation] = useState('Managing Director & Lead Therapist');

  const [tradeName, setTradeName] = useState('Lavelle Physio & Sports Recovery');
  const [regNumber, setRegNumber] = useState('KA-BNG-MED-2021-8891');
  const [address, setAddress] = useState('12, Lavelle Road, Shanthala Nagar, Bangalore — 560001');

  const [evidenceType, setEvidenceType] = useState('registration_certificate');
  const [uploadedFileName, setUploadedFileName] = useState('karnataka_clinics_reg_certificate.pdf');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedBusiness = DEMO_BUSINESSES.find((b) => b.id === selectedBizId) || DEMO_BUSINESSES[0];

  const filteredBusinesses = DEMO_BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (step === 1 && !selectedBizId) {
      alert('Please select a business to claim.');
      return;
    }
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />

      <div className="flex-1 flex">
        <DashboardSidebar
          portal="owner"
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            title="Claim an Existing Business"
            subtitle="Follow the 5-step verification process to establish ownership of your establishment."
            portal="owner"
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
            {/* Step Wizard Indicator Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { num: 1, title: 'Find Business' },
                  { num: 2, title: 'Owner Info' },
                  { num: 3, title: 'Business Info' },
                  { num: 4, title: 'Evidence' },
                  { num: 5, title: 'Verify & Submit' },
                ].map((s) => (
                  <div
                    key={s.num}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${
                      step === s.num
                        ? 'bg-[#2A9D8F]/10 text-[#2A9D8F] font-bold'
                        : step > s.num
                        ? 'text-slate-700 font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step === s.num
                          ? 'bg-[#2A9D8F] text-white'
                          : step > s.num
                          ? 'bg-[#14213D] text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span className="hidden sm:inline text-[11px]">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Confirmation Screen */}
            {isSubmitted ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-5 shadow-xl animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2A9D8F] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-extrabold text-[#14213D]">
                    Claim Submitted for Administrative Verification!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-800">{ownerName}</span>. Your claim for{' '}
                    <span className="font-semibold text-slate-800">{selectedBusiness.name}</span> has been logged into the moderation queue.
                  </p>
                </div>

                {/* Claim Reference Card */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Claim ID:</span>
                    <span className="font-bold text-[#14213D]">CLM-2026-9042</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Business Target:</span>
                    <span className="font-semibold text-slate-800">{selectedBusiness.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Document Type:</span>
                    <span className="font-semibold text-slate-800">
                      {evidenceType.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Review Timeline:</span>
                    <span className="font-bold text-[#2A9D8F]">1–2 Business Days (Manual Review)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/owner/dashboard"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#14213D] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#1E3159]"
                  >
                    Return to Owner Dashboard
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 text-[#14213D] text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-200"
                  >
                    Inspect in Admin Moderation Demo →
                  </Link>
                </div>
              </div>
            ) : (
              /* Multi-step Form Content */
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                {/* STEP 1: FIND OR IDENTIFY BUSINESS */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#14213D]">Step 1: Identify Your Business Listing</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Search existing Bangalore establishments on Peak Discount to claim an unclaimed profile.
                      </p>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by business name or locality (e.g. Lavelle Physio, Whitefield, Dental)..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                      />
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {filteredBusinesses.map((biz) => {
                        const isSelected = selectedBizId === biz.id;
                        return (
                          <div
                            key={biz.id}
                            onClick={() => setSelectedBizId(biz.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-[#2A9D8F] bg-[#2A9D8F]/5 ring-2 ring-[#2A9D8F]/20'
                                : 'border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-[#14213D]">{biz.name}</h4>
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                  {biz.verificationStatus === 'verified' ? 'Already Claimed' : 'Unclaimed Listing'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                {biz.category} • {biz.locality}, Bangalore
                              </p>
                            </div>
                            <input
                              type="radio"
                              name="selectedBiz"
                              checked={isSelected}
                              onChange={() => setSelectedBizId(biz.id)}
                              className="w-4 h-4 text-[#2A9D8F] focus:ring-[#2A9D8F]"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: OWNER / CONTACT INFO */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#14213D]">Step 2: Business Owner Information</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Please provide your contact details as an authorized representative of {selectedBusiness.name}.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Full Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Role / Designation
                        </label>
                        <input
                          type="text"
                          required
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Proprietor, Director, Store Manager"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Official Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Mobile Contact Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: BUSINESS DETAILS */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#14213D]">Step 3: Registered Business Details</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Confirm official trade details matching the registered commercial establishment.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Official Trade Name
                        </label>
                        <input
                          type="text"
                          value={tradeName}
                          onChange={(e) => setTradeName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider">
                            GSTIN or Trade Registration No. (Optional)
                          </label>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Optional verification field
                          </span>
                        </div>
                        <input
                          type="text"
                          value={regNumber}
                          onChange={(e) => setRegNumber(e.target.value)}
                          placeholder="e.g. 29ABCDE1234F1Z5 or Municipal Trade License No."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Trade license, shop establishment certificate or utility bill may be submitted if GSTIN is unavailable.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                          Physical Premises Address
                        </label>
                        <textarea
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: EVIDENCE / DOCUMENT SUBMISSION */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#14213D]">Step 4: Evidence & Document Submission</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Submit proof of establishment for administrative human moderation.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                        Select Verification Evidence Type
                      </label>
                      <select
                        value={evidenceType}
                        onChange={(e) => setEvidenceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] bg-white text-[#14213D]"
                      >
                        <option value="registration_certificate">
                          Establishment Registration Certificate (Shop & Estab / Medical Council)
                        </option>
                        <option value="utility_bill">
                          Commercial Electricity / Water Utility Bill (Past 3 months)
                        </option>
                        <option value="authorization_letter">
                          Company Board Authorization Letter / Trade License
                        </option>
                        <option value="business_card">
                          Official Business Card + Photo ID
                        </option>
                      </select>
                    </div>

                    {/* Simulated File Upload Box */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#2A9D8F] rounded-2xl p-6 text-center space-y-2 bg-slate-50/60 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-[#2A9D8F] flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-semibold text-slate-700">
                        {uploadedFileName ? (
                          <span className="text-[#2A9D8F] font-bold flex items-center justify-center gap-1">
                            <FileCheck className="w-4 h-4" />
                            {uploadedFileName} (Ready for Review)
                          </span>
                        ) : (
                          'Drag & drop or click to upload PDF/JPEG evidence'
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Max file size: 10MB. Protected by Peak Discount Confidentiality Standards.
                      </p>
                      <button
                        type="button"
                        onClick={() => setUploadedFileName('establishment_license_doc_2026.pdf')}
                        className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold hover:bg-slate-100"
                      >
                        Simulate File Selection
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & CONDITIONAL OTP DEMO */}
                {step === 5 && (
                  <form onSubmit={handleSubmitClaim} className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-[#14213D]">Step 5: Review & Confirm Submission</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Please review your submission details before dispatching to the moderation team.
                      </p>
                    </div>

                    {/* Summary Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Business Target:</span>
                        <span className="font-bold text-[#14213D]">{selectedBusiness.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Applicant:</span>
                        <span className="font-semibold text-slate-800">
                          {ownerName} ({designation})
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Contact Email & Phone:</span>
                        <span className="font-semibold text-slate-800">
                          {ownerEmail} • {ownerPhone}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Evidence File:</span>
                        <span className="font-bold text-[#2A9D8F]">{uploadedFileName}</span>
                      </div>
                    </div>

                    {/* Conditional OTP Step Explanation & Fallback Workflow */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Smartphone className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#14213D]">
                            Phone Verification: Conditional Provider-Dependent Workflow
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Live SMS phone OTP is provider-dependent and subject to external telecommunications gateway onboarding.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
                        <div className="flex items-center gap-2 font-semibold text-[#14213D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
                          <span>Primary Verification: Official Email Confirmation & Document Review</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                          Identity confirmation is established via official email (<span className="font-semibold text-slate-700">{ownerEmail}</span>) and manual evidence inspection by platform administrators.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Back to Evidence
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#2A9D8F] hover:bg-[#21766C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Submit Claim to Moderation</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Step Navigation Controls (for steps 1-4) */}
                {step < 5 && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={step === 1}
                      onClick={handlePrev}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-[#14213D] hover:bg-[#1E3159] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
