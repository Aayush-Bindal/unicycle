"use client";

export default function SignInWithGoogle() {
  const handleSignIn = () => {
    // This hits your /auth route (which starts Google OAuth)
    window.location.href = "/auth/start";
  };

  return (
    <button
      onClick={() => {
        handleSignIn();
      }}
      className="glass-interactive relative flex items-center justify-center gap-3 py-2.5 px-3 rounded-xl text-white font-medium whitespace-nowrap"
    >
      {/* Google icon */}
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.69 1.22 9.18 3.6l6.83-6.83C35.59 2.24 30.23 0 24 0 14.7 0 6.68 5.43 2.69 13.36l7.98 6.2C12.36 13.15 17.69 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.14 24.5c0-1.64-.15-3.22-.43-4.75H24v9.04h12.46c-.54 2.9-2.18 5.36-4.65 7.04l7.25 5.64c4.24-3.9 6.69-9.64 6.69-16.97z"
        />
        <path
          fill="#4A90E2"
          d="M9.81 28.56A14.5 14.5 0 0 1 9.5 24c0-1.56.27-3.07.75-4.47l-7.98-6.2A23.96 23.96 0 0 0 0 24c0 3.9.93 7.57 2.58 10.83l8.02-6.27z"
        />
        <path
          fill="#FBBC05"
          d="M24 48c6.23 0 11.48-2.05 15.3-5.56l-7.25-5.64c-2.01 1.36-4.59 2.2-8.05 2.2-6.31 0-11.64-3.65-13.83-8.93l-8.02 6.27C6.68 42.57 14.7 48 24 48z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
