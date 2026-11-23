'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoDisclaimer } from '@/components/layout/DemoDisclaimer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo.owner@peakdiscount.in');
  const [password, setPassword] = useState('SecurePass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/owner/dashboard');
    }, 800);
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
              src="/images/auth/auth-showcase.jpg"
              alt="Local business showcase"
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
                <span>Trust-First Discovery</span>
              </div>
            </div>

            <div className="relative z-10 space-y-2 mt-auto">
              <h3 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Connect with verified local businesses across Bangalore.
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Log in to manage your claimed establishment, update gallery photos, and monitor community reviews.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="p-8 sm:p-10 space-y-6 flex flex-col justify-center">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#14213D] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#2A9D8F]" />
              </div>
              <h1 className="text-2xl font-black text-[#14213D] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs text-slate-500">
                Sign in to manage your business listings or explore directory features.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="name@business.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs sm:text-sm text-[#14213D]"
                  />
                </div>
              </div>

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
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-xs sm:text-sm text-[#14213D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2A9D8F] focus:ring-[#2A9D8F] border-slate-300"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset instructions have been sent to your registered email address.')}
                  className="text-[#2A9D8F] hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#14213D] hover:bg-[#1E3159] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick role shortcuts */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs">
              <Link href="/owner/dashboard" className="text-slate-600 hover:text-[#2A9D8F] font-semibold">
                Owner Portal →
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/admin/dashboard" className="text-slate-600 hover:text-[#F4A261] font-semibold">
                Admin Console →
              </Link>
            </div>

            <div className="text-center text-xs text-slate-500">
              Don&apos;t have an account yet?{' '}
              <Link href="/register" className="font-bold text-[#2A9D8F] hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
