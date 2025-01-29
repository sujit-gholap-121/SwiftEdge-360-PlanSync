"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useSetUserLoginInfo } from "../hooks/useUserLogin";
import { useSetModalPopupAtom } from "../hooks/useLoginPopupModal";
import { useAuth } from "../hooks/useAuth2";

export default function LoginForm() {
  const router = useRouter();
  const setUserLoginInfo = useSetUserLoginInfo();
  const setLoginModalPopup = useSetModalPopupAtom();
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      setUserLoginInfo((prev) => ({
        ...prev,
        loading: true,
      }));
      // const result = await signInWithPopup(auth, googleProvider);
      await loginWithGoogle();
      // if (result.user) {
      //   setUserLoginInfo({ user: result.user, loading: false, error: "" });
      //   setLoginModalPopup(false);
      // }
    } catch (error) {
      setUserLoginInfo((prev) => ({
        ...prev,
        loading: false,
        error: "Error loggin in",
      }));
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
