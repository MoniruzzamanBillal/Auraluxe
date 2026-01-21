import { NextRequest, NextResponse } from "next/server";
import { refreshTokenKey } from "./constants/storageKey";
import { decodedToken } from "./services/jwt";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route patterns
  const isLoginPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");
  const isDashboardRoute = isAdminRoute || isUserRoute;
  const isPublicRoute = !isDashboardRoute && !isLoginPage;

  const token = request.cookies.get("accessToken")?.value;

  // Handle public routes - no token required
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 🔹 CASE 1: No token but trying to access protected routes
  if (!token && (isAdminRoute || isUserRoute || isLoginPage)) {
    // Allow access to login page without token
    if (isLoginPage) {
      return NextResponse.next();
    }

    // Redirect to login for protected routes
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 CASE 2: User has token
  if (token) {
    try {
      const decodedData = decodedToken(String(token)) as any;
      const { role } = decodedData;

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedData.exp && decodedData.exp < currentTime) {
        // Clear expired token
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        return response;
      }

      // 🔹 Admin trying to access user routes
      if (isUserRoute && role === "admin") {
        //  Redirect to admin dashboard
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      // 🔹 User trying to access admin routes
      if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // 🔹 User trying to access their own user routes
      if (isUserRoute && role === "user") {
        // Allow access
        return NextResponse.next();
      }

      // 🔹 Admin trying to access admin routes
      if (isAdminRoute && role === "admin") {
        // Allow access
        return NextResponse.next();
      }

      // 🔹 Logged-in user trying to access login page
      if (isLoginPage) {
        // Redirect based on role
        // const redirectPath = role === "admin" ? "/admin" : "/user";
        const redirectPath = "/";
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    } catch (error) {
      // Invalid token
      console.log("Token decoding error:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete(refreshTokenKey);
      return response;
    }
  }

  // Allow other routes (like home page, about, contact, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*", // All admin routes
    "/user/:path*", // All user routes
    "/",
  ],
};
