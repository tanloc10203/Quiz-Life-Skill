import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  onboard: null,
  showToast: false,
  toastMessage: "",
  toastType: "success",
  loading: false,

  openSearch: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOnboard: (state, { payload }) => {
      state.onboard = payload;
    },

    setToast: (state, { payload }) => {
      state.showToast = payload.showToast;
      state.toastMessage = payload.toastMessage;
      state.toastType = payload.toastType;
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

    setOpenSearch: (state, { payload }) => {
      state.openSearch = payload;
    },

    setToggleSearch: (state) => {
      state.openSearch = !state.openSearch;
    },
  },
});

const { actions: appActions, reducer: appReducer } = appSlice;
const useApp = () => useSelector((state) => state.app);

export { appActions, useApp };
export default appReducer;
