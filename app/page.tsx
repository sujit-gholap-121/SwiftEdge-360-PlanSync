"use client";
import Dashboard from "./dashboard/page";
import DashboardLayout from "./dashboard/layout";
import { LoginDialog } from "./components/login-dialog";
import { useAuth } from "./components/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  // You can optionally show a loading state while redirecting
  // if (!user) {
  //   return <p>Loading</p>;
  // }

  return (
    <>
      <LoginDialog />
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </>
  );
}
