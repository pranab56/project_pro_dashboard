"use client";

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';


interface LoginErrors {
  email: string;
  password: string;
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

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrors>({
    email: '',
    password: ''
  });

  const router = useRouter();


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e?: FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    const newErrors: LoginErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // If there are errors, don't submit
    if (newErrors.email || newErrors.password) {
      return;
    }
    try {
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: '' });
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#EBEBEB]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 min-h-screen">
        {/* Logo */}
        <div className="mt-14 max-w-lg w-full mx-auto">
          <ProjexProLogo />
        </div>

        {/* Form Container */}
        <div className="max-w-lg w-full mx-auto my-auto py-2">
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-bold text-gray-900 tracking-tight leading-snug">
            The All-in-One Property Care Provider
          </h1>
          <p className="text-sm text-gray-500 mt-2 mb-8 font-normal">
            Sign in to access your premium property account.
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
                onChange={handleEmailChange}
                placeholder="Enter your email Address here..."
                className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${errors.email ? 'border-red-500' : 'border-transparent'
                  } rounded-lg text-gray-900 placeholder:text-gray-400 text-sm focus:bg-white focus:border-primary focus:outline-none transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password here..."
                  className={`w-full px-4 py-3.5 bg-[#E2E2E5] border ${errors.password ? 'border-red-500' : 'border-transparent'
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

            {/* Forget Password */}
            <div className="flex justify-end pt-0.5">
              <Link
                href="/auth/forgot-password"
                className="text-xs sm:text-sm font-medium text-[#E53935] hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="w-4 h-4 rounded border-gray-400 text-primary focus:ring-primary accent-[#6B1294] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                Remember Me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Sign In
            </button>

            {/* Create Account Link */}
            <div className="text-center mt-6 pt-2 text-sm text-gray-700 font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-[#6B1294] font-semibold hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </div>

        {/* Bottom Spacer for Alignment */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Right Section - Hero Image & Heading */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-start p-12 lg:p-16 xl:p-20 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
          style={{ backgroundImage: `url('/images/building_hero.png')` }}
        />
        {/* Dark Gradient Overlay for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Text Content Overlay */}
        <div className="relative z-10 text-white max-w- pt-4">
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
        </div>
      </div>
    </div>
  );
}