import { toast } from "react-toastify";
import { registerUser } from "../thunks/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  // STATE FOR USER CREDENTIALS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES FROM AUTH REDUCER SLICE
  const { status, error } = useSelector((state) => state.auth);

  function handleRegisterUser(e) {
    e.preventDefault();
    const result = dispatch(registerUser(e.target.value));

    if (result.meta.requestStatus === "fulfilled") {
      const role = result.payload.role;
      navigate(role === "admin" ? "admin/dashboard" : "user/dashboard");
    }
  }

  return (
    <form
      onSubmit={handleRegisterUser}
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
            value={form.email}
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
            value={form.password}
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

export default Register;
