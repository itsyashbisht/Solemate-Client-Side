"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const { loading, error, user } = useSelector((state) => state.auth);

  // ON CHANGE HANDLER.
  const handleChange = (e) => {
    setFormData((field) => ({
      ...field,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Navigate after successful registration
  useEffect(() => {
    if (user) {
      toast.success("Registration successful!");
      navigate("/shop");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // PREVENT PAGE RELOAD

    if (
      !formData.username ||
      !formData.email ||
      !formData.address ||
      !formData.phoneNumber ||
      !formData.city ||
      !formData.fullname ||
      !formData.password ||
      !formData.pincode ||
      !formData.state
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const payload = formData;

    try {
      const res = await dispatch(registerUser(payload)).unwrap();
      console.log(res);
      navigate("/shop");
    } catch (err) {
      // toast.error(err.message || "Failed to register user");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md border-neutral-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-black">Create Account</CardTitle>
          <CardDescription className="text-neutral-600">
            Sign up to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-black">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="your_username"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-black">
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-black">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-black">
                Address
              </Label>
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-black">
                City
              </Label>
              <Input
                id="city"
                type="text"
                name="city"
                placeholder="New York"
                value={formData.city}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-black">
                State
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-black">
                Pincode
              </Label>
              <Input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="10001"
                value={formData.pincode}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-neutral-900"
            >
              {loading ? "registering ..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Login here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
