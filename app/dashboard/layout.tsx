"use client";

import Sidebar from "../components/Sidebar";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import TeamRoles, { teamMembers } from "../components/TeamRoles";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log(user);

  return (
    <div className="flex h-screen bg-gray-100 w-[100dvw]">
      <Sidebar />
      <main className="w-[calc(100dvw-256px)] overflow-y-auto">{children}</main>
    </div>
  );
}
