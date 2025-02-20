import { logger } from "@shared/libs/logging";
import { TResponseApi } from "@shared/types/api";

import { baseApi } from "../../baseApi";

const apiUser = baseApi.injectEndpoints({
   endpoints: (build) => {
      return {
         changePassword: build.mutation<TResponseApi<string>, { oldPassword: string; newPassword: string }>({
            query(body) {
               return {
                  url: "/Users/Password",
                  method: "PUT",
                  body
               };
            },
            async onQueryStarted(args, { queryFulfilled }) {
               try {
                  await queryFulfilled;
                  // if (data.success) {
                  //    await setCookie(COOKIE_TOKEN_NAME, data.data);
                  //    updateStorageForOtherTabs(ETokenActionType.LOGIN);
                  //    dispatch(setAccessToken({ token: data.data }));
                  //    dispatch(logIn());
                  // } else {
                  //    throw data;
                  // }
               } catch (error) {
                  logger.error("apiUser ~ changePassword ~ error:", error);
               }
            }
         })
      };
   }
});

export const { useChangePasswordMutation } = apiUser;
