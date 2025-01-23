import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");

  // If trying to access dashboard routes without auth
  if (request.nextUrl.pathname.startsWith("/dashboard") && !authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If authenticated user tries to access auth pages
  if (
    (request.nextUrl.pathname.startsWith("/auth") ||
      request.nextUrl.pathname === "/") &&
    authCookie
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"],
};
