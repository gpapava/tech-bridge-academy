import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin-only routes
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // SME-only routes
    if (pathname.startsWith("/smes/coaching")) {
      if (token?.role !== "COMPANY" && token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // School-only routes
    if (pathname.startsWith("/schools/observatory") || pathname.startsWith("/schools/staff-development")) {
      if (token?.role !== "SCHOOL" && token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Public paths — always allowed
        const publicPaths = [
          "/",
          "/about",
          "/partners",
          "/news",
          "/events",
          "/auth/login",
          "/auth/register",
          "/auth/error",
          "/bridge",
          "/bridge/career-guidance",
          "/bridge/map",
        ];

        if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
          return true;
        }

        // API auth routes always allowed
        if (pathname.startsWith("/api/auth")) return true;

        // Public API endpoints
        if (
          pathname === "/api/profiles" ||
          pathname === "/api/events" ||
          pathname === "/api/news" ||
          pathname === "/api/repository" ||
          pathname === "/api/repository/tags" ||
          pathname === "/api/networking" ||
          pathname === "/api/admin/stats" ||
          pathname === "/api/profiles/map" ||
          pathname === "/api/geocode"
        ) {
          return true;
        }

        // Everything else requires authentication
        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|images).*)",
  ],
};
