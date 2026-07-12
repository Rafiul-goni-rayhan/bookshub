import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/items/add", "/items/manage", "/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Production এ Secure কুকি ব্যবহার হলে নামের সামনে __Secure- প্রিফিক্স যোগ হয়
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add", "/items/manage", "/dashboard"],
};



// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/items/add", "/items/manage", "/dashboard"];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (!isProtected) {
//     return NextResponse.next();
//   }

//   // Better Auth এর সেশন কুকি চেক করা
//   const sessionCookie = request.cookies.get("better-auth.session_token");

//   if (!sessionCookie) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/items/add", "/items/manage", "/dashboard"],
// };