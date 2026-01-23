import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import hero from "../data/Hero1.jpg";
import { loginUser } from "../thunks/auth.thunk";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
    if (user) {
      if (user.user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop");
      }
    }
  }, [error, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !username || !password)
      return toast.error("All fields required");
    dispatch(loginUser({ email, password, username }));
  };

  return (
    <div className="z-20 w-full max-w-[1050px] h-[650px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex overflow-hidden p-3 border border-neutral-100 mx-auto transition-all">
      {/* LEFT SECTION: LOGIN (Minimalist focus) */}
      <div className="w-full lg:w-[45%] flex flex-col p-10 lg:p-14 justify-between bg-white">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-neutral-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-[10px] font-medium">S</span>
          </div>
          <span className="font-semibold tracking-tight text-neutral-900">
            Solemate
          </span>
        </div>

        {/* Login Form Content */}
        <div className="max-w-[320px] mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-light text-neutral-900 tracking-tight mb-2">
              Sign in
            </h2>
            <p className="text-neutral-400 text-sm font-normal">
              Please enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-neutral-500 ml-1">
                Username
              </Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="solemate_id"
                className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-neutral-200 focus-visible:border-neutral-300 transition-all text-sm placeholder:text-neutral-300 shadow-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-neutral-500 ml-1">
                Email address
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-neutral-200 focus-visible:border-neutral-300 transition-all text-sm placeholder:text-neutral-300 shadow-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-xs font-medium text-neutral-500">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-[11px] font-normal text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 pr-12 focus-visible:ring-1 focus-visible:ring-neutral-200 focus-visible:border-neutral-300 transition-all text-sm placeholder:text-neutral-300 shadow-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-xl transition-all mt-4 text-sm shadow-none"
            >
              {loading ? "Authenticating..." : "Continue"}
            </Button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center items-center text-xs font-normal text-neutral-400">
          <p>
            New here?{" "}
            <Link
              to="/register"
              className="text-neutral-900 font-medium hover:underline underline-offset-4 ml-1"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: HERO IMAGE CARD (Minimal overlay) */}
      <div className="hidden lg:block relative w-[55%] h-full">
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
          <img
            src={hero}
            alt="Solemate Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle gradient for depth without being too dark */}
          <div className="absolute inset-0 bg-neutral-900/10" />

          {/* Minimal Status Indicator */}
          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-sm">
            <div className="h-1.5 w-1.5 bg-neutral-400 rounded-full" />
            <p className="text-neutral-900 font-medium text-[10px] tracking-tight">
              Active session
            </p>
          </div>

          {/* Simple Bottom Text */}
          <div className="absolute bottom-10 left-10">
            <h3 className="text-white text-3xl font-light tracking-tight leading-tight">
              Built for <br /> every step.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
