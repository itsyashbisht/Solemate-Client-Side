import Login from "../components/Login";
import hero from "../data/Hero1.jpg";

function LoginPage() {
  return (
    <div
      className="flex justify-center bg-center bg-cover bg-no-repeat items-center min-h-screen "
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div
        className="absolute inset-0
      bg-black/25 min-h-screen backdrop-blur-md"
      ></div>
      <Login />
    </div>
  );
}

export default LoginPage;
