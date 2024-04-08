import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  name: "",
  loading: false,
  error: "",
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    fetchSkillStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },
    fetchSkillSuccess: (state, { payload }) => {
      state.error = "";
      state.loading = false;
      state.data = payload.metadata;
      state.pagination = payload.options;
    },
    fetchSkillFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

const { actions: skillActions, reducer: skillReducer } = skillSlice;
const useSkill = () => useSelector((state) => state.skill);

export { skillActions, useSkill };
export default skillReducer;
