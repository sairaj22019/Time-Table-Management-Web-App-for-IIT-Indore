import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Ignore static and public paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/login' ||
    pathname === '/complete-profile'
  ) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })


  if (pathname.startsWith('/student')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!token.role) {
      const completeUrl = new URL('/complete-profile', request.url)
      return NextResponse.redirect(completeUrl)
    }
  }else if(pathname.startsWith('/professor')){
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!token.role) {
      const completeUrl = new URL('/complete-profile', request.url)
      return NextResponse.redirect(completeUrl)
    }
  }
  console.log("Token" , token);

   if (pathname.startsWith('/student') && token.role !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/professor') && token.role !== 'professor') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // else if(pathname.startsWith('/student')){
  //   if (!token) {
  //     const loginUrl = new URL('/login', request.url)
  //     loginUrl.searchParams.set('returnTo', pathname)
  //     return NextResponse.redirect(loginUrl)
  //   }

  //   if (!token.role) {
  //     const completeUrl = new URL('/complete-profile', request.url)
  //     return NextResponse.redirect(completeUrl)
  //   }

  // }else if(pathname.startsWith('/professor')){
  //   if (!token) {
  //     const loginUrl = new URL('/login', request.url)
  //     loginUrl.searchParams.set('returnTo', pathname)
  //     return NextResponse.redirect(loginUrl)
  //   }

  //   if (!token.role) {
  //     const completeUrl = new URL('/complete-profile', request.url)
  //     return NextResponse.redirect(completeUrl)
  //   }
  // }



  if (pathname.startsWith('/about')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// export const config = {

//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
//     // Or match specific paths, e.g.:
//     // '/dashboard/:path*',
//     // '/about/:path*'
//   ]
// }


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|complete-profile).*)',
  ]
}






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


//   if (pathname.startsWith('/student')) {
//     if (!token) {
//       const loginUrl = new URL('/login', request.url)
//       loginUrl.searchParams.set('returnTo', pathname)
//       return NextResponse.redirect(loginUrl)
//     }

//     if (!token.role) {
//       const completeUrl = new URL('/complete-profile', request.url)
//       return NextResponse.redirect(completeUrl)
//     }
//   }else if(pathname.startsWith('/professor')){
//     if (!token) {
//       const loginUrl = new URL('/login', request.url)
//       loginUrl.searchParams.set('returnTo', pathname)
//       return NextResponse.redirect(loginUrl)
//     }

//     if (!token.role) {
//       const completeUrl = new URL('/complete-profile', request.url)
//       return NextResponse.redirect(completeUrl)
//     }
//   }
//   console.log("Token" , token);

//    if (pathname.startsWith('/student') && token.role !== 'student') {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   if (pathname.startsWith('/professor') && token.role !== 'professor') {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   if (pathname.startsWith('/about')) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {

//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
//     // Or match specific paths, e.g.:
//     // '/dashboard/:path*',
//     // '/about/:path*'
//   ]
// }


// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|login|complete-profile).*)',
//   ]
// }

