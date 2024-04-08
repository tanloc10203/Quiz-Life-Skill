import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useStylesCommon from "~/hooks/useStylesCommon";
import SpacingTheme from "~/theme/spacing.theme";

const TitleGuild = ({ title }) => {
  const stylesCommon = useStylesCommon();

  return (
    <View>
      <Text
        style={[
          stylesCommon.colorWhite,
          { fontSize: 18, marginVertical: SpacingTheme.lg, fontWeight: 700 },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default TitleGuild;

const styles = StyleSheet.create({});
