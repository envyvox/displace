import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If it's the root path, just render it
  if (pathname === `/`) {
    return NextResponse.next();
  }

  const authorized =
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token");

  // If user is not authorized and tries to access dashboard, redirect to signin page
  if (
    !authorized &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding"))
  ) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (authorized) {
    // If user is authorized and tries to access sign in page, redirect to dashboard
    if (pathname === `/login`)
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
