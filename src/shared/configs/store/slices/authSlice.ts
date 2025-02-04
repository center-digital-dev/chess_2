import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
   access: string | null;
}

const initialState: IAuthState = {
   access: null
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      setAccess: (state, { payload }: PayloadAction<string>) => {
         state.access = payload;
      }
   }
});

export const { setAccess } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;
