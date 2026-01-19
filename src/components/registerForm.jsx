import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import hero from "../data/Hero1.jpg";
import { registerUser } from "../thunks/auth.thunk";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    pincode: "",
    password: "",
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
      toast.success("Registration successful!");
      navigate("/shop");
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

    if (
      !username ||
      !email ||
      !address ||
      !phoneNumber ||
      !city ||
      !fullname ||
      !password ||
      !pincode ||
      !state
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
    } catch (err) {
      // Error handled by useEffect
    }
  };

  return (
    /* MAIN CARD */
    <div className="z-20 w-full max-w-[1050px] h-full min-h-[650px] lg:h-[750px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex overflow-hidden p-3 border border-neutral-100 mx-auto">
      {/* LEFT SECTION: FORM */}
      <div className="w-full lg:w-[50%] flex flex-col p-8 lg:p-12 justify-between bg-white overflow-y-auto custom-scrollbar">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="h-7 w-7 bg-neutral-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-[10px] font-medium">S</span>
          </div>
          <span className="font-semibold tracking-tight text-neutral-900">
            Solemate
          </span>
        </div>

        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-neutral-900 tracking-tight mb-1">
              Join the roster
            </h2>
            <p className="text-neutral-400 text-sm font-normal">
              Create your performance profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Scrollable Form Area to keep the card height fixed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar pb-2">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Username
                </Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="sole_user"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Full Name
                </Label>
                <Input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="col-span-full space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Phone Number
                </Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1..."
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Pincode
                </Label>
                <Input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="col-span-full space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Address
                </Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Street Name"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  City
                </Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  State
                </Label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 text-sm"
                />
              </div>

              <div className="col-span-full space-y-1">
                <Label className="text-xs font-medium text-neutral-500 ml-1">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="h-11 border-neutral-100 bg-neutral-50/50 rounded-xl px-4 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-xl transition-all mt-4 text-sm"
            >
              {loading ? "Registering..." : "Create Account"}
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-xs font-normal text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-neutral-900 font-medium hover:underline underline-offset-4 ml-1"
          >
            Login here
          </Link>
        </div>
      </div>

      {/* RIGHT SECTION: IMAGE */}
      <div className="hidden lg:block relative w-[50%] h-full">
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
          <img
            src={hero}
            alt="Solemate Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/10" />
          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
            <div className="h-1.5 w-1.5 bg-neutral-400 rounded-full" />
            <p className="text-neutral-900 font-medium text-[10px] tracking-tight">
              Step into the elite
            </p>
          </div>
          <div className="absolute bottom-10 left-10">
            <h3 className="text-white text-3xl font-light tracking-tight leading-tight">
              Your journey <br /> starts here.
            </h3>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e5e5e5; }
      `,
        }}
      />
    </div>
  );
}
