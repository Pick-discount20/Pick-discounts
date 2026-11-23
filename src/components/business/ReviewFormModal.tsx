'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { RatingStars } from '@/components/common/RatingStars';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  onSubmitSuccess: (newReview: {
    title: string;
    comment: string;
    rating: number;
    userName: string;
  }) => void;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  businessName,
  onSubmitSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      setErrorMsg('Please select a star rating.');
      return;
    }
    if (!title.trim() || !comment.trim() || !userName.trim()) {
      setErrorMsg('Please fill in your name, review headline, and detailed feedback.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    setTimeout(() => {
      onSubmitSuccess({
        title,
        comment,
        rating,
        userName,
      });
      // reset form
      setTitle('');
      setComment('');
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Write a Customer Review"
      subtitle={`Share your genuine experience with ${businessName}`}
      maxWidth="lg"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-50 text-[#2A9D8F] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-[#14213D]">Review Submitted!</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Thank you for helping the local community make trusted decisions. Your review is now published and visible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Interactive Rating */}
          <div>
            <label className="block text-xs font-bold text-[#14213D] mb-1.5 uppercase tracking-wider">
              Your Overall Rating
            </label>
            <div className="flex items-center gap-3">
              <RatingStars
                rating={rating}
                interactive={true}
                onRatingChange={setRating}
                size="lg"
              />
              <span className="text-sm font-bold text-[#2A9D8F]">
                {rating === 5 && 'Outstanding (5.0)'}
                {rating === 4 && 'Very Good (4.0)'}
                {rating === 3 && 'Average (3.0)'}
                {rating === 2 && 'Needs Improvement (2.0)'}
                {rating === 1 && 'Disappointing (1.0)'}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
              Review Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exceptional service and prompt delivery"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-[#14213D]"
            />
          </div>

          {/* Detailed Experience */}
          <div>
            <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
              Your Detailed Experience
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about the quality, ambiance, timeliness, pricing transparency, or customer service..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-[#14213D]"
            />
          </div>

          {/* Reviewer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Ramesh Iyer"
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1 uppercase tracking-wider">
                Email (Private verification)
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2A9D8F] hover:bg-[#21766C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
