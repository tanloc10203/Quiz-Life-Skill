import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  pagination: {
    page: 1,
    limit: 6,
    totalPage: 2,
  },
  filters: {
    page: 1,
    limit: 6,
  },
  loading: false,
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoryStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },
    fetchCategorySuccess: (state, { payload }) => {
      state.error = "";
      state.loading = false;
      state.data = payload.metadata;
      state.pagination = payload.options;
    },
    fetchCategoryFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

const { actions: categoryActions, reducer: categoryReducer } = categorySlice;
const useCategory = () => useSelector((state) => state.category);

export { categoryActions, useCategory };
export default categoryReducer;
