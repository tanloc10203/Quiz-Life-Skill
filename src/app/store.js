import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gMd) =>
    gMd({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["register", "rehydrate"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }).concat([sagaMiddleware]),
});

export const persistor = persistStore(store);
