"use client";

import {
    Building2,
    Home,
    MapPin,
    Pencil,
    Plus,
    Search,
    Tag,
    Trash2,
    UploadCloud,
    X,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import toast from "react-hot-toast";

type PropertyType = "residential" | "commercial";
type PropertyStatus = "Active" | "Pending" | "Inactive";
type FilterType = "all" | "residential" | "commercial" | "mixed-use";

interface Property {
    id: string;
    name: string;
    address: string;
    category: string;
    totalUnits: number;
    unitNumber?: string;
    type: PropertyType;
    status: PropertyStatus;
    image: string;
}

const initialProperties: Property[] = [
    {
        id: "1",
        name: "Sunset Apartments",
        address: "123 Sunset Blvd, Los Angeles, CA 90028",
        category: "Apartment Complex",
        totalUnits: 24,
        type: "residential",
        status: "Active",
        image: "/images/prop_1.png",
    },
    {
        id: "2",
        name: "Green Valley Complex",
        address: "456 Valley Rd, Phoenix, AZ 85001",
        category: "Apartment Complex",
        totalUnits: 48,
        type: "residential",
        status: "Active",
        image: "/images/prop_2.png",
    },
    {
        id: "3",
        name: "TechHub Tower",
        address: "789 Innovation Dr, San Francisco, CA 94105",
        category: "Office Building",
        totalUnits: 1,
        type: "commercial",
        status: "Active",
        image: "/images/prop_3.png",
    },
    {
        id: "4",
        name: "Maple Street Condos",
        address: "321 Maple St, Chicago, IL 60601",
        category: "Condominium",
        totalUnits: 12,
        unitNumber: "A",
        type: "residential",
        status: "Pending",
        image: "/images/prop_4.png",
    },
    {
        id: "5",
        name: "Harbor View Plaza",
        address: "555 Harbor Blvd, Seattle, WA 98101",
        category: "Retail / Office",
        totalUnits: 1,
        type: "commercial",
        status: "Active",
        image: "/images/prop_5.png",
    },
    {
        id: "6",
        name: "Pine Ridge Townhomes",
        address: "888 Pine Ridge Ave, Denver, CO 80201",
        category: "Townhouse",
        totalUnits: 18,
        type: "residential",
        status: "Inactive",
        image: "/images/prop_6.png",
    },
];

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);

    // Modal Form State
    const [formType, setFormType] = useState<PropertyType>("residential");
    const [formName, setFormName] = useState<string>("");
    const [formAddress, setFormAddress] = useState<string>("");
    const [formCategory, setFormCategory] = useState<string>("Apartment Complex");
    const [formTotalUnits, setFormTotalUnits] = useState<string>("");
    const [formUnitNumber, setFormUnitNumber] = useState<string>("");
    const [formStatus, setFormStatus] = useState<PropertyStatus>("Active");

    // Open Modal for Create
    const handleOpenAddModal = () => {
        setEditingId(null);
        setFormType("residential");
        setFormName("");
        setFormAddress("");
        setFormCategory("Apartment Complex");
        setFormTotalUnits("");
        setFormUnitNumber("");
        setFormStatus("Active");
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEditModal = (prop: Property) => {
        setEditingId(prop.id);
        setFormType(prop.type);
        setFormName(prop.name);
        setFormAddress(prop.address);
        setFormCategory(prop.category);
        setFormTotalUnits(prop.totalUnits.toString());
        setFormUnitNumber(prop.unitNumber || "");
        setFormStatus(prop.status);
        setIsModalOpen(true);
    };

    // Delete Property
    const handleDelete = (id: string) => {
        setProperties(properties.filter((p) => p.id !== id));
        toast.success("Property deleted successfully");
    };

    // Submit Modal (Create or Edit)
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formName.trim() || !formAddress.trim()) {
            toast.error("Property name and address are required");
            return;
        }

        if (editingId) {
            // Edit existing
            setProperties(
                properties.map((p) =>
                    p.id === editingId
                        ? {
                            ...p,
                            name: formName,
                            address: formAddress,
                            category: formCategory,
                            totalUnits: Number(formTotalUnits) || 1,
                            unitNumber: formUnitNumber || undefined,
                            type: formType,
                            status: formStatus,
                        }
                        : p
                )
            );
            toast.success("Property updated successfully");
        } else {
            // Add new
            const newProp: Property = {
                id: Date.now().toString(),
                name: formName,
                address: formAddress,
                category: formCategory,
                totalUnits: Number(formTotalUnits) || 1,
                unitNumber: formUnitNumber || undefined,
                type: formType,
                status: formStatus,
                image: `/images/prop_${(properties.length % 6) + 1}.png`,
            };
            setProperties([newProp, ...properties]);
            toast.success("New property added successfully");
        }

        setIsModalOpen(false);
    };

    // Filtered Properties
    const filteredProperties = properties.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "residential" && item.type === "residential") ||
            (selectedFilter === "commercial" && item.type === "commercial") ||
            (selectedFilter === "mixed-use" && item.category.toLowerCase().includes("mixed"));

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Top Title & Add Button Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Properties
                    </h1>
                    <p className="text-sm text-gray-500 font-normal mt-1">
                        {filteredProperties.length} properties total
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 text-sm w-fit"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Property</span>
                </button>
            </div>

            {/* Search & Filter Controls Bar */}
            <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search properties..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#EAEAEA] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#DEDEE1] p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {(["all", "residential", "commercial", "mixed-use"] as FilterType[]).map((tab) => {
                        const isSelected = selectedFilter === tab;
                        const labels: Record<FilterType, string> = {
                            all: "All Properties",
                            residential: "Residential",
                            commercial: "Commercial",
                            "mixed-use": "Mixed-use",
                        };
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setSelectedFilter(tab)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${isSelected
                                    ? "bg-white text-gray-900 font-semibold shadow-xs"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {labels[tab]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                    <div
                        key={prop.id}
                        className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
                    >
                        {/* Top Image & Overlay Badges */}
                        <div className="h-48 w-full relative overflow-hidden bg-gray-200">
                            <img
                                src={prop.image}
                                alt={prop.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />

                            {/* Type Badge (Top-Left) */}
                            <div className="absolute top-3 left-3">
                                {prop.type === "residential" ? (
                                    <span className="bg-[#E5D7F6] text-[#6B1294] border border-[#E1D4F4] font-semibold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                                        <Home className="w-3.5 h-3.5" />
                                        Residential
                                    </span>
                                ) : (
                                    <span className="bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                                        <Building2 className="w-3.5 h-3.5" />
                                        Commercial
                                    </span>
                                )}
                            </div>

                            {/* Status Badge (Top-Right) */}
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`font-semibold text-xs px-2.5 py-1 rounded-full border shadow-xs ${prop.status === "Active"
                                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                        : prop.status === "Pending"
                                            ? "bg-amber-100 text-amber-800 border-amber-200"
                                            : "bg-gray-200 text-gray-700 border-gray-300"
                                        }`}
                                >
                                    {prop.status}
                                </span>
                            </div>
                        </div>

                        {/* Card Content Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                                    {prop.name}
                                </h3>

                                {/* Location */}
                                <div className="text-xs text-gray-500 font-normal flex items-center gap-1.5 mb-2 line-clamp-1">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span>{prop.address}</span>
                                </div>

                                {/* Category & Units Info */}
                                <div className="text-xs text-gray-500 font-normal flex items-center gap-1.5 mb-4">
                                    <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span>
                                        {prop.category} • {prop.totalUnits} {prop.totalUnits === 1 ? "unit" : "units"}
                                        {prop.unitNumber ? ` • Unit ${prop.unitNumber}` : ""}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons Footer */}
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-300/50">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(prop)}
                                    className="flex-1 py-2 px-3 border border-gray-300 bg-white/80 hover:bg-white text-gray-700 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeletingProperty(prop)}
                                    className="flex-1 py-2 px-3 border border-red-200 bg-red-50/60 hover:bg-red-100 text-[#E53935] font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirm Delete Modal */}
            {deletingProperty && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center">
                        {/* Warning Icon Circle */}
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-[#E53935]">
                            <Trash2 className="w-8 h-8 text-[#E53935]" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Property?</h3>
                        <p className="text-sm text-gray-500 mb-6 font-normal">
                            Are you sure you want to delete <span className="font-semibold text-gray-800">"{deletingProperty.name}"</span>? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                type="button"
                                onClick={() => setDeletingProperty(null)}
                                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleDelete(deletingProperty.id);
                                    setDeletingProperty(null);
                                }}
                                className="flex-1 py-3 px-4 bg-[#E53935] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add / Edit Property Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-[#EBEBEB] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-gray-300/60">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? "Edit Property" : "Add New Property"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Property Type Switcher */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Property Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormType("residential")}
                                        className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${formType === "residential"
                                            ? "border-2 border-[#6B1294] bg-[#F2E7FC] text-[#6B1294]"
                                            : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                                            }`}
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Residential</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormType("commercial")}
                                        className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${formType === "commercial"
                                            ? "border-2 border-[#6B1294] bg-[#F2E7FC] text-[#6B1294]"
                                            : "bg-[#E2E2E5] text-gray-700 border border-transparent hover:bg-gray-300"
                                            }`}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        <span>Commercial</span>
                                    </button>
                                </div>
                            </div>

                            {/* Property Name */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Property Name *
                                </label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Sunset Apartments"
                                    className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={formAddress}
                                    onChange={(e) => setFormAddress(e.target.value)}
                                    placeholder="Full property address"
                                    className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Conditional Fields for Residential vs Commercial */}
                            {formType === "residential" && (
                                <>
                                    {/* Drag & Drop Photo Upload */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Images *
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300/80 bg-[#E2E2E5]/60 hover:bg-white rounded-xl p-5 text-center cursor-pointer transition-all">
                                            <UploadCloud className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
                                            <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                                Drag & drop photos here, or{" "}
                                                <span className="text-[#6B1294] font-semibold underline">
                                                    browse
                                                </span>
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                PNG, JPG up to 10KB size
                                            </p>
                                        </div>
                                    </div>

                                    {/* Unit Number & Total Units (2 Cols) */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                                Unit Number
                                            </label>
                                            <input
                                                type="text"
                                                value={formUnitNumber}
                                                onChange={(e) => setFormUnitNumber(e.target.value)}
                                                placeholder="e.g. A, 1A, 101"
                                                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                                Total Units
                                            </label>
                                            <input
                                                type="number"
                                                value={formTotalUnits}
                                                onChange={(e) => setFormTotalUnits(e.target.value)}
                                                placeholder="e.g. 24"
                                                className="w-full px-4 py-3 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Category & Status (2 Cols) using shadcn Select */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                        Category
                                    </label>
                                    <Select value={formCategory} onValueChange={(val) => setFormCategory(val)}>
                                        <SelectTrigger className="w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-none">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                                            <SelectItem value="Apartment Complex">Apartment Complex</SelectItem>
                                            <SelectItem value="Condominium">Condominium</SelectItem>
                                            <SelectItem value="Office Building">Office Building</SelectItem>
                                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                                            <SelectItem value="Retail / Office">Retail / Office</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                        Status
                                    </label>
                                    <Select value={formStatus} onValueChange={(val) => setFormStatus(val as PropertyStatus)}>
                                        <SelectTrigger className="w-full h-[46px] px-4 py-6 bg-[#E2E2E5] border border-transparent rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none transition-all cursor-pointer shadow-none">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Submit / Cancel Buttons based on Property Type */}
                            {formType === "commercial" ? (
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3.5 px-4 bg-[#E2E2E5] hover:bg-gray-300 border border-gray-300/60 rounded-xl text-gray-800 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3.5 px-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold rounded-xl shadow-sm text-sm sm:text-base transition-colors cursor-pointer"
                                    >
                                        {editingId ? "Save Changes" : "Add Property"}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#6B1294] hover:bg-[#580e7d] text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm text-sm sm:text-base cursor-pointer transition-colors"
                                >
                                    {editingId ? "Save Changes" : "Add Property"}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}