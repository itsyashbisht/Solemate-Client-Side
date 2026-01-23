export default function SettingView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/30 border border-slate-700/40 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-4">
            Profile Information
          </h2>
          <div className="space-y-4">
            <input
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm"
              placeholder="Full Name"
            />
            <input
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm"
              placeholder="Email"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold text-white">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
