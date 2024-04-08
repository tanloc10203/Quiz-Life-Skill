import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  data: [],
  name: "",
  loading: false,
  error: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fetchGameStart: (state, _) => {
      state.error = "";
      state.loading = true;
    },
    fetchGameSuccess: (state, { payload }) => {
      state.error = "";
      state.loading = false;
      state.data = payload.metadata;
    },
    fetchGameFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

const { actions: gameActions, reducer: gameReducer } = gameSlice;
const useGame = () => useSelector((state) => state.game);

export { gameActions, useGame };
export default gameReducer;
