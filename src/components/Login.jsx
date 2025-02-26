import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES FROM AUTH REDUCER SLICE
  const { status, error } = useSelector((state) => state.auth);

  function handleLogin(e) {
    e.preventDefault();
    const result = dispatch(loginAsync(e.target.value));

    if (result.meta.requestStatus === "fulfilled") {
      const role = result.payload.role;
      navigate(role === "admin" ? "admin/dashboard" : "user/dashboard");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="px-10 z-20 bg-white border border-gray-300 rounded-2xl py-10 w-[400px] h-[440px]"
    >
      <p className="uppercase text-center font-semibold text-2xl">login</p>
      <div className="flex flex-col mt-6 gap-y-2">
        <div className="flex flex-col">
          <label htmlFor="emailID" className="font-medium">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            placeholder="example@.com"
            className="rounded-md text-sm py-2 px-5 bg-gray-100"
            id="emailID"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            value={formData.password}
            type="password"
            id="password"
            placeholder="Password"
            className="rounded-md text-sm py-2 px-5 bg-gray-100"
          />
        </div>
      </div>

      <p className="text-sm mt-1 text-center">
        Create an account? <a className="text-blue-500">Sign up</a>
      </p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-black font-medium text-white my-6 w-full py-2.5 rounded-full"
      >
        {status === "loading" ? "Logging In" : "Login"}
      </button>
      {error && toast.error(`${error}`)}
    </form>
  );
}
