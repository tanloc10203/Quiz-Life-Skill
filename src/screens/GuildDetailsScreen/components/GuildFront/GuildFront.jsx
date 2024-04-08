import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TitleGuild from "../TitleGuild";
import TextGuild from "../TextGuild";
import Button from "~/components/ui/Button";
import useStylesCommon from "~/hooks/useStylesCommon";
import SpacingTheme from "~/theme/spacing.theme";

const GuildFront = ({ selected, onNext }) => {
  const stylesCommon = useStylesCommon();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={[
          stylesCommon.colorWhite,
          { fontSize: 20, lineHeight: 26, marginBottom: SpacingTheme.lg, fontWeight: 700 },
        ]}
      >
        {selected.name}
      </Text>

      <TitleGuild title={"Description"} />

      <TextGuild text={selected.description} />

      <TitleGuild title={"Disclosure"} />

      <TextGuild text={selected.disclosure} />

      <TitleGuild title={"Caution"} />

      <TextGuild text={selected.caution} />

      <View style={{ flexDirection: "row", marginTop: SpacingTheme["2xl"] }}>
        <Button onPress={onNext} label={`Continue`} styleContainer={{ width: "100%" }} />
      </View>

      <View style={{ marginBottom: 80 }} />
    </ScrollView>
  );
};

export default GuildFront;

const styles = StyleSheet.create({});
