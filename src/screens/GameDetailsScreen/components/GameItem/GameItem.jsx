import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLUR_HASH } from "~/constants/common";
import useStylesCommon from "~/hooks/useStylesCommon";
import TextGuild from "~/screens/GuildDetailsScreen/components/TextGuild";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { HEIGHT_WINDOW, WIDTH_WINDOW } from "~/utils/scale";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const GameItem = ({
  item,
  index,
  onPressSelected = (answerId, guildId) => {},
  isHistory = false,
}) => {
  const stylesCommon = useStylesCommon();
  const [expand, setExpand] = useState(false);

  // console.log(`GameItem:::`, JSON.stringify(item, null, 4));

  return (
    <View style={{ width: WIDTH_WINDOW }}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <View style={stylesCommon.center}>
          <Image
            style={{
              width: WIDTH_WINDOW,
              height: HEIGHT_WINDOW / 2.2,
            }}
            source={{ uri: item.image }}
            placeholder={BLUR_HASH}
            contentFit="fill"
            transition={500}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 4,
            backgroundColor: ColorThemes.white,
            marginHorizontal: SpacingTheme.md,
            left: 0,
            right: 0,
            padding: SpacingTheme.md,
            borderRadius: SpacingTheme.md,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {`${index}. ${item.text}`}

            <Text style={{ fontWeight: "normal" }}>
              {`${
                item.data?.length
                  ? expand
                    ? `: ${[...item.data].map((t) => t.text).join("\n\n- ")}`
                    : `: ${item.data[0].text} ...`
                  : ""
              }`}
            </Text>
          </Text>

          {item.data?.length > 1 ? (
            <View style={{ marginTop: SpacingTheme.md, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => setExpand((prev) => !prev)}
                style={{ width: 50, justifyContent: "center", alignItems: "flex-end" }}
              >
                {expand ? (
                  <MaterialIcons name="expand-less" size={24} color="black" />
                ) : (
                  <FontAwesome name="expand" size={20} color="black" />
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View
          style={{
            padding: SpacingTheme.md,
            justifyContent: "center",
            alignItems: "center",
            marginTop: SpacingTheme.md,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: SpacingTheme.md,
            }}
          >
            {item.game.answers.map((answer) => (
              <TouchableOpacity
                key={answer._id}
                onPress={() => onPressSelected(answer._id, item._id)}
                style={{
                  backgroundColor: isHistory
                    ? answer.isCorrect
                      ? ColorThemes.green
                      : item.marked === answer._id
                      ? ColorThemes.red
                      : ColorThemes.white
                    : item.marked === answer._id
                    ? ColorThemes.blue
                    : ColorThemes.white,
                  padding: SpacingTheme.sm,
                  marginBottom: SpacingTheme.md,
                  borderRadius: SpacingTheme.sm,
                  elevation: 7,
                  flexDirection: "row",
                  gap: SpacingTheme.lg,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: SpacingTheme.n(70),
                    height: SpacingTheme.n(70),
                    borderRadius: SpacingTheme.sm,
                  }}
                  source={{ uri: answer.image }}
                  placeholder={BLUR_HASH}
                  contentFit="cover"
                  transition={500}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GameItem;
