"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { TAppStore, makeStore } from "@shared/configs/store";
import { setAccessToken } from "@shared/configs/store/slices/authSlice";

export const StoreProvider = ({ children, jwtToken }: { children: React.ReactNode; jwtToken?: string }) => {
   const storeRef = useRef<TAppStore>(undefined);

   if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();
      if (jwtToken) storeRef.current.dispatch(setAccessToken({ token: jwtToken }));
   }

   return <Provider store={storeRef.current}>{children}</Provider>;
};
