'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Flag, CheckCircle2 } from 'lucide-react';
import { Review } from '@/types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetReview: Review | null;
  businessName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetReview,
  businessName,
}) => {
  const [reason, setReason] = useState('spam_fake');
  const [explanation, setExplanation] = useState('');
  const [reported, setReported] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReported(true);

    setTimeout(() => {
      setReported(false);
      setExplanation('');
      onClose();
    }, 1500);
  };

  if (!targetReview) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Inappropriate Content"
      subtitle={`Flagging review by ${targetReview.userName} for ${businessName}`}
      maxWidth="md"
    >
      {reported ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#14213D]">Report Filed with Moderation</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Our admin moderation team investigates flagged reviews according to community guidelines. You can view demo reports in the Admin Moderation Console.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 italic">
            &ldquo;{targetReview.comment.slice(0, 140)}...&rdquo;
          </div>

          {/* Reason Select */}
          <div>
            <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
              Reason for Reporting
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] bg-white text-[#14213D]"
            >
              <option value="spam_fake">Spam, bot, or fake customer review</option>
              <option value="offensive_language">Defamation, abusive language or slurs</option>
              <option value="conflict_of_interest">Competitor conflict of interest / bias</option>
              <option value="harassment">Personal harassment or private info leak</option>
              <option value="off_topic">Not relevant to this business or service</option>
            </select>
          </div>

          {/* Explanation textarea */}
          <div>
            <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Provide context on why this review violates community standards..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
