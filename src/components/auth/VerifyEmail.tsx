"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
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

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    toast.success('Verification successful!');
    router.push('/auth/reset-password');
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    toast.success('A new verification code has been sent to your email');
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
            Verify your account
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-8 font-normal leading-relaxed">
            Please enter the 6-digit verification code that has been sent to your email address.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OTP Code Inputs */}
            <div>
              <div className="grid grid-cols-6 gap-2.5 sm:gap-3 my-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={setInputRef(index)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-full h-12 sm:h-14 text-center text-xl font-bold border ${
                      error ? 'border-red-500' : 'border-transparent'
                    } bg-[#E2E2E5] rounded-lg text-gray-900 focus:bg-white focus:outline-none transition-all`}
                  />
                ))}
              </div>
              {error && <p className="mt-1 text-xs text-red-500 font-medium text-center">{error}</p>}
            </div>

            {/* Resend Code Row */}
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-gray-700 font-medium">Didn&apos;t receive the code?</span>
              <button
                type="button"
                onClick={handleResend}
                className="text-[#6B1294] font-semibold hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            </div>

            {/* Verify & Continue Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Verify & Continue
            </button>

            {/* Return to Login Link */}
            <div className="text-center mt-6 pt-2">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-gray-800 hover:underline"
              >
                Return to Login
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
          style={{ backgroundImage: `url('/images/house_hero_2.png')` }}
        />
      </div>
    </div>
  );
}