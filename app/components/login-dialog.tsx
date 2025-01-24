"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginButton";
import { User } from "firebase/auth";
import {
  useModalPopupAtom,
  useSetModalPopupAtom,
} from "../hooks/useLoginPopupModal";

export function LoginDialog() {
  const isModalOpen = useModalPopupAtom();
  const setLoginDialogOpen = useSetModalPopupAtom();
  const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //     setLoginDialogOpen(true);
  //   } else {
  //     setLoginDialogOpen(false);
  //   }
  // }, [user, loading, setLoginDialogOpen]);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setLoginDialogOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content
          onInteractOutside={(event) => event.preventDefault()}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[425px] z-50"
        >
          <Dialog.Title className="text-2xl font-bold mb-4 text-center">
            Welcome Back
          </Dialog.Title>
          <Dialog.Description className="text-center text-gray-600 mb-6">
            Please sign in to continue to the dashboard
          </Dialog.Description>

          <LoginForm />

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Don't have an account? Contact your administrator</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
