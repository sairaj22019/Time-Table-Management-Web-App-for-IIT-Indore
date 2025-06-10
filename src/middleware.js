
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {

  const { pathname } = request.nextUrl

 
  if (pathname.startsWith('/dashboard')) {
 
    const token = await getToken({ req: request })
    

    if (!token) {
      const loginUrl = new URL('/login', request.url)

      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

 
  if (pathname.startsWith('/about')) {
    return NextResponse.redirect(new URL('/', request.url))
  }


  return NextResponse.next()
}

export const config = {

  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    // Or match specific paths, e.g.:
    // '/dashboard/:path*',
    // '/about/:path*'
  ]
}
