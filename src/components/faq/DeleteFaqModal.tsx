'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
  question: string;
}

export default function DeleteFaqModal({
  isOpen,
  onClose,
  onDelete,
  isLoading = false,
  question,
}: DeleteFaqModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Warning Icon Circle */}
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-[#E53935]">
          <Trash2 className="w-8 h-8 text-[#E53935]" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete FAQ?</h3>
        <p className="text-sm text-gray-500 mb-4 font-normal">
          Are you sure you want to delete this FAQ? This action cannot be undone.
        </p>

        <p className="text-gray-700 text-xs font-medium bg-gray-100/80 px-4 py-3 rounded-xl w-full text-left line-clamp-3 mb-6">
          &quot;{question}&quot;
        </p>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-[#E53935] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm disabled:opacity-60"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
