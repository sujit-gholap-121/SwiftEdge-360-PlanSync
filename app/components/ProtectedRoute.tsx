// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth2";
import {
  useModalPopupAtom,
  useSetModalPopupAtom,
} from "../hooks/useLoginPopupModal";
import { handleSessionLogin } from "../hooks/Utils";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isModalOpen = useModalPopupAtom();
  const setLoginDialogOpen = useSetModalPopupAtom();
  handleSessionLogin();
  // const isUser = sessionStorage.getItem("firebaseUser");
  // console.log("route");
  // console.log(JSON.parse(sessionStorage.getItem("firebaseUser") || "{}"));
  // useEffect(() => {
  //   if (!loading && !user) {
  //     setLoginDialogOpen(true); // Redirect to login if not authenticated
  //   }
  // }, [user, loading, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
