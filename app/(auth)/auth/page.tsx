import SignInWithGoogle from "@/components/auth/signInWithGoogle";
import Image from "next/image";

const page = () => {
  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background video */}
      <video
        src="/auth-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover md:object-fill"
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center">
        {/* === Logo / Heading (top 40%) === */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
          {/* Replace heading with your logo */}
          <Image
            src="/images/logo.png"
            alt="UNICYCLE"
            width={600}
            height={700}
            className="drop-shadow-lg opacity-85 w-[70vw] md:w-[400px] lg:w-[500px] h-auto max-w-none md:max-w-[600px]"
          />
        </div>

        {/* === Google Button (lower on screen, around 65%) === */}
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center flex flex-col justify-center">
          <SignInWithGoogle />

          {/* Info text under button */}
          <div className="mt-2 text-sm text-white/80">
            <p className="text-white/75">Use @thapar.edu email only</p>
            <p className="mt-40 text-xs text-white/60">
              By signing in, you agree to our{" "}
              <a
                href="/terms"
                className="underline hover:text-white transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Footer (bottom-right corner) */}
        <div className="absolute bottom-4 right-6 text-xs text-white/50">
          <p>© 2025 R2D2</p>
        </div>
      </div>
    </main>
  );
};

export default page;
