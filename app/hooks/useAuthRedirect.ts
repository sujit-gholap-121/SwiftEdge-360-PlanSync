// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "../components/AuthProvider"; // Assuming you have an auth hook

// export function useAuthRedirect() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user } = useAuth(); // Get auth status from your auth context/hook

//   // Only redirect authenticated users away from auth pages
//   if ((pathname.startsWith("/auth") || pathname === "/") && user) {
//     router.push("/dashboard");
//   }

//   // Return whether we should show the login dialog
//   return {
//     isAllowed: !pathname.startsWith("/dashboard") || user,
//     showLoginDialog: pathname.startsWith("/dashboard") && !user,
//   };
// }
