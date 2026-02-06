import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage () {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-[#F2F2F2] font-sans antialiased overflow-x-hidden py-6 md:py-12 px-4">

      {/* 1. DIMMED BACKGROUND TEXT - Lower opacity for better hierarchy */}
      <div
        className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-center gap-4 md:gap-10 opacity-[0.06] select-none overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex gap-8 md:gap-20">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-9xl lg:text-[14vw] font-black uppercase tracking-tighter text-black"
            >
              Solemate Solemate Solemate
            </span>
          ))}
        </div>
        <div className="whitespace-nowrap animate-marquee-reverse flex gap-8 md:gap-20">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-9xl lg:text-[14vw] font-black uppercase tracking-tighter text-black"
            >
              Solemate Solemate Solemate
            </span>
          ))}
        </div>
      </div>

      {/* 2. DEPTH GRADIENT - Makes the white card pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200/20 to-neutral-300/30 z-1"/>

      {/* 3. LOGIN CARD */}
      <div className="relative z-20 w-full flex justify-center items-center">
        <LoginForm/>
      </div>

      {/* 4. FOOTER */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden xs:block">
        <p
          className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] whitespace-nowrap">
          Solemate Performance © 2026
        </p>
      </div>

      {/* 5. CUSTOM ANIMATION STYLES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 80s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 80s linear infinite; }
      `,
      }}
      />
    </div>
  );
}