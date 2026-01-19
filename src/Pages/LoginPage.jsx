import Login from "../components/Login";
import hero from "../data/Hero1.jpg";

function LoginPage() {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-center bg-cover bg-no-repeat font-sans antialiased overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* 1. DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* 2. MOVING BACKGROUND TEXT (MARQUEE) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center gap-12 opacity-20 select-none">
        <div className="whitespace-nowrap animate-marquee flex gap-20">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[12vw] font-black uppercase tracking-tighter text-white"
            >
              Solemate Solemate Solemate
            </span>
          ))}
        </div>
        <div className="whitespace-nowrap animate-marquee-reverse flex gap-20">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[12vw] font-black uppercase tracking-tighter text-white"
            >
              Solemate Solemate Solemate
            </span>
          ))}
        </div>
      </div>

      {/* 3. LOGIN CARD */}
      <div className="relative z-20 w-full flex justify-center px-6">
        <Login />
      </div>

      {/* 4. FOOTER */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
          Solemate Performance © 2026
        </p>
      </div>

      {/* 5. CUSTOM ANIMATION STYLES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}

export default LoginPage;
