export default function Login() {
  return (
    <form className="px-10 border border-gray-300 rounded-2xl font-pop py-10 w-[400px] h-[440px] ">
      <p className="uppercase font-pop text-center font-semibold text-2xl">
        login
      </p>
      <div className="flex flex-col mt-6 gap-y-2">
        <div className="flex flex-col">
          <label htmlFor="emailID" className="  font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="example@.com"
            className="rounded-full text-sm py-2 px-5 bg-gray-100"
            id="emailID"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="rounded-full text-sm py-2 px-5 bg-gray-100"
          />
        </div>
      </div>

      <p className="text-sm mt-1 text-center">
        Create an account? <a className="text-blue-500">Sign up</a>
      </p>

      <button className="bg-black font-medium text-white my-6 w-full py-2.5 rounded-full">
        Login
      </button>
    </form>
  );
}
