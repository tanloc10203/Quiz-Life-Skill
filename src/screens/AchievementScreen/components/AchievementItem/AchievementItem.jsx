import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ColorThemes from "~/theme/color.theme";
import SpacingTheme from "~/theme/spacing.theme";
import { formatDate } from "~/utils/common";
import { navigate } from "~/utils/navigation.root";

const AchievementItem = ({ item }) => {
  const totalIsCorrect = useMemo(() => {
    return [...item.results].filter((t) => {
      const answers = [...t.game.answers];

      const findAnswer = answers.find((a) => a._id === t.marked);

      return findAnswer && findAnswer?.isCorrect;
    }).length;
  }, [item.results]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: ColorThemes.white,
        padding: SpacingTheme.md,
        borderRadius: SpacingTheme.sm,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() => navigate("AchievementDetails", { data: item })}
    >
      <View>
        <Text style={{ marginBottom: SpacingTheme.sm, fontSize: 16, fontWeight: 700 }}>
          {item.skill.name}
        </Text>

        <Text style={{ fontStyle: "italic" }}>{formatDate(item.createdAt)}</Text>
      </View>

      <View
        style={{
          borderWidth: 4,
          borderColor: ColorThemes.blue,
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: 700 }}>{`${totalIsCorrect}/${item.results.length}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AchievementItem;

const styles = StyleSheet.create({});
