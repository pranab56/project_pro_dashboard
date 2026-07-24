'use client';

import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Plan, PlanPrice } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onSave: (plan: Plan) => void;
  isLoading?: boolean;
}

export default function EditModal({ isOpen, onClose, plan, onSave, isLoading = false }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    participantCount: '',
    benefits: [] as string[],
    currentBenefit: '',
    planPrices: [] as PlanPrice[],
    currentPriceType: 'month' as 'free' | 'month' | 'year',
    currentPrice: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (plan) {
      setFormData({
        title: plan.title,
        participantCount: plan.participantCount.toString(),
        benefits: plan.benefits,
        currentBenefit: '',
        planPrices: plan.planPrices,
        currentPriceType: 'month',
        currentPrice: '',
      });
      setErrors({});
    }
  }, [plan]);

  if (!plan || !isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.participantCount || parseInt(formData.participantCount) <= 0) {
      newErrors.participantCount = 'Valid participant count is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedPlan: Plan = {
      ...plan,
      title: formData.title,
      participantCount: parseInt(formData.participantCount),
      benefits: formData.benefits,
      planPrices: formData.planPrices,
    };

    onSave(updatedPlan);
  };

  const addBenefit = () => {
    if (formData.currentBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, formData.currentBenefit.trim()],
        currentBenefit: '',
      });
    }
  };

  const addPrice = () => {
    if (formData.currentPrice && !isNaN(parseFloat(formData.currentPrice))) {
      const newPrice: PlanPrice = {
        type: formData.currentPriceType,
        price: parseFloat(formData.currentPrice),
      };

      setFormData({
        ...formData,
        planPrices: [...formData.planPrices, newPrice],
        currentPrice: '',
      });
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const removePrice = (index: number) => {
    setFormData({
      ...formData,
      planPrices: formData.planPrices.filter((_, i) => i !== index),
    });
  };

  const getPriceTypeLabel = (type: string) => {
    switch (type) {
      case 'free': return 'Free';
      case 'month': return 'Monthly';
      case 'year': return 'Yearly';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#EBEBEB] rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-300/60 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Plan</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Plan Name
            </label>
            <input
              type="text"
              disabled
              value={formData.title}
              className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 font-semibold capitalize opacity-70 cursor-not-allowed"
            />
          </div>

          {/* Participant Count */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Participant Count *
            </label>
            <input
              type="number"
              value={formData.participantCount}
              onChange={(e) => {
                setFormData({ ...formData, participantCount: e.target.value });
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

          {/* Pricing */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Pricing
            </label>
            <div className="flex gap-2 mb-2">
              <Select
                value={formData.currentPriceType}
                onValueChange={(val) => setFormData({ ...formData, currentPriceType: val as "free" | "month" | "year" })}
              >
                <SelectTrigger className="flex-1 h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none">
                  <SelectValue placeholder="Price Type" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.currentPrice}
                onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                disabled={formData.currentPriceType === 'free'}
                className="flex-1 px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={addPrice}
                className="px-4 py-3 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl cursor-pointer transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {formData.planPrices.map((price, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-2 bg-gray-100/80 rounded-xl">
                  <span className="text-sm font-medium text-gray-800">
                    {getPriceTypeLabel(price.type)}: {price.type === 'free' ? 'Free' : `$${price.price}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePrice(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
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
                value={formData.currentBenefit}
                onChange={(e) => setFormData({ ...formData, currentBenefit: e.target.value })}
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
              {formData.benefits.map((benefit, index) => (
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
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}