import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  user: null,
  loading: false,
  error: "",
  mode: "",
  isFetching: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },

    setMode: (state, { payload }) => {
      state.mode = payload;
    },

    loginStart: (state, { payload }) => {
      state.error = "";
    },

    loginSuccess: (state, { payload }) => {
      console.log(`payload login success ::: `, JSON.stringify(payload, null, 4));
      state.userId = payload.userId;
      state.accessToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
    },

    loginFailed: (state, { payload }) => {
      state.error = payload;
    },

    registerStart: (state, { payload }) => {
      state.error = "";
    },

    registerSuccess: (state) => {
      state.error = "";
    },

    getCurrentUserStart: (state) => {
      state.error = "";
      state.loading = true;
    },
    getCurrentUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    getCurrentUserFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // Logout
    logoutStart: (state, _) => {
      state.loading = true;
      state.error = "";
    },
    logoutSuccess: (state, _) => {
      state.loading = false;
      state.error = "";

      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    logoutStart: (state, { payload }) => {
      state.loading = false;
      state.error = payload;

      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
    },

    // Change Profile
    fetchChangeProfileStart: (state) => {
      state.error = "";
      state.isFetching = true;
    },
    fetchChangeProfileSuccess: (state, { payload }) => {
      state.error = "";
      state.user = payload;
      state.isFetching = false;
      state.mode = "";
    },
    fetchChangeProfileFailed: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },

    // Change Password
    fetchChangePasswordStart: (state) => {
      state.error = "";
      state.isFetching = true;
    },
    fetchChangePasswordSuccess: (state, { payload }) => {
      state.error = "";
      state.isFetching = false;
      state.mode = "";
    },
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;
const useAuth = () => useSelector((state) => state.auth);

export { authActions, useAuth };
export default authReducer;
