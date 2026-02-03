import { Eye, EyeOff, Lock, Mail, MapPin, Phone, User, X } from 'lucide-react';
import { useState } from 'react';

export function CreateUserModal ({ isOpen, onClose, onCreateUser }) {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    role: 'USER',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onCreateUser(formData);
      setFormData({
        username: '',
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        role: 'USER',
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
      <div
        className="relative max-h-[90vh] sm:max-h-[95vh] w-full max-w-sm sm:max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-xl bg-slate-900 border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start sm:items-center justify-between border-b border-slate-700/50 bg-slate-900 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-bold text-white">Create New User</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Add a new user to your system</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 sm:p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex-shrink-0 ml-2"
          >
            <X size={18} className="sm:w-5 sm:h-5"/>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            {/* Username and Full Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                  <User size={14}/>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.username ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="john_doe"
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-400">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                  <User size={14}/>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.fullname ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullname && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullname}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                  <Mail size={14}/>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                  <Phone size={14}/>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.phoneNumber ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="9876543210"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Password and Role Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                  <Lock size={14}/>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500/50' : 'border-slate-700/50'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  User Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-slate-800/50 border-2 border-slate-700/50 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="USER">Customer</option>
                  <option value="SELLER">Seller</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 block">
                <MapPin size={14}/>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                  errors.address ? 'border-red-500/50' : 'border-slate-700/50'
                }`}
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-400">{errors.address}</p>
              )}
            </div>

            {/* City, State, Pincode Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.city ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-400">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.state ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="NY"
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-red-400">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.pincode ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="10001"
                />
                {errors.pincode && (
                  <p className="mt-1 text-xs text-red-400">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 sm:mt-8 flex items-center justify-end gap-2 sm:gap-3 border-t border-slate-700/50 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-600/50 px-4 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:shadow-blue-600/50 transition-all duration-150 active:scale-95 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserModal;
