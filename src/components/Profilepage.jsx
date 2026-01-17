import { Check, Edit2, Lock, LogOut, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    username: "@iamyashbisht",
    fullName: "Yash Bisht",
    email: "yash2611@gmail.com",
    phone: "1234567899",
    address: "Dwarka sec-10, New Delhi",
    city: "Dwarka",
    state: "New Delhi",
    pincode: "110037",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEditClick = (field) => {
    setEditingField(field);
    setTempValue(profileData[field]);
  };

  const handleSave = (field) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: tempValue,
    }));
    setEditingField(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const initials = profileData.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-12 pb-8 border-b border-gray-200">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold hover:bg-gray-800 transition-colors cursor-pointer">
              {initials}
            </div>
            <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Edit2 className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full p-1 shadow-md" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold text-black mb-2">
              {profileData.fullName}
            </h1>
            <p className="text-sm text-gray-600">{profileData.username}</p>
            <p className="text-xs text-gray-500 mt-2">Member since 2024</p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Account Security Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors backdrop-blur-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-black mb-6">
              <Lock className="w-5 h-5" />
              Account Security
            </h2>

            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Username
                </label>
                {editingField === "username" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("username")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-black">
                      {profileData.username}
                    </span>
                    <button
                      onClick={() => handleEditClick("username")}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {editingField === "email" ? (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("email")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-black">
                      {profileData.email}
                    </span>
                    <button
                      onClick={() => handleEditClick("email")}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-black">••••••••</span>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors backdrop-blur-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-black mb-6">
              <MapPin className="w-5 h-5" />
              Delivery Details
            </h2>

            <div className="space-y-6">
              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                {editingField === "phone" ? (
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("phone")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-black">
                      {profileData.phone}
                    </span>
                    <button
                      onClick={() => handleEditClick("phone")}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Address
                </label>
                {editingField === "address" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("address")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-black">
                      {profileData.address}
                    </span>
                    <button
                      onClick={() => handleEditClick("address")}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    City
                  </label>
                  {editingField === "city" ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave("city")}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-black">
                        {profileData.city}
                      </span>
                      <button
                        onClick={() => handleEditClick("city")}
                        className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    State
                  </label>
                  {editingField === "state" ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave("state")}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-black">
                        {profileData.state}
                      </span>
                      <button
                        onClick={() => handleEditClick("state")}
                        className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Pincode
                </label>
                {editingField === "pincode" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 text-sm bg-transparent border-b border-black outline-none focus:border-blue-600 transition-colors py-2"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("pincode")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-black">
                      {profileData.pincode}
                    </span>
                    <button
                      onClick={() => handleEditClick("pincode")}
                      className="opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <button className="text-red-600 hover:text-red-700 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
            <LogOut className="w-4 h-4 inline mr-2" />
            Logout
          </button>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300">
            <Check className="w-4 h-4" />
            Changes saved successfully
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
              <h3 className="text-xl font-bold text-black mb-6">
                Change Password
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full text-sm bg-transparent border-b border-gray-300 outline-none focus:border-black transition-colors py-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full text-sm bg-transparent border-b border-gray-300 outline-none focus:border-black transition-colors py-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full text-sm bg-transparent border-b border-gray-300 outline-none focus:border-black transition-colors py-2"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
