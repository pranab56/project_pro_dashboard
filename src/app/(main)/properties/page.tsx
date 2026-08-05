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
    Upload,
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

type PropertyType = "residential" | "commercial" | "mixed-use";
type PropertyStatus = "Active" | "Pending" | "Inactive";
type FilterType = "all" | "residential" | "commercial" | "mixed-use";

interface Property {
    id: string;
    name: string;
    address: string;
    category: string;
    totalUnits?: number;
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
    const [formType, setFormType] = useState<PropertyType>("commercial");
    const [formName, setFormName] = useState<string>("");
    const [formSubCategory, setFormSubCategory] = useState<string>("");
    const [formAddress, setFormAddress] = useState<string>("");
    const [formTotalUnits, setFormTotalUnits] = useState<string>("");
    const [formUnitNumber, setFormUnitNumber] = useState<string>("");
    const [formFloorRange, setFormFloorRange] = useState<string>("");
    const [formStatus, setFormStatus] = useState<PropertyStatus>("Active");
    const [formImage, setFormImage] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    // Handle File Selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormImage(imageUrl);
            setErrors((prev) => ({ ...prev, image: "" }));
        }
    };

    // Handle File Drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormImage(imageUrl);
            setErrors((prev) => ({ ...prev, image: "" }));
        }
    };

    // Open Modal for Create
    const handleOpenAddModal = () => {
        setEditingId(null);
        setFormType("commercial");
        setFormName("");
        setFormSubCategory("");
        setFormAddress("");
        setFormTotalUnits("");
        setFormUnitNumber("");
        setFormFloorRange("");
        setFormStatus("Active");
        setFormImage("");
        setErrors({});
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEditModal = (prop: Property) => {
        setEditingId(prop.id);
        setFormType(prop.type);
        setFormName(prop.name);
        setFormSubCategory(prop.category);
        setFormAddress(prop.address);
        setFormTotalUnits(prop.totalUnits ? prop.totalUnits.toString() : "");
        setFormUnitNumber(prop.unitNumber || "");
        setFormFloorRange("e.g. 1-5");
        setFormStatus(prop.status);
        setFormImage(prop.image || "");
        setErrors({});
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

        const newErrors: Record<string, string> = {};

        if (!formName.trim()) {
            newErrors.name = "Property Name is required";
        }
        if (!formAddress.trim()) {
            newErrors.address = "Address is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields");
            return;
        }

        const finalImage = formImage || `/images/prop_${(properties.length % 6) + 1}.png`;

        if (editingId) {
            // Edit existing
            setProperties(
                properties.map((p) =>
                    p.id === editingId
                        ? {
                            ...p,
                            name: formName,
                            address: formAddress,
                            category: formSubCategory || p.category,
                            totalUnits: formTotalUnits ? Number(formTotalUnits) : undefined,
                            unitNumber: formUnitNumber || undefined,
                            type: formType,
                            status: formStatus,
                            image: finalImage,
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
                category: formSubCategory || (formType === "commercial" ? "Office Building" : "Apartment Complex"),
                totalUnits: formTotalUnits ? Number(formTotalUnits) : undefined,
                unitNumber: formUnitNumber || undefined,
                type: formType,
                status: formStatus,
                image: finalImage,
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
            (selectedFilter === "mixed-use" && (item.type === "mixed-use" || item.category.toLowerCase().includes("mixed")));

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Top Title & Add Button Row */}
            <div className="flex flex-row items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-relaxed">
                        Properties
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 sm:mt-1">
                        {filteredProperties.length} properties total
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="bg-[#5B1B95] hover:bg-[#4a157a] text-white font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Property</span>
                </button>
            </div>

            {/* Search & Filter Controls Bar */}
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-2 sm:p-2.5 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative w-full md:w-7/12">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search properties..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#5B1B95] transition-all"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E5E7EB] p-1.5 rounded-lg w-full md:w-auto overflow-x-auto">
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
                                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${isSelected
                                    ? "bg-white text-gray-900 shadow-xs border border-gray-200"
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
                        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between transition-all hover:shadow-md"
                    >
                        {/* Top Image & Overlay Badges */}
                        <div className="h-52 w-full relative overflow-hidden bg-gray-200">
                            <img
                                src={prop.image}
                                alt={prop.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />

                            {/* Type Badge (Top-Left) */}
                            <div className="absolute top-3.5 left-3.5">
                                {prop.type === "residential" ? (
                                    <span className="bg-[#E5D7F6] text-[#5B1B95] border border-[#E1D4F4] font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                                        <Home className="w-3.5 h-3.5" />
                                        Residential
                                    </span>
                                ) : (
                                    <span className="bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                                        <Building2 className="w-3.5 h-3.5" />
                                        Commercial
                                    </span>
                                )}
                            </div>

                            {/* Status Badge (Top-Right) */}
                            <div className="absolute top-3.5 right-3.5">
                                <span
                                    className={`font-semibold text-xs px-3 py-1 rounded-full border shadow-xs ${prop.status === "Active"
                                        ? "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]"
                                        : prop.status === "Pending"
                                            ? "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
                                            : "bg-gray-200 text-gray-600 border-gray-300"
                                        }`}
                                >
                                    {prop.status}
                                </span>
                            </div>
                        </div>

                        {/* Card Content Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1">
                                    {prop.name}
                                </h3>

                                {/* Location */}
                                <div className="text-sm text-gray-500 font-normal flex items-center gap-1.5 mb-2 line-clamp-1">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span>{prop.address}</span>
                                </div>

                                {/* Category & Units Info */}
                                <div className="text-sm text-gray-500 font-normal flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span>
                                        {prop.category}
                                        {prop.totalUnits ? ` • ${prop.totalUnits} ${prop.totalUnits === 1 ? "unit" : "units"}` : ""}
                                        {prop.unitNumber ? ` • Unit ${prop.unitNumber}` : ""}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons Footer */}
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-300/50">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(prop)}
                                    className="flex-1 py-2.5 px-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeletingProperty(prop)}
                                    className="flex-1 py-2.5 px-3 border border-gray-300 hover:bg-red-50 text-[#E53935] font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 ease-out">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-[#E53935]">
                            <Trash2 className="w-8 h-8 text-[#E53935]" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Property?</h3>
                        <p className="text-sm text-gray-500 mb-6 font-normal">
                            Are you sure you want to delete <span className="font-semibold text-gray-800">&quot;{deletingProperty.name}&quot;</span>? This action cannot be undone.
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 sm:max-w-2xl w-full shadow-2xl max-h-[94vh] overflow-y-auto custom-scrollbar border border-[#E5E7EB] animate-in fade-in zoom-in-95 duration-200 ease-out">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? "Edit Property" : "Add New Property"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Property Type Switcher (3 Tabs) */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Property Type
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setFormType("residential")}
                                        className={`py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${formType === "residential"
                                            ? "border-2 border-[#5B1B95] bg-[#F2E7FC] text-[#5B1B95]"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Residential</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormType("commercial")}
                                        className={`py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${formType === "commercial"
                                            ? "border-2 border-[#5B1B95] bg-[#F2E7FC] text-[#5B1B95]"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        <span>Commercial</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormType("mixed-use")}
                                        className={`py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${formType === "mixed-use"
                                            ? "border-2 border-[#5B1B95] bg-[#F2E7FC] text-[#5B1B95]"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        <span>Mixed-use</span>
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Fields based on Residential vs Commercial */}
                            {formType === "residential" ? (
                                <>
                                    {/* Sub-Category */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Sub-Category *
                                        </label>
                                        <Select
                                            value={formSubCategory || "Apartment Complex"}
                                            onValueChange={(val) => {
                                                setFormSubCategory(val);
                                                setErrors((prev) => ({ ...prev, subCategory: "" }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm py-5.5 text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none">
                                                <SelectValue placeholder="e.g. Single-family home" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                                                <SelectItem className="py-3" value="Apartment Complex">Apartment Complex</SelectItem>
                                                <SelectItem className="py-3" value="Single-family home">Single-family home</SelectItem>
                                                <SelectItem className="py-3" value="Condominium">Condominium</SelectItem>
                                                <SelectItem className="py-3" value="Townhouse">Townhouse</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Property Name */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Property Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formName}
                                            onChange={(e) => {
                                                setFormName(e.target.value);
                                                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, name: "" }));
                                            }}
                                            placeholder="e.g. Sunset Apartments"
                                            className={`w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg   text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.name ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#5B1B95]"
                                                }`}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Building / Plaza Name */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Building / Plaza Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formName}
                                            onChange={(e) => {
                                                setFormName(e.target.value);
                                                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, name: "" }));
                                            }}
                                            placeholder="e.g. Sunset Apartments"
                                            className={`w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.name ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#5B1B95]"
                                                }`}
                                        />
                                    </div>

                                    {/* Sub-Category */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Sub-Category *
                                        </label>
                                        <input
                                            type="text"
                                            value={formSubCategory}
                                            onChange={(e) => {
                                                setFormSubCategory(e.target.value);
                                                if (e.target.value.trim()) setErrors((prev) => ({ ...prev, subCategory: "" }));
                                            }}
                                            placeholder="e.g. Office Building"
                                            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg  text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5B1B95] transition-all"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Property / Building Address */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    {formType === "commercial" ? "Building Address *" : "Property Address *"}
                                </label>
                                <input
                                    type="text"
                                    value={formAddress}
                                    onChange={(e) => {
                                        setFormAddress(e.target.value);
                                        if (e.target.value.trim()) setErrors((prev) => ({ ...prev, address: "" }));
                                    }}
                                    placeholder="Full property address"
                                    className={`w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.address ? "border-red-500 bg-red-50/20" : "border-gray-300 focus:border-[#5B1B95]"
                                        }`}
                                />
                            </div>

                            {/* Unit / Suite # & Floor Range / Total Units (2 Cols) */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                        Unit / Suite #
                                    </label>
                                    <input
                                        type="text"
                                        value={formUnitNumber}
                                        onChange={(e) => setFormUnitNumber(e.target.value)}
                                        placeholder="e.g. A, 1A, 101"
                                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg  text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5B1B95] transition-all"
                                    />
                                </div>

                                {formType === "residential" ? (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Total Number of Units
                                        </label>
                                        <input
                                            type="number"
                                            value={formTotalUnits}
                                            onChange={(e) => setFormTotalUnits(e.target.value)}
                                            placeholder="e.g. 24"
                                            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg  text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5B1B95] transition-all"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                            Floor Range *
                                        </label>
                                        <Select
                                            value={formFloorRange || "e.g. 1-5"}
                                            onValueChange={(val) => setFormFloorRange(val)}
                                        >
                                            <SelectTrigger className="w-full h-[48px] px-4 py-5.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none">
                                                <SelectValue placeholder="e.g. 1-5" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                                                <SelectItem value="e.g. 1-5">e.g. 1-5</SelectItem>
                                                <SelectItem value="1-10">1-10 Floors</SelectItem>
                                                <SelectItem value="11-20">11-20 Floors</SelectItem>
                                                <SelectItem value="21+">21+ Floors</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <Select
                                    value={formStatus}
                                    onValueChange={(val) => setFormStatus(val as PropertyStatus)}
                                >
                                    <SelectTrigger className="w-full h-[48px] py-5.5 px-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg  text-sm text-gray-900 focus:outline-none transition-all cursor-pointer shadow-none">
                                        <SelectValue placeholder="Active" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white rounded-xl border border-gray-200 shadow-lg z-[60]">
                                        <SelectItem className="py-3" value="Active">Active</SelectItem>
                                        <SelectItem className="py-3" value="Pending">Pending</SelectItem>
                                        <SelectItem className="py-3" value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Property Cover Photo Upload Area */}
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Property Cover Photo (Optional) *
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed border-gray-300 bg-gray-200/30 hover:bg-gray-200/50 rounded-xl p-5 text-center cursor-pointer transition-all"
                                >
                                    {formImage ? (
                                        <div className="relative group">
                                            <img
                                                src={formImage}
                                                alt="Property preview"
                                                className="w-full h-32 object-cover rounded-lg shadow-xs"
                                            />
                                            <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold">
                                                Click to change image
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                                            <p className="text-xs text-gray-600 font-medium">
                                                Drag & drop photos here, or{" "}
                                                <span className="text-[#5B1B95] font-bold">
                                                    browse
                                                </span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                PNG, JPG up to 10KB size
                                            </p>
                                        </>
                                    )}
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1 font-normal">
                                    Upload an exterior photo for easy identification on your dashboard.
                                </p>
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex gap-3 pt-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 px-4 bg-[#5B1B95] hover:bg-[#4a157a] text-white font-semibold rounded-xl shadow-xs text-sm sm:text-base transition-colors cursor-pointer"
                                >
                                    {editingId ? "Save Changes" : "Add Property"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3.5 px-4 bg-[#EBEBEB] hover:bg-gray-300/80 text-gray-800 font-semibold rounded-xl text-sm sm:text-base transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}