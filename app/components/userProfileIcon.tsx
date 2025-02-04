"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useUserLoginInfo } from "../hooks/useUserLogin";
import {
  useModalPopupAtom,
  useSetModalPopupAtom,
} from "../hooks/useLoginPopupModal";

export const UserProfileGroup = () => {
  const userInfo = useUserLoginInfo();
  const { user } = userInfo;
  const isLoginModalOpen = useModalPopupAtom();
  const [isDropdownOpen, setIsDropdownOpen] = useState(user ? true : false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setLoginModalPopup = useSetModalPopupAtom();

  const handleLogout = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
      const result = await signOut(auth);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("closing");
        setShowProfileModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldLoadIcon =
    typeof window !== "undefined" &&
    !!JSON.parse(sessionStorage.getItem("firebaseUser") || "null");
  console.log(user, shouldLoadIcon, showProfileModal);
  return (
    <div className=" top-4 right-4">
      {
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {shouldLoadIcon && user ? (
              <img
                onMouseEnter={() => {
                  console.log("enter");
                  setShowProfileModal(true);
                }}
                // onMouseLeave={() => setShowProfileModal(false)}
                src={user?.photoURL || ""}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <UserCircleIcon
                onClick={() => setLoginModalPopup(true)}
                className="w-8 h-8 text-gray-600"
              />
            )}
          </button>

          {showProfileModal && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            >
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
};
