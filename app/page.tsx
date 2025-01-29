"use client";
import Dashboard from "./dashboard/page";
import DashboardLayout from "./dashboard/layout";
import { LoginDialog } from "./components/login-dialog";

import { useUserLoginInfo } from "./hooks/useUserLogin";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Home() {
  // You can optionally show a loading state while redirecting
  // if (!user) {
  //   return <p>Loading</p>;
  // }
  const loginUser = useUserLoginInfo();
  console.log("loginuser", loginUser);

  return (
    <ProtectedRoute>
      <LoginDialog />
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
