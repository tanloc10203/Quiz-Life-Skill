import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  name: "",
  loading: false,
  error: "",
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    fetchFavoriteStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },
    fetchFavoriteSuccess: (state, { payload }) => {
      state.error = "";
      state.loading = false;
      state.data = payload.metadata;
    },
    fetchFavoriteFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    fetchAddFavoriteStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },

    fetchAddFavoriteSuccess: (state, _) => {
      state.error = "";
      state.loading = false;
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

const { actions: favoriteActions, reducer: favoriteReducer } = favoriteSlice;
const useFavorite = () => useSelector((state) => state.favorite);

export { favoriteActions, useFavorite };
export default favoriteReducer;
