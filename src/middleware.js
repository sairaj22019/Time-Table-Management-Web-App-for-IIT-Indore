
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Ignore static/public paths and login/signup
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/notAllowed"
  ) {
    return NextResponse.next();
  }

  // Fetch role from backend
  let role = null;
  try {
    const res = await fetch(`${origin}/api/user/role`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    if (res.ok) {
      const data = await res.json();
      role = data.role;
    }
  } catch (e) {
    console.error("Error fetching role in middleware:", e);
  }

  console.log("ROLE" , role)

  if(pathname === '/' && role){
    return NextResponse.redirect(new URL(`/${role}`, request.url));

  }

  if(pathname === '/complete-profile' && role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!role) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // If role is admin, allow access
    if (pathname === '/complete-profile') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect /student routes
  if (pathname.startsWith('/student')) {
    if (!role) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user's role is empty and not admin, force complete-profile
    if (!role) {
      const completeUrl = new URL('/complete-profile', request.url);
      return NextResponse.redirect(completeUrl);
    }

    if (role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /professor routes
  if (pathname.startsWith('/professor')) {
    if (!role) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!role) {
      const completeUrl = new URL('/complete-profile', request.url);
      return NextResponse.redirect(completeUrl);
    }

    if (role !== 'professor') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|api/|favicon.ico|login|signup|notAllowed).*)",
  ],
};
