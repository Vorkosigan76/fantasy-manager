import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import { type Session } from "@/lib/auth";
import {
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
  SIGNIN_ROUTE,
} from "@/routes";

// This middleware is used to handle internationalization (i18n) routing
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Get the session from the request
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const isAuthRoute = authRoutes.some(
    (route) => nextUrl.pathname.includes(route) === true
  );
  const isPrivateRoute = privateRoutes.some(
    (route) => nextUrl.pathname.includes(route) === true
  );
  const isAdminRoute = adminRoutes.some(
    (route) => nextUrl.pathname.includes(route) === true
  );

  // If the user is authenticated and trying to access an auth route
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // If the user is not authenticated and trying to access a private route
  if ((isPrivateRoute || isAdminRoute) && !session) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`${SIGNIN_ROUTE}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // If the user is not an admin and tries to access an admin route
  //if (isAdminRoute && session?.user.role !== "admin") {
  //  return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //}

  // If all is ok, continue with the request
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for special ones
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
