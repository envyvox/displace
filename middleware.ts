import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  "/onboarding",
  "/projects",
  "/p/",
  "/users",
  "/u/",
  "/mentors",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If it's the root path, just render it
  if (pathname === `/`) {
    return NextResponse.next();
  }

  // TODO: how to check it properly?
  const authorized =
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token");

  // If user is not authorized and tries to access protected path, redirect to login page
  if (!authorized && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (authorized) {
    // If user is authorized and tries to access login page, redirect to projects
    if (pathname === `/login`)
      return NextResponse.redirect(new URL(`/projects`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
