import { useRoute } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Container from "~/components/shared/Container";
import Button from "~/components/ui/Button";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { HEIGHT_WINDOW } from "~/utils/scale";

const GameSuccessScreen = ({ navigation }) => {
  const stylesCommon = useStylesCommon();
  const { params } = useRoute();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation]
  );

  return (
    <Container style={[stylesCommon.bgDark, stylesCommon.center]}>
      <View>
        <View style={[stylesCommon.lottie, { height: HEIGHT_WINDOW / 2 }]}>
          <Lottie
            source={require("~/assets/animation/achievement.json")}
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
            {
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              color: ColorThemes.green,
              marginBottom: 30,
            },
          ]}
        >
          Finished
        </Text>

        <Text
          style={[
            stylesCommon.colorWhite,
            { fontSize: 18, fontWeight: "bold", textAlign: "center" },
          ]}
        >
          {`Question results are answered correctly`}
        </Text>

        <Text
          style={[
            stylesCommon.colorWhite,
            {
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: SpacingTheme.lg,
            },
          ]}
        >
          {`${params?.totalIsCorrect}/${params?.results?.length}`}
        </Text>

        <Button label={"Go to Games"} onPress={() => navigation.navigate("Game")} />

        <Button
          label={"Achievements"}
          styleContainer={{ backgroundColor: ColorThemes.green, marginTop: SpacingTheme.lg }}
          onPress={() => navigation.navigate("Achievements")}
        />
      </View>
    </Container>
  );
};

export default GameSuccessScreen;
