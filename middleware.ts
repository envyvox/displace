import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If it's the root path, just render it
  if (pathname === `/`) {
    return NextResponse.next();
  }

  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  const session = await getSession({ req: requestForNextAuth });
  const isOnboardingCompleted = session?.user?.onboardingCompleted;

  // If user is not authorized and tries to access dashboard, redirect to signin page
  if (
    !session &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding"))
  ) {
    return NextResponse.redirect(new URL(`/auth/signin`, request.url));
  }

  if (session) {
    // If user is authorized and tries to access sign in page, redirect to dashboard
    if (pathname === `/auth/signin`)
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    // If user completed onboarding and tries to access onboarding page, redirect to dashboard
    if (isOnboardingCompleted && pathname === `/onboarding`)
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    // If user not completed onboarding, redirect to onboarding page
    if (!isOnboardingCompleted && !pathname.startsWith("/onboarding"))
      return NextResponse.redirect(new URL(`/onboarding`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
