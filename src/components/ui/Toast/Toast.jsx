import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { appActions, useApp } from "~/features/app/appSlice";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { STATUS_BAR_HEIGHT, WIDTH_WINDOW } from "~/utils/scale";

const Toast = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { toastMessage: message, toastType: type } = useApp();

  console.log({ message, type });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2900),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dispatch(appActions.setToast({ showToast: false, toastMessage: "", toastType: "success" }));
    });
  }, [opacity]);

  return (
    <View style={styles.top}>
      <Animated.View
        style={[
          styles.toast,
          {
            opacity,
            transform: [
              { translateY: opacity.interpolate({ inputRange: [0, 1], outputRange: [-25, 0] }) },
            ],
          },
          type === "success" ? styles.toastSuccess : styles.toastError,
        ]}
      >
        {type === "success" ? (
          <AntDesign name="checkcircle" size={24} color={ColorThemes.white} />
        ) : (
          <MaterialIcons name="error" size={24} color={ColorThemes.white} />
        )}

        <Text style={[styles.text]}>{message}</Text>
      </Animated.View>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  top: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT * 1.5,
    left: 0,
    right: 0,
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    flex: 1,
    lineHeight: 20,
    opacity: 0.8,
    color: ColorThemes.white,
  },

  toastSuccess: {
    backgroundColor: ColorThemes.green,
  },

  toastError: {
    backgroundColor: ColorThemes.red,
  },

  toast: {
    position: "relative",
    width: WIDTH_WINDOW * 0.9,
    padding: SpacingTheme.lg,
    borderRadius: SpacingTheme.sm,
    flexDirection: "row",
    gap: SpacingTheme.sm,
    alignItems: "center",

    shadowColor: ColorThemes.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 6,
  },
});
