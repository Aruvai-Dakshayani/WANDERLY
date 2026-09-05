import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("wanderlyUser");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isLoggedIn: savedUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem(
        "wanderlyUser",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("wanderlyUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;