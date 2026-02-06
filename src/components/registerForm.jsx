import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Added for consistency
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import hero from '../data/Hero1.jpg';
import { registerUser } from '../thunks/auth.thunk';

export default function RegisterForm () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    pincode: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((field) => ({
      ...field,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (user) {
      toast.success('Registration successful!');
      navigate('/shop');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      email,
      address,
      phoneNumber,
      city,
      fullname,
      password,
      pincode,
      state,
    } = formData;

    if (Object.values(formData).some((val) => !val)) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
    } catch (err) {
      // Handled by useEffect
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="z-20 w-full max-w-[850px] lg:h-[650px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-100 mx-auto"
    >
      {/* LEFT SECTION: FORM */}
      <div className="w-full lg:w-[48%] flex flex-col justify-between bg-white p-6 sm:p-8 lg:px-12 lg:py-10">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5 mb-6 lg:mb-0">
          <div className="h-7 w-7 bg-neutral-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="font-bold tracking-tight text-sm text-neutral-900">
            Solemate
          </span>
        </div>

        {/* Form Content Area */}
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-1">
              Join the roster
            </h2>
            <p className="text-neutral-500 text-[11px] sm:text-xs">
              Create your performance profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Scrollable grid area for many fields */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 max-h-[320px] lg:max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Username
                </Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="sole_user"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Full Name
                </Label>
                <Input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Phone
                </Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1..."
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Pincode
                </Label>
                <Input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Address
                </Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Street Name"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  City
                </Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  State
                </Label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 pr-10 focus:bg-white transition-all text-sm shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-neutral-900 hover:bg-black text-white font-bold rounded-xl transition-all active:scale-95 mt-2 text-sm shadow-lg shadow-neutral-900/10"
            >
              {loading ? 'Registering...' : 'Create Account'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-neutral-400 mt-6 lg:mt-4">
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-neutral-900 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: IMAGE */}
      <div className="hidden lg:block relative w-[52%] h-full">
        <div className="relative w-full h-full">
          <img
            src={hero}
            alt="Solemate Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>

          <div
            className="absolute top-10 left-10 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
            <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"/>
            <p className="text-white font-bold text-[9px] uppercase tracking-widest">
              Join the elite
            </p>
          </div>

          <div className="absolute bottom-12 left-10 right-10">
            <h3 className="text-white text-4xl font-semibold tracking-tight leading-tight mb-2">
              Step into <br/> excellence.
            </h3>
            <p className="text-white/60 text-[11px] max-w-[220px]">
              The premium collection for those who move differently.
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d4; }
      `,
        }}
      />
    </motion.div>
  );
}