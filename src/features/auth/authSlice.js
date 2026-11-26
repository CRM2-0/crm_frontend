import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, status: "idle" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.status = "authenticated";
    },
    signOut: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const { setCredentials, signOut } = authSlice.actions;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
