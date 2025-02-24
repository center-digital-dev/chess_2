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
               } catch (error) {
                  logger.error("apiUser ~ changePassword ~ error:", error);
               }
            }
         }),
         changeProfile: build.mutation<TResponseApi<boolean>, { newEmail: string }>({
            query(body) {
               return {
                  url: "/Users/User",
                  method: "PUT",
                  body
               };
            },
            async onQueryStarted(args, { queryFulfilled }) {
               try {
                  await queryFulfilled;
               } catch (error) {
                  logger.error("apiUser ~ changePassword ~ error:", error);
               }
            }
         }),
         getProfile: build.query<TResponseApi<{ email: string; userName: string }>, void>({
            query() {
               return {
                  url: "/Users/User"
               };
            },
            providesTags: ["Profile"],
            async onQueryStarted(args, { queryFulfilled }) {
               try {
                  await queryFulfilled;
               } catch (error) {
                  logger.error("apiUser ~ getProfile ~ error:", error);
               }
            }
         })
      };
   }
});

export const { useChangePasswordMutation, useChangeProfileMutation, useGetProfileQuery, useLazyGetProfileQuery } =
   apiUser;
