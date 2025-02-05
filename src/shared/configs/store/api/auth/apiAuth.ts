import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { logger } from "@shared/libs/logging";
import { setCookie } from "@shared/libs/serverCookie/cookies";
import { TResponseApi } from "@shared/types/api";

import { TAccessToken } from "./types";
import { baseApi } from "../../baseApi";
import { logIn } from "../../slices/authSlice";

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
               logger.info("apiAuth ~ onQueryStarted ~ args:", args);
               try {
                  const { data } = await queryFulfilled;

                  if (data.success) {
                     dispatch(logIn({ token: data.data }));
                     await setCookie(COOKIE_TOKEN_NAME, data.data);
                  } else {
                     throw data;
                  }
               } catch (error) {
                  logger.error("apiAuth ~ onQueryStarted ~ error:", error);
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
         })
      };
   }
});

export const { useLoginMutation, useRegisterMutation, useTestTokenMutation } = apiAuth;
