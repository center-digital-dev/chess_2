import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@shared/configs/store/baseApi";

import { authReducer } from "./slices/authSlice";

export const makeStore = () => {
   return configureStore({
      reducer: {
         auth: authReducer,
         [baseApi.reducerPath]: baseApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
   });
};

// Infer the type of makeStore
export type TAppStore = ReturnType<typeof makeStore>;
