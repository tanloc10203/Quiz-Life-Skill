import { AntDesign, FontAwesome5, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";

const CardCategory = ({ item }) => {
  const Icon = useMemo(() => {
    if (String(item.slug).includes("house")) {
      return <FontAwesome5 name="house-user" size={24} color={ColorThemes.black} />;
    }

    if (String(item.slug).includes("car")) {
      return <AntDesign name="car" size={24} color={ColorThemes.black} />;
    }

    if (String(item.slug).includes("electronic")) {
      return <Fontisto name="electronjs" size={24} color={ColorThemes.black} />;
    }

    if (String(item.slug).includes("communication")) {
      return <FontAwesome5 name="teamspeak" size={24} color={ColorThemes.black} />;
    }

    if (String(item.slug).includes("creative")) {
      return <FontAwesome5 name="creative-commons-by" size={24} color={ColorThemes.black} />;
    }

    return <MaterialCommunityIcons name="simple-icons" size={24} color={ColorThemes.black} />;
  }, [item.slug]);

  return (
    <TouchableOpacity style={styles.wrap}>
      {Icon}

      <Text style={styles.text}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: ColorThemes.white,
    borderRadius: SpacingTheme.sm,
    width: `${100 / 3.2} %`,
    alignItems: "center",
    paddingHorizontal: SpacingTheme.sm,
    paddingVertical: SpacingTheme.lg,
    backgroundColor: ColorThemes.white,

    elevation: 6,
    shadowColor: ColorThemes.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },

  text: {
    marginTop: SpacingTheme.md,
    color: ColorThemes.black,
    fontWeight: "bold",
    fontSize: 13,
  },
});
