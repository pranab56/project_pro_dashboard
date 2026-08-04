"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

function ProjexProLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo/logo.png"
        alt="ProjexPro Logo"
        width={220}
        height={60}
        className="h-14 w-auto object-contain"
        priority
      />
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    toast.success('Reset link sent to your email!');
    router.push('/auth/verify-email');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#EBEBEB]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 min-h-screen">
        {/* Logo */}
        <div className="pt-2 sm:pt-0 max-w-lg w-full mx-auto">
          <ProjexProLogo />
        </div>

        {/* Form Container */}
        <div className="max-w-lg w-full mx-auto my-auto py-2">
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-bold text-gray-900 tracking-tight leading-snug">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-8 font-normal">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email Address here..."
                className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                  error ? 'border-red-500' : 'border-transparent'
                } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:outline-none transition-all`}
              />
              {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Send Reset Link
            </button>

            {/* Return to Sign In Link */}
            <div className="text-center mt-6 pt-2">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-gray-800 hover:underline"
              >
                Return to Sign In
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Spacer */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[50%] relative flex-col justify-start p-12 lg:p-16 xl:p-20 overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
          style={{ backgroundImage: `url('/images/house_hero_1.png')` }}
        />
      </div>
    </div>
  );
}