"use client";

import React, { useState } from "react";
import { X, Plus, Image as ImageIcon, DollarSign, Wrench } from "lucide-react";

interface CreateExtraWorkModalProps {
  isOpen: boolean;
  parentJobId: string;
  parentJobTitle: string;
  onClose: () => void;
  onSubmitExtraWork: (extraData: {
    extraServiceName: string;
    description: string;
    images: string[];
    additionalFee: number;
    requestedBy: string;
  }) => void;
}

export default function CreateExtraWorkModal({
  isOpen,
  parentJobId,
  parentJobTitle,
  onClose,
  onSubmitExtraWork,
}: CreateExtraWorkModalProps) {
  const [extraServiceName, setExtraServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [additionalFee, setAdditionalFee] = useState<number>(150);
  const [images, setImages] = useState<string[]>([
    "/images/prop_1.png",
    "/images/prop_3.png",
  ]);

  if (!isOpen) return null;

  const handleAddSampleImage = () => {
    const samplePool = [
      "/images/prop_2.png",
      "/images/prop_4.png",
      "/images/prop_5.png",
      "/images/prop_6.png",
    ];
    const randomImg = samplePool[Math.floor(Math.random() * samplePool.length)];
    setImages([...images, randomImg]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extraServiceName.trim() || !description.trim()) return;

    onSubmitExtraWork({
      extraServiceName,
      description,
      images,
      additionalFee,
      requestedBy: "Mike Chen (Service Provider)",
    });

    setExtraServiceName("");
    setDescription("");
    setAdditionalFee(150);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-xl w-full shadow-2xl relative border border-gray-200 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#6B1294] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Request Extra Work</h2>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                For Job #{parentJobId}: <span className="font-semibold text-gray-700">{parentJobTitle}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Extra Service Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Extra Work / Service Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AC Condenser Coil Repair & Servicing"
              value={extraServiceName}
              onChange={(e) => setExtraServiceName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the additional task requested by the Property Manager on-site..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
            />
          </div>

          {/* Additional Price / Fee */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Additional Fee / Price ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min={0}
                value={additionalFee}
                onChange={(e) => setAdditionalFee(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#6B1294] focus:ring-2 focus:ring-[#6B1294]/20"
              />
            </div>
          </div>

          {/* Attach Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Work Site Photos / Images
              </label>
              <button
                type="button"
                onClick={handleAddSampleImage}
                className="text-xs font-semibold text-[#6B1294] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Photo Preview
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                  <img src={img} alt="Extra work site preview" className="w-full h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSampleImage}
                className="h-20 border-2 border-dashed border-gray-300 hover:border-[#6B1294] rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#6B1294] transition-colors cursor-pointer bg-gray-50/50"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold">Upload Photo</span>
              </button>
            </div>
          </div>

          {/* Alert Notice */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-[11px] text-[#6B1294] leading-relaxed">
            <strong>Flow Notice:</strong> This Extra Work Request will be sent directly to the <strong>Property Manager</strong> for approval before work starts.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer text-center border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#6B1294] hover:bg-[#580e7a] text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-xs text-center"
            >
              Send to PM for Approval
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
