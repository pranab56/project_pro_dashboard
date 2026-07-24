'use client';

import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface PackageBody {
  title: 'free' | 'basic' | 'premium';
  type: 'month' | 'year' | 'free';
  planType: 'free' | 'paid';
  price: number;
  productId: string;
  platform: 'apple' | 'google';
  benefits: string[];
  participantCount: number;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plan: PackageBody) => void;
  isLoading?: boolean;
}

const initialForm = {
  title: 'basic' as PackageBody['title'],
  type: 'month' as PackageBody['type'],
  planType: 'paid' as PackageBody['planType'],
  price: '',
  productId: '',
  platform: 'apple' as PackageBody['platform'],
  participantCount: '',
  benefits: [] as string[],
  currentBenefit: '',
};

export default function AddModal({ isOpen, onClose, onAdd, isLoading = false }: AddModalProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (title: PackageBody['title']) => {
    if (title === 'free') {
      setForm((prev) => ({ ...prev, title, type: 'free', planType: 'free', price: '0' }));
    } else {
      setForm((prev) => ({
        ...prev,
        title,
        type: prev.type === 'free' ? 'month' : prev.type,
        planType: 'paid',
        price: prev.price === '0' ? '' : prev.price,
      }));
    }
    setErrors((prev) => ({ ...prev, title: '' }));
  };

  const addBenefit = () => {
    if (form.currentBenefit.trim()) {
      setForm((prev) => ({
        ...prev,
        benefits: [...prev.benefits, prev.currentBenefit.trim()],
        currentBenefit: '',
      }));
      setErrors((prev) => ({ ...prev, benefits: '' }));
    }
  };

  const removeBenefit = (index: number) => {
    setForm((prev) => ({ ...prev, benefits: prev.benefits.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const isFree = form.title === 'free';

    if (!form.productId.trim()) {
      newErrors.productId = 'Product ID is required';
    }
    if (!form.participantCount || parseInt(form.participantCount) <= 0) {
      newErrors.participantCount = 'Valid participant count is required';
    }
    if (!isFree && (!form.price || parseFloat(form.price) <= 0)) {
      newErrors.price = 'Valid price is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd({
      title: form.title,
      type: form.type,
      planType: form.planType,
      price: parseFloat(form.price) || 0,
      productId: form.productId.trim(),
      platform: form.platform,
      benefits: form.benefits,
      participantCount: parseInt(form.participantCount),
    });
  };

  const isFree = form.title === 'free';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#EBEBEB] rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-300/60 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create a New Plan</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Plan Title *
            </label>
            <Select value={form.title} onValueChange={(val) => handleTitleChange(val as PackageBody['title'])}>
              <SelectTrigger className="w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none capitalize">
                <SelectValue placeholder="Select Plan Title" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Type *
            </label>
            <Select
              value={form.type}
              disabled={isFree}
              onValueChange={(val) => setForm((p) => ({ ...p, type: val as PackageBody['type'] }))}
            >
              <SelectTrigger className="w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none capitalize disabled:opacity-60">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                {isFree && <SelectItem value="free">Free</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter price..."
              value={form.price}
              onChange={(e) => {
                setForm((p) => ({ ...p, price: e.target.value }));
                if (e.target.value) setErrors((prev) => ({ ...prev, price: '' }));
              }}
              disabled={isFree}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all disabled:opacity-60 ${
                errors.price ? 'border-red-500 bg-red-50/20' : 'border-transparent focus:bg-white'
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.price}
              </p>
            )}
          </div>

          {/* Product ID */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Product ID *
            </label>
            <input
              type="text"
              placeholder="e.g. test_subscription"
              value={form.productId}
              onChange={(e) => {
                setForm((p) => ({ ...p, productId: e.target.value }));
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, productId: '' }));
              }}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.productId ? 'border-red-500 bg-red-50/20' : 'border-transparent focus:bg-white'
              }`}
            />
            {errors.productId && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.productId}
              </p>
            )}
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Platform *
            </label>
            <Select
              value={form.platform}
              onValueChange={(val) => setForm((p) => ({ ...p, platform: val as PackageBody['platform'] }))}
            >
              <SelectTrigger className="w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none capitalize">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="google">Google</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Participant Count */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Participant Count *
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter participant count..."
              value={form.participantCount}
              onChange={(e) => {
                setForm((p) => ({ ...p, participantCount: e.target.value }));
                if (e.target.value) setErrors((prev) => ({ ...prev, participantCount: '' }));
              }}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.participantCount ? 'border-red-500 bg-red-50/20' : 'border-transparent focus:bg-white'
              }`}
            />
            {errors.participantCount && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.participantCount}
              </p>
            )}
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Benefits
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter benefit here..."
                value={form.currentBenefit}
                onChange={(e) => setForm((p) => ({ ...p, currentBenefit: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                className="flex-1 px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-3 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl cursor-pointer transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {form.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-2 bg-gray-100/80 rounded-xl">
                  <span className="text-sm font-medium text-gray-800">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 px-4 bg-[#E2E2E5] hover:bg-gray-300 border border-gray-300/60 rounded-xl text-gray-800 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3.5 px-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl shadow-sm text-sm sm:text-base transition-colors cursor-pointer disabled:opacity-60"
            >
              {isLoading ? 'Adding...' : 'Add Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
