import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { BLUR_HASH } from "~/constants/common";
import useStylesCommon from "~/hooks/useStylesCommon";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { HEIGHT_WINDOW, WIDTH_WINDOW } from "~/utils/scale";
import TextGuild from "../TextGuild";

const GuildItem = ({ item }) => {
  const stylesCommon = useStylesCommon();

  return (
    <View style={{ width: WIDTH_WINDOW }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {item.image ? (
          <Image
            style={{ width: WIDTH_WINDOW, height: HEIGHT_WINDOW / 2.4 }}
            source={{ uri: item.image }}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={500}
          />
        ) : null}

        <View style={stylesCommon.pMd}>
          <Text
            style={{
              fontSize: 25,
              marginTop: SpacingTheme.md,
              color: ColorThemes.white,
              fontWeight: 700,
            }}
          >
            {item.text}
          </Text>

          {item?.data.length
            ? [...item.data, ...item.data, ...item.data].map((t, index) => (
                <TextGuild
                  style={{ marginVertical: SpacingTheme.md }}
                  text={`${index + 1}. ${t.text}`}
                  key={index}
                />
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default GuildItem;
