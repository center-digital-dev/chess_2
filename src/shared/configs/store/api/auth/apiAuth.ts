import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { ETokenActionType } from "@shared/constants/storageNames";
import { logger } from "@shared/libs/logging";
import { deleteCookie, setCookie } from "@shared/libs/serverCookie";
import { updateStorageForOtherTabs } from "@shared/libs/storages";
import { TResponseApi } from "@shared/types/api";

import { TAccessToken } from "./types";
import { baseApi } from "../../baseApi";
import { logIn, logOut, setAccessToken } from "../../slices/authSlice";

const apiAuth = baseApi.injectEndpoints({
   endpoints: (build) => {
      return {
         login: build.mutation<TResponseApi<TAccessToken>, { password: string; email: string }>({
            query(body) {
               return {
                  url: "/Users/Login",
                  method: "PUT",
                  body
               };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
               try {
                  const { data } = await queryFulfilled;

                  if (data.success) {
                     await setCookie(COOKIE_TOKEN_NAME, data.data);
                     updateStorageForOtherTabs(ETokenActionType.LOGIN);
                     dispatch(setAccessToken({ token: data.data }));
                     dispatch(logIn());
                  } else {
                     throw data;
                  }
               } catch (error) {
                  logger.error("apiAuth ~ login ~ error:", error);
               }
            }
         }),
         register: build.mutation<TResponseApi, { userName: string; password: string; email: string }>({
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
         logout: build.mutation<TResponseApi, void>({
            query() {
               return {
                  url: "/Users/Logout",
                  method: "POST"
               };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
               try {
                  await queryFulfilled;

                  // if (data.success) {
                  await deleteCookie(COOKIE_TOKEN_NAME);
                  dispatch(logOut());
                  updateStorageForOtherTabs(ETokenActionType.LOGOUT);
                  // } else {
                  //    throw data;
                  // }
               } catch (error) {
                  logger.error("apiAuth ~ logout ~ error:", error);
               }
            }
         })
      };
   }
});

export const { useLoginMutation, useRegisterMutation, useTestTokenMutation, useLogoutMutation } = apiAuth;
