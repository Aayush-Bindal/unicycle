'use client'

export default function SignInWithGoogle() {
  const handleSignIn = () => {
    // This hits your /auth route (which starts Google OAuth)
    window.location.href = '/auth/start'
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="22px"
        height="22px"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083h-1.961V20H24v8h11.303c-1.65 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.841 1.154 7.961 3.039l5.657-5.657C34.015 6.27 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.297 15.108 18.74 12 24 12c3.059 0 5.841 1.154 7.961 3.039l5.657-5.657C34.015 6.27 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.159 0 9.832-1.977 13.385-5.188l-6.172-5.238C29.107 35.091 26.668 36 24 36c-5.202 0-9.611-3.315-11.283-7.946l-6.561 5.045C9.46 39.556 16.13 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083h-1.961V20H24v8h11.303c-.792 2.237-2.244 4.166-4.09 5.574.001-.001 6.172 5.238 6.172 5.238l.002.001C40.482 34.186 44 29.06 44 24c0-1.341-.138-2.651-.389-3.917z"
        />
      </svg>
      Sign in with Google
    </button>
  )
}
