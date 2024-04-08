import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "~/components/shared/BottomNav";
import AchievementDetailsScreen from "~/screens/AchievementDetailsScreen";
import AchievementScreen from "~/screens/AchievementScreen";
import FavoriteScreen from "~/screens/FavoriteScreen";
import GameDetailsScreen from "~/screens/GameDetailsScreen";
import GameSuccessScreen from "~/screens/GameSuccessScreen";
import GuildDetailsScreen from "~/screens/GuildDetailsScreen";
import GuildSuccessScreen from "~/screens/GuildSuccessScreen";
import ColorThemes from "~/theme/color.theme";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        statusBarHidden: false,
        statusBarTranslucent: false,
        statusBarAnimation: "none",
        statusBarStyle: "light",
        statusBarColor: ColorThemes.black,
      }}
    >
      <Stack.Screen name="Main" component={BottomNav} />

      <Stack.Screen name="GuildDetails" component={GuildDetailsScreen} />

      <Stack.Screen name="SuccessGuild" component={GuildSuccessScreen} />

      <Stack.Screen name="GameDetails" component={GameDetailsScreen} />

      <Stack.Screen name="GameSuccess" component={GameSuccessScreen} />

      <Stack.Screen name="Achievements" component={AchievementScreen} />

      <Stack.Screen name="AchievementDetails" component={AchievementDetailsScreen} />

      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
