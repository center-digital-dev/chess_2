import { NextResponse } from "next/server";

import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";

import type { NextRequest } from "next/server";

// Пути, которые доступны не авторизованным пользователям
const publicRoutes = ["/login"];

export function middleware(request: NextRequest) {
   const token = request.cookies.get(COOKIE_TOKEN_NAME)?.value;
   const path = request.nextUrl.pathname;

   if (!token && !publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   // if (token && publicRoutes.includes(path)) {
   //    return NextResponse.redirect(new URL("/", request.url));
   // }

   return NextResponse.next();
}

export const config = {
   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};
