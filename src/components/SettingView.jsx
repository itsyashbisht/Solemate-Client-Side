import React from 'react';

import { MapPin, Save, ShieldCheck, User, ChevronRight, Lock } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '@/thunks/user.thunk.js';

export default function SettingView () {
  const { loading, error, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    username: profile.username || ' ',
    fullname: profile.fullname || ' ',
    email: profile.email || ' ',
    phoneNumber: profile.phoneNumber || ' ',
    address: profile.address || ' ',
    city: profile.city || ' ',
    state: profile.state || ' ',
    pincode: profile.pincode || ' ',
  });



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
      fullname: 'Admin User',
      email: "",
      username: "",
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      pincode: '94105',
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage your profile information and account settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-24">
        {/* Right Section - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="p-4 bg-green-500/15 border border-green-500/30 rounded-lg">
                <p className="text-sm font-medium text-green-400">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-lg">
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <User size={20} className="text-blue-400"/>
                <h2 className="text-lg font-bold text-white">Personal Information</h2>
              </div>

              <div className="space-y-4">
                {/* Username - Read Only */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profile?.username}
                    disabled
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Cannot be changed</p>
                </div>

                {/* Email - Read Only */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile?.email}
                    disabled
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Primary email address</p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={20} className="text-blue-400"/>
                <h2 className="text-lg font-bold text-white">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                    placeholder="Enter street address"
                  />
                </div>

                {/* City, State, Zip Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent placeholder:text-slate-500 transition-all outline-none"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={20} className="text-blue-400"/>
                <h2 className="text-lg font-bold text-white">Account Security</h2>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Keep your account secure by updating your password regularly
              </p>
              <button
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white border border-slate-600 bg-slate-700/40 hover:bg-slate-700/60 rounded-lg transition-all duration-150"
              >
                <Lock size={16}/>
                Change Password
              </button>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={!hasChanges}
                className="px-6 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasChanges || loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-600/50 active:scale-95"
              >
                <Save size={16}/>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Last Updated */}
            <div className="pt-6 border-t border-slate-700/50">
              <p className="text-xs text-slate-500 text-center">
                Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} at {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
