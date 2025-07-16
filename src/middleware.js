// import { NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request) {
//   const { pathname } = request.nextUrl

//   // Ignore static and public paths
//   if (
//     pathname.startsWith('/api') ||
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/favicon.ico') ||
//     pathname === '/login' ||
//     pathname === '/complete-profile'
//   ) {
//     return NextResponse.next()
//   }

//   const token = await getToken({ req: request })


//   if (pathname.startsWith('/dashboard')) {
//     if (!token) {
//       const loginUrl = new URL('/login', request.url)
//       loginUrl.searchParams.set('returnTo', pathname)
//       return NextResponse.redirect(loginUrl)
//     }


//     if (!token.username || !token.role) {
//       const completeUrl = new URL('/complete-profile', request.url)
//       return NextResponse.redirect(completeUrl)
//     }
//   }
//   // else if(pathname.startsWith('/student')){
//   //   if (!token) {
//   //     const loginUrl = new URL('/login', request.url)
//   //     loginUrl.searchParams.set('returnTo', pathname)
//   //     return NextResponse.redirect(loginUrl)
//   //   }

//   //   if (!token.role) {
//   //     const completeUrl = new URL('/complete-profile', request.url)
//   //     return NextResponse.redirect(completeUrl)
//   //   }

//   // }else if(pathname.startsWith('/professor')){
//   //   if (!token) {
//   //     const loginUrl = new URL('/login', request.url)
//   //     loginUrl.searchParams.set('returnTo', pathname)
//   //     return NextResponse.redirect(loginUrl)
//   //   }

//   //   if (!token.role) {
//   //     const completeUrl = new URL('/complete-profile', request.url)
//   //     return NextResponse.redirect(completeUrl)
//   //   }
//   // }



//   if (pathname.startsWith('/about')) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return NextResponse.next()
// }

// // export const config = {

// //   matcher: [
// //     '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
// //     // Or match specific paths, e.g.:
// //     // '/dashboard/:path*',
// //     // '/about/:path*'
// //   ]
// // }


// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|login|complete-profile).*)',
//   ]
// }









import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Ignore static and public paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/login'
  ) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })
  console.log("Token", token)

  const allowedAdminEmails = ['cse240001071@iiti.ac.in', 'cse240001070@iiti.ac.in','cse240001033@iiti.ac.in','cse240001029@iiti.ac.in','test50@iiti.ac.in']


  if (token && allowedAdminEmails.includes(token.email)){
    if (pathname === '/complete-profile') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    // They are admins; no need to force complete-profile, so continue normally
  }

  // Protect /student routes
  if (pathname.startsWith('/student')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If the user's role is empty (and not an admin), redirect to complete-profile
    if(!token.role && !allowedAdminEmails.includes(token.email)) {
      const completeUrl = new URL('/complete-profile', request.url)
      return NextResponse.redirect(completeUrl)
    }

    if (token.role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /professor routes
  if (pathname.startsWith('/professor')) {
    if(!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!token.role && !allowedAdminEmails.includes(token.email)) {
      const completeUrl = new URL('/complete-profile', request.url)
      return NextResponse.redirect(completeUrl)
    }

    if (token.role !== 'professor') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!token || !allowedAdminEmails.includes(token.email)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ]
}
