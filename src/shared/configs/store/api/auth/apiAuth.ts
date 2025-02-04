import { baseApi } from "../../baseApi";

type TAccessToken = string;

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
         })
      };
   }
});

export const { useLoginMutation, useRegisterMutation, useTestTokenMutation } = apiAuth;
