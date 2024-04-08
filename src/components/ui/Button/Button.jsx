import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";

const Button = ({
  label,
  onPress = () => {},
  loading = false,
  disabled = false,
  styleContainer,
  textColor = "",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disable : null, styleContainer]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.textBtn, textColor ? { color: textColor } : {}]}>{label}</Text>

      {loading ? <ActivityIndicator color={ColorThemes.white} /> : null}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorThemes.blue,
    padding: SpacingTheme.lg,
    borderRadius: SpacingTheme.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  disable: {
    backgroundColor: ColorThemes.gray,
    opacity: 0.5,
  },

  textBtn: {
    color: ColorThemes.white,
    textAlign: "center",
    fontSize: SpacingTheme.lg,
    fontWeight: "bold",
  },
});
