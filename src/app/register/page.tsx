'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';
import { Modal } from '@/components/common/Modal';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your entry.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (!agreeConsent) {
      setErrorMsg('Please review and accept the Peak Discount Terms and Community Guidelines.');
      return;
    }

    setErrorMsg('');
    setShowVerificationModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3]">
      <DemoDisclaimer />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Photographic Showcase Column (Yelp style) */}
          <div className="hidden md:relative md:flex flex-col justify-between p-8 text-white overflow-hidden bg-[#14213D]">
            <Image
              src="/images/auth/register-showcase.jpg"
              alt="Artisan cafe showcase"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14213D] via-[#14213D]/70 to-[#14213D]/40" />

            <div className="relative z-10 space-y-3">
              <span className="text-xl font-black tracking-tight font-sans">
                <span className="text-white">PEAK</span>
                <span className="text-[#2A9D8F] ml-1">DISCOUNT</span>
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-md text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
                <span>Join the Community</span>
              </div>
            </div>

            <div className="relative z-10 space-y-2 mt-auto">
              <h3 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Verified recommendations you can always count on.
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Create an account to submit customer reviews, bookmark trusted establishments, or claim your business profile.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="p-8 sm:p-10 space-y-6 flex flex-col justify-center">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black text-[#14213D] tracking-tight">
                Create an Account
              </h1>
              <p className="text-xs text-slate-500">
                Join Peak Discount to explore, rate, and claim verified businesses.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Iyer"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs sm:text-sm text-[#14213D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.in"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs sm:text-sm text-[#14213D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 chars"
                      className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs text-[#14213D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14213D] uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs text-[#14213D]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 leading-normal">
                  <input
                    type="checkbox"
                    required
                    checked={agreeConsent}
                    onChange={(e) => setAgreeConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-[#2A9D8F] focus:ring-[#2A9D8F] border-slate-300"
                  />
                  <span>
                    I accept the{' '}
                    <span className="text-[#14213D] font-bold">Terms of Service</span> and{' '}
                    <span className="text-[#14213D] font-bold">Community Moderation Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#2A9D8F] hover:bg-[#21766C] transition-all shadow-sm hover:shadow focus:ring-2 focus:ring-[#2A9D8F]/50 mt-2 cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#14213D] hover:underline">
                Log in here
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Email Verification State Modal */}
      <Modal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        title="Verify Your Email Address"
        subtitle="Complete your registration"
        maxWidth="md"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#2A9D8F] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#14213D]">
              Confirmation Email Sent
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              We have sent an activation link to <span className="font-semibold text-slate-800">{email || 'your email'}</span>. Please confirm your email to activate all account privileges.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                setShowVerificationModal(false);
                router.push('/owner/dashboard');
              }}
              className="flex-1 py-2.5 px-4 bg-[#2A9D8F] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#21766C]"
            >
              Go to Owner Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setShowVerificationModal(false);
                router.push('/');
              }}
              className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200/80"
            >
              Back to Home
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
