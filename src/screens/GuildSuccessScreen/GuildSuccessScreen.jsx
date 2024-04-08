import { useRoute } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Container from "~/components/shared/Container";
import Button from "~/components/ui/Button";
import useStylesCommon from "~/hooks/useStylesCommon";
import SpacingTheme from "~/theme/spacing.theme";
import { navigate } from "~/utils/navigation.root";
import { HEIGHT_WINDOW, WIDTH_WINDOW } from "~/utils/scale";

const GuildSuccessScreen = () => {
  const stylesCommon = useStylesCommon();
  const route = useRoute();

  return (
    <Container style={[stylesCommon.bgDark, stylesCommon.center]}>
      <View style={[stylesCommon.lottie, { height: HEIGHT_WINDOW / 4 }]}>
        <Lottie
          source={require("~/assets/animation/success.json")}
          autoPlay={true}
          speed={1}
          loop={true}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <Text
        style={[
          stylesCommon.colorWhite,
          { fontSize: 20, textAlign: "center", textTransform: "capitalize", lineHeight: 36 },
        ]}
      >
        Congratulations on completing the guild
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: WIDTH_WINDOW,
          paddingHorizontal: SpacingTheme.md,
          marginTop: SpacingTheme["2xl"],
          position: "absolute",
          bottom: 10,
        }}
      >
        <Button
          label={"Back to guilds"}
          onPress={() => navigate("Main", { screen: "Guild" })}
          styleContainer={{ width: "100%" }}
        />
      </View>
    </Container>
  );
};

export default GuildSuccessScreen;

const styles = StyleSheet.create({});
