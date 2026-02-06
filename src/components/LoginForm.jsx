import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import hero from '../data/Hero1.jpg';
import { loginUser } from '../thunks/auth.thunk';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function LoginForm () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      user.role === 'ADMIN' ? navigate('/admin/dashboard', { replace: true }) : navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username || !password) return toast.error('All fields required');
    dispatch(loginUser({ email, password, username }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      /* FIXED HEIGHT AND WIDTH FOR COMPACT LOOK */
      className="z-20 w-full max-w-[850px] lg:h-[620px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-100 mx-auto my-10"
    >
      {/* LEFT SECTION: LOGIN (Shrinked Padding) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between bg-white px-8 py-10 lg:px-12">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-neutral-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="font-bold tracking-tight text-sm text-neutral-900">
            Solemate
          </span>
        </div>

        {/* Login Form Content */}
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-1">
              Sign in
            </h2>
            <p className="text-neutral-500 text-xs">
              Please enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                Username
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="itssolemate"
                className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-0.5">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 focus:bg-white transition-all text-sm shadow-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                  Password
                </Label>
                <button type="button" className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-900">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 border-neutral-100 bg-neutral-50 rounded-xl px-4 pr-10 focus:bg-white transition-all text-sm shadow-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300"
                >
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-neutral-900 hover:bg-black text-white font-bold rounded-xl transition-all active:scale-95 mt-2 text-sm"
            >
              {loading ? 'Authenticating...' : 'Continue'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-neutral-400 mt-4">
          <p>
            New here?{' '}
            <Link to="/register" className="text-neutral-900 font-bold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: HERO IMAGE (Fixed Height handled by parent) */}
      <div className="hidden lg:block relative w-[55%] h-full">
        <div className="relative w-full h-full">
          <img
            src={hero || '/placeholder.svg'}
            alt="Solemate Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>

          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-white text-4xl font-semibold tracking-tight leading-tight mb-2">
              Built for <br/> every step.
            </h3>
            <p className="text-white/60 text-xs max-w-[200px]">
              The premium collection for those who move differently.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}