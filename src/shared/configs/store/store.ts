import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@shared/configs/store/baseApi";

import { loggerMiddleware } from "./lib/middlewares";
import { authReducer } from "./slices/authSlice";

export const makeStore = () => {
   return configureStore({
      reducer: {
         auth: authReducer,
         [baseApi.reducerPath]: baseApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware).concat(loggerMiddleware)
   });
};

// Infer the type of makeStore
export type TAppStore = ReturnType<typeof makeStore>;
