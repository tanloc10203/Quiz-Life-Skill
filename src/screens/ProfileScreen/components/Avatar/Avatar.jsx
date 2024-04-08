import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BLUR_HASH } from "~/constants/common";
import ColorThemes from "~/theme/color.theme";

const Avatar = ({ src }) => {
  return (
    <View
      style={{
        borderColor: ColorThemes.blue,
        borderWidth: 2,
        height: 180,
        width: 180,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 180 / 2,
        backgroundColor: ColorThemes.blueRgba(0.5),
        elevation: 8,
        shadowColor: ColorThemes.blueRgba(0.5),
        shadowOffset: {
          height: 0,
          width: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      }}
    >
      <View
        style={{
          borderColor: ColorThemes.blue,
          borderWidth: 2,
          height: 150,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 150 / 2,
          backgroundColor: ColorThemes.blueRgba(0.5),
        }}
      >
        <Image
          source={{ uri: src }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
          placeholder={BLUR_HASH}
          transition={500}
        />
      </View>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
