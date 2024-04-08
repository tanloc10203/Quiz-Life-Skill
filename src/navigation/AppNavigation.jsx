import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import Toast from "~/components/ui/Toast";
import { useApp } from "~/features/app/appSlice";
import { authActions, useAuth } from "~/features/auth/authSlice";
import { navigationRef } from "~/utils/navigation.root";
import ColorThemes from "../theme/color.theme";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import OnboardStack from "./OnboardStack";

const AppNavigation = () => {
  const { showToast, onboard } = useApp();
  const { accessToken, refreshToken, userId, loading } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken && !refreshToken && !userId) return;

    dispatch(authActions.getCurrentUserStart());
  }, [accessToken, refreshToken, userId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: ColorThemes.black,
        }}
      >
        {showToast ? <Toast /> : null}
        <ActivityIndicator size={"large"} color={ColorThemes.white} />
      </View>
    );
  }

  if (!onboard) {
    return (
      <NavigationContainer ref={navigationRef}>
        {showToast ? <Toast /> : null}
        <OnboardStack />
      </NavigationContainer>
    );
  }

  if (!accessToken && !refreshToken && !userId) {
    return (
      <NavigationContainer ref={navigationRef}>
        {showToast ? <Toast /> : null}
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {showToast ? <Toast /> : null}
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
