import { useState } from "react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Yash Bisht");
  const [avatar, setAvatar] = useState(null);

  return (
    <div className="flex flex-col gap-8 max-w-[120rem] mx-auto w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Update your account
        </h1>
        <p className="text-gray-500">
          Manage your profile information and security settings.
        </p>
      </div>

      {/* UPDATE USER DATA FORM */}
      <div className="bg-white border border-gray-100 rounded-md p-10 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          Update user data
        </h2>

        <form className="flex flex-col gap-8">
          {/* Email (Read Only) */}
          <div className="grid grid-cols-[1fr_2fr] items-center border-b border-gray-50 pb-6">
            <label className="font-semibold text-gray-700">Email address</label>
            <input
              type="text"
              disabled
              value="yash@example.com"
              className="bg-gray-100 border border-gray-200 rounded-sm py-2 px-4 text-gray-400 cursor-not-allowed w-full max-w-md"
            />
          </div>

          {/* Full Name */}
          <div className="grid grid-cols-[1fr_2fr] items-center border-b border-gray-50 pb-6">
            <label className="font-semibold text-gray-700">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white border border-gray-300 rounded-sm py-2 px-4 shadow-sm focus:ring-2 focus:ring-indigo-600 outline-none w-full max-w-md transition-all"
            />
          </div>

          {/* Avatar Upload */}
          <div className="grid grid-cols-[1fr_2fr] items-center border-b border-gray-50 pb-6">
            <label className="font-semibold text-gray-700">Avatar image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="reset"
              className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-sm border border-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Update account
            </button>
          </div>
        </form>
      </div>

      {/* UPDATE PASSWORD SECTION */}
      <div className="bg-white border border-gray-100 rounded-md p-10 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          Update password
        </h2>
        <p className="text-sm text-gray-500 mb-6 italic">
          Secure your account with a strong password.
        </p>

        {/* Simplified for view - usually same structure as above */}
        <button className="text-indigo-600 font-bold hover:underline">
          Change Password &rarr;
        </button>
      </div>
    </div>
  );
}
