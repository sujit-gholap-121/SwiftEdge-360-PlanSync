"use client";
// hooks/useAuth.ts
import { useEffect, useCallback } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { AuthState, AuthActions } from "./types";
import { useUserLoginInfo, useSetUserLoginInfo } from "./useUserLogin";
import { useSetModalPopupAtom } from "./useLoginPopupModal";

export const useAuth = (): AuthState & AuthActions => {
  const { user, loading, error } = useUserLoginInfo();
  const updateAuthState = useSetUserLoginInfo();

  const setLoginModalPopup = useSetModalPopupAtom();

  // const updateAuthState = (newState: Partial<AuthState>) => {
  //   setAuthState((prev) => ({ ...prev, ...newState }));
  // };

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    updateAuthState((prev) => ({
      user: prev.user,
      loading: true,
      error: null,
    }));
    try {
      console.log("doiing login");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("result", { result });
      if (result.user) {
        updateAuthState({
          user: result.user,
          error: null,
          loading: false,
        });
        setLoginModalPopup(false);
        sessionStorage.setItem("firebaseUser", JSON.stringify(result.user));
        console.log(
          "firebaseUser just after login",
          sessionStorage.getItem("firebaseUser")
        );
      }
    } catch (error) {
      updateAuthState({
        error: "Error signing in with Google",
        loading: false,
        user: null,
      });
      console.error("Error signing in:", error);
    }
  }, [updateAuthState]);

  const handleLogout = useCallback(async (): Promise<void> => {
    updateAuthState((prev) => ({
      user: prev.user,
      loading: true,
      error: null,
    }));
    try {
      await signOut(auth);
      updateAuthState({ user: null, error: null, loading: false });
      sessionStorage.removeItem("firebaseUser");
    } catch (error) {
      updateAuthState({
        user: null,
        error: "Error signing out",
        loading: false,
      });
    }
  }, [updateAuthState]);

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
  //       updateAuthState({ loading: true });
  //       try {
  //         if (user) {
  //           updateAuthState({ user, loading: false });
  //           sessionStorage.setItem("firebaseUser", JSON.stringify(user));
  //         } else {
  //           updateAuthState({ user: null, loading: false });
  //           sessionStorage.removeItem("firebaseUser");
  //         }
  //       } catch (error) {
  //         updateAuthState({
  //           error: "Error initializing session",
  //           loading: false,
  //         });
  //         console.error("Error initializing session:", error);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }, [updateAuthState]);

  return { user, loading, error, loginWithGoogle, handleLogout };
};
