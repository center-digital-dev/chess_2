import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const token = request.cookies.get("token")?.value;
   console.log("token", token);

   return NextResponse.next();
}

// Обновляем конфигурацию, чтобы middleware срабатывал для всех маршрутов
export const config = {
   matcher: ["/((?!_next/static|favicon.ico).*)"]
};
