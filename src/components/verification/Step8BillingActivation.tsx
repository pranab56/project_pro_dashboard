"use client";

import React, { useState } from "react";
import { Crown, Building2, CreditCard, Landmark, Info, ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { SelectedPlanInfo } from "./Step7ChoosePlan";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "Singapore", label: "Singapore" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "India", label: "India" },
];

interface Step8BillingActivationProps {
  selectedPlan: SelectedPlanInfo;
  onPaymentSuccess: () => void;
  contactName?: string;
  contactEmail?: string;
}

export default function Step8BillingActivation({
  selectedPlan,
  onPaymentSuccess,
  contactName = "Alex Morgan",
  contactEmail = "alex.morgan@yourcompany.com",
}: Step8BillingActivationProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ach">("card");

  // Form Fields
  const [fullName, setFullName] = useState(contactName);
  const [billingEmail, setBillingEmail] = useState(contactEmail);
  const [billingAddress, setBillingAddress] = useState("123 Main Street, Suite 400");
  const [cityState, setCityState] = useState("Austin, TX 78701");
  const [country, setCountry] = useState("United States");
  const [openCountry, setOpenCountry] = useState(false);

  // Card details
  const [cardholderName, setCardholderName] = useState(contactName);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expDate, setExpDate] = useState("08 / 28");
  const [cvv, setCvv] = useState("123");
  const [zipCode, setZipCode] = useState("78701");

  // ACH details
  const [achAccountHolder, setAchAccountHolder] = useState(contactName);
  const [achAccountType, setAchAccountType] = useState("Checking");
  const [achRouting, setAchRouting] = useState("021000021");
  const [achAccountNumber, setAchAccountNumber] = useState("1234567890");
  const [achConfirmAccount, setAchConfirmAccount] = useState("1234567890");
  const [achAuthorize, setAchAuthorize] = useState(true);

  // Agreement
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmitActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    onPaymentSuccess();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Header matching Image 2 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#4C127D] tracking-tight">
          Billing & Activation
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
          Complete your billing information to activate your workspace.
        </p>
      </div>

      {/* Summary Card at top matching Image 2 */}
      <div className="bg-[#F8F9FE] border border-purple-200/80 rounded-2xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-normal block">Selected Plan</span>
              <h3 className="text-base font-medium text-gray-900">{selectedPlan.name}</h3>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6B1294] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#6B1294]" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-normal block">Verified Portfolio</span>
              <h3 className="text-base font-medium text-gray-900">
                {selectedPlan.activeUnits.toLocaleString()} active units
              </h3>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:border-l md:border-purple-200/60 md:pl-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-normal">Rate</span>
            <span className="font-bold text-gray-900">${selectedPlan.pricePerUnit.toFixed(2)} per active unit/month</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-normal">Monthly Minimum</span>
            <span className="font-bold text-gray-900">${selectedPlan.monthlyMinimum.toLocaleString()}</span>
          </div>

          <div className="pt-2 border-t border-purple-200/60">
            <span className="text-xs text-gray-500 font-normal block">Estimated Monthly Subscription</span>
            <span className="text-2xl sm:text-3xl font-medium text-[#4C127D]">
              ${selectedPlan.estimatedTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitActivation} className="space-y-6">
        {/* Billing Contact Section matching Image 2 */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-gray-900">Billing Contact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Billing Email *
              </label>
              <input
                type="email"
                required
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Billing Address *
            </label>
            <input
              type="text"
              required
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              placeholder="City, State Zip"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
            />

            {/* Shadcn UI Combobox for Country Dropdown */}
            <Popover open={openCountry} onOpenChange={setOpenCountry}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={openCountry}
                  aria-controls="country-combobox-list"
                  className="w-full h-[42px] px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B1294]/20 focus:border-[#6B1294] shadow-none cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50"
                >
                  <span className="truncate">
                    {country
                      ? countries.find((c) => c.value.toLowerCase() === country.toLowerCase())?.label || country
                      : "Select Country..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] sm:w-[350px] p-0 bg-white rounded-xl border border-gray-200 shadow-xl z-[60]" align="start">
                <Command>
                  <CommandInput placeholder="Search country..." className="h-9 text-xs" />
                  <CommandList className="max-h-[220px]">
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((c) => (
                        <CommandItem
                          key={c.value}
                          value={c.value}
                          onSelect={(currentValue) => {
                            setCountry(currentValue === country ? "" : c.value);
                            setOpenCountry(false);
                          }}
                          className="flex items-center justify-between text-xs py-2 px-3 cursor-pointer rounded-lg font-medium text-gray-800 hover:bg-purple-50 hover:text-[#6B1294] transition-colors"
                        >
                          <span>{c.label}</span>
                          <Check
                            className={cn(
                              "h-4 w-4 text-[#6B1294] transition-opacity",
                              country.toLowerCase() === c.value.toLowerCase() ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Payment Method Section matching Image 2 */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-gray-900">Payment Method</h2>

          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-gray-100/70 p-1 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`py-3 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                paymentMethod === "card"
                  ? "bg-[#6B1294] text-white shadow-xs"
                  : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("ach")}
              className={`py-3 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                paymentMethod === "ach"
                  ? "bg-[#6B1294] text-white shadow-xs"
                  : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>ACH Bank Transfer</span>
            </button>
          </div>

          {/* Tab 1: Credit Card Form */}
          {paymentMethod === "card" && (
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                  <CreditCard className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Expiration Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Billing ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                />
              </div>
            </div>
          )}

          {/* Tab 2: ACH Bank Transfer Form */}
          {paymentMethod === "ach" && (
            <div className="space-y-3.5 bg-purple-50/40 p-4 sm:p-5 rounded-2xl border border-purple-200/80 animate-in fade-in duration-150">
              <div className="flex items-start gap-3 border-b border-purple-100 pb-3">
                <Landmark className="w-5 h-5 text-[#6B1294] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Pay by ACH Bank Transfer</h4>
                  <p className="text-[11px] text-gray-500">Secure and reliable bank transfer for your subscription.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Account Holder Name *</label>
                <input
                  type="text"
                  required
                  value={achAccountHolder}
                  onChange={(e) => setAchAccountHolder(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Account Type *</label>
                  {/* Shadcn UI Select for Account Type */}
                  <Select value={achAccountType} onValueChange={setAchAccountType}>
                    <SelectTrigger className="w-full h-10 px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#6B1294]/20 focus:border-[#6B1294] shadow-none cursor-pointer">
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                      <SelectItem value="Checking">Checking</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Routing Number *</label>
                  <input
                    type="text"
                    required
                    value={achRouting}
                    onChange={(e) => setAchRouting(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={achAccountNumber}
                    onChange={(e) => setAchAccountNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Account Number *</label>
                  <input
                    type="text"
                    required
                    value={achConfirmAccount}
                    onChange={(e) => setAchConfirmAccount(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-[#6B1294]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-700 font-medium pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={achAuthorize}
                  onChange={(e) => setAchAuthorize(e.target.checked)}
                  className="rounded text-[#6B1294] focus:ring-purple-500 w-4 h-4"
                />
                <span>I authorize ProjexPro to debit my account for the subscription fees.</span>
              </label>
            </div>
          )}
        </div>

        {/* Agreement Checkbox matching Image 2 */}
        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-gray-800 font-medium cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded text-[#6B1294] focus:ring-purple-500 w-4 h-4"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-[#6B1294] font-bold underline">
                ProjexPro Subscription Agreement
              </a>
              .
            </span>
          </label>
        </div>

        {/* Primary Activation Button matching project brand color #6B1294 */}
        <div>
          <button
            type="submit"
            disabled={!agreeTerms}
            className="w-full py-4 px-6 bg-[#6B1294] hover:bg-[#580e7d] disabled:opacity-50 text-white font-bold rounded-2xl text-sm sm:text-base transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Activate Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Info Note matching Image 2 */}
        <div className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed pt-1">
          <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <span>
            Subscription fees cover the ProjexPro software. Service-provider work is quoted and invoiced separately after authorization.
          </span>
        </div>
      </form>
    </div>
  );
}
