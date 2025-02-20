import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
   accessToken: string | null;
   isAuth: boolean;

   user: null | { name: string };
}

const initialState: IAuthState = {
   accessToken: null,
   isAuth: false,

   user: null
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
         state.user = { name: "Den" };
      },

      logOut: (state) => {
         state.accessToken = null;
         state.isAuth = false;

         state.user = null;
      }
   }
});

export const { setAccessToken, logIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
