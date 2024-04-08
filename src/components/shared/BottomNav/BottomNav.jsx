import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameScreen from "~/screens/GameScreen";
import GuildScreen from "~/screens/GuildScreen";
import HomeScreen from "~/screens/HomeScreen";
import ProfileScreen from "~/screens/ProfileScreen";
import ScanScreen from "~/screens/ScanScreen";
import ColorThemes from "~/theme/color.theme";
import { SPACING_BUTTON_TAB_VIEW } from "~/utils/scale";

const Tab = createBottomTabNavigator();

const TabItem = ({ color, focused, name, icon }) => {
  const Icon = icon(color);
  const styles = useStyles(color);

  return (
    <View style={styles.tabBarItem}>
      <View>{focused ? Icon.focused : Icon.default}</View>
      <Text style={styles.tabBarItemText}>{name}</Text>
    </View>
  );
};

const TabBarButton = ({ children, onPress, accessibilityState }) => {
  const styles = useStyles(ColorThemes.blue);

  return (
    <TouchableOpacity
      style={[
        styles.buttonTabWrapper,
        styles.buttonTabView,
        !accessibilityState.selected ? styles.disable : null,
      ]}
      activeOpacity={0.86}
      onPress={onPress}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

const BottomNav = () => {
  const styles = useStyles();
  const bottomConfig = useMemo(
    () => [
      {
        component: HomeScreen,
        icon: (color) => ({
          focused: <Entypo name="home" size={24} color={color} />,
          default: <Entypo name="home" size={24} color={color} />,
        }),
        name: "Home",
      },
      {
        component: GameScreen,
        icon: (color) => ({
          focused: <Entypo name="game-controller" size={24} color={color} />,
          default: <Entypo name="game-controller" size={24} color={color} />,
        }),
        name: "Game",
      },
      {
        component: ScanScreen,
        icon: (color) => ({
          focused: <AntDesign name="scan1" size={24} color="white" />,
          default: <AntDesign name="scan1" size={24} color="white" />,
        }),
        name: "Scan",
        button: true,
      },
      {
        component: GuildScreen,
        icon: (color) => ({
          focused: <Entypo name="grooveshark" size={24} color={color} />,
          default: <Entypo name="grooveshark" size={24} color={color} />,
        }),
        name: "Guild",
      },
      {
        component: ProfileScreen,
        icon: (color) => ({
          focused: <Ionicons name="person-circle" size={24} color={color} />,
          default: <Ionicons name="person-circle-outline" size={24} color={color} />,
        }),
        name: "Profile",
      },
    ],
    []
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: styles.activeColor.color,
      }}
    >
      {bottomConfig.map((config, index) => (
        <Tab.Screen
          key={index}
          name={config.name}
          component={config.component}
          options={{
            tabBarIcon: ({ color, focused, size }) =>
              config.button ? (
                config.icon(color).default
              ) : (
                <TabItem color={color} focused={focused} icon={config.icon} name={config.name} />
              ),
            ...(config.button
              ? {
                  tabBarButton(props) {
                    return config.button ? <TabBarButton {...props} /> : undefined;
                  },
                }
              : {}),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNav;

const useStyles = (color = "") => {
  return StyleSheet.create({
    tabBar: {
      backgroundColor: ColorThemes.white,
      shadowColor: ColorThemes.red,
      elevation: 6,
      height: 50,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
    tabBarItem: {
      justifyContent: "center",
      alignItems: "center",
    },
    disable: {
      backgroundColor: ColorThemes.gray,
    },
    activeColor: {
      color: ColorThemes.blue,
    },
    tabBarItemText: {
      color: color,
    },
    buttonTabWrapper: {
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: ColorThemes.red,
      elevation: 5,
    },
    buttonTabView: {
      width: SPACING_BUTTON_TAB_VIEW,
      height: SPACING_BUTTON_TAB_VIEW,
      borderRadius: SPACING_BUTTON_TAB_VIEW / 2,
      backgroundColor: color,
    },
  });
};
