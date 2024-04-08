import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "~/screens/Auth/LoginScreen";
import RegisterScreen from "~/screens/Auth/RegisterScreen";
import SuccessScreen from "~/screens/SuccessScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Success"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        statusBarHidden: false,
        statusBarTranslucent: true,
        statusBarStyle: "light",
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
