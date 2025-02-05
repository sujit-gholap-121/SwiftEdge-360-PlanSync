import { NavBar } from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-gray-100 w-[100dvw] overflow-hidden">
      <NavBar />
      <main className="grid grid-cols-[auto_1fr] ">{children}</main>
    </div>
  );
}
