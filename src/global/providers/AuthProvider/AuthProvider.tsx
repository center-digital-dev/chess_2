"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useTestTokenMutation } from "@api/auth/apiAuth";
import { logIn, logOut, setAccessToken } from "@shared/configs/store/slices/authSlice";
import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { publicRoutes } from "@shared/constants/publicRoutes";
import { ETokenActionType, TK_ACTION_STORAGE_NAME } from "@shared/constants/storageNames";
import { useAppDispatch, useAppSelector } from "@shared/hooks/useReduxStore";
import { logger } from "@shared/libs/logging";
import { getCookie } from "@shared/libs/serverCookie";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [testToken] = useTestTokenMutation();

   const { accessToken, isAuth } = useAppSelector((state) => state.auth);
   const [isCheckingToken, setIsCheckingToken] = useState(!!accessToken);
   const dispatch = useAppDispatch();
   const router = useRouter();
   const pathname = usePathname();

   // Проверяем валидность токена, если он есть
   useEffect(() => {
      if (accessToken) {
         testToken()
            .unwrap()
            .then(() => {
               dispatch(logIn());
            })
            .finally(() => {
               setIsCheckingToken(false);
            });
      }
   }, []);

   // Слушаем события storage для синхронизации между вкладками
   useEffect(() => {
      const handleStorageChange = async (event: StorageEvent) => {
         if (event.key === TK_ACTION_STORAGE_NAME && event.newValue) {
            logger.info("Event storage", event)();
            if (event.newValue === ETokenActionType.LOGIN) {
               const token = await getCookie(COOKIE_TOKEN_NAME);
               if (token) {
                  dispatch(setAccessToken({ token }));
                  dispatch(logIn());
               } else {
                  dispatch(logOut());
               }
            } else if (event.newValue === ETokenActionType.LOGOUT) {
               dispatch(logOut());
            }
         }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => {
         window.removeEventListener("storage", handleStorageChange);
      };
   }, []);

   // Делаем проверку на приватные пути, если что редиректим на нужную нам стр
   useEffect(() => {
      // Заходим в проверку в том случае, если мы уже слелали проверку на валидность токена
      if (isCheckingToken === false) {
         // Если пользователь не авторизован и он находится на приватном пути, то редиректим на страницу login
         if (!isAuth && !publicRoutes.includes(pathname)) router.push("/login");

         // Если пользователь авторизован и он находится на публичном пути, то редиректим на приватный путь
         if (isAuth && publicRoutes.includes(pathname)) router.push("/");
      }
   }, [isAuth, isCheckingToken]);

   return <>{children}</>;
};
