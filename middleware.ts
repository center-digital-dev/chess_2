import { NextResponse } from "next/server";

import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { publicRoutes } from "@shared/constants/publicRoutes";

import type { NextRequest } from "next/server";

/** Middleware который проверяет наличие токена, если его нет, то перенаправляет на страницу авторизации. Если есть, значит человек авторизован */
export function middleware(request: NextRequest) {
   const token = request.cookies.get(COOKIE_TOKEN_NAME)?.value;
   const path = request.nextUrl.pathname;

   if (!token && !publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   if (token && publicRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};
