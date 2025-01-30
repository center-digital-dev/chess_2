import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@shared/configs/store/baseApi";

import { counterReducer } from "./slices/counter";

export const makeStore = () => {
   return configureStore({
      reducer: {
         counter: counterReducer,
         [baseApi.reducerPath]: baseApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
   });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
