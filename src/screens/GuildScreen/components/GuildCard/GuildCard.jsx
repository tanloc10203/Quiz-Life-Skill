import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import Lottie from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLUR_HASH } from "~/constants/common";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { MaterialIcons } from "@expo/vector-icons";

const GuildCard = ({ item, isFavorite, onPress, onPressFavorite }) => {
  const stylesCommon = useStylesCommon();
  const navigate = useNavigation();

  const handleOnPress = () => {
    if (onPress) {
      onPress();
      return;
    }

    navigate.navigate("GuildDetails", { skillId: item._id });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: item.thumbNail }}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />

      <View style={styles.icon}>
        <Lottie
          source={require("~/assets/animation/next.json")}
          autoPlay={true}
          loop={true}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <View style={styles.wrapText}>
        <Text style={stylesCommon.colorWhite}>{item.name}</Text>

        <TouchableOpacity onPress={onPressFavorite}>
          {isFavorite ? (
            <MaterialIcons name="favorite" size={24} color={ColorThemes.red} />
          ) : (
            <MaterialIcons name="favorite-border" size={24} color={ColorThemes.red} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default GuildCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    elevation: 9,
    shadowColor: ColorThemes.white,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: SpacingTheme.lg,
  },

  wrapText: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    bottom: 0,
    padding: SpacingTheme.md,
    left: 0,
    right: 0,
    minHeight: 80,
    borderBottomRightRadius: SpacingTheme.lg,
    borderBottomLeftRadius: SpacingTheme.lg,
  },

  icon: {
    position: "absolute",
    width: 150,
    height: 150,
    top: `${4}%`,
    right: -30,
  },
});
