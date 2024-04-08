import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  name: "",
  loading: false,
  error: "",
};

const achievementSlice = createSlice({
  name: "achievement",
  initialState,
  reducers: {
    fetchAchievementStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },
    fetchAchievementSuccess: (state, { payload }) => {
      state.error = "";
      state.loading = false;
      state.data = payload.metadata;
    },
    fetchAchievementFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    fetchCreateAchievementStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },

    fetchCreateAchievementSuccess: (state, _) => {
      state.error = "";
      state.loading = false;
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

const { actions: achievementActions, reducer: achievementReducer } = achievementSlice;
const useAchievement = () => useSelector((state) => state.achievement);

export { achievementActions, useAchievement };
export default achievementReducer;
