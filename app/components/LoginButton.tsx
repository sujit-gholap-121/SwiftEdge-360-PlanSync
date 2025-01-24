"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useSetUserLoginInfo } from "../hooks/useUserLogin";
import { useSetModalPopupAtom } from "../hooks/useLoginPopupModal";

export default function LoginForm() {
  const router = useRouter();
  const setUserLoginInfo = useSetUserLoginInfo();
  const setLoginModalPopup = useSetModalPopupAtom();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        setUserLoginInfo(result.user);
        setLoginModalPopup(false);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Sign in with Google
    </button>
  );
}
