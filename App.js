import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rootSaga from "~/app/rootSaga";
import { persistor, sagaMiddleware, store } from "~/app/store";
import Loader from "~/components/ui/Loader";
import AppNavigation from "~/navigation/AppNavigation";

sagaMiddleware.run(rootSaga);

export default function App() {
  useEffect(() => {
    // (async () => {
    //   await Promise.all([
    //     AsyncStorageRN.removeItem("persist:auth"),
    //     AsyncStorageRN.removeItem("persist:app"),
    //   ]);
    // })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Loader />

          <AppNavigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
