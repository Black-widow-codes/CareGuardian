import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};