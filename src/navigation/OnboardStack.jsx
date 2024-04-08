import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "~/screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

const OnboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        statusBarHidden: false,
        statusBarTranslucent: true,
        statusBarStyle: "light",
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default OnboardStack;
