"use client";

import Sidebar from "../components/Sidebar";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import TeamRoles, { teamMembers } from "../components/TeamRoles";
import { NavBar } from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log(user);

  return (
    <div className="grid grid-row-[auto_1fr] h-screen bg-gray-100 w-[100dvw]">
      <NavBar />
      <main className="grid grid-cols-[auto_1fr] ">{children}</main>
    </div>
  );
}
