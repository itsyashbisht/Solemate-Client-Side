import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { loginUser } from "../thunks/auth.thunk";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // STEP 5: Toast for redux errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // STEP 5: Toast for success login
  useEffect(() => {
    if (user) toast.success("Login Successful!");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = { email, password, username };

    try {
      const res = await dispatch(loginUser(payload)).unwrap();

      if (res.data?.user?.role === "ADMIN") {
        navigate("/cart");
      } else {
        navigate("/cart");
      }
    } catch (err) {
      //
    }
  };

  return (
    <form onSubmit={handleSubmit} className="z-20 max-w-md w-full">
      <Card className="border-neutral-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-black">Login</CardTitle>
          <CardDescription className="text-neutral-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* USERNAME */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-black">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="example123"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-neutral-300 bg-white text-black placeholder:text-neutral-400 focus-visible:ring-black"
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-neutral-900"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Register here
            </a>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
