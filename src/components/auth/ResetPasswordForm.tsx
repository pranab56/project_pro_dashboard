"use client";

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

function ProjexProLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Roof/Chevron Stack Icon */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 4L4 17.5H12L22 10L32 17.5H40L22 4Z" fill="#FF9F00" />
        <path d="M22 13L8 23.5H16L22 19L28 23.5H36L22 13Z" fill="#F59E0B" />
        <path d="M22 22L12 29.5H19.5L22 27.6L24.5 29.5H32L22 22Z" fill="#D97706" />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center leading-none text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-[#5B1B95]">Projex</span>
          <span className="text-[#A327EE]">Pro</span>
        </div>
        <span className="text-[10px] text-gray-500 font-medium tracking-tight mt-0.5">
          property services, simplified
        </span>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  const router = useRouter();

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (!newErrors.newPassword && !newErrors.confirmPassword) {
      toast.success('Password updated successfully!');
      router.push('/auth/login');
    }
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
            Create New Password
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-8 font-normal leading-relaxed">
            Please enter a password that you haven&apos;t used with ProjexPro.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Enter New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                  }}
                  placeholder="Enter your password here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${errors.newPassword ? 'border-red-500' : 'border-transparent'
                    } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:outline-none transition-all pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-primary hover:opacity-80 transition-opacity"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Your New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Your New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="Confirm password here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${errors.confirmPassword ? 'border-red-500' : 'border-transparent'
                    } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:outline-none transition-all pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-primary hover:opacity-80 transition-opacity"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Update Password Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Update Password
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
          style={{ backgroundImage: `url('/images/house_hero_3.png')` }}
        />
      </div>
    </div>
  );
}