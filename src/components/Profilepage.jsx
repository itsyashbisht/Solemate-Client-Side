"use client";

import { MapPin, Save, ShieldCheck, User, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../thunks/user.thunk";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullname: profile?.fullname || "",
    phoneNumber: profile?.phoneNumber || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    pincode: profile?.pincode || "",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserDetails(formData));
    setHasChanges(false);
  };

  const handleDiscard = () => {
    setFormData({
      fullname: profile?.fullname || "",
      phoneNumber: profile?.phoneNumber || "",
      address: profile?.address || "",
      city: profile?.city || "",
      state: profile?.state || "",
      pincode: profile?.pincode || "",
    });
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-6 pb-4">
        <p className="text-xs text-gray-500">Account Settings</p>
      </div>

      {/* MAIN HEADER */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pb-8 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-2">
          Account
        </h1>
        <p className="text-sm text-gray-600 font-normal">
          Update your profile information and manage your delivery settings.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* LEFT SECTION - PERSONAL INFORMATION */}
          <section>
            <div className="mb-8 sticky top-8">
              <h2 className="text-lg font-semibold text-black tracking-tight">
                Personal Information
              </h2>
              <p className="text-gray-600 text-xs mt-1">
                Keep your account details up to date
              </p>
            </div>

            <div className="space-y-3">
              {/* USERNAME (Read-only) */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 transition-all duration-200">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={profile?.username || ""}
                  disabled
                  className="w-full px-0 py-1.5 text-sm text-gray-400 border-0 bg-transparent focus:ring-0 focus:outline-none cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
              </div>

              {/* EMAIL (Read-only) */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 transition-all duration-200">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full px-0 py-1.5 text-sm text-gray-400 border-0 bg-transparent focus:ring-0 focus:outline-none cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Primary email address
                </p>
              </div>

              {/* FULL NAME */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </section>

          {/* RIGHT SECTION - SHIPPING ADDRESS & SECURITY */}
          <section className="space-y-8">
            {/* SHIPPING ADDRESS */}
            <div>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-black tracking-tight">
                  Shipping Address
                </h2>
                <p className="text-gray-600 text-xs mt-1">
                  This address will be used for your orders
                </p>
              </div>

              <div className="space-y-3">
                {/* STREET ADDRESS */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                    placeholder="Enter street address"
                  />
                </div>

                {/* CITY, STATE, ZIP */}
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                      placeholder="City"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                      placeholder="State"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 focus-within:border-black focus-within:shadow-sm">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-0 py-1.5 text-sm text-black border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY SECTION */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-black mb-1">
                    Account Security
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Keep your account secure by updating your password regularly
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-200 w-full"
                >
                  Change Password
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}
          </section>
        </form>

        {/* ACTION BUTTONS - FULL WIDTH */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDiscard}
            disabled={!hasChanges}
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!hasChanges || loading}
            className="w-full md:w-auto px-6 py-2 text-xs font-semibold text-white bg-black rounded-md hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Last updated:{" "}
            {profile?.updatedAt
              ? new Date(profile.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}{" "}
            at{" "}
            {profile?.updatedAt
              ? new Date(profile.updatedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
