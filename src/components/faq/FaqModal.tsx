'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { question: string; answer: string }) => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
  initialData?: { question: string; answer: string };
}

export default function FaqModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  mode,
  initialData,
}: FaqModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setQuestion(initialData?.question || '');
      setAnswer(initialData?.answer || '');
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!question.trim()) {
      newErrors.question = 'Question is required';
    }
    if (!answer.trim()) {
      newErrors.answer = 'Answer is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ question: question.trim(), answer: answer.trim() });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#EBEBEB] rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-300/60 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Create FAQ' : 'Edit FAQ'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Question *
            </label>
            <input
              type="text"
              placeholder="Enter question here..."
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, question: '' }));
              }}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.question ? 'border-red-500 bg-red-50/20' : 'border-transparent focus:bg-white'
              }`}
            />
            {errors.question && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.question}
              </p>
            )}
          </div>

          {/* Answer */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              Answer *
            </label>
            <textarea
              placeholder="Enter answer here..."
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, answer: '' }));
              }}
              rows={4}
              className={`w-full px-4 py-3 bg-[#E2E2E5] border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all resize-none ${
                errors.answer ? 'border-red-500 bg-red-50/20' : 'border-transparent focus:bg-white'
              }`}
            />
            {errors.answer && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <span>⚠️</span> {errors.answer}
              </p>
            )}
          </div>

          {/* Action Buttons */}
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
              {isLoading
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Saving...'
                : mode === 'create'
                ? 'Create FAQ'
                : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
