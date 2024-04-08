import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStylesCommon from "~/hooks/useStylesCommon";

const TextGuild = ({ text, style }) => {
  const stylesCommon = useStylesCommon();

  return (
    <View>
      <Text style={[stylesCommon.colorWhite, { lineHeight: 24, textAlign: "justify", ...style }]}>
        {text}
      </Text>
    </View>
  );
};

export default TextGuild;

const styles = StyleSheet.create({});
