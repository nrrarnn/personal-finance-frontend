// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe AuthState untuk state dari authSlice
export interface AuthState { // Pastikan tipe AuthState di-export
  token: string | null;
  username: string | null;
  email : string | null;
}

const token: string | null = localStorage.getItem("token");
const username: string | null = localStorage.getItem("username");
const email: string | null = localStorage.getItem("email");

const initialState: AuthState = {
  token: token,
  username: username,
  email: email,
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
