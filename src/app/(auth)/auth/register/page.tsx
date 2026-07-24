"use client";

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type Role = 'manager' | 'provider';

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  contactNumber?: string;
  password?: string;
}

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

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('manager');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const newErrors: RegisterErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    toast.success('Registration successful! Please complete your account verification.');
    router.push('/verification');
  };

  const isManager = role === 'manager';

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#EBEBEB]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 min-h-screen overflow-y-auto">
        {/* Logo */}
        <div className="pt-2 sm:pt-0 max-w-lg w-full mx-auto">
          <ProjexProLogo />
        </div>

        {/* Form Container */}
        <div className="max-w-lg w-full mx-auto my-auto py-2">
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-bold text-gray-900 tracking-tight leading-snug">
            Let’s Get Started
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-6 font-normal">
            {isManager ? 'Create your Premium Property Account' : 'Create your Pro Account'}
          </p>

          {/* Role Selection Toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Property Manager Button */}
            <button
              type="button"
              onClick={() => setRole('manager')}
              className={`flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-lg font-semibold text-sm text-white transition-all cursor-pointer shadow-sm ${
                isManager ? 'bg-[#6B1294]' : 'bg-[#6B1294] opacity-90'
              }`}
            >
              <span>Property Manager</span>
              {isManager && (
                <span className="flex items-center justify-center w-4 h-4 bg-white text-[#6B1294] rounded-full text-[10px] font-extrabold">
                  ✓
                </span>
              )}
            </button>

            {/* Service Provider Button */}
            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-lg font-semibold text-sm text-white transition-all cursor-pointer shadow-sm ${
                !isManager ? 'bg-[#E68A00]' : 'bg-[#E68A00] opacity-90'
              }`}
            >
              <span>Service Provider</span>
              {!isManager && (
                <span className="flex items-center justify-center w-4 h-4 bg-white text-[#E68A00] rounded-full text-[10px] font-extrabold">
                  ✓
                </span>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name & Last Name (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Enter First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                    errors.firstName ? 'border-red-500' : 'border-transparent'
                  } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Enter Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                    errors.lastName ? 'border-red-500' : 'border-transparent'
                  } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Create Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Create Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username here..."
                className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                  errors.username ? 'border-red-500' : 'border-transparent'
                } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.username}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Address here..."
                className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                  errors.email ? 'border-red-500' : 'border-transparent'
                } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your contact number here..."
                className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                  errors.contactNumber ? 'border-red-500' : 'border-transparent'
                } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
              />
              {errors.contactNumber && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.contactNumber}</p>
              )}
            </div>

            {/* Create Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${
                    errors.password ? 'border-red-500' : 'border-transparent'
                  } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-primary hover:opacity-80 transition-opacity"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className={`w-full mt-4 text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                isManager ? 'bg-[#6B1294] hover:bg-[#580e7d]' : 'bg-[#E68A00] hover:bg-[#c77700]'
              }`}
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-2 text-sm text-gray-700 font-medium">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className={`font-semibold hover:underline ${isManager ? 'text-[#6B1294]' : 'text-[#E68A00]'}`}
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Spacer */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Right Section - Hero Image & Dynamic Content */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[50%] relative flex-col justify-start p-12 lg:p-16 xl:p-20 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{
            backgroundImage: `url('${isManager ? '/images/building_hero.png' : '/images/tech_hero.png'}')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 text-white pt-4">
          {isManager ? (
            <>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold leading-[1.30] tracking-tight drop-shadow-md mb-6">
                Complete Property Operations. Simplified.
              </h2>
              <p className="text-base xl:text-lg font-normal text-gray-200 leading-relaxed tracking-normal">
                A powerful platform built to dispatch technicians, track on-site progress in real-time, and settle invoices from anywhere.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg xl:text-xl font-normal text-gray-100 mb-6 tracking-normal">
                Enter your credentials to continue using ProjexPro
              </p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold leading-[1.30] tracking-tight drop-shadow-md">
                Streamlines for Managers.
                <br />
                Smart for Techs.
                <br />
                Perfect for Residents
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}