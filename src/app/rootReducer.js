import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import achievementReducer from "~/features/achievement/achievementSlice";
import appReducer from "~/features/app/appSlice";
import authReducer from "~/features/auth/authSlice";
import categoryReducer from "~/features/category/categorySlice";
import favoriteReducer from "~/features/favorite/favoriteSlice";
import gameReducer from "~/features/game/gameSlice";
import skillReducer from "~/features/skill/skillSlice";

const persistConfig = {
  key: "app",
  storage: AsyncStorage,
  timeout: 0,
};

const rootReducer = combineReducers({
  app: persistReducer(
    {
      ...persistConfig,
      blacklist: ["showToast", "toastMessage", "toastType", "loading", "openSearch"],
    },
    appReducer
  ),
  auth: persistReducer(
    {
      ...persistConfig,
      key: "auth",
      blacklist: ["loading", "error", "mode", "isFetching"],
    },
    authReducer
  ),
  category: categoryReducer,
  skill: skillReducer,
  game: gameReducer,
  achievement: achievementReducer,
  favorite: favoriteReducer,
});

export default rootReducer;
