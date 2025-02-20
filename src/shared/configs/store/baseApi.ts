import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

import { COOKIE_TOKEN_NAME } from "@shared/constants/cookiesNames";
import { ETokenActionType } from "@shared/constants/storageNames";
import { deleteCookie } from "@shared/libs/serverCookie";
import { updateStorageForOtherTabs } from "@shared/libs/storages";

import { logOut } from "./slices/authSlice";
import { TAppStore } from "./store";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: baseUrl,
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as ReturnType<TAppStore["getState"]>).auth.accessToken;

      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
   }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
   args,
   api,
   extraOptions
) => {
   const result = await baseQuery(args, api, extraOptions);

   // Делаем пользователя не авторизованным, если с бека нам пришел ответ, то что токен протух
   if (result.error && result.error.status === 401) {
      await deleteCookie(COOKIE_TOKEN_NAME);
      api.dispatch(logOut());
      updateStorageForOtherTabs(ETokenActionType.LOGOUT);
   }

   return result;
};

export const baseApi = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: []
});
