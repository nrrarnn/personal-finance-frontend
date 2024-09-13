// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe AuthState untuk state dari authSlice
export interface AuthState { // Pastikan tipe AuthState di-export
  token: string | null;
  username: string | null;
  email : string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; username: string ; email: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
