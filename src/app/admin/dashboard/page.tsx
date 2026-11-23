'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { Modal } from '@/components/common/Modal';
import {
  DEMO_BUSINESSES,
  DEMO_CLAIMS,
  DEMO_REPORTS,
  DEMO_AUDIT_LOGS,
} from '@/data/mockData';
import { ClaimRequest, ModerationReport, AuditLog, Business, BusinessStatus } from '@/types';

export default function AdminDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'claims' | 'moderation' | 'audit'>('overview');

  // Interactive Frontend States
  const [businesses, setBusinesses] = useState<Business[]>(DEMO_BUSINESSES);
  const [claims, setClaims] = useState<ClaimRequest[]>(DEMO_CLAIMS);
  const [reports, setReports] = useState<ModerationReport[]>(DEMO_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(DEMO_AUDIT_LOGS);

  // Selected Claim for Inspection Modal
  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [moreInfoText, setMoreInfoText] = useState('');

  // Toast feedback
  const [adminToast, setAdminToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  // Claim actions
  const handleApproveClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'approved' } : c))
    );
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: 'Just now',
      adminName: 'Sneha Rao (Admin)',
      action: 'CLAIM_APPROVED',
      targetType: 'claim',
      targetId: claimId,
      targetName: selectedClaim?.businessName || 'Business Claim',
      details: 'Approved trade evidence documents and verified owner credentials.',
    };
    setAuditLogs([newLog, ...auditLogs]);
    setClaimModalOpen(false);
    showToast(`[Demo Action] Claim ${claimId} approved. Audit trail updated.`);
  };

  const handleRejectClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'rejected' } : c))
    );
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: 'Just now',
      adminName: 'Sneha Rao (Admin)',
      action: 'CLAIM_REJECTED',
      targetType: 'claim',
      targetId: claimId,
      targetName: selectedClaim?.businessName || 'Business Claim',
      details: 'Rejected claim due to unverified trade documentation.',
    };
    setAuditLogs([newLog, ...auditLogs]);
    setClaimModalOpen(false);
    showToast(`[Demo Action] Claim ${claimId} marked as Rejected.`);
  };

  const handleRequestMoreInfo = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'more_info_needed', notes: moreInfoText || c.notes } : c))
    );
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: 'Just now',
      adminName: 'Sneha Rao (Admin)',
      action: 'CLAIM_MORE_INFO_REQUESTED',
      targetType: 'claim',
      targetId: claimId,
      targetName: selectedClaim?.businessName || 'Business Claim',
      details: `Clarification requested: ${moreInfoText || 'Supplemental proof of trade required'}`,
    };
    setAuditLogs([newLog, ...auditLogs]);
    setClaimModalOpen(false);
    showToast(`[Demo Action] Requested additional documentation for claim ${claimId}.`);
  };

  // Report actions
  const handleDismissReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'dismissed' } : r))
    );
    showToast('[Demo Action] Report dismissed as non-violating.');
  };

  const handleRemoveReportedReview = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'actioned' } : r))
    );
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: 'Just now',
      adminName: 'Sneha Rao (Admin)',
      action: 'REVIEW_REMOVED',
      targetType: 'review',
      targetId: reportId,
      targetName: 'Flagged Customer Review',
      details: 'Review removed for violation of spam or offensive language policy.',
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast('Flagged review removed from public view.');
  };

  // Change listing status demo
  const handleChangeListingStatus = (bizId: string, newStatus: BusinessStatus) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === bizId ? { ...b, listingStatus: newStatus } : b))
    );
    showToast(`[Demo Action] Listing status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />

      <div className="flex-1 flex">
        <DashboardSidebar
          portal="admin"
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            title="Admin Moderation Console"
            subtitle="Management console for business listings, ownership claims, reviews, and audit logs."
            portal="admin"
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />

          {/* Floating Admin Toast */}
          {adminToast && (
            <div className="fixed top-20 right-6 z-50 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-2 duration-200">
              <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
              <span>{adminToast}</span>
            </div>
          )}

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Console Overview' },
                { id: 'claims', label: `Claims Review (${claims.filter(c => c.status === 'pending').length})` },
                { id: 'listings', label: `Listings (${businesses.length})` },
                { id: 'moderation', label: `Reported Reviews (${reports.filter(r => r.status === 'pending').length})` },
                { id: 'audit', label: 'Audit Trail' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'listings' | 'claims' | 'moderation' | 'audit')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#14213D] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-[#14213D] border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: CONSOLE OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stat KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    label="Total Listings"
                    value={businesses.length}
                    subtext="All Bangalore active records"
                    icon={Building2}
                    accentColor="navy"
                  />
                  <StatCard
                    label="Pending Claims"
                    value={claims.filter((c) => c.status === 'pending').length}
                    subtext="Awaiting evidence verification"
                    icon={ShieldCheck}
                    accentColor="orange"
                  />
                  <StatCard
                    label="Approved Listings"
                    value={businesses.filter((b) => b.listingStatus === 'approved').length}
                    subtext="Live on customer search"
                    icon={CheckCircle2}
                    accentColor="teal"
                  />
                  <StatCard
                    label="Reported Content"
                    value={reports.filter((r) => r.status === 'pending').length}
                    subtext="Queued for spam/abuse review"
                    icon={ShieldAlert}
                    accentColor="slate"
                  />
                </div>

                {/* Quick Claims Alert Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#14213D]">
                        High Priority Claims Awaiting Review
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Applicants have uploaded trade evidence and premise verification bills.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('claims')}
                      className="text-xs font-bold text-[#2A9D8F] hover:underline"
                    >
                      View All Claims →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {claims.map((claim) => (
                      <div
                        key={claim.id}
                        className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#14213D] text-sm">
                              {claim.businessName}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                claim.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : claim.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : claim.status === 'more_info_needed'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {claim.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-slate-500">
                            Claimed by <strong>{claim.claimantName}</strong> ({claim.designation}) • Submitted {claim.submittedAt}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedClaim(claim);
                            setClaimModalOpen(true);
                          }}
                          className="px-3.5 py-1.5 bg-[#14213D] hover:bg-[#1E3159] text-white font-bold rounded-lg transition-colors w-fit"
                        >
                          Inspect Claim
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moderation Queue Quick Preview */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#14213D]">
                        Flagged Reviews Queue
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Community reported content flagged for violation of review authenticity standards.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('moderation')}
                      className="text-xs font-bold text-[#2A9D8F] hover:underline"
                    >
                      Open Moderation Queue →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {reports.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#14213D]">{rep.businessName}</span>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded uppercase">
                              {rep.reason.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-slate-600 italic">
                            &ldquo;{rep.reviewPreview.comment}&rdquo;
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            Reported by {rep.reportedBy} • {rep.reportedAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {rep.status === 'pending' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleDismissReport(rep.id)}
                                className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
                              >
                                Dismiss
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveReportedReview(rep.id)}
                                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold"
                              >
                                Remove Review
                              </button>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              {rep.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CLAIMS REVIEW */}
            {activeTab === 'claims' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#14213D]">
                      Business Ownership Claims Queue
                    </h2>
                    <p className="text-xs text-slate-500">
                      Audit submitted government licenses, electricity bills, and applicant authorization.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                        <th className="py-2.5 font-bold">Business Name</th>
                        <th className="py-2.5 font-bold">Claimant</th>
                        <th className="py-2.5 font-bold">Evidence File</th>
                        <th className="py-2.5 font-bold">Submitted Date</th>
                        <th className="py-2.5 font-bold">Status</th>
                        <th className="py-2.5 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {claims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-slate-50/70">
                          <td className="py-3 font-bold text-[#14213D]">{claim.businessName}</td>
                          <td className="py-3 text-slate-700">
                            <div>{claim.claimantName}</div>
                            <div className="text-[10px] text-slate-400">{claim.designation}</div>
                          </td>
                          <td className="py-3 text-[#2A9D8F] font-mono text-[11px]">
                            {claim.evidenceFileName}
                          </td>
                          <td className="py-3 text-slate-500">{claim.submittedAt}</td>
                          <td className="py-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                claim.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : claim.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : claim.status === 'more_info_needed'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {claim.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedClaim(claim);
                                setClaimModalOpen(true);
                              }}
                              className="px-3 py-1 bg-[#14213D] text-white rounded-lg hover:bg-[#1E3159] font-bold text-xs"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: BUSINESS LISTING MANAGEMENT */}
            {activeTab === 'listings' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#14213D]">
                      Bangalore Directory Records ({businesses.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage public visibility, operational standing, and manual overrides.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                        <th className="py-2.5 font-bold">Business</th>
                        <th className="py-2.5 font-bold">Category</th>
                        <th className="py-2.5 font-bold">Locality</th>
                        <th className="py-2.5 font-bold">Listing Status</th>
                        <th className="py-2.5 font-bold">Verification</th>
                        <th className="py-2.5 font-bold text-right">Moderation Override</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {businesses.map((biz) => (
                        <tr key={biz.id} className="hover:bg-slate-50/70">
                          <td className="py-3 font-bold text-[#14213D]">
                            <Link href={`/business/${biz.slug}`} target="_blank" className="hover:underline flex items-center gap-1">
                              <span>{biz.name}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </Link>
                          </td>
                          <td className="py-3 text-slate-600">{biz.category}</td>
                          <td className="py-3 text-slate-600">{biz.locality}</td>
                          <td className="py-3">
                            <StatusBadge status={biz.listingStatus} size="sm" />
                          </td>
                          <td className="py-3">
                            <VerificationBadge status={biz.verificationStatus} size="sm" />
                          </td>
                          <td className="py-3 text-right">
                            <select
                              value={biz.listingStatus}
                              onChange={(e) =>
                                handleChangeListingStatus(biz.id, e.target.value as BusinessStatus)
                              }
                              className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-[#14213D]"
                            >
                              <option value="approved">Approved</option>
                              <option value="pending">Pending</option>
                              <option value="draft">Draft</option>
                              <option value="rejected">Rejected</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: REVIEW MODERATION */}
            {activeTab === 'moderation' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-[#14213D]">
                    Reported Reviews Moderation Queue
                  </h2>
                  <p className="text-xs text-slate-500">
                    Investigate customer and business claims of fake, defamatory, or competitor spam.
                  </p>
                </div>

                <div className="space-y-4">
                  {reports.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#14213D] text-sm">
                              {rep.businessName}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                              Reason: {rep.reason.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Reported by <strong>{rep.reportedBy}</strong> on {rep.reportedAt}
                          </p>
                        </div>

                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md ${
                            rep.status === 'actioned'
                              ? 'bg-rose-100 text-rose-800'
                              : rep.status === 'dismissed'
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          Status: {rep.status}
                        </span>
                      </div>

                      {/* Flagged Review Content */}
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span>Reviewer: {rep.reviewPreview.reviewerName}</span>
                          <span>Rating: {rep.reviewPreview.rating}★</span>
                        </div>
                        <p className="italic font-medium">&ldquo;{rep.reviewPreview.comment}&rdquo;</p>
                      </div>

                      {/* Reporter Explanation */}
                      <div className="text-xs text-slate-600 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                        <strong>Reporter&apos;s Stated Concern:</strong> {rep.explanation}
                      </div>

                      {/* Actions */}
                      {rep.status === 'pending' && (
                        <div className="pt-2 flex items-center justify-end gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleDismissReport(rep.id)}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                          >
                            Dismiss Report
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveReportedReview(rep.id)}
                            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
                          >
                            Remove Inappropriate Review
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: AUDIT LOGS */}
            {activeTab === 'audit' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-[#14213D]">
                    System Moderation & Audit History
                  </h2>
                  <p className="text-xs text-slate-500">
                    Transparent log of administrative approvals, removals, and compliance interventions.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                        <th className="py-2.5 font-bold">Timestamp</th>
                        <th className="py-2.5 font-bold">Admin Officer</th>
                        <th className="py-2.5 font-bold">Action Code</th>
                        <th className="py-2.5 font-bold">Target Target</th>
                        <th className="py-2.5 font-bold">Audit Action Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70">
                          <td className="py-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                          <td className="py-3 font-semibold text-[#14213D]">{log.adminName}</td>
                          <td className="py-3">
                            <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3 font-medium text-slate-800">{log.targetName}</td>
                          <td className="py-3 text-slate-600 text-xs max-w-sm">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Claim Inspection & Moderation Modal */}
      {selectedClaim && (
        <Modal
          isOpen={claimModalOpen}
          onClose={() => setClaimModalOpen(false)}
          title={`Audit Claim: ${selectedClaim.businessName}`}
          subtitle={`Claim Reference ID: ${selectedClaim.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Applicant Details */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-[#14213D] uppercase tracking-wider text-[11px]">
                Applicant & Contact Credentials
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400">Name:</span> <strong>{selectedClaim.claimantName}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Designation:</span> <strong>{selectedClaim.designation}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Email:</span> {selectedClaim.claimantEmail}
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span> {selectedClaim.claimantPhone}
                </div>
                {selectedClaim.businessRegNumber && (
                  <div className="col-span-2">
                    <span className="text-slate-400">Registered Reg / Trade No:</span>{' '}
                    <span className="font-mono font-bold text-[#14213D]">
                      {selectedClaim.businessRegNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Document Preview Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-[#14213D] uppercase tracking-wider text-[11px]">
                Submitted Evidence Document
              </h4>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#2A9D8F]" />
                  <div>
                    <div className="font-bold text-[#14213D]">{selectedClaim.evidenceFileName}</div>
                    <div className="text-[10px] text-slate-400">
                      Type: {selectedClaim.evidenceType.replace('_', ' ').toUpperCase()} (PDF, 2.4 MB)
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Simulated document viewer for ${selectedClaim.evidenceFileName}`)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#14213D] font-bold rounded-lg"
                >
                  Inspect File
                </button>
              </div>

              {selectedClaim.notes && (
                <p className="text-slate-500 text-[11px] pt-1">
                  <strong>Notes:</strong> {selectedClaim.notes}
                </p>
              )}
            </div>

            {/* Verification Checklist */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#2A9D8F]/5 border border-[#2A9D8F]/20">
              <div className="font-bold text-[#14213D] text-[11px]">Administrative Checklist</div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-[#2A9D8F] rounded" />
                <span>Physical establishment exists at registered Bangalore locality</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-[#2A9D8F] rounded" />
                <span>Trade document name correlates with applicant identity</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-[#2A9D8F] rounded" />
                <span>Applicant confirmed official authorization</span>
              </label>
            </div>

            {/* Optional More Information input */}
            <div>
              <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
                Moderator Note / Request to Applicant
              </label>
              <input
                type="text"
                value={moreInfoText}
                onChange={(e) => setMoreInfoText(e.target.value)}
                placeholder="e.g. Please provide updated FSSAI trade certificate copy..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleRejectClaim(selectedClaim.id)}
                className="px-3.5 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl font-bold"
              >
                Reject Claim
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRequestMoreInfo(selectedClaim.id)}
                  className="px-3.5 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 rounded-xl font-bold"
                >
                  Request More Info
                </button>
                <button
                  type="button"
                  onClick={() => handleApproveClaim(selectedClaim.id)}
                  className="px-4 py-2 bg-[#2A9D8F] hover:bg-[#21766C] text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Grant Badge</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
