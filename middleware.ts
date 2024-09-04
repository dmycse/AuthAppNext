import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_SIGNIN_REDIRECT} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  let { nextUrl } = req;
  let isUserSignedIn = !!req.auth;

  let isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  let isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  let isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  console.log("\x1b[36m", 'MIDDLEWARE: ', "\x1b[0m", {
    Auth: req.auth,
    Route: req.nextUrl.pathname,
    isUserSignedIn,
    isApiAuthRoute,
    isPublicRoute,
    isAuthRoute,
    // NextUrl: nextUrl,
    // Req: req,
    // Res: NextResponse.next(),
    // URL: new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl),
    // Cookies: req.cookies.get("authjs.csrf-token")
    }
  );
  
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isUserSignedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    
    return;
  }

  if (!isUserSignedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/signin', nextUrl));
  }

  
  return;
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};