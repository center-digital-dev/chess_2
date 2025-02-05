"use server";

import { cookies } from "next/headers";

/** Функция для установки серверные куки на фронте */
export async function setCookie(name: string, value: string) {
   const cookie = await cookies();
   cookie.set({
      name,
      value,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 11 * 60 * 60 // 11 часов
   });
}

/** Функция для получения серверных куки */
export async function getCookie(name: string): Promise<string | undefined> {
   const cookieStore = await cookies();
   const cookie = cookieStore.get(name);
   return cookie?.value;
}

/** Функция для удаления куки на сервере */
export async function deleteCookie(name: string) {
   const cookieStore = await cookies();
   cookieStore.delete(name);
}
