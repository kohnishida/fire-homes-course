import { read } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { decode } from "punycode";

export async function middleware(request: NextRequest) {
  console.log("Middleware :", request.url);
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await request.cookies;
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register") ||
      request.nextUrl.pathname.startsWith("/property-search"))
  ) {
    return NextResponse.next();
  }

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = decodeJwt(token);

  // Token expiration check (with 5 minutes buffer)
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  if (
    !decodedToken.admin &&
    request.nextUrl.pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    decodedToken.admin &&
    request.nextUrl.pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/account",
    "/account/:path*",
    "/property-search",
  ],
};
