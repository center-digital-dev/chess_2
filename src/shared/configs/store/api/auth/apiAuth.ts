import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { ETokenActionType } from "@shared/constants/storageNames";
import { logger } from "@shared/libs/logging";
import { deleteCookie, setCookie } from "@shared/libs/serverCookie";
import { updateStorageForOtherTabs } from "@shared/libs/storages";

import { TAccessToken } from "./types";
import { baseApi } from "../../baseApi";
import { logIn, logOut, setAccessToken } from "../../slices/authSlice";

const apiAuth = baseApi.injectEndpoints({
   endpoints: (build) => {
      return {
         login: build.mutation<TAccessToken, { password: string; email: string }>({
            query(body) {
               return {
                  url: "/Users/Login",
                  method: "PUT",
                  body
               };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
               try {
                  const result = await queryFulfilled;

                  await setCookie(COOKIE_TOKEN_NAME, result.data);
                  updateStorageForOtherTabs(ETokenActionType.LOGIN);
                  dispatch(setAccessToken({ token: result.data }));
                  dispatch(logIn());
                  logger.success("Авторизация прошла успешно");
               } catch {
                  //
               }
            }
         }),
         register: build.mutation<void, { userName: string; password: string; email: string }>({
            query(body) {
               return {
                  url: "/Users/Register",
                  method: "POST",
                  body
               };
            }
         }),
         testToken: build.mutation<void, void>({
            query() {
               return {
                  url: "/Users/testToken",
                  method: "GET"
               };
            }
         }),
         logout: build.mutation<void, void>({
            query() {
               return {
                  url: "/Users/Logout",
                  method: "POST"
               };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
               await queryFulfilled;

               await deleteCookie(COOKIE_TOKEN_NAME);
               dispatch(logOut());
               updateStorageForOtherTabs(ETokenActionType.LOGOUT);
            }
         })
      };
   }
});

export const { useLoginMutation, useRegisterMutation, useTestTokenMutation, useLogoutMutation } = apiAuth;
