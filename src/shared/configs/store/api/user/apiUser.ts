import { IUserProfile } from "@shared/types/profile";

import { baseApi } from "../../baseApi";

const apiUser = baseApi.injectEndpoints({
   endpoints: (build) => {
      return {
         changePassword: build.mutation<string, { oldPassword: string; newPassword: string }>({
            query(body) {
               return {
                  url: "/Users/Password",
                  method: "PUT",
                  body
               };
            }
         }),
         changeProfile: build.mutation<boolean, { newEmail: string }>({
            query(body) {
               return {
                  url: "/Users/User",
                  method: "PUT",
                  body
               };
            },
            invalidatesTags: ["Profile"]
         }),
         getProfile: build.query<IUserProfile, void>({
            query() {
               return {
                  url: "/Users/User"
               };
            },

            providesTags: ["Profile"]
         })
      };
   }
});

export const { useChangePasswordMutation, useChangeProfileMutation, useGetProfileQuery, useLazyGetProfileQuery } =
   apiUser;
