import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

// TODO Добавить комменты, расписать зачем нужен этот файл

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: baseUrl,

   prepareHeaders: (headers) => {
      // TODO Koshelev закладываю функционал на будущее, когда мы будем делать авторизацию
      // const token =
      //    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTk0Y2MxMi05NTczLTcyZGYtODY3Zi1kNzY4MGYyNjVhOTciLCJleHAiOjE3Mzg3MTg5NzR9.xlQ_6-h5WD3NtYVtMMlADY4jsB7XsiswndBi80q2a5w";

      // if (token) {
      //    headers.set("Authorization", `Bearer ${token}`);
      // }

      return headers;
   }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
   args,
   api,
   extraOptions
) => {
   const result = await baseQuery(args, api, extraOptions);

   // TODO Koshelev додумать логику с обновлением токена
   // if (result.error && result.error.status === 401) {
   //    api.dispatch(logOut());
   // }

   return result;
};

export const baseApi = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: []
});
