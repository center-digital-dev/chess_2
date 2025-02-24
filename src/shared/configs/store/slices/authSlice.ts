import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { IUserProfile } from "@shared/types/profile";

interface IAuthState {
   accessToken: string | null;
   isAuth: boolean;
}

const initialState: IAuthState = {
   accessToken: null,
   isAuth: false
};

export const authSlice = createSlice({
   name: "authSlice",
   initialState,
   reducers: {
      setAccessToken: (state, action: PayloadAction<{ token: string }>) => {
         state.accessToken = action.payload.token;
      },

      logIn: (state) => {
         state.isAuth = true;
      },

      logOut: (state) => {
         state.accessToken = null;
         state.isAuth = false;
      }
   }
});

export const { setAccessToken, logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
