// app/(auth)/auth/page.tsx
import SignInWithGoogle from "@/components/auth/signInWithGoogle";

const AuthPage = () => {
  return (
    <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center flex flex-col justify-center">
      <SignInWithGoogle />

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
  );
};

export default AuthPage;
